document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GESTION DU HEADER STICKY ---
    const header = document.querySelector('.navbar');
    const heroSection = document.getElementById('hero-section');
    
    // Assurez-vous que l'élément heroSection existe pour calculer la hauteur
    if (heroSection && header) {
        const heroHeight = heroSection.offsetHeight;
        
        window.addEventListener('scroll', () => {
            // Déclenchement du sticky après avoir défilé la majorité de la section HERO
            if (window.scrollY > heroHeight - 100) { 
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }


    // --- 2. SCROLL REVEAL (Animation des éléments à l'apparition) ---
    // Correction des sélecteurs pour correspondre à la structure HTML finale
    const revealElements = document.querySelectorAll(
        '.section-title, .two-columns, .solution-card, .viabilite-card, .needs-list, .pull-quote, .hero-content'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Déclenche l'animation quand 10% de l'élément est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Arrête d'observer après la première apparition
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        element.classList.add('scroll-reveal'); // Ajoute la classe de base pour l'animation
        observer.observe(element);
    });
    
    // --- 3. GESTION DU FORMULAIRE DE CONTACT (Formspree) ---
    // Cette partie assure que le message de succès s'affiche après l'envoi
    const form = document.getElementById('partner-form');
    const formMessage = document.getElementById('form-message');

    if (form) { // S'assurer que le formulaire existe
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const formData = new FormData(form);
            const actionUrl = form.action;

            try {
                // Envoi des données au service Formspree
                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                // Cacher l'ancien message au cas où
                formMessage.classList.add('hidden');

                if (response.ok) {
                    // Succès de la soumission
                    formMessage.textContent = "✅ Votre demande de partenariat a été envoyée avec succès ! Notre équipe vous contactera très rapidement.";
                    formMessage.classList.remove('hidden', 'error');
                    form.reset(); // Vider les champs
                    
                    // Optionnel : Désactiver le formulaire pour éviter les doubles soumissions
                    form.querySelector('button[type="submit"]').disabled = true;

                } else {
                    // Échec de la soumission
                    formMessage.textContent = "❌ Une erreur est survenue lors de l'envoi. Veuillez vérifier vos informations ou réessayer plus tard.";
                    formMessage.classList.remove('hidden');
                    formMessage.classList.add('error');
                }

            } catch (error) {
                // Erreur réseau ou autre
                formMessage.textContent = "❌ Une erreur de connexion a empêché l'envoi du message.";
                formMessage.classList.remove('hidden');
                formMessage.classList.add('error');
            }
        });
    }

});