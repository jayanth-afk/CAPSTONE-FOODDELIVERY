document.addEventListener('DOMContentLoaded', function() {

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
      

    };
  }
});