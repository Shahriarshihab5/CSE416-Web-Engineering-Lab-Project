// ===== petMedicine.js =====
let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const productList = document.getElementById("productList");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const sortAnimal = document.getElementById("sortAnimal");
const sortPrice = document.getElementById("sortPrice");

// Floating cart button
let cartBtn = null;
function createCartButton() {
    if (!cartBtn) {
        cartBtn = document.createElement("button");
        cartBtn.id = "floatingCart";
        cartBtn.style.position = "fixed";
        cartBtn.style.bottom = "20px";
        cartBtn.style.right = "20px";
        cartBtn.style.backgroundColor = "#f39c12";
        cartBtn.style.color = "#fff";
        cartBtn.style.border = "none";
        cartBtn.style.padding = "10px 20px";
        cartBtn.style.borderRadius = "50px";
        cartBtn.style.fontSize = "16px";
        cartBtn.style.cursor = "pointer";
        cartBtn.style.zIndex = "1000";

        cartBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                Swal.fire({
                    icon: "info",
                    title: "Your cart is empty!",
                    toast: true,
                    position: "top-end",
                    timer: 1500,
                    showConfirmButton: false
                });
                return;
            }

            // Build cart HTML
            let cartHTML = `<table style="width:100%; text-align:left; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="padding:5px; border-bottom:1px solid #ddd;">Image</th>
                    <th style="padding:5px; border-bottom:1px solid #ddd;">Name</th>
                    <th style="padding:5px; border-bottom:1px solid #ddd;">Price</th>
                    <th style="padding:5px; border-bottom:1px solid #ddd;">Qty</th>
                    <th style="padding:5px; border-bottom:1px solid #ddd;">Subtotal</th>
                </tr>
            </thead>
            <tbody>`;

            let totalAmount = 0;
            cart.forEach(item => {
                const subtotal = item.price * item.quantity;
                totalAmount += subtotal;
                cartHTML += `
                <tr>
                    <td style="padding:5px;"><img src="${item.image}" width="50"/></td>
                    <td style="padding:5px;">${item.name}</td>
                    <td style="padding:5px;">${item.price.toFixed(2)}</td>
                    <td style="padding:5px;">${item.quantity}</td>
                    <td style="padding:5px;">${subtotal.toFixed(2)}</td>
                </tr>`;
            });

            cartHTML += `</tbody></table>`;
            cartHTML += `<p style="text-align:right; font-weight:bold; margin-top:10px;">Total: ${totalAmount.toFixed(2)}</p>`;

            Swal.fire({
                title: "Your Product List",
                html: cartHTML,
                width: '80%',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Checkout',
                showCancelButton: true,
                cancelButtonText: 'Close'
            }).then(result => {
                if (result.isConfirmed) {
                    window.location.href = 'http://127.0.0.1:5500/pages/addCart.html';
                }
            });
        });

        document.body.appendChild(cartBtn);
    }
    cartBtn.style.display = cart.length > 0 ? "block" : "none";
}

// Update cart count
function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    createCartButton();
    if (cartBtn) cartBtn.textContent = `Cart (${totalCount})`;
}

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Fetch products
async function fetchProducts() {
    try {
        const res = await fetch("http://localhost:8000/api/medicines/get-all-medicines");
        allProducts = await res.json();
        renderProducts(allProducts);
    } catch (err) {
        console.error("Error fetching products:", err);
    }
}

// Render products
function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "card food-card"; // must include food-card for event delegation
        card.dataset.id = p._id || Math.random().toString(36).substr(2, 9);
        card.innerHTML = `
            <img src="${p.img || 'placeholder.jpg'}" alt="${p.name}" class="mb-2 rounded">
            <h3 class="font-bold">${p.name}</h3>
            <p class="text-green-600 font-semibold">${p.price} Tk</p>
            <p class="text-black-100 font-small text-xs">${p.desc || 'No description available.'}</p>
            <button class="buy-btn mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full add-to-cart">Add To Cart</button>
        `;
        productList.appendChild(card);
    });
}

// Event delegation for Add to Cart
document.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn || !btn.classList.contains("add-to-cart")) return;

    const card = btn.closest(".food-card");
    if (!card) return;

    const productId = card.dataset.id;
    const productName = card.querySelector("h3").textContent;
    const productPrice = parseFloat(card.querySelector("p").textContent.replace(/[^0-9.]/g, "")) || 0;
    const productImage = card.querySelector("img").src;

    const existing = cart.find(item => item.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });

    saveCart();

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${productName} added to cart!`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });
});

// Sorting & filtering
function applySorting() {
    let filtered = [...allProducts];
    if (sortAnimal.value && sortAnimal.value !== "all") filtered = filtered.filter(p => p.animal === sortAnimal.value);
    if (sortPrice.value === "low") filtered.sort((a,b)=>a.price-b.price);
    else if (sortPrice.value === "high") filtered.sort((a,b)=>b.price-a.price);
    renderProducts(filtered);
}

sortAnimal.addEventListener("change", applySorting);
sortPrice.addEventListener("change", applySorting);

// Modal
closeModal.addEventListener("click", () => modal.style.display="none");
modal.addEventListener("click", e => { if(e.target===modal) modal.style.display="none"; });

// Init
updateCartCount();
fetchProducts();
