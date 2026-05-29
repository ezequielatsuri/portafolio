class AppFooter extends HTMLElement {
    connectedCallback() {
        const currentYear = new Date().getFullYear();
        
        this.innerHTML = `
            <footer class="bg-slate-950 text-slate-400 border-t border-slate-900 py-16 transition-colors duration-300">
                <div class="max-w-6xl mx-auto px-6">
                    <div class="grid md:grid-cols-12 gap-12 lg:gap-8">
                        <!-- Brand Section -->
                        <div class="md:col-span-6 lg:col-span-5">
                            <div class="flex items-center mb-6">
                                <img src="assets/images/icono.png" alt="Logo Ezequiel Atsuri" class="w-10 h-10 rounded-lg mr-4 shadow-lg shadow-blue-500/20 object-contain bg-white dark:bg-slate-800 p-0.5">
                                <h3 class="text-2xl font-bold text-white font-outfit">Ezequiel Atsuri</h3>
                            </div>
                            <p class="mb-8 leading-relaxed text-sm">
                                Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales, enfocadas en rendimiento, accesibilidad y diseño moderno.
                            </p>
                            <div class="flex space-x-3">
                                <a href="https://github.com/ezequielatsuri" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="w-10 h-10 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg flex items-center justify-center hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
                                </a>
                                <a href="https://www.linkedin.com/in/ezequielatsuri/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-10 h-10 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </a>
                                <a href="https://x.com/ezequielatsuri" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" class="w-10 h-10 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg flex items-center justify-center hover:bg-sky-500 hover:text-white hover:border-sky-400 transition-all duration-300">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                </a>
                            </div>
                        </div>

                        <!-- Navigation Links -->
                        <div class="md:col-span-3 lg:col-span-2 lg:col-start-8">
                            <h4 class="text-white font-semibold mb-6">Navegación</h4>
                            <ul class="space-y-3 text-sm">
                                <li><a href="index.html" class="hover:text-blue-400 transition-colors">Inicio</a></li>
                                <li><a href="about.html" class="hover:text-blue-400 transition-colors">Sobre Mí</a></li>
                                <li><a href="skills.html" class="hover:text-blue-400 transition-colors">Habilidades</a></li>
                                <li><a href="projects.html" class="hover:text-blue-400 transition-colors">Proyectos</a></li>
                                <li><a href="contact.html" class="hover:text-blue-400 transition-colors">Contacto</a></li>
                            </ul>
                        </div>

                        <!-- Legal Links -->
                        <div class="md:col-span-3 lg:col-span-2">
                            <h4 class="text-white font-semibold mb-6">Legal</h4>
                            <ul class="space-y-3 text-sm">
                                <li><a href="privacy.html" class="hover:text-blue-400 transition-colors">Política de Privacidad</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Bottom Section -->
                    <div class="border-t border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                        <p>© <span>${currentYear}</span> Ezequiel Atsuri. Todos los derechos reservados.</p>
                        <p class="mt-2 md:mt-0 flex items-center">
                            Diseñado con <span class="text-rose-500 mx-1">❤</span> por Ezequiel Atsuri
                        </p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
