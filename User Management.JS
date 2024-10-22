
// JS code with PHP integration
let users = [];  // Array to store users
    let editMode = false;  // Track if editing an existing user

    // Handle form submission for adding or editing users
    document.querySelector('#addUserForm').addEventListener('submit', function (event) {
      event.preventDefault();  // Prevent form submission to server

      // Fetch values from form inputs
      const id = document.querySelector('#userId').value;
      const firstName = document.querySelector('#firstName').value;
      const lastName = document.querySelector('#lastName').value;
      const email = document.querySelector('#email').value;
      const role = document.querySelector('#role').value;
      const fullName = `${firstName} ${lastName}`;

      if (editMode) {
        // If in edit mode, update the existing user
        const userIndex = users.findIndex(user => user.id == id);
        if (userIndex !== -1) {
          users[userIndex].name = fullName;
          users[userIndex].email = email;
          users[userIndex].role = role;
          editMode = false;  // Reset edit mode after saving changes
        }
      } else {
        // If not in edit mode, create a new user
        const newUserId = users.length ? users[users.length - 1].id + 1 : 1;
        const newUser = { id: newUserId, name: fullName, email, role };
        users.push(newUser);  // Add the new user to the 'users' array
      }

      // Reset the form inputs
      document.querySelector('#addUserForm').reset();
      document.querySelector('#userId').value = '';  // Clear hidden ID field

      // Re-render the table with updated 'users' array
      renderTable();
    });

    // Function to render the user table
    function renderTable() {
      const tbody = document.querySelector('#userTable tbody');
      tbody.innerHTML = '';  // Clear the current table body content

      // Loop through the 'users' array and create table rows for each user
      users.forEach(user => {
        const row = document.createElement('tr');  // Create a new table row
        row.innerHTML = `
          <td>${user.id}</td>  <!-- User ID -->
          <td>${user.name}</td>  <!-- User Name -->
          <td>${user.email}</td>  <!-- User Email -->
          <td>${user.role}</td>  <!-- User Role -->
          <td>
            <!-- Edit and Delete buttons -->
            <button class="btn edit-btn" onclick="editUser(${user.id})">Edit</button>
            <button class="btn delete-btn" onclick="deleteUser(${user.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);  // Add the new row to the table body
      });
    }

    // Function to handle editing a user
    function editUser(id) {
      const user = users.find(user => user.id == id);
      if (user) {
        document.querySelector('#userId').value = user.id;
        document.querySelector('#firstName').value = user.name.split(' ')[0];
        document.querySelector('#lastName').value = user.name.split(' ')[1];
        document.querySelector('#email').value = user.email;
        document.querySelector('#role').value = user.role;
        editMode = true;  // Set edit mode to true
      }
    }

    // Function to handle deleting a user
    function deleteUser(id) {
      users = users.filter(user => user.id != id);  // Remove user from array
      renderTable();  // Re-render the table after deletion
    }


        // Load users from database and render in the table
        function loadUsers() {
            fetch('get_users.php')
                .then(response => response.json())
                .then(users => {
                    const tbody = document.querySelector('#userTable tbody');
                    tbody.innerHTML = '';  // Clear the current table body content

                    users.forEach(user => {
                        const row = document.createElement('tr');  // Create a new table row
                        row.innerHTML = `
                            <td>${user.id}</td>
                            <td>${user.first_name} ${user.last_name}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                            <td>
                                <button class="btn edit-btn" onclick="editUser(${user.id}, '${user.first_name}', '${user.last_name}', '${user.email}', '${user.role}')">Edit</button>
                                <button class="btn delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                            </td>
                        `;
                        tbody.appendChild(row);  // Add the new row to the table body
                    });
                });
        }

        // Load users when the page is loaded
        window.onload = loadUsers;

        // Handle form submission (add/update user)
        document.querySelector('#addUserForm').addEventListener('submit', function (event) {
            event.preventDefault();  // Prevent default form submission

            const formData = new FormData(this);  // Collect the form data

            fetch('save_user.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('User saved successfully!');
                    this.reset();  // Clear the form
                    loadUsers();  // Reload the users table
                } else {
                    alert('Error saving user: ' + data.error);
                }
            });
        });

        // Fill the form with user data for editing
        function editUser(id, firstName, lastName, email, role) {
            document.querySelector('#userId').value = id;
            document.querySelector('#firstName').value = firstName;
            document.querySelector('#lastName').value = lastName;
            document.querySelector('#email').value = email;
            document.querySelector('#role').value = role;
        }

        // Delete a user
        function deleteUser(id) {
            if (confirm('Are you sure you want to delete this user?')) {
                const formData = new FormData();
                formData.append('id', id);

                fetch('delete_user.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('User deleted successfully!');
                        loadUsers();  // Reload the users table after deletion
                    } else {
                        alert('Error deleting user: ' + data.error);
                    }
                });
            }
        }
   