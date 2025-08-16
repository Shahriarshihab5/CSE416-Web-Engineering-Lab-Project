let allProducts = []; // store fetched products

// Fetch products from API
async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:8000/api/medicines/get-all-medicines");
    allProducts = await res.json();
    console.log()
    renderProducts(allProducts);  // ✅ render after fetching
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

// Render products to DOM with previous layout
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

// Close modal when clicking the close button
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the modal content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

function renderProducts(products) {
  productList.innerHTML = ""; // Clear previous content

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="mb-2 rounded">
      <h3 class="font-bold">${p.name}</h3>
      <p class="text-green-600 font-semibold">${p.price} Tk</p>
      <button class="buy-btn mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full">Buy</button>
    `;

    // Buy button alert
    const buyBtn = card.querySelector("button");
    buyBtn.addEventListener("click", e => {
      e.stopPropagation();
      alert(`${p.name} added to cart!`);
    });

    // Modal on card click
    card.addEventListener("click", () => {
      modalTitle.textContent = p.name;
      modalImage.src = p.img;
      modalDesc.textContent = p.desc;
      modalPrice.textContent = p.price;
      modal.style.display = "flex";
    });

    productList.appendChild(card);
  });
}



// Sorting
function applySorting() {
  let filtered = [...allProducts];

  // Filter by animal
  if (sortAnimal.value && sortAnimal.value !== "all") {
    filtered = filtered.filter(p => p.animal === sortAnimal.value);
  }

  // Sort by price
  if (sortPrice.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortPrice.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

// Event listeners
sortAnimal.addEventListener("change", applySorting);
sortPrice.addEventListener("change", applySorting);

// Init
fetchProducts();