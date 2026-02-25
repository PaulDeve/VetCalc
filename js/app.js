/**
 * MÓDULO: APLICACIÓN PRINCIPAL
 * Descripción: Lógica central de navegación y control de la aplicación
 * Archivo: js/app.js
 */

class VetCalcApp {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navItems = document.querySelectorAll('.nav-item');
        this.themeToggle = document.getElementById('themeToggle');
        this.loader = document.getElementById('loader');

        this.currentSection = 'calculator-section';
        this.isDarkMode = this.loadThemePreference();

        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        this.attachEventListeners();
        this.applyTheme();
        this.setupPWA();
        // Ocultar loader inmediatamente
        this.disableLoader();
    }

    /**
     * Adjunta eventos de navegación
     */
    attachEventListeners() {
        // Botones de navegación inferior
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const sectionId = e.currentTarget.getAttribute('data-section');
                this.switchSection(sectionId);
            });
        });

        // Toggle de tema
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Escuchar cambios en el sistema (si el usuario tiene preferencias del SO)
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme-preference')) {
                    this.isDarkMode = e.matches;
                    this.applyTheme();
                }
            });
        }

        // Prevenir comportamientos por defecto en móviles
        document.addEventListener('touchmove', (e) => {
            // Permitir scroll en elementos con overflow
        }, { passive: true });
    }

    /**
     * Cambia de sección
     * @param {string} sectionId - ID de la sección a mostrar
     */
    switchSection(sectionId) {
        try {
            // Desactivar sección actual
            const currentElement = document.getElementById(this.currentSection);
            if (currentElement) {
                currentElement.classList.remove('active');
            }
            
            // Activar nueva sección
            const newElement = document.getElementById(sectionId);
            if (newElement) {
                newElement.classList.add('active');
            } else {
                console.warn(`Sección no encontrada: ${sectionId}`);
                return;
            }
            
            // Actualizar navegación
            this.navItems.forEach(item => {
                if (item.getAttribute('data-section') === sectionId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            // Actualizar sección actual
            this.currentSection = sectionId;

            // Scroll al top de la sección
            const mainContainer = document.querySelector('.main-container');
            if (mainContainer) {
                mainContainer.scrollTop = 0;
            }

            // Actualizar estadísticas si es necesario
            if (sectionId === 'stats-section' && window.stats) {
                setTimeout(() => {
                    window.stats.updateStats();
                }, 300);
            }
        } catch (error) {
            console.error('Error al cambiar sección:', error);
        }
    }

    /**
     * Toggle del tema oscuro/claro
     */
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.saveThemePreference();
        this.applyTheme();
    }

    /**
     * Aplica el tema actual
     */
    applyTheme() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Actualizar meta theme-color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', this.isDarkMode ? '#1E1E1E' : '#2E7D32');
        }

        // Redibujar gráfico si es necesario
        if (window.stats) {
            setTimeout(() => window.stats.drawChart(), 100);
        }
    }

    /**
     * Guarda la preferencia de tema
     */
    saveThemePreference() {
        localStorage.setItem('theme-preference', this.isDarkMode ? 'dark' : 'light');
    }

    /**
     * Carga la preferencia de tema guardada
     * @returns {boolean} true si está en dark mode
     */
    loadThemePreference() {
        const saved = localStorage.getItem('theme-preference');
        
        if (saved) {
            return saved === 'dark';
        }

        // Por defecto: light mode
        return false;
    }

    /**
     * Configura la aplicación como PWA
     */
    setupPWA() {
        // Intentar registrar service worker solo en contextos seguros
        // En file:// funcionará igual sin problemas
        if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
            navigator.serviceWorker.register('sw.js').catch(() => {
                // Service worker no disponible, ok - la app funciona sin él
            });
        }

        // Intentar cargar manifest si existe
        const manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        manifestLink.href = 'manifest.json';
        manifestLink.onerror = () => {
            // Manifest no disponible, ok - PWA funciona sin él
        };
        // No agregarlo al head si no es necesario para evitar CORS
    }

        // Prevenir zoom en inputs
        document.addEventListener('gesturestart', (e) => {
            e.preventDefault();
        });

        // Manejar el evento de instalación
        window.addEventListener('beforeinstallprompt', (e) => {
            // Guardar el evento para poder usarlo cuando el usuario lo solicite
            window.deferredPrompt = e;
        });
    }

    /**
     * Oculta el loader
     */
    disableLoader() {
        // Ocultar inmediatamente después de que los scripts cargen
        try {
            if (this.loader) {
                this.loader.classList.remove('active');
            }
        } catch (e) {
            console.log('Loader deshabilitado');
        }
    }

    /**
     * Muestra el loader
     */
    showLoader() {
        this.loader.classList.add('active');
    }

    /**
     * Oculta el loader
     */
    hideLoader() {
        this.loader.classList.remove('active');
    }

    /**
     * Obtiene información de la app
     * @returns {Object} Información
     */
    getAppInfo() {
        return {
            name: 'VetCalc',
            version: '1.0.0',
            description: 'Asistente Veterinario - Calculadora de Posología, Vacunas y Estadísticas',
            isDarkMode: this.isDarkMode,
            currentSection: this.currentSection
        };
    }

    /**
     * Maneja errores globales
     */
    setupErrorHandler() {
        window.addEventListener('error', (event) => {
            console.error('Error:', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Promise rejection:', event.reason);
        });
    }
}

// Inicializar la aplicación cuando el DOM esté listo
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new VetCalcApp();
    });
} else {
    app = new VetCalcApp();
}

// Funciones globales para acceso desde eventos inline (si es necesario)
window.switchSection = (sectionId) => {
    if (app) app.switchSection(sectionId);
};

window.toggleTheme = () => {
    if (app) app.toggleTheme();
};
