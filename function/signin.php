<?php
$dbconn = pg_connect("host=localhost dbname=DK_trainning user=postgres password=admin");

if (!$dbconn) {
  echo "Error: Unable to connect to database.\n";
  exit;
}

$usernameOrEmail = $_POST['uname'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE username = $1 OR email = $1";
$result = pg_query_params($dbconn, $query, array($usernameOrEmail));

if (!$result) {
  echo "An error occurred.\n";
  exit;
}

$user = pg_fetch_assoc($result);

if (!$user) {
  echo "Username or email not found";
  exit;
}

// Verify the password
if (!password_verify($password, $user['password'])) {
  echo "Incorrect password";
  exit;
}

// Update last_login column
$updateQuery = "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1";
$updateResult = pg_query_params($dbconn, $updateQuery, array($user['id']));

if (!$updateResult) {
  echo "Error updating last login.\n";
  exit;
}

// If login successful, return a success message
echo "Login successful";

pg_close($dbconn);
?>
