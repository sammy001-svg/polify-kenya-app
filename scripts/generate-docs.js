/* eslint-disable @typescript-eslint/no-require-imports */
const markdownpdf = require("markdown-pdf");
const path = require("path");

const sourcePath = path.join(__dirname, "..", "PROJECT_DOCUMENTATION.md");
const destPath = path.join(__dirname, "..", "public", "PROJECT_DOCUMENTATION.pdf");

console.log("Generating documentation PDF...");

markdownpdf()
  .from(sourcePath)
  .to(destPath, function () {
    console.log("Done");
    console.log(`Documentation generated at: ${destPath}`);
  });
