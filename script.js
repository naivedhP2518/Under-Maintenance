document.addEventListener('DOMContentLoaded', () => {
    const mainCard = document.getElementById('main-card');
    const progressFill = document.getElementById('progress-fill');
    const notifyForm = document.getElementById('notify-form');
    const formMessage = document.getElementById('form-message');
    const emailInput = document.getElementById('email-input');

    // 1. Initial Animations
    setTimeout(() => {
        progressFill.style.width = '85%';
    }, 500);

    // 2. Smooth Mouse Tracking Parallax & Shine Effect
    let mouseX = 0, mouseY = 0;
    let cardX = 0, cardY = 0;
    const speed = 0.08; // Smoothing factor

    document.addEventListener('mousemove', (e) => {
        // Calculate raw rotation values
        mouseX = (window.innerWidth / 2 - e.pageX) / 45;
        mouseY = (window.innerHeight / 2 - e.pageY) / -45;

        // Update shine position on the card
        const rect = mainCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mainCard.style.setProperty('--x', `${x}px`);
        mainCard.style.setProperty('--y', `${y}px`);
    });

    function animate() {
        // Linear Interpolation (lerp) for buttery smooth movement
        cardX += (mouseX - cardX) * speed;
        cardY += (mouseY - cardY) * speed;

        if (window.innerWidth > 768) {
            mainCard.style.transform = `rotateY(${cardX}deg) rotateX(${cardY}deg)`;
        } else {
            mainCard.style.transform = 'none';
        }

        requestAnimationFrame(animate);
    }
    animate();

    // Reset when mouse leaves (optional, but keep it for lerp target)
    document.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
    });

    // 3. Form Handling (Mock)
    notifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value;
        const btn = notifyForm.querySelector('button');
        const btnSpan = btn.querySelector('span');
        
        // Disable form
        btn.disabled = true;
        emailInput.disabled = true;
        btnSpan.textContent = 'Saving...';

        // Mock API call
        setTimeout(() => {
            btn.style.background = '#22c55e';
            btnSpan.textContent = 'Subscribed!';
            formMessage.textContent = "Great! We'll keep you posted at " + email;
            formMessage.style.color = '#22c55e';
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.style.opacity = '0';
            }, 5000);
        }, 1500);
    });

    // 4. Subtle Floating Blobs Logic (Optional - CSS handles most)
    // We can add logic to change blob positions slightly on scroll or time if needed.
});
