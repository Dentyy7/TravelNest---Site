const heroHighlights = [
  {
    quote: "Pack light, travel far.",
    title: "Santorini",
    description: "Sunset cliffs, deep blue seas, and peaceful island nights.",
    image: "images/greece.jpg"
  },
  {
    quote: "Adventure is worthwhile.",
    title: "Himalayas",
    description: "Snow peaks, peaceful valleys, and timeless mountain traditions.",
    image: "images/hima.webp"
  },
  {
    quote: "Travel is the only thing you buy that makes you richer.",
    title: "Tokyo",
    description: "Ancient temples, serene gardens, and traditional culture.",
    image: "images/tokyo.avif"
  },
  {
    quote: "Leave nothing but footprints.",
    title: "Bali",
    description: "Lush rice terraces, ocean waves, and island tranquility.",
    image: "images/bali.webp"
  }
];

const dailyDestinations = [
  {
    name: "Paris",
    country: "France",
    image: "images/paris.webp",
    desc: "The city of light, romance, and world-class cuisine."
  },
  {
    name: "Tokyo",
    country: "Japan",
    image: "images/tokyo.avif",
    desc: "A vibrant fusion of history, neon cityscapes, and delicious street food."
  },
  {
    name: "Cape Town",
    country: "South Africa",
    image: "images/cape.avif",
    desc: "Mountain peaks, coastline, and sunny adventure."
  },
  {
    name: "Kyoto",
    country: "Japan",
    image: "images/kyoto.jpg",
    desc: "Peaceful temples, cherry blossoms, and timeless tea houses."
  }
];

let quoteIndex = 0;

function updateHeroHighlight() {
  const highlight = heroHighlights[quoteIndex];
  const heroQuote = document.getElementById('hero-quote');
  const heroImage = document.querySelector('.hero-image img');
  heroQuote.textContent = highlight.quote;
  heroImage.src = highlight.image;
  heroImage.alt = highlight.title;
  quoteIndex = (quoteIndex + 1) % heroHighlights.length;
}

function showDailyDestination() {
  const index = new Date().getDate() % dailyDestinations.length;
  const dest = dailyDestinations[index];
  document.getElementById('daily-destination').innerHTML = `
    <div class="daily-card">
      <img src="${dest.image}" alt="${dest.name}">
      <div>
        <h3>${dest.name}, ${dest.country}</h3>
        <p>${dest.desc}</p>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  showDailyDestination();
  updateHeroHighlight();
  setInterval(updateHeroHighlight, 6000);
});