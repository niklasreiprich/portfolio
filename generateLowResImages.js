import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff'];

// Input and output directories
const inputDir = './public/images/highres';
const outputDir = './public/images/lowres';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to process files recursively
const processFiles = (dir) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Could not list the directory.', err);
      process.exit(1);
    }

    files.forEach((file) => {
      const inputFilePath = path.join(dir, file.name);
      const relativePath = path.relative(inputDir, inputFilePath);
      const outputFilePath = path.join(outputDir, relativePath);
      const ext = path.extname(file.name).toLowerCase();

      if (file.isDirectory()) {
        // Create the corresponding output directory
        if (!fs.existsSync(outputFilePath)) {
          fs.mkdirSync(outputFilePath, { recursive: true });
        }
        // Recursively process the directory
        processFiles(inputFilePath);
      } else if (supportedFormats.includes(ext)) {
        // Process only supported image formats
        sharp(inputFilePath)
          .resize(250) // Adjust the size as needed
          .toFile(outputFilePath, (err) => {
            if (err) {
              console.error('Error processing file.', err);
            } else {
              console.log(`Generated low-res image for ${file.name}`);
            }
          });
      } else {
        console.log(`Skipping unsupported file format: ${file.name}`);
      }
    });
  });
};

// Start processing files from the input directory
processFiles(inputDir);
