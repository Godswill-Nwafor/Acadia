const fs = require('fs');
const path = 'c:/Users/HP 1030 G3/Downloads/CERTIFICATES UDEMY/Acadia/apps/web/src/app/dashboard/lecturer/page.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/className=\{w-8 h-8[^\}]*\}/g, 'className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${item.light}`}');

content = content.replace(/Dr\. John \?\?/g, 'Dr. John 👋');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixes applied to lecturer/page.tsx');
