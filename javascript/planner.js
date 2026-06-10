document.getElementById('budget-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const destination = document.getElementById('destination').value.trim();
  const days = parseInt(document.getElementById('days').value, 10);
  const daily = parseInt(document.getElementById('daily-budget').value, 10);

  if (!destination || !days || !daily) {
    alert('Please complete all budget fields to calculate your trip.');
    return;
  }

  const total = days * daily;
  let level = '';
  if (total < 1000) level = 'Budget Friendly';
  else if (total < 3000) level = 'Kinda Expensive';
  else level = 'Okay, you are rich';

  document.getElementById('result-title').textContent = `Trip to ${destination}`;
  document.getElementById('total-cost').textContent = `$${total}`;
  document.getElementById('budget-level').textContent = level;
  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('results').style.display = 'block';
  setTimeout(() => {
    document.getElementById('progress-fill').style.width = Math.min((total / 5000) * 100, 100) + '%';
  }, 50);
});

window.saveTrip = function() {
  const destination = document.getElementById('destination').value.trim();
  const total = document.getElementById('total-cost').textContent;
  if (!destination || !total) {
    alert('Please calculate a trip first before saving.');
    return;
  }

  const trips = loadFromStorage('savedTrips', []);
  trips.push({ destination, total, date: new Date().toLocaleDateString() });
  saveToStorage('savedTrips', trips);
  alert('Trip saved successfully!');
};