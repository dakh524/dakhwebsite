const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Match Privacy Policy links with href="#" and replace with href="/privacy-policy"
  // It looks like: <a ... href="#" ... >Privacy Policy</a>
  const regex = /<a([^>]*)href="#"([^>]*)>Privacy Policy<\/a>/g;
  
  content = content.replace(regex, (match, p1, p2) => {
    return `<a${p1}href="/privacy-policy"${p2}>Privacy Policy</a>`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
};

const walkSync = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkSync(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      replaceInFile(filePath);
    }
  }
};

walkSync(srcPath);
console.log('Privacy Link Update Complete.');
