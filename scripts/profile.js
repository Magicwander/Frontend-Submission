// Profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    initProfilePage();
});

function initProfilePage() {
    // Initialize edit buttons
    initEditButtons();
    
    // Initialize profile actions
    initProfileActions();
    
    // Initialize avatar upload
    initAvatarUpload();
    
    // Load user data
    loadProfileData();
}

// Initialize edit section buttons
function initEditButtons() {
    const editButtons = document.querySelectorAll('.edit-section-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.dataset.section;
            editSection(section);
        });
    });
}

// Initialize profile action buttons
function initProfileActions() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const shareProfileBtn = document.getElementById('shareProfileBtn');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Edit profile functionality coming soon!', 'info');
            } else {
                alert('Edit profile functionality coming soon!');
            }
        });
    }
    
    if (shareProfileBtn) {
        shareProfileBtn.addEventListener('click', function() {
            shareProfile();
        });
    }
}

// Initialize avatar upload functionality
function initAvatarUpload() {
    const avatarEditBtn = document.getElementById('avatarEditBtn');
    
    if (avatarEditBtn) {
        avatarEditBtn.addEventListener('click', function() {
            // Create file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    handleAvatarUpload(file);
                }
            });
            
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
        });
    }
}

// Handle avatar upload
function handleAvatarUpload(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        if (window.AlphaApp && window.AlphaApp.showNotification) {
            window.AlphaApp.showNotification('Please select a valid image file', 'error');
        } else {
            alert('Please select a valid image file');
        }
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        if (window.AlphaApp && window.AlphaApp.showNotification) {
            window.AlphaApp.showNotification('Image size must be less than 5MB', 'error');
        } else {
            alert('Image size must be less than 5MB');
        }
        return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const avatarImg = document.getElementById('profileAvatar');
        if (avatarImg) {
            avatarImg.src = e.target.result;
            
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Avatar updated successfully!', 'success');
            } else {
                alert('Avatar updated successfully!');
            }
        }
    };
    reader.readAsDataURL(file);
}

// Edit section functionality
function editSection(section) {
    switch (section) {
        case 'about':
            editAboutSection();
            break;
        case 'skills':
            editSkillsSection();
            break;
        case 'experience':
            editExperienceSection();
            break;
        case 'portfolio':
            editPortfolioSection();
            break;
        default:
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification(`Edit ${section} functionality coming soon!`, 'info');
            } else {
                alert(`Edit ${section} functionality coming soon!`);
            }
    }
}

// Edit about section
function editAboutSection() {
    const aboutContent = document.querySelector('.about-content p');
    if (!aboutContent) return;
    
    const currentText = aboutContent.textContent;
    
    // Create textarea for editing
    const textarea = document.createElement('textarea');
    textarea.value = currentText;
    textarea.style.width = '100%';
    textarea.style.minHeight = '120px';
    textarea.style.background = 'rgba(255, 255, 255, 0.1)';
    textarea.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    textarea.style.borderRadius = '0.5rem';
    textarea.style.padding = '1rem';
    textarea.style.color = 'white';
    textarea.style.fontFamily = 'inherit';
    textarea.style.fontSize = '1rem';
    textarea.style.resize = 'vertical';
    
    // Create buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '1rem';
    buttonContainer.style.marginTop = '1rem';
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'btn btn-primary';
    saveBtn.style.padding = '0.5rem 1rem';
    saveBtn.style.fontSize = '0.875rem';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.style.padding = '0.5rem 1rem';
    cancelBtn.style.fontSize = '0.875rem';
    
    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(cancelBtn);
    
    // Replace content
    aboutContent.style.display = 'none';
    aboutContent.parentNode.appendChild(textarea);
    aboutContent.parentNode.appendChild(buttonContainer);
    
    // Focus textarea
    textarea.focus();
    
    // Save functionality
    saveBtn.addEventListener('click', function() {
        aboutContent.textContent = textarea.value;
        aboutContent.style.display = 'block';
        textarea.remove();
        buttonContainer.remove();
        
        if (window.AlphaApp && window.AlphaApp.showNotification) {
            window.AlphaApp.showNotification('About section updated successfully!', 'success');
        }
    });
    
    // Cancel functionality
    cancelBtn.addEventListener('click', function() {
        aboutContent.style.display = 'block';
        textarea.remove();
        buttonContainer.remove();
    });
}

// Edit skills section
function editSkillsSection() {
    if (window.AlphaApp && window.AlphaApp.showNotification) {
        window.AlphaApp.showNotification('Skills editing functionality coming soon!', 'info');
    } else {
        alert('Skills editing functionality coming soon!');
    }
}

// Edit experience section
function editExperienceSection() {
    if (window.AlphaApp && window.AlphaApp.showNotification) {
        window.AlphaApp.showNotification('Experience editing functionality coming soon!', 'info');
    } else {
        alert('Experience editing functionality coming soon!');
    }
}

// Edit portfolio section
function editPortfolioSection() {
    if (window.AlphaApp && window.AlphaApp.showNotification) {
        window.AlphaApp.showNotification('Portfolio editing functionality coming soon!', 'info');
    } else {
        alert('Portfolio editing functionality coming soon!');
    }
}

// Share profile functionality
function shareProfile() {
    const profileUrl = window.location.href;
    
    // Try to use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: 'Alex Thompson - Alpha Profile',
            text: 'Check out my Web3 developer profile on Alpha',
            url: profileUrl
        }).then(() => {
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Profile shared successfully!', 'success');
            }
        }).catch(() => {
            fallbackShare(profileUrl);
        });
    } else {
        fallbackShare(profileUrl);
    }
}

// Fallback share functionality
function fallbackShare(url) {
    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Profile URL copied to clipboard!', 'success');
            } else {
                alert('Profile URL copied to clipboard!');
            }
        }).catch(() => {
            showShareModal(url);
        });
    } else {
        showShareModal(url);
    }
}

// Show share modal
function showShareModal(url) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10000';
    
    const content = document.createElement('div');
    content.style.background = 'rgba(17, 24, 39, 0.95)';
    content.style.padding = '2rem';
    content.style.borderRadius = '1rem';
    content.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    content.style.backdropFilter = 'blur(12px)';
    content.style.maxWidth = '500px';
    content.style.width = '90%';
    
    content.innerHTML = `
        <h3 style="color: white; margin-bottom: 1rem;">Share Profile</h3>
        <p style="color: #9ca3af; margin-bottom: 1rem;">Copy this URL to share your profile:</p>
        <input type="text" value="${url}" readonly style="width: 100%; padding: 0.75rem; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 0.5rem; color: white; margin-bottom: 1rem;">
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button id="copyUrlBtn" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Copy URL</button>
            <button id="closeModalBtn" style="padding: 0.5rem 1rem; background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 0.5rem; cursor: pointer;">Close</button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Copy URL functionality
    const copyBtn = content.querySelector('#copyUrlBtn');
    const urlInput = content.querySelector('input');
    
    copyBtn.addEventListener('click', function() {
        urlInput.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            modal.remove();
        }, 1000);
    });
    
    // Close modal
    const closeBtn = content.querySelector('#closeModalBtn');
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Load profile data (demo data)
function loadProfileData() {
    // This would typically load data from an API
    // For now, we'll just use the static data in the HTML
    console.log('Profile data loaded');
}
