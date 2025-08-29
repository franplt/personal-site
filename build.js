const fs = require('fs');
const path = require('path');

const outDir = '_site';
const pages = [
  'about.html',
  'experience.html',
  'writing.html',
  'links.html',
  '404.html',
  'index.html',
  'style.css',
  'script.js',
  'robots.txt',
  'sitemap.xml'
];

function processIncludes(content) {
  const include = (_, includePath) => {
    const filePath = path.join(__dirname, includePath);
    return fs.readFileSync(filePath, 'utf8');
  };
  content = content.replace(/<!--#include \"([^\"]+)\" -->/g, include);
  content = content.replace(/<div\s+data-include="([^"]+)"\s*><\/div>/g, include);
  return content;
}

function build() {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  for (const file of pages) {
    const srcPath = path.join(__dirname, file);
    let content = fs.readFileSync(srcPath, 'utf8');
    if (path.extname(file) === '.html') {
      content = processIncludes(content);
    }
    const outPath = path.join(outDir, file);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, content);
  }

  fs.cpSync(path.join(__dirname, 'assets'), path.join(outDir, 'assets'), { recursive: true });
}

build();
