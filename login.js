// Gestion des formulaires
document.getElementById('showRegister').addEventListener('click', () => {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('registerSection').style.display = 'block';
  document.getElementById('registerError').style.display = 'none';
});

document.getElementById('showLogin').addEventListener('click', () => {
  document.getElementById('registerSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('loginError').style.display = 'none';
});

// Simulation de base de données utilisateurs
const users = JSON.parse(localStorage.getItem('escapeGameUsers')) || [];

// Enregistrement d'un nouvel utilisateur
document.getElementById('registerButton').addEventListener('click', () => {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorElement = document.getElementById('registerError');
  
  // Validation
  if (!email || !password || !confirmPassword) {
    errorElement.textContent = 'Tous les champs sont requis !';
    errorElement.style.display = 'block';
    return;
  }
  
  if (password !== confirmPassword) {
    errorElement.textContent = 'Les mots de passe ne correspondent pas !';
    errorElement.style.display = 'block';
    return;
  }
  
  if (password.length < 6) {
    errorElement.textContent = 'Le mot de passe doit contenir au moins 6 caractères !';
    errorElement.style.display = 'block';
    return;
  }
  
  // Vérifier si l'email est déjà utilisé
  if (users.some(user => user.email === email)) {
    errorElement.textContent = 'Cet email est déjà utilisé !';
    errorElement.style.display = 'block';
    return;
  }
  
  // Ajouter le nouvel utilisateur
  users.push({ email, password });
  localStorage.setItem('escapeGameUsers', JSON.stringify(users));
  
  // Connecter automatiquement l'utilisateur
  showWelcomeScreen();
});

// Connexion d'un utilisateur existant
document.getElementById('loginButton').addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errorElement = document.getElementById('loginError');
  
  // Validation
  if (!email || !password) {
    errorElement.textContent = 'Email et mot de passe requis !';
    errorElement.style.display = 'block';
    return;
  }
  
  // Vérifier les identifiants
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    errorElement.textContent = 'Email ou mot de passe incorrect !';
    errorElement.style.display = 'block';
    return;
  }
  
  // Afficher l'écran de bienvenue
  showWelcomeScreen();
});

// Fonction pour afficher l'écran de bienvenue avec l'animation de texte
function showWelcomeScreen() {
  // Masquer les formulaires
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('registerSection').style.display = 'none';
  document.getElementById('welcomeSection').style.display = 'block';
  
  const welcomeText = document.getElementById('welcomeText');
  const message = "Escape Game : Sauras-tu t'échapper ?";
  let i = 0;
  
  // Réinitialiser le texte
  welcomeText.innerHTML = '';
  
  // Animation de frappe
  function typeWriter() {
    if (i < message.length) {
      welcomeText.innerHTML += message.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      document.getElementById('startButton').style.display = 'inline-block';
    }
  }
  
  typeWriter();
}

// Redirection vers la page des thèmes
document.getElementById('startButton').addEventListener('click', () => {
  window.location.href = 'themes.html';
});