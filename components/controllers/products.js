document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // remove active class from all tabs & contents
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            // add active class to clicked tab & related content
            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });
});


document.addEventListener("DOMContentLoaded", async () => {
    async function fetchProducts() {
        try {
            const res = await fetch("http://localhost:8000/api/products/get-all-products");
            const data = await res.json();

            const tbody = document.getElementById("productTableBody");
            tbody.innerHTML = "";

            data.forEach((item, index) => {
                const row = `
          <tr class="product-row">
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.animal}</td>
            <td><img src="${item.image}" alt="${item.name}" width="50" /></td>
            <td>
              <div class="action-icons ">
                <i class="fas fa-edit action-icon edit-icon" id="edit-icon" data-id="${item._id}" title="Edit"></i>
                <i class="fas fa-trash action-icon delete-icon" id="delete-icon" title="Delete" data-id="${item._id}"></i>
              </div>
            </td>
          </tr>
        `;
                tbody.innerHTML += row;
            });
        } catch (err) {
            console.error("Error fetching products:", err);
        }




    }



    // Call fetch function when page loads
    fetchProducts();



})


// Edit and Delete Actions Functions

document.addEventListener('DOMContentLoaded', async () => {// Edit icon
    document.getElementById("productTableBody").addEventListener("click", (e) => {
        const editIcon = e.target.closest(".edit-icon");
        const deleteIcon = e.target.closest(".delete-icon");

        if (editIcon) {
            const productId = editIcon.getAttribute("data-id");
            // first confirm if the user wants to edit the product . if yes, redirect to edit page
            Swal.fire({
                title: 'Are you sure?',
                text: "You want to edit this product?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, edit it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to edit page with product ID
                    window.location.href = `/components/controllers/editProduct.html?id=${productId}`;
                }
            });
        }

        if (deleteIcon) {
            const productId = deleteIcon.getAttribute("data-id");

            // show confirmation dialog 
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // delete the product and show swal success message or fail based on response
                    fetch(`http://localhost:8000/api/products/delete-product/${productId}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            Swal.fire(
                                'Deleted!',
                                'Your product has been deleted.',
                                'success'
                            );
                            // Refresh the the page after 3 seconds
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        } else {
                            Swal.fire(
                                'Error!',
                                'There was an error deleting the product.',
                                'error'
                            );
                        }
                    })
                }
            });
        }
    });


})
