document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add text animation
    const text = "Design That Speaks.";
    const container = document.getElementById('animation-container');
    let currentIndex = 0;

    // Create words
    const words = text.split(' ').map(word => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        container.appendChild(span);
        return span;
    });

    // Create focus frame
    const frame = document.createElement('div');
    frame.className = 'focus-frame';
    ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(pos => {
        const corner = document.createElement('div');
        corner.className = `corner ${pos}`;
        frame.appendChild(corner);
    });
    container.appendChild(frame);

    // Animation function
    function focusWord(index) {
        words.forEach((word, i) => {
            word.style.filter = i === index ? 'blur(0)' : 'blur(5px)';
        });

        const word = words[index];
        const rect = word.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        requestAnimationFrame(() => {
            const left = rect.left - containerRect.left;
            const top = rect.top - containerRect.top;
            
            frame.style.left = `${left}px`;
            frame.style.top = `${top}px`;
            frame.style.width = `${rect.width}px`;
            frame.style.height = `${rect.height}px`;
            frame.style.opacity = '1';
        });

        // Ensure container height adjusts to content
        container.style.minHeight = `${rect.height + 40}px`;
    }

    // Start animation
    function animate() {
        focusWord(currentIndex);
        currentIndex = (currentIndex + 1) % words.length;
    }

    // Run animation when container is available
    if (container) {
        animate();
        setInterval(animate, 500);
    }
});
