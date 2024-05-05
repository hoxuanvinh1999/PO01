$(document).ready(function() {
    $('#form-login').submit(function(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        $.ajax({
            type: 'POST',
            url: '../function/signin.php',
            data: $(this).serialize(),
            success: function(response) {
                if (response === 'Login successful') {
                    // Redirect to dktraining.html upon successful login
                    window.location.href = 'dktraining.html';
                } else {
                    // Display error notification using alert
                    alert(response);
                }
            },
            error: function() {
                // Display a generic error message if the request fails
                alert('An error occurred while processing your request.');
            }
        });
    });
});
