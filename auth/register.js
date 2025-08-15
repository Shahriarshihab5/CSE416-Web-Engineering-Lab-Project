// /auth/register.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6Joeqw9y0tRDRmXrFVUm0lCgRGokK3n8",
    authDomain: "webproject-dd868.firebaseapp.com",
    projectId: "webproject-dd868",
    storageBucket: "webproject-dd868.appspot.com",
    messagingSenderId: "80994644943",
    appId: "1:80994644943:web:3d0a61286e773a1210d8ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Form elements
const signupForm = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

// Handle form submission
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        Swal.fire("Error", "Please fill in all fields.", "error");
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match.", "error");
        passwordInput.value = "";
        confirmPasswordInput.value = "";
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Registered user:", user);

        if (!user && !user.email) {
            Swal.fire("Error", "User registration failed. Please try again.", "error");
        }

        //  post request to save user data in the database
        await fetch("http://localhost:8000/api/users/register", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        })

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Registration Successful!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            // window.location.href = "/user/login.html";
        });
    } catch (error) {
        let message = "";

        switch (error.code) {
            case "auth/email-already-in-use":
                message = "This email is already registered.";
                break;
            case "auth/invalid-email":
                message = "Please enter a valid email address.";
                break;
            case "auth/weak-password":
                message = "Password should be at least 6 characters.";
                break;
            default:
                message = "Registration failed. Please try again.";
        }

        Swal.fire("Registration Failed", message, "error");
        passwordInput.value = "";
        confirmPasswordInput.value = "";
    }
});
