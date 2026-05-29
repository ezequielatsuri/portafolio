const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const htmlFiles = ['index.html', 'about.html', 'skills.html', 'projects.html', 'contact.html', 'privacy.html'];
const jsComponents = ['assets/js/components/navbar.js', 'assets/js/components/footer.js'];

// SEO & Open Graph Tags
const ogTags = `
    <!-- SEO & Open Graph -->
    <meta property="og:title" content="Ezequiel Atsuri - Desarrollador Full Stack">
    <meta property="og:description" content="Portafolio de Ezequiel Atsuri, Desarrollador Full Stack especializado en rendimiento, accesibilidad y diseño moderno.">
    <meta property="og:image" content="https://ezequielatsuri.dev/assets/images/icono.webp">
    <meta property="og:url" content="https://ezequielatsuri.dev">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
`;

// Process HTML files
htmlFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Replace .png with .webp
    content = content.replace(/\.png/g, '.webp');
    content = content.replace(/\.jpg/g, '.webp');
    content = content.replace(/\.jpeg/g, '.webp');

    // 2. Add loading="lazy" to imgs that don't have it and are not the logo
    content = content.replace(/<img([^>]*)>/g, (match, attrs) => {
        if (!attrs.includes('loading=') && !attrs.includes('logo_ezequiel1')) {
            return `<img${attrs} loading="lazy">`;
        }
        return match;
    });

    // 3. Add OG Tags before </head> if not exists
    if (!content.includes('og:title')) {
        content = content.replace('</head>', `${ogTags}\n</head>`);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated HTML: ${file}`);
});

// Process JS Components
jsComponents.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Replace .png with .webp
    content = content.replace(/\.png/g, '.webp');
    content = content.replace(/\.jpg/g, '.webp');
    content = content.replace(/\.jpeg/g, '.webp');

    // 2. Add loading="lazy" to imgs that don't have it and are not the logo
    content = content.replace(/<img([^>]*)>/g, (match, attrs) => {
        if (!attrs.includes('loading=') && !attrs.includes('logo_ezequiel1')) {
            return `<img${attrs} loading="lazy">`;
        }
        return match;
    });

    fs.writeFileSync(filePath, content);
    console.log(`Updated Component: ${file}`);
});
