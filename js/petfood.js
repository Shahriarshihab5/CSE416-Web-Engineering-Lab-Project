// const foodList = document.getElementById("foodList");
// const sortAnimal = document.getElementById("sortAnimal");
// const sortPrice = document.getElementById("sortPrice");

let allProducts = []; // store fetched products

// Fetch products from API
async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:8000/api/products/get-all-products");
    allProducts = await res.json();
    renderProducts(allProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

// Render products to DOM
function renderProducts(products) {
  foodList.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "food-card border rounded p-4";
    div.dataset.id = p._id; // store product ID
    div.innerHTML = `
                <img src="${p.image}" alt="${p.name}" class="w-full h-40 object-contain">
                <h3 class="text-lg font-bold mt-2">${p.name}</h3>
                <p>Price: ${p.price} TK</p>
                <button class="buy-btn mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full">Add To Cart</button>
            `;
    foodList.appendChild(div);
  });
}

// Apply sorting
function applySorting() {
  let filtered = [...allProducts];

  // Filter by animal
  if (sortAnimal.value) {
    filtered = filtered.filter(p => p.animal === sortAnimal.value);
  }

  // Sort by price
  if (sortPrice.value === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortPrice.value === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

// Event listeners
sortAnimal.addEventListener("change", applySorting);
sortPrice.addEventListener("change", applySorting);

// Init
fetchProducts();