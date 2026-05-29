class AppNavbar extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        const links = [
            { path: 'index.html', label: 'Inicio' },
            { path: 'about.html', label: 'Sobre Mí' },
            { path: 'skills.html', label: 'Habilidades' },
            { path: 'projects.html', label: 'Proyectos' },
            { path: 'contact.html', label: 'Contacto' }
        ];

        const desktopLinksHTML = links.map(link => {
            const isActive = currentPath === link.path || (currentPath === '' && link.path === 'index.html');
            const classes = isActive 
                ? 'text-blue-600 dark:text-blue-400 font-semibold transition-all duration-300'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium';
            return `<a href="${link.path}" class="${classes}">${link.label}</a>`;
        }).join('');

        const mobileLinksHTML = links.map(link => {
            const isActive = currentPath === link.path || (currentPath === '' && link.path === 'index.html');
            const classes = isActive 
                ? 'block px-4 py-3 text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20 rounded-xl transition-colors'
                : 'block px-4 py-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors';
            return `<a href="${link.path}" class="${classes}">${link.label}</a>`;
        }).join('');

        this.innerHTML = `
            <nav class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-slate-800/50 fixed w-full top-0 z-50 border-b border-blue-100 dark:border-slate-800 transition-colors duration-300">
                <div class="max-w-6xl mx-auto px-6">
                    <div class="flex justify-between items-center h-16">
                        <!-- Logo -->
                        <div class="flex items-center space-x-4">
                            <a href="index.html" class="flex items-center hover:opacity-80 transition-opacity" aria-label="Inicio">
                                <img src="assets/images/logo_ezequiel1.png" alt="Ezequiel Logo" class="h-12 w-auto dark:brightness-110 dark:contrast-125" />
                            </a>
                            <!-- Status Indicator -->
                            <div class="hidden lg:flex items-center space-x-2 bg-emerald-100/80 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50 backdrop-blur-sm">
                                <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                                <span class="text-emerald-700 dark:text-emerald-400 text-sm font-medium tracking-wide">Disponible</span>
                            </div>
                        </div>

                        <!-- Desktop Navigation -->
                        <div class="hidden lg:flex space-x-8 items-center">
                            ${desktopLinksHTML}
                            
                            <!-- Dark Mode Toggle -->
                            <button id="theme-toggle" type="button" class="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 rounded-lg text-sm p-2.5 transition-colors" aria-label="Alternar modo oscuro">
                                <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                                <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
                                </svg>
                            </button>
                            
                            <!-- CTA Button -->
                            <a href="assets/doc/cv.pdf" target="_blank" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-blue-500/30 dark:shadow-blue-900/40 inline-block focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                                📄 Descargar CV
                            </a>
                        </div>

                        <!-- Mobile menu button -->
                        <div class="lg:hidden flex items-center gap-2">
                            <!-- Dark Mode Toggle Mobile -->
                            <button id="theme-toggle-mobile" type="button" class="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none rounded-lg text-sm p-2 transition-colors" aria-label="Alternar modo oscuro móvil">
                                <svg class="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                                <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path></svg>
                            </button>
                            
                            <button id="mobile-menu-button" class="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none p-2 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Abrir menú">
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Mobile Navigation -->
                    <div id="mobile-menu" class="hidden absolute top-16 left-0 w-full px-4 pt-2 pb-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-blue-100 dark:border-slate-800 shadow-xl transition-all duration-300 opacity-0 -translate-y-4">
                        <div class="flex flex-col space-y-2">
                            ${mobileLinksHTML}
                            <div class="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
                                <a href="assets/doc/cv.pdf" target="_blank" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                                    📄 Descargar CV
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('app-navbar', AppNavbar);
