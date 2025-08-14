// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase config
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

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const togglePassword = document.getElementById('togglePassword');
  const forgotPassword = document.getElementById('forgotPassword');


  // Login form submit
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Email validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      emailError.style.display = 'block';
      return;
    } else {
      emailError.style.display = 'none';
    }

    // Firebase login
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          window.location.href = "/pages/home.html";
        });
      })
      .catch(error => {
        Swal.fire("Login Failed", error.message, "error");
        passwordInput.value = "";
        passwordInput.focus(); 
      });
  });
});
