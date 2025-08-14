// Firebase imports
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
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        // Create user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Registered user:", user);

        alert("Registration successful!");
        window.location.href = "/user/login.html"; // Redirect to login
    } catch (error) {
        console.error("Registration error:", error);
        alert(error.message);
    }
});
