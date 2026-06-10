const tripIdeas = [
  { name: "Bali", type: "Relaxation", budget: "medium", description: "Beach escapes with cultural twists.", image: "images/bali.webp" },
  { name: "Himalayas", type: "Adventure", budget: "high", description: "Epic hiking and snowy mountain views.", image: "images/hima.webp" },
  { name: "Kyoto", type: "Cultural", budget: "medium", description: "Historic temples and serene gardens.", image: "images/kyoto.jpg" },
  { name: "Santorini", type: "Relaxation", budget: "high", description: "Sunset clifftops and ocean breeze.", image: "images/greece.jpg" },
  { name: "Barcelona", type: "Exploration", budget: "high", description: "Bustling streets and outdoor serenity.", image: "images/barcelona.png" },
  { name: "Marrakech", type: "Cultural", budget: "low", description: "Colorful markets and desert flavors.", image: "images/marrakech.jpg" },
  { name: "Queenstown", type: "Adventure", budget: "high", description: "Thrill sports and lakeside views.", image: "images/Queenstown.webp" },
  { name: "Lisbon", type: "Relaxation", budget: "medium", description: "Sunny streets and coastal charm.", image: "images/lisbon.jpg" }
];

let currentTrip = null;
const pickButton = document.getElementById('pick-btn');


const pickAgainButton = document.getElementById('pick-again-btn');
const saveButton = document.getElementById('save-btn');
const recommendationCard = document.getElementById('recommendation');

pickButton.onclick = pickTrip;
pickAgainButton.onclick = pickTrip;
saveButton.onclick = saveCurrentTrip;

function pickTrip() {
  const type = document.getElementById('travel-type').value;
  const budget = document.getElementById('budget-range').value;

  let filtered = tripIdeas.filter(t => (!type || t.type === type) && (!budget || t.budget === budget));
  if (filtered.length === 0) filtered = tripIdeas;

  currentTrip = filtered[Math.floor(Math.random() * filtered.length)];

  recommendationCard.innerHTML = `
    <img src="${currentTrip.image}" alt="${currentTrip.name}" class="recommendation-image">
    <h2>${currentTrip.name}</h2>
    <p>${currentTrip.description}</p>
    <p><strong>Type:</strong> ${currentTrip.type} | <strong>Budget:</strong> ${currentTrip.budget}</p>
  `;

  pickAgainButton.style.display = 'inline-flex';
  saveButton.style.display = 'inline-flex';
  recommendationCard.classList.add('pop');
  setTimeout(() => recommendationCard.classList.remove('pop'), 450);
}

function saveCurrentTrip() {
  if (!currentTrip) return;

  const wishlist = loadFromStorage('wishlist', []);
  const alreadySaved = wishlist.some(item => item.name === currentTrip.name);
  if (!alreadySaved) {
    wishlist.push(currentTrip);
    saveToStorage('wishlist', wishlist);
    alert('Added to Wishlist!');
    saveButton.textContent = `Save to Wishlist (${wishlist.length})`;
  } else {
    alert('This destination is already in your wishlist.');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const wishlistCount = loadFromStorage('wishlist', []).length;
  if (wishlistCount) {
    saveButton.textContent = `Save to Wishlist (${wishlistCount})`;
  }
});