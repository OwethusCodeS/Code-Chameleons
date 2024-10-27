<?php
include 'db.php';

$sql = "SELECT * FROM users";
$result = $conn->query($sql);

$users = [];
if ($result->num_rows > 0) {
    // Fetch all users
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);  // Send the users data as JSON
?>
