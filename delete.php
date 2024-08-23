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

// Get the id from the request
$id = $_POST['id'];

$sql = "DELETE FROM Student WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully!";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?>
