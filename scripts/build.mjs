import {mkdir,rm,cp,readFile,writeFile} from 'node:fs/promises';
import {content} from '../content.js';
import {renderMetadata} from './metadata.mjs';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const file of ['index.html','styles.css','app.js','content.js','lib.js','assets'])await cp(file,`dist/${file}`,{recursive:true});
let html=await readFile('dist/index.html','utf8');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
html=html.replace(/<!-- site-meta:start -->[\s\S]*?<!-- site-meta:end -->/,()=>`<!-- site-meta:start -->${renderMetadata(content)}<!-- site-meta:end -->`);
// Render the approved About text into initial HTML as well as the interactive page.
for(const [selector,value] of [['h2 data-text="copy.aboutTitle"',content.copy.aboutTitle],['p class="about-copy" data-text="about"',content.about],['a href="#project" class="button" data-text="copy.aboutButton"',content.copy.aboutButton]]){
 const tag=selector.split(' ')[0];html=html.replace(new RegExp('<'+selector+'>[\\s\\S]*?</'+tag+'>'),()=>'<'+selector+'>'+esc(value)+'</'+tag+'>');
}
html=html.replace(/<ul id="advantages" class="advantages">[\s\S]*?<\/ul>/,()=>'<ul id="advantages" class="advantages">'+content.advantages.map(value=>'<li>'+esc(value)+'</li>').join('')+'</ul>');
const schema={'@context':'https://schema.org','@type':'ProfessionalService',name:content.brand.name,url:content.seo.siteUrl,image:new URL(content.seo.image,content.seo.siteUrl).href,telephone:content.brand.phone,address:{'@type':'PostalAddress',addressLocality:'Newport Beach',addressRegion:'CA',addressCountry:'US'},areaServed:['Newport Beach','Orange County','United States'],hasOfferCatalog:{'@type':'OfferCatalog',name:'Creative services',itemListElement:content.services.map(s=>({'@type':'Offer',itemOffered:{'@type':'Service',name:s.name,description:s.description}}))}};
html=html.replace('</head>',`<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script></head>`);
await writeFile('dist/index.html',html);await writeFile('dist/robots.txt','User-agent: *\nAllow: /\n'+(content.seo.siteUrl?`Sitemap: ${new URL('sitemap.xml',content.seo.siteUrl)}\n`:''));
if(content.seo.siteUrl)await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${esc(content.seo.siteUrl)}</loc></url></urlset>`);
console.log('Production build ready in dist/');
