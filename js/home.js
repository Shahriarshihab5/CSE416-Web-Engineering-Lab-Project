const pets = [
  {
    name: "Mister Tartosh",
    type: "dog",
    breed: "Golden Retriever",
    year: 2024,
    gender: "Female",
    price: 199,
    image: "/assets/057c756e8344b2a85291bffccc5b788c.webp"
  },
  {
    name: "Mister",
    type: "dog",
    breed: "Golden Retriever",
    year: 2024,
    gender: "Female",
    price: 250,
    image: "/assets/cute-dog-breeds-we-can-t-get-enough-of-4589340-18-d7d08269a41249d180fd1e0a249c6fcb.webp"
  },
  {
    name: "Whiskers",
    type: "cat",
    breed: "Persian Cat",
    year: 2023,
    gender: "Male",
    price: 99,
    image: "/assets/striped-with-white-a-cat.webp"
  },
  {
    name: "Fluffy",
    type: "rabbit",
    breed: "Angora",
    year: 2022,
    gender: "Female",
    price: 49,
    image: "/assets/Rbbit.jpeg"
  },
  {
    name: "Whiskers",
    type: "cat",
    breed: "Persian Cat",
    year: 2023,
    gender: "Male",
    price: 199,
    image: "/assets/worlds-most-beautiful-cats-111-57fe26438b6c7__700.webp"
  },
  {
    name: "Tartosh",
    type: "dog",
    breed: "Golden Retriever",
    year: 2024,
    gender: "Female",
    price: 150,
    image: "/assets/white-bully-kutta-stands-outside.webp"
  }
];

let currentCategory = 'all'; 
let isSorted = false; 

const modal = document.getElementById("pet-modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");

function showModal(pet) {
  modalImage.src = pet.image;
  modalName.textContent = pet.name;
  document.getElementById("modal-type").textContent = pet.type;
  document.getElementById("modal-breed").textContent = pet.breed;
  document.getElementById("modal-birth").textContent = pet.year;
  document.getElementById("modal-gender").textContent = pet.gender;
  document.getElementById("modal-price").textContent = `$${pet.price}`;
  modal.classList.remove("hidden");
}

const closeModalBtn = document.getElementById("close-modal");
const closeModalBtn2 = document.getElementById("close-modal-btn");

function closeModal() {
  modal.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);
closeModalBtn2.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function sortPetsByPrice(petsArray) {
  return [...petsArray].sort((a, b) => b.price - a.price);
}

function displayPets(petType = "all", shouldSort = false) {
  const container = document.getElementById("pet-container");
  const likedSection = document.getElementById("liked-pets");
  container.innerHTML = "";

  currentCategory = petType; 
  isSorted = shouldSort; 

  let filteredPets = petType === "all" ? [...pets] : pets.filter((pet) => pet.type === petType);

  if (shouldSort) {
    filteredPets = sortPetsByPrice(filteredPets);
  }


  const sortBtn = document.getElementById('sortByPriceBtn');
  if (sortBtn) {
    sortBtn.textContent = isSorted ? 'Reset Sort' : 'Sort By Price';
  }

  if (filteredPets.length === 0) {
    container.innerHTML = `
      <div class="w-full flex flex-col items-center justify-center mt-10 lg:mx-200">
        <img src="./assets/seo.png" alt="No Data" class="w-20 h-20 mb-4" />
        <h2 class="text-xl font-semibold text-gray-700">No information available</h2>
        <p class="mt-2 text-center text-gray-500 max-w-lg">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          The point of using Lorem Ipsum is that it has a.
        </p>
      </div>
    `;
    return;
  }

  filteredPets.forEach((pet) => {
    const card = document.createElement("div");
    card.className = "box border border-slate-300 rounded-lg p-5";

    card.innerHTML = `
    <div class="w-full max-w-full aspect-[4/3] mb-5 rounded-2xl overflow-hidden mx-auto">
      <img src="${pet.image}" alt="${pet.name}" class="w-full h-full object-cover">
    </div>
    <div>
      <h1 class="font-bold text-lg sm:text-xl">${pet.name}</h1>
      <div class="flex gap-2 text-slate-500 text-sm sm:text-base">
        <i class="fa-solid fa-box mt-1"></i>
        <span>${pet.breed}</span>
      </div>
      <div class="flex gap-2 text-slate-500 text-sm sm:text-base">
        <i class="fa-solid fa-calendar mt-1"></i>
        <span>${pet.year}</span>
      </div>
      <div class="flex gap-2 text-slate-500 text-sm sm:text-base">
        <i class="fa-solid fa-mercury mt-1"></i>
        <span>${pet.gender}</span>
      </div>
      <div class="flex gap-2 text-slate-500 text-sm sm:text-base">
        <i class="fa-solid fa-dollar-sign mt-1"></i>
        <span>Price: $${pet.price}</span>
      </div>
    </div>
    <div class="border border-s-neutral-600 mt-3"></div>
    <div class="py-4 flex flex-wrap gap-2">
      <div class="like-btn w-10 h-10 flex items-center justify-center border border-slate-300 rounded-lg cursor-pointer">
        <i class="fa-regular fa-thumbs-up"></i>
      </div>
      <div class="w-20 h-10 flex items-center justify-center border border-slate-300 rounded-lg relative">
        <button class="adopt-btn font-bold text-[rgba(14,122,129,1)]">Adopt</button>
        <button class="adopted-btn font-bold text-[rgba(14,122,129,1)] hidden">Adopted</button>
      </div>
      <div class="w-20 h-10 flex items-center justify-center border border-slate-300 rounded-lg">
        <button class="details-btn bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 py-1 rounded text-sm">
          Details
        </button>
      </div>
    </div>
  `;
  


    const likeBtn = card.querySelector(".like-btn");
    likeBtn.addEventListener("click", () => {
      const petImg = document.createElement("img");
      petImg.src = pet.image;
      petImg.alt = pet.name;
      petImg.className = "w-20 h-20 object-cover rounded";
      likedSection.appendChild(petImg);
    });

    const detailsBtn = card.querySelector(".details-btn");
    detailsBtn.addEventListener("click", () => {
      showModal(pet);
    });

    const adoptBtn = card.querySelector(".adopt-btn");
    const adoptedBtn = card.querySelector(".adopted-btn");
    adoptBtn.addEventListener("click", () => {
      let count = 3;
      adoptBtn.disabled = true;
      adoptBtn.textContent = `Adopting in ${count}...`;
      const countdown = setInterval(() => {
        count--;
        if (count > 0) {
          adoptBtn.textContent = `Adopting in ${count}...`;
        } else {
          clearInterval(countdown);
          adoptBtn.classList.add("hidden");
          adoptedBtn.classList.remove("hidden");
          adoptBtn.disabled = false;
        }
      }, 1000);
    });

    container.appendChild(card);
  });
}


displayPets();


document.getElementById('sortByPriceBtn').addEventListener('click', () => {
  displayPets(currentCategory, !isSorted);
});

// Category filter buttons
document.querySelectorAll(".pet-btnss").forEach((btn) => {
  btn.addEventListener("click", function () {
    const type = this.getAttribute("data-type");
    const spinner = document.getElementById("spinner");
    
    spinner.classList.remove("hidden");

    setTimeout(() => {
      displayPets(type);
      spinner.classList.add("hidden");
    }, 2000);
  });
});

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    
    const icon = menuToggle.querySelector("i");
    if (mobileMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});

document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const password = this.password.value.trim();
  const confirmPassword = this.confirmPassword.value.trim();
  const msg = document.getElementById("msg");

  if (password !== confirmPassword) {
    msg.style.color = "red";
    msg.textContent = "Passwords do not match.";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    msg.style.color = data.message.includes("success") ? "green" : "red";
    msg.textContent = data.message;

    if (data.message.includes("success")) {
      this.reset();
    }

  } catch (error) {
    msg.style.color = "red";
    msg.textContent = "Server error. Please try again.";
  }
});