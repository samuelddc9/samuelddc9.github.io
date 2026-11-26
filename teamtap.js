const games={"armory":{"title":"Tidy Up the Royal Armory","category":"ORGANISING / FANTASY","image":"royal-armory-keyart-large.jpg","screenshot":"royal-armory-screenshot.jpg","description":"The royal inspection is approaching, and the armory has been neglected for years. Sort up to 4,318 handcrafted items, restore matching weapon sets, and bring order back to its halls with Marshmallow, your canine companion.","status":"Available now on Steam","cta":"Get it on Steam","url":"https://store.steampowered.com/app/5169440/Tidy_Up_the_Royal_Armory/"},"tea":{"title":"The Tidy TeaShop: Tidy Up the Tea Collection","category":"ORGANISING / RELAXING","image":"tidy-teashop-keyart-large.jpg","screenshot":"tidy-teashop-screenshot.jpg","description":"The tea shop was tidy until the cat got involved. Read labels and recognise packaging to put 2,130 tea boxes back on their shelves. Help the occasional customer find a blend, with no timers or pressure to hurry.","status":"Coming soon on Steam","cta":"Wishlist on Steam","url":"https://store.steampowered.com/app/5169510/The_Tidy_TeaShop_Tidy_Up_the_Tea_Collection/"}};
const dialog=document.querySelector('#detail');const content=document.querySelector('#dialog-content');let opener;
function show(html,trigger){opener=trigger;content.innerHTML=html;dialog.showModal();}
function close(){dialog.close();opener?.focus();}
document.querySelector('.close-dialog').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
document.querySelectorAll('[data-game]').forEach(button=>button.addEventListener('click',()=>{const game=games[button.dataset.game];show(`<img class="dialog-art" src="assets/${game.image}" alt="${game.title} official key art" width="1232" height="706" decoding="async"><div class="dialog-copy"><div class="eyebrow">${game.category}</div><h2>${game.title}</h2><p>${game.description}</p><p class="note">${game.status}</p><a class="button lime" href="${game.url}" target="_blank" rel="noopener noreferrer">${game.cta} <span>＋</span></a><button class="trailer-button detail-trailer" type="button" data-trailer="${button.dataset.game}"><span class="play-icon" aria-hidden="true">▶</span> Watch trailer</button><img class="game-screenshot" src="assets/${game.screenshot}" alt="Gameplay screenshot of ${game.title}" loading="lazy"><button class="button dark" id="back-games">Back to the collection <span>＋</span></button></div>`,button);document.querySelector('#back-games').onclick=()=>{close();document.querySelector('#games').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&!card.dataset.category.split(' ').includes(button.dataset.filter);});}));
const stories={craft:['CREATIVE DIRECTION','Finding the fun in the little things.','There’s a quiet pleasure in putting things in their place. Our organising games explore that feeling through collections full of character, playful settings, and small details worth noticing.','In Tidy Up the Royal Armory, that means restoring rows of weapons with Marshmallow nearby. In The Tidy TeaShop, it means recognising each blend and bringing calm back to a shop turned upside down by a cat. Explore both games on Steam to see more.'],privacy:['PRIVACY','Your visit, kept simple.','This website has no forms, accounts, analytics, or tracking cookies. It does not save personal information in your browser. If you email TeamTap, your email address and message are used to respond to your enquiry.','YouTube’s privacy-enhanced player loads only when you choose to watch a trailer. YouTube may process playback and connection data when the player loads. Google Fonts is used to load the website’s typefaces and receives the connection information needed to serve those files. GitHub Pages hosts this website and may process technical request data. See GitHub’s privacy statement for its handling of visitor data.']};
document.querySelectorAll('[data-story]').forEach(button=>button.addEventListener('click',()=>{const s=stories[button.dataset.story];show(`<div class="dialog-copy"><div class="eyebrow">${s[0]}</div><h2>${s[1]}</h2><p>${s[2]}</p><p class="note">${s[3]}</p></div>`,button);}));
const menu=document.querySelector('.menu');const nav=document.querySelector('#nav');menu.onclick=()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰';};nav.querySelectorAll('a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';});document.querySelector('#year').textContent=new Date().getFullYear();

// Load YouTube only after the visitor chooses to watch a trailer.
const trailers = {
  armory: { youtube: 'qMaAcAulGjU' },
  tea: { stream: 'https://video.akamai.steamstatic.com/store_trailers/5169510/1874568776/2faa875c9e57f843e1b51a220cff251393a51c3c/1789479081/hls_264_master.m3u8' }
};
const trailerDialog = document.querySelector('#trailer-dialog');
const trailerPlayer = document.querySelector('#trailer-player');
let trailerOpener;
let streamPlayer;
let hlsLibrary;
function loadHlsLibrary() {
  if (window.Hls) return Promise.resolve(window.Hls);
  if (!hlsLibrary) hlsLibrary = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'assets/vendor/hls-1.7.4.min.js';
    script.onload = () => resolve(window.Hls);
    script.onerror = () => { hlsLibrary = null; script.remove(); reject(new Error('Player could not load')); };
    document.head.append(script);
  });
  return hlsLibrary;
}
function openTrailer(key, trigger) {
  const trailer = trailers[key];
  const game = games[key];
  if (!game || !trailer) return;
  trailerOpener = trigger;
  document.querySelector('#trailer-title').textContent = game.title;
  const fallback = document.querySelector('#trailer-youtube');
  if (trailer.youtube) {
    fallback.href = 'https://www.youtube.com/watch?v=' + trailer.youtube;
    fallback.textContent = 'Watch on YouTube';
    const player = document.createElement('iframe');
    player.src = 'https://www.youtube-nocookie.com/embed/' + trailer.youtube + '?autoplay=1&rel=0&playsinline=1';
    player.title = game.title + ' — official trailer';
    player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    trailerPlayer.replaceChildren(player);
  } else {
    fallback.href = game.url;
    fallback.textContent = 'Watch on Steam';
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = 'metadata';
    video.poster = 'assets/' + game.image;
    video.setAttribute('aria-label', game.title + ' — official trailer');
    trailerPlayer.replaceChildren(video);
    const tryPlay = () => video.play().catch(() => {});
    const showError = () => {
      if (!video.isConnected) return;
      if (trailerPlayer.querySelector('.trailer-error')) return;
      const message = document.createElement('p');
      message.className = 'trailer-error';
      message.setAttribute('role', 'status');
      message.textContent = 'The trailer could not load. Use “Watch on Steam” below to watch it there.';
      trailerPlayer.append(message);
    };
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = trailer.stream;
      video.addEventListener('loadedmetadata', tryPlay, { once: true });
      video.addEventListener('error', showError, { once: true });
    } else {
      loadHlsLibrary().then(Hls => {
        if (!video.isConnected || !trailerDialog.open) return;
        if (!Hls.isSupported()) { showError(); return; }
        streamPlayer = new Hls({ capLevelToPlayerSize: true });
        streamPlayer.on(Hls.Events.MANIFEST_PARSED, tryPlay);
        streamPlayer.on(Hls.Events.ERROR, (_, data) => { if (data.fatal) showError(); });
        streamPlayer.loadSource(trailer.stream);
        streamPlayer.attachMedia(video);
      }).catch(showError);
    }
  }
  trailerDialog.showModal();
}
function closeTrailer() { trailerDialog.close(); }
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-trailer]');
  if (trigger) openTrailer(trigger.dataset.trailer, trigger);
});
document.querySelector('.trailer-close').addEventListener('click', closeTrailer);
trailerDialog.addEventListener('click', event => {
  if (event.target !== trailerDialog) return;
  const bounds = trailerDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeTrailer();
});
trailerDialog.addEventListener('close', () => {
  streamPlayer?.destroy();
  streamPlayer = null;
  const video = trailerPlayer.querySelector('video');
  if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
  trailerPlayer.replaceChildren();
  if (trailerOpener?.isConnected) trailerOpener.focus();
});
