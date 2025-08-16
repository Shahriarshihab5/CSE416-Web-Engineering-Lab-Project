const sortAnimal = document.getElementById('sortAnimal');
const sortPrice = document.getElementById('sortPrice');
const items = Array.from(productList.children);

function updateDisplay() {
  const animal = sortAnimal.value;
  items.forEach(item => {
    item.style.display = animal && item.dataset.animal !== animal ? 'none' : '';
  });
}

sortAnimal.addEventListener('change', () => {
  updateDisplay();
  sortVisibleItems();
});

sortPrice.addEventListener('change', () => {
  sortVisibleItems();
});

function sortVisibleItems() {
  const visibleItems = items.filter(item => item.style.display !== 'none');
  if (sortPrice.value === 'low-high') {
    visibleItems.sort((a, b) => a.dataset.price - b.dataset.price);
  } else if (sortPrice.value === 'high-low') {
    visibleItems.sort((a, b) => b.dataset.price - a.dataset.price);
  }
  visibleItems.forEach(item => productList.appendChild(item));
}
