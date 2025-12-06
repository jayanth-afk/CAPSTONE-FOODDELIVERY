document.addEventListener('DOMContentLoaded', function() {
  // dark mode toggle
  var darkModeToggle = document.getElementById('darkModeToggle');
  var isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }
  
  if (darkModeToggle) {
    darkModeToggle.onclick = function() {
      document.body.classList.toggle('dark-mode');
      isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
      darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    };
  }
  
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
      const category = this.textContent.trim().toLowerCase();
      const restaurantRow = document.getElementById('restaurantRow');
      const noRestaurantMsg = document.getElementById('noRestaurantMsg');
      const restaurantCards = document.querySelectorAll('.restaurant-card');
      
      let hasMatching = false;
      
      if (category === 'all') {
        restaurantCards.forEach(restaurantCard => {
          restaurantCard.style.display = 'block';
        });
        restaurantRow.style.display = 'flex';
        noRestaurantMsg.style.display = 'none';
      } else {
        restaurantCards.forEach(restaurantCard => {
          const restaurantCategory = restaurantCard.getAttribute('data-category');
          if (restaurantCategory === category) {
            restaurantCard.style.display = 'block';
            hasMatching = true;
          } else {
            restaurantCard.style.display = 'none';
          }
        });
        
        if (category === 'indian') {
          restaurantRow.style.display = 'none';
          noRestaurantMsg.style.display = 'block';
        } else if (hasMatching) {
          restaurantRow.style.display = 'flex';
          noRestaurantMsg.style.display = 'none';
        }
      }
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