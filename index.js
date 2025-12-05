document.addEventListener('DOMContentLoaded', function() {
  // mobile menu toggle
  var menuToggle = document.getElementById('menuToggle');
  var navMenu = document.getElementById('navMenu');
  
  if (menuToggle) {
    menuToggle.onclick = function() {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      } else {
        navMenu.classList.add('active');
      }
    };
  }
  
  // close menu when link is clicked
  var navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(function(link) {
    link.onclick = function() {
      if (navMenu) {
        navMenu.classList.remove('active');
      }
    };
  });

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