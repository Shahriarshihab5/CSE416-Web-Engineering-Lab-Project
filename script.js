document.addEventListener('DOMContentLoaded', () => {
  const pets = [
    {
      name: "Mister Tartosh",
      type: "dog",
      breed: "Golden Retriever",
      year: 2024,
      gender: "Female",
      price: 199,
      image: "./assets/p93.png"
    },
    {
      name: "Mister Tartosh",
      type: "dog",
      breed: "Golden Retriever",
      year: 2024,
      gender: "Female",
      price: 199,
      image: "./assets/photo-1568572933382-74d440642117.jpeg"
    },
    {
      name: "Whiskers",
      type: "cat",
      breed: "Persian Cat",
      year: 2023,
      gender: "Male",
      price: 99,
      image: "./assets/photo-1536589961747-e239b2abbec2.jpeg"
    },
    {
      name: "Fluffy",
      type: "rabbit",
      breed: "Angora",
      year: 2022,
      gender: "Female",
      price: 49,
      image: "./assets/2d157475da3f359c2bfcd10875aaa872.jpg"
    },
    {
      name: "Whiskers",
      type: "cat",
      breed: "Persian Cat",
      year: 2023,
      gender: "Male",
      price: 99,
      image: "./assets/premium_photo-1673967831980-1d377baaded2.jpeg"
    },
    {
      name: "Mister Tartosh",
      type: "dog",
      breed: "Golden Retriever",
      year: 2024,
      gender: "Female",
      price: 199,
      image: "./assets/istockphoto-175453491-2048x2048.jpg"
    }
  ];

  let currentCategory = 'all'; 
  let isSorted = false; 

  const modal = document.getElementById("pet-modal");
  const modalImage = document.getElementById("modal-image");
  const modalName = document.getElementById("modal-name");
  const closeModalBtn = document.getElementById("close-modal");
  const closeModalBtn2 = document.getElementById("close-modal-btn");

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

  function closeModal() {
    modal.classList.add("hidden");
  }

  closeModalBtn.addEventListener("click", closeModal);
  closeModalBtn2.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
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

    let filteredPets = petType === "all" ? [...pets] : pets.filter(p => p.type === petType);
    if (shouldSort) filteredPets = sortPetsByPrice(filteredPets);

    const sortBtn = document.getElementById('sortByPriceBtn');
    if (sortBtn) {
      sortBtn.textContent = isSorted ? 'Reset Sort' : 'Sort By Price';
    }

    if (filteredPets.length === 0) {
      container.innerHTML = `
        <div class="w-full flex flex-col items-center justify-center mt-10">
          <img src="./assets/seo.png" alt="No Data" class="w-20 h-20 mb-4" />
          <h2 class="text-xl font-semibold text-gray-700">No information available</h2>
          <p class="mt-2 text-center text-gray-500 max-w-lg">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
        </div>
      `;
      return;
    }

    filteredPets.forEach((pet) => {
      const card = document.createElement("div");
      card.className = "box border border-slate-300 rounded-lg p-5";

      card.innerHTML = `
        <div class="w-60 h-40 mb-5 rounded-2xl overflow-hidden">
          <img src="${pet.image}" alt="${pet.name}" class="w-full h-full object-cover">
        </div>
        <div>
          <h1 class="font-bold">${pet.name}</h1>
          <div class="flex gap-3 text-slate-500"><i class="fa-solid fa-box w-2 h-5 mt-1"></i><h1>${pet.breed}</h1></div>
          <div class="flex gap-3 text-slate-500"><i class="fa-solid fa-calendar h-5 mt-1"></i><h1>${pet.year}</h1></div>
          <div class="flex gap-3 text-slate-500"><i class="fa-solid fa-mercury h-5 mt-1"></i><h1>${pet.gender}</h1></div>
          <div class="flex gap-3 text-slate-500"><i class="fa-solid fa-dollar-sign h-5 mt-1"></i><h1>Price : $${pet.price}</h1></div>
        </div>
        <div class="border border-s-neutral-600 mt-3"></div>
        <div class="py-4 flex gap-2">
          <div class="like-btn w-10 h-10 flex items-center justify-center border border-slate-300 rounded-lg cursor-pointer">
            <i class="fa-regular fa-thumbs-up"></i>
          </div>
          <div class="w-20 h-10 flex items-center justify-center border border-slate-300 rounded-lg relative">
            <button class="adopt-btn font-bold text-[rgba(14,122,129,1)]">Adopt</button>
            <button class="adopted-btn font-bold text-[rgba(14,122,129,1)] hidden">Adopted</button>
          </div>
          <div class="w-20 h-10 flex items-center justify-center border border-slate-300 rounded-lg">
            <button class="details-btn bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 py-1 rounded text-sm">Details</button>
          </div>
        </div>
      `;

      card.querySelector(".like-btn").addEventListener("click", () => {
        const petImg = document.createElement("img");
        petImg.src = pet.image;
        petImg.alt = pet.name;
        petImg.className = "w-20 h-20 object-cover rounded";
        likedSection.appendChild(petImg);
      });

      card.querySelector(".details-btn").addEventListener("click", () => {
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

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
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
