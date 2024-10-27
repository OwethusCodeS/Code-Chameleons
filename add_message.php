<?php
// Database connection
$servername = "localhost";  // MySQL server
$username = "root@localhost";  // MySQL username
$password = "";  //  MySQL password
$dbname = "closingclient.io";  //  database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$title = $conn->real_escape_string($data['title']);
$text = $conn->real_escape_string($data['text']);
$date = $conn->real_escape_string($data['date']);

$sql = "INSERT INTO announcements (title, text, created_at) VALUES ('$title', '$text', '$date')";
$response = [];

if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}

$conn->close();
echo json_encode($response);
?>
