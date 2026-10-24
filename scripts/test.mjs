import test from 'node:test';import assert from 'node:assert/strict';import {buildMessage,whatsappUrl,escapeHTML} from '../lib.js';
test('WhatsApp brief preserves every answer and special characters',()=>{const a={services:['Photography','Motion Graphics'],industry:'Food & dairy',location:'Newport Beach / Orange County',engagement:'Ongoing monthly work',timeline:'Flexible',name:'A & B',business:'Hana + Co',details:'Launch #1\nNew idea?'};const text=buildMessage(a);for(const v of Object.values(a).flat())assert.ok(text.includes(v));const url=new URL(whatsappUrl('19492573300',text));assert.equal(url.searchParams.get('text'),text);assert.equal(url.pathname,'/19492573300');});
test('Missing optional fields remain explicit',()=>{assert.ok(buildMessage({services:['Video'],name:'Jane'}).includes('Business name: Not provided'));});
test('Inserted content is escaped',()=>{assert.equal(escapeHTML('<script>"&'), '&lt;script&gt;&quot;&amp;');});
test('WhatsApp rejects formatted phone numbers',()=>{assert.throws(()=>whatsappUrl('+1 (949)','test'));});

import {renderMetadata} from './metadata.mjs';
import {content} from '../content.js';
test('Sharing metadata has one absolute HTTPS image for Open Graph and Twitter',()=>{const html=renderMetadata(content);const image=new URL(content.seo.image,content.seo.siteUrl).href;assert.equal(new URL(image).protocol,'https:');assert.ok(html.includes(`property="og:site_name" content="HANA Media House"`));assert.ok(html.includes(`property="og:image" content="${image}"`));assert.ok(html.includes(`name="twitter:image" content="${image}"`));assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));assert.equal((html.match(/property="og:image" /g)||[]).length,1);});
