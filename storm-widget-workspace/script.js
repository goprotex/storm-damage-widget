const facts = [
  "Texas takes more hail hits than any state in the nation.",
  "The largest hailstone ever recorded in Texas weighed over a pound.",
  "When the mesquite blooms early, Texans say hail's not far behind.",
  "A Panhandle gust once pushed a freight car off its tracks.",
  "Some Texas storms pack more power than small hurricanes.",
  "In 2025, more roofs were replaced in Texas than in 14 other states combined."
];

const messages = [
  "Gathering storm intel from across Texas skies...",
  "Pulling radar archives and hail strike data...",
  "Scanning NOAA wind and flood reports statewide...",
  "Comparing carrier loss records and claim zones...",
  "Almost done — crunching your risk score..."
];

const form = document.getElementById('stormForm');
const resultsPanel = document.getElementById('resultsPanel');
const statusMessage = document.getElementById('statusMessage');
const factText = document.getElementById('fact');
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  resultsPanel.classList.remove('hidden');
  loadingDiv.classList.remove('hidden');
  resultsDiv.classList.add('hidden');

  let step = 0;
  const interval = setInterval(() => {
    statusMessage.textContent = messages[step % messages.length];
    factText.textContent = facts[Math.floor(Math.random() * facts.length)];
    step++;
  }, 3000);

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://hooks.zapier.com/hooks/catch/14608681/u5q2jca/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    clearInterval(interval);
    statusMessage.textContent = "Report ready — click View Results";
    factText.textContent = "";
    loadingDiv.classList.add('hidden');
    resultsDiv.classList.remove('hidden');

    document.getElementById('property').textContent = result.property_address || "Address not found";
    document.getElementById('riskSummary').innerHTML = `
      <p><strong>Hail:</strong> ${(result.hail_probability * 100).toFixed(0)}%</p>
      <p><strong>Wind:</strong> ${(result.wind_probability * 100).toFixed(0)}%</p>
      <p><strong>Flood:</strong> ${(result.flood_probability * 100).toFixed(0)}%</p>
    `;
    document.getElementById('pdfLink').href = result.pdf_url;
  } catch (err) {
    clearInterval(interval);
    statusMessage.textContent = "Error connecting — please try again.";
  }
});
