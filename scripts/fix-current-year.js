const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const htmlFiles = ['index.html', 'about.html', 'skills.html', 'projects.html', 'contact.html', 'privacy.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    const targetLine = "        document.getElementById('current-year').textContent = new Date().getFullYear();\n";
    const targetLine2 = "        document.getElementById('current-year').textContent = new Date().getFullYear();";
    
    if (content.includes(targetLine)) {
        content = content.replace(targetLine, '');
        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${file}`);
    } else if (content.includes(targetLine2)) {
        content = content.replace(targetLine2, '');
        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${file}`);
    }
});
