//  Gestion des éléments HTML
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const welcomeSection = document.getElementById('welcomeSection');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const loginButton = document.getElementById('loginButton');

const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const confirmPassword = document.getElementById('confirmPassword');
const registerError = document.getElementById('registerError');
const registerButton = document.getElementById('registerButton');

const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const welcomeText = document.getElementById('welcomeText');
const startButton = document.getElementById('startButton');

//  Validation
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

function showError(element, message) {
  element.textContent = message;
  element.style.display = 'block';
  setTimeout(() => {
    element.style.display = 'none';
  }, 3000);
}

//  Simulation de base de données utilisateurs
let users = JSON.parse(localStorage.getItem('escapeGameUsers')) || [];

//  Connexion
loginButton.addEventListener('click', () => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  if (!email || !password) {
    showError(loginError, 'Email et mot de passe requis !');
    return;
  }

  if (!isValidEmail(email)) {
    showError(loginError, 'Format d’email invalide.');
    return;
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showError(loginError, 'Email ou mot de passe incorrect !');
    return;
  }

  // Succès : afficher message de bienvenue
  showWelcomeScreen(email);
});

//  Inscription
registerButton.addEventListener('click', () => {
  const email = registerEmail.value.trim();
  const password = registerPassword.value.trim();
  const confirm = confirmPassword.value.trim();

  if (!email || !password || !confirm) {
    showError(registerError, 'Tous les champs sont obligatoires.');
    return;
  }

  if (!isValidEmail(email)) {
    showError(registerError, 'Format d’email invalide.');
    return;
  }

  if (!isStrongPassword(password)) {
    showError(registerError, 'Mot de passe trop faible (min 8 caractères, 1 maj, 1 min, 1 chiffre).');
    return;
  }

  if (password !== confirm) {
    showError(registerError, 'Les mots de passe ne correspondent pas.');
    return;
  }

  if (users.some(user => user.email === email)) {
    showError(registerError, 'Cet email est déjà utilisé !');
    return;
  }

  users.push({ email, password });
  localStorage.setItem('escapeGameUsers', JSON.stringify(users));

  // Succès : afficher message de bienvenue
  showWelcomeScreen(email);
});

//  Écran de bienvenue avec animation
function showWelcomeScreen(email) {
  loginSection.style.display = 'none';
  registerSection.style.display = 'none';
  welcomeSection.style.display = 'block';

  const username = email.split('@')[0];
  const message = `Bienvenue ${username} ! Escape Game : Sauras-tu t'échapper ?`;
  welcomeText.innerHTML = '';
  let i = 0;

  function typeWriter() {
    if (i < message.length) {
      welcomeText.innerHTML += message.charAt(i);
      i++;
      setTimeout(typeWriter, 70);
    } else {
      startButton.style.display = 'inline-block';
    }
  }

  typeWriter();
}

//  Redirection vers la page des thèmes
startButton.addEventListener('click', () => {
  window.location.href = 'themes.html';
});

//  Navigation entre les formulaires
showRegister.addEventListener('click', () => {
  loginSection.style.display = 'none';
  registerSection.style.display = 'block';
  registerError.style.display = 'none';
});

showLogin.addEventListener('click', () => {
  registerSection.style.display = 'none';
  loginSection.style.display = 'block';
  loginError.style.display = 'none';
});
