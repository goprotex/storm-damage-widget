/**
 * Step 3.5: Storm Imagery Intelligence Collection
 * Professional Visual Evidence System for Storm Damage Assessment
 */

class StormImageryIntelligence {
    constructor(config = {}) {
        // API Keys - some are optional
        this.openaiApiKey = config.openaiApiKey || process.env.OPENAI_API_KEY;
        this.weatherApiKey = config.weatherApiKey || process.env.WEATHER_API_KEY;
        this.googleMapsApiKey = config.googleMapsApiKey || process.env.GOOGLE_MAPS_API_KEY;
        this.mapboxApiKey = config.mapboxApiKey || process.env.MAPBOX_API_KEY;
        this.ibmWeatherApiKey = config.ibmWeatherApiKey || process.env.IBM_WEATHER_API_KEY;
        
        // Base URLs for various services
        this.baseUrls = {
            // FREE APIs (no authentication required)
            noaa_weather: 'https://api.weather.gov',
            noaa_satellite: 'https://cdn.star.nesdis.noaa.gov/GOES16',
            noaa_radar: 'https://mrms.ncep.noaa.gov/data',
            storm_reports: 'https://www.spc.noaa.gov/climo/reports',
            
            // PAID APIs (require keys)
            weather_api: 'https://api.weatherapi.com/v1',
            google_maps: 'https://maps.googleapis.com/maps/api/staticmap',
            mapbox_static: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static',
            ibm_weather: 'https://api.weather.com/v1',
            
            // Backup/Alternative APIs
            openweather: 'https://api.openweathermap.org/data/2.5',
            usgs_earthquake: 'https://earthquake.usgs.gov/fdsnws/event/1'
        };
        
        // Configuration flags
        this.config = {
            useFreeAPIsOnly: config.useFreeAPIsOnly || false,
            enablePremiumFeatures: config.enablePremiumFeatures || false,
            maxImagesPerStorm: config.maxImagesPerStorm || 5,
            timeoutMs: config.timeoutMs || 30000
        };
    }

    /**
     * Main storm imagery collection function
     * @param {Array} stormEvents - Storm events from Step 3
     * @param {Object} propertyInfo - Property location and details
     * @returns {Promise<Object>} Complete imagery package
     */
    async collectStormImagery(stormEvents, propertyInfo) {
        try {
            const imagery = {
                satellite_imagery: [],
                radar_imagery: [],
                storm_tracks: [],
                damage_examples: [],
                timeline_sequence: [],
                metadata: {
                    collection_date: new Date().toISOString(),
                    property_coordinates: {
                        lat: propertyInfo.latitude,
                        lng: propertyInfo.longitude
                    },
                    total_events_processed: stormEvents.length
                }
            };

            // Process each significant storm event
            for (const storm of stormEvents) {
                if (this.isSignificantStorm(storm)) {
                    // Collect satellite imagery
                    const satelliteData = await this.collectSatelliteImagery(storm, propertyInfo);
                    imagery.satellite_imagery.push(...satelliteData);

                    // Collect radar imagery
                    const radarData = await this.collectRadarImagery(storm, propertyInfo);
                    imagery.radar_imagery.push(...radarData);

                    // Generate storm track visualization
                    const trackData = await this.generateStormTrack(storm, propertyInfo);
                    imagery.storm_tracks.push(trackData);

                    // Find similar damage examples
                    const damageExamples = await this.findSimilarDamageExamples(storm);
                    imagery.damage_examples.push(...damageExamples);

                    // Create timeline sequence
                    const timelineData = await this.createTimelineSequence(storm, propertyInfo);
                    imagery.timeline_sequence.push(timelineData);
                }
            }

            // Select best images for display
            imagery.featured_images = this.selectFeaturedImages(imagery);

            return imagery;

        } catch (error) {
            return {
                success: false,
                error: error.message,
                fallback_imagery: this.getFallbackImagery()
            };
        }
    }

    /**
     * Collect NOAA satellite imagery for storms
     */
    async collectSatelliteImagery(storm, propertyInfo) {
        const images = [];
        
        try {
            // Calculate time windows around storm event
            const stormDate = new Date(storm.begin_date_time);
            const timeWindows = this.calculateTimeWindows(stormDate);

            for (const window of timeWindows) {
                // Get GOES satellite imagery
                const satelliteImage = await this.fetchGoesImagery({
                    timestamp: window.timestamp,
                    coordinates: {
                        lat: propertyInfo.latitude,
                        lng: propertyInfo.longitude
                    },
                    product: 'CONUS', // Continental US view
                    band: 'GEOCOLOR' // True color composite
                });

                if (satelliteImage) {
                    const processedImage = await this.processStormImage(satelliteImage, {
                        storm: storm,
                        property: propertyInfo,
                        timeContext: window.description
                    });

                    images.push({
                        type: 'satellite',
                        category: window.category,
                        timestamp: window.timestamp,
                        description: window.description,
                        original_url: satelliteImage.url,
                        processed_url: processedImage.enhanced_url,
                        thumbnail_url: processedImage.thumbnail_url,
                        metadata: {
                            satellite: 'GOES-16',
                            product: 'GEOCOLOR',
                            resolution: '1km',
                            storm_intensity: storm.magnitude || 'Unknown',
                            property_distance: this.calculateDistance(storm, propertyInfo)
                        }
                    });
                }
            }

        } catch (error) {
            console.error('Satellite imagery collection failed:', error);
        }

        return images;
    }

    /**
     * Collect weather radar imagery
     */
    async collectRadarImagery(storm, propertyInfo) {
        const radarImages = [];
        
        try {
            // Find nearest radar station
            const nearestRadar = await this.findNearestRadarStation(propertyInfo);
            
            // Get radar data for storm timeframe
            const radarProducts = ['base_reflectivity', 'storm_relative_velocity', 'composite_reflectivity'];
            
            for (const product of radarProducts) {
                const radarData = await this.fetchRadarData({
                    station: nearestRadar.id,
                    product: product,
                    timestamp: storm.begin_date_time,
                    coordinates: {
                        lat: propertyInfo.latitude,
                        lng: propertyInfo.longitude
                    }
                });

                if (radarData) {
                    const processedRadar = await this.processRadarImage(radarData, {
                        storm: storm,
                        property: propertyInfo,
                        product: product
                    });

                    radarImages.push({
                        type: 'radar',
                        product: product,
                        timestamp: storm.begin_date_time,
                        description: this.getRadarDescription(product),
                        original_url: radarData.url,
                        processed_url: processedRadar.enhanced_url,
                        thumbnail_url: processedRadar.thumbnail_url,
                        metadata: {
                            radar_station: nearestRadar.id,
                            station_distance: nearestRadar.distance,
                            max_reflectivity: radarData.max_dbz,
                            storm_motion: radarData.storm_motion
                        }
                    });
                }
            }

        } catch (error) {
            console.error('Radar imagery collection failed:', error);
        }

        return radarImages;
    }

    /**
     * Generate storm track visualization
     */
    async generateStormTrack(storm, propertyInfo) {
        try {
            // Get storm path data
            const stormPath = await this.getStormPathData(storm);
            
            // Create interactive map visualization
            const trackVisualization = await this.createTrackVisualization({
                stormPath: stormPath,
                propertyLocation: {
                    lat: propertyInfo.latitude,
                    lng: propertyInfo.longitude,
                    address: propertyInfo.address
                },
                storm: storm
            });

            return {
                type: 'storm_track',
                storm_id: storm.event_id,
                title: `${storm.event_type} Track - ${storm.begin_date}`,
                description: `Storm path analysis showing proximity to ${propertyInfo.address}`,
                interactive_map_url: trackVisualization.interactive_url,
                static_image_url: trackVisualization.static_url,
                thumbnail_url: trackVisualization.thumbnail_url,
                metadata: {
                    closest_approach: trackVisualization.closest_distance,
                    closest_time: trackVisualization.closest_time,
                    storm_duration: trackVisualization.duration,
                    path_length: trackVisualization.path_length,
                    intensity_at_closest: trackVisualization.intensity_at_closest
                }
            };

        } catch (error) {
            console.error('Storm track generation failed:', error);
            return null;
        }
    }

    /**
     * Find similar damage examples from the same storm system
     */
    async findSimilarDamageExamples(storm) {
        const damageExamples = [];
        
        try {
            // Search storm reports database for similar damage
            const damageReports = await this.searchDamageReports({
                storm_id: storm.event_id,
                event_type: storm.event_type,
                magnitude: storm.magnitude,
                date_range: this.getDateRange(storm.begin_date)
            });

            // Filter for relevant damage examples
            const relevantReports = damageReports.filter(report => 
                report.has_images && 
                report.damage_type === this.determineDamageType(storm) &&
                report.property_type === 'residential'
            );

            for (const report of relevantReports.slice(0, 3)) { // Limit to 3 examples
                const processedExample = await this.processDamageExample(report);
                
                damageExamples.push({
                    type: 'damage_example',
                    example_id: report.id,
                    title: `Similar ${storm.event_type} Damage`,
                    description: report.description,
                    image_url: processedExample.image_url,
                    thumbnail_url: processedExample.thumbnail_url,
                    metadata: {
                        location: report.location,
                        date: report.date,
                        damage_cost: report.estimated_cost,
                        property_type: report.property_type,
                        similarity_score: report.similarity_score
                    }
                });
            }

        } catch (error) {
            console.error('Damage examples collection failed:', error);
        }

        return damageExamples;
    }

    /**
     * Create timeline sequence of images
     */
    async createTimelineSequence(storm, propertyInfo) {
        const sequence = [];
        
        try {
            const stormDate = new Date(storm.begin_date_time);
            const timepoints = [
                { offset: -24, label: '24 Hours Before', category: 'pre_storm' },
                { offset: -6, label: '6 Hours Before', category: 'approaching' },
                { offset: 0, label: 'Storm Impact', category: 'during_storm' },
                { offset: 6, label: '6 Hours After', category: 'post_storm' },
                { offset: 24, label: '24 Hours After', category: 'assessment' }
            ];

            for (const timepoint of timepoints) {
                const timestamp = new Date(stormDate.getTime() + (timepoint.offset * 60 * 60 * 1000));
                
                // Try to get imagery for this timepoint
                const imagery = await this.getImageryForTimestamp({
                    timestamp: timestamp,
                    coordinates: {
                        lat: propertyInfo.latitude,
                        lng: propertyInfo.longitude
                    },
                    category: timepoint.category
                });

                if (imagery) {
                    sequence.push({
                        timestamp: timestamp.toISOString(),
                        label: timepoint.label,
                        category: timepoint.category,
                        image_url: imagery.url,
                        thumbnail_url: imagery.thumbnail_url,
                        description: this.getTimelineDescription(timepoint, storm)
                    });
                }
            }

        } catch (error) {
            console.error('Timeline sequence creation failed:', error);
        }

        return {
            type: 'timeline_sequence',
            storm_id: storm.event_id,
            title: `${storm.event_type} Timeline`,
            sequence: sequence,
            metadata: {
                total_timepoints: sequence.length,
                duration_hours: 48,
                storm_type: storm.event_type
            }
        };
    }

    /**
     * Select featured images for widget and PDF display
     */
    selectFeaturedImages(imagery) {
        const featured = {
            primary_satellite: null,
            primary_radar: null,
            best_storm_track: null,
            top_damage_example: null,
            widget_carousel: [],
            pdf_images: []
        };

        // Select primary satellite image (storm impact or closest to impact)
        const satelliteImages = imagery.satellite_imagery
            .filter(img => img.category === 'during_storm' || img.category === 'approaching')
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        if (satelliteImages.length > 0) {
            featured.primary_satellite = satelliteImages[0];
        }

        // Select primary radar image (highest reflectivity)
        const radarImages = imagery.radar_imagery
            .filter(img => img.product === 'base_reflectivity')
            .sort((a, b) => (b.metadata.max_reflectivity || 0) - (a.metadata.max_reflectivity || 0));
        
        if (radarImages.length > 0) {
            featured.primary_radar = radarImages[0];
        }

        // Select best storm track (closest approach)
        const stormTracks = imagery.storm_tracks
            .sort((a, b) => (a.metadata.closest_approach || Infinity) - (b.metadata.closest_approach || Infinity));
        
        if (stormTracks.length > 0) {
            featured.best_storm_track = stormTracks[0];
        }

        // Select top damage example (highest similarity)
        const damageExamples = imagery.damage_examples
            .sort((a, b) => (b.metadata.similarity_score || 0) - (a.metadata.similarity_score || 0));
        
        if (damageExamples.length > 0) {
            featured.top_damage_example = damageExamples[0];
        }

        // Build widget carousel (max 5 images)
        featured.widget_carousel = [
            featured.primary_satellite,
            featured.primary_radar,
            featured.best_storm_track,
            featured.top_damage_example
        ].filter(Boolean).slice(0, 5);

        // Build PDF images (max 3 images)
        featured.pdf_images = [
            featured.primary_satellite,
            featured.best_storm_track,
            featured.top_damage_example
        ].filter(Boolean).slice(0, 3);

        return featured;
    }

    /**
     * Utility functions
     */
    isSignificantStorm(storm) {
        // Define criteria for significant storms worth collecting imagery
        const significantTypes = ['tornado', 'hail', 'thunderstorm wind', 'hurricane'];
        const hasSignificantMagnitude = storm.magnitude && parseFloat(storm.magnitude) >= 1.0;
        
        return significantTypes.includes(storm.event_type.toLowerCase()) || hasSignificantMagnitude;
    }

    calculateTimeWindows(stormDate) {
        return [
            {
                timestamp: new Date(stormDate.getTime() - (24 * 60 * 60 * 1000)),
                category: 'pre_storm',
                description: '24 hours before storm impact'
            },
            {
                timestamp: new Date(stormDate.getTime() - (6 * 60 * 60 * 1000)),
                category: 'approaching',
                description: 'Storm approaching - 6 hours before impact'
            },
            {
                timestamp: stormDate,
                category: 'during_storm',
                description: 'Peak storm intensity at property location'
            },
            {
                timestamp: new Date(stormDate.getTime() + (6 * 60 * 60 * 1000)),
                category: 'post_storm',
                description: '6 hours after storm passage'
            }
        ];
    }

    getFallbackImagery() {
        return {
            satellite_imagery: [],
            radar_imagery: [],
            storm_tracks: [],
            damage_examples: [],
            featured_images: {
                widget_carousel: [],
                pdf_images: []
            },
            fallback_message: 'Storm imagery collection unavailable. Using text-based analysis.'
        };
    }

    /**
     * API Integration Methods
     */

    // FREE NOAA Weather API (no key required)
    async fetchNoaaWeatherData(coordinates, startDate, endDate) {
        try {
            const url = `${this.baseUrls.noaa_weather}/gridpoints/point/${coordinates.lat},${coordinates.lng}`;
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('NOAA Weather API error:', error);
            return null;
        }
    }

    // FREE NOAA Satellite Imagery (no key required)
    async fetchGoesImagery(params) {
        try {
            // GOES-16 imagery URL structure
            const timestamp = params.timestamp.toISOString().split('T')[0].replace(/-/g, '');
            const hour = params.timestamp.getUTCHours().toString().padStart(2, '0');
            const url = `${this.baseUrls.noaa_satellite}/ABI/CONUS/GEOCOLOR/${timestamp}${hour}00_GOES16-ABI-CONUS-GEOCOLOR-625x375.jpg`;
            
            return {
                url: url,
                timestamp: params.timestamp,
                coordinates: params.coordinates,
                product: 'GEOCOLOR'
            };
        } catch (error) {
            console.error('GOES imagery fetch error:', error);
            return null;
        }
    }

    // WeatherAPI.com integration (requires API key)
    async fetchWeatherApiData(coordinates, date) {
        if (!this.weatherApiKey) {
            console.log('WeatherAPI key not available, skipping premium weather data');
            return null;
        }

        try {
            const dateStr = date.toISOString().split('T')[0];
            const url = `${this.baseUrls.weather_api}/history.json?key=${this.weatherApiKey}&q=${coordinates.lat},${coordinates.lng}&dt=${dateStr}`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error(`WeatherAPI error: ${response.status}`);
            
            return await response.json();
        } catch (error) {
            console.error('WeatherAPI error:', error);
            return null;
        }
    }

    // Google Maps Static API integration (requires API key)
    async generateStormTrackMap(stormPath, propertyLocation) {
        if (!this.googleMapsApiKey) {
            console.log('Google Maps API key not available, using fallback mapping');
            return this.generateFallbackMap(stormPath, propertyLocation);
        }

        try {
            const pathString = stormPath.map(point => `${point.lat},${point.lng}`).join('|');
            const url = `${this.baseUrls.google_maps}?` +
                `size=800x600&` +
                `maptype=hybrid&` +
                `path=color:0xff0000|weight:3|${pathString}&` +
                `markers=color:blue|${propertyLocation.lat},${propertyLocation.lng}&` +
                `key=${this.googleMapsApiKey}`;

            return {
                static_url: url,
                interactive_url: url,
                thumbnail_url: url.replace('800x600', '400x300')
            };
        } catch (error) {
            console.error('Google Maps error:', error);
            return this.generateFallbackMap(stormPath, propertyLocation);
        }
    }

    // Mapbox Static API integration (alternative to Google Maps)
    async generateMapboxStormTrack(stormPath, propertyLocation) {
        if (!this.mapboxApiKey) {
            console.log('Mapbox API key not available');
            return null;
        }

        try {
            // Create GeoJSON path
            const pathCoords = stormPath.map(point => `${point.lng},${point.lat}`).join(',');
            const url = `${this.baseUrls.mapbox_static}/` +
                `path-3+f44-0.8(${pathCoords})/` +
                `pin-s-building+285A98(${propertyLocation.lng},${propertyLocation.lat})/` +
                `auto/800x600?access_token=${this.mapboxApiKey}`;

            return {
                static_url: url,
                interactive_url: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9.html`,
                thumbnail_url: url.replace('800x600', '400x300')
            };
        } catch (error) {
            console.error('Mapbox error:', error);
            return null;
        }
    }

    // Fallback map generation using free services
    generateFallbackMap(stormPath, propertyLocation) {
        // Use OpenStreetMap with Leaflet for free mapping
        const centerLat = (stormPath[0].lat + propertyLocation.lat) / 2;
        const centerLng = (stormPath[0].lng + propertyLocation.lng) / 2;
        
        return {
            static_url: `https://www.openstreetmap.org/#map=10/${centerLat}/${centerLng}`,
            interactive_url: `https://www.openstreetmap.org/#map=10/${centerLat}/${centerLng}`,
            thumbnail_url: `https://via.placeholder.com/400x300/4a90e2/ffffff?text=Storm+Track+Map`,
            fallback: true
        };
    }

    // Utility method to check which APIs are available
    getAvailableApis() {
        return {
            noaa_weather: true, // Always available (free)
            noaa_satellite: true, // Always available (free)
            weather_api: !!this.weatherApiKey,
            google_maps: !!this.googleMapsApiKey,
            mapbox: !!this.mapboxApiKey,
            ibm_weather: !!this.ibmWeatherApiKey,
            openai: !!this.openaiApiKey
        };
    }

    // Configuration method for easy setup
    static createWithFreeAPIs() {
        return new StormImageryIntelligence({
            useFreeAPIsOnly: true,
            enablePremiumFeatures: false
        });
    }

    static createWithPaidAPIs(apiKeys) {
        return new StormImageryIntelligence({
            ...apiKeys,
            useFreeAPIsOnly: false,
            enablePremiumFeatures: true
        });
    }
}

// Export for various environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StormImageryIntelligence;
}

// Global function for direct use
function collectStormImagery(stormEvents, propertyInfo, config) {
    const collector = new StormImageryIntelligence(config);
    return collector.collectStormImagery(stormEvents, propertyInfo);
}