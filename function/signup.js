$(document).ready(function() {
    $('#form-login').submit(function(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        
        // Serialize the form data
        var formData = $(this).serialize();
        
        // Send an AJAX request to the signup.php file
        $.ajax({
            type: 'POST',
            url: '../function/signup.php',
            data: formData,
            success: function(response) {
                // Handle the response from the server
                alert(response); // Display a message returned by the server (e.g., success message or error message)
            },
            error: function() {
                // Handle errors if the request fails
                alert('An error occurred while processing your request.');
            }
        });
    });
});
