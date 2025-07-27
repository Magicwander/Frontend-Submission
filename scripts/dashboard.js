// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    // Check authentication
    checkAuthentication();
    
    // Initialize components
    initUserMenu();
    initNotifications();
    initActiveProjects();
    initRecentActivity();
    initEarningsChart();
    setupScrollAnimations();
    
    console.log('Dashboard initialized');
}

// Check if user is authenticated
function checkAuthentication() {
    // Always allow access to dashboard (demo mode)
    loadUserData();
}

// Load user data
function loadUserData() {
    // Use demo data instead of localStorage
    const userEmail = 'demo@alpha.com';
    const walletAddress = '0x1234567890abcdef1234567890abcdef12345678';

    // Update user display
    const userNameDisplay = document.querySelector('.user-name-display');
    const userName = document.querySelector('.user-name');
    const userEmailDisplay = document.querySelector('.user-email');

    const name = 'Demo User';
    if (userNameDisplay) userNameDisplay.textContent = name;
    if (userName) userName.textContent = name;
    if (userEmailDisplay) userEmailDisplay.textContent = userEmail;
}

// Initialize user menu
function initUserMenu() {
    const userMenuToggle = document.getElementById('userMenuToggle');
    const userMenu = document.getElementById('userMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (!userMenuToggle || !userMenu) return;
    
    // Toggle user menu
    userMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        userMenu.classList.toggle('open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!userMenu.contains(e.target)) {
            userMenu.classList.remove('open');
        }
    });
    
    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Handle logout
function handleLogout() {
    // Just show a message, don't redirect
    if (window.AlphaApp && window.AlphaApp.showNotification) {
        window.AlphaApp.showNotification('This is a demo dashboard', 'info');
    } else {
        alert('This is a demo dashboard');
    }
}

// Initialize notifications
function initNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationPanel = document.getElementById('notificationPanel');
    const closeNotifications = document.getElementById('closeNotifications');
    const notificationsList = document.getElementById('notificationsList');
    
    if (!notificationBtn || !notificationPanel) return;
    
    // Sample notifications data
    const notifications = [
        {
            id: 1,
            type: 'project',
            title: 'New project proposal',
            message: 'You received a new proposal for "DeFi Yield Farming Protocol"',
            time: '2 minutes ago',
            unread: true,
            icon: 'briefcase'
        },
        {
            id: 2,
            type: 'payment',
            title: 'Payment received',
            message: '$2,500 payment for "NFT Marketplace" project has been processed',
            time: '1 hour ago',
            unread: true,
            icon: 'dollar'
        },
        {
            id: 3,
            type: 'message',
            title: 'New message',
            message: 'Client sent you a message about project requirements',
            time: '3 hours ago',
            unread: false,
            icon: 'message'
        }
    ];
    
    // Toggle notification panel
    notificationBtn.addEventListener('click', function() {
        notificationPanel.classList.toggle('open');
        renderNotifications(notifications);
    });
    
    // Close notification panel
    if (closeNotifications) {
        closeNotifications.addEventListener('click', function() {
            notificationPanel.classList.remove('open');
        });
    }
    
    // Render notifications
    function renderNotifications(notifications) {
        if (!notificationsList) return;
        
        notificationsList.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.unread ? 'unread' : ''}">
                <div class="notification-icon">
                    ${getNotificationIcon(notification.icon)}
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${notification.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    function getNotificationIcon(type) {
        const icons = {
            briefcase: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0h8" /></svg>',
            dollar: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>',
            message: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>'
        };
        return icons[type] || icons.message;
    }
}

// Initialize active projects
function initActiveProjects() {
    const activeProjectsList = document.getElementById('activeProjectsList');
    if (!activeProjectsList) return;
    
    // Sample active projects data
    const activeProjects = [
        {
            id: 1,
            name: 'DeFi Yield Farming Protocol',
            client: 'CryptoVentures Inc.',
            status: 'active',
            progress: 75
        },
        {
            id: 2,
            name: 'NFT Marketplace Frontend',
            client: 'ArtBlock Studios',
            status: 'review',
            progress: 90
        },
        {
            id: 3,
            name: 'DAO Governance Dashboard',
            client: 'DecentralizedDAO',
            status: 'active',
            progress: 45
        },
        {
            id: 4,
            name: 'Cross-Chain Bridge UI',
            client: 'BridgeProtocol',
            status: 'pending',
            progress: 20
        }
    ];
    
    // Render active projects
    activeProjectsList.innerHTML = activeProjects.map(project => `
        <div class="project-item">
            <div class="project-info">
                <div class="project-name">${project.name}</div>
                <div class="project-client">${project.client}</div>
            </div>
            <div class="project-status status-${project.status}">
                <span class="status-dot"></span>
                ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </div>
        </div>
    `).join('');
}

// Initialize recent activity
function initRecentActivity() {
    const activityList = document.getElementById('activityList');
    const refreshActivity = document.getElementById('refreshActivity');
    
    if (!activityList) return;
    
    // Sample activity data
    const activities = [
        {
            id: 1,
            type: 'payment',
            text: 'Received $2,500 payment for NFT Marketplace project',
            time: '2 hours ago',
            icon: 'dollar'
        },
        {
            id: 2,
            type: 'project',
            text: 'Submitted deliverables for DeFi Protocol',
            time: '5 hours ago',
            icon: 'upload'
        },
        {
            id: 3,
            type: 'message',
            text: 'New message from CryptoVentures Inc.',
            time: '1 day ago',
            icon: 'message'
        },
        {
            id: 4,
            type: 'proposal',
            text: 'Proposal accepted for Cross-Chain Bridge project',
            time: '2 days ago',
            icon: 'check'
        }
    ];
    
    // Render activity
    function renderActivity() {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon stat-icon-blue">
                    ${getActivityIcon(activity.icon)}
                </div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    function getActivityIcon(type) {
        const icons = {
            dollar: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>',
            upload: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>',
            message: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>',
            check: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
        };
        return icons[type] || icons.check;
    }
    
    // Initial render
    renderActivity();
    
    // Refresh activity
    if (refreshActivity) {
        refreshActivity.addEventListener('click', function() {
            this.textContent = 'Refreshing...';
            setTimeout(() => {
                renderActivity();
                this.textContent = 'Refresh';
                if (window.AlphaApp && window.AlphaApp.showNotification) {
                    window.AlphaApp.showNotification('Activity refreshed', 'success');
                }
            }, 1000);
        });
    }
}

// Initialize earnings chart
function initEarningsChart() {
    const earningsChart = document.getElementById('earningsChart');
    const chartPeriod = document.getElementById('chartPeriod');
    
    if (!earningsChart) return;
    
    // Simple chart placeholder
    earningsChart.innerHTML = `
        <div style="text-align: center; color: var(--gray-400);">
            <svg width="80" height="80" fill="currentColor" viewBox="0 0 24 24" style="margin-bottom: 1rem; opacity: 0.5;">
                <path d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0h8M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <p>Earnings chart will be displayed here</p>
            <p style="font-size: 0.875rem; margin-top: 0.5rem;">Integration with Chart.js or similar library</p>
        </div>
    `;
    
    // Handle period change
    if (chartPeriod) {
        chartPeriod.addEventListener('change', function() {
            earningsChart.innerHTML = `
                <div style="text-align: center; color: var(--gray-400);">
                    <div style="margin-bottom: 1rem;">Loading ${this.value} data...</div>
                    <div class="loading-skeleton" style="width: 100%; height: 120px; border-radius: 0.5rem;"></div>
                </div>
            `;
            
            setTimeout(() => {
                earningsChart.innerHTML = `
                    <div style="text-align: center; color: var(--gray-400);">
                        <svg width="80" height="80" fill="currentColor" viewBox="0 0 24 24" style="margin-bottom: 1rem; opacity: 0.5;">
                            <path d="M7 14l3-3 3 3 5-5m0 0l-3 3m3-3v3"/>
                        </svg>
                        <p>Earnings data for ${this.value}</p>
                        <p style="font-size: 0.875rem; margin-top: 0.5rem;">Chart updated successfully</p>
                    </div>
                `;
            }, 1500);
        });
    }
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

// Add some additional dashboard utilities
window.dashboard = {
    refreshData: function() {
        initActiveProjects();
        initRecentActivity();
        if (window.AlphaApp && window.AlphaApp.showNotification) {
            window.AlphaApp.showNotification('Dashboard data refreshed', 'success');
        }
    },
    
    logout: handleLogout,
    
    updateUserData: loadUserData
};
