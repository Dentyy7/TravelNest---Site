let currentAudio = document.getElementById('ambient-audio');

function playSound(type) {
  let soundUrl = '';
  switch(type) {
    case 'beach':
      soundUrl = 'sounds/beachsound.mp3';
      break;
    case 'forest':
      soundUrl = 'sounds/rainforestsound.mp3';
      break;
    case 'city':
      soundUrl = 'sounds/citysound.mp3';
      break;
  }

  currentAudio.src = soundUrl;
  currentAudio.play().catch(() => {
    console.log('Audio playback failed.');
  });
}

function stopSound() {
  currentAudio.pause();
  currentAudio.currentTime = 0;
}

function addPlace() {
  const input = document.getElementById('place-input');
  const placeName = input.value.trim();
  const type = document.getElementById('place-type').value;
  if (!placeName) return;

  const storageKey = type === 'planned' ? 'plannedPlaces' : 'visitedPlaces';
  const places = loadFromStorage(storageKey, []);
  places.push({ name: placeName, date: new Date().toLocaleDateString() });
  saveToStorage(storageKey, places);
  renderPlaces();
  input.value = '';
}

function renderPlaces() {
  const visited = loadFromStorage('visitedPlaces', []);
  const planned = loadFromStorage('plannedPlaces', []);

  document.getElementById('visited-list').innerHTML = visited.map((place, index) => `
    <li>
      <span>${place.name} <small>(${place.date})</small></span>
      <button onclick="removePlace('visited', ${index})">Remove</button>
    </li>
  `).join('');

  document.getElementById('planned-list').innerHTML = planned.map((place, index) => `
    <li>
      <span>${place.name} <small>(${place.date})</small></span>
      <button onclick="removePlace('planned', ${index})">Remove</button>
    </li>
  `).join('');
}

window.removePlace = function(type, index) {
  const storageKey = type === 'planned' ? 'plannedPlaces' : 'visitedPlaces';
  const places = loadFromStorage(storageKey, []);
  places.splice(index, 1);
  saveToStorage(storageKey, places);
  renderPlaces();
};

function showTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('visited-list').style.display = tab === 'visited' ? 'block' : 'none';
  document.getElementById('planned-list').style.display = tab === 'planned' ? 'block' : 'none';
  document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  renderPlaces();
  showTab('visited');
  document.getElementById('place-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPlace();
    }
  });
});