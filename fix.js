const fs = require('fs');
const path = 'c:/Users/HP 1030 G3/Downloads/CERTIFICATES UDEMY/Acadia/apps/web/src/app/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/className=\{w-12 h-12[^\}]*\}/g, 'className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${course.light} ${course.text}`}');

content = content.replace(/\{course\.lecturer\}[^\{]*\{course\.level\}/g, '{course.lecturer} • {course.level}');

content = content.replace(/className=\{h-full rounded-full \}[^>]*>/g, 'className={`h-full rounded-full ${course.color}`} style={{ width: `${course.progress}%` }}>');

content = content.replace(/className=\{w-8 h-8[^\}]*\}/g, 'className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${item.light}`}');

content = content.replace(/Ayomide \?\?/g, 'Ayomide 👋');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixes applied.');
