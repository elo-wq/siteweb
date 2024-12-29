const containers = document.querySelectorAll('.image-container');

function getCenteredPosition() {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const imageWidth = 150; // Largeur de l'image
    const imageHeight = 150; // Hauteur de l'image

    // Coordonnées centrales
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Rayon de dispersion autour du centre
    const radiusX = containerWidth / 4; // Ajustez pour plus ou moins de concentration
    const radiusY = containerHeight / 4;

    // Position autour du centre avec une petite variation aléatoire
    const x = centerX + (Math.random() - 0.5) * radiusX - imageWidth / 2;
    const y = centerY + (Math.random() - 0.5) * radiusY - imageHeight / 2;

    return { x, y };
}

function positionImages() {
    containers.forEach(container => {
        const position = getCenteredPosition();
        container.style.position = 'absolute'; // S'assurer que le positionnement est absolu
        container.style.left = `${position.x}px`;
        container.style.top = `${position.y}px`;
    });
}

// Positionner les images initialement
positionImages();

// Repositionner les images au redimensionnement de la fenêtre
window.addEventListener('resize', positionImages);


containers.forEach(container => {
    const caption = container.querySelector('.caption');
    const image = container.querySelector('.image');

    container.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Empêche les comportements par défaut
        
        let shiftX = e.clientX - container.getBoundingClientRect().left;
        let shiftY = e.clientY - container.getBoundingClientRect().top;

        const moveAt = (pageX, pageY) => {
            container.style.left = `${pageX - shiftX}px`;
            container.style.top = `${pageY - shiftY}px`;
        };

        const onMouseMove = (event) => {
            moveAt(event.pageX, event.pageY);
        };

        // Ajouter l'écouteur `mousemove` au document
        document.addEventListener('mousemove', onMouseMove);

        // Supprimer l'écouteur `mousemove` lors du relâchement de la souris
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        // Écouter `mouseup` sur le document
        document.addEventListener('mouseup', onMouseUp);
    });

    container.ondragstart = () => false; // Désactiver le drag and drop natif

    image.addEventListener('click', () => {
        if (caption) {
            caption.style.display = 'block';
            setTimeout(() => {
                caption.style.display = 'none';
            }, 500);
        }
    });
});

// Appliquer une position aléatoire au texte flottant
const floatingText = document.querySelector('#floating-text');

function getRandomPosition() {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const textWidth = 300; // Largeur maximale du bloc de texte
    const textHeight = 100; // Hauteur estimée du bloc de texte

    const x = Math.random() * (containerWidth - textWidth);
    const y = Math.random() * (containerHeight - textHeight);
    return { x, y };
}

// Positionner le texte flottant initialement
const textPosition = getRandomPosition();
floatingText.style.position = 'absolute';
floatingText.style.left = `${textPosition.x}px`;
floatingText.style.top = `${textPosition.y}px`;

// Rendre le texte flottant déplaçable
floatingText.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Empêche les comportements par défaut

    let shiftX = e.clientX - floatingText.getBoundingClientRect().left;
    let shiftY = e.clientY - floatingText.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
        floatingText.style.left = `${pageX - shiftX}px`;
        floatingText.style.top = `${pageY - shiftY}px`;
    };

    const onMouseMove = (event) => {
        moveAt(event.pageX, event.pageY);
    };

    // Ajouter l'écouteur `mousemove` au document
    document.addEventListener('mousemove', onMouseMove);

    // Supprimer les écouteurs `mousemove` et `mouseup` lors du relâchement
    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    // Écouter `mouseup` sur le document
    document.addEventListener('mouseup', onMouseUp);
});

floatingText.ondragstart = () => false; // Désactiver le drag and drop natif

// Sélection des éléments
const openImageBtn = document.getElementById('open-image-btn');
const modal = document.getElementById('image-modal');
const closeBtn = document.querySelector('.close-btn');

// Ouvrir la modale au clic sur le bouton
openImageBtn.addEventListener('click', () => {
    modal.style.display = 'flex'; // Affiche la modale
});

// Fermer la modale au clic sur le bouton de fermeture
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // Cache la modale
});

// Fermer la modale si l'utilisateur clique en dehors de l'image
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Sélection des éléments
const showTextBtn = document.getElementById('show-text-btn');
const textDisplay = document.getElementById('text-display');

// Texte à afficher
const textToDisplay = " nk,n jkhj.";

showTextBtn.addEventListener('click', () => {
    if (textDisplay.textContent === "") {
        textDisplay.textContent = textToDisplay;
    } else {
        textDisplay.textContent = ""; // Efface le texte
    }
});

// Sélection des éléments
const soundBtn = document.getElementById('sound-btn');
const audio = document.getElementById('audio');

// État pour savoir si le son est en lecture ou en pause
let isPlaying = false;

// Fonction pour gérer le clic sur le bouton
soundBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause(); // Mettre en pause le son
        soundBtn.textContent = 'Son'; // Texte par défaut
    } else {
        audio.play(); // Jouer le son
        soundBtn.textContent = 'Pause'; // Modifier le texte pour indiquer qu'on peut mettre en pause
    }
    isPlaying = !isPlaying; // Inverser l'état
});

// Réinitialiser le bouton quand le son est terminé
audio.addEventListener('ended', () => {
    isPlaying = false;
    soundBtn.textContent = 'Son'; // Réinitialiser le texte du bouton
});
// Fonction pour repositionner les images autour du centre
function positionImages() {
    containers.forEach(container => {
        const position = getCenteredPosition();
        container.style.position = 'absolute'; // S'assurer que le positionnement est absolu
        container.style.left = `${position.x}px`;
        container.style.top = `${position.y}px`;
    });
}

// Ajouter l'écouteur d'événement pour le bouton Reset
const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
    positionImages(); // Repositionne les images
});
// Sélection des éléments
const videoBtn = document.getElementById('video-btn');
const videoModal = document.getElementById('video-modal');
const closeVideoBtn = videoModal.querySelector('.close-btn');
const videoPlayer = document.getElementById('video-player');

// Ouvrir la modale vidéo
videoBtn.addEventListener('click', () => {
    videoModal.style.display = 'flex'; // Afficher la modale
    videoPlayer.currentTime = 0; // Réinitialiser la vidéo au début
    videoPlayer.play(); // Démarrer la vidéo automatiquement
});

// Fermer la modale vidéo
closeVideoBtn.addEventListener('click', () => {
    videoModal.style.display = 'none'; // Cacher la modale
    videoPlayer.pause(); // Mettre en pause la vidéo
});

// Fermer la modale si l'utilisateur clique à l'extérieur de la vidéo
window.addEventListener('click', (event) => {
    if (event.target === videoModal) {
        videoModal.style.display = 'none';
        videoPlayer.pause();
    }
});
