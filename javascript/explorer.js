const destinations = [
  {
    id: 1, name: "Bali", country: "Indonesia", continent: "Asia",
    image: "images/bali.webp",
    description: "A tropical paradise known for beaches, volcanoes, and vibrant culture.",
    attractions: ["Uluwatu Temple", "Tegallalang Rice Terraces", "Mount Batur"],
    cost: { low: 900, mid: 1600, high: 2800 }
  },
  {
    id: 2, name: "Paris", country: "France", continent: "Europe",
    image: "images/paris.webp",
    description: "The city of love, art, and iconic landmarks.",
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"],
    cost: { low: 1200, mid: 2200, high: 4000 }
  },
  {
    id: 3, name: "Tokyo", country: "Japan", continent: "Asia",
    image: "images/tokyo.avif",
    description: "A futuristic city filled with temples, neon lights, and culinary wonders.",
    attractions: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Tower"],
    cost: { low: 1100, mid: 2100, high: 3800 }
  },
  {
    id: 4, name: "Cape Town", country: "South Africa", continent: "Africa",
    image: "images/cape.avif",
    description: "A stunning coastal city with Table Mountain, beaches, and vibrant markets.",
    attractions: ["Table Mountain", "V&A Waterfront", "Kirstenbosch Gardens"],
    cost: { low: 850, mid: 1550, high: 2900 }
  },
  {
    id: 5, name: "Marrakech", country: "Morocco", continent: "Africa",
    image: "images/marrakech.jpg",
    description: "A colorful city of souks, riads, and spice-scented alleyways.",
    attractions: ["Jemaa el-Fnaa", "Bahia Palace", "Majorelle Garden"],
    cost: { low: 700, mid: 1400, high: 2600 }
  },
  {
    id: 6, name: "Santorini", country: "Greece", continent: "Europe",
    image: "images/greece.jpg",
    description: "A dreamy island with whitewashed buildings, sunsets, and crystal waters.",
    attractions: ["Oia", "Red Beach", "Akrotiri Ruins"],
    cost: { low: 1050, mid: 1950, high: 3500 }
  },
  {
    id: 7, name: "Rio de Janeiro", country: "Brazil", continent: "Americas",
    image: "images/rio.webp",
    description: "A vibrant city of beaches, carnival energy, and mountain views.",
    attractions: ["Christ the Redeemer", "Copacabana Beach", "Sugarloaf Mountain"],
    cost: { low: 950, mid: 1750, high: 3200 }
  },
  {
    id: 8, name: "Queenstown", country: "New Zealand", continent: "Oceania",
    image: "images/Queenstown.webp",
    description: "A mountain adventure hub surrounded by lakes, forests, and thrill sports.",
    attractions: ["Skyline Gondola", "Shotover River", "Lake Wakatipu"],
    cost: { low: 1200, mid: 2300, high: 4100 }
  }
];

function renderDestinations(filtered) {
  const grid = document.getElementById('destination-grid');
  grid.innerHTML = '';
  filtered.forEach(dest => {
    grid.innerHTML += `
      <div class="dest-card" onclick="showModal(${dest.id})">
        <img src="${dest.image}" alt="${dest.name}">
        <h3>${dest.name}</h3>
        <p>${dest.country}</p>
      </div>
    `;
  });
}

function showModal(id) {
  const dest = destinations.find(d => d.id === id);
  const modal = document.getElementById('destination-modal');
  document.getElementById('modal-body').innerHTML = `
    <h2>${dest.name}, ${dest.country}</h2>
    <img src="${dest.image}" style="width:100%; border-radius:8px; margin:1rem 0;">
    <p>${dest.description}</p>
    <h3>Popular Attractions</h3>
    <ul>${dest.attractions.map(a => `<li>${a}</li>`).join('')}</ul>
    <h3>Cost Comparison (USD)</h3>
    <table border="1" style="width:100%; border-collapse:collapse;">
      <tr><th>Budget</th><th>Cost</th></tr>
      <tr><td>Low</td><td>$${dest.cost.low}</td></tr>
      <tr><td>Mid</td><td>$${dest.cost.mid}</td></tr>
      <tr><td>Luxury</td><td>$${dest.cost.high}</td></tr>
    </table>
  `;
  modal.style.display = 'block';
}

document.querySelector('.close').onclick = () => {
  document.getElementById('destination-modal').style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
  renderDestinations(destinations);

  document.getElementById('search-input').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = destinations.filter(d => 
      d.name.toLowerCase().includes(term) || d.country.toLowerCase().includes(term)
    );
    renderDestinations(filtered);
  });

  document.getElementById('continent-filter').addEventListener('change', (e) => {
    const continent = e.target.value;
    const filtered = continent ? destinations.filter(d => d.continent === continent) : destinations;
    renderDestinations(filtered);
  });
});