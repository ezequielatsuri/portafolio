const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '../assets/images');

async function processImages() {
    const files = fs.readdirSync(imagesDir);
    
    for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);
            const webpName = `${baseName}.webp`;
            const webpPath = path.join(imagesDir, webpName);
            const originalPath = path.join(imagesDir, file);
            
            try {
                await sharp(originalPath)
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                
                console.log(`Converted ${file} to ${webpName}`);
                // Optional: Delete the original to keep things clean
                // fs.unlinkSync(originalPath);
            } catch (error) {
                console.error(`Error converting ${file}:`, error);
            }
        }
    }
}

processImages();
