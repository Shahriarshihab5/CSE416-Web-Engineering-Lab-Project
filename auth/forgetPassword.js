// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

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

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Handle reset form
const recoverForm = document.getElementById('recoverForm');
if (recoverForm) {
  const emailInput = document.getElementById('recoverEmail');
  const emailError = document.getElementById('recoverEmailError');

  recoverForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    // Validate email format
    if (!isValidEmail(email)) {
      if (emailError) emailError.style.display = 'block';
      return;
    } else if (emailError) {
      emailError.style.display = 'none';
    }

    // Send password reset email (secure, does not reveal if email exists)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset',
          text: 'If an account exists for this email, a reset link has been sent.',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.href = "login.html";
        });
      })
      .catch(error => {
        // Catch real errors like invalid email format (rare)
        Swal.fire('Error', error.message.replace("Firebase: ",""), 'error');
      });
  });
}
