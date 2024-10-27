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

$sql = "SELECT * FROM announcements ORDER BY created_at DESC";
$result = $conn->query($sql);

$messages = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

$conn->close();
echo json_encode($messages);
?>
