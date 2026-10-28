import {content as c} from './content.js';
import {buildMessage, whatsappUrl, escapeHTML as e} from './lib.js';
const $=s=>document.querySelector(s);
const arrowUpRight='<svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 16 16 4M4 4h12v12"/></svg>';
const arrowRight='<svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 10h14m-6-6 6 6-6 6"/></svg>';
const playIcon='<svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m6 3 11 7-11 7Z"/></svg>';
for(const el of document.querySelectorAll('[data-text]')){el.textContent=el.dataset.text.split('.').reduce((a,k)=>a[k],c);}
$('h1').innerHTML=c.brand.heroLines.map(line=>e(line).replace(e(c.brand.heroEmphasis),`<em>${e(c.brand.heroEmphasis)}</em>`)).join('<br>');
document.title=c.seo.title;$('meta[name="description"]').content=c.seo.description;
$('meta[property="og:title"]').content=c.seo.title;$('meta[property="og:description"]').content=c.seo.description;
if(c.seo.siteUrl&&!$('link[rel="canonical"]')){const origin=new URL(c.seo.siteUrl);const canonical=document.createElement('link');canonical.rel='canonical';canonical.href=origin.href;document.head.append(canonical);const meta=document.createElement('meta');meta.setAttribute('property','og:url');meta.content=origin.href;document.head.append(meta);$('meta[property="og:image"]').content=new URL(c.seo.image,origin).href;}
const schema=document.createElement('script');schema.type='application/ld+json';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'ProfessionalService',name:c.brand.name,telephone:c.brand.phone,description:c.seo.description,address:{'@type':'PostalAddress',addressLocality:'Newport Beach',addressRegion:'CA',addressCountry:'US'},areaServed:['Newport Beach','Orange County','United States'],hasOfferCatalog:{'@type':'OfferCatalog',name:'Creative services',itemListElement:c.services.map(s=>({'@type':'Offer',itemOffered:{'@type':'Service',name:s.name,description:s.description,areaServed:s.area}}))},...(c.seo.siteUrl?{url:c.seo.siteUrl}:{}),sameAs:Object.values(c.social).filter(Boolean)});if(!$('script[type="application/ld+json"]'))document.head.append(schema);
const navHTML=c.nav.map(([name,id])=>`<a href="#${e(id)}">${e(name)}</a>`).join('');$('#navigation').innerHTML=navHTML;$('#footer-nav').innerHTML=navHTML;
for(const a of document.querySelectorAll('[data-email]'))a.href='mailto:'+c.brand.email;
for(const a of document.querySelectorAll('[data-wa]')){a.href=whatsappUrl(c.brand.whatsapp,'Hello HANA Media House, I’d like to discuss a creative project.');a.target='_blank';a.rel='noopener noreferrer';}
$('#services-grid').innerHTML=c.services.map((s,i)=>`<article class="service-card"><div class="service-top"><span class="service-icon" aria-hidden="true">${e(s.icon)}</span><span class="service-number">0${i+1} /</span></div><h3>${e(s.name)}</h3><p>${e(s.description)}</p><small>${e(s.area)}</small></article>`).join('');
$('#advantages').innerHTML=c.advantages.map(a=>`<li>${e(a)}</li>`).join('');
const menu=$('#menu-toggle');function closeMenu(){menu.setAttribute('aria-expanded','false');$('#navigation').classList.remove('open');}menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));$('#navigation').classList.toggle('open',open);});$('#navigation').addEventListener('click',ev=>{if(ev.target.closest('a'))closeMenu();});document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});document.addEventListener('click',ev=>{if(!ev.target.closest('header'))closeMenu();});
function cardHTML(item,index,group){return `<article class="work-card"><div class="work-image"><img src="${e(item.image)}" alt="${e(item.alt)}" loading="lazy" width="900" height="650">${item.placeholder?'<span class="placeholder-tag">ILLUSTRATIVE PLACEHOLDER</span>':''}<button class="play" data-group="${group}" data-index="${index}" aria-label="${item.video?'Play':'Preview'} ${e(item.title)}">${item.video?playIcon:arrowUpRight}</button></div><p class="category">${e(item.category)}</p><h3>${e(item.title)}</h3><p>${e(item.description)}</p></article>`;}
function renderPortfolio(category='All'){$('#portfolio').innerHTML=c.portfolio.map((item,i)=>({item,i})).filter(({item})=>category==='All'||item.category===category).map(({item,i})=>cardHTML(item,i,'portfolio')).join('');$('#filter-status').textContent=`Showing ${$('#portfolio').children.length} ${category==='All'?'portfolio':category} items.`;}
$('.filters').innerHTML=['All',...c.categories].map((x,i)=>`<button aria-pressed="${i===0}" data-filter="${e(x)}">${e(x)}</button>`).join('');$('.filters').addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;for(const x of $('.filters').children)x.setAttribute('aria-pressed',String(x===b));renderPortfolio(b.dataset.filter);});renderPortfolio();
$('#food-grid').innerHTML=c.food.cards.map((item,i)=>cardHTML(item,i,'food')).join('');
$('#gulf-grid').innerHTML=c.gulf.items.map((item,i)=>`<article class="work-card gulf-card" id="${e(item.id)}"><button class="gulf-thumbnail" data-group="gulf" data-index="${i}" aria-label="Play ${e(item.title)} — ${e(c.gulf.region)}" style="--media-ratio:${item.width}/${item.height}"><img src="${e(item.image)}" alt="${e(item.alt)}" loading="lazy" decoding="async" width="${item.width}" height="${item.height}"><span class="gulf-play" aria-hidden="true">${playIcon}</span><span class="gulf-duration" aria-hidden="true">${Math.floor(item.duration/60)}:${String(Math.round(item.duration)%60).padStart(2,'0')}</span></button><p class="category">${e(c.gulf.region)}</p><h3>${e(item.title)}</h3><p>${e(item.description)}</p></article>`).join('');
$('#healthcare-grid').innerHTML=c.healthcare.items.map((item,i)=>`<article class="work-card healthcare-card" id="${e(item.id)}"><button class="gulf-thumbnail" data-group="healthcare" data-index="${i}" aria-label="Play ${e(item.title)} — ${e(item.label)}" style="--media-ratio:${item.width}/${item.height}"><img src="${e(item.image)}" alt="${e(item.alt)}" loading="lazy" decoding="async" width="${item.width}" height="${item.height}"><span class="gulf-play" aria-hidden="true">${playIcon}</span><span class="gulf-duration" aria-hidden="true">${Math.floor(item.duration/60)}:${String(Math.round(item.duration)%60).padStart(2,'0')}</span></button><p class="category">${e(item.label)}</p><h3>${e(item.title)}</h3><p>${e(item.description)}</p></article>`).join('');
$('#fitness-grid').innerHTML=c.fitness.items.map((item,i)=>`<article class="work-card fitness-card" id="${e(item.id)}"><button class="gulf-thumbnail" data-group="fitness" data-index="${i}" aria-label="Play ${e(item.title)} — ${e(item.label)}" style="--media-ratio:${item.width}/${item.height}"><img src="${e(item.image)}" alt="${e(item.alt)}" loading="lazy" decoding="async" width="${item.width}" height="${item.height}"><span class="gulf-play" aria-hidden="true">${playIcon}</span><span class="gulf-duration" aria-hidden="true">${Math.floor(item.duration/60)}:${String(Math.round(item.duration)%60).padStart(2,'0')}</span></button><p class="category">${e(item.label)}</p><h3>${e(item.title)}</h3><p>${e(item.description)}</p></article>`).join('');
let mediaTrigger;
let reelController;
function openMedia(item,trigger){
 mediaTrigger=trigger;
 reelController?.pauseForPreview();
 $('#media-content').innerHTML=`${item.video?`<video controls playsinline preload="metadata" poster="${e(item.image)}" aria-label="${e(item.title)}"><source src="${e(item.video)}">Your browser cannot play this video.</video>`:`<img src="${e(item.image)}" alt="${e(item.alt)}">`}<h3>${e(item.title)}</h3><p>${e(item.description)}</p>${item.placeholder?'<p>Illustrative placeholder — no completed client project is represented. '+(item.video?'':'A project video has not been added yet.')+'</p>':''}`;
 $('#media-dialog').showModal();
 const video=$('#media-content video');
 if(!video)return;
 const report=message=>{if($('#media-content video')===video&&$('#video-status'))$('#video-status').textContent=message;};
 video.addEventListener('error',()=>report('This video could not be loaded. Please try the direct video link.'));
 $('#media-content').insertAdjacentHTML('beforeend',`<div class="video-tools"><label for="video-volume">Volume</label><input id="video-volume" type="range" min="0" max="1" step="0.05" value="1"><button type="button" id="video-mute" aria-pressed="false">Mute</button><button type="button" id="video-fullscreen">Fullscreen</button></div><p id="video-status" role="status"></p><a class="video-direct" href="${e(item.video)}" target="_blank" rel="noopener noreferrer">Open original video ${arrowUpRight}</a>`);
 $('#video-volume').addEventListener('input',event=>{video.volume=Number(event.target.value);video.muted=video.volume===0;});
 $('#video-mute').addEventListener('click',()=>{video.muted=!video.muted;});
 video.addEventListener('volumechange',()=>{if($('#media-content video')!==video)return;$('#video-mute').setAttribute('aria-pressed',String(video.muted));$('#video-mute').textContent=video.muted?'Unmute':'Mute';$('#video-volume').value=video.muted?0:video.volume;});
 $('#video-fullscreen').addEventListener('click',()=>{try{if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();else if(video.requestFullscreen)Promise.resolve(video.requestFullscreen()).catch(()=>report('Fullscreen is unavailable here. Try the player controls or open the original video.'));else report('Use the player controls or open the original video for fullscreen.');}catch{report('Use the player controls or open the original video for fullscreen.');}});
 video.play().catch(()=>report('Press Play in the video player to begin.'));
}
const mediaGroups={portfolio:c.portfolio,food:c.food.cards,gulf:c.gulf.items,healthcare:c.healthcare.items,fitness:c.fitness.items};
$('#selected-work').innerHTML=c.selectedWork.items.map((ref,i)=>{
 const item=mediaGroups[ref.group][ref.index];
 const label=item.label||c[ref.group].region||item.category;
 return `<article class="selected-item${i===2?' featured-wide':''}"><button class="selected-media" data-group="${e(ref.group)}" data-index="${ref.index}" aria-label="Play ${e(item.title)}"><img src="${e(item.image)}" alt="${e(item.alt)}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async"><span class="selected-watch">Watch film ${arrowUpRight}</span></button><div class="selected-caption"><p class="category">${e(item.category)} / ${e(label)}</p><h3>${e(item.title)}</h3><p>${e(item.description)}</p></div></article>`;
}).join('');
document.addEventListener('click',ev=>{
 const showreel=ev.target.closest('[data-showreel]');
 if(showreel){const mobile=matchMedia('(max-width:760px)').matches;openMedia({...c.showreel,video:mobile?c.showreel.mobileVideo:c.showreel.video,image:mobile?c.showreel.mobileImage:c.showreel.image},showreel);return;}
 const button=ev.target.closest('[data-group]');
 if(button)openMedia(mediaGroups[button.dataset.group][Number(button.dataset.index)],button);
});
$('#close-dialog').addEventListener('click',()=>$('#media-dialog').close());
$('#media-dialog').addEventListener('click',ev=>{if(ev.target===$('#media-dialog')){const r=ev.target.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)ev.target.close();}});
$('#media-dialog').addEventListener('close',()=>{
 const video=$('#media-content video');
 if(video){video.pause();video.removeAttribute('src');for(const source of video.querySelectorAll('source'))source.removeAttribute('src');video.load();}
 $('#media-content').innerHTML='';mediaTrigger?.focus();reelController?.resumeAfterPreview();
});
const steps=[{key:'services',title:'What can we create for you?',hint:'Choose all the services you need.',options:c.services.map(s=>s.name),multiple:true},{key:'industry',title:'What’s your industry?',hint:'Select the closest fit.',options:c.assistant.industries},{key:'location',title:'Where will we create?',hint:'Local production or a remote collaboration?',options:c.assistant.locations},{key:'engagement',title:'A project or a partnership?',hint:'Choose the type of collaboration.',options:c.assistant.engagements},{key:'timeline',title:'When would you like to start?',hint:'We’ll discuss availability and timing together.',options:c.assistant.timelines},{key:'name',title:'What should we call you?',hint:'Let’s put a name to the idea.',label:'Your name',autocomplete:'name',required:true},{key:'business',title:'What’s your business called?',hint:'Optional — you can leave this blank.',label:'Business name (optional)',autocomplete:'organization'},{key:'details',title:'Anything else on your mind?',hint:'Share your goals, ideas, or deliverables. Optional.',label:'Project details (optional)',textarea:true}];
let step=0;const answers={services:[]};
function renderStep(focus=false){$('#step-error').textContent='';$('#step-label').textContent=step===steps.length?'YOUR PROJECT SUMMARY':`STEP ${step+1} OF ${steps.length}`;$('#progress-bar').style.width=`${(step+1)/(steps.length+1)*100}%`;$('#back').disabled=step===0;$('#next').hidden=step===steps.length;
 if(step===steps.length){$('#step-content').innerHTML=`<h3 tabindex="-1">Your idea, ready to move.</h3><p>Review your brief. Use Back to make changes, then choose to share it.</p><dl>${steps.map(s=>`<div><dt>${e(s.key==='engagement'?'Collaboration':s.key)}</dt><dd>${e(Array.isArray(answers[s.key])?answers[s.key].join(', '):answers[s.key]||'Not provided')}</dd></div>`).join('')}</dl><a id="send-brief" class="button" target="_blank" rel="noopener noreferrer" href="${e(whatsappUrl(c.brand.whatsapp,buildMessage(answers)))}">Send brief on WhatsApp ${arrowUpRight}</a><p class="privacy">WhatsApp opens with your brief. Review it there and tap Send to contact HANA Media House.</p>`;
 }else{const s=steps[step];$('#step-content').innerHTML=`<h3 tabindex="-1">${e(s.title)}</h3><p>${e(s.hint)}</p>`+(s.options?`<div class="choices">${s.options.map((v,i)=>`<label class="choice"><input type="${s.multiple?'checkbox':'radio'}" name="answer" value="${e(v)}" ${s.multiple?answers[s.key]?.includes(v)?'checked':'':answers[s.key]===v?'checked':''}><span>${e(v)}</span></label>`).join('')}</div>`:`<label for="step-input">${e(s.label)}</label>${s.textarea?`<textarea id="step-input" rows="5" maxlength="3000">${e(answers[s.key]||'')}</textarea>`:`<input id="step-input" type="text" autocomplete="${s.autocomplete}" maxlength="150" ${s.required?'required':''} value="${e(answers[s.key]||'')}">`}`);}
 if(focus)$('#step-content h3').focus({preventScroll:true});}
function capture(){if(step>=steps.length)return true;const s=steps[step];if(s.options){const selected=[...document.querySelectorAll('#step-content input:checked')].map(x=>x.value);answers[s.key]=s.multiple?selected:selected[0]||'';if(!selected.length){$('#step-error').textContent='Please select at least one option to continue.';return false;}}else{answers[s.key]=$('#step-input').value.trim();if(s.required&&!answers[s.key]){$('#step-error').textContent='Please enter your name to continue.';$('#step-input').focus();return false;}}return true;}
$('#project-form').addEventListener('submit',ev=>{ev.preventDefault();if(step<steps.length&&capture()){step++;renderStep(true);}});$('#back').addEventListener('click',()=>{if(step>0){if(step<steps.length){const s=steps[step];if(!s.options)answers[s.key]=$('#step-input').value.trim();else{const selected=[...document.querySelectorAll('#step-content input:checked')].map(x=>x.value);answers[s.key]=s.multiple?selected:selected[0]||'';}}step--;renderStep(true);}});renderStep();
$('#contact-form').addEventListener('submit',ev=>{ev.preventDefault();const form=ev.currentTarget;if(!form.reportValidity())return;const name=form.elements.name.value.trim(),message=form.elements.message.value.trim();if(!name||message.length<10){$('#contact-status').textContent='Please enter your name and at least 10 characters about your project.';return;}const text=`Hello HANA Media House,\n\nI’d like to discuss a project.\nName: ${name}\nBusiness: ${form.elements.business.value.trim()||'Not provided'}\n\nProject details: ${message}`;const link=document.createElement('a');link.href=whatsappUrl(c.brand.whatsapp,text);link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open your WhatsApp message';$('#contact-status').replaceChildren('Your message is ready. ',link);link.click();});
function initializeShowreel(){
 const video=$('#studio-reel'),frame=$('.hero-reel-frame'),toggle=$('#reel-toggle');
 const motion=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width:760px)');
 let userPaused=false,previewOpen=false,inView=typeof IntersectionObserver==='undefined';
 const permitted=()=>!motion.matches&&!navigator.connection?.saveData;
 const update=()=>{toggle.innerHTML=video.paused?'Play reel <span aria-hidden="true">${playIcon}</span>':'Pause reel <span aria-hidden="true">Ⅱ</span>';toggle.setAttribute('aria-label',video.paused?'Play silent studio reel':'Pause silent studio reel');};
 async function play(manual=false){
  if(document.hidden||!inView||previewOpen||(!manual&&(userPaused||!permitted())))return;
  if(manual)userPaused=false;
  video.defaultMuted=true;video.muted=true;video.volume=0;
  const source=mobile.matches?c.showreel.mobileVideo:c.showreel.video;
  if(video.getAttribute('src')!==source||video.error){video.poster=mobile.matches?c.showreel.mobileImage:c.showreel.image;video.src=source;video.load();}
  try{await video.play();}catch{frame.classList.remove('is-playing');update();}
 }
 video.addEventListener('play',()=>{if(document.hidden||!inView||previewOpen||userPaused)video.pause();update();});
 video.addEventListener('playing',()=>{if(!video.paused)frame.classList.add('is-playing');});
 video.addEventListener('pause',update);
 video.addEventListener('error',()=>{video.pause();frame.classList.remove('is-playing');update();});
 toggle.addEventListener('click',()=>{if(video.paused)play(true);else{userPaused=true;video.pause();}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){video.pause();$('#media-content video')?.pause();}else play();});
 motion.addEventListener('change',()=>{if(motion.matches)video.pause();else play();});mobile.addEventListener('change',()=>play());
 if(typeof IntersectionObserver!=='undefined'){const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)play();else video.pause();},{threshold:.05});observer.observe(frame);}else play();
 update();
 return {pauseForPreview(){previewOpen=true;video.pause();},resumeAfterPreview(){previewOpen=false;play();}};
}
reelController=initializeShowreel();
