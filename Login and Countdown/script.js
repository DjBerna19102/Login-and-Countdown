// Login Form 2 - Neon Minimalist Style JavaScript
// This file contains the primary login form logic

// -------------------------------------------------------------------
// SIMULAZIONE DI FORM-UTILS.JS PER LA DEMO
// -------------------------------------------------------------------

const FormUtils = {
    // Credenziali di test per il successo AGGIORNATE
    TEST_EMAIL: 'Oratorio', // NUOVO NOME UTENTE
    TEST_PASSWORD: '@nniccO2025', // NUOVA PASSWORD
    
    // Funzione di validazione simulata (basata su requisiti comuni)
    validateEmail: (email) => {
        // ... (il resto della funzione validateEmail rimane lo stesso)
        // La validazione originale cercava un formato email, che 'Oratorio' non è.
        // Per consentire l'uso di 'Oratorio' come nome utente, modifichiamo leggermente
        // la validazione, ma per semplicità lasceremo solo il controllo di base per ora.
        if (!email) return { isValid: false, message: "L'utente è richiesto." };
        // Rimuoviamo il controllo regex per le email se l'utente desidera un nome utente non email
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!regex.test(email)) return { isValid: false, message: "Formato non valido." };
        return { isValid: true, message: "" };
    },
    
    // Funzione di validazione simulata
    validatePassword: (password) => {
        // La password '@nniccO2025' è valida per le regole precedenti (8+ caratteri, maiuscola, numero).
        if (!password) return { isValid: false, message: "La password è richiesta." };
        if (password.length < 8) return { isValid: false, message: "Deve contenere almeno 8 caratteri." };
        if (!/[A-Z]/.test(password)) return { isValid: false, message: "Deve contenere almeno una maiuscola." };
        if (!/[0-9]/.test(password)) return { isValid: false, message: "Deve contenere almeno un numero." };
        return { isValid: true, message: "" };
    },

    // Simulazione del login lato server
    simulateLogin: (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // CONTROLLO AGGIORNATO
                if (email === FormUtils.TEST_EMAIL && password === FormUtils.TEST_PASSWORD) {
                    resolve({ success: true, message: "Login riuscito." });
                } else {
                    reject(new Error("Credenziali non valide. Prova Ancora"));
                }
            }, 1500); // Ritardo simulato di 1.5 secondi
        });
    },
    // ... (il resto dell'oggetto FormUtils e della classe LoginForm2 rimane lo stesso)
    
    // ...
    // E nell'ultima parte della classe LoginForm2, la funzione setupDefaultValues() 
    // garantirà che i campi siano pre-compilati con i nuovi valori:
    setupDefaultValues() {
        if (this.emailInput && !this.emailInput.value) {
            this.emailInput.value = FormUtils.TEST_EMAIL;
            this.emailInput.classList.add('has-value');
        }
        if (this.passwordInput && !this.passwordInput.value) {
            this.passwordInput.value = FormUtils.TEST_PASSWORD;
            this.passwordInput.classList.add('has-value');
        }
    },
    // Funzioni condivise (simulazione)
    addSharedAnimations: () => {
        // console.log('Shared animations added.');
    },
    showNotification: (message, type, target) => {
        console.warn(`[NOTIFICA ${type.toUpperCase()}]: ${message}`);
        // Logica per mostrare un banner di notifica nel DOM (omessa per brevità)
    }
};

// -------------------------------------------------------------------
// CLASSE PRINCIPALE AGGIORNATA
// -------------------------------------------------------------------

class LoginForm2 {
    constructor() {
        // Seleziona il primo form con id 'loginForm' che deve essere quello giusto
        this.form = document.getElementById('loginForm');
        
        // **IMPORTANTE**: L'inizializzazione deve fallire se il form non viene trovato (il che potrebbe accadere con ID duplicati)
        if (!this.form) {
            console.error("ERRORE: Impossibile trovare il form con ID 'loginForm'.");
            return;
        }
        
        this.submitBtn = this.form.querySelector('.login-btn');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.passwordInput = document.getElementById('password');
        this.emailInput = document.getElementById('email'); 
        this.successMessage = document.getElementById('successMessage');
        this.isSubmitting = false;
        
        this.validators = {
            email: FormUtils.validateEmail,
            password: FormUtils.validatePassword
        };
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.setupFloatingLabels();
        this.addInputAnimations();
        this.setupPasswordToggle();
        this.addBackgroundEffects();
        FormUtils.addSharedAnimations();
    }
    
    // Pre-popola i campi
    setupDefaultValues() {
        if (this.emailInput && !this.emailInput.value) {
            this.emailInput.value = FormUtils.TEST_EMAIL;
            // Assicura che l'etichetta fluttuante si attivi
            this.emailInput.classList.add('has-value');
        }
        if (this.passwordInput && !this.passwordInput.value) {
            this.passwordInput.value = FormUtils.TEST_PASSWORD;
            // Assicura che l'etichetta fluttuante si attivi
            this.passwordInput.classList.add('has-value');
        }
    }
    
    addEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        Object.keys(this.validators).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.addEventListener('blur', () => this.validateField(fieldName));
                field.addEventListener('input', () => this.clearError(fieldName));
            }
        });
        
        // Enhanced focus effects
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => this.handleFocus(e));
            input.addEventListener('blur', (e) => this.handleBlur(e));
        });
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }
    
    setupFloatingLabels() {
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(input => {
            // Check if field has value on page load
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            }
            
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });
    }
    
    addInputAnimations() {
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach((input, index) => {
            // Stagger animation on page load
            input.style.opacity = '0';
            input.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                input.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                input.style.opacity = '1';
                input.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    setupPasswordToggle() {
        if (this.passwordToggle && this.passwordInput) {
            this.passwordToggle.addEventListener('click', () => {
                const isPassword = this.passwordInput.type === 'password';
                const toggleIcon = this.passwordToggle.querySelector('.toggle-icon');
                
                this.passwordInput.type = isPassword ? 'text' : 'password';
                toggleIcon.classList.toggle('show-password', isPassword);
                
                // Add neon pulse effect
                this.passwordToggle.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.5)';
                setTimeout(() => {
                    this.passwordToggle.style.boxShadow = '';
                }, 300);
                
                // Keep focus on password input
                this.passwordInput.focus();
            });
        }
    }
    
    addBackgroundEffects() {
        // Add mouse move parallax effect to glow orbs
        document.addEventListener('mousemove', (e) => {
            const orbs = document.querySelectorAll('.glow-orb');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                const moveX = (x - 0.5) * speed * 20;
                const moveY = (y - 0.5) * speed * 20;
                orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    handleFocus(e) {
        const wrapper = e.target.closest('.input-wrapper');
        if (wrapper) {
            wrapper.classList.add('focused');
            // Add subtle glow effect
            const input = wrapper.querySelector('input');
            input.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.1)';
        }
    }
    
    handleBlur(e) {
        const wrapper = e.target.closest('.input-wrapper');
        if (wrapper) {
            wrapper.classList.remove('focused');
            // Remove glow effect
            const input = wrapper.querySelector('input');
            input.style.boxShadow = '';
        }
    }
    
    async handleSubmit(e) {
        // QUESTA RIGA È FONDAMENTALE E GARANTISCE CHE LA PAGINA NON SI RICARICHI
        e.preventDefault(); 
        
        if (this.isSubmitting) return;
        
        const isValid = this.validateForm();
        
        if (isValid) {
            await this.submitForm();
        } else {
            this.shakeForm();
        }
    }
    
    validateForm() {
        let isValid = true;
        
        Object.keys(this.validators).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const validator = this.validators[fieldName];
        
        if (!field || !validator) return true;
        
        const result = validator(field.value.trim(), field);
        
        if (result.isValid) {
            this.clearError(fieldName);
            this.showSuccess(fieldName);
        } else {
            this.showError(fieldName, result.message);
        }
        
        return result.isValid;
    }
    
    showError(fieldName, message) {
        const formGroup = document.getElementById(fieldName).closest('.form-group');
        const errorElement = document.getElementById(fieldName + 'Error');
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add shake animation with neon effect
        const field = document.getElementById(fieldName);
        field.style.animation = 'shake 0.5s ease-in-out';
        field.style.boxShadow = '0 0 15px rgba(255, 0, 128, 0.5)';
        setTimeout(() => {
            field.style.animation = '';
            field.style.boxShadow = '';
        }, 500);
    }
    
    clearError(fieldName) {
        const formGroup = document.getElementById(fieldName).closest('.form-group');
        const errorElement = document.getElementById(fieldName + 'Error');
        
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.textContent = '';
        }, 300);
    }
    
    showSuccess(fieldName) {
        const field = document.getElementById(fieldName);
        const wrapper = field.closest('.input-wrapper');
        
        // Add subtle success indication with neon glow
        wrapper.style.borderColor = 'var(--neon-primary)';
        field.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.3)';
        setTimeout(() => {
            wrapper.style.borderColor = '';
            field.style.boxShadow = '';
        }, 2000);
    }
    
    shakeForm() {
        const card = document.querySelector('.login-card');
        card.style.animation = 'shake 0.5s ease-in-out';
        card.style.boxShadow = '0 0 30px rgba(255, 0, 128, 0.3)';
        setTimeout(() => {
            card.style.animation = '';
            card.style.boxShadow = '';
        }, 500);
    }
    
    async submitForm() {
        this.isSubmitting = true;
        this.submitBtn.classList.add('loading');
        
        // Add neon loading effect
        this.submitBtn.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.6)';
        
        try {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Use shared login simulation
            await FormUtils.simulateLogin(email, password);
            
            // Show success state
            this.showSuccessMessage();
            
        } catch (error) {
            console.error('Login error:', error);
            this.showLoginError(error.message);
        } finally {
            this.isSubmitting = false;
            this.submitBtn.classList.remove('loading');
            this.submitBtn.style.boxShadow = '';
        }
    }
    
    showSuccessMessage() {
        // Hide form with smooth animation and neon effects
        this.form.style.opacity = '0';
        this.form.style.transform = 'translateY(-20px) scale(0.95)';
        
        // Hide other elements (qui non ci sono altri elementi nel tuo HTML, quindi elementsToHide rimane vuoto)
        const elementsToHide = []; 
        elementsToHide.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(-20px) scale(0.95)';
            }
        });
        
        // Add success glow to card
        const card = document.querySelector('.login-card');
        card.style.boxShadow = '0 0 50px rgba(0, 255, 136, 0.4)';
        
        setTimeout(() => {
            this.form.style.display = 'none';
            elementsToHide.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) element.style.display = 'none';
            });
            
            // MOSTRA IL MESSAGGIO DI SUCCESSO
            this.successMessage.classList.add('show');
            
            // Simulate redirect after success
            setTimeout(() => {
                this.simulateRedirect();
            }, 3000);
        }, 300);
    }
    
    simulateRedirect() {
        // For demo, reset the form after 2 seconds
        setTimeout(() => {
            this.resetForm();
        }, 2000);
    }
    
    showLoginError(message) {
        FormUtils.showNotification(message || 'Login failed. Please try again.', 'error', this.form);
        
        // Shake the entire card with neon error effect
        const card = document.querySelector('.login-card');
        card.style.animation = 'shake 0.5s ease-in-out';
        card.style.boxShadow = '0 0 40px rgba(255, 0, 128, 0.5)';
        setTimeout(() => {
            card.style.animation = '';
            card.style.boxShadow = '';
        }, 500);
    }
    
    resetForm() {
        this.successMessage.classList.remove('show');
        
        setTimeout(() => {
            // Show form elements again
            const elementsToShow = []; 
            this.form.style.display = 'block';
            elementsToShow.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.display = 'block';
                }
            });
            
            this.form.reset();
            
            // Clear all validation states
            Object.keys(this.validators).forEach(fieldName => {
                this.clearError(fieldName);
            });
            
            // Reset form appearance
            this.form.style.opacity = '1';
            this.form.style.transform = 'translateY(0) scale(1)';
            
            // Reset other elements
            elementsToShow.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }
            });
            
            // Reset card glow
            const card = document.querySelector('.login-card');
            card.style.boxShadow = '';
            
            // Reset floating labels
            const inputs = this.form.querySelectorAll('input');
            inputs.forEach(input => {
                input.classList.remove('has-value');
            });
            
            // Reset password visibility
            if (this.passwordInput) {
                this.passwordInput.type = 'password';
                const toggleIcon = this.passwordToggle?.querySelector('.toggle-icon');
                if (toggleIcon) {
                    toggleIcon.classList.remove('show-password');
                }
            }
            
            // Re-apply default values on reset
            this.setupDefaultValues();
            
        }, 300);
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Enter key submits form if focus is on form elements
            if (e.key === 'Enter' && e.target.closest('#loginForm')) {
                e.preventDefault();
                this.handleSubmit(e);
            }
            
            // Escape key clears errors
            if (e.key === 'Escape') {
                Object.keys(this.validators).forEach(fieldName => {
                    this.clearError(fieldName);
                });
            }
        });
    }

    // script.js (All'interno della classe LoginForm2)

// ...

    showSuccessMessage() {
        // ... (Il codice per nascondere il form e mostrare il messaggio di successo resta invariato)
        
        // ...
        setTimeout(() => {
            // ... (altre linee di codice che restano invariate) ...
            
            this.successMessage.classList.add('show');
            
            // Chiamiamo simulateRedirect dopo 3 secondi, dando tempo al messaggio "Benvenuto!" di apparire
            setTimeout(() => {
                this.simulateRedirect();
            }, 3000); 
        }, 300);
    }
    
    // FUNZIONE AGGIORNATA: Esegue il reindirizzamento
    simulateRedirect() {
        // Reindirizza alla pagina del contatore alla rovescia.
        // Assumiamo che il file si chiami index.html.
        window.location.href = 'index (2).html'; 
        
        // Se la pagina del contatore avesse un altro nome, ad esempio 'countdown.html', 
        // la riga sarebbe: window.location.href = 'countdown.html';
    }

}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation to login card with neon effect
    const loginCard = document.querySelector('.login-card');
    if (loginCard) {
        loginCard.style.opacity = '0';
        loginCard.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            loginCard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            loginCard.style.opacity = '1';
            loginCard.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }
    
    // Initialize the login form
    new LoginForm2();
});