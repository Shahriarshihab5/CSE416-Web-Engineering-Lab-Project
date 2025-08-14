
    const doctors = [
      {
        name: "Teodora Abegaz",
        education: "DVM, MS - Anesthesia & Analgesia",
        email: "tedora85@gmail.com",
        contact: "+8801761896783",
        specialties: ["Anesthesia", "Pain Management"],
        location: "Dhaka",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
      },
      {
        name: "Taylor Abraham",
        education: "DVM, MPVM - General Practice",
        email: "taylor69@gmail.com",
        contact: "+8801529985417",
        specialties: ["General Practice"],
        location: "Mymensingh",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
      },
      {
        name: "Betzaida Hernández",
        education: "DVM - Surgery",
        email: "betzy27@gmail.com",
        contact: "+8801629546143",
        specialties: ["Surgery"],
        location: "Mymensingh",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
      },
      {
        name: "Max Banwell",
        education: "DVM,MS - Surgery",
        email: "Banwell56@gmail.com",
        contact: "+8801835129874",
        specialties: ["Surgery"],
        location: "Bogura",
        image: "https://cdn.medvet.com/app/uploads/2023/03/HBA_Max-Banwell_Headshot_Web_600x600_210601-300x300.jpg?strip=all&lossy=1&ssl=1"
      },
      {
        name: "Jared Ashworth",
        education: "DVM - Emergency Medicine",
        email: "jaredash12@gmail.com",
        contact: "+8801716597899",
        specialties: ["Emergency Medicine"],
        location: "Dhaka",
        image: "https://cdn.medvet.com/app/uploads/2024/07/COL_Jared-Ashworth_Headshot_Web_600x600_240618-300x300.jpg?strip=all&lossy=1&ssl=1"
      },
      {
        name: "Deepmala Agarwal",
        education: "BVSc, MVSc, MSc, PhD, DACVIM - Cardiology",
        email: "deepmala@gmail.com",
        contact: "+8801994782569",
        specialties: ["Cardiology"],
        location: "Bogura",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
      }
    ];

    const doctorsList = document.getElementById("doctorsList");
    const specialtyFilter = document.getElementById("specialtyFilter");
    const locationFilter = document.getElementById("locationFilter");
    const modal = document.getElementById("doctorModal");
    const modalContent = document.getElementById("modalContent");
    const closeModal = document.querySelector(".close-modal");

    function renderDoctors() {
      const specialtyValue = specialtyFilter.value;
      const locationValue = locationFilter.value;

      doctorsList.innerHTML = "";

      const filteredDoctors = doctors.filter(doctor => {
        const specialtyMatch = specialtyValue === "all" || doctor.specialties.some(spec => spec.toLowerCase().includes(specialtyValue.toLowerCase()));
        const locationMatch = locationValue === "all" || doctor.location.toLowerCase() === locationValue.toLowerCase();
        return specialtyMatch && locationMatch;
      });

      if (filteredDoctors.length === 0) {
        doctorsList.innerHTML = '<p class="col-span-3 text-center py-10">No specialists found matching your criteria.</p>';
        return;
      }

      filteredDoctors.forEach(doctor => {
        const card = document.createElement("div");
        card.className = "doctor-card";
        card.innerHTML = `
          <div class="flex items-start mb-4">
            <img src="${doctor.image}" alt="${doctor.name}" class="w-16 h-16 rounded-full object-cover mr-4">
            <div>
              <h3 class="font-bold text-lg">${doctor.name}</h3>
              <p class="text-gray-600 text-sm">${doctor.education}</p>
            </div>
          </div>
          <div class="mb-4">
            ${doctor.specialties.map(spec => `<span class="specialty-badge">${spec}</span>`).join("")}
          </div>
          <p class="text-gray-700 mb-1"><i class="fas fa-envelope mr-2"></i>${doctor.email}</p>
          <p class="text-gray-700 mb-1"><i class="fas fa-phone mr-2"></i>${doctor.contact}</p>
          <p class="text-gray-700"><i class="fas fa-map-marker-alt mr-2"></i>${doctor.location.charAt(0).toUpperCase() + doctor.location.slice(1)}</p>
        `;
        doctorsList.appendChild(card);

        // Click to show modal
        card.addEventListener("click", () => {
          modalContent.innerHTML = `
            <div class="flex flex-col items-center gap-4">
              <img src="${doctor.image}" alt="${doctor.name}" class="w-32 h-32 rounded-full object-cover">
              <h2 class="text-2xl font-bold">${doctor.name}</h2>
              <p class="text-gray-600 text-center">${doctor.education}</p>
              <div class="flex flex-wrap justify-center mt-2">
                ${doctor.specialties.map(spec => `<span class="specialty-badge">${spec}</span>`).join("")}
              </div>
              <p class="text-gray-700 mt-2"><i class="fas fa-envelope mr-2"></i>${doctor.email}</p>
              <p class="text-gray-700"><i class="fas fa-phone mr-2"></i>${doctor.contact}</p>
              <p class="text-gray-700"><i class="fas fa-map-marker-alt mr-2"></i>${doctor.location.charAt(0).toUpperCase() + doctor.location.slice(1)}</p>
            </div>
          `;
          modal.style.display = "flex";
        });
      });
    }

    // Close modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });

    // Filters change
    specialtyFilter.addEventListener("change", renderDoctors);
    locationFilter.addEventListener("change", renderDoctors);

    // Initial render
    renderDoctors();
  