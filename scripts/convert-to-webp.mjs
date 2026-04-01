import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';
const targetImages = [
  'Gemini_Generated_Image_76siap76siap76si.png',
  'Gemini_Generated_Image_iy8s1viy8s1viy8s (1).png',
  'Gemini_Generated_Image_iy8s1viy8s1viy8s (2).png',
  'Gemini_Generated_Image_iy8s1viy8s1viy8s.png',
  'poli-landing-v2-2.png',
  'poli-landing-v2-3.png',
  'ChatGPT Image Mar 24, 2026, 03_31_04 PM.png',
  'ChatGPT Image Mar 24, 2026, 08_05_59 AM.png',
  'images/Gemini_Generated_Image_cf1csbcf1csbcf1c.png',
  'images/african-american-business-man-using-laptop-cafe.jpg',
  'images/american-elections-vote-right.jpg',
  'images/freepik__assistant__36565.png',
  'images/two-women-viewing-content-phone-local-african-market.jpg'
];

async function convertImages() {
  console.log('Starting conversion to WebP...');

  for (const imageName of targetImages) {
    const inputPath = path.join(publicDir, imageName);
    const outputName = imageName.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const outputPath = path.join(publicDir, outputName);

    if (fs.existsSync(inputPath)) {
      if (fs.existsSync(outputPath)) {
        console.log(`Skipping ${imageName} (already exists)`);
        continue;
      }
      try {
        const stats = fs.statSync(inputPath);
        console.log(`Processing ${imageName} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);

        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        console.log(`Successfully converted to ${outputName} (${(newStats.size / 1024 / 1024).toFixed(2)} MB)`);
        console.log(`Reduction: ${(((stats.size - newStats.size) / stats.size) * 100).toFixed(2)}%`);
      } catch (err) {
        console.error(`Error converting ${imageName}:`, err);
      }
    } else {
      console.warn(`File not found: ${inputPath}`);
    }
  }

  console.log('Conversion complete!');
}

convertImages();
