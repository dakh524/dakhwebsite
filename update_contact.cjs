const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Replace contact@dakhedusolutions.in with dakhedusolution@gmail.com
  content = content.replace(/contact@dakhedusolutions\.in/g, 'dakhedusolution@gmail.com');

  // 2. Update Contact Us links to trigger alert and WhatsApp
  // We need to match href="#" >Contact Us</a> or similar
  // It looks like:
  // <a className="hover:text-[#00D1FF] transition-colors" href="#">Contact Us</a>
  // OR
  // <a className="text-slate-400 hover:text-[#00D1FF] transition-colors text-xs" href="#">Contact Us</a>
  // OR
  // <a className="text-slate-400 hover:text-[#00D1FF] transition-colors" href="#">Contact Us</a>
  // OR
  // <a className="font-['Inter'] text-xs text-slate-400 hover:text-[#00D1FF] transition-colors" href="#">Contact Us</a>

  // Let's replace the whole tag.
  const regex = /<a([^>]*)href="[^"]*"([^>]*)>Contact Us<\/a>/g;
  
  content = content.replace(regex, (match, p1, p2) => {
    // Reconstruct the tag with new click handler and href
    // We will use alert and open window.
    return `<a${p1}href="https://wa.me/918667399640" target="_blank" rel="noopener noreferrer" onClick={(e) => { alert('Contact: dakhedusolution@gmail.com'); }}${p2}>Contact Us</a>`;
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
console.log('Contact Update Complete.');
