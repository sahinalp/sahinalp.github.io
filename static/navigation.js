document.addEventListener('DOMContentLoaded', function() {
    const projectsNavLink = document.querySelector('header .main-nav ul li a[href="#projects-tab-section"]');
    const projectTabButtons = document.querySelectorAll('.tabs-container .tabs .tab-button');
    function updateProjectsNavLinkText() {
        if (projectsNavLink) {
            const activeTabButton = document.querySelector('.tabs-container .tabs .tab-button.active');
            if (activeTabButton) {
                const activeTabName = activeTabButton.textContent.trim();
                projectsNavLink.textContent = activeTabName;
            }
        }
    }

    projectTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            updateProjectsNavLinkText();
        });
    });
    updateProjectsNavLinkText();
});