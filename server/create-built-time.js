import fs from 'fs';

fs.writeFileSync('./server/built-time.js', `module.exports = '${new Date().toISOString()}';\n`);
console.log('Built-time file created successfully!');
