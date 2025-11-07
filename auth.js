// Authentication System for AIDEO

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    const feedback = [];
    
    // Length check
    if (password.length >= 8) {
        strength++;
    } else {
        feedback.push("Au moins 8 caractères");
    }
    
    // Lowercase and uppercase
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
        strength++;
    } else {
        feedback.push("Lettres majuscules et minuscules");
    }
    
    // Numbers
    if (password.match(/\d/)) {
        strength++;
    } else {
        feedback.push("Au moins un chiffre");
    }
    
    // Special characters
    if (password.match(/[^a-zA-Z\d]/)) {
        strength++;
    } else {
        feedback.push("Au moins un caractère spécial");
    }
    
    return { strength, feedback };
}

function updatePasswordStrength(password) {
    const fill = document.getElementById('strength-fill');
    const text = document.getElementById('strength-text');
    
    if (!fill || !text) return;
    
    const { strength, feedback } = checkPasswordStrength(password);
    const colors = ['#ef4444', '#f59e0b', '#84cc16', '#10b981'];
    const labels = ['Faible', 'Moyen', 'Fort', 'Très fort'];
    
    fill.style.width = `${(strength / 4) * 100}%`;
    fill.style.background = colors[strength] || colors[0];
    text.textContent = labels[strength] || labels[0];
    text.style.color = colors[strength] || colors[0];
    
    // Show feedback tooltip
    if (password.length > 0 && strength < 4) {
        text.title = feedback.join('\n');
    } else {
        text.title = '';
    }
}

// Toggle Password Visibility
function initPasswordToggle() {
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    });
}

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Form Submission Handlers
function initAuthForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Login Form
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Basic validation
            if (!validateEmail(email)) {
                showNotification('Veuillez entrer un email valide', 'error');
                return;
            }
            
            if (!validatePassword(password)) {
                showNotification('Le mot de passe doit contenir au moins 8 caractères', 'error');
                return;
            }
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
            submitButton.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Simulate successful login
                localStorage.setItem('userAuthenticated', 'true');
                localStorage.setItem('userEmail', email);
                
                showNotification('Connexion réussie ! Redirection...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
                
            } catch (error) {
                showNotification('Email ou mot de passe incorrect', 'error');
            } finally {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    // Register Form
    if (registerForm) {
        const passwordInput = registerForm.querySelector('#password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }
        
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const fullname = this.querySelector('#fullname').value;
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const profile = this.querySelector('#profile').value;
            const terms = this.querySelector('input[name="terms"]').checked;
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Validation
            if (!fullname) {
                showNotification('Veuillez entrer votre nom complet', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Veuillez entrer un email valide', 'error');
                return;
            }
            
            const { strength } = checkPasswordStrength(password);
            if (strength < 2) {
                showNotification('Le mot de passe est trop faible', 'error');
                return;
            }
            
            if (!profile) {
                showNotification('Veuillez sélectionner votre profil', 'error');
                return;
            }
            
            if (!terms) {
                showNotification('Veuillez accepter les conditions d\'utilisation', 'error');
                return;
            }
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création du compte...';
            submitButton.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Store user data
                const userData = {
                    fullname,
                    email,
                    profile,
                    createdAt: new Date().toISOString()
                };
                
                localStorage.setItem('userData', JSON.stringify(userData));
                localStorage.setItem('userAuthenticated', 'true');
                
                showNotification('Compte créé avec succès ! Bienvenue chez AIDEO 🎉', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
                
            } catch (error) {
                showNotification('Erreur lors de la création du compte', 'error');
            } finally {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

// Check Authentication Status
function checkAuth() {
    return localStorage.getItem('userAuthenticated') === 'true';
}

function getCurrentUser() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

function logout() {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userData');
    showNotification('Déconnexion réussie', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', function() {
    initPasswordToggle();
    initAuthForms();
    
    // Check if user is already authenticated
    if (checkAuth() && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
        showNotification('Vous êtes déjà connecté', 'info');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }
});
