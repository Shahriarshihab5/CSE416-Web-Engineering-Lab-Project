document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.email) {
    alert("You must login to access the cart!");
    window.location.href = "/user/login.html";
  }
});
<script src="/js/navbar.js"></script>




