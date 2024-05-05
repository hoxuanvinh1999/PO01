<?php
// Database connection
$dbconn = pg_connect("host=localhost dbname=DK_trainning user=postgres password=admin");

if (!$dbconn) {
    echo "Error: Unable to connect to the database.";
    exit;
}

// Retrieve form data
$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';

// Perform validation
if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
    // If any field is empty, return an error message
    echo "All fields are required.";
} elseif ($password !== $confirm_password) {
    // If passwords do not match, return an error message
    echo "Passwords do not match.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // If email is not in a valid format, return an error message
    echo "Invalid email format.";
} else {
    // Check if the username or email already exists
    $query = "SELECT * FROM users WHERE username = $1 OR email = $1";
    $result = pg_query_params($dbconn, $query, array($username));

    if (!$result) {
        echo "An error occurred while checking username or email existence.";
        exit;
    }

    if (pg_num_rows($result) > 0) {
        echo "Username or email already exists. Please choose a different one.";
    } else {
        // Insert the new user into the database
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $insert_query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        $insert_result = pg_query_params($dbconn, $insert_query, array($username, $email, $hashed_password));

        if (!$insert_result) {
            echo "Error: Unable to register the user.";
            exit;
        } else {
            // Registration successful, redirect to dktraining.html
            echo "<script>window.location.href = '../src/dktraining.html';</script>";
        }
    }
}

// Close the database connection
pg_close($dbconn);
?>
