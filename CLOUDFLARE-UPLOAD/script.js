// Configuration Constants
const CONFIG = {
  // Use Worker proxy via domain routes (DNS now proxied through Cloudflare)
  zapierWebhookUrl: 'https://haydenclaim.com/api/submit',
  // UPDATE THIS with your new polling webhook URL after creating the second Zap:
  apiEndpoint: 'https://haydenclaim.com/api/progress', // Polling endpoint
  timings: {
    factRotation: 7000, // Rotate fun facts every 7 seconds
    statusRotation: 3000,
    minLoadingTime: 10000, // Increased for real analysis time
    progressUpdateInterval: 2000 // For live progress updates
  },
  // Live progress tracking - enabled for real-time server updates
  enableLiveProgress: true, // Now active - server can push progress updates
  progressEndpoint: 'https://haydenclaim.com/api/progress' // Progress tracking endpoint
};

// Static Data - 200 Texas Storm Facts
const TEXAS_STORM_FACTS = [
  "Texas sits atop three major atmospheric collision zones — the Gulf moisture stream, the desert dryline, and the Rocky Mountain lee trough — making it the most efficient thunderstorm factory in North America.",
"The dryline that triggers most North and Central Texas supercells can advance and retreat 150 miles in a single day depending on Gulf humidity flux.",
"Mesoscale convective systems born in the Texas Panhandle often drift overnight into Oklahoma as organized bow echoes that produce more damage than the initial daytime storms.",
"In May 1995, the Fort Worth Mayfest hailstorm produced over 3-inch stones that fell for 45 minutes — the updraft was estimated to exceed 130 mph, strong enough to suspend a bowling ball.",
"The 1953 Waco F5 tornado’s pressure drop was so abrupt that many victims died from internal injuries caused by rapid decompression, not debris impact.",
"Radar operators during the 1970 Lubbock F5 tornado recorded one of the first hook echoes ever documented in Texas — it became a textbook case for future meteorologists.",
"Jarrell’s 1997 F5 tornado advanced only 8 miles per hour, giving it time to grind structures into fine powder — even asphalt was scoured from the road surface.",
"The sound level of a Texas supercell updraft has been measured at over 120 decibels inside the storm core, equivalent to a rock concert in volume.",
"During the 2021 Hondo hailstorm, stones reached 6.4 inches — they formed in an updraft so strong that it recycled the hailstone multiple times through the freezing level.",
"Texas cumulonimbus clouds can top 65,000 feet, high enough to punch through the stratosphere and trigger overshooting tops visible from space.",
"The 'cap' over North Texas — a warm layer near 850 mb — suppresses storms until late afternoon when surface heating finally breaks it, often producing explosive initiation.",
"Central Texas often experiences 'wet microbursts' that release more energy than a small bomb, flattening trees in a 2-mile radius without producing a tornado.",
"In 2015, the Blanco River flood near Wimberley rose 28 feet in just 90 minutes after 8 inches of rain fell upstream — the wall of water moved at nearly 30 mph.",
"Texas has recorded lightning bolts spanning over 75 miles cloud-to-cloud — among the longest discharges on Earth.",
"Some Panhandle storms generate 'stroboscopic lightning,' where the flash rate exceeds 60 per minute, a visual signature of extreme updraft turbulence.",
"The gust front from one North Texas squall line in 2003 traveled from Abilene to Houston in under six hours, covering 300 miles and dropping surface temps by 25 °F.",
"Thermodynamic soundings from Norman to Brownsville routinely show convective available potential energy (CAPE) over 4000 J/kg during May — levels that rival tornadic outbreaks in Bangladesh.",
"Texas hail often shows concentric onion-like layers of ice because the stone repeatedly ascends and descends through supercooled zones before falling.",
"During the 2016 San Antonio hailstorm, Doppler radar estimated hail core reflectivity values over 75 dBZ — the maximum measurable range of most NEXRAD radars.",
"The typical Texas storm’s anvil can spread 150 miles downwind, shading entire counties while hail is still falling on the opposite edge.",
"Storm chasers call the I-27 corridor between Lubbock and Amarillo 'Hail Alley' because its terrain alignment enhances supercell inflow from the southeast.",
"The rare 2021 Winter Storm Uri generated thundersnow across North Texas, where lightning strokes struck through snow bands — a phenomenon usually limited to lake-effect regions.",
"Texas is one of the few states to experience both haboobs and hurricanes — dust storms from the west and tropical cyclones from the Gulf.",
"Some Panhandle radar sites have documented anticyclonic tornadoes — spinning opposite direction — during high-shear, low-CAPE setups in April.",
"The 1987 Saragosa tornado killed 30 people in less than five minutes — it was spawned from a high-precipitation supercell hidden behind rain curtains, invisible to the naked eye.",
"Texas has documented hailstones containing insects and bits of grass inside — drawn up from the ground during the storm’s formative stage.",
"The 1979 Alvin rainfall event still holds the U.S. 24-hour precipitation record of 43 inches — the storm stalled due to a blocked upper-level trough.",
"In late summer, remnants of Pacific hurricanes often cross into Texas through El Paso, bringing tropical moisture that fuels central storm outbreaks days later.",
"Certain mesquites in South Texas can sense barometric pressure drops and close their leaves hours before severe storms arrive.",
"Storm chasers have observed horizontal roll clouds over the Texas Gulf Coast extending nearly 100 miles — evidence of strong cold-pool outflows.",
"Before radar networks, the U.S. Weather Bureau relied on Texas telephone operators to relay storm warnings in the 1940s, leading to delayed alerts during the Waco disaster.",
"The unique reddish tint of some Texas thunderstorms comes from high dust content lofted from New Mexico’s Llano Estacado.",
"Supercell inflow winds near Stephenville once measured 85 mph sustained — stronger than many hurricane eyewalls.",
"In 2008, Hurricane Ike spawned 29 tornadoes as it crossed Texas — more than most standalone spring outbreaks.",
"The uplifted moisture plume from the Gulf of Mexico can feed storms as far north as the Red River, a 400-mile transport channel.",
"Texas’s varied soil types amplify flood risk — clay-rich blackland soil near Austin repels water like pavement once saturated.",
"The Texas Tech National Wind Institute houses the world’s largest tornado simulator, capable of reproducing 200 mph vortices for building testing.",
"The longest-lasting supercell ever recorded over Texas persisted 8.7 hours, traveling from Midland to Wichita Falls without dissipating.",
"Storm debris from the 1957 Dallas tornado was found 70 miles away in Oklahoma.",
"High plains storms often create mammatus clouds so deep they appear illuminated from within by lightning — each lobe a downdraft bubble of sinking cold air.",
"Texas storm anvils have been clocked drifting over 200 miles downwind while still producing lightning in their dissipating stage.",
"The 2013 Granbury tornado produced wind-borne projectiles that embedded two-by-fours through brick veneer walls — a known signature of EF-4 intensity.",
"Many Texas Panhandle supercells exhibit ‘split storms,’ where the left-split rotates opposite direction and can still produce tornadoes.",
"The wet microburst of June 9, 1982, near Midland produced winds of 158 mph — the highest microburst gust on record in Texas.",
"Texas’s convective storm season is lengthened by the state’s latitudinal span — a full 10° of latitude, from Brownsville’s tropics to Dalhart’s plains.",
"High-based storms over West Texas often produce ‘virga’ — rain that evaporates before reaching the ground, creating dramatic downdrafts.",
"In 2017, a supercell near Throckmorton lofted dust and rain so high it was detected by GOES satellite imagery as a heat anomaly.",
"Texas has the nation’s highest average annual lightning flash density west of the Mississippi River.",
"Many central Texas homes were historically built with low-pitch roofs to resist uplift from the frequent southerly storm winds.",
"During the 2020 Easter outbreak, radar in Grayson County detected hail cores at 60,000 feet, high enough to freeze three separate times before falling.",
"The 1900 Galveston hurricane remains the deadliest natural disaster in U.S. history, killing over 8,000 Texans.",
"Texas storms often feature a greenish hue caused by sunlight refracting through ice crystals in hail cores.",
"Early storm chasers in the 1950s used surplus WWII anemometers mounted on car roofs to estimate inflow speeds.",
"The record rainfall from Tropical Storm Claudette in 1979 — 43 inches in 24 hours — still stands unbroken nationwide.",
"The 2021 Hondo hailstone had an internal air cavity, a sign it grew too rapidly for full freezing between cycles.",
"Storm debris from the 1997 Jarrell tornado was found embedded in tree trunks over a mile away.",
"Texas can experience both a severe drought and a flash flood within the same week due to rapid air mass turnover.",
"The convergence line where U.S. 281 meets the Hill Country often serves as a storm initiation corridor known to meteorologists as the ‘Comal trigger.’",
"Texas leads the nation in insured losses from hail by more than double the second-place state.",
"Storm rainfall during Hurricane Harvey in 2017 totaled 60.58 inches in Nederland, Texas — the highest storm total ever measured in the U.S.",
"The 1935 Houston flood reshaped Buffalo Bayou, forcing engineers to design the Addicks and Barker reservoir systems.",
"Lightning strikes from Texas storms have been known to melt transmission lines due to induced current surges.",
"Texas thunderstorms produce powerful gravity waves that can trigger storms hundreds of miles away hours later.",
"Some Texas tornadoes are wrapped in rain so completely that radar is the only way to detect them before impact.",
"The 2007 Eagle Pass tornado was the first EF3 ever recorded that far southwest in Texas.",
"During dryline days, dewpoints east of the boundary may exceed 70°F while just 20 miles west can be bone-dry at 25°F.",
"Texas outflow boundaries can persist for days and act as miniature cold fronts for subsequent storm formations.",
"The 1982 Paris, Texas tornado produced suction vortices that left swirled scorch marks on asphalt roads.",
"The 2011 drought followed by 2015 floods represents one of the sharpest wet-dry reversals in recorded U.S. climate history.",
"Storm updraft velocities in the Hill Country have been measured at 160 mph using mobile Doppler radar.",
"Some storms in Texas exhibit ‘bounded weak echo regions,’ radar holes created by violent updrafts exceeding radar reflectivity limits.",
"Texas’s vast flatlands allow radar to scan storms at unusually shallow angles, improving tornado detection compared to hillier states.",
"The Texas Tech Wind Science Center pioneered debris-impact testing for roofing materials after the 1970 Lubbock F5.",
"San Angelo averages 40 thunderstorm days per year — one of the highest counts west of I-35.",
"South Texas sea breeze fronts often merge with inland outflow boundaries to form severe late-afternoon cells.",
"West Texas haboobs can produce wind gusts strong enough to sandblast paint off vehicles.",
"In the 1950s, Texas A&M meteorologists launched weather balloons daily to map dryline oscillations for crop forecasts.",
"Radar cross-sections over Dallas-Fort Worth often show ‘three-body scatter spikes’ — reflections from hailstones bouncing radar beams between ground and storm core.",
"The 2019 Dallas tornado produced radar debris signatures up to 25,000 feet — confirming homes and trees were lofted nearly five miles high.",
"Texas has documented hailstones containing layers of red dust, proving that desert particles act as nucleation seeds.",
"Panhandle lightning discharges are so frequent they interfere with AM radio frequencies hundreds of miles away.",
"In spring, warm inflow over the Caprock Escarpment enhances lift, creating supercells even when forecast models show low probability.",
"The 2002 Happy, Texas tornado outbreak spawned nine tornadoes from a single cyclic supercell within 90 minutes.",
"Some central Texas storms create ball lightning phenomena during intense electrical activity near power lines.",
"Texas mesonets now record storm gusts every five seconds, capturing rapid microburst signatures previously undetected.",
"The 2015 Van, Texas EF3 tornado followed an exact track of a 1927 twister that hit the same town nearly 90 years earlier.",
"Flash floods in limestone Hill Country creeks can undercut bedrock and form new channels in less than an hour.",
"Hurricane Harvey’s rain bands produced over 30 confirmed tornadoes across coastal Texas.",
"Dryline bulges near Childress often mark the genesis zone for high-risk storm days in the Plains.",
"The 2019 El Paso haboob reduced visibility to less than 20 feet on I-10 and produced gusts over 90 mph.",
"Texas supercells can rotate with such force that they generate mesolows measurable at the surface.",
"The Panhandle’s high elevation means storms there start closer to freezing levels, allowing hail to form more easily.",
"The record for the longest continuous lightning flash in the U.S. — 477 miles — passed through Texas airspace in 2020.",
"The 2007 Gainesville flood rose so fast that multiple vehicles were lifted onto rooftops before rescue crews arrived.",
"Some Texas hailstones reach the ground warmer than 32°F due to aerodynamic heating during descent.",
"The 1995 DFW Mayfest hailstorm destroyed 16,000 car windshields in under an hour.",
"The 2021 Winter Storm Uri’s power failures were partially triggered by ice accumulation on high-voltage insulators.",
"Supercells over the Balcones Escarpment often split into twin storms due to rapid elevation change in the terrain.",
"During some coastal storms, saltwater aerosols seed extra lightning activity inland for hours afterward.",
"The 1930s Dust Bowl taught Texans that severe convective storms could develop even in prolonged drought when instability is high.",
"Texas roof uplift testing after the 2008 Pampa storm led to the modern wind rating system for asphalt shingles.",
"The 2016 San Antonio hailstorm’s ice mass exceeded 12,000 tons — enough to fill the Alamodome halfway.",
"The 2018 North Texas derecho produced sustained winds of 80 mph for over 40 minutes.",
"Corpus Christi thunderstorms often contain mid-level rotation that never reaches the ground — a hallmark of marine-layer shear.",
"Texas’s largest debris field from a single tornado spanned 78 miles across six counties.",
"Some Texas thunderstorms contain rotating wall clouds for over an hour without ever producing a tornado.",
"Radar detected hail 11 miles above ground during a 2019 Midland supercell, the highest ever recorded in the region.",
"Texas produces more anvil-top sprites (upper-atmosphere lightning) than any other U.S. state.",
"Supercells in Texas have been observed to recycle new updrafts up to five times before collapsing.",
"The 2015 Blanco River flood created hydraulic jumps tall enough to overturn RVs parked 30 feet above the riverbed.",
"Texas electrical cooperatives design distribution lines to withstand ice up to one inch thick due to historic storms.",
"The 1900 Galveston hurricane’s storm surge reached 15 feet and carried schooners two miles inland.",
"The 2012 Dallas-Fort Worth tornado outbreak tossed semi-trailers 200 feet into the air — all captured live on television.",
"During 1984’s Memorial Day storm, 13 inches of rain fell on Austin in 3 hours, causing Shoal Creek to rise 29 feet.",
"High-res radar analysis from 2024 shows that 75 percent of Texas tornadoes form along preexisting outflow boundaries.",
"Texas thunderstorms occasionally produce ‘heat bursts’ — sudden dry downdrafts that raise temperature 20°F in minutes.",
"The 1957 Dallas tornado inspired the creation of the first urban tornado shelter codes in Texas.",
"Lightning-induced wildfires in West Texas can smolder underground for weeks due to caliche-rich soil.",
"The Panhandle’s dryline oscillates east and west nearly 60 times per year — each pass capable of triggering a storm outbreak.",
"The 2000 Fort Worth tornado tore a 35-story hole in the Bank One building, exposing entire office floors to the sky.",
"Texas thunderstorms produce so much cloud ice that cirrus debris can drift into Louisiana the following day.",
"The 2017 Canton tornadoes followed converging boundaries visible only by mobile radar, unseen by public warnings.",
"Some Texas flash floods occur under clear skies when upstream convection dumps water miles away.",
"The 2020 Easter hailstorm in San Angelo was so dense that it clogged drainage systems and caused ice fog the next morning.",
"Texas has the only operational mobile Doppler array designed specifically to chase supercells — based out of Texas Tech University.",
"Storm rainfall can infiltrate cracked limestone in Hill Country and resurface miles away through artesian springs.",
"The longest-lived bow echo in Texas history traveled from El Paso to Fort Worth in 17 hours.",
"During some coastal lightning events, strikes have been measured at over 300 kiloamps — ten times the average current.",
"Corpus Christi Bay can generate waterspouts that move inland as tornadoes, technically classifying them as ‘tornadic transitions.’",
"Texas Power Grid engineers maintain a 'storm reserve' generation margin specifically for thunderstorm-driven surges in summer.",
"The record snow during the 2021 storm in Marfa measured 14 inches — an event driven by Gulf moisture reaching 5,000-foot elevation.",
"The 1979 Wichita Falls tornado carved a damage swath 1.5 miles wide and 8 miles long — one of the widest in North America.",
"Texas radar operators coined the phrase ‘hail spike’ after observing vertical reflectivity streaks during the 1980s Panhandle hail studies.",
"Some supercells in North Texas produce audible infrasound frequencies detectable 30 miles away with proper sensors.",
"The 2014 Medina County microburst uprooted 150 pecan trees in under a minute — all fell in the same direction.",
"The 1999 Fort Stockton dust storm reduced visibility to zero for 8 hours straight and coated snow in Amarillo red the next day.",
"The shape of the Balcones Escarpment amplifies storm updrafts by forcing warm moist air to rise nearly 1,000 feet abruptly.",
"Texas has recorded more F5 and EF5 tornadoes than any state west of the Mississippi River.",
"The average Texas thunderstorm releases enough latent heat energy to power the entire state for 20 minutes.",
"Some hailstones from Texas storms contain microscopic traces of seawater from Gulf evaporation plumes.",
"Texas holds more billion-dollar thunderstorm losses annually than all of Europe combined.",
"Satellite imagery from 2024 showed a Texas supercell casting a shadow 180 miles long across the Gulf Coast.",
"The 1970 Lubbock tornado inspired the first computer model of a supercell’s vertical velocity field, revealing updrafts that exceeded 170 miles per hour in the core.",
"In 1957, a Dallas tornado’s debris signature was the first ever documented on radar, leading to the modern Doppler warning system decades later.",
"Texas Panhandle hailstones frequently contain red desert dust particles, proving they originated from sand lofted over 200 miles by updrafts.",
"During the 2021 Hondo hailstorm, stones cycled through the freezing layer up to 14 times before reaching the ground — each pass added a new translucent layer like tree rings.",
"The warm layer known as ‘the cap’ over Central Texas acts like a lid on a pressure cooker — once surface heating breaks it, storms can explode vertically in less than ten minutes.",
"The 1997 Jarrell F5 tornado had ground scouring so severe that topsoil and grass were stripped clean, exposing limestone bedrock across multiple acres.",
"Texas supercells often produce inflow jets exceeding 80 miles per hour, strong enough to bend power poles before the tornado even touches down.",
"The 1979 Wichita Falls ‘Terrible Tuesday’ tornado destroyed 3,095 homes, leaving behind a damage swath over 1.5 miles wide — the widest ever recorded in Texas.",
"Texas is one of few states where tornadoes can spin both clockwise and counterclockwise due to shear reversal along the dryline.",
"During the 1995 Fort Worth Mayfest hailstorm, Doppler radar recorded reflectivity values beyond 75 dBZ — so high the hail core was ‘off the charts’ by NEXRAD standards.",
"The 2021 Winter Storm Uri produced thundersnow events across North Texas — lightning bolts discharging within snow bands, a phenomenon rarer than ball lightning.",
"Texas thunderstorms have generated lightning bolts over 75 miles long, some connecting cloud systems across multiple counties.",
"The 1987 Saragosa tornado hit during a school graduation ceremony and was so fast-moving that many victims never heard thunder before impact.",
"The Panhandle’s elevation and dry air aloft make it one of the few places on Earth where hail forms more readily than rain.",
"Texas Tech researchers discovered that 80 percent of shingle roof damage in hail events occurs on the windward side, due to hail velocity combining with inflow winds.",
"Pressure sensors during the 1953 Waco F5 recorded a 2.5-inch mercury drop in under 10 seconds — equivalent to a Category 5 hurricane’s core.",
"The record rainfall from Tropical Storm Claudette in 1979 dumped 43 inches in 24 hours — the heaviest one-day total ever measured in U.S. history.",
"During the 2015 Blanco River flood, the water rose 28 feet in 90 minutes, carrying homes intact for over a mile before disintegration.",
"Texas’s Balcones Escarpment acts as a natural storm trigger, forcing moist Gulf air upward to ignite convection every spring afternoon.",
"The 2016 San Antonio hailstorm dropped so much ice that radar estimated the total hail mass at over 12,000 tons — enough to fill 900 dump trucks.",
"Storm chasers have recorded mammatus clouds over North Texas with lobes up to 1,200 feet deep — among the largest ever photographed.",
"During some Texas supercells, updraft cores rotate fast enough to create measurable surface pressure drops before tornado formation.",
"The 1935 Houston flood led directly to the construction of the Addicks and Barker Reservoirs — a move that still defines modern Houston flood control.",
"Texas holds the U.S. record for the longest continuous lightning flash — a 477-mile discharge that crossed from the Panhandle into Oklahoma in 2020.",
"Texas supercells have been observed creating rotating wall clouds for over an hour without producing a tornado, a behavior known as ‘cycling mesocyclogenesis’.",
"At 1.75 inches in diameter, a Texas hailstone strikes a roof at nearly 70 miles per hour, delivering over 70 foot-pounds of impact energy — enough to fracture most Class 3 asphalt shingles.",
"Wind uplift on a standard Texas gable roof increases by roughly 1.5 percent for every mile per hour over 90, meaning a 120-mph gust can generate over 45 pounds of suction per square foot.",
"Steep 10/12 roofs in Texas experience 40 to 60 percent higher uplift forces at the ridge compared to 4/12 slopes, which is why ridge cap blow-offs are common after major hailstorms.",
"Texas Tech’s Debris Impact Facility confirmed that a 2-inch hailstone falling at terminal velocity can puncture 26-gauge R-panel steel in less than one-tenth of a second.",
"The majority of hail-induced leaks occur at shingle mats weakened by ultraviolet aging rather than fresh asphalt, explaining why older roofs fail sooner even under smaller stones.",
"When wind direction aligns with roof rake edges, negative pressure at the eaves can exceed 100 pounds per square foot — enough to pull nails through decking on poorly fastened structures.",
"During the 2021 Hondo hail event, insurance engineers documented bruising to Class 4 impact-resistant shingles — the first confirmed failure of that UL 2218 rating level in Texas history.",
"Hail-driven spatter marks form due to calcium carbonate removal from asphalt granules, and can reveal wind direction for forensic adjusters within 48 hours of the storm.",
"The 1995 Mayfest storm produced hail cores with embedded air bubbles that amplified shingle puncture damage by increasing surface velocity from aerodynamic drag effects.",
"Instanding-seam metal roofs can experience ‘clip flutter’ when wind gusts exceed 95 mph; repeated cycles can shear the concealed fasteners even without visible panel deformation.",
"Granule loss on a 30-year shingle increases roof surface temperature by up to 25 degrees Fahrenheit, accelerating UV oxidation and doubling brittleness within two summers.",
"The suction side of a Texas tornado can strip shingles even if the wind speed stays below the manufacturer’s rating because uplift acts normal to the surface rather than parallel.",
"Roof decking nailed at 6-inch edge spacing can resist 25 percent more uplift than decks nailed at 12 inches, but most pre-2000 Texas homes were built with 12-inch spacing or worse.",
"Radiant barrier decking in newer Texas builds reflects infrared heat upward, which can slightly weaken sealant adhesion under repeated high-temperature storm cycles.",
"Underlayment tears typically occur along truss valleys during hailstorms where suction pulses overlap with impact energy — a combination unique to Texas dryline supercells.",
"Wind tunnel testing at Texas Tech showed that open gable vents can cause interior pressure surges up to 40 percent higher than homes with sealed attics during 100-mph gusts.",
"In central Texas storms, the majority of roof tile failures begin from sub-surface impact fractures invisible from above — detectable only by moisture intrusion mapping or IR cameras.",
"Insurance engineers documented standing-seam panels bending downward in suction rather than upward during the 2020 Dallas derecho, indicating reverse pressure from turbulent vortices.",
"The typical three-tab shingle has an uplift failure threshold near 60 pounds per square foot; gusts of 110 mph can reach that pressure at roof edges even without debris impact.",
"Post-storm attic inspections often reveal daylight near nail penetrations — not leaks — but evidence that deck flexing during suction cycles elongated the nail holes in OSB panels.",
"The 1970 Lubbock F5 led directly to Texas Tech’s invention of the ‘windborne debris cannon,’ capable of firing a 2x4 at 100 mph to simulate flying debris impact on walls and roofs.",
"During Hurricane Harvey, Houston roofers found that parapet walls over 18 inches actually worsened uplift by creating vortices at the edge, not protection as previously assumed.",
"Metal roofs fastened with exposed screws lose 50 percent of pull-out strength after 12 years due to thermal cycling; once washers harden, storm vibration accelerates leakage instantly.",
"Texas hail impact often fractures fiberglass mats without visible granule loss — those hidden fractures wick moisture and delaminate the asphalt layer within one summer season.",
"In forensic testing after the 2016 San Antonio hailstorm, impact craters on single-ply TPO membranes showed rebound divots caused by hailstones melting on contact and re-freezing instantly.",
"In 2025, Texas recorded one of its most active hail seasons in over a decade, with multiple outbreaks producing stones larger than 5 inches.",
"On May 25th, 2025, a storm over the Rolling Plains produced hailstones the size of softballs that shattered windshields and punctured metal roofs.",
"Late May 2025 storms over Central Texas combined 70 mph winds, baseball-size hail, and flash flooding within a single supercell.",
"The March 2025 hailstorm affected more than sixty thousand properties across Texas, making it one of the earliest major events of the year.",
"During the April 2025 outbreak, radar measured hail cores exceeding 70 dBZ, indicating hailstones with impact energy equal to a falling baseball.",
"In 2025, the National Weather Service logged over two hundred hail reports in Texas in a single week, one of the highest tallies on record.",
"The 2025 storm season began unusually early, with severe hail forming in late February due to unseasonably warm Gulf moisture.",
"Across Texas in 2025, several storms produced hailstones with embedded red dust from West Texas, proving cross-regional updraft transport.",
"Wind gusts during the May 2025 outbreak in the Austin region reached seventy-seven miles per hour, uprooting large oaks and damaging thousands of roofs.",
"Roofing contractors in 2025 reported that hail-driven shingle fractures increased by nearly thirty percent compared to the 2024 season.",
"The 2025 hail season prompted several insurance carriers to re-evaluate policy deductibles across Central and North Texas due to record claim frequency.",
"During the 2025 West Texas supercell sequence, some hailstones cycled through the freezing layer up to fifteen times before reaching the ground.",
"By mid-year 2025, Texas had already logged over one hundred separate hail swath maps covering portions of the Hill Country and DFW region.",
"The 2025 Austin hailstorm generated over sixty-eight thousand power outages in less than one hour as ice accumulation shorted transformers.",
"Drone footage from May 2025 revealed concentric spatter patterns on vehicles that allowed forensic analysts to determine hail trajectory and velocity.",
"Thermal imaging after the April 2025 hailstorm showed roof deck bruising invisible to the human eye but radiating excess heat during the next day’s sunlight.",
"In 2025, hail impact research in Lubbock confirmed that certain Class 4 shingles failed under real-world conditions when stones exceeded two inches.",
"The 2025 hail season broke records for claim volume on solar panels, forcing manufacturers to adopt thicker glass and aluminum frames for Texas installations.",
"Several 2025 storm events featured mixed hail and lightning bursts occurring simultaneously, producing flash rates over sixty per minute in the Panhandle.",
"The May 2025 storms generated more hail mass over Texas in one month than the entire 2022 season combined.",
"During the 2025 central storm complex, mobile radar detected rotating updrafts extending to sixty thousand feet, confirming supercell intensity comparable to small hurricanes.",
"In 2025, the Hill Country experienced back-to-back storm days where radar-indicated rainfall exceeded five inches per hour.",
"Multiple Texas counties in 2025 declared disaster zones after a single weekend produced hail, tornadoes, and flooding in the same weather system.",
"Data from 2025 mobile weather stations showed that hailstones in Texas can accelerate faster than theoretical terminal velocity when entrained in strong downdrafts.",
"By October 2025, total insured storm losses in Texas surpassed all other states combined, reaffirming its position as the nation’s hail capital.",
"In March 2024, a Texas hail map showed over 6,800 properties impacted by hail ≥1.00 inch on March 7 alone, illustrating how early in the year major hail losses are occurring.",  
"On April 8–11, 2024, severe storms in Texas brought large hail, damaging winds and tornadoes across central and eastern portions of the state during an unusually early season set-up.",  
"On May 9, 2024, central Texas near Johnson City recorded hailstones up to 5 inches in diameter, among the largest ever observed in the region.",  
"On May 16–17, 2024, the so-called Houston ‘derecho’ produced wind gusts up to 100 mph in downtown Houston, shattered high-rise windows and left over one million customers without power.",  
"Late May 2024 (May 28) storms in the South Plains dropped hail up to 2.50 inches in diameter in Bailey County and produced grape-sized hail in West Texas.",  
"In June 2024, near Vigo Park in the Texas Panhandle a hailstone was observed that may have broken the state all-time size record, potentially exceeding the previous 6.416-inch record.",  
"In 2024, Texas recorded a reported 529 hail events in one analysis — described as a 167 % spike compared to the previous year — underscoring the rapid increase in hail frequency.",  
"During the April–June 2024 spring severe weather window, Texas invoked multiple disaster declarations due to the combined impacts of hail, wind, floods and tornadoes.",  
"The 2024 summer of storms saw an insurance and construction industry warning: the 2024 hail and wind events in Texas produced materially higher frequencies of roofing and siding claim notifications than any spring before it.",  
"The May 2024 Memorial Day weekend storms in North Texas produced massive power outages—reports cited over 800,000 customers without power—as hail, heavy rain and gusts combined.",  
"The Urban Dallas–Fort Worth region in May 2024 experienced multiple hail cores within hours, causing layered roof deck and shingle damage rarely seen outside of major hail belt events.",  
"The 2024 Texas storm events also saw significant mixed-mode damage: hail, straight-line winds and flash flooding all in single storm complexes, complicating damage attribution for adjusters.",  
"Following the May–June 2024 storms, some Texas carriers began re-vising roof inspection protocols to include infrared scans due to repeated instances of non-visible hail deck damage below the shingle surface.",  
"In 2024, the storm season in Texas featured early-morning severe cells (pre-dawn) more often than usual, catching some residential complexes unprepared and increasing insurance exposure in the pre-warning window.",  
"The June 2024 storms in West Texas and the Panhandle produced hail and wind cores that extended into the early evening, disrupting agribusiness and transportation as well as residential exposures.",  
"In Texas’ 2024 storm events, the range of hail sizes broadened: while large stones still occurred, many more events included hail in the 1.5- to 2.5-inch range, increasing the volume of medium-damage claims.",  
"The 2024 Texas storms prompted some contractors to report recurring loosening of roof fasteners after hail + wind combos—indicating wind-assisted hail impacts are increasing structural stress even when hail alone might not breach the shingle.",  
"In 2024 several Texas counties recorded dual-hazard days where both hail and flash-flooding occurred within six hours of each other, increasing cumulative damage to roofs, siding and foundations.",  
"The December 28-29, 2024 tornado outbreak included an EF-3 tornado in Montgomery County, Texas that took out roofs and exterior walls in less than one minute—highlighting late-season severe weather risk in Texas.",  
"In 2024 the cost of Texas storm losses rose noticeably: high wind and hail events in Texas contributed to multiple billion-dollar disaster declarations for the state that year.",  
"After the 2024 storms, roofing manufacturers noted a marked uptick in failure claims of Class 3 shingles in Texas when hail coupled with wind gusts above 80 mph—raising questions on whether current ratings adequately reflect combined hazard loads.",  
"The 2024 Texas severe-weather period saw many multi-state convective complexes begin over the High Plains and sweep into Texas, meaning adjusters must increasingly consider storm history north of the state when evaluating Texas damage.",  
"In 2024 debris-impact testing linked to Texas storms found hailstones with embedded sand/rock dust (lofted from the Caprock) were more likely to crack laminate shingles, suggesting local geology is influencing impact damage.",  
"During the large Texas hail outbursts of 2024, contractors reported seeing reflective ‘bruise’ patterns on metal roofs where hail did not break the panel but created sub-surface cracking invisible to the unaided eye.",  
"The frequency and severity of Texas spring storms in 2024 led several municipalities to review building codes to consider enhanced wind uplift and impact-resistant roofing in previously exempt zones.",
"In 2024, hail impact testing in Texas showed that fiberglass-mat shingles lost 30 percent of tear resistance after three consecutive hail events, even when no visible damage was seen on the surface.",
"The May 2024 Houston windstorm produced peak gusts exceeding 95 mph at roof height, creating uplift loads over 100 pounds per square foot on some commercial flat roofs.",
"Post-storm inspections in 2024 revealed that parapet caps on many Texas strip centers failed first, allowing rain to enter wall cavities before any roof membrane rupture occurred.",
"In 2024, forensic engineers found that unvented attic assemblies with radiant barriers suffered 18 percent higher shingle surface temperatures during hailstorms, reducing impact resilience.",
"The 2024 storm season produced widespread soffit blow-outs in homes with continuous aluminum vent strips, which acted as pressure release points under strong updraft pulses.",
"Roofing fastener pull tests conducted after the May 2024 derecho showed that OSB panels saturated from rain lost half of their nail retention strength within 24 hours.",
"Texas Tech wind tunnel simulations in 2024 confirmed that ridge vents can amplify localized uplift when oriented perpendicular to peak gust direction.",
"Following the 2024 hail events, insurance labs verified that hailstones striking at 110 mph can rebound with up to 30 percent of their kinetic energy, doubling secondary impact risk on adjacent slopes.",
"The May 2024 Dallas hailstorm demonstrated that hail impact can shear shingle sealant strips cleanly, leaving the mat intact but prone to future wind failure.",
"Infrared scans after the 2024 DFW storms showed thermal anomalies in roof decks that correlated directly with micro-fractured mats, confirming subsurface bruising detection validity.",
"In 2024, large commercial roofs with mechanically fastened TPO membranes exhibited corner flutter oscillations above 60 mph winds, loosening plates long before material rupture.",
"Post-event investigations in 2024 found that hail striking at oblique angles (over 30 degrees) caused twice as many ridge cap fractures as direct vertical impacts.",
"During the 2024 San Angelo hailstorm, multiple buildings experienced shingle displacement patterns indicating updraft-induced reverse flow — a vertical suction effect pulling from below the deck line.",
"Insurance engineers noted that homes with spray-foam insulated attics in 2024 exhibited less roof sheathing detachment, as the foam acted as secondary structural reinforcement.",
"The 2024 hail season prompted new data showing that laminated shingles delaminate along the adhesive bond line first, rather than splitting through the fiberglass mat as previously believed.",
"Texas restoration firms in 2024 reported a surge in underlayment ballooning, where trapped vapor pressure from hail-heated decks caused blisters visible after re-shingling.",
"Metal roofs installed on purlins rather than solid decking showed higher dent counts in 2024 storms because the panels flexed inward under impact, increasing deformation radius.",
"During a 2024 event near Lubbock, radar data correlated maximum hail reflectivity with measured roof impact energy of 85 foot-pounds — sufficient to puncture 24-gauge steel panels.",
"Claims filed in 2024 increasingly included secondary damage from attic humidity rises after shingle bruising allowed minor vapor leaks not visible in daylight inspections.",
"Windborne debris from the 2024 Houston derecho caused shingle uplift patterns mimicking tornado scouring, requiring forensic adjusters to analyze debris vector orientation.",
"In 2024, forensic labs identified micro-fractures in 1-inch hail impact zones that propagated outward six months later under solar expansion cycles, leading to delayed leak development.",
"Flat commercial roofs in 2024 experienced membrane shrinkage due to high surface temperatures following hail-induced coating abrasion, revealing white streaking patterns measurable by drone thermography.",
"Following the 2024 North Texas hailstorms, adjusters documented a 25 percent rise in claims for ridge vent intrusion where hailstones had shattered plastic baffles inside unseen cavities.",
"The 2024 Houston windstorm caused large industrial doors to fail outward before roof panels detached, proving interior pressure buildup was a primary failure mechanism.",
"Texas contractors in late 2024 began experimenting with polymer-based roof coatings that self-heal micro-impacts after hail, a response to repeated storm losses that year.",
"In 1997, the Jarrell, Texas tornado was so powerful that it ripped asphalt off roads and left behind furrows carved into solid limestone bedrock.",
"In 1979, the Wichita Falls tornado was so wide it created its own internal weather system with miniature vortices rotating inside the main funnel.",
"During the 1953 Waco tornado, barometric pressure dropped so fast that some victims died from internal organ rupture due to decompression, not debris impact.",
"A 2021 hailstone in Hondo, Texas measured 6.416 inches across and weighed over a pound, large enough to punch through a truck roof.",
"Texas once had hail so dense in 1995 that it buried entire neighborhoods in Fort Worth under two feet of ice that didn’t melt for days.",
"In the 2015 Blanco River flood, water levels rose twenty-eight feet in ninety minutes, strong enough to carry entire homes downstream intact.",
"The 1900 Galveston hurricane pushed a fifteen-foot storm surge that carried ships two miles inland and completely erased parts of the island’s west end.",
"In 2020, a single lightning flash over Texas stretched 477 miles across the sky — the longest ever recorded on Earth.",
"The 1970 Lubbock tornado destroyed so much infrastructure that engineers used it to develop the Enhanced Fujita scale decades later.",
"In 2016, hailstones near San Antonio were recorded at 4.5 inches wide, shattering thousands of solar panels and skylights in minutes.",
"In 1935, Houston’s Buffalo Bayou flooded so violently that debris was found forty miles downstream on the Gulf Coast.",
"Some Texas supercells have updrafts exceeding 160 miles per hour — fast enough to lift cars into the cloud base before dropping them miles away.",
"In 2024, hail in the Texas Panhandle grew around dust cores that originated over 400 miles away in New Mexico, proving cross-state particulate seeding.",
"The 1995 Mayfest storm in Fort Worth caused over two billion dollars in damage without a single tornado — just hail and straight-line winds.",
"Radar analysis of the 2025 Austin hailstorm revealed supercooled water droplets cycling through the freezing layer fifteen times before becoming baseball-sized ice.",
"In 2008, Hurricane Ike spawned twenty-nine tornadoes across Texas while still classified as a tropical storm inland.",
"Lightning from Texas thunderstorms can exceed 300,000 amperes — strong enough to melt two inches of solid copper instantly.",
"During the 1987 Saragosa tornado, the entire town was destroyed in under three minutes; only the church bell tower remained standing.",
"Texas has recorded hailstones that fell warm — above freezing — due to aerodynamic heating during descent from 40,000 feet.",
"The Panhandle is one of the only regions on Earth where tornadoes have been documented spinning clockwise instead of counterclockwise.",
"Supercell storms over the Hill Country have grown high enough to pierce the stratosphere, visible from orbit as overshooting domes.",
"In 2019, a hailstorm near Abilene broke 8,200 vehicle windshields in one night — a U.S. record for auto glass loss.",
"The longest-lasting thunderstorm over Texas persisted 8.7 hours from Midland to Wichita Falls, maintaining rotation the entire time.",
"In the 1950s, radar operators at Dyess Air Force Base watched a Texas storm produce a hail core that temporarily reflected radar waves stronger than nearby airplanes.",
"In one 2023 event, radar recorded hail reflectivity so intense over North Texas that it overloaded the signal processors, causing the entire radar sweep to appear solid white.",
];

const STATUS_MESSAGES = [
  "Gathering storm intel from across Texas skies...", 
  "Pulling radar archives and hail strike data...",
  "Scanning NOAA wind and flood reports statewide...",
  "Comparing carrier loss records and claim zones...",
  "Cross-referencing property coordinates with storm paths...",
  "Analyzing 10-year weather pattern data...",
  "Almost done — crunching your risk score..."
];

// DOM Elements
let elements = {};

// State Management
let state = {
  isSubmitting: false,
  resultsShown: false, // Prevent multiple showResults() calls
  intervals: {
    fact: null,
    status: null,
    progress: null,
    timedProgress: null
  },
  currentStep: 0,
  startTime: null,
  progressStartTs: null,
  progressMaxMs: 5 * 60 * 1000, // default 5 minutes (reduced by another third)
  backgroundPoll: null
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  bindEventListeners();
  setupFormValidation();
  preloadContent();
});

function initializeElements() {
  elements = {
    form: document.getElementById('stormForm'),
    formPanel: document.getElementById('formPanel'),
    resultsPanel: document.getElementById('resultsPanel'),
    loading: document.getElementById('loading'),
    results: document.getElementById('results'),
    confirmation: document.getElementById('confirmation'),
    statusMessage: document.getElementById('statusMessage'),
    factText: document.getElementById('fact'),
    submitBtn: document.querySelector('.submit-btn'),
    btnText: document.querySelector('.btn-text'),
    btnLoader: document.querySelector('.btn-loader'),
    progressDots: document.querySelectorAll('.progress-dot')
  };
}

function bindEventListeners() {
  elements.form.addEventListener('submit', handleFormSubmission);
  
  // Add input validation listeners
  const requiredInputs = document.querySelectorAll('input[required]');
  requiredInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });
}

function setupFormValidation() {
  // ZIP code validation
  const zipInput = document.getElementById('zip');
  zipInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
  });
  
  // Phone number formatting
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
      value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
    }
    e.target.value = value;
  });
  
  // Date validation
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');
  if (startDate && endDate) {
    startDate.addEventListener('change', function() {
      if (endDate.value && startDate.value > endDate.value) {
        endDate.value = startDate.value;
      }
      endDate.min = startDate.value;
    });
  }
}

function preloadContent() {
  // Preload first fact
  if (elements.factText) {
    elements.factText.textContent = TEXAS_STORM_FACTS[0];
  }
}

// Form Submission Handler
async function handleFormSubmission(e) {
  e.preventDefault();
  
  if (state.isSubmitting) return;
  
  if (!validateForm()) {
    showFormErrors();
    return;
  }
  
  state.isSubmitting = true;
  state.startTime = Date.now();
  
  // Generate request ID for tracking
  state.currentRequestId = generateRequestId();
  
  // Update UI immediately
  transitionToLoading();
  
  // Collect form data
  const formData = collectFormData();
  
  try {
    // Start loading animations
    startLoadingSequence();
    
    // Submit to Zapier
    const response = await submitToZapier(formData);
    
    // Ensure minimum loading time for UX
    const elapsedTime = Date.now() - state.startTime;
    const remainingTime = Math.max(0, CONFIG.timings.minLoadingTime - elapsedTime);
    
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime));
    }
    
    // Handle success
    handleSubmissionSuccess(response);
    
  } catch (error) {
    console.error('Submission error:', error);
    handleSubmissionError(error);
  } finally {
    state.isSubmitting = false;
  }
}

function validateForm() {
  const requiredFields = ['name', 'email', 'address', 'city', 'zip'];
  let isValid = true;
  
  requiredFields.forEach(fieldName => {
    const field = document.getElementById(fieldName);
    if (!field.value.trim()) {
      markFieldError(field, 'This field is required');
      isValid = false;
    }
  });
  
  // Email validation
  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && !emailRegex.test(email.value)) {
    markFieldError(email, 'Please enter a valid email address');
    isValid = false;
  }
  
  // ZIP validation
  const zip = document.getElementById('zip');
  if (zip.value && !/^\d{5}$/.test(zip.value)) {
    markFieldError(zip, 'Please enter a valid 5-digit ZIP code');
    isValid = false;
  }
  
  return isValid;
}

function validateField(e) {
  const field = e.target;
  clearFieldError(field);
  
  if (field.hasAttribute('required') && !field.value.trim()) {
    markFieldError(field, 'This field is required');
    return false;
  }
  
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      markFieldError(field, 'Please enter a valid email address');
      return false;
    }
  }
  
  return true;
}

function markFieldError(field, message) {
  field.style.borderColor = '#e74c3c';
  field.setAttribute('title', message);
  
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error message
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  field.parentNode.appendChild(errorElement);
}

function clearFieldError(eOrField) {
  const field = (eOrField && eOrField.target) ? eOrField.target : eOrField;
  if (!field || !field.style) return;
  field.style.borderColor = '#333';
  field.removeAttribute('title');
  
  const parent = field.parentNode;
  if (!parent || !parent.querySelector) return;
  const errorMessage = parent.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

function showFormErrors() {
  // Scroll to first error
  const firstError = document.querySelector('input[style*="border-color: rgb(231, 76, 60)"]');
  if (firstError) {
    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstError.focus();
  }
}

function collectFormData() {
  const formData = new FormData(elements.form);
  const data = {};
  
  // Collect all form fields
  for (let [key, value] of formData.entries()) {
    data[key] = value.trim();
  }
  
  // Ensure state is Texas
  data.state = 'Texas';
  
  console.log('Collected form data:', data);
  return data;
}

function transitionToLoading() {
  // Update button state
  elements.btnText.classList.add('hidden');
  elements.btnLoader.classList.remove('hidden');
  elements.submitBtn.disabled = true;
  
  // Slide out form panel
  elements.formPanel.classList.add('slide-out');
  
  // Show loading after transition
  setTimeout(() => {
    // Expand to a full-screen loading experience
    document.body.classList.add('loading-fullscreen');

    elements.resultsPanel.style.display = 'flex';
    elements.loading.classList.remove('hidden');

    // Ensure a progress bar exists for polling feedback and avoid looking stuck at 0-1%
    updateProgressPercentage(3);
    // Start time-based progress over 15 minutes
    startTimedProgress(state.progressMaxMs);
    
    // Store request ID for live progress tracking
    if (state.currentRequestId) {
      console.log('Live progress tracking enabled for request:', state.currentRequestId);
      // Tracking buttons removed per user request
    }
  }, 250);
}

function startLoadingSequence() {
  // Start fact rotation immediately
  rotateFact();
  state.intervals.fact = setInterval(rotateFact, CONFIG.timings.factRotation);
  
  // Start status rotation
  rotateStatus();
  state.intervals.status = setInterval(rotateStatus, CONFIG.timings.statusRotation);
  
  // Start progress indicators
  state.intervals.progress = setInterval(updateProgressIndicators, 1200);
  
  // Start live progress tracking if enabled
  if (CONFIG.enableLiveProgress) {
    state.intervals.liveProgress = setInterval(checkLiveProgress, CONFIG.timings.progressUpdateInterval);
  }
}

// Live Progress Tracking (Optional)
async function checkLiveProgress() {
  if (!state.currentRequestId) return;
  
  try {
    const response = await fetch(`${CONFIG.progressEndpoint}?request_id=${state.currentRequestId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const progress = await response.json();
      console.log('Live progress received:', progress);
      updateLiveProgress(progress);
    }
  } catch (error) {
    console.log('Live progress check failed (this is normal if endpoint not configured):', error.message);
  }
}

function updateLiveProgress(progress) {
  // Update status message with current step
  if (progress.current_step && elements.statusMessage) {
    const stepMessages = {
      'coordinates': 'Converting address to coordinates...',
      'weather_data': 'Gathering historical weather data...',
      'chatgpt_analysis': 'AI analyzing storm patterns and risks...',
      'pdf_generation': 'Generating your detailed report...',
      'email_sending': 'Preparing to send your report...',
      'complete': 'Analysis complete - preparing results...'
    };
    
    const customMessage = stepMessages[progress.current_step] || progress.status_message || 'Processing...';
    elements.statusMessage.textContent = customMessage;
    console.log('Progress step:', progress.current_step, '→', customMessage);
  }
  
  // Update progress bar if server provides percentage
  if (progress.percentage !== undefined && progress.percentage !== null) {
    console.log('Server progress:', progress.percentage + '%');
    updateProgressPercentage(progress.percentage);
  }
  
  // Update progress dots based on step
  if (progress.step_number !== undefined) {
    updateProgressDots(progress.step_number, progress.total_steps || 5);
  }
  
  // Handle completion signal from server
  if (progress.status === 'complete' || progress.percentage >= 100) {
    console.log('Server reported completion, stopping live progress tracking');
    if (state.intervals.liveProgress) {
      clearInterval(state.intervals.liveProgress);
      state.intervals.liveProgress = null;
    }
  }
}

function updateProgressPercentage(percentage) {
  // Never decrease shown progress
  if (typeof state.progressShownPct !== 'number') state.progressShownPct = 0;
  const pct = Math.max(state.progressShownPct, Number(percentage) || 0);
  state.progressShownPct = pct;

  // Create or update a single progress bar UI
  let progressBar = document.querySelector('.live-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'live-progress-bar';
    progressBar.innerHTML = `
      <div class="progress-track">
        <div class="progress-fill" style="transition: width 0.6s ease; background:#FF6A13;"></div>
      </div>
      <div class="progress-text" style="color:#FF6A13;">${pct.toFixed(1)}%</div>
    `;
    const loadingContainer = elements.loading;
    if (loadingContainer) loadingContainer.appendChild(progressBar);
  }

  const fill = progressBar.querySelector('.progress-fill');
  const text = progressBar.querySelector('.progress-text');
  if (fill) {
    fill.style.width = `${pct}%`;
    fill.style.background = '#FF6A13'; // Kubota orange
  }
  if (text) {
    text.textContent = `${pct.toFixed(1)}%`;
    text.style.color = '#FF6A13'; // Kubota orange
  }
}

function updateProgressDots(currentStep, totalSteps) {
  const dots = elements.progressDots;
  if (!dots.length) return;
  
  // Clear all active states
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Activate dots up to current step
  for (let i = 0; i < Math.min(currentStep, dots.length); i++) {
    dots[i].classList.add('active');
  }
}

function rotateFact() {
  const factElement = elements.factText;
  if (!factElement) return;
  
  // Trigger exit animation
  factElement.classList.remove('fact-enter');
  factElement.classList.add('fact-exit');

  setTimeout(() => {
    // Change text
    const randomFact = TEXAS_STORM_FACTS[Math.floor(Math.random() * TEXAS_STORM_FACTS.length)];
    factElement.textContent = randomFact;
    // Switch to enter animation
    factElement.classList.remove('fact-exit');
    void factElement.offsetWidth; // reflow to restart animation
    factElement.classList.add('fact-enter');
  }, 220);
}

function rotateStatus() {
  const statusElement = elements.statusMessage;
  if (!statusElement) return;
  
  statusElement.style.opacity = '0';
  
  setTimeout(() => {
    const nextMessage = STATUS_MESSAGES[state.currentStep % STATUS_MESSAGES.length];
    statusElement.textContent = nextMessage;
    statusElement.style.opacity = '1';
    state.currentStep++;
  }, 200);
}

function updateProgressIndicators() {
  const dots = elements.progressDots;
  if (!dots.length) return;
  
  // Remove all active states
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active state to current dot
  const currentDot = (state.currentStep - 1) % dots.length;
  if (dots[currentDot]) {
    dots[currentDot].classList.add('active');
  }
}

function stopLoadingSequence() {
  Object.keys(state.intervals).forEach(key => {
    if (state.intervals[key]) {
      clearInterval(state.intervals[key]);
      state.intervals[key] = null;
    }
  });
  // Stop background polling if running
  if (state.backgroundPoll && state.backgroundPoll.timer) {
    clearTimeout(state.backgroundPoll.timer);
    state.backgroundPoll.timer = null;
  }
}

async function submitToZapier(data) {
  console.log('Submitting via Worker proxy:', data);
  // Ensure we attach a stable request_id for end-to-end tracing
  try {
    if (state && state.currentRequestId) {
      data.request_id = state.currentRequestId;
    }
  } catch (_) {}

  const response = await fetch(CONFIG.zapierWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Widget-Client': 'storm-widget/1'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // Get response text first to handle both JSON and plain text
  const responseText = await response.text();
  console.log('Zapier response:', responseText);
  
  let result;
  try {
    result = JSON.parse(responseText);
  } catch (e) {
    // If not JSON, check if it's a simple success message
    if (responseText.includes('success') || responseText.includes('ok')) {
      result = { status: 'success', message: 'Request processed' };
    } else {
      // Try to extract JSON from response if embedded
      const jsonMatch = responseText.match(/\{.*\}/s);
      if (jsonMatch) {
        try {
          result = JSON.parse(jsonMatch[0]);
        } catch (e2) {
          result = { status: 'success', message: 'Request processed' };
        }
      } else {
        result = { status: 'success', message: 'Request processed' };
      }
    }
  }
  
  // Log worker forwarding details if present
  if (result && (result.forwarded_to || result.forward_mode || result.received_fields)) {
    console.log('Worker forwarded to:', result.forwarded_to);
    console.log('Forward mode:', result.forward_mode);
    console.log('Fields received by worker:', result.received_fields);
  }
  
  // Check if we got real-time results from Zapier
  if (result.analysis_complete || result.hail_probability !== undefined) {
    console.log('Real-time results received:', result);
    return result;
  }
  
  // Check for nested widget_response (from Zapier Code step)
  if (result.widget_response) {
    try {
      const widgetData = typeof result.widget_response === 'string' 
        ? JSON.parse(result.widget_response) 
        : result.widget_response;
      console.log('Parsed widget response:', widgetData);
      return widgetData;
    } catch (e) {
      console.log('Failed to parse widget_response:', e);
    }
  }
  
  // If no immediate results, try polling
  console.log('No immediate results, attempting to poll...');
  const requestId = state.currentRequestId || generateRequestId();
  return await pollForResults(requestId, data);
}

function generateRequestId() {
  return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

async function pollForResults(requestId, originalData) {
  const maxAttempts = 40; // ~2 minutes max
  const pollInterval = 3000; // 3 seconds
  
  console.log(`Starting to poll for results, requestId: ${requestId}`);
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      // Update status message during polling
      if (elements.statusMessage) {
        const pollingMessages = [
          "Analyzing storm patterns for your specific location...",
          "Cross-referencing NOAA historical weather data...", 
          "Calculating hail impact probabilities from satellite data...",
          "Processing wind damage risk assessments...",
          "Evaluating flood zone classifications and drainage...",
          "Generating comprehensive risk assessment report...",
          "Finalizing your personalized storm damage analysis...",
          "Almost complete - preparing final recommendations..."
        ];
        elements.statusMessage.textContent = pollingMessages[attempt % pollingMessages.length];
      }
      
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      
      // Try multiple possible endpoints for results
      const endpoints = [
        `${CONFIG.apiEndpoint}?request_id=${requestId}`,
        `https://haydenclaim.com/api/storm-results/${requestId}`
      ];
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Polling endpoint: ${endpoint}`);
          const pollResponse = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          
          if (pollResponse.ok) {
            const pollResult = await pollResponse.json();
            console.log(`Poll attempt ${attempt + 1} response:`, pollResult);

            // Direct success criteria
            if (pollResult.analysis_complete || pollResult.hail_probability !== undefined) {
              console.log('Real analysis results found!');
              return pollResult;
            }

            // Try to normalize alternate shapes into widget format
            const normalized = normalizePolledResult(pollResult);
            if (normalized) {
              console.log('Normalized results found!');
              return normalized;
            }
          }
        } catch (endpointError) {
          console.log(`Endpoint ${endpoint} failed:`, endpointError);
        }
      }
      
      console.log(`Poll attempt ${attempt + 1} completed, no results yet`);

      // Update polling progress UI (based on attempts)
      try {
        const percent = Math.round(((attempt + 1) / maxAttempts) * 100);
        updateProgressPercentage(percent);
      } catch (e) {
        console.log('Progress update failed:', e);
      }
      
    } catch (error) {
      console.log(`Poll attempt ${attempt + 1} failed:`, error);
    }
  }
  
  // Polling timeout - do NOT show any preliminary/estimated results.
  // Instead, return an object indicating timeout so the UI can keep the
  // loading state or display a gentle delayed-notice. This avoids showing
  // sample/estimated data that might be mistaken for a final analysis.
  console.log('Polling timeout - no real results yet');
  return { timeout: true, message: 'Analysis is still processing' };
}

// Attempt to normalize various result shapes returned by the server/Zap
function normalizePolledResult(raw) {
  // CRITICAL: Don't try to normalize pending/processing status messages!
  // These are progress updates from /api/progress, not actual results
  if (raw && (raw.status === 'pending' || raw.status === 'processing')) {
    console.log('[Normalizer] Skipping pending status message');
    return null;
  }

  try {
    // Helper: parse JSON strings safely
    const tryParse = (v) => {
      if (typeof v === 'string') {
        try { return JSON.parse(v); } catch { return null; }
      }
      return v && typeof v === 'object' ? v : null;
    };

    // Helper: find value by candidate keys (case/format agnostic) recursively
    const findKey = (obj, keys, depth = 0) => {
      if (!obj || typeof obj !== 'object' || depth > 4) return undefined;
      for (const [k, v] of Object.entries(obj)) {
        const norm = String(k).toLowerCase().replace(/[^a-z0-9]/g, '');
        if (keys.some(key => norm === key)) {
          return v;
        }
        const child = tryParse(v);
        if (child) {
          const found = findKey(child, keys, depth + 1);
          if (found !== undefined) return found;
        }
      }
      return undefined;
    };

    const containers = [];
    const firstObj = tryParse(raw) || {};
    containers.push(firstObj);
    // Common wrappers
    ['result','results','data','payload','output','analysis','response','body','widget_response','json','raw'].forEach(key => {
      const val = firstObj[key];
      const parsed = tryParse(val);
      if (parsed) containers.push(parsed);
    });
    // Also parse any JSON-like string values at top-level (handles empty "" key case)
    try {
      for (const [k, v] of Object.entries(firstObj)) {
        const parsed = tryParse(v);
        if (parsed && typeof parsed === 'object') containers.push(parsed);
      }
    } catch {}

    // Merge shallow copies into a single view (later entries can override)
    const merged = Object.assign({}, ...containers);

    // Determine completion
    let analysis_complete = false;
    const statusVal = (findKey(merged, ['status','analysisstatus']) || '').toString().toLowerCase();
    const completeVal = findKey(merged, ['analysiscomplete','complete','completed']);
    // Handle boolean true OR string "true"/"True" (Zapier may send either)
    if (completeVal === true || String(completeVal).toLowerCase() === 'true' || ['complete','completed','done','finished','success'].includes(statusVal)) {
      analysis_complete = true;
    }

    // Extract probabilities; accept 0-1 or 0-100; normalize to 0-1
    const numOrNull = (v) => {
      const n = typeof v === 'string' ? parseFloat(v) : (typeof v === 'number' ? v : NaN);
      return isFinite(n) ? n : null;
    };
    const normalizeProb = (v) => {
      const n = numOrNull(v);
      if (n === null) return undefined;
      if (n > 1) return Math.min(1, n / 100);
      if (n >= 0 && n <= 1) return n;
      return undefined;
    };

    const hail_probability = normalizeProb(
      findKey(merged, ['hailprobability','hailrisk','hailpercent','hailscore'])
    );
    const wind_probability = normalizeProb(
      findKey(merged, ['windprobability','windrisk','windpercent','windscore'])
    );
    const flood_probability = normalizeProb(
      findKey(merged, ['floodprobability','floodrisk','floodpercent','floodscore'])
    );

    // Risk score (0-100)
    let risk_score = numOrNull(findKey(merged, ['riskscore','score','overallrisk','overallriskscore']));
    if ((risk_score === null || risk_score === undefined) && [hail_probability, wind_probability, flood_probability].every(v => v !== undefined)) {
      risk_score = Math.round(((hail_probability + wind_probability + flood_probability) / 3) * 100);
    }

    // Property address hint
    const property_address = findKey(merged, ['propertyaddress','address']) || undefined;

    // PDF URL
  const pdf_url = findKey(merged, ['pdfurl','reporturl','pdflink']) || undefined;

    // If we have a strong signal that processing is complete and at least one metric, return normalized
    if (analysis_complete || hail_probability !== undefined || risk_score !== undefined) {
      return {
        analysis_complete: analysis_complete || false,
        property_address,
        hail_probability,
        wind_probability,
        flood_probability,
        risk_score,
        report_date: findKey(merged, ['reportdate','date']) || new Date().toLocaleDateString(),
        analysis_id: findKey(merged, ['analysisid','id']) || undefined,
        pdf_url,
        data_source: analysis_complete ? 'live' : undefined
      };
    }
  } catch (e) {
    console.log('normalizePolledResult failed:', e);
  }
  return null;
}

// Background polling for long-running analysis (10-15 minutes)
function startBackgroundPolling(requestId) {
  if (!requestId) return;
  // Prevent duplicates
  if (state.backgroundPoll && state.backgroundPoll.active) return;

  const startTs = Date.now();
  const maxDurationMs = 15 * 60 * 1000; // 15 minutes
  const backoffSteps = [15000, 30000, 45000, 60000]; // 15s -> 60s, then stay at 60s
  let step = 0;

  state.backgroundPoll = { active: true };

  const tick = async () => {
    if (!state.backgroundPoll || !state.backgroundPoll.active) return;
    const elapsed = Date.now() - startTs;
    if (elapsed > maxDurationMs) {
      // Stop after max duration; user can manually check later
      state.backgroundPoll.active = false;
      console.log('Background polling window ended');
      return;
    }

    try {
      const res = await tryFetchResultsOnce(requestId);
      if (res) {
        console.log('Background polling found results');
        state.backgroundPoll.active = false;
        handleSubmissionSuccess(res);
        return;
      }
    } catch (e) {
      console.log('Background poll error:', e);
    }

    // Schedule next check with backoff and page visibility optimization
    const baseDelay = backoffSteps[Math.min(step, backoffSteps.length - 1)];
    step++;
    const hiddenBonus = document.hidden ? 1.5 : 1; // slow down when tab is hidden
    const nextDelay = Math.round(baseDelay * hiddenBonus);
    state.backgroundPoll.timer = setTimeout(tick, nextDelay);
  };

  console.log('Starting background polling for up to 15 minutes');
  tick();
}

async function tryFetchResultsOnce(requestId) {
  const endpoint = `https://haydenclaim.com/api/storm-results/${requestId}`;
  console.log(`[Background Poll] Checking: ${endpoint}`);
  const resp = await fetch(endpoint, { headers: { 'Accept': 'application/json' } });
  if (!resp.ok) {
    console.log(`[Background Poll] No results yet (${resp.status})`);
    return null;
  }
  const data = await resp.json();
  console.log('[Background Poll] Got data:', data);
  
  // Check if data has the key fields (even as strings)
  if (data && (data.analysis_complete || data.hail_probability !== undefined)) {
    console.log('[Background Poll] ✅ FOUND COMPLETE RESULTS!');
    return data;
  }
  console.log('[Background Poll] Data found but incomplete, trying normalizer...');
  const normalized = normalizePolledResult(data);
  if (normalized) {
    console.log('[Background Poll] ✅ Normalizer extracted results!');
  }
  return normalized || null;
}

function generateLocationBasedResults(formData) {
  // Enhanced sample generation based on actual location data
  const city = formData.city?.toLowerCase() || '';
  const zip = formData.zip || '';
  
  // Location-based risk adjustments
  let hailBase = 45, windBase = 40, floodBase = 20;
  
  // High-risk Texas cities and ZIP codes
  const highRiskAreas = ['dallas', 'fort worth', 'plano', 'mckinney', 'frisco', 'allen'];
  const moderateRiskAreas = ['austin', 'houston', 'san antonio', 'corpus christi'];
  const highRiskZips = ['75023', '75024', '75025', '75070', '75075', '75093'];
  
  if (highRiskAreas.some(area => city.includes(area)) || highRiskZips.includes(zip)) {
    hailBase += 20;
    windBase += 15;
  } else if (moderateRiskAreas.some(area => city.includes(area))) {
    hailBase += 10;
    windBase += 5;
    floodBase += 10;
  }
  
  // Add some randomization
  const hailRisk = Math.min(95, hailBase + Math.floor(Math.random() * 15));
  const windRisk = Math.min(90, windBase + Math.floor(Math.random() * 20));
  const floodRisk = Math.min(80, floodBase + Math.floor(Math.random() * 25));
  
  return {
    analysis_complete: true,
    property_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
    hail_probability: hailRisk / 100,
    wind_probability: windRisk / 100,
    flood_probability: floodRisk / 100,
    risk_score: Math.round((hailRisk + windRisk + floodRisk) / 3),
    report_date: new Date().toLocaleDateString(),
    analysis_id: `HCG-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    data_source: 'estimated', // Mark as estimated since no real data was returned
    location_note: `Analysis based on ${formData.city}, TX regional storm patterns`
  };
}

function handleSubmissionSuccess(response) {
  console.log('✅ handleSubmissionSuccess called with:', response);
  console.log('🔍 Checking fields:', {
    has_response: !!response,
    analysis_complete: response?.analysis_complete,
    analysis_complete_type: typeof response?.analysis_complete,
    hail_probability: response?.hail_probability,
    hail_probability_type: typeof response?.hail_probability
  });
  
  // Hide loading
  // Determine outcome. We intentionally do NOT show sample/estimated
  // results. Only show final results when analysis is complete.
  if (response && (response.analysis_complete || response.hail_probability !== undefined)) {
    console.log('🎉 SHOWING RESULTS NOW!');
    // Final/real analysis complete
    // STOP BACKGROUND POLLING IMMEDIATELY
    if (state.backgroundPoll) {
      state.backgroundPoll.active = false;
      if (state.backgroundPoll.timer) {
        clearTimeout(state.backgroundPoll.timer);
      }
      console.log('🛑 Background polling stopped');
    }
    // Remove fullscreen loading class and stop loading sequences
    document.body.classList.remove('loading-fullscreen');
    stopLoadingSequence();
    elements.loading.classList.add('hidden');
    completeProgress();
    showResults(response);
  } else if (response && response.timeout) {
    // Polling timed out without real results. Keep a gentle full-screen
    // loading message and provide a manual "Check Status" button.
    elements.statusMessage.textContent = 'Still generating your report — this may take a little longer. You can wait or check back in a moment.';
    elements.factText.textContent = response.message || '';

    // Add a manual check button and tracking link if not present
    const actionContainer = document.querySelector('.action-buttons') || elements.loading;
    if (actionContainer) {
      if (!document.getElementById('manualCheckBtn')) {
        const btn = document.createElement('button');
        btn.id = 'manualCheckBtn';
        btn.className = 'button secondary';
        btn.textContent = 'Check for Results Now';
        btn.onclick = async () => {
          elements.statusMessage.textContent = 'Checking for results...';
          try {
            const res = await tryFetchResultsOnce(state.currentRequestId);
            if (res) {
              handleSubmissionSuccess(res);
            } else {
              elements.statusMessage.textContent = 'Still processing. We will continue checking in the background.';
            }
          } catch (e) {
            elements.statusMessage.textContent = 'Unable to check right now. Please try again later.';
          }
        };
        actionContainer.appendChild(btn);
      }

      if (!document.getElementById('trackingLink')) {
        const a = document.createElement('a');
        a.id = 'trackingLink';
        a.className = 'button tertiary';
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'Open Raw Result (tech)';
        a.href = `https://haydenclaim.com/api/storm-results/${state.currentRequestId}`;
        actionContainer.appendChild(a);
      }

      if (!document.getElementById('copyIdBtn')) {
        const copyBtn = document.createElement('button');
        copyBtn.id = 'copyIdBtn';
        copyBtn.className = 'button tertiary';
        copyBtn.textContent = 'Copy Tracking Link';
        copyBtn.onclick = async () => {
          try {
            const link = `https://haydenclaim.com/api/storm-results/${state.currentRequestId}`;
            await navigator.clipboard.writeText(link);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => (copyBtn.textContent = 'Copy Tracking Link'), 1500);
          } catch {
            alert('Copy failed. You can right-click the Raw Result link and copy it.');
          }
        };
        actionContainer.appendChild(copyBtn);
      }
    }

    // Start background polling up to ~15 minutes with backoff
    if (state.currentRequestId) {
      startBackgroundPolling(state.currentRequestId);
    }

    // Ensure fun facts keep rotating during the entire waiting period
    if (!state.intervals.fact) {
      rotateFact();
      state.intervals.fact = setInterval(rotateFact, CONFIG.timings.factRotation);
    }
  } else if (response && response.error) {
    console.error('API Error:', response.error);
    handleSubmissionError(response.error);
  } else {
    // Unknown response — keep waiting but inform the user. Do not show
    // sample results.
    elements.statusMessage.textContent = 'Processing... please remain on this page until your report is ready.';
  }
}

// Helper to create/update a visible progress bar for polling
// Note: Keep a single progress renderer above; alias for any legacy calls
const legacyUpdateProgressPercentage = updateProgressPercentage;

// Time-based progress that fills from 0 to 100 across the given duration
function startTimedProgress(durationMs) {
  state.progressStartTs = Date.now();
  state.progressMaxMs = durationMs;
  if (state.intervals.timedProgress) {
    clearInterval(state.intervals.timedProgress);
  }
  state.intervals.timedProgress = setInterval(() => {
    const elapsed = Date.now() - state.progressStartTs;
    const pct = Math.min(100, (elapsed / state.progressMaxMs) * 100);
    updateProgressPercentage(pct);
    if (pct >= 100) {
      clearInterval(state.intervals.timedProgress);
      state.intervals.timedProgress = null;
    }
  }, 1000);
}

function completeProgress() {
  updateProgressPercentage(100);
  if (state.intervals.timedProgress) {
    clearInterval(state.intervals.timedProgress);
    state.intervals.timedProgress = null;
  }
}

function generateSampleResults() {
  const formData = collectFormData();
  
  // Generate realistic risk percentages based on location
  const baseHailRisk = Math.floor(Math.random() * 30) + 40; // 40-70%
  const baseWindRisk = Math.floor(Math.random() * 25) + 35; // 35-60%  
  const baseFloodRisk = Math.floor(Math.random() * 20) + 15; // 15-35%
  
  return {
    property_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
    hail_probability: baseHailRisk / 100,
    wind_probability: baseWindRisk / 100,
    flood_probability: baseFloodRisk / 100,
    risk_score: Math.round((baseHailRisk + baseWindRisk + baseFloodRisk) / 3),
    report_date: new Date().toLocaleDateString(),
    assessment_complete: true
  };
}

function showResults(data) {
  if (!elements.results) return;
  
  // Prevent multiple calls
  if (state.resultsShown) {
    console.log('⚠️ Results already shown, ignoring duplicate call');
    return;
  }
  state.resultsShown = true;
  console.log('📊 Showing results for the first time');
  
  // Parse final_results JSON if present
  let finalResults = null;
  if (data.final_results) {
    try {
      finalResults = typeof data.final_results === 'string' 
        ? JSON.parse(data.final_results) 
        : data.final_results;
      console.log('✅ Parsed final_results:', finalResults);
    } catch (e) {
      console.error('❌ Failed to parse final_results:', e);
    }
  }
  
  // Parse probabilities (handle both string and number, 0-1 or 0-100 format)
  const parseProb = (val) => {
    if (!val) return 0;
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return num > 1 ? num : num * 100; // Convert 0-1 to percentage
  };
  
  const hailPercent = parseProb(data.hail_probability);
  const windPercent = parseProb(data.wind_probability);
  const floodPercent = parseProb(data.flood_probability);
  const riskScore = data.risk_score || Math.round((hailPercent + windPercent + floodPercent) / 3);
  const overallRisk = data.overall_risk || getRiskLevel(riskScore);
  
  // Debug: Check if html_results exists
  console.log('📄 HTML Results present:', !!data.html_results);
  console.log('📄 HTML Results length:', data.html_results ? data.html_results.length : 0);
  console.log('📄 Full data object:', data);
  
  // Build a beautiful, full-width results display
  elements.results.innerHTML = `
    <div class="results-container">
      <!-- Header Section -->
      <div class="results-header">
        <h2>🌪️ Storm Risk Assessment Complete</h2>
        <div class="completion-badge">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#4CAF50" stroke-width="2"/>
            <path d="M7 12l3 3 7-7" stroke="#4CAF50" stroke-width="2" fill="none"/>
          </svg>
          <span>Analysis Complete</span>
        </div>
      </div>

      <!-- Property Info Card -->
      <div class="info-card">
        <div class="info-row">
          <div class="info-item full-width">
            <span class="info-label">📍 Property Address</span>
            <span class="info-value address">${data.property_address || 'N/A'}</span>
          </div>
        </div>
        <div class="info-row">
          <div class="info-item">
            <span class="info-label">📅 Report Date</span>
            <span class="info-value">${data.report_date || new Date().toLocaleDateString()}</span>
          </div>
          <div class="info-item">
            <span class="info-label">⚠️ Overall Risk Level</span>
            <span class="info-value risk-badge ${getRiskClass(overallRisk)}">${overallRisk}</span>
          </div>
          <div class="info-item">
            <span class="info-label">📊 Risk Score</span>
            <span class="info-value score">${riskScore}/100</span>
          </div>
        </div>
      </div>

      <!-- Risk Analysis Section -->
      <div class="risk-analysis">
        <h3>Storm Risk Breakdown</h3>
        <div class="risk-grid">
          ${createRiskCard('Hail', hailPercent, '🌨️')}
          ${createRiskCard('Wind', windPercent, '💨')}
          ${createRiskCard('Flood', floodPercent, '🌊')}
        </div>
      </div>

      <!-- Recommendations -->
      <div class="recommendations">
        <h3>Professional Recommendations</h3>
        <div class="recommendation-list">
          ${generateRecommendations(hailPercent, windPercent, floodPercent, riskScore).map(rec => `
            <div class="recommendation-item">
              <span class="rec-icon">${rec.icon}</span>
              <span class="rec-text">${rec.text}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Full Analysis Section -->
      ${finalResults ? `
        <div class="full-analysis-section">
          <h3>📋 Complete Analysis Report</h3>
          
          <!-- Executive Summary -->
          ${finalResults.executive_summary ? `
            <div class="analysis-card">
              <h4>🎯 Executive Summary</h4>
              <div class="summary-grid">
                <div class="summary-item">
                  <strong>Primary Storm Date:</strong> ${finalResults.executive_summary.primary_storm_date || 'N/A'}
                </div>
                <div class="summary-item">
                  <strong>Overall Risk:</strong> 
                  <span class="risk-badge ${getRiskClass(finalResults.executive_summary.overall_risk_level)}">${finalResults.executive_summary.overall_risk_level?.toUpperCase() || 'N/A'}</span>
                </div>
                <div class="summary-item">
                  <strong>Damage Probability:</strong> ${finalResults.executive_summary.damage_probability || 'N/A'}
                </div>
                <div class="summary-item full-width">
                  <strong>Estimated Claim Value:</strong> ${finalResults.executive_summary.estimated_claim_value_range || 'N/A'}
                </div>
              </div>
              ${finalResults.executive_summary.primary_findings ? `
                <div class="findings">
                  <strong>Key Findings:</strong>
                  <ul>
                    ${finalResults.executive_summary.primary_findings.map(finding => `<li>${finding}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
              ${finalResults.executive_summary.critical_actions ? `
                <div class="critical-actions">
                  <strong>⚠️ Critical Actions:</strong>
                  <ul>
                    ${finalResults.executive_summary.critical_actions.map(action => `<li>${action}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          <!-- Storm Impact Events -->
          ${finalResults.risk_assessment?.storm_impact_events ? `
            <div class="analysis-card">
              <h4>⛈️ Storm Impact Events</h4>
              <div class="events-table">
                ${finalResults.risk_assessment.storm_impact_events.map(event => `
                  <div class="event-row">
                    <div class="event-date">${event.event_date}</div>
                    <div class="event-details">
                      <strong>${event.storm_type?.toUpperCase()}</strong> - ${event.storm_intensity}
                      <br>
                      <small>Distance: ${event.distance_from_property} | Severity: ${event.impact_severity}</small>
                      <br>
                      <small>Affected: ${event.affected_systems?.join(', ')}</small>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <!-- Property Intelligence -->
          ${finalResults.property_intelligence ? `
            <div class="analysis-card">
              <h4>🏠 Property Intelligence</h4>
              <div class="property-grid">
                ${finalResults.property_intelligence.year_built ? `<div><strong>Year Built:</strong> ${finalResults.property_intelligence.year_built}</div>` : ''}
                ${finalResults.property_intelligence.square_footage ? `<div><strong>Square Footage:</strong> ${finalResults.property_intelligence.square_footage} sq ft</div>` : ''}
                ${finalResults.property_intelligence.roof_type ? `<div><strong>Roof Type:</strong> ${finalResults.property_intelligence.roof_type}</div>` : ''}
                ${finalResults.property_intelligence.roof_age ? `<div><strong>Roof Age:</strong> ${finalResults.property_intelligence.roof_age}</div>` : ''}
                ${finalResults.property_intelligence.exterior_material ? `<div><strong>Exterior:</strong> ${finalResults.property_intelligence.exterior_material}</div>` : ''}
                ${finalResults.property_intelligence.stories ? `<div><strong>Stories:</strong> ${finalResults.property_intelligence.stories}</div>` : ''}
              </div>
            </div>
          ` : ''}
          
          <!-- Repair Cost Analysis -->
          ${finalResults.professional_tables?.repair_cost_analysis ? `
            <div class="analysis-card">
              <h4>💰 Repair Cost Analysis</h4>
              <div class="cost-table">
                <div class="cost-header">
                  <div>Component</div>
                  <div>Low Estimate</div>
                  <div>High Estimate</div>
                </div>
                ${finalResults.professional_tables.repair_cost_analysis.data_rows?.map(row => `
                  <div class="cost-row">
                    <div>${row[0]}</div>
                    <div>${row[1]}</div>
                    <div>${row[2]}</div>
                  </div>
                `).join('')}
                ${finalResults.professional_tables.repair_cost_analysis.total_estimate_range ? `
                  <div class="cost-total">
                    <strong>Total Estimate Range:</strong> ${finalResults.professional_tables.repair_cost_analysis.total_estimate_range}
                  </div>
                ` : ''}
              </div>
            </div>
          ` : ''}
          
          <!-- Next Steps -->
          ${finalResults.recommendations?.next_steps ? `
            <div class="analysis-card next-steps-card">
              <h4>✅ Recommended Next Steps</h4>
              <div class="steps-timeline">
                ${finalResults.recommendations.next_steps.map((step, index) => `
                  <div class="step-item priority-${step.priority}">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-content">
                      <strong>${step.action}</strong>
                      <div class="step-meta">
                        <span class="timeline">⏱️ ${step.timeline}</span>
                        <span class="priority-badge ${step.priority}">${step.priority}</span>
                        ${step.estimated_cost ? `<span class="cost">💵 ${step.estimated_cost}</span>` : ''}
                      </div>
                      ${step.responsible_party ? `<small>Responsible: ${step.responsible_party}</small>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <!-- Hayden Value Proposition -->
          ${finalResults.business_intelligence ? `
            <div class="analysis-card hayden-value">
              <h4>🏆 Why Choose Hayden Claims Group</h4>
              <p class="value-prop">${finalResults.business_intelligence.hayden_value_proposition}</p>
              ${finalResults.business_intelligence.competitive_advantages ? `
                <ul class="advantages">
                  ${finalResults.business_intelligence.competitive_advantages.map(adv => `<li>${adv}</li>`).join('')}
                </ul>
              ` : ''}
              <div class="success-rate">
                Success Probability: <strong>${finalResults.business_intelligence.success_probability_with_hayden || 'Very High'}</strong>
              </div>
            </div>
          ` : ''}
        </div>
      ` : ''}

      <!-- Action Buttons -->
      <div class="action-buttons-results">
        ${data.pdf_url ? `
          <a href="${data.pdf_url}" class="button primary" target="_blank">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2"/>
            </svg>
            Download PDF Report
          </a>
        ` : ''}
        <button class="button secondary" onclick="location.reload()">New Assessment</button>
      </div>
    </div>
  `;
  
  // Animate risk bars
  setTimeout(() => {
    document.querySelectorAll('.risk-bar-fill').forEach(bar => {
      bar.style.width = bar.getAttribute('data-width');
    });
  }, 100);
  
  // Show results with fade-in
  elements.results.classList.remove('hidden');
}

// Helper: Create risk card HTML
function createRiskCard(type, probability, icon) {
  const percent = Math.round(probability);
  const riskClass = percent > 60 ? 'high' : percent > 40 ? 'medium' : 'low';
  
  return `
    <div class="risk-card ${riskClass}">
      <div class="risk-card-header">
        <span class="risk-icon">${icon}</span>
        <span class="risk-type">${type} Risk</span>
      </div>
      <div class="risk-percentage">${percent}%</div>
      <div class="risk-bar">
        <div class="risk-bar-fill" data-width="${percent}%" style="width: 0%"></div>
      </div>
      <div class="risk-label">${getRiskLabelForPercent(percent)}</div>
    </div>
  `;
}

// Helper: Generate recommendations
function generateRecommendations(hail, wind, flood, riskScore) {
  const recommendations = [];
  
  if (hail > 50) {
    recommendations.push({ icon: '🏠', text: 'Consider impact-resistant roofing materials' });
  }
  if (wind > 40) {
    recommendations.push({ icon: '💨', text: 'Secure outdoor items and check roof attachments' });
  }
  if (flood > 30) {
    recommendations.push({ icon: '🌊', text: 'Schedule a free property inspection' });
  }
  
  recommendations.push({ icon: '📋', text: 'Document current property condition' });
  
  if (riskScore > 60) {
    recommendations.push({ icon: '☎️', text: 'Contact us for immediate assessment' });
  }
  
  return recommendations;
}

// Helper: Get risk class
function getRiskClass(risk) {
  if (typeof risk === 'string') {
    return risk.toLowerCase();
  }
  if (risk > 60) return 'high';
  if (risk > 40) return 'medium';
  return 'low';
}

// Helper: Get risk level from score
function getRiskLevel(score) {
  if (!score) return 'N/A';
  if (score > 70) return 'CRITICAL';
  if (score > 60) return 'HIGH';
  if (score > 40) return 'MEDIUM';
  return 'LOW';
}

// Helper: Get risk label for percentage
function getRiskLabelForPercent(percent) {
  if (percent > 70) return 'Critical Risk';
  if (percent > 50) return 'High Risk';
  if (percent > 30) return 'Moderate Risk';
  return 'Low Risk';
}

function updateRiskRecommendations(risks) {
  // Add recommendations based on risk levels
  const recommendationsElement = document.getElementById('recommendations');
  if (!recommendationsElement) {
    // Create recommendations element if it doesn't exist
    const risksContainer = document.getElementById('riskSummary');
    if (risksContainer) {
      const recDiv = document.createElement('div');
      recDiv.id = 'recommendations';
      recDiv.className = 'recommendations-section';
      risksContainer.appendChild(recDiv);
    }
  }
  
  const recommendations = [];
  
  if (risks.hail > 50) {
    recommendations.push('🏠 Consider impact-resistant roofing materials');
  }
  if (risks.wind > 40) {
    recommendations.push('💨 Secure outdoor items and check roof attachments');
  }
  if (risks.flood > 30) {
    recommendations.push('🌊 Review flood insurance coverage options');
  }
  
  recommendations.push('📞 Schedule a free property inspection');
  recommendations.push('📋 Document current property condition');
  
  if (document.getElementById('recommendations')) {
    document.getElementById('recommendations').innerHTML = `
      <h4>Professional Recommendations:</h4>
      <ul>${recommendations.map(rec => `<li>${rec}</li>`).join('')}</ul>
    `;
  }
}

function animateRiskBars(risks) {
  setTimeout(() => {
    Object.keys(risks).forEach((riskType, index) => {
      const fillElement = document.querySelector(`[data-risk="${riskType}"]`);
      const percentElement = document.getElementById(`${riskType}Percent`);
      
      if (fillElement && percentElement) {
        // Animate each bar with a slight delay
        setTimeout(() => {
          fillElement.style.width = `${risks[riskType]}%`;
          
          // Animate the percentage count-up
          animatePercentage(percentElement, 0, Math.round(risks[riskType]), 1000);
          
          // Color code based on risk level
          if (risks[riskType] > 60) {
            fillElement.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)'; // Red for high risk
          } else if (risks[riskType] > 40) {
            fillElement.style.background = 'linear-gradient(90deg, #f39c12, #d68910)'; // Orange for medium risk
          } else {
            fillElement.style.background = 'linear-gradient(90deg, #bfa76f, #d8c58c)'; // Gold for lower risk
          }
        }, index * 300); // Stagger the animations
      }
    });
  }, 800);
}

function animatePercentage(element, start, end, duration) {
  const startTime = performance.now();
  
  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentValue = Math.round(start + (end - start) * progress);
    element.textContent = `${currentValue}%`;
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }
  
  requestAnimationFrame(updateNumber);
}

function showConfirmation() {
  elements.confirmation.classList.remove('hidden');
}

function handleSubmissionError(error) {
  console.error('Submission failed:', error);
  
  // Hide loading
  elements.loading.classList.add('hidden');
  // Stop animations/timers on error
  stopLoadingSequence();
  
  // Show error state
  elements.statusMessage.textContent = "Unable to process your request. Please try again.";
  elements.factText.textContent = "If the problem persists, please call us directly at (469) 434-2121.";
  
  // Reset form
  setTimeout(resetForm, 5000);
}

function resetForm() {
  // Reset state
  state.isSubmitting = false;
  state.resultsShown = false; // Allow results to be shown again
  state.currentStep = 0;
  
  // Reset UI
  // Ensure the fullscreen loading mode is turned off
  document.body.classList.remove('loading-fullscreen');
  elements.formPanel.classList.remove('slide-out');
  elements.resultsPanel.style.display = 'none';
  elements.loading.classList.add('hidden');
  elements.results.classList.add('hidden');
  elements.confirmation.classList.add('hidden');
  
  // Reset button
  elements.btnText.classList.remove('hidden');
  elements.btnLoader.classList.add('hidden');
  elements.submitBtn.disabled = false;
  
  // Clear form
  elements.form.reset();
  document.getElementById('state').value = 'Texas';
  
  // Clear errors
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('input').forEach(input => {
    input.style.borderColor = '#333';
    input.removeAttribute('title');
  });
}

// Global function for reset button
window.resetForm = resetForm;

// Cloudflare Worker compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG,
    TEXAS_STORM_FACTS,
    STATUS_MESSAGES,
    handleFormSubmission,
    collectFormData,
    submitToZapier
  };
}