document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navActions.classList.toggle('active');
        
        const icon = mobileMenuBtn.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.replace('ri-menu-3-line', 'ri-close-line');
        } else {
            icon.classList.replace('ri-close-line', 'ri-menu-3-line');
        }
    });

    // 3. Navbar Scrolled State
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Job Data Rendering & Filtering
    const jobsGrid = document.getElementById('jobs-container');
    
    const mockJobs = [
        {
            id: 1,
            company: "Figma",
            logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
            title: "Senior Product Designer",
            location: "San Francisco, CA",
            type: "Full Time",
            category: "design",
            salary: "$120k - $150k",
            posted: "2 days ago",
            tags: ["UI/UX", "Figma", "Prototyping"]
        },
        {
            id: 2,
            company: "Stripe",
            logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
            title: "Frontend Engineer",
            location: "Remote",
            type: "Full Time",
            category: "development",
            salary: "$140k - $180k",
            posted: "5 hours ago",
            tags: ["React", "TypeScript", "CSS"]
        },
        {
            id: 3,
            company: "Spotify",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
            title: "Growth Marketing Manager",
            location: "New York, NY",
            type: "Contract",
            category: "marketing",
            salary: "$90k - $110k",
            posted: "1 day ago",
            tags: ["SEO", "Campaigns", "Analytics"]
        },
        {
            id: 4,
            company: "Airbnb",
            logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
            title: "Backend Developer",
            location: "Remote",
            type: "Full Time",
            category: "development",
            salary: "$130k - $160k",
            posted: "3 days ago",
            tags: ["Node.js", "PostgreSQL", "AWS"]
        },
        {
            id: 5,
            company: "Notion",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
            title: "Visual Designer",
            location: "London, UK",
            type: "Part Time",
            category: "design",
            salary: "$70k - $90k",
            posted: "4 days ago",
            tags: ["Illustration", "Branding", "Web"]
        },
        {
            id: 6,
            company: "Slack",
            logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
            title: "Product Marketing Specialist",
            location: "Toronto, CA",
            type: "Full Time",
            category: "marketing",
            salary: "$85k - $105k",
            posted: "1 week ago",
            tags: ["B2B", "Strategy", "Copywriting"]
        }
    ];

    // Load saved jobs from localStorage
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

    function renderJobs(jobsToRender) {
        if (!jobsGrid) return;
        
        jobsGrid.innerHTML = '';
        
        if (jobsToRender.length === 0) {
            jobsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">No jobs found in this category.</div>';
            return;
        }

        jobsToRender.forEach(job => {
            const isSaved = savedJobs.includes(job.id);
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            
            let tagsHtml = job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('');
            
            jobCard.innerHTML = `
                <div class="job-card-header">
                    <img src="${job.logo}" alt="${job.company} logo" class="company-logo">
                    <button class="job-bookmark ${isSaved ? 'saved' : ''}" data-id="${job.id}" aria-label="Save Job">
                        <i class="ri-bookmark-${isSaved ? 'fill' : 'line'}"></i>
                    </button>
                </div>
                <h3>${job.title}</h3>
                <div class="company-name">${job.company} <i class="ri-verified-badge-fill" style="color: var(--primary-color);"></i></div>
                
                <div class="job-meta">
                    <div class="meta-item">
                        <i class="ri-map-pin-line"></i> ${job.location}
                    </div>
                    <div class="meta-item">
                        <i class="ri-time-line"></i> ${job.type}
                    </div>
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i> ${job.posted}
                    </div>
                </div>
                
                <div class="job-tags">
                    ${tagsHtml}
                </div>
                
                <div class="job-card-footer">
                    <div class="job-salary">
                        ${job.salary} <span>/year</span>
                    </div>
                    <a href="#" class="btn btn-primary" style="padding: 8px 16px;">Apply</a>
                </div>
            `;
            
            jobsGrid.appendChild(jobCard);
        });

        // Re-attach bookmark event listeners
        document.querySelectorAll('.job-bookmark').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                toggleSaveJob(id, e.currentTarget);
            });
        });
    }

    function toggleSaveJob(id, btnElement) {
        const icon = btnElement.querySelector('i');
        
        if (savedJobs.includes(id)) {
            savedJobs = savedJobs.filter(saveId => saveId !== id);
            btnElement.classList.remove('saved');
            icon.classList.replace('ri-bookmark-fill', 'ri-bookmark-line');
        } else {
            savedJobs.push(id);
            btnElement.classList.add('saved');
            icon.classList.replace('ri-bookmark-line', 'ri-bookmark-fill');
        }
        
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }

    // Initial Render
    renderJobs(mockJobs);

    // Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter data
            const category = btn.getAttribute('data-filter');
            if (category === 'all') {
                renderJobs(mockJobs);
            } else {
                const filtered = mockJobs.filter(job => job.category === category);
                renderJobs(filtered);
            }
        });
    });

    // 5. Modals Logic
    const loginBtn = document.querySelector('.btn-text'); // Simple selector based on our nav html
    const postJobBtn = document.querySelector('.nav-actions .btn-primary');
    
    const loginModal = document.getElementById('login-modal');
    const postJobModal = document.getElementById('post-job-modal');
    
    const closeLogin = document.getElementById('close-login');
    const closePostJob = document.getElementById('close-post-job');

    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if(loginBtn && loginModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(loginModal);
        });
    }

    if(postJobBtn && postJobModal) {
        postJobBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(postJobModal);
        });
    }

    if(closeLogin) closeLogin.addEventListener('click', () => closeModal(loginModal));
    if(closePostJob) closePostJob.addEventListener('click', () => closeModal(postJobModal));

    // Close on overlay click
    window.addEventListener('click', (e) => {
        if(e.target === loginModal) closeModal(loginModal);
        if(e.target === postJobModal) closeModal(postJobModal);
    });
});
