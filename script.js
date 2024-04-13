document.getElementById('submit-button').addEventListener('click', function() {
    // Retrieve input values
    const grossIncome = parseFloat(document.getElementById('gross-income').value);
    const extraIncome = parseFloat(document.getElementById('extra-income').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    const ageGroup = document.getElementById('age-group').value;

    // Perform input validation and display error icons if needed
    let isValid = true;
    const inputFields = [
        { value: grossIncome, errorId: 'income-error-icon' },
        { value: extraIncome, errorId: 'extra-error-icon' },
        { value: deductions, errorId: 'deductions-error-icon' }
    ];

    inputFields.forEach(field => {
        if (isNaN(field.value)) {
            document.getElementById(field.errorId).style.display = 'inline';
            isValid = false;
        } else {
            document.getElementById(field.errorId).style.display = 'none';
        }
    });

    if (!ageGroup) {
        document.getElementById('age-error-icon').style.display = 'inline';
        isValid = false;
    } else {
        document.getElementById('age-error-icon').style.display = 'none';
    }

    // Perform tax calculation if all inputs are valid
    if (isValid) {
        const totalIncome = grossIncome + extraIncome - deductions;
        let taxRate;

        // Determine tax rate based on age group
        switch (ageGroup) {
            case '<40':
                taxRate = 0.3;
                break;
            case '40-60':
                taxRate = 0.4;
                break;
            case '≥60':
                taxRate = 0.1;
                break;
            default:
                // Handle unexpected age group values
                return;
        }

        let tax = 0;

        // Calculate tax if total income is greater than 8 lakhs
        if (totalIncome > 800000) {
            const taxableIncome = totalIncome - 800000;
            tax = taxableIncome * taxRate;
        }

        // Display tax amount in a modal
        const taxModal = document.getElementById('tax-modal');
        const taxAmount = document.getElementById('tax-amount');
        if (tax > 0) {
            taxAmount.innerText = `The calculated tax amount is: ${tax.toFixed(2)} after tax deductions`;
        } else {
            taxAmount.innerText = "No tax applies for this income level.";
        }

        taxModal.style.display = 'flex';
    }
});

const modal = document.getElementById('tax-modal');
const closeModal = document.getElementById('close-modal');

// Event listener to close the modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Add event listener to window to close the modal when clicking outside the modal
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});