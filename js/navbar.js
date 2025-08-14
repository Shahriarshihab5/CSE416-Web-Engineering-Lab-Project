// Navbar HTML
const navbarHTML = `
  <nav class="flex items-center justify-between px-6 md:px-20 py-4 bg-white shadow w-full">
    <div class="flex items-center gap-3">
      <img src="logo.png" alt="logo" class="w-10 h-10 rounded-full border-2 border-blue-200">
      <h1 class="brand-title">PawPromise</h1>
    </div>

    <div class="hidden md:flex items-center gap-6">
      <a href="home.html" class="hover:text-[#6ab7e2]">Home</a>
      <a href="petfood.html" class="text-[#6ab7e2]">Pet Food</a>
      <a href="#" class="hover:text-[#6ab7e2]">Contact</a>

      <div class="relative">
        <button id="profileButton" class="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <i class="fa-regular fa-user text-xl"></i>
        </button>
        <div id="profileMenu" class="hidden absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md flex flex-col z-50">
          <a href="#" class="px-4 py-2 hover:bg-gray-100">Profile</a>
          <a href="#" class="px-4 py-2 hover:bg-gray-100">Update Password</a>
          <a href="#" class="px-4 py-2 hover:bg-gray-100">Cart</a>
          <a href="#" class="px-4 py-2 hover:bg-gray-100">Logout</a>
        </div>
      </div>
    </div>
  </nav>
`;

// Inject navbar
const navbarContainer = document.getElementById('navbar');
navbarContainer.innerHTML = navbarHTML;

// Now grab the profile button & menu
const profileButton = navbarContainer.querySelector('#profileButton');
const profileMenu = navbarContainer.querySelector('#profileMenu');

// Toggle dropdown
profileButton.addEventListener('click', (e) => {
    e.stopPropagation();
    profileMenu.classList.toggle('hidden');
});
window.addEventListener('click', (e) => {
    if (!profileButton.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.add('hidden');
    }
});
