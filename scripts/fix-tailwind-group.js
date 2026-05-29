const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../projects.html');
let content = fs.readFileSync(filePath, 'utf-8');

content = content.replace(/group-hover\/carousel:opacity-100/g, 'group-hover:opacity-100');
content = content.replace(/group\/carousel/g, '');

fs.writeFileSync(filePath, content);
console.log('Fixed Tailwind group-hover syntax in projects.html');
