const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Replace Company Name
  // First handle DAKH EDU SOLUTION and DAKH EDU
  content = content.replace(/DAKH EDU SOLUTION/g, 'DAKH EDU SOLUTIONS');
  content = content.replace(/DAKH EDU(?!\s*SOLUTIONS)/g, 'DAKH EDU SOLUTIONS');
  content = content.replace(/Dakh Edu(?!\s+Solutions)/g, 'Dakh Edu Solutions');

  // 2. Replace Emails
  content = content.replace(/orbital@dakhedu\.com/g, 'contact@dakhedusolutions.in');
  content = content.replace(/contact@dakhedu\.com/g, 'contact@dakhedusolutions.in');

  // 3. Add Phone Numbers in Contact sections
  // Home.jsx specific structure
  const homeEmailBlock = `<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary">mail</span>
</div>
<span className="font-bold">contact@dakhedusolutions.in</span>
</div>`;

  const homePhoneBlock = `\n<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">call</span>
</div>
<span className="font-bold">+91 8667399640</span>
</div>`;
  
  if (content.includes(homeEmailBlock) && !content.includes('+91 8667399640')) {
    content = content.replace(homeEmailBlock, homeEmailBlock + homePhoneBlock);
  }

  // About.jsx specific structure
  const aboutEmailBlock = `<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="mail">mail</span>
</div>
<span>contact@dakhedusolutions.in</span>
</div>`;

  const aboutPhoneBlock = `\n<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="call">call</span>
</div>
<span>+91 8667399640</span>
</div>`;

  if (content.includes(aboutEmailBlock) && !content.includes('+91 8667399640')) {
    content = content.replace(aboutEmailBlock, aboutEmailBlock + aboutPhoneBlock);
  }

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
console.log('Update Complete.');
