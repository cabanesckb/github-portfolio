document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    
    // Update toggle button state
    if (savedTheme === 'dark') {
        document.querySelector('.fa-moon').style.display = 'none';
        document.querySelector('.fa-sun').style.display = 'block';
    } else {
        document.querySelector('.fa-moon').style.display = 'block';
        document.querySelector('.fa-sun').style.display = 'none';
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update toggle button
            document.querySelector('.fa-moon').style.display = newTheme === 'dark' ? 'none' : 'block';
            document.querySelector('.fa-sun').style.display = newTheme === 'dark' ? 'block' : 'none';
        });
    }
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = `#${section.id}`;
            }
        });
        
        navLinksItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === current) {
                    link.classList.add('active');
                }
            }
        });
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Sample projects data - replace with your actual projects
    const projects = [
        {
            title: 'Project 1',
            description: 'A brief description of your project goes here. Explain what it does and the technologies used.',
            image: 'https://via.placeholder.com/600x400',
            tags: ['HTML', 'CSS', 'JavaScript'],
            demo: '#',
            code: '#'
        },
        {
            title: 'Project 2',
            description: 'Another project description. Highlight the key features and your role in the project.',
            image: 'https://via.placeholder.com/600x400',
            tags: ['React', 'Node.js', 'MongoDB'],
            demo: '#',
            code: '#'
        },
        {
            title: 'Project 3',
            description: 'A third project to showcase your skills and experience.',
            image: 'https://via.placeholder.com/600x400',
            tags: ['Python', 'Django', 'PostgreSQL'],
            demo: '#',
            code: '#'
        }
    ];

    // Render projects
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (projectsGrid) {
        projects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card fade-in-up';
            projectElement.style.animationDelay = `${index * 0.2}s`;
            
            projectElement.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                        <a href="${project.code}" target="_blank"><i class="fab fa-github"></i> View Code</a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectElement);
        });
    }

    // Form submission with Formspree
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            try {
                // Disable submit button and show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Send form data to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = '\n                        <i class="fas fa-check-circle"></i>\n                        <h3>Message Sent Successfully!</h3>\n                        <p>Thank you for reaching out. I\'ll get back to you as soon as possible.</p>\n                    ';
                    
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMessage);
                    contactForm.style.textAlign = 'center';
                    
                    // Reset form after a delay
                    setTimeout(() => {
                        contactForm.innerHTML = `
                            <input type="hidden" name="_subject" value="New message from portfolio">
                            <div class="form-group">
                                <input type="text" id="name" name="name" placeholder="Your Name" required>
                            </div>
                            <div class="form-group">
                                <input type="email" id="email" name="email" placeholder="Your Email" required>
                            </div>
                            <div class="form-group">
                                <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
                            </div>
                            <button type="submit" class="btn">Send Message</button>
                        `;
                        // Re-attach the event listener to the new form
                        contactForm.addEventListener('submit', arguments.callee);
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try again later or contact me directly at your.email@example.com');
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-up');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});
