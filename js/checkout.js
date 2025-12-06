
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

var cartItems = document.getElementById('cartItems');
var subEl = document.getElementById('sub');
var deliveryEl = document.getElementById('delivery');
var discEl = document.getElementById('disc');
var totalEl = document.getElementById('total');
var couponInput = document.getElementById('coupon');
var applyBtn = document.getElementById('apply');
var clearBtn = document.getElementById('clear');
var placeBtn = document.getElementById('place');

var deliveryFee = 30.00;
var discount = 0;

// menu items data
var menuItems = [
  // pizzas
  { id: 1, name: 'Margherita', desc: 'Tomato, Mozzarella', price: 89, category: 'pizza', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?fm=jpg&q=60&w=300' },
  { id: 2, name: 'Pepperoni', desc: 'Cheese, Pepperoni', price: 99, category: 'pizza', img: 'https://www.allrecipes.com/thmb/VlxoJt8KV9sTgRn91bCyNS-2MsU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/What-is-Pepperoni-4x3-b45a1d46776a49d7bc24618aa1bd3f69.jpg' },
  { id: 3, name: 'Veggie Supreme', desc: 'Mixed Vegetables', price: 79, category: 'pizza', img: 'https://www.thursdaynightpizza.com/wp-content/uploads/2022/06/veggie-pizza-side-view-out-of-oven-720x480.png' },
  // burgers
  { id: 4, name: 'Classic Burger', desc: 'Chicken, Lettuce, Tomato', price: 65, category: 'burger', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?fm=jpg&q=60&w=300' },
  { id: 5, name: 'Double Cheese Burger', desc: 'Double Chicken, Cheddar', price: 85, category: 'burger', img: 'https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipemediafiles/recipe%20images%20and%20files/retail/desktop%20(600x600)/2023.nov/2023_retail_double-stack-cheeseburger_600x600.jpg?ext=.jpg' },
  { id: 6, name: 'Spicy Burger', desc: 'Chicken, Jalapeño, Mayo', price: 75, category: 'burger', img: 'https://www.gardengourmet.com/sites/default/files/recipes/aeead5804e79ff6fb98b2039619c5230_200828_MEDIAMONKS_GG_Spicytarian.jpg' },
  // sushi
  { id: 7, name: 'California Roll', desc: '8 pieces', price: 120, category: 'sushi', img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?fm=jpg&q=60&w=300' },
  { id: 8, name: 'Spicy Tuna Roll', desc: '8 pieces', price: 140, category: 'sushi', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?fm=jpg&q=60&w=300' },
  { id: 9, name: 'Salmon Sashimi', desc: '6 pieces', price: 150, category: 'sushi', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?fm=jpg&q=60&w=300' }
];

// cart storage
var cart = [];

// render menu on page load
function initMenu() {
  var pizzaMenu = document.getElementById('pizzaMenu');
  var burgerMenu = document.getElementById('burgerMenu');
  var sushiMenu = document.getElementById('sushiMenu');
  
  var pizzas = filterByCategory('pizza');
  var burgers = filterByCategory('burger');
  var sushis = filterByCategory('sushi');
  
  renderMenuItems(pizzaMenu, pizzas);
  renderMenuItems(burgerMenu, burgers);
  renderMenuItems(sushiMenu, sushis);
}

function filterByCategory(category) {
  var result = [];
  for (var i = 0; i < menuItems.length; i++) {
    if (menuItems[i].category === category) {
      result.push(menuItems[i]);
    }
  }
  return result;
}

function renderMenuItems(container, items) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var card = document.createElement('div');
    card.className = 'food-card';
    
    card.innerHTML = '<img src="' + item.img + '" alt="' + item.name + '">' +
      '<div class="food-info">' +
      '<p class="food-name">' + item.name + '</p>' +
      '<p class="food-desc">' + item.desc + '</p>' +
      '<div class="food-footer">' +
      '<span class="food-price">₹' + item.price + '</span>' +
      '<button class="food-add-btn" onclick="addItemToCart(' + item.id + ')">Add</button>' +
      '</div>' +
      '</div>';
    
    container.appendChild(card);
  }
}

function findMenuItemById(id) {
  for (var i = 0; i < menuItems.length; i++) {
    if (menuItems[i].id === id) {
      return menuItems[i];
    }
  }
  return null;
}

function findCartItem(id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      return cart[i];
    }
  }
  return null;
}

function addItemToCart(itemId) {
  var item = findMenuItemById(itemId);
  if (!item) return;
  
  var cartItem = findCartItem(itemId);
  if (cartItem) {
    cartItem.qty = cartItem.qty + 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      desc: item.desc,
      price: item.price,
      img: item.img,
      qty: 1
    });
  }
  
  renderCart();
  updateTotals();
}

function renderCart() {
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="small" style="padding:18px 0;text-align:center;color:#999">No items in cart. Add some food from the menu above.</div>';
    return;
  }
  
  for (var i = 0; i < cart.length; i++) {
    var cartItem = cart[i];
    var id = cartItem.id;
    var div = document.createElement('div');
    div.className = 'item';
    div.setAttribute('data-id', id);
    
    var itemTotal = cartItem.price * cartItem.qty;
    
    // create buttons with proper closure
    div.innerHTML = '<img src="' + cartItem.img + '" alt="' + cartItem.name + '">' +
      '<div class="info">' +
      '<p class="title">' + cartItem.name + '</p>' +
      '<p class="meta">' + cartItem.desc + '</p>' +
      '<p class="meta" style="margin-top:6px;">₹' + cartItem.price + ' × ' + cartItem.qty + ' = ₹' + itemTotal + '.00</p>' +
      '</div>' +
      '<div class="controls">' +
      '<button class="dec">-</button>' +
      '<input class="qty" type="number" min="1" value="' + cartItem.qty + '" />' +
      '<button class="inc">+</button>' +
      '<button class="remove">Remove</button>' +
      '</div>';
    
    // attach event listeners properly
    var decBtn = div.querySelector('.dec');
    var incBtn = div.querySelector('.inc');
    var qtyInput = div.querySelector('.qty');
    var removeBtn = div.querySelector('.remove');
    
    decBtn.onclick = (function(itemId) {
      return function() { decreaseQty(itemId); };
    })(id);
    
    incBtn.onclick = (function(itemId) {
      return function() { increaseQty(itemId); };
    })(id);
    
    qtyInput.onchange = (function(itemId) {
      return function() { changeQtyDirect(itemId, this.value); };
    })(id);
    
    removeBtn.onclick = (function(itemId) {
      return function() { removeFromCart(itemId); };
    })(id);
    
    cartItems.appendChild(div);
  }
}

function increaseQty(id) {
  var cartItem = findCartItem(id);
  if (cartItem) {
    cartItem.qty = cartItem.qty + 1;
    renderCart();
    updateTotals();
  }
}

function decreaseQty(id) {
  var cartItem = findCartItem(id);
  if (cartItem) {
    if (cartItem.qty > 1) {
      cartItem.qty = cartItem.qty - 1;
      renderCart();
      updateTotals();
    }
  }
}

function changeQtyDirect(id, value) {
  var v = parseInt(value);
  if (v < 1) v = 1;
  
  var cartItem = findCartItem(id);
  if (cartItem) {
    cartItem.qty = v;
    renderCart();
    updateTotals();
  }
}

function removeFromCart(id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart.splice(i, 1);
      break;
    }
  }
  renderCart();
  updateTotals();
}

function updateTotals() {
  var subtotal = 0;
  
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    subtotal = subtotal + (item.price * item.qty);
  }
  
  subtotal = Math.round(subtotal * 100) / 100;
  var total = Math.round((subtotal + deliveryFee - discount) * 100) / 100;
  
  subEl.textContent = subtotal.toFixed(2);
  deliveryEl.textContent = deliveryFee.toFixed(2);
  discEl.textContent = discount.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

// apply coupon
applyBtn.onclick = function() {
  var code = couponInput.value;
  if (code === '') {
    alert('Enter a coupon code.');
    return;
  }
};

// clear cart
clearBtn.onclick = function() {
  var confirmed = confirm('Clear cart?');
  if (confirmed) {
    cart = [];
    discount = 0;
    renderCart();
    updateTotals();
  }
};

// place order
placeBtn.onclick = function() {
  if (cart.length === 0) {
    alert('Cart is empty');
    return;
  }
  alert('Order placed! Total: ₹' + totalEl.textContent);
  cart = [];
  discount = 0;
  renderCart();
  updateTotals();
};

// init on load
window.onload = function() {
  initMenu();
  updateTotals();
};