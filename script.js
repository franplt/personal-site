// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize page functionality
    initNavigation();
    initExperienceTimeline();
    initContactForm();
    initResumeButton();
    initHeaderScroll();
});

// Experience data
const experienceData = [
    {
        "company": "Vento",
        "title": "Entrepreneur in Residence",
        "location": "Italy",
        "dates": "Jan 2025 — May 2025",
        "url": "",
        "note": "Explored new product ideas and validation."
    },
    {
        "company": "Builder.io",
        "title": "Product Manager — AI & Growth",
        "location": "Lisbon, Portugal",
        "dates": "Aug 2023 — Jan 2025",
        "url": "https://www.builder.io/",
        "note": "Worked across AI Services and Growth; helped ship AI features and steer instrumentation."
    },
    {
        "company": "Contentful",
        "title": "Product Manager — Growth",
        "location": "Berlin, Germany",
        "dates": "Mar 2022 — Aug 2023",
        "url": "https://www.contentful.com/",
        "note": "Led a Growth team focused on activation and retention."
    },
    {
        "company": "Garisenda Lab",
        "title": "Co-founder",
        "location": "Milan, Italy",
        "dates": "Mar 2020 — May 2023",
        "url": "",
        "note": "Built a local DTC brand selling artisanal standing desks."
    },
    {
        "company": "Electric8",
        "title": "Product Manager — Growth (Consultant)",
        "location": "Singapore (remote from Berlin)",
        "dates": "Feb 2021 — Apr 2022",
        "url": "https://www.electric8.co/",
        "note": "Supported early-stage startups in SEA on PLG and launches."
    },
    {
        "company": "Everli",
        "title": "Product Manager",
        "location": "Milan, Italy",
        "dates": "Apr 2020 — Mar 2021",
        "url": "https://www.everli.com/",
        "note": "Growth focus on top-of-funnel and onboarding."
    },
    {
        "company": "First Circle",
        "title": "Growth Product Manager; prior Growth Marketing Manager; prior Growth Marketing Analyst",
        "location": "Philippines",
        "dates": "2017 — Jun 2020",
        "url": "https://firstcircle.ph/",
        "note": "From Seed to Series B; built experimentation and growth programs."
    },
    {
        "company": "Accenture",
        "title": "Consulting Intern",
        "location": "",
        "dates": "2016",
        "url": "https://www.accenture.com/",
        "note": "Early exposure to consulting work."
    }
];

// Navigation functionality
function initNavigation() {
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'about.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'about.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

// Experience timeline rendering
function initExperienceTimeline() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;
    
    experienceData.forEach(role => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        // Create company link if URL exists
        const companyText = role.url ? 
            `<a href="${role.url}" target="_blank" rel="noopener noreferrer">${role.company}</a>` : 
            role.company;
        
        timelineItem.innerHTML = `
            <div class="role-header">${role.title} — ${companyText}</div>
            <div class="role-meta">
                <span>${role.dates}</span>
                ${role.location ? `<span class="location-badge">${role.location}</span>` : ''}
            </div>
            <div class="role-note">${role.note}</div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Contact form functionality
function initContactForm() {
    const emailLink = document.querySelector('.email-link');
    const toast = document.getElementById('copy-toast');
    
    if (emailLink && toast) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('data-email');
            
            // Copy to clipboard
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast();
                }).catch(() => {
                    fallbackCopy(email);
                });
            } else {
                fallbackCopy(email);
            }
        });
    }
}

// Fallback copy method for older browsers
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        console.error('Copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success toast
function showToast() {
    const toast = document.getElementById('copy-toast');
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
}

// Resume button functionality
function initResumeButton() {
    const resumeButton = document.querySelector('.resume-button');
    if (resumeButton) {
        // Check if resume file exists
        fetch('assets/resume.pdf', { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    resumeButton.style.display = 'inline-block';
                }
            })
            .catch(() => {
                // File doesn't exist, keep button hidden
            });
    }
}

// Header scroll behavior
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Respect reduced motion preferences
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
}

// Initialize reduced motion check
respectReducedMotion();