const fs = require('fs');
const path = 'c:/Users/HP 1030 G3/Downloads/CERTIFICATES UDEMY/Acadia/apps/web/src/app/layout.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/className=\{\$\{inter\.variable\} h-full antialiased\}/g, 'className={`${inter.variable} h-full antialiased`}');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixes applied to layout.tsx');
