document.addEventListener('DOMContentLoaded', () => {
  const profileButton = document.getElementById('profileButton');
  const profileMenu = document.getElementById('profileMenu');
  const logoutLink = document.getElementById('logoutLink');
  const userNameSpan = document.getElementById('userName');

  let inactivityTimer; // store timer globally
  let isLoggedIn = false; // track login status

  const user = JSON.parse(localStorage.getItem('user'));

  function updateNavbar(isLoggedInState, userEmail = "") {
    isLoggedIn = isLoggedInState;
    if (isLoggedIn) {
      userNameSpan.textContent = userEmail.split('@')[0];
      logoutLink.textContent = "Log Out";
      logoutLink.removeAttribute('href');
      logoutLink.onclick = (e) => {
        e.preventDefault();
        logoutUser();
      };
    } else {
      userNameSpan.textContent = "";
      logoutLink.textContent = "Log In";
      logoutLink.setAttribute('href', '/User/login.html');
      logoutLink.onclick = null;
    }
  }

  function logoutUser() {
    if (!isLoggedIn) return; // prevent multiple alerts

    clearTimeout(inactivityTimer); // stop the timer
    localStorage.removeItem('user');
    sessionStorage.clear();
    updateNavbar(false);
    showToast("You have been logged out. See you next time!");
  }

  function setupInactivityLogout(timeout) {
    const resetTimer = () => {
      if (!isLoggedIn) return; // only reset if logged in
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logoutUser, timeout);
    };
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(event =>
      document.addEventListener(event, resetTimer)
    );
    resetTimer();
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#333";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s";

    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = "1");

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // Init
  if (user && user.email) {
    updateNavbar(true, user.email);
    setupInactivityLogout(20 * 60 * 1000); // 20 minutes
  } else {
    updateNavbar(false);
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
