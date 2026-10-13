/* Nova Digital portfolio — données modifiables sans base de données.
   Remplacez ce mot de passe avant de publier : il protège l'interface seulement,
   pas les données face à une personne qui inspecte le code source. */
const ADMIN_PASSWORD = "nova2026";
const STORAGE_KEY = "nova-digital-portfolio-v1";

const defaults = [
  {id:"flutter",title:"Développement mobile Flutter / Dart",category:"Développement",description:"Conception d’applications mobiles performantes, fluides et pensées pour Android."},
  {id:"java",title:"Programmation Java Desktop",category:"Développement",description:"Création d’outils desktop et mise en place de logiques applicatives."},
  {id:"data",title:"Bases de données & SGBD",category:"Développement",description:"Compréhension des bases de données et des systèmes de gestion de données."},
  {id:"vps",title:"Configuration de serveurs VPS",category:"Infrastructure",description:"Configuration et mise en service de serveurs VPS, notamment chez Hostinger."},
  {id:"panels",title:"Gestion numérique de panneaux",category:"Produits digitaux",description:"Développement d’une application dédiée à la gestion numérique des panneaux.",link:"https://gestiondigitalepanneaux.com/login"},
  {id:"numbering",title:"Gestion de numérotation",category:"Produits digitaux",description:"Conception d’un outil de gestion de numérotation — version 1.",link:"https://dispromalt.integrity-techno.com/"},
  {id:"stickers",title:"Validation numérique d’autocollants",category:"Produits digitaux",description:"Mise en place d’un système numérique de validation des autocollants.",link:"https://gnva.gestion-digitale.io/"},
  {id:"office",title:"Outils bureautiques & LaTeX",category:"Gestion & outils",description:"Utilisation de Word, Excel, PowerPoint et LaTeX dans un contexte professionnel."},
  {id:"entrepreneurship",title:"Entrepreneuriat & gestion de projet",category:"Gestion & outils",description:"Organisation de projets et approche orientée vers la résolution de problèmes."}
];
const projects = [
  {title:"Géolocalisation d’urgence",category:"Application mobile · Flutter",description:"Orienter rapidement les personnes vers les services essentiels : hôpitaux, postes de police et autres lieux utiles.",images:[["6.jpg","Accueil et services"],["8.jpg","Carte de Kinshasa"],["9.jpg","Détail d’un lieu sur la carte"],["7.jpg","Répertoire des lieux utiles"],["3.jpg","Connexion"],["4.jpg","Création de compte"],["5.jpg","Récupération du mot de passe"],["1.png","Identité de l’application"]]},
  {title:"Calcul mathématique",category:"Application mobile · Flutter",description:"Des outils de calcul pour la statistique, les probabilités, la comptabilité et l’analyse mathématique.",images:[["p21.jpg","Accueil · Mathématiques et Finance"],["p22.jpg","Choix d’un domaine de calcul"],["p23.jpg","Calculs de probabilités"],["p24.jpg","Résultats et tableaux"],["p25.jpg","Document de calcul"]]},
  {title:"Apprentissage des mathématiques",category:"Application éducative",description:"Des exercices interactifs et corrigés pour soutenir l’apprentissage des mathématiques à l’école.",images:[["11.jpg","Bienvenue dans l’application"],["22.jpg","Accueil mathématiques"],["33.jpg","Sélection d’un exercice"],["44.jpg","Progression des exercices"],["55.jpg","Tableau de bord élève"],["66.jpg","Choix de classe"],["77.jpg","Parcours d’apprentissage"],["88.jpg","Bibliothèque de cours"],["99.jpg","Exercices mathématiques"],["1010.jpg","Écran de correction"],["111.jpg","Exercice interactif"]]},
  {title:"Gestion numérique de panneaux",category:"Application web · Gestion",description:"Une application dédiée à la gestion des panneaux, développée pour simplifier les opérations.",href:"https://gestiondigitalepanneaux.com/login",linkText:"Ouvrir l’application",images:[["panels-preview.svg","Illustration de présentation · aperçu représentatif"]]},
  {title:"Gestion de numérotation · V1",category:"Application web · Gestion",description:"Un outil numérique dédié à la gestion de la numérotation et au suivi des opérations.",href:"https://dispromalt.integrity-techno.com/",linkText:"Ouvrir le projet",images:[["numbering-preview.svg","Illustration de présentation · aperçu représentatif"]]},
  {title:"Validation numérique d’autocollants",category:"Application web · Validation",description:"Un système numérique de validation conçu pour fluidifier le contrôle des autocollants.",href:"https://gnva.gestion-digitale.io/",linkText:"Ouvrir le projet",images:[["stickers-preview.svg","Illustration de présentation · aperçu représentatif"]]}
];
const icons={Développement:"⌘",Infrastructure:"⌁","Produits digitaux":"◈","Gestion & outils":"▤",Autre:"✳"};
let skills = loadSkills(), activeFilter = "Toutes";
const $ = (selector,root=document)=>root.querySelector(selector);
const escapeHTML = value => String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function loadSkills(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));if(Array.isArray(saved))return saved}catch(e){}return defaults.map(item=>({...item}))}
function saveSkills(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(skills));return true}catch(e){notify("Stockage navigateur indisponible.");return false}}
function renderFilters(){const categories=["Toutes",...new Set(skills.map(s=>s.category))];$("#filters").innerHTML=categories.map(c=>`<button class="filter-pill ${activeFilter===c?"active":""}" data-filter="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join("");$("#filters").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{activeFilter=btn.dataset.filter;renderFilters();renderSkills()}))}
function renderSkills(){const shown=activeFilter==="Toutes"?skills:skills.filter(s=>s.category===activeFilter);$("#skill-count").textContent=`${shown.length} compétence${shown.length>1?"s":""}`;$("#hero-skill-count").textContent=String(skills.length).padStart(2,"0");$("#skills-grid").innerHTML=shown.map(skill=>`<article class="skill-card"><div class="skill-top"><span class="skill-icon">${escapeHTML(icons[skill.category]||"✳")}</span><span class="skill-category">${escapeHTML(skill.category)}</span></div><h3>${escapeHTML(skill.title)}</h3><p>${escapeHTML(skill.description||"Compétence professionnelle.")}</p></article>`).join("")||`<p class="empty-state">Aucune compétence dans cette catégorie.</p>`}
function renderProjects(){
  $("#projects-grid").innerHTML=projects.map((project,projectIndex)=>{
    const first=project.images[0], total=project.images.length;
    const dots=project.images.map((image,index)=>`<button class="gallery-dot ${index===0?"active":""}" type="button" data-gallery-index="${index}" aria-label="Afficher ${escapeHTML(image[1])}" aria-current="${index===0?"true":"false"}"></button>`).join("");
    return `<article class="project-card">
      <div class="project-gallery" data-project-gallery data-project-index="${projectIndex}" data-current="0">
        <div class="gallery-stage">
          <button class="gallery-image-button" type="button" data-gallery-open aria-label="Agrandir : ${escapeHTML(project.title)} — ${escapeHTML(first[1])}">
            <img class="gallery-image ${total===1?"is-illustration":""}" src="images/${escapeHTML(first[0])}" alt="${escapeHTML(project.title)} — ${escapeHTML(first[1])}" loading="lazy" decoding="async">
            <span class="image-zoom" aria-hidden="true">⤢</span>
          </button>
          <span class="gallery-caption" data-gallery-caption>${escapeHTML(first[1])}${total===1?" · illustration":""}</span>
        </div>
        <div class="gallery-toolbar" ${total===1?"hidden":""}>
          <div class="gallery-dots">${dots}</div>
          <div class="gallery-arrows"><span class="gallery-counter" data-gallery-counter>01 / ${String(total).padStart(2,"0")}</span><button type="button" data-gallery-step="-1" aria-label="Image précédente — ${escapeHTML(project.title)}">‹</button><button type="button" data-gallery-step="1" aria-label="Image suivante — ${escapeHTML(project.title)}">›</button></div>
        </div>
      </div>
      <div class="project-content"><span class="project-meta">${escapeHTML(project.category)}</span><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.description)}</p>${project.href?`<a class="project-link" href="${escapeHTML(project.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.linkText||"Ouvrir le projet")} <span>↗</span></a>`:`<span class="project-link project-link-unavailable" aria-label="Lien externe non fourni">Lien externe non renseigné</span>`}</div>
    </article>`;
  }).join("");
  setupProjectGalleries();
}
let lightboxGallery=null;
function showGalleryImage(gallery,index){
  const project=projects[Number(gallery.dataset.projectIndex)];
  const total=project.images.length;
  const current=(index+total)%total;
  gallery.dataset.current=String(current);
  const [filename,label]=project.images[current];
  const image=$(".gallery-image",gallery);
  image.src=`images/${filename}`;
  image.alt=`${project.title} — ${label}`;
  image.classList.toggle("is-illustration",filename.endsWith(".svg"));
  const open=$("[data-gallery-open]",gallery);
  open.setAttribute("aria-label",`Agrandir : ${project.title} — ${label}`);
  $("[data-gallery-caption]",gallery).textContent=`${label}${total===1?" · illustration":""}`;
  const counter=$("[data-gallery-counter]",gallery);
  if(counter)counter.textContent=`${String(current+1).padStart(2,"0")} / ${String(total).padStart(2,"0")}`;
  gallery.querySelectorAll(".gallery-dot").forEach((dot,i)=>{dot.classList.toggle("active",i===current);dot.setAttribute("aria-current",String(i===current))});
  if(lightboxGallery===gallery)updateLightbox();
}
function updateLightbox(){
  if(!lightboxGallery)return;
  const project=projects[Number(lightboxGallery.dataset.projectIndex)];
  const current=Number(lightboxGallery.dataset.current);
  const [filename,label]=project.images[current];
  $("#lightbox-image").src=`images/${filename}`;
  $("#lightbox-image").alt=`${project.title} — ${label}`;
  $("#lightbox-caption").textContent=`${project.title} · ${label}`;
  $("#lightbox-counter").textContent=`${String(current+1).padStart(2,"0")} / ${String(project.images.length).padStart(2,"0")}`;
  $("#lightbox-prev").hidden=project.images.length<2;
  $("#lightbox-next").hidden=project.images.length<2;
}
function setupProjectGalleries(){
  const grid=$("#projects-grid"),dialog=$("#image-dialog");
  grid.addEventListener("click",event=>{
    const gallery=event.target.closest("[data-project-gallery]");
    if(!gallery)return;
    const step=event.target.closest("[data-gallery-step]");
    const dot=event.target.closest("[data-gallery-index]");
    if(step){showGalleryImage(gallery,Number(gallery.dataset.current)+Number(step.dataset.galleryStep));return}
    if(dot){showGalleryImage(gallery,Number(dot.dataset.galleryIndex));return}
    if(event.target.closest("[data-gallery-open]")){lightboxGallery=gallery;updateLightbox();dialog.showModal()}
  });
  $("#close-image-dialog").addEventListener("click",()=>dialog.close());
  $("#lightbox-prev").addEventListener("click",()=>lightboxGallery&&showGalleryImage(lightboxGallery,Number(lightboxGallery.dataset.current)-1));
  $("#lightbox-next").addEventListener("click",()=>lightboxGallery&&showGalleryImage(lightboxGallery,Number(lightboxGallery.dataset.current)+1));
  dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
  dialog.addEventListener("close",()=>{if(lightboxGallery)$("[data-gallery-open]",lightboxGallery).focus();lightboxGallery=null});
  dialog.addEventListener("keydown",event=>{if(!lightboxGallery)return;if(event.key==="ArrowLeft"){event.preventDefault();showGalleryImage(lightboxGallery,Number(lightboxGallery.dataset.current)-1)}if(event.key==="ArrowRight"){event.preventDefault();showGalleryImage(lightboxGallery,Number(lightboxGallery.dataset.current)+1)}});
}
function notify(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(notify.timer);notify.timer=setTimeout(()=>toast.classList.remove("show"),2500)}
function renderAdmin(){const list=$("#admin-list");$("#admin-skill-total").textContent=skills.length;list.innerHTML=skills.map(skill=>`<div class="admin-row"><div><b>${escapeHTML(skill.title)}</b><small>${escapeHTML(skill.category)}</small></div><div class="row-actions"><button data-edit="${escapeHTML(skill.id)}">Modifier</button><button data-delete="${escapeHTML(skill.id)}">Supprimer</button></div></div>`).join("");list.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>openSkillForm(b.dataset.edit));list.querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>deleteSkill(b.dataset.delete))}
function openSkillForm(id=""){const form=$("#skill-form");form.hidden=false;form.reset();$("#skill-id").value=id;const item=skills.find(s=>s.id===id);$("#skill-form-title").textContent=item?"Modifier la compétence":"Ajouter une compétence";if(item){$("#skill-title").value=item.title;$("#skill-category").value=item.category;$("#skill-description").value=item.description||""}$("#skill-title").focus()}
function deleteSkill(id){const item=skills.find(s=>s.id===id);if(!item||!confirm(`Supprimer « ${item.title} » ?`))return;skills=skills.filter(s=>s.id!==id);saveSkills();renderAdmin();renderFilters();renderSkills();notify("Compétence supprimée.")}
const dialog=$("#admin-dialog");
$("#admin-trigger").addEventListener("click",()=>{dialog.showModal();$("#login-error").textContent="";$("#admin-login").hidden=sessionStorage.getItem("nova-admin")==="yes";$("#admin-panel").hidden=!$("#admin-login").hidden;if(!$("#admin-panel").hidden)renderAdmin()});
$("#close-admin").onclick=()=>dialog.close();dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
$("#login-form").addEventListener("submit",event=>{event.preventDefault();if($("#admin-password").value!==ADMIN_PASSWORD){$("#login-error").textContent="Mot de passe incorrect. Réessayez.";$("#admin-password").select();return}sessionStorage.setItem("nova-admin","yes");$("#admin-login").hidden=true;$("#admin-panel").hidden=false;$("#admin-password").value="";renderAdmin()});
$("#logout-admin").onclick=()=>{sessionStorage.removeItem("nova-admin");$("#admin-panel").hidden=true;$("#admin-login").hidden=false;notify("Vous êtes déconnecté.")};
$("#add-skill").onclick=()=>openSkillForm();$("#cancel-skill").onclick=()=>{$("#skill-form").hidden=true};
$("#skill-form").addEventListener("submit",event=>{event.preventDefault();const id=$("#skill-id").value||`skill-${Date.now()}`;const entry={id,title:$("#skill-title").value.trim(),category:$("#skill-category").value,description:$("#skill-description").value.trim()};const index=skills.findIndex(s=>s.id===id);if(index>=0)skills[index]=entry;else skills.unshift(entry);saveSkills();$("#skill-form").hidden=true;renderAdmin();renderFilters();renderSkills();notify(index>=0?"Compétence mise à jour.":"Compétence ajoutée au portfolio.")});
$("#export-data").onclick=()=>{const blob=new Blob([JSON.stringify({version:1,skills},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="nova-digital-competences.json";a.click();URL.revokeObjectURL(url);notify("Sauvegarde téléchargée.")};
$("#import-data").addEventListener("change",async event=>{const file=event.target.files[0];if(!file)return;try{const data=JSON.parse(await file.text());const imported=Array.isArray(data)?data:data.skills;if(!Array.isArray(imported)||!imported.every(s=>s&&typeof s.title==="string"&&typeof s.category==="string"))throw new Error("format");if(!confirm(`Importer ${imported.length} compétences ? Cela remplacera la liste actuelle.`))return;skills=imported.map((s,i)=>({id:String(s.id||`import-${Date.now()}-${i}`),title:s.title,category:s.category,description:s.description||"",...(s.link?{link:s.link}:{})}));saveSkills();renderAdmin();renderFilters();renderSkills();notify("Sauvegarde importée.")}catch(e){notify("Fichier JSON non reconnu.")}finally{event.target.value=""}});
const menu=$("#menu-toggle"),nav=$("#nav-links");menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Fermer le menu":"Ouvrir le menu")});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));
const progress=$("#reading-progress");
function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${max>0?Math.min(100,window.scrollY/max*100):0}%`}
window.addEventListener("scroll",updateProgress,{passive:true});updateProgress();
$("#share-site").addEventListener("click",async()=>{const shareData={title:document.title,text:"Découvrez le portfolio d’André Omeonga et ses projets digitaux.",url:location.href};try{if(navigator.share)await navigator.share(shareData);else{await navigator.clipboard.writeText(location.href);notify("Lien du portfolio copié.")}}catch(error){if(error.name!=="AbortError")notify("Copie du lien indisponible sur ce navigateur.")}});
$("#year").textContent=new Date().getFullYear();renderFilters();renderSkills();renderProjects();
if("IntersectionObserver"in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){const revealTargets=document.querySelectorAll(".section-heading,.about-card,.skill-card,.project-card,.projects-note,.nova-copy,.nova-pillars article,.contact-card");revealTargets.forEach((el,index)=>{el.classList.add("reveal");if(index%3===1)el.classList.add("reveal-delay-1");if(index%3===2)el.classList.add("reveal-delay-2")});document.documentElement.classList.add("reveal-ready");const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target)}}),{threshold:.12});revealTargets.forEach(el=>revealObserver.observe(el))}
