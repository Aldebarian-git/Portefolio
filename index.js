import projects from "./Assets/scripts/projects.js";
import stacks from "./Assets/scripts/stacks.js";
import softskills from "./Assets/scripts/softskill.js";

/**
 * Function qui génère des bulles dans le petit jeu, ou il faut cliquer sur les bulles pour les faires exploser et augmenter son score
 */
function bubleGenerator() {
  const popEffect = new Audio("./Assets/audio/pop.mp3");
  const counterDisplay = document.querySelector("h3 span");
  let counter = 0;
  const bubbleMaker = () => {
    const gamebox = document.querySelector(".gamebox");
    const bubble = document.createElement("span");
    bubble.classList.add("bubble");
    gamebox.appendChild(bubble);
    const size = Math.random() * 100 + 40 + "px";
    bubble.style.height = size;
    bubble.style.width = size;
    bubble.style.top = Math.random() * 100 + "%";
    bubble.style.left = Math.random() * 100 + "%";
    const plusMinus = Math.random() > 0.5 ? 1 : -1;
    bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%");
    bubble.addEventListener("click", () => {
      counter++;
      counterDisplay.textContent = counter;
      popEffect.play();
      bubble.remove();
    });
    setTimeout(() => {
      bubble.remove();
    }, 8000);
  };

  setInterval(bubbleMaker, 300);
}

/**
 * Function qui écrit à intervalle régulier les élement du tableau array, donnant un effet de typing
 */
function typeEffect() {
  const target = document.getElementById("target");
  let array = ["Développeur", "Gamer", "Créatif"];
  let wordIndex = 0;
  let letterIndex = 0;

  const createLetter = () => {
    const letter = document.createElement("span");
    letter.style.color = "orange";
    target.appendChild(letter);

    letter.textContent = array[wordIndex][letterIndex];
    setTimeout(() => {
      letter.remove();
    }, 2000);
  };

  const loop = () => {
    setTimeout(() => {
      if (wordIndex >= array.length) {
        wordIndex = 0;
      }

      if (letterIndex < array[wordIndex].length) {
        createLetter();
        letterIndex++;
        loop();
      } else {
        wordIndex++;
        letterIndex = 0;
        setTimeout(() => {
          loop();
        }, 2000);
      }
    }, 60);
  };

  loop();
}

/**
 * Fonction qui permet d'afficher l'after des icones de la nav-bar
 */
function displayLiAfter() {
  const li = document.querySelectorAll(".liafter");
  const span = document.querySelectorAll(".after");
  
  li.forEach((l, index) => {
    l.addEventListener("mouseover", () => {
      span.forEach((s) => {
        s.classList.remove("show");
      });
      span[index].classList.add("show");
    });

    // Cacher le span quand la souris quitte l'élément li
    l.addEventListener("mouseleave", () => {
      span[index].classList.remove("show");
    });

    // Assurer que le span disparaît quand la souris quitte le span
    span[index].addEventListener("mouseleave", () => {
      span[index].classList.remove("show");
    });
  });
}

/**
 * Fonction qui permet de faire apparaitre et disparaitre la description des projets
 */
function displayInfoSProjects() {
  const projetCadreTop = document.querySelectorAll(".projetCadreTop");
  const projetCadreBottom = document.querySelectorAll(".projetCadreBottom");
  const projetS = document.querySelectorAll(".projetS");
  const backgroundFilters = document.querySelectorAll(".filters");

  projetS.forEach((projet, index) => {
    projet.addEventListener("mouseover", () => {
      backgroundFilters[index].style.visibility = "visible";
      backgroundFilters[index].style.opacity = "1";
      projetCadreBottom[index].style.bottom = "20px";
      projetCadreBottom[index].style.opacity = "1";
      projetCadreTop[index].style.top = "20px";
      projetCadreTop[index].style.opacity = "1";
    });
    projet.addEventListener("mouseleave", () => {
      backgroundFilters[index].style.visibility = "hidden";
      backgroundFilters[index].style.opacity = "0";
      projetCadreBottom[index].style.bottom = "-100px";
      projetCadreBottom[index].style.opacity = "0";
      projetCadreTop[index].style.top = "-50px";
      projetCadreTop[index].style.opacity = "0";
    });
  });
}
/**
 * Fonction qui permet de créer autant de projetContainer que d'élement dans projects.js
 */
function createProject() {
  const containerProjects = document.querySelector(".container-projets");

  projects.forEach((project) => {
    // Créer un élément <a> au lieu d'une <div> pour encapsuler le projet
    const projectLink = document.createElement("a");
    projectLink.href = `${project.link}`; // Définir l'attribut href
    projectLink.classList.add("newProjet", "projetS");
    projectLink.style.background = `url(${project.image}) center/cover no-repeat`;

    // Ajouter une div pour le cadre du titre
    const createCadreTop = document.createElement("div");
    createCadreTop.classList.add("projetCadreTop");

    // Ajouter le nom du projet
    const projectName = document.createElement("h3");
    projectName.textContent = project.name;
    createCadreTop.appendChild(projectName);
    projectLink.appendChild(createCadreTop);

    // Ajouter une div pour le cadre de la description
    const createCadreBottom = document.createElement("div");
    createCadreBottom.classList.add("projetCadreBottom");

    // Ajouter une description
    const projectDescription = document.createElement("p");
    projectDescription.textContent = project.description;
    createCadreBottom.appendChild(projectDescription);
    projectLink.appendChild(createCadreBottom);

    // Ajouter un filtre qui ne sera pas encore visible
    const backgroundFilter = document.createElement("div");
    backgroundFilter.classList.add("filters");
    projectLink.appendChild(backgroundFilter);

    // Ajouter le projet au conteneur principal
    containerProjects.appendChild(projectLink);
});

}
/**
 * Fonction qui permet de créer autant de stackContainer en fonction du nombre d'élément dans stacks.js
 */
function createStack() {
  const containerStacks = document.getElementById("stacksContainer");

  stacks.forEach((stack) => {
    // Créer un conteneur pour chaque projet
    const stackDiv = document.createElement("div");
    const stackImgDiv = document.createElement("img");
    stackImgDiv.src = stack.image;
    const stackNameDiv = document.createElement("h3");
    stackNameDiv.textContent = stack.technologie;
    const stackLevelDiv = document.createElement("span");
    stackLevelDiv.textContent = stack.niveau;
    containerStacks.appendChild(stackDiv);
    stackDiv.appendChild(stackImgDiv);
    stackDiv.appendChild(stackNameDiv);
    stackDiv.appendChild(stackLevelDiv);
  });
}
/**
 * Fonction qui permet de créer autant de softSkillContainer en fonction du nombre d'élément dans softskill.js
 */
function createsoftskill() {
  const containerSkills = document.getElementById("softSkillContainer");

  softskills.forEach((skill) => {
    // Créer un conteneur pour chaque skill
    const skillDiv = document.createElement("div");
    const skillImgDiv = document.createElement("img");
    skillImgDiv.src = skill.image;
    const skillNameDiv = document.createElement("h3");
    skillNameDiv.textContent = skill.name;
    const skillLevelDiv = document.createElement("span");
    skillLevelDiv.textContent = skill.niveau;
    containerSkills.appendChild(skillDiv);
    skillDiv.appendChild(skillImgDiv);
    skillDiv.appendChild(skillNameDiv);
    skillDiv.appendChild(skillLevelDiv);
  });
}
/**
 * Fonction qui gère tous les événements de scroll de manière optimisée
 */
function handleScroll() {
  // Variables DOM (définies en dehors pour éviter les requêtes multiples)
  const navBar = document.getElementById("navBar");
  const navButtonUp = document.getElementById("buttonUp");
  const footer = document.querySelector("footer");

  // Fonction qui regroupe toute la logique de scroll
  window.addEventListener("scroll", () => {
    // Gestion du bouton Up
    if (window.scrollY > 200) {
      navButtonUp.style.opacity = "1";
      navButtonUp.style.visibility = "visible";
    } else {
      navButtonUp.style.opacity = "0";
      navButtonUp.style.visibility = "hidden";
    }

    // Gestion de la navbar avec le footer
    const footerPosition = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (window.scrollY >= 80 && footerPosition > windowHeight) {
      // NavBar fixe
      navBar.style.position = "fixed";
      navBar.style.bottom = "0";
      navBar.style.left = "50%";
      navBar.style.borderBottom = "none";
      navBar.style.borderTop = "1px solid orange";
      navBar.style.borderRight = "1px solid orange";
      navBar.style.borderLeft = "1px solid orange";
      navBar.style.transform = "translateX(-50%)";
      navBar.style.maxWidth = "1300px";
      navBar.style.opacity = "1";
      navBar.style.visibility = "visible";
    } else if (footerPosition <= windowHeight) {
      // Footer visible
      navBar.style.opacity = "0";
      navBar.style.visibility = "hidden";
    } else {
      // Haut de page
      navBar.style.position = "static";
      navBar.style.bottom = "auto";
      navBar.style.left = "0";
      navBar.style.borderBottom = "1px solid #ccc";
      navBar.style.borderTop = "none";
      navBar.style.borderLeft = "none";
      navBar.style.borderRight = "none";
      navBar.style.transform = "none";
      navBar.style.opacity = "1";
      navBar.style.visibility = "visible";
    }
  });
}
/**
 * Fonction qui affiche ou désaffiche la section à propos de moi
 */
function displayAboutSection() {
  const aboutMeLeft = document.querySelector(".aboutmeLeft");
  const aboutMeRight = document.querySelector(".aboutmeCadre");
  const aboutMeTitle = document.querySelector(".aboutme-title");
  const aboutMeRightPicture = document.querySelector(".aboutmeRight");

  window.addEventListener("DOMContentLoaded", () => {
    aboutMeLeft.style.transform = "translateX(0%)";
    aboutMeRight.style.transform = "translateX(0%)";
    aboutMeRight.style.borderRadius = "0%";
    aboutMeRight.style.minHeight = "499px";    
    aboutMeRight.style.opacity = "1";
    aboutMeRightPicture.style.borderRadius = "0%";
    aboutMeRightPicture.style.opacity = "1";
    aboutMeTitle.style.transform = "translateY(0%)";
  });
}
/**
 * Fonction qui affiche ou désaffiche le menu burger
 */
function burger() {
  const sideBar = document.getElementById("side-bar");
  const btn = document.getElementById("btn");

  btn.addEventListener("click", (event) => {
    event.stopPropagation(); 
    sideBar.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    // Vérifie si le clic n'est pas sur le sidebar ou le bouton
    if (!sideBar.contains(event.target) && event.target !== btn) {
      sideBar.classList.remove("active"); // Ferme le menu
    }
  });
}

/**
 * Fonction pour animer la section compétences au scroll
 */
function animateSkillsSection() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.35
  };

  const handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animation du titre HardSkill
        const hardSkillTitle = entry.target.querySelector('.hardSkill-title');
        if (hardSkillTitle) {
          hardSkillTitle.style.transform = 'translateX(0)';
          hardSkillTitle.style.opacity = '1';
        }

        // Animation des stacks avec délai
        const stacks = entry.target.querySelectorAll('#stacksContainer > div');
        stacks.forEach((stack, index) => {
          setTimeout(() => {
            stack.style.transform = 'translateY(0)';
            stack.style.opacity = '1';
          }, index * 100);
        });

        // Animation du titre SoftSkill
        const softSkillTitle = entry.target.querySelector('.softSkill-title');
        if (softSkillTitle) {
          setTimeout(() => {
            softSkillTitle.style.transform = 'translateX(0)';
            softSkillTitle.style.opacity = '1';
          }, 300);
        }

        // Animation des softskills avec délai
        const softSkills = entry.target.querySelectorAll('#softSkillContainer > div');
        softSkills.forEach((skill, index) => {
          setTimeout(() => {
            skill.style.transform = 'translateY(0)';
            skill.style.opacity = '1';
          }, (index * 100) + 400);
        });

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  const skillSection = document.querySelector('#skill');
  
  if (skillSection) {
    observer.observe(skillSection);
  }
}

burger();
createsoftskill();
handleScroll();
displayAboutSection();
createProject();
createStack();
displayInfoSProjects();
displayLiAfter();
bubleGenerator();
typeEffect();
animateSkillsSection();



