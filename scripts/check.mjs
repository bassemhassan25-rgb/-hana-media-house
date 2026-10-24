import {readFile,access} from 'node:fs/promises';import assert from 'node:assert/strict';import {content} from '../content.js';
assert.equal(content.services.length,6);assert.equal(content.categories.length,6);assert.match(content.brand.whatsapp,/^\d+$/);
const html=await readFile('index.html','utf8');for(const [,id]of content.nav)assert.ok(html.includes(`id="${id}"`),`Missing anchor ${id}`);
for(const item of [...content.portfolio,...content.food.cards]){await access(item.image);assert.ok(item.alt);if(item.video)await access(item.video);}
for(const file of ['app.js','styles.css','lib.js','assets/favicon.svg'])await access(file);
console.log('Content, navigation and local asset checks passed.');
