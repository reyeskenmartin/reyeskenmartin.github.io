document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamically Load Projects from projects.json
    const projectsGrid = document.getElementById('projects-grid');

    if (projectsGrid) {
        fetch('data/projects.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load projects data.');
                }
                return response.json();
            })
            .then(projects => {
                projectsGrid.innerHTML = '';
                projects.forEach(project => {
                    const card = document.createElement('div');
                    card.classList.add('project-card');

                    const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');

                    card.innerHTML = `
                        <div class="project-body">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="project-tags">
                                ${tagsHtml}
                            </div>
                            <div class="project-links">
                                <a href="${project.github}" target="_blank"><i class="fa-brands fa-github"></i> Code</a>
                                <a href="${project.live}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
                            </div>
                        </div>
                    `;
                    projectsGrid.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                projectsGrid.innerHTML = `<p style="text-align:center; color: var(--text-muted);">Projects could not be loaded at this time.</p>`;
            });
    }

    // 2. Handle Contact Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();

            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

    // 3. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '75px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
                navLinks.style.padding = '1.5rem';
                navLinks.style.borderBottom = '1px solid var(--card-border)';
                navLinks.style.boxShadow = 'var(--shadow)';
            }
        });
    }
});
