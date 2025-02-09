// Form Submission and Prediction
document.getElementById('apnea-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Show loading spinner
    const resultDiv = document.getElementById('prediction-result');
    resultDiv.innerHTML = `<div class="spinner"></div>`;

    // Get form data
    const formData = {
        age: parseFloat(document.getElementById('age').value),
        bmi: parseFloat(document.getElementById('bmi').value),
        ahi: parseFloat(document.getElementById('ahi').value)
    };

    // Send data to the backend
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        // Display the prediction result
        if (data.error) {
            resultDiv.innerHTML = `<p class="error">Error: ${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `<p class="success">Prediction: ${data.prediction}</p>`;
        }
        // Clear the form after submission
        document.getElementById('apnea-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p class="error">An error occurred. Please try again.</p>`;
    });
});