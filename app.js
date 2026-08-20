document.addEventListener('DOMContentLoaded', () => {
    // Profile Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked tab
            btn.classList.add('active');
            
            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Select elements
    const calendarModal = document.getElementById('calendar-modal');
    const eventModal = document.getElementById('event-modal');
    const outfitModal = document.getElementById('outfit-modal');
    
    const sidebarModal = document.getElementById('sidebar-modal');
    const clothViewModal = document.getElementById('cloth-view-modal');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    
    const btnExpandCalendar = document.getElementById('expand-calendar');
    const btnOpenEventModal = document.getElementById('open-event-modal');
    
    const closeBtns = document.querySelectorAll('.close-modal');
    
    // Open Full Calendar
    if (btnExpandCalendar) {
        btnExpandCalendar.addEventListener('click', () => {
            calendarModal.classList.add('active');
        });
    }
    
    // Open Add Event Form
    if (btnOpenEventModal) {
        btnOpenEventModal.addEventListener('click', () => {
            eventModal.classList.add('active');
        });
    }
    
    // Open Sidebar Menu
    if (hamburgerBtn && sidebarModal) {
        hamburgerBtn.addEventListener('click', () => {
            sidebarModal.classList.add('active');
        });
    }
    
    // Close Modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Optional: Close modal on outside click
    [calendarModal, eventModal, outfitModal, sidebarModal, clothViewModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    });

    // Dynamic Calendar Generation
    const weekDaysContainerInner = document.querySelector('.week-days');
    if (weekDaysContainerInner) {
        weekDaysContainerInner.innerHTML = '';
        const today = new Date();
        const formatter = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric' });
        
        for (let i = -3; i <= 3; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            
            const parts = formatter.formatToParts(d);
            const dayName = parts.find(p => p.type === 'weekday').value;
            const dayNumber = parts.find(p => p.type === 'day').value;
            
            const isToday = i === 0;
            const dayDiv = document.createElement('div');
            dayDiv.className = `day ${isToday ? 'today active' : ''}`;
            dayDiv.innerHTML = `<span>${dayName}</span><strong>${dayNumber}</strong>`;
            
            dayDiv.addEventListener('click', function() {
                document.querySelectorAll('.week-days .day').forEach(el => el.classList.remove('active'));
                this.classList.add('active');
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
            
            weekDaysContainerInner.appendChild(dayDiv);
        }
        
        // Update month title
        const monthFormatter = new Intl.DateTimeFormat('fa-IR', { month: 'long', year: 'numeric' });
        const monthTitle = document.querySelector('.month-title');
        if (monthTitle) {
            monthTitle.innerText = monthFormatter.format(today);
        }

        // Center today by default
        setTimeout(() => {
            const activeDay = weekDaysContainerInner.querySelector('.day.active');
            if (activeDay) {
                activeDay.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
            }
        }, 100);
    }

    // Calendar Navigation Arrows
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');
    const weekDaysContainer = document.querySelector('.week-days-container');

    if (prevDayBtn && weekDaysContainer) {
        prevDayBtn.addEventListener('click', () => {
            weekDaysContainer.scrollBy({ left: 100, behavior: 'smooth' }); // rtl: left is right physically
        });
    }

    if (nextDayBtn && weekDaysContainer) {
        nextDayBtn.addEventListener('click', () => {
            weekDaysContainer.scrollBy({ left: -100, behavior: 'smooth' });
        });
    }

    // Edit Event Button
    const editBtn = document.querySelector('.edit-btn');
    if (editBtn && eventModal) {
        editBtn.addEventListener('click', () => {
            eventModal.classList.add('active');
        });
    }

    // Cloth Item Details Modal (Profile Page)
    const clothStickers = document.querySelectorAll('.clothing-sticker');
    const clothModalImg = document.getElementById('cloth-modal-img');
    const clothModalTitle = document.getElementById('cloth-modal-title');

    clothStickers.forEach((sticker) => {
        sticker.addEventListener('click', () => {
            const imgEl = sticker.querySelector('img');
            if (imgEl) {
                const imgSrc = imgEl.src;
                const altText = imgEl.alt;
                
                if (clothModalImg) clothModalImg.src = imgSrc;
                if (clothModalTitle) clothModalTitle.innerText = altText || 'جزئیات لباس';
                if (clothViewModal) clothViewModal.classList.add('active');
            }
        });
    });

    // Toggle full closet view
    const toggleClosetBtn = document.getElementById('toggle-closet-btn');
    const clothesGrid = document.getElementById('clothes-grid');
    const closetWrapper = document.getElementById('closet-wrapper');
    if (toggleClosetBtn && clothesGrid && closetWrapper) {
        toggleClosetBtn.addEventListener('click', () => {
            const isExpanded = clothesGrid.classList.contains('expanded');
            if (isExpanded) {
                clothesGrid.classList.remove('expanded');
                closetWrapper.classList.remove('expanded');
                toggleClosetBtn.classList.remove('expanded');
                toggleClosetBtn.querySelector('span').innerText = 'مشاهده همه کمد';
            } else {
                clothesGrid.classList.add('expanded');
                closetWrapper.classList.add('expanded');
                toggleClosetBtn.classList.add('expanded');
                toggleClosetBtn.querySelector('span').innerText = 'بستن لیست کمد';
            }
        });
    }

    // Outfit Details Modal
    const outfitItems = document.querySelectorAll('[data-suggestion-card]');
    const outfitModalImg = document.getElementById('outfit-modal-img');
    const outfitModalTitle = document.getElementById('outfit-modal-title');
    
    outfitItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const titleEl = item.querySelector('.reasoning-item-title') || item.querySelector('span');
            const title = titleEl ? titleEl.innerText : '';
            
            if (outfitModalImg) outfitModalImg.src = imgSrc;
            if (outfitModalTitle) outfitModalTitle.innerText = title;
            if (outfitModal) outfitModal.classList.add('active');
        });
    });

    // AI Suggest Again Effect for each suggestion card
    const suggestBtns = document.querySelectorAll('.suggest-again-btn');
    
    suggestBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent opening the modal
            e.stopPropagation();
            
            // Find the related image wrapper
            const suggestionWrapper = btn.closest('.suggestion-wrapper');
            if (!suggestionWrapper) return;
            
            const imageWrapper = suggestionWrapper.querySelector('.image-wrapper');
            const imgEl = imageWrapper.querySelector('img');
            const titleEl = suggestionWrapper.querySelector('.reasoning-item-title');
            
            if (!imageWrapper || imageWrapper.classList.contains('ai-loading')) return;
            
            // Add loading effect
            imageWrapper.classList.add('ai-loading');
            
            // Simulate AI processing time
            setTimeout(() => {
                imageWrapper.classList.remove('ai-loading');
                
                // Toggle between two images/titles for demo
                if (imgEl && titleEl) {
                    const currentSrc = imgEl.src;
                    const isCasual = currentSrc.includes('casual');
                    imgEl.src = isCasual ? 'assets/sporty_outfit_1786518654738.jpg' : 'assets/casual_outfit_1786518617507.jpg';
                    titleEl.innerText = isCasual ? 'ست اسپرت' : 'ست کژوال';
                    
                    // Also update the hidden span used for modal
                    const hiddenSpan = suggestionWrapper.querySelector('span[style*="display:none"]');
                    if (hiddenSpan) {
                        hiddenSpan.innerText = titleEl.innerText;
                    }
                }
            }, 1500);
        });
    });

    // Add Action Modal Logic (FAB + Menu)
    const addActionBtn = document.getElementById('add-action-btn') || document.getElementById('add-action-btn-profile');
    const addActionModal = document.getElementById('add-action-modal') || document.getElementById('add-action-modal-profile');
    
    if (addActionBtn && addActionModal) {
        addActionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const fab = addActionBtn.querySelector('.fab-inline');
            if (addActionModal.classList.contains('active')) {
                addActionModal.classList.remove('active');
                if (fab) fab.classList.remove('rotated');
            } else {
                addActionModal.classList.add('active');
                if (fab) fab.classList.add('rotated');
            }
        });

        // Close on overlay click
        addActionModal.addEventListener('click', (e) => {
            if (e.target === addActionModal) {
                addActionModal.classList.remove('active');
                const fab = addActionBtn.querySelector('.fab-inline');
                if (fab) fab.classList.remove('rotated');
            }
        });
    }

    // Bookmark Animation Logic
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    const targetHamburgerMenu = document.getElementById('hamburger-btn');

    bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Toggle active state
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                return; // Only animate on adding bookmark
            }
            
            if (!targetHamburgerMenu) return;
            
            // Create flying icon
            const flyingIcon = document.createElement('div');
            flyingIcon.classList.add('flying-icon');
            flyingIcon.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
            document.body.appendChild(flyingIcon);
            
            // Get starting position
            const btnRect = btn.getBoundingClientRect();
            
            // Get target position
            const targetRect = targetHamburgerMenu.getBoundingClientRect();
            
            // Initial position
            flyingIcon.style.left = btnRect.left + 'px';
            flyingIcon.style.top = btnRect.top + 'px';
            
            // Trigger animation
            requestAnimationFrame(() => {
                setTimeout(() => {
                    // 16 is half the width/height of the flying icon
                    flyingIcon.style.left = (targetRect.left + targetRect.width / 2 - 16) + 'px';
                    flyingIcon.style.top = (targetRect.top + targetRect.height / 2 - 16) + 'px';4
                }, 50);
            });
            
            // Clean up and animate hamburger menu
            setTimeout(() => {
                flyingIcon.remove();
                targetHamburgerMenu.style.transition = 'transform 0.2s';
                targetHamburgerMenu.style.transform = 'scale(1.3)';
                targetHamburgerMenu.style.color = 'var(--color-dark)';
                setTimeout(() => {
                    targetHamburgerMenu.style.transform = 'scale(1)';
                }, 200);
            }, 850);
        });
    });

    // --- Viewport and Bottom Nav Constant Scanner ---
    function keepBottomNavVisible() {
        const appContainer = document.querySelector('.app-container');
        const bottomNav = document.querySelector('.bottom-nav');
        
        if (!appContainer || !bottomNav) return;

        // Sync container with actual viewport height to fix mobile URL bar issues
        const vh = window.innerHeight;
        appContainer.style.height = `${vh}px`;
        
        // Prevent body scroll which can push the container out of view
        document.body.style.height = `${vh}px`;
        document.body.style.minHeight = `${vh}px`;
        document.body.style.overflow = 'hidden';

        // Constantly scan if the bottom-nav is pushed outside the visible screen
        const navRect = bottomNav.getBoundingClientRect();
        if (navRect.bottom > vh) {
            const currentBottom = parseFloat(window.getComputedStyle(bottomNav).bottom) || 16;
            const overlap = navRect.bottom - vh;
            // Push it up by the overlap amount
            bottomNav.style.bottom = `${currentBottom + overlap + 4}px`;
        } else if (navRect.bottom < vh - 24) {
            // Reset to default 16px if there's too much gap (meaning viewport is fine)
            bottomNav.style.bottom = '16px';
        }
    }

    // Run on init
    keepBottomNavVisible();
    
    // Listeners for layout changes
    window.addEventListener('resize', keepBottomNavVisible);
    window.addEventListener('scroll', keepBottomNavVisible, true);
    window.addEventListener('orientationchange', keepBottomNavVisible);
    
    // Constant loop scanner as requested to ensure it's never lost
    setInterval(keepBottomNavVisible, 500);
});
