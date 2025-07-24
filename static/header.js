document.addEventListener('DOMContentLoaded', () => {
    const dynamicRoleSpan = document.getElementById('dynamic-role');
    const roles = ["Data Scientist", "Computer Engineer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 350;
    let deletingSpeed = 100;
    let pauseTime = 2000;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        dynamicRoleSpan.textContent = ` ${displayText}`;

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = typingSpeed;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();
});