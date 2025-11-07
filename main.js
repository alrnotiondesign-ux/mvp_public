// ===== GESTION DU THÈME =====
window.toggleTheme = function() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Appliquer le changement
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
};

function updateThemeIcons(theme) {
    const sunIcons = document.querySelectorAll('.fa-sun');
    const moonIcons = document.querySelectorAll('.fa-moon');
    
    if (theme === 'dark') {
        sunIcons.forEach(icon => icon.style.display = 'none');
        moonIcons.forEach(icon => icon.style.display = 'inline-block');
    } else {
        sunIcons.forEach(icon => icon.style.display = 'inline-block');
        moonIcons.forEach(icon => icon.style.display = 'none');
    }
}

// ===== NAVIGATION MOBILE =====
window.toggleMobileMenu = function() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
};

// Fermer le menu mobile en cliquant à l'extérieur
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleButton = document.querySelector('.nav-mobile-toggle');
    
    if (mobileMenu && toggleButton && 
        !mobileMenu.contains(event.target) && 
        !toggleButton.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// ===== ACTIVE PAGE HIGHLIGHT =====
function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const pageMapping = {
        'index.html': 'nav-accueil',
        '': 'nav-accueil',
        'vision.html': 'nav-vision',
        'offres.html': 'nav-offres',
        'fiches.html': 'nav-fiches',
        'demo-leo.html': 'nav-leo',
        'early-access.html': 'nav-early'
    };
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeId = pageMapping[currentPage];
    if (activeId) {
        const activeLink = document.getElementById(activeId);
        if (activeLink) activeLink.classList.add('active');
    }
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le thème
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
    
    // Configurer la page active
    setActivePage();
    
    console.log('🎯 AIDEO initialisé avec succès!');
})