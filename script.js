document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Définition des Chemins des Photos de Projets ---
    // ATTENTION : Tous les chemins sont préfixés par 'images/' pour correspondre à votre structure de dossiers
    const projectImages = {
        // Projet 1 : App de Géolocalisation (1.png, 1.2.jpg à 1.9.jpg)
        'slider-p1': [
            'images/1.png', 'images/3.jpg', 'images/4.jpg', 'images/5.jpg','images/6.jpg', 'images/7.jpg', 'images/8.jpg', 'images/9.jpg'
        ],
        // Projet 2 : App Math (p21.jpg à p25.jpg)
        'slider-p2': [
            'images/p21.jpg', 'images/p22.jpg', 'images/p23.jpg', 'images/p24.jpg', 'images/p25.jpg'
        ],
        // Projet 3 : App Éducative (Utiliser des noms de fichiers génériques pour l'exemple)
        'slider-p3': [
            'images/11.jpg', 'images/22.jpg', 'images/33.jpg', 'images/44.jpg', 'images/55.jpg','images/66.jpg', 'images/77.jpg',
            'images/88.jpg', 'images/99.jpg', 'images/1010.jpg', 'images/111.jpg',
        ]
    };

    // --- 2. Fonction de Défilement (Slider) Automatique des Images ---
    function createSlider(sliderId, images) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        // Effacer le contenu initial et construire le slider avec les images
        slider.innerHTML = ''; 
        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src; 
            img.alt = `Capture ${sliderId} - Image ${index + 1}`;
            // Ajout de la première image comme active
            if (index === 0) {
                img.classList.add('active'); 
            }
            slider.appendChild(img);
        });

        const imageElements = slider.querySelectorAll('img');
        let currentIndex = 0;
        const intervalTime = 3000; // Défilement toutes les 3 secondes, comme demandé

        const nextImage = () => {
            // Cacher l'image actuelle
            imageElements[currentIndex].classList.remove('active');
            
            // Calculer l'index suivant (boucle pour revenir à zéro)
            currentIndex = (currentIndex + 1) % imageElements.length;
            
            // Afficher la nouvelle image
            imageElements[currentIndex].classList.add('active');
            
            // NOTE: Le mouvement aléatoire sur les coins n'est pas standard en CSS/JS pur 
            // pour un simple slider, mais la fonctionnalité de défilement est implémentée ici. 
            // Les transitions sont gérées par le CSS.
        };

        // Démarrer l'intervalle pour le défilement automatique
        setInterval(nextImage, intervalTime);
    }
    
    // --- 3. Initialisation des Sliders au Chargement ---
    createSlider('slider-p1', projectImages['slider-p1']);
    createSlider('slider-p2', projectImages['slider-p2']);
    createSlider('slider-p3', projectImages['slider-p3']); 
    
    
    // --- 4. Gestion du Menu Burger pour Mobile ---
    const burger = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle'); 
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });

    // --- 5. Smooth Scrolling pour les ancres ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 6. Animations au Scroll (Intersection Observer) ---
    const faders = document.querySelectorAll('.anim-fade-in, .anim-slide-up, .anim-zoom-in');
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // --- 7. Gestion des boutons "Laisser un avis" et Formspree ---
    const reviewButtons = document.querySelectorAll('.leave-review');
    const contactSection = document.getElementById('contact');
    const subjectInput = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');

    reviewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectName = button.getAttribute('data-project');
            contactSection.scrollIntoView({ behavior: 'smooth' });
            // Prépare le sujet et le placeholder pour l'avis
            subjectInput.value = `Avis sur le projet : ${projectName}`;
            messageTextarea.focus();
            messageTextarea.placeholder = `J'aimerais vous donner mon avis sur le projet "${projectName}"...`;
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = 'Envoi en cours...';
            formStatus.style.color = 'var(--accent-color)'; 
            const formData = new FormData(contactForm);
            
            try {
                // L'action du formulaire est définie dans index.html pour Formspree
                const response = await fetch(contactForm.action, {
                    method: contactForm.method, body: formData, headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = 'Message envoyé ! Merci pour votre avis/proposition.';
                    formStatus.style.color = '#3CB371'; // Vert succès
                    contactForm.reset(); 
                    subjectInput.value = 'Nouveau message portfolio'; 
                    messageTextarea.placeholder = 'Votre avis ou proposition ici...';
                } else {
                    const data = await response.json();
                    formStatus.textContent = data["errors"] ? data["errors"].map(error => error["message"]).join(", ") : "Oops ! Erreur lors de l'envoi du formulaire.";
                    formStatus.style.color = '#FF6347'; // Rouge erreur
                }
            } catch (error) {
                formStatus.textContent = 'Erreur de connexion. Veuillez vérifier votre réseau.';
                formStatus.style.color = '#FF6347'; 
            }
        });
    }

});