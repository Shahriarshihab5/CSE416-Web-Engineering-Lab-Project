document.addEventListener('DOMContentLoaded', function () {
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const loginForm = document.getElementById('loginForm');

  // Toggle password visibility
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
  });

  // Email validation
  loginForm.addEventListener('submit', function (e) {
    const email = emailInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      e.preventDefault();
      emailError.style.display = 'block';
    } else {
      emailError.style.display = 'none';
    }
  });
});
