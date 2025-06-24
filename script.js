// script.js - Fichier de script pour les pages de jeu

(function() {
  const questionElement = document.getElementById('questionText');
  const answerInput     = document.getElementById('reponse');
  const validateBtn     = document.getElementById('validerBtn');
  const hintBtn         = document.getElementById('indiceBtn');
  const timerElement    = document.getElementById('chronoText');
  const hintElement     = document.getElementById('indiceText');
  const explanationBox  = document.getElementById('explanationText');
  const scoreElement    = document.getElementById('scoreDisplay');

  // -------------- Définitions des énigmes par thème --------------
  const themeEnigmes = {
    'enquete-policiere': [
      {
        question: "Quatre amis se réfugient dans un manoir à cause de la pluie. Julien va dans la salle de bain, Mathieu dans la chambre pour jouer aux échecs, Élodie dans la cuisine et Sami dans le bureau. Un orage éclate, les lumières s’éteignent. Quand elles se rallument, Élodie est retrouvée morte dans le grand salon. Qui l’a tuée ?",
        answer: "Mathieu",
        hints: [ "Il a dit aller jouer aux échecs.", "Il n’y avait pas d’échiquier dans la chambre.", "Un échiquier se trouve dans le salon." ],
        explanation: "Mathieu a menti. Il était dans le salon, là où se trouvait l’échiquier. Il a profité du noir pour tuer Élodie."
      },
      {
        question: "Dans un refuge de montagne, Alice va fumer dehors, Bastien reste dans la cuisine, Inès fait la vaisselle, Lucas va chercher du bois. Alice revient et trouve Bastien mort, avec le mot 'I' écrit en ketchup. Qui est le coupable ?",
        answer: "Inès",
        hints: [ "Elle était dans la même pièce que Bastien.", "Le message 'I' correspond à l’initiale de son prénom.", "Personne d’autre ne pouvait le faire sans être vu." ], 
        explanation: "Bastien a laissé un indice en mourant : la première lettre du prénom de son meurtrier. Inès était la seule près de lui."
      },
      {
        question: "Un gardien de musée a été assassiné. La seule trace est un morceau de fromage à côté de son corps. Qui est le coupable ?",
        answer: "une souris",
        hints: ["C'est un petit animal", "Il aime le fromage", "C'est le personnage d'un dessin animé"], 
        explanation: "Le fromage est un indice évident. La 'souris' est une métaphore humoristique pour désigner le coupable. C’est une devinette décalée."
      },
      {
        question: "Dans un musée, Sonia regarde les statues, Kevin observe les tableaux au 1er étage, Emma explore la salle des trésurs, Yassine est aux toilettes. Emma est retrouvée morte, une vitrine brisée avec une empreinte en hauteur. Qui est le coupable ?", 
        answer: "Kevin", 
        hints: [ "La vitre est haute.", "Une seule empreinte a été retrouvée.", "Il était à l’étage." ], 
        explanation: "Il est le seul à pouvoir atteindre cette hauteur facilement. Il est redescendu discrètement pour commettre le crime."
      },
      {
         question: "Dans un chalet, Camille prépare le repas, Victor dresse la table, Anna va chercher du vin, Léo allume la cheminée. Pendant le dîner, Anna boit une gorgée et s’écroule, morte empoisonnée. Qui est le coupable ?", 
         answer: "Camille", 
         hints: [ "Elle s’occupait de toute la nourriture.", "Elle avait accès aux verres.", "Anna a bu en première." ], 
         explanation: "Camille a eu l’occasion de verser du poison discrètement en servant. Elle est la seule à avoir eu un contact direct avec tous les éléments."
      }
    ],

    'mythologie-ancienne': [
      {
        question: "Quel dieu égyptien à tête de chacal est associé à la momification et aux funérailles ?",
        answer:   "anubis",
        hints:    [ "Il a une tête noire de chien ou de chacal","Il guide les morts dans l'au-delà","Son nom commence par un A"]
      },
      {
        question: "Quel héros grec a accompli 12 travaux, dont tuer l’hydre de Lerne ?",
        answer: "hercule",
        hints:    ["Il est doté d'une force surhumaine","Il est le fils de Zeus","Il est célèbre pour ses épreuves"]
      },
      {
        question: "Quelle créature au regard pétrifiant a des serpents à la place des cheveux ?",
        answer:   "méduse",
        hints:    [ "Elle fait partie des Gorgones","Un seul regard d'elle transforme en pierre","Elle a été vaincue par Persée"]
      },
      {
        question: "Quel roi grec a un labyrinthe et un Minotaure dans son mythe ?",
        answer:   "minos",
        hints:    ["Il est roi de Crète","Il a enfermé le Minotaure","Son palais est le plus grand de son époque"]
      },
      {
        question: "Quel dieu nordique manie un marteau et contrôle la foudre ?",
        answer:   "thor",
        hints:    ["Il est le fils d’Odin","Son arme est Mjölnir","Il est souvent représenté avec une barbe rousse"]
      }
    ],

    'univers-fantasy': [
      {
        question: "Quelle créature mythique crache du feu et a des écailles ?",
        answer:   "dragon",
        hints:    ["Il peut voler avec ses ailes", "On le trouve dans les contes de fées", "Les chevaliers les combattent"]
      },
      {
        question: "Qui est le sorcier le plus célèbre avec une cicatrice en forme d'éclair ?",
        answer:   "harry potter",
        hints:    ["Il va à Poudlard", "Il a des amis nommés Ron et Hermione", "Il combat Voldemort"]
      },
      {
        question: "Quelle créature a un seul œil au milieu du front ?",
        answer:   "cyclope",
        hints:    ["On le trouve dans la mythologie grecque", "Il est très grand et fort", "Ulysse l'a rencontré"]
      },
      {
        question: "Quel objet magique exauce les souhaits quand on le frotte ?",
        answer:   "lampe magique",
        hints:    ["Elle contient un génie", "Aladdin en possède une", "On la trouve dans une caverne"]
      },
      {
        question: "Quel animal fantastique a un corps de lion et une tête d'aigle ?",
        answer:   "un griffon",
        hints:    ["Il peut voler", "Il garde des trésors", "Son nom commence par 'G'"]
      }
    ],

    'monde-oceanique': [
      {
        question: "Quel animal marin a huit bras et un bec ?",
        answer:   "une pieuvre",
        hints:    ["Il peut changer de couleur", "Il se cache dans les rochers", "On l'appelle aussi poulpe"]
      },
      {
        question: "Quel phénomène attire et repousse l’eau des plages à cause de la lune ?",
        answer: "la marée",
        hints: ["Il se produit deux fois par jour","Il dépend de l’attraction lunaire","On dit qu’elle est haute ou basse"]

      },
      {
        question: "Quel être légendaire mi-femme, mi-poisson vit sous la mer et chante ?",
        answer: "une sirène",
        hints: ["Elle attire les marins avec sa voix","Elle a une queue de poisson","Elle apparaît dans les mythes et les contes"]

      },
      {
        question: "Quel coquillage précieux se forme à l'intérieur des huîtres ?",
        answer: "une perle",
        hints: ["Elle est ronde et brillante","Très utilisée en bijouterie","Produite par un mollusque"]

      },
      {
        question: "Quel animal marin est connu pour son intelligence et sa capacité à sauter hors de l’eau ?",
        answer: "un dauphin",
        hints: ["Il vit en groupe et aime jouer","Il communique avec des sons","C’est un mammifère marin très social"]
      }
    ],

    'informatique': [
      {
        question: "Quel est le langage informatique principalement utilisé pour créer des pages web ?",
        answer: "html",
        hints: ["Il structure le contenu d’un site web", "Son nom commence par un H", "Il s'associe souvent à CSS et JavaScript"]
      },
      {
        question: "Je suis une boîte dans laquelle tu peux stocker n’importe quelle valeur. Je peux changer pendant l’exécution ?",
        answer: "une variable",
        hints: ["Je suis représentée par && en programmation", "Je ne suis vraie que si les deux conditions le sont", "Je suis souvent opposée à OU"]
      },
      {
        question: "Un développeur veut que sa fonction affiche 'Bonjour', mais elle affiche toujours 'Hello World'. Voici son code :\n\n#include <stdio.h>\n\nvoid direBonjour() {\n    printf(\"Hello World\");\n}\n\nint main() {\n    direBonjour();\n    return 0;\n}\n\nPourquoi le programme affiche-t-il 'Hello World' au lieu de 'Bonjour' ?",
        answer: "le texte est dans printf",
        hints: ["Le nom de la fonction n’a pas d’effet sur ce qu’elle affiche.","C’est le contenu de printf() qui compte.","Le texte affiché est 'Hello World' car c’est ce qui est écrit dans printf()."]
      },
      {
        question: "Quel est le nom du langage de programmation dont la mascotte est un café ?",
        answer: "java",
        hints: ["Son logo est une tasse", "Très utilisé pour les applications Android", "Ce n’est pas JavaScript"]
      },
      {
        question: "Quel protocole est utilisé pour accéder à un site web sécurisé ?",
        answer: "https",
        hints: ["Il contient un 's' pour 'secure'", "On le voit dans la barre d'adresse", "Il remplace HTTP pour la sécurité"]
      }
    ],

    'psychologie-illusions': [
      {
        question: "Tu te réveilles dans une pièce sans fenêtre, sans porte.Tu entends une voix qui dit :'La seule sortie est celle que tu imagines'. Que dois-tu faire pour sortir ?",
        answer:   "se réveille",
        hints:    ["Tu es peut-être encore dans un rêve", "Et si ce n'était pas réel ?", "Ce n’est pas une sortie physique"]
      },
      {
        question: "Quel mécanisme de défense pousse à rejeter sur l’autre ses propres sentiments ?",
        answer: "la projection",
        hints: ["On accuse l'autre de ce qu'on ressent en soi","Très présent en psychanalyse","Freud en parle dans ses théories"]
      },
      {
        question: "Quel sens est le plus fortement lié à la mémoire ?",
        answer:   "l'odorat",
        hints:    ["Une odeur peut rappeler un souvenir", "C'est le sens qui déclenche le plus d'émotions", "Il est directement relié au cerveau"]
      },
      {
        question: "Quel mot décrit une peur excessive et irrationnelle ?",
        answer: "une phobie",
        hints: ["Elle peut concerner les araignées, l’eau, les foules…","C’est un trouble anxieux","Ce mot est souvent précédé d’un préfixe (ex: arachno-, acro-)"]
      },
      {
        question: "Combien de pattes a cet éléphant ? (dans une illusion célèbre)",
        answer:   "quatre",
        hints:    ["L'image est trompeuse", "Tous les éléphants ont 4 pattes", "L'illusion est dans le dessin des jambes"]
      }
    ]
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const theme = document.body.dataset.theme;
  let enigmes = themeEnigmes[theme] ? [...themeEnigmes[theme]] : [];
  enigmes = shuffleArray(enigmes);

  let currentEnigma = 0,
      score         = 0,
      timeLeft      =  theme === 'enquete-policiere' ? 60 : 45,
      timer,
      hintsUsed     = 0;

  function loadEnigma() {
    const enigma = enigmes[currentEnigma];
    questionElement.textContent = enigma.question;
    answerInput.value           = "";
    hintElement.textContent     = "";
    if (explanationBox) 
    explanationBox.textContent = ""
    hintsUsed                   = 0;
    timeLeft                    = theme === 'enquete-policiere' ? 60 : 45;
    timerElement.textContent    = `⏳ Temps restant : ${timeLeft}s`;
    timerElement.style.color    = "#4CAF50";
    timerElement.style.animation = "none";
    startTimer();
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `⏳ Temps restant : ${timeLeft}s`;
      if (timeLeft < 15) {
        timerElement.style.color = "#FF9800";
      }
      if (timeLeft < 10) {
        timerElement.style.color = "#f44336";
        timerElement.style.animation = "pulse 0.8s infinite";
      }
      if (timeLeft <= 0) {
        clearInterval(timer);
        timerElement.textContent = "⏰ Temps écoulé !";
        setTimeout(() => nextEnigma(false), 1500);
      }
    }, 1000);
  }

  function showHint() {
    const hints = enigmes[currentEnigma].hints;
    if (hintsUsed < hints.length) {
      hintElement.textContent = `💡 Indice ${hintsUsed + 1}: ${hints[hintsUsed]}`;
      hintsUsed++;
    } else {
      hintElement.textContent = "✨ Vous avez utilisé tous les indices";
    }
  }

  function normalize(str) {
    return str
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]|_/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function validateAnswer() {
    const userAnswer = answerInput.value.trim();
    if (!userAnswer) return;
    
    clearInterval(timer);
    const normalizedUserAnswer = normalize(userAnswer);
    const normalizedCorrectAnswer = normalize(enigmes[currentEnigma].answer);
    
    if (
      normalizedUserAnswer.includes(normalizedCorrectAnswer) || 
      normalizedCorrectAnswer.includes(normalizedUserAnswer) ||
      normalizedUserAnswer === normalizedCorrectAnswer
    ) {
      timerElement.textContent = "✅ Bonne réponse !";
      timerElement.style.color = "#4CAF50";
      score++;
      scoreElement.textContent = `Score: ${score}/${enigmes.length}`;
      if (theme === 'enquete-policiere' && explanationBox && enigmes[currentEnigma].explanation) {
        explanationBox.textContent = `Explication : ${enigmes[currentEnigma].explanation}`;
        explanationBox.classList.add('visible');
        explanationBox.classList.remove('visible'), 2500;        
      }
      setTimeout(() => nextEnigma(true), 2500);
    } else {
      timerElement.textContent = "❌ Essaye encore !";
      timerElement.style.color = "#f44336";
      setTimeout(startTimer, 2500);
    }
  }

  function nextEnigma() {
    currentEnigma++;
    if (currentEnigma < enigmes.length) loadEnigma();
    else showResults();
  }

  function showResults() {
    const starsCount = Math.round((score / enigmes.length) * 5);
    let starsHTML = "";
    for (let i = 0; i < 5; i++) {
      starsHTML += i < starsCount
        ? '<i class="fas fa-star"></i>'
        : '<i class="far fa-star"></i>';
    }

    const messages = [
      "Super travail ! Tu es un vrai détective 🕵‍♂",
      "Bien joué ! Tu as résolu toutes les énigmes 🎉",
      "Félicitations ! Ton esprit est aussi vif qu'un renard 🦊",
      "Incroyable ! Tu mérites une médaille d'or 🥇",
      "Mission accomplie ! Tu as piraté tous les mystères 💾",
      "Bravo ! Tu es maintenant un maître des énigmes 🏆"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    document.querySelector('.enigme-content').innerHTML = `
      <div class="result-screen">
        <h2>Mission Accomplie!</h2>
        <div class="stars">${starsHTML}</div>
        <p>${randomMessage}</p>
        <p>Tu as obtenu ${score}/${enigmes.length} énigmes</p>
        <button id="restartBtn">
          <i class="fas fa-redo"></i> Rejouer
        </button>
        <button id="menuBtn">
          <i class="fas fa-home"></i> Retour au menu
        </button>
      </div>`;
      
    document.getElementById('restartBtn').onclick = () => location.reload();
    document.getElementById('menuBtn').onclick = () => window.location.href = "themes.html"; // ← retour a la page menu
  }

  if (enigmes.length && validateBtn && hintBtn && answerInput) {
    validateBtn.onclick  = validateAnswer;
    hintBtn.onclick      = showHint;
    answerInput.onkeypress = e => { if (e.key === 'Enter') validateAnswer(); };
    loadEnigma();
  }

  
})();
