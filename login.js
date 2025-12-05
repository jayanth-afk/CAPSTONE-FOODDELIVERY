// login.js - simple login form handler
var loginForm = document.getElementById('loginForm');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var rememberCheckbox = document.getElementById('remember');

if (loginForm) {
  loginForm.onsubmit = function(e) {
    e.preventDefault();
    
    var email = emailInput.value;
    var password = passwordInput.value;
    var isChecked = rememberCheckbox.checked;
    
    if (email === '' || password === '') {
      alert('Please enter email and password');
      return;
    }
    
    if (isChecked) {
      alert('Logged in and remember me enabled for: ' + email);
    } else {
      alert('Logged in for: ' + email);
    }
    
    // In real app, send to server
    // window.location.href = 'index.html';
  };
}