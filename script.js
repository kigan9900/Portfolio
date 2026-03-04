/* =========================================
   MOUSE GLOW TRAIL
   ========================================= */
const mouseGlow = document.querySelector('.mouse-glow');
window.addEventListener('pointermove', (e) => {
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY}px`;
});

/* =========================================
   NAV BAR AUTO-HIDE & SCROLL PROMPT LOGIC
   ========================================= */
let lastScrollY = window.scrollY;
const nav = document.getElementById('desktop-nav');
const scrollPrompt = document.getElementById('scroll-prompt');

window.addEventListener('scroll', () => {
    // Nav visibility logic
    if (window.scrollY < 50) nav.classList.add('nav-transparent');
    else nav.classList.remove('nav-transparent');

    if (window.scrollY > lastScrollY && window.scrollY > 150) nav.classList.add('nav-hidden');
    else nav.classList.remove('nav-hidden');
    
    lastScrollY = window.scrollY;

    // Fade the prompt out smoothly when you scroll down
    if (scrollPrompt) {
        if (window.scrollY > 10) {
            scrollPrompt.style.opacity = '0';
        } else {
            scrollPrompt.style.opacity = '1';
        }
    }
});

/* =========================================
   PULL CHAIN PHYSICS
   ========================================= */
const chain = document.getElementById('pull-chain');
const cord = document.querySelector('.cord');
let isDragging = false, hasToggled = false;
let RESTING_LENGTH, MAX_STRETCH, TRIGGER_POINT;

function calculateLimits() {
    RESTING_LENGTH = window.innerHeight * 0.15; 
    MAX_STRETCH = window.innerHeight * 0.25;    
    TRIGGER_POINT = window.innerHeight * 0.20;  
    if (!isDragging) cord.style.height = `${RESTING_LENGTH}px`;
}
calculateLimits();
window.addEventListener('resize', calculateLimits);

chain.addEventListener('pointerdown', (e) => {
    isDragging = true; hasToggled = false;
    chain.style.transition = 'none'; cord.style.transition = 'none'; 
    chain.setPointerCapture(e.pointerId);
});

chain.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    
    const anchorX = chain.offsetLeft + (chain.offsetWidth / 2);
    const anchorY = chain.offsetTop;
    const dx = e.pageX - anchorX; 
    const dy = e.pageY - anchorY;
    const angle = -Math.atan2(dx, dy) * (180 / Math.PI);
    
    let dist = Math.hypot(dx, dy);
    const knobHeight = chain.querySelector('.knob').offsetHeight;
    let newCordHeight = dist - (knobHeight / 2); 
    
    if (newCordHeight < RESTING_LENGTH) newCordHeight = RESTING_LENGTH;
    if (newCordHeight > MAX_STRETCH) newCordHeight = MAX_STRETCH;

    chain.style.transform = `rotate(${angle}deg)`;
    cord.style.height = `${newCordHeight}px`;

    if (newCordHeight >= TRIGGER_POINT && !hasToggled) {
        document.body.classList.toggle('light-theme');
        hasToggled = true; 
        if (navigator.vibrate) navigator.vibrate(50); 
    }
});

chain.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    chain.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    cord.style.transition = 'height 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    chain.style.transform = `rotate(0deg)`;
    cord.style.height = `${RESTING_LENGTH}px`;
    chain.releasePointerCapture(e.pointerId);
});

/* =========================================
   SCROLL REVEAL & TERMINAL TYPING
   ========================================= */
const hiddenElements = document.querySelectorAll('.hidden');
const terminalBody = document.getElementById('terminal-body');
let hasTyped = false;

const codeLines = [
    `<span class="comment">// Initializing developer profile...</span>`,
    `<span class="keyword">const</span> <span class="function">kigan</span> = <span class="keyword">new</span> Developer();`,
    `<span class="function">kigan</span>.skills = [<span class="string">"HTML"</span>, <span class="string">"CSS"</span>, <span class="string">"JavaScript"</span>, <span class="string">"UI/UX"</span>];`,
    `<span class="function">kigan</span>.passion = <span class="string">"Bringing ideas to life"</span>;`,
    `<span class="function">kigan</span>.execute();`,
    `<br><span class="string">> System Ready. Let's build something amazing.</span><span class="cursor"></span>`
];

function typeCode() {
    if (hasTyped || !terminalBody) return;
    hasTyped = true;
    let lineIndex = 0;
    
    function printLine() {
        if (lineIndex < codeLines.length) {
            terminalBody.innerHTML += codeLines[lineIndex] + '<br>';
            lineIndex++;
            setTimeout(printLine, 400); 
        }
    }
    setTimeout(printLine, 500); 
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            if (entry.target.id === 'about') typeCode();
        }
    });
}, { threshold: 0.2 });

hiddenElements.forEach((el) => observer.observe(el));