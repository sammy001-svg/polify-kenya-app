/* eslint-disable @typescript-eslint/no-require-imports */
const markdownpdf = require("markdown-pdf");
const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "..", "MARKETING_DOCUMENTATION.md");
const destPath = path.join(__dirname, "..", "public", "MARKETING_PRESENTATION.pdf");

console.log("Generating marketing presentation PDF with embedded images...");

const options = {
    cssPath: path.join(__dirname, "pdf-styles.css"),
    remarkable: {
        html: true,
        breaks: true
    }
};

// Create a temporary CSS file for styling images
const cssContent = `
    img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        margin: 20px 0;
    }
    body {
        font-family: 'Helvetica', 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
    }
    h1, h2, h3 {
        color: #004d00; /* Dark Green */
    }
`;

fs.writeFileSync(path.join(__dirname, "pdf-styles.css"), cssContent);

// Function to embed images as base64
function embedImages(markdown) {
    const imgRegex = /!\[.*?\]\((.*?)\)/g;
    return markdown.replace(imgRegex, (match, imgPath) => {
        try {
            // Resolve path (assuming relative to project root or absolute)
            let absolutePath = imgPath;
            if (!path.isAbsolute(imgPath)) {
                 // Handle relative paths like ./public/...
                 absolutePath = path.join(__dirname, "..", imgPath);
            } else if (imgPath.startsWith('file:///')) {
                 // Handle file URI
                 absolutePath = new URL(imgPath).pathname;
                 // Fix for Windows paths in URL if needed (e.g. /c:/...)
                 if (process.platform === 'win32' && absolutePath.match(/^\/[a-zA-Z]:/)) {
                     absolutePath = absolutePath.substring(1);
                 }
                 absolutePath = decodeURIComponent(absolutePath);
            }

            if (fs.existsSync(absolutePath)) {
                console.log(`Embedding image: ${absolutePath}`);
                const bitmap = fs.readFileSync(absolutePath);
                const base64 = Buffer.from(bitmap).toString('base64');
                const ext = path.extname(absolutePath).substring(1);
                // Return HTML img tag, ensuring line breaks don't break markdown (though HTML should be fine)
                return `<img src="data:image/${ext};base64,${base64}" alt="${match.match(/!\[(.*?)\]/)[1]}" style="width:100%"/>`;
            } else {
                console.warn(`Image not found: ${absolutePath}`);
                return match;
            }
        } catch (e) {
            console.error(`Error embedding image ${imgPath}:`, e);
            return match;
        }
    });
    
    return markdown;
}

// Read markdown, embed images, and generate PDF
try {
    let markdownContent = fs.readFileSync(sourcePath, 'utf8');
    markdownContent = embedImages(markdownContent);

    markdownpdf(options)
      .from.string(markdownContent)
      .to(destPath, function () {
        console.log("Done");
        console.log(`Marketing presentation generated at: ${destPath}`);
        // Clean up CSS file
        fs.unlinkSync(path.join(__dirname, "pdf-styles.css"));
      });
} catch (err) {
    console.error("Error generating PDF:", err);
}
