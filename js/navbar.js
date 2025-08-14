document.addEventListener('DOMContentLoaded', () => {
  const profileButton = document.getElementById('profileButton');
  const profileMenu = document.getElementById('profileMenu');
  const logoutLink = document.getElementById('logoutLink');
  const userNameSpan = document.getElementById('userName');

  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.email) {
    userNameSpan.textContent = user.email.split('@')[0];
    logoutLink.textContent = "Log out";
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('user');
      sessionStorage.clear();
      window.location.href = '/pages/home.html';
    });
    logoutLink.textContent = "Update Password";
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('user');
      sessionStorage.clear();
      window.location.href = '/User/forgetPassword.html';
    });
  } else {
    userNameSpan.textContent = "";
    logoutLink.textContent = "Log In";
    logoutLink.setAttribute('href', '/user/login.html');
  }

  profileButton.addEventListener('click', () => {
    profileMenu.classList.toggle('hidden');
  });

  window.addEventListener('click', (e) => {
    if (!profileButton.contains(e.target) && !profileMenu.contains(e.target)) {
      profileMenu.classList.add('hidden');
    }
  });
});
