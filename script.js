const chain = document.getElementById('pull-chain');
let isDragging = false;

// Variables to track coordinates
let startY = 0, startX = 0;
let currentY = 0, currentX = 0;
let hasToggled = false; 

// 1. Grab the chain
chain.addEventListener('pointerdown', (e) => {
    isDragging = true;
    
    // Permanently remove the idle swinging animation on the first grab
    chain.classList.remove('idle-swing'); 
    
    chain.style.transition = 'none'; 
    startY = e.clientY - currentY;
    startX = e.clientX - currentX;
    
    chain.setPointerCapture(e.pointerId);
    hasToggled = false; 
});

// 2. Drag the chain
chain.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    
    currentY = e.clientY - startY;
    currentX = e.clientX - startX;
    
    if (currentY < 0) currentY = 0; // Prevent pushing into ceiling

    // Calculate side-to-side swing based on mouse movement
    let angle = currentX / 5; 

    // Apply movement
    chain.style.transform = `translateY(${currentY}px) rotate(${angle}deg)`;

    // TRIGGER THE LIGHT SWITCH
    // If pulled down more than 80px, toggle to Light Mode
    if (currentY > 80 && !hasToggled) {
        document.body.classList.toggle('light-theme');
        hasToggled = true; // Lock it so it only toggles once per pull
        
        if (navigator.vibrate) navigator.vibrate(50); // Mobile vibration
    }
});

// 3. Let go of the chain
chain.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    
    isDragging = false;
    currentY = 0;
    currentX = 0;
    
    // Satisfying snap-back
    chain.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    chain.style.transform = `translateY(0px) rotate(0deg)`;
    
    chain.releasePointerCapture(e.pointerId);
});