// Fetch products to populate dropdown
async function fetchProductsForDelete() {
    const res = await fetch('http://localhost:8000/api/products'); // your API endpoint
    const products = await res.json();
    const select = document.getElementById('deleteProductSelect');

    products.forEach(p => {
        const option = document.createElement('option');
        option.value = p._id;
        option.textContent = `${p.name} (${p.category})`;
        select.appendChild(option);
    });
}

// Handle form submit to delete product
document.getElementById('deleteProductForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const id = document.getElementById('deleteProductSelect').value;

    // Confirm before deleting
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE'
    });

    const data = await res.json();
    const msg = document.getElementById('deleteMsg');

    if (res.ok) {
        msg.textContent = 'Product deleted successfully!';
        msg.style.color = 'green';

        // Remove deleted product from dropdown
        const select = document.getElementById('deleteProductSelect');
        select.querySelector(`option[value="${id}"]`).remove();
        select.value = "";
    } else {
        msg.textContent = data.message || 'Error deleting product.';
        msg.style.color = 'red';
    }
});

// Initialize
fetchProductsForDelete();
