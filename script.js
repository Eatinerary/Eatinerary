document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('emailInput').value;

    // Simulate saving email to a text file (for demonstration purposes)
    // In a real application, you would use server-side scripting to handle this securely
    // For example, using Node.js to write to a file or saving to a database
    saveEmailToFile(email);

    // Show success message
    showSuccessMessage();
});

function saveEmailToFile(email) {
    // Simulate saving email to a text file (replace with actual code for your server)
    console.log('Saving email: ' + email);
    // For demonstration purposes, you can add your own logic to save the email
    // You would typically handle this on the server-side securely
}

function showSuccessMessage() {
    var subscribeText = document.getElementById('subscribeText');
    var successMessage = document.getElementById('successMessage');

    subscribeText.classList.add('hidden');
    successMessage.classList.remove('hidden');

    // Delay hiding the success message for demonstration
    setTimeout(function() {
        successMessage.classList.add('hidden');
        subscribeText.classList.remove('hidden');
    }, 3000); // 3000 milliseconds (3 seconds) delay before hiding
}
