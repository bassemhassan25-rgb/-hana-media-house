import {mkdir,rm,cp,readFile,writeFile} from 'node:fs/promises';
import {content} from '../content.js';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const file of ['index.html','styles.css','app.js','content.js','lib.js','assets'])await cp(file,`dist/${file}`,{recursive:true});
let html=await readFile('dist/index.html','utf8');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
html=html.replace(/<title>.*?<\/title>/,`<title>${esc(content.seo.title)}</title>`).replace(/(<meta name="description" content=")[^"]*/,`$1${esc(content.seo.description)}`);
html=html.replace(/(<meta property="og:title" content=")[^"]*/,`$1${esc(content.seo.title)}`).replace(/(<meta property="og:description" content=")[^"]*/,`$1${esc(content.seo.description)}`);
const schema={'@context':'https://schema.org','@type':'ProfessionalService',name:content.brand.name,telephone:content.brand.phone,address:{'@type':'PostalAddress',addressLocality:'Newport Beach',addressRegion:'CA',addressCountry:'US'},areaServed:['Newport Beach','Orange County','United States'],hasOfferCatalog:{'@type':'OfferCatalog',name:'Creative services',itemListElement:content.services.map(s=>({'@type':'Offer',itemOffered:{'@type':'Service',name:s.name,description:s.description}}))}};
html=html.replace('</head>',`<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script></head>`);
if(content.seo.siteUrl){const url=new URL(content.seo.siteUrl);html=html.replace('</head>',`<link rel="canonical" href="${esc(url.href)}"><meta property="og:url" content="${esc(url.href)}"></head>`).replace('content="assets/og-image.png"',`content="${esc(new URL('assets/og-image.png',url).href)}"`);}
await writeFile('dist/index.html',html);await writeFile('dist/robots.txt','User-agent: *\nAllow: /\n'+(content.seo.siteUrl?`Sitemap: ${new URL('sitemap.xml',content.seo.siteUrl)}\n`:''));
if(content.seo.siteUrl)await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${esc(content.seo.siteUrl)}</loc></url></urlset>`);
console.log('Production build ready in dist/');
