// Shared by the build and metadata checks; crawlers receive tags in the initial HTML.
export function renderMetadata(content){
 const seo=content.seo;
 const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 const origin=new URL(seo.siteUrl),image=new URL(seo.image,origin);
 if(origin.protocol!=='https:'||image.protocol!=='https:')throw Error('Sharing metadata requires HTTPS URLs');
 const tag=(key,value,property=false)=>`<meta ${property?'property':'name'}="${key}" content="${escape(value)}">`;
 return [`<title>${escape(seo.title)}</title>`,tag('description',seo.description),`<link rel="canonical" href="${escape(origin.href)}">`,
 ...Object.entries({'og:site_name':seo.siteName,'og:title':seo.title,'og:description':seo.description,'og:type':'website','og:locale':'en_US','og:url':origin.href,'og:image':image.href,'og:image:secure_url':image.href,'og:image:type':'image/jpeg','og:image:width':'1200','og:image:height':'630','og:image:alt':seo.imageAlt}).map(([k,v])=>tag(k,v,true)),
 ...Object.entries({'twitter:card':'summary_large_image','twitter:title':seo.title,'twitter:description':seo.description,'twitter:image':image.href,'twitter:image:alt':seo.imageAlt}).map(([k,v])=>tag(k,v))].join('\n');
}
