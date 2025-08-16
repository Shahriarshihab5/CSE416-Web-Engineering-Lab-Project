// DOM Elements
const addProductForm = document.getElementById("addProductForm");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productImage = document.getElementById("productImage");
const msg = document.getElementById("msg");

// Form submit
addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = productName.value.trim();
  const price = parseFloat(productPrice.value);
  const category = productCategory.value;
  const image = productImage.value.trim();

  if (!name || isNaN(price)) {
    msg.style.color = "red";
    msg.textContent = "Please enter valid name and price.";
    return;
  }

  const productData = { name, price, category, image };

  try {
    const res = await fetch("http://localhost:5000/api/add-products/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    });

    const data = await res.json();
    msg.style.color = "green";
    msg.textContent = `Product "${data.name}" added successfully!`;

    addProductForm.reset(); // Clear form

  } catch (err) {
    console.error(err);
    msg.style.color = "red";
    msg.textContent = "Error adding product. Try again.";
  }
});
