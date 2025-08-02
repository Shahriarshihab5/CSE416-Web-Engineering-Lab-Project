document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // For now, just show success and redirect
  alert("Account created successfully!");
  window.location.href = "/index.html"; // Redirect to login
});
