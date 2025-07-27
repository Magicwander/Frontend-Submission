// Projects page functionality
document.addEventListener('DOMContentLoaded', function() {
    initProjectsPage();
});

function initProjectsPage() {
    // Sample projects data
    const allProjects = [
        {
            id: 1,
            title: "DeFi Yield Farming Protocol",
            description: "Build a comprehensive yield farming platform with multiple pool strategies and automated compounding features.",
            budget: "$15,000 - $25,000",
            duration: "3-4 months",
            category: "defi",
            skills: ["Solidity", "React", "Web3.js", "Node.js"],
            proposals: 12,
            posted: "2 days ago"
        },
        {
            id: 2,
            title: "NFT Marketplace Development",
            description: "Create a modern NFT marketplace with advanced filtering, bidding system, and creator royalties.",
            budget: "$20,000 - $35,000",
            duration: "4-6 months",
            category: "nft",
            skills: ["Solidity", "React", "IPFS", "OpenSea API"],
            proposals: 8,
            posted: "1 day ago"
        },
        {
            id: 3,
            title: "DAO Governance Platform",
            description: "Develop a decentralized governance platform with proposal creation, voting mechanisms, and treasury management.",
            budget: "$25,000 - $40,000",
            duration: "5-7 months",
            category: "dao",
            skills: ["Solidity", "Vue.js", "Aragon", "Snapshot"],
            proposals: 15,
            posted: "3 days ago"
        },
        {
            id: 4,
            title: "Web3 Gaming Integration",
            description: "Integrate blockchain features into existing game including NFT items, token rewards, and marketplace.",
            budget: "$10,000 - $18,000",
            duration: "2-3 months",
            category: "gaming",
            skills: ["Unity", "C#", "Solidity", "Moralis"],
            proposals: 6,
            posted: "5 days ago"
        },
        {
            id: 5,
            title: "Cross-Chain Bridge Protocol",
            description: "Build a secure cross-chain bridge for transferring assets between Ethereum and Polygon networks.",
            budget: "$30,000 - $50,000",
            duration: "6-8 months",
            category: "infrastructure",
            skills: ["Solidity", "Go", "Chainlink", "Security Auditing"],
            proposals: 20,
            posted: "1 week ago"
        },
        {
            id: 6,
            title: "Decentralized Exchange (DEX)",
            description: "Create a high-performance DEX with automated market making, liquidity pools, and advanced trading features.",
            budget: "$40,000 - $60,000",
            duration: "8-10 months",
            category: "defi",
            skills: ["Solidity", "React", "The Graph", "Uniswap V3"],
            proposals: 25,
            posted: "1 week ago"
        },
        {
            id: 7,
            title: "AI-Powered NFT Generator",
            description: "Build an AI-driven platform for generating unique NFT artwork with customizable traits and rarity systems.",
            budget: "$12,000 - $20,000",
            duration: "3-4 months",
            category: "nft",
            skills: ["Python", "TensorFlow", "Solidity", "React"],
            proposals: 18,
            posted: "3 days ago"
        },
        {
            id: 8,
            title: "Multi-Chain Wallet Integration",
            description: "Develop a comprehensive wallet solution supporting multiple blockchains with seamless asset management.",
            budget: "$25,000 - $35,000",
            duration: "5-6 months",
            category: "infrastructure",
            skills: ["TypeScript", "Web3.js", "Ethers.js", "React Native"],
            proposals: 14,
            posted: "2 days ago"
        },
        {
            id: 9,
            title: "Play-to-Earn Game Economy",
            description: "Design and implement a sustainable tokenomics model for a blockchain-based gaming ecosystem.",
            budget: "$18,000 - $28,000",
            duration: "4-5 months",
            category: "gaming",
            skills: ["Solidity", "Unity", "Game Design", "Economics"],
            proposals: 11,
            posted: "4 days ago"
        }
    ];
    
    let filteredProjects = [...allProjects];
    let displayedProjects = [];
    let currentPage = 0;
    const projectsPerPage = 6;
    
    // DOM elements
    const projectsGrid = document.getElementById('projectsGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const budgetFilter = document.getElementById('budgetFilter');
    const sortFilter = document.getElementById('sortFilter');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Initialize
    function init() {
        renderProjects();
        setupEventListeners();
        setupScrollAnimations();
    }
    
    // Setup event listeners
    function setupEventListeners() {
        if (searchInput) {
            searchInput.addEventListener('input', debounce(handleSearch, 300));
        }
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', handleFilters);
        }
        
        if (budgetFilter) {
            budgetFilter.addEventListener('change', handleFilters);
        }
        
        if (sortFilter) {
            sortFilter.addEventListener('change', handleFilters);
        }
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreProjects);
        }
    }
    
    // Handle search
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredProjects = [...allProjects];
        } else {
            filteredProjects = allProjects.filter(project => 
                project.title.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.skills.some(skill => skill.toLowerCase().includes(searchTerm))
            );
        }
        
        applyFiltersAndSort();
        resetPagination();
        renderProjects();
    }
    
    // Handle filters
    function handleFilters() {
        applyFiltersAndSort();
        resetPagination();
        renderProjects();
    }
    
    // Apply filters and sorting
    function applyFiltersAndSort() {
        let projects = [...filteredProjects];
        
        // Apply category filter
        const selectedCategory = categoryFilter?.value || 'all';
        if (selectedCategory !== 'all') {
            projects = projects.filter(project => project.category === selectedCategory);
        }
        
        // Apply budget filter
        const selectedBudget = budgetFilter?.value || 'all';
        if (selectedBudget !== 'all') {
            projects = projects.filter(project => {
                const budgetRange = extractBudgetRange(project.budget);
                return isInBudgetRange(budgetRange, selectedBudget);
            });
        }
        
        // Apply sorting
        const sortBy = sortFilter?.value || 'newest';
        projects = sortProjects(projects, sortBy);
        
        filteredProjects = projects;
    }
    
    // Extract budget range from budget string
    function extractBudgetRange(budgetString) {
        const matches = budgetString.match(/\$?([\d,]+)/g);
        if (matches && matches.length >= 2) {
            const min = parseInt(matches[0].replace(/[$,]/g, ''));
            const max = parseInt(matches[1].replace(/[$,]/g, ''));
            return { min, max };
        }
        return { min: 0, max: 0 };
    }
    
    // Check if project budget is in selected range
    function isInBudgetRange(projectBudget, selectedRange) {
        switch (selectedRange) {
            case '0-5000':
                return projectBudget.max <= 5000;
            case '5000-15000':
                return projectBudget.min >= 5000 && projectBudget.max <= 15000;
            case '15000-50000':
                return projectBudget.min >= 15000 && projectBudget.max <= 50000;
            case '50000+':
                return projectBudget.min >= 50000;
            default:
                return true;
        }
    }
    
    // Sort projects
    function sortProjects(projects, sortBy) {
        const sorted = [...projects];
        
        switch (sortBy) {
            case 'budget-high':
                return sorted.sort((a, b) => {
                    const budgetA = extractBudgetRange(a.budget);
                    const budgetB = extractBudgetRange(b.budget);
                    return budgetB.max - budgetA.max;
                });
            case 'budget-low':
                return sorted.sort((a, b) => {
                    const budgetA = extractBudgetRange(a.budget);
                    const budgetB = extractBudgetRange(b.budget);
                    return budgetA.min - budgetB.min;
                });
            case 'deadline':
                return sorted.sort((a, b) => a.duration.localeCompare(b.duration));
            case 'newest':
            default:
                return sorted.sort((a, b) => {
                    const timeA = parseTimeAgo(a.posted);
                    const timeB = parseTimeAgo(b.posted);
                    return timeA - timeB;
                });
        }
    }
    
    // Parse "time ago" string to comparable number
    function parseTimeAgo(timeString) {
        const matches = timeString.match(/(\d+)\s+(day|week|month)s?\s+ago/);
        if (matches) {
            const value = parseInt(matches[1]);
            const unit = matches[2];
            switch (unit) {
                case 'day': return value;
                case 'week': return value * 7;
                case 'month': return value * 30;
                default: return 0;
            }
        }
        return 0;
    }
    
    // Reset pagination
    function resetPagination() {
        currentPage = 0;
        displayedProjects = [];
    }
    
    // Load more projects
    function loadMoreProjects() {
        const startIndex = currentPage * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const newProjects = filteredProjects.slice(startIndex, endIndex);
        
        displayedProjects = [...displayedProjects, ...newProjects];
        currentPage++;
        
        renderNewProjects(newProjects);
        updateLoadMoreButton();
    }
    
    // Render projects
    function renderProjects() {
        if (!projectsGrid) return;
        
        // Show loading state
        showLoadingState();
        
        // Simulate loading delay
        setTimeout(() => {
            displayedProjects = filteredProjects.slice(0, projectsPerPage);
            currentPage = 1;
            
            if (displayedProjects.length === 0) {
                showEmptyState();
            } else {
                renderProjectCards(displayedProjects);
            }
            
            updateLoadMoreButton();
        }, 300);
    }
    
    // Render new projects (for load more)
    function renderNewProjects(projects) {
        projects.forEach((project, index) => {
            const projectCard = createProjectCard(project);
            projectCard.style.opacity = '0';
            projectCard.style.transform = 'translateY(30px)';
            projectsGrid.appendChild(projectCard);
            
            // Animate in
            setTimeout(() => {
                projectCard.style.transition = 'all 0.6s ease-out';
                projectCard.style.opacity = '1';
                projectCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Render project cards
    function renderProjectCards(projects) {
        projectsGrid.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = createProjectCard(project);
            projectCard.classList.add('animate-on-scroll');
            projectCard.style.animationDelay = `${index * 0.1}s`;
            projectsGrid.appendChild(projectCard);
        });
        
        // Trigger scroll animations
        setupScrollAnimations();
    }
    
    // Create project card HTML
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-header">
                <span class="project-category ${project.category}">${project.category.toUpperCase()}</span>
                <span class="project-budget">${project.budget}</span>
            </div>
            
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            
            <div class="project-meta">
                <div class="project-duration">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${project.duration}
                </div>
                <div class="project-posted">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    ${project.posted}
                </div>
            </div>
            
            <div class="project-skills">
                ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            
            <div class="project-footer">
                <span class="project-proposals">${project.proposals} proposals</span>
                <a href="#" class="project-cta" onclick="handleProjectClick(${project.id})">
                    Apply Now
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        `;
        
        return card;
    }
    
    // Show loading state
    function showLoadingState() {
        projectsGrid.innerHTML = '';
        
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'project-card loading';
            skeleton.innerHTML = `
                <div class="project-header">
                    <div class="loading-skeleton" style="width: 80px; height: 24px;"></div>
                    <div class="loading-skeleton" style="width: 120px; height: 20px;"></div>
                </div>
                <div class="project-title loading-skeleton"></div>
                <div class="project-description loading-skeleton"></div>
                <div class="project-meta loading-skeleton"></div>
                <div class="project-skills">
                    <div class="loading-skeleton" style="width: 60px; height: 24px; border-radius: 4px;"></div>
                    <div class="loading-skeleton" style="width: 80px; height: 24px; border-radius: 4px;"></div>
                    <div class="loading-skeleton" style="width: 70px; height: 24px; border-radius: 4px;"></div>
                </div>
                <div class="project-footer">
                    <div class="loading-skeleton" style="width: 100px; height: 20px;"></div>
                    <div class="loading-skeleton" style="width: 90px; height: 36px; border-radius: 8px;"></div>
                </div>
            `;
            projectsGrid.appendChild(skeleton);
        }
    }
    
    // Show empty state
    function showEmptyState() {
        projectsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <svg class="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <h3>No projects found</h3>
                <p>Try adjusting your search criteria or filters to find more projects.</p>
            </div>
        `;
    }
    
    // Update load more button
    function updateLoadMoreButton() {
        if (!loadMoreBtn) return;
        
        const hasMoreProjects = displayedProjects.length < filteredProjects.length;
        loadMoreBtn.style.display = hasMoreProjects ? 'inline-flex' : 'none';
    }
    
    // Setup scroll animations
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Debounce utility
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Initialize filters
    function initFilters() {
        // Set default values and ensure filters are working
        if (categoryFilter) categoryFilter.value = 'all';
        if (budgetFilter) budgetFilter.value = 'all';
        if (sortFilter) sortFilter.value = 'newest';
    }

    initFilters();

    // Initial render
    init();

    // Expose functions for global use
    window.handleProjectClick = function(projectId) {
        const project = allProjects.find(p => p.id === projectId);
        if (project) {
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification(`Applying to: ${project.title}`, 'info');
            }
            // In a real app, this would navigate to the project details page
            console.log('Applying to project:', project);
        }
    };

}
