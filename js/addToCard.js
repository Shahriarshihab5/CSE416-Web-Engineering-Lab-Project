document.addEventListener('DOMContentLoaded', () => {

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Only create floating cart button if cart is not empty
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
                        showConfirmButton: false,
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
            </tr>
        `;
                });

                cartHTML += `</tbody></table>`;
                cartHTML += `<p style="text-align:right; font-weight:bold; margin-top:10px;">Total: ${totalAmount.toFixed(2)}</p>`;

                // Show SweetAlert modal
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
                        window.location.href = 'http://127.0.0.1:5500/pages/addCart.html'
                    }
                });
            });

            document.body.appendChild(cartBtn);
        }
        cartBtn.style.display = "block";
    }

    function updateCartCount() {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalCount > 0) {
            createCartButton();
            cartBtn.textContent = `Cart (${totalCount})`;
        } else if (cartBtn) {
            cartBtn.style.display = "none";
        }
    }

    updateCartCount(); // initial check

    // Event delegation for Add to Cart buttons
    document.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn || !btn.classList.contains("add-to-cart")) return;

        // Get the parent card
        const card = btn.closest(".food-card");
        if (!card) return;

        const productId = card.dataset.id || Math.random().toString(36).substr(2, 9);
        const productName = card.querySelector("h3").textContent;
        const productPrice = parseFloat(card.querySelector("p").textContent.replace(/[^0-9.]/g, ""));
        const productImage = card.querySelector("img").src;

        // Add/update cart
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        // Toast notification
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

});
