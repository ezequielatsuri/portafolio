const translations = {
  es: {
    nav_home: "Inicio",
    nav_about: "Sobre Mí",
    nav_skills: "Habilidades",
    nav_projects: "Proyectos",
    nav_contact: "Contacto",
    nav_available: "Disponible",
    nav_download_cv: "📄 Descargar CV",
    footer_desc: "Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales, enfocadas en rendimiento, accesibilidad y diseño moderno.",
    footer_nav: "Navegación",
    footer_legal: "Legal",
    footer_privacy: "Política de Privacidad",
    footer_rights: "Todos los derechos reservados.",
    footer_designed: "Hecho con ❤ por Ezequiel Atsuri"
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_contact: "Contact",
    nav_available: "Available",
    nav_download_cv: "📄 Download CV",
    footer_desc: "Full Stack Developer passionate about creating exceptional digital experiences, focused on performance, accessibility, and modern design.",
    footer_nav: "Navigation",
    footer_legal: "Legal",
    footer_privacy: "Privacy Policy",
    footer_rights: "All rights reserved.",
    footer_designed: "Designed with ❤ by Ezequiel Atsuri"
  }
};

class I18nManager {
    constructor() {
        // Retrieve language from localStorage, or default to Spanish
        this.currentLang = localStorage.getItem('lang') || 'es';
        this.applyTranslations();
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
            this.applyTranslations();
            
            // Dispatch event for components to react (like the language selector)
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        }
    }

    get(key) {
        return translations[this.currentLang][key] || key;
    }

    applyTranslations() {
        document.documentElement.lang = this.currentLang;
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[this.currentLang][key]) {
                el.innerHTML = translations[this.currentLang][key];
            }
        });
    }
}

// Initialize globally so it runs immediately on script load
window.i18n = new I18nManager();

// Automatically apply when DOM is fully parsed
document.addEventListener('DOMContentLoaded', () => {
    window.i18n.applyTranslations();
});
