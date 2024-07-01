document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var subscribeMessage = document.getElementById('subscribeMessage');
    
    fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
      subscribeMessage.classList.remove('hidden');
      var form = document.getElementById('newsletterForm');
      form.style.display = 'none';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
  