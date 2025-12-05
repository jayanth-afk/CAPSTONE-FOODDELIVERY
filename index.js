document.addEventListener('DOMContentLoaded', function() {
  const searchBtn = document.querySelector('.search-bar button');
  const searchInput = document.querySelector('.search-bar input');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const address = searchInput.value.trim();
      if (!address) {
        alert('Please enter a delivery address');
        return;
      }
      alert('Searching for restaurants near: ' + address);
    });
  }
  
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.textContent;
      alert('You selected: ' + category);
    });
  });

  const restaurantCards = document.querySelectorAll('.restaurant-card');
  restaurantCards.forEach(card => {
    card.addEventListener('click', function() {
      const name = this.querySelector('h3').textContent;
      alert('Viewing restaurant: ' + name);
    });
  });
});