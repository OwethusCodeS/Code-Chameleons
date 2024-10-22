<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logout Successful</title>
    <style>
      /* General Page Styling */
      body {
          font-family: 'Arial', sans-serif;
          background-color: #0D1B2A;
          color: white;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
      }

      /* Centering Container */
      .logout-container {
          text-align: center;
          background-color: #1B263B;
          padding: 40px 60px;
          border-radius: 15px;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
      }

      .logout-container h1 {
          font-size: 28px;
          margin-bottom: 20px;
      }

      /* Button Container Styling */
      .logout-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
      }

      .logout-buttons button {
          background-color: #1DA1F2;
          border: none;
          color: white;
          font-size: 16px;
          padding: 10px 30px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 48%;
      }

      .logout-buttons button:hover {
          background-color: #137AC7;
      }

      .logout-buttons button.cancel {
          background-color: transparent;
          border: 2px solid #1DA1F2;
          color: #1DA1F2;
          transition: all 0.3s ease;
      }

      .logout-buttons button.cancel:hover {
          background-color: #1DA1F2;
          color: white;
      }

      /* Footer Styling */
      footer {
          text-align: center;
          position: absolute;
          bottom: 10px;
          width: 100%;
          color: #8899A6;
          font-size: 14px;
      }
    </style>
<body>
    <div class="logout-container">
        <h1>Successfully Logged Out</h1>
        <p>You have been successfully logged out. Thank you for using our system.</p>
        <a href="login.php">Click here to log in again</a> <!-- Link to login page -->
    </div>
</body>
</html>
