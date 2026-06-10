const feedbackForm = document.getElementById('feedback-form');
const feedbackMessage = document.getElementById('feedback-message');

function displayFeedbackMessage(text) {
  if (!feedbackMessage) return;
  feedbackMessage.textContent = text;
  setTimeout(() => {
    feedbackMessage.textContent = '';
  }, 4000);
}

feedbackForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const rating = document.getElementById('rating').value;

  if (!name || !email || !message || !rating) {
    displayFeedbackMessage('Please complete all fields before submitting.');
    return;
  }

  const feedback = {
    name,
    email,
    message,
    rating,
    date: new Date().toLocaleString()
  };

  const feedbackList = loadFromStorage('feedbackList', []);
  feedbackList.push(feedback);
  saveToStorage('feedbackList', feedbackList);

  displayFeedbackMessage('Thank you for your feedback! Your message has been received.');
  this.reset();
});

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const isOpen = content.classList.contains('open');

    document.querySelectorAll('.accordion-content').forEach(item => {
      item.classList.remove('open');
      item.style.maxHeight = null;
    });

    if (!isOpen) {
      content.classList.add('open');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});