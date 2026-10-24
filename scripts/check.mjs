import {readFile,access} from 'node:fs/promises';import assert from 'node:assert/strict';import {content} from '../content.js';
assert.equal(content.services.length,6);assert.equal(content.categories.length,6);assert.match(content.brand.whatsapp,/^\d+$/);
const html=await readFile('index.html','utf8');for(const [,id]of content.nav)assert.ok(html.includes(`id="${id}"`),`Missing anchor ${id}`);
for(const item of [...content.portfolio,...content.food.cards,...content.gulf.items,...content.healthcare.items,...content.fitness.items]){await access(item.image);assert.ok(item.alt);if(item.video)await access(item.video);}
for(const file of ['app.js','styles.css','lib.js','assets/favicon.svg','assets/hero-camera.svg','assets/hana-brand-artwork.webp','assets/hana-brand-artwork-640.webp',content.seo.image])await access(file);
console.log('Content, navigation and local asset checks passed.');

assert.equal(new Set(content.gulf.items.map(item=>item.id)).size,content.gulf.items.length,'Gulf project IDs must be unique');

assert.equal(new Set(content.healthcare.items.map(item=>item.id)).size,content.healthcare.items.length,'Healthcare project IDs must be unique');

assert.equal(new Set(content.fitness.items.map(item=>item.id)).size,content.fitness.items.length,'Fitness project IDs must be unique');
