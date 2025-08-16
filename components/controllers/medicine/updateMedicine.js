// DOM Elements
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveBtn = document.getElementById("saveBtn");
const itemName = document.getElementById("itemName");
const itemPrice = document.getElementById("itemPrice");
const modalTitle = document.getElementById("modal-title");

const foodContainer = document.getElementById("food-container");
const medicineContainer = document.getElementById("medicine-container");

let currentCategory = null; // 'food' or 'medicine'
let editId = null;

// Open modal for edit
function openEditModal(category, item) {
  currentCategory = category;
  editId = item._id;
  modalTitle.textContent = `Edit ${category}`;
  itemName.value = item.name;
  itemPrice.value = item.price;
  modal.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));

// Fetch items and render
async function fetchItems(category) {
  const res = await fetch(`http://localhost:8000/api/${category}/all-${category}`);
  const data = await res.json();
  renderItems(category, data);
}

function renderItems(category, items) {
  const container = category === 'food' ? foodContainer : medicineContainer;
  container.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${item.name}</h4>
      <p>Price: $${item.price}</p>
      <button class="editBtn">Edit</button>
    `;

    // Edit
    card.querySelector(".editBtn").addEventListener("click", () => openEditModal(category, item));

    container.appendChild(card);
  });
}

// Save update
saveBtn.addEventListener("click", async () => {
  const name = itemName.value.trim();
  const price = parseFloat(itemPrice.value);

  if (!name || isNaN(price)) {
    alert("Please enter valid values.");
    return;
  }

  if (!editId) return;

  await fetch(`http://localhost:8000/api/${currentCategory}/${editId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  });

  modal.classList.add("hidden");
  fetchItems(currentCategory);
});

// Initial fetch
fetchItems('food');
fetchItems('medicine');
