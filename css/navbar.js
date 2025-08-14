// js/navbar.js
const profileButton = document.getElementById('profileButton');
const profileMenu = document.getElementById('profileMenu');
const logoutLink = document.getElementById('logoutLink');

// Toggle dropdown
profileButton.addEventListener('click', () => {
  profileMenu.classList.toggle('hidden');
});

// Close if clicked outside
window.addEventListener('click', e => {
  if (!profileButton.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.classList.add('hidden');
  }
});

// Logout
logoutLink.addEventListener('click', e => {
  e.preventDefault();
  localStorage.removeItem('user');
  sessionStorage.clear();
  window.location.href = '/user/login.html';
});

// If user not logged in
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
  profileButton.innerHTML = `<a href="/user/login.html" class="text-gray-800">Login</a>`;
}
