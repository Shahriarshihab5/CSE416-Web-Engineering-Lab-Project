const getAllUsers = async () => { 
    try {
        const res = await fetch("http://localhost:8000/api/users/all-user");
        const data = await res.json();
        console.log("Fetched users:", data);
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

const loadUsers = async () => {
    // Get user from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    // if this user is not admin or not logged in, show a custom popup and redirect
    //  if this user is not admin this condition wiil be true. if the user is not admin , this condtion will be false and ignore the imidiate (if) code below
    if (!user || user.email !== "admin@gmail.com") {
        console.log("User is not admin or not logged in:", user);

        // Create custom popup
        const popup = document.createElement("div");
        popup.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px 30px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                font-family: Arial, sans-serif;
                text-align: center;
                z-index: 9999;
            ">
                <h2 style="color: red; margin-bottom: 10px;">Access Denied</h2>
                <p>You do not have permission to access this page.</p>
            </div>
        `;
        document.body.appendChild(popup);

        // Redirect to home after 2 seconds
        setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/index.html"; // Home page
        }, 10000);

        return;
    }

    // Fetch users
    const users = await getAllUsers();
    const tableBody = document.getElementById("userTable");

    // Clear any existing rows
    tableBody.innerHTML = "";

    // Append new rows
    users.forEach(u => {
        const row = `
            <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
            </tr>`;
        tableBody.innerHTML += row;
    });

    // Update stats
    document.getElementById("totalUsers").innerText = users.length;
    document.getElementById("totalOrders").innerText = 0; 
    document.getElementById("totalRevenue").innerText = "$0.00"; 
};

// Run on page load
document.addEventListener("DOMContentLoaded", loadUsers);
