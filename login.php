<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection
$servername = "localhost";
$db_username = "root"; // Replace with your MySQL username
$db_password = "0409"; // Replace with your MySQL password
$dbname = "user_db";

// Create connection
$conn = new mysqli($servername, $db_username, $db_password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if user exists
    $sql = "SELECT id, password FROM users WHERE username=?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }

    // Bind parameters
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashed_password);
    $stmt->fetch();

    // Check the number of rows
    if ($stmt->num_rows > 0) {
        // Verify the password
        if (password_verify($password, $hashed_password)) {
            header("Location: success.html");
            exit();
        } else {
            header("Location: error.html");
            exit();
        }
    } else {
        header("Location: error.html");
        exit();
    }

    
}

$conn->close();
?>
