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
$id = $conn->real_escape_string($data['id']);
$title = $conn->real_escape_string($data['title']);
$text = $conn->real_escape_string($data['text']);
$date = $conn->real_escape_string($data['date']);

$sql = "UPDATE announcements SET title='$title', text='$text', created_at='$date' WHERE id='$id'";
$response = [];

if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}

$conn->close();
echo json_encode($response);
?>
