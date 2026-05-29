const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const htmlFiles = ['index.html', 'about.html', 'skills.html', 'projects.html', 'contact.html', 'privacy.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');

    if (!content.includes('assets/js/i18n.js')) {
        content = content.replace('<!-- Components -->', `<!-- i18n & Components -->\n    <script src="assets/js/i18n.js"></script>`);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Added i18n script to: ${file}`);
});
