
    const products = [
      { type: "medicine", animal: "dog", name: "Dog Pain Killer", price: 1200, img: "https://m.media-amazon.com/images/I/810wQnz97ML._UF1000,1000_QL80_.jpg", desc: "Pain relief medicine for dogs." },
      { type: "medicine", animal: "dog", name: "Dog Antibiotic", price: 1350, img: "https://m.media-amazon.com/images/I/81FS4qRSENL.jpg", desc: "Broad-spectrum antibiotic used for skin, respiratory, and urinary infections." },
      { type: "medicine", animal: "dog", name: "Carprofen", price: 1395, img: "https://media.scahealth.com/product/carprofen-caplets-_33_08_z_330892.jpg", desc: "Pain reliever for arthritis and post-surgery recovery." },
      { type: "medicine", animal: "cat", name: "Amoxicillin for cat", price: 350, img: "https://www.advacarepharma.com/images/amoxicillin-suspension-for-injection-box-vial.png", desc: "Antibiotic treatment for cats." },
      { type: "medicine", animal: "cat", name: "Revolution Plus cat medicine", price: 399, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDuozZL2HNUM4hGzYGxBuvsHtyBAD70nPqqA&s", desc: "Topical treatment for fleas, ticks, and worms." },
      { type: "medicine", animal: "cat", name: "Cat Antibiotic", price: 410, img: "https://m.media-amazon.com/images/I/71cFKSd1IfL.jpg", desc: "Antibiotic treatment for cats." },
      { type: "medicine", animal: "rabbit", name: "Rabbit Dewormer", price: 500, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS66HLtlSFhG-jqvKcazUpuQ742WU4KdU6T9w&s", desc: "Removes internal worms." },
      { type: "medicine", animal: "bird", name: "Bird Vitamin Drops", price: 250, img: "https://s10cdn.spectrumbrands.com/-/media/project/spectrumcommerce/wildharvest/products/birds/d13123-wh-multidropsbird.jpg?rev=5f7a5498389e4866beaecb061b4e579b", desc: "Essential vitamins for birds." },
      { type: "medicine", animal: "bird", name: "Enrofloxacin for Bird", price: 375, img: "https://www.acmeglobal.com/wp-content/uploads/2022/09/enrovet-100ml.png", desc: "Antibiotic for respiratory and gastrointestinal infections." },
      { type: "medicine", animal: "other", name: "Marboxin", price: 399, img: "https://rangepharma.com/wp-content/uploads/2018/03/Marboxin-10-SS-15.11.16.jpg", desc: "For exotic pets." },
      { type: "surgery", animal: "dog", name: "Dog Scalpel", price: 150, img: "https://m.media-amazon.com/images/I/41kDtycTVZL._UF1000,1000_QL80_.jpg", desc: "Sharp surgical scalpel." },
      { type: "surgery", animal: "cat", name: "Cat Surgical Scissors", price: 200, img: "https://dealsonmedical.com/cdn/shop/products/Cat_Claw_Scissors_12-750.jpg?v=1605933584", desc: "Precision surgical scissors." },
      { type: "surgery", animal: "rabbit", name: "Rabbit Surgical Kit", price: 750, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTUb9hHG3VVG3psqD59yydWpw7TwhqTHjZhg&s", desc: "Complete surgery kit." },
      { type: "surgery", animal: "bird", name: "Bird Surgery Tweezers", price: 170, img: "https://web.gerdentusa.com/up_data/products/images/gd50-5124-bird-beak-dental-forceps-1587380334.jpg", desc: "Fine tweezers for delicate work." },
      { type: "surgery", animal: "other", name: "General Pet Surgery Set", price: 950, img: "https://img.medicalexpo.com/images_me/photo-m2/110100-16666342.jpg", desc: "Surgery tools for exotic pets." },
      { type: "aftercare", animal: "dog", name: "Dog Recovery Collar", price: 180, img: "https://img.drz.lazcdn.com/static/bd/p/d0720e1e2e2185b1a95c3c9f2b598473.jpg_720x720q80.jpg", desc: "Protects wounds after surgery." },
      { type: "aftercare", animal: "cat", name: "Cat Recovery Blanket", price: 199, img: "https://image.made-in-china.com/2f0j00RNjiOKaYyFod/Prevent-Lick-After-Surgery-Professional-Pet-Recovery-Suit-Cat-Clothing-Clothes.webp", desc: "Keeps cats warm post-op." },
      { type: "aftercare", animal: "rabbit", name: "Rabbit Wound Spray", price: 450, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXIRcOpo2G8WOV_osxqwtc8O9Wk9Hwf7Ljfw&s", desc: "Speeds up wound healing." },
      { type: "aftercare", animal: "bird", name: "Bird Bandage Wrap", price: 100, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-LUZfXGjdTONDaUjj9g5-1f1xFWoLL5vNA&s", desc: "Secure bandage wrap." },
      { type: "aftercare", animal: "other", name: "Generic Pet Aftercare Kit", price: 2000, img: "https://homehealth-uk.com/wp-content/uploads/Travel_Pet_First_Aid_2.jpeg", desc: "Suitable for multiple animals." }
    ];

    const productList = document.getElementById("productList");
    const filterCategory = document.getElementById("filterCategory");
    const sortAnimal = document.getElementById("sortAnimal");
    const sortPrice = document.getElementById("sortPrice");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDesc = document.getElementById("modalDesc");
    const modalPrice = document.getElementById("modalPrice");
    const closeModal = document.getElementById("closeModal");

    function renderProducts() {
      let filtered = [...products];
      if (filterCategory.value !== "all") filtered = filtered.filter(p => p.type === filterCategory.value);
      if (sortAnimal.value !== "all") filtered = filtered.filter(p => p.animal === sortAnimal.value);
      if (sortPrice.value === "low") filtered.sort((a, b) => a.price - b.price);
      else if (sortPrice.value === "high") filtered.sort((a, b) => b.price - a.price);

      productList.innerHTML = "";
      if (filtered.length === 0) {
        productList.innerHTML = '<p class="text-center col-span-4 py-10">No products found. Try different filters.</p>';
        return;
      }

      filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${p.img}" alt="${p.name}" class="mb-2 rounded">
          <h3 class="font-bold">${p.name}</h3>
          <p class="text-green-600 font-semibold">${p.price} Tk</p>
          <button class="buy-btn mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full">Buy</button>
        `;

        const buyBtn = card.querySelector("button");
        buyBtn.addEventListener("click", e => {
          e.stopPropagation();
          alert(`${p.name} added to cart!`);
        });

        card.addEventListener("click", () => {
          modalTitle.textContent = p.name;
          modalImage.src = p.img;
          modalDesc.textContent = p.desc;
          modalPrice.textContent = p.price;
          modal.style.display = "flex"; // show modal on click only
        });

        productList.appendChild(card);
      });
    }

    [filterCategory, sortAnimal, sortPrice].forEach(select => select.addEventListener("change", renderProducts));

    closeModal.addEventListener("click", () => modal.style.display = "none");

    modal.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });

    renderProducts();
  
