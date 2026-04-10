const fs = require('fs');
const path = require('path');

const pagesDir = './src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Only modify the generated pages, not the Admin ones
  if (file.startsWith('Admin')) return;
  
  // Remove <nav>...</nav> block
  content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/i, '');
  
  fs.writeFileSync(filePath, content);
  console.log(`Cleaned nav from ${file}`);
});
