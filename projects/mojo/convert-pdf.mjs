import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless: 'new'});
const page = await browser.newPage();

await page.goto('file:///Users/ygutierrez/clawd/projects/mojo/tech-cheat-sheet-5x7.html', {waitUntil: 'networkidle0'});
await page.pdf({path: 'tech-cheat-sheet-5x7.pdf', width: '5in', height: '7in', printBackground: true, margin: {top: 0, right: 0, bottom: 0, left: 0}});
console.log('Created tech-cheat-sheet-5x7.pdf');

await page.goto('file:///Users/ygutierrez/clawd/projects/mojo/product-mix-guide-5x7.html', {waitUntil: 'networkidle0'});
await page.pdf({path: 'product-mix-guide-5x7.pdf', width: '5in', height: '7in', printBackground: true, margin: {top: 0, right: 0, bottom: 0, left: 0}});
console.log('Created product-mix-guide-5x7.pdf');

await browser.close();
console.log('Done!');
