<?php
$servername = "localhost";
$username = "root"; // replace with your MySQL username
$password = ""; // replace with your MySQL password
$dbname = "catmarketing";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form values
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password']; // Note: Consider hashing passwords before storing

// Check if the email already exists
$checkEmail = $conn->prepare("SELECT id FROM Student WHERE email = ?");
$checkEmail->bind_param("s", $email);
$checkEmail->execute();
$checkEmail->store_result();


if ($checkEmail->num_rows > 0) {
    echo "Error: This email is already registered!";
} else {
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO Student (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $password);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}



$checkEmail->close();
$conn->close();
?>
