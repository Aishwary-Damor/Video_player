document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm'); 
  const logout = document.getElementById('login');
  const welcomeMessage = document.getElementById('welcome');
  const error = document.getElementById('error');

  if (loginForm!=null) {
      loginForm.addEventListener('submit', function(event) {
          event.preventDefault();
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;

          // Mock login logic
          if ((username === 'Ramesh' && password === 'password1')||(username === 'Suresh' && password === 'password')||(username === 'Mahesh' && password === 'password2')) {
              sessionStorage.setItem('username', username);
              window.location.href = 'index.html';
          } 
          else 
          {
              error.textContent = 'Invalid username or password';
          }
      });
  }
  if (logout!=null) {
    const username = sessionStorage.getItem('username');
    if (username) {
      welcomeMessage.textContent = `Welcome, ${username}!`;
      logout.textContent = 'Log Out';
    } 
    
    logout.addEventListener('click', function() {
         console.log(logout.textContent)
        
        if(logout.textContent==="Log In")  
        {
          window.location.href = 'login.html';
        }
        else
        {
          sessionStorage.removeItem('username');
          logout.textContent = "Log In"
          window.location.href = 'index.html';
        }
      });
  }
});