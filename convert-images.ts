const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

function convertToWebp(sourceDir: string, destDir: string, quality: number) {
  const items = fs.readdirSync(sourceDir);

  items.forEach((item: any) => {
    const sourcePath = path.join(sourceDir, item);
    const destPath = path.join(destDir, item);

    if (fs.statSync(sourcePath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      convertToWebp(sourcePath, destPath, quality);
    } else if (path.extname(item).match(/.(jpg|jpeg|png|gif)$/i)) {
      console.log(`Converting ${sourcePath} to webp...`);
      sharp(sourcePath)
        .webp({ quality })
        .toFile(destPath.replace(path.extname(destPath), ".webp"))
        .then(() => console.log(`Converted ${sourcePath} to webp.`));
    } else if (path.extname(item).match(/.webp$/i)) {
      console.log(`Copying ${sourcePath} to destination...`);
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${sourcePath} to destination.`);
    }
  });
}

// Call the function
convertToWebp("./images-to-convert", "./public/assets/images", 75);
