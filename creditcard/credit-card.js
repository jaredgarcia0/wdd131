document.getElementById('credit-card-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const cardNumber = document.getElementById('cardNumber').value;
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt("20" + document.getElementById('year').value); // Convert YY to YYYY
    const feedback = document.getElementById('feedback');

    // Get current date for expiration check
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // Months are 0-indexed
    const currentYear = now.getFullYear();

    let isValid = true;
    let message = "";

    // 1. Validate exact card number
    if (cardNumber !== '1234123412341234') {
        isValid = false;
        message = "Invalid Card Number.";
    } 
    // 2. Validate Expiration
    else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        isValid = false;
        message = "The card is expired.";
    }
    // 3. Simple Month Range Check
    else if (month < 1 || month > 12) {
        isValid = false;
        message = "Invalid month.";
    }

    // Output Feedback
    if (isValid) {
        feedback.style.color = "green";
        feedback.innerText = "Payment Successful! Thank you.";
    } else {
        feedback.style.color = "red";
        feedback.innerText = message;
    }
});