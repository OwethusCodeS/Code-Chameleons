<?php
include 'db.php';  // Include the database connection file

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];  // If editing, an ID will be provided
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $role = $_POST['role'];

    if (empty($id)) {
        // Insert a new user
        $sql = "INSERT INTO users (first_name, last_name, email, role) 
                VALUES ('$first_name', '$last_name', '$email', '$role')";
    } else {
        // Update an existing user
        $sql = "UPDATE users SET first_name='$first_name', last_name='$last_name', email='$email', role='$role' WHERE id=$id";
    }

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
}
?>
