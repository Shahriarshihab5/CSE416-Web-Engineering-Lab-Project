import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA6Joeqw9y0tRDRmXrFVUm0lCgRGokK3n8",
  authDomain: "webproject-dd868.firebaseapp.com",
  projectId: "webproject-dd868",
  storageBucket: "webproject-dd868.appspot.com",
  messagingSenderId: "80994644943",
  appId: "1:80994644943:web:3d0a61286e773a1210d8ba",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const togglePassword = document.getElementById('togglePassword');

  togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.classList.remove('hidden');
      return;
    } else emailError.classList.add('hidden');

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
        Swal.fire({ icon: 'success', title: 'Login Successful!', toast: true, position: 'top-end', timer: 1500, showConfirmButton: false })
          .then(() => {

            if( user.email === "admin@gmail.com")  {
              window.location.href = "http://127.0.0.1:5500/components/admin/admin.html#"
            }else{
               window.location.href = "/pages/home.html"
            };
           
          });
      })
      .catch(err => {
        Swal.fire("Login Failed", err.message, "error");
        passwordInput.value = "";
        passwordInput.focus();
      });
  });
});
