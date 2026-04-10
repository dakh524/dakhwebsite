const fs = require('fs');
const path = require('path');

const baseDir = '../stitch_dakh_edu_3d_website';
const outputDir = './src/pages';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function convertHtmlToJsx(html) {
    // Extract body content
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyHtml = bodyMatch ? bodyMatch[1] : html;

    // Remove script tags from body
    bodyHtml = bodyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Replace class= with className=
    bodyHtml = bodyHtml.replace(/class=/g, 'className=');

    // Replace for= with htmlFor=
    bodyHtml = bodyHtml.replace(/for=/g, 'htmlFor=');

    // Fix self-closing tags: img, input, br, hr
    bodyHtml = bodyHtml.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/gi, '<$1$2 />');

    // Handle inline styles (simple remove or comment out because style="string" breaks JSX)
    bodyHtml = bodyHtml.replace(/style="[^"]*"/g, '');

    // Replace <!-- --> with {/* */}
    bodyHtml = bodyHtml.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

    return bodyHtml;
}

const pages = [
    { dir: 'home_dakh_edu_solution', componentName: 'Home' },
    { dir: 'about_us_dakh_edu_solution', componentName: 'About' },
    { dir: 'courses_dakh_edu_solution', componentName: 'Courses' },
    { dir: 'internships_dakh_edu_solution', componentName: 'Internships' },
    { dir: 'services_dakh_edu_solution', componentName: 'Services' },
    { dir: 'services_updated_dakh_edu_solution', componentName: 'ServicesUpdated' },
    { dir: 'tools_made_by_us_dakh_edu_solution', componentName: 'Tools' },
    { dir: 'useful_tools_dakh_edu_solution', componentName: 'UsefulTools' }
];

pages.forEach(page => {
    const htmlFile = path.join(baseDir, page.dir, 'code.html');
    if (fs.existsSync(htmlFile)) {
        const html = fs.readFileSync(htmlFile, 'utf8');
        const jsxBody = convertHtmlToJsx(html);
        
        const fileContent = `import React from 'react';\n\nexport default function ${page.componentName}() {\n  return (\n    <>\n${jsxBody}\n    </>\n  );\n}\n`;
        fs.writeFileSync(path.join(outputDir, `${page.componentName}.jsx`), fileContent);
        console.log(`Converted ${page.componentName}`);
    } else {
        console.log(`File not found: ${htmlFile}`);
    }
});
