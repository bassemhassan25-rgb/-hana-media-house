import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
const output=process.argv[2];if(!output)throw Error('Provide output directory');await mkdir(output,{recursive:true});
let html=await readFile('dist/index.html','utf8');const css=await readFile('styles.css','utf8');
let config=(await readFile('content.js','utf8')).replace('export const content','const content');let lib=(await readFile('lib.js','utf8')).replaceAll('export function','function');let app=(await readFile('app.js','utf8')).replace(/^import .*;\n/gm,'');app='const c=content;const e=escapeHTML;\n'+app;
html=html.replace('<link rel="stylesheet" href="styles.css">',`<style>${css}</style>`).replace('<script type="module" src="app.js"></script>','');
html=html.replace('</body>',`<script type="module">${config}\n${lib}\n${app}</script></body>`);
for(const file of await readdir('assets')){const type=file.endsWith('.svg')?'image/svg+xml':'image/png';const uri=`data:${type};base64,${(await readFile('assets/'+file)).toString('base64')}`;html=html.replaceAll('assets/'+file,uri);}
await writeFile(output+'/HANA-preview.html',html);console.log('Standalone preview written.');
