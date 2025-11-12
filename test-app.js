const { findPagesDir } = require('next/dist/lib/find-pages-dir');

try {
  const pagesDir = findPagesDir(process.cwd());
  console.log('✅ Next.js found pages/app directory:', pagesDir);
} catch (error) {
  console.log('❌ Next.js cannot find pages/app directory:', error.message);
  console.log('Current directory:', process.cwd());
  console.log('Files in current directory:');
  const fs = require('fs');
  try {
    const files = fs.readdirSync(process.cwd());
    console.log(files.filter(f => f === 'app' || f === 'pages'));
  } catch (e) {
    console.log('Cannot read directory:', e.message);
  }
}
