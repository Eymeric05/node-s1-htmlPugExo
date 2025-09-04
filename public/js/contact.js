// Fonction pour afficher le toast
function showToast(message) {
    // Créer l'élément toast s'il n'existe pas
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    // Contenu du toast
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">✓</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    // Afficher le toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Masquer le toast après 5 secondes
    setTimeout(() => {
        toast.classList.remove('show');
        // Supprimer l'élément après l'animation
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Vérifier si on vient d'une redirection avec succès
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
        showToast('Votre message a été envoyé avec succès !');
        // Nettoyer l'URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// Validation du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validation basique
            if (!email || !message) {
                e.preventDefault();
                showToast('Veuillez remplir tous les champs');
                return;
            }
            
            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showToast('Veuillez entrer une adresse email valide');
                return;
            }
            
            // Si tout est valide, le formulaire sera soumis normalement
        });
    }
});
