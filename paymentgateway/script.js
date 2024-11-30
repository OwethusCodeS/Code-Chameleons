document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('payfast-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const firstName = document.getElementById('name_first').value.trim();
        const lastName = document.getElementById('name_last').value.trim();
        const email = document.getElementById('email_address').value.trim();
        
        if (firstName === '' || lastName === '' || email === '') {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        console.log('Form submitted');
        form.submit();
    });
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});