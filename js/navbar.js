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
        logoutUser(true); // manual logout
      };

      // Add a dashboard link if the user is admin
      if (userEmail === "admin@gmail.com") {
        const dashboardLink = document.createElement('a');
        dashboardLink.href = "http://127.0.0.1:5500/components/admin/admin.html#";
        dashboardLink.textContent = "Dashboard";
        dashboardLink.className = "px-4 py-2 hover:bg-gray-100";
        profileMenu.prepend(dashboardLink);
      }
    } else {
      userNameSpan.textContent = "";
      logoutLink.textContent = "Log In";
      logoutLink.setAttribute('href', '/User/login.html');
      logoutLink.onclick = null;
    }
  }

  function logoutUser(manual = false) {
    if (!isLoggedIn) return; // prevent multiple logouts
    clearTimeout(inactivityTimer);

    const doLogout = () => {
      localStorage.removeItem('user');
      sessionStorage.clear();
      updateNavbar(false);
      if (manual) {
        Swal.fire(
          'Logged out!',
          'See you next time!',
          'success'
        ).then(() => {
          window.location.href = "/pages/home.html";
        });
      } else {
        // Silent logout: redirect without SweetAlert
        window.location.href = "/pages/home.html";
      }
    };

    if (manual) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout!'
      }).then((result) => {
        if (result.isConfirmed) {
          doLogout();
        }
      });
    } else {
      doLogout(); // automatic logout
    }
  }

  function setupInactivityLogout(timeout) {
    const resetTimer = () => {
      if (!isLoggedIn) return;
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => logoutUser(false), timeout);
    };
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(event =>
      document.addEventListener(event, resetTimer)
    );
    resetTimer();
  }

  // Init
  if (user && user.email) {
    updateNavbar(true, user.email);
    setupInactivityLogout(15 * 60 * 1000); // 15 minutes
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
