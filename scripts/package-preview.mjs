import {readFile,writeFile,mkdir,readdir,cp} from 'node:fs/promises';
const output=process.argv[2];if(!output)throw Error('Provide output directory');await mkdir(output,{recursive:true});
let html=await readFile('dist/index.html','utf8');const css=await readFile('styles.css','utf8');
let config=(await readFile('content.js','utf8')).replace('export const content','const content');let lib=(await readFile('lib.js','utf8')).replaceAll('export function','function');let app=(await readFile('app.js','utf8')).replace(/^import .*;\n/gm,'');app='const c=content;const e=escapeHTML;\n'+app;
html=html.replace('<link rel="stylesheet" href="styles.css">',`<style>${css}</style>`).replace('<script type="module" src="app.js"></script>','');
html=html.replace('</body>',`<script type="module">${config}\n${lib}\n${app}</script></body>`);
for(const entry of await readdir('assets',{recursive:true,withFileTypes:true})){
 if(!entry.isFile())continue;
 const file=(entry.parentPath||entry.path)+'/'+entry.name;
 if(entry.name.endsWith('.mp4')){const target=output+'/'+file;await mkdir(target.slice(0,target.lastIndexOf('/')),{recursive:true});await cp(file,target);continue;}
 const type=entry.name.endsWith('.svg')?'image/svg+xml':entry.name.endsWith('.webp')?'image/webp':'image/png';const uri=`data:${type};base64,${(await readFile(file)).toString('base64')}`;html=html.replaceAll(file,uri);
}
await writeFile(output+'/HANA-preview.html',html);console.log('Standalone preview written.');
