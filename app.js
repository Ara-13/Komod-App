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

// Custom Picker System
const CustomPicker = {
    modal: null,
    columnsContainer: null,
    titleEl: null,
    currentInput: null,
    currentDisplay: null,
    pickerType: null,
    columnsData: [],
    
    init() {
        this.modal = document.getElementById('custom-picker-modal');
        if (!this.modal) return;
        
        this.columnsContainer = document.getElementById('picker-columns');
        this.titleEl = document.getElementById('picker-title');
        
        // Setup Modal Events
        const cancelBtn = this.modal.querySelector('.picker-cancel');
        const confirmBtn = this.modal.querySelector('.picker-confirm');
        const overlay = this.modal;
        
        if (cancelBtn) cancelBtn.addEventListener('click', () => this.close());
        if (confirmBtn) confirmBtn.addEventListener('click', () => this.confirm());
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });
        
        // Replace all relevant inputs
        this.replaceInputs();
    },
    
    replaceInputs() {
        // Selects
        const selects = document.querySelectorAll('select.form-input');
        selects.forEach(select => this.createWrapper(select, 'select'));
        
        // Time Inputs
        const times = document.querySelectorAll('input[type="time"].form-input');
        times.forEach(time => this.createWrapper(time, 'time'));
        
        // Date Inputs
        const dates = document.querySelectorAll('input[type="date"].form-input');
        dates.forEach(date => this.createWrapper(date, 'date'));
    },
    
    createWrapper(originalInput, type) {
        if (originalInput.parentElement.classList.contains('custom-input-wrapper')) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-input-wrapper';
        
        const display = document.createElement('div');
        display.className = 'custom-input-display placeholder';
        display.innerHTML = `<span>انتخاب کنید...</span><i class="fa-solid fa-chevron-down"></i>`;
        
        originalInput.parentNode.insertBefore(wrapper, originalInput);
        wrapper.appendChild(display);
        wrapper.appendChild(originalInput);
        originalInput.classList.add('custom-input-hidden');
        
        // Change type to text so custom formats don't get rejected by the browser
        if (originalInput.tagName.toLowerCase() === 'input') {
            originalInput.type = 'text';
        }
        
        // Setup initial display value if any
        this.updateDisplay(originalInput, display, type);
        
        display.addEventListener('click', (e) => {
            e.preventDefault();
            this.open(originalInput, type, display);
        });
    },
    
    updateDisplay(input, display, type) {
        const val = input.value;
        const span = display.querySelector('span');
        if (!val) {
            display.classList.add('placeholder');
            span.innerText = type === 'time' ? 'ساعت' : type === 'date' ? 'تاریخ' : 'انتخاب کنید...';
            return;
        }
        display.classList.remove('placeholder');
        
        if (type === 'select') {
            const option = Array.from(input.options).find(o => o.value === val);
            span.innerText = option ? option.text : val;
        } else if (type === 'time') {
            span.innerText = val; // e.g. 14:30
        } else if (type === 'date') {
            span.innerText = val; // raw value display if updated programmatically
        }
    },
    
    open(input, type, display) {
        this.currentInput = input;
        this.currentDisplay = display;
        this.pickerType = type;
        
        let title = 'انتخاب';
        
        // Build Data
        this.columnsData = [];
        if (type === 'select') {
            title = 'انتخاب گزینه';
            const opts = Array.from(input.options).map(o => ({ value: o.value, label: o.text }));
            this.columnsData.push({ id: 'select-col', data: opts, current: input.value || opts[0]?.value });
        } else if (type === 'time') {
            title = 'انتخاب ساعت';
            const hours = Array.from({length: 24}, (_, i) => ({ value: String(i).padStart(2, '0'), label: String(i).padStart(2, '0') }));
            const mins = Array.from({length: 60}, (_, i) => ({ value: String(i).padStart(2, '0'), label: String(i).padStart(2, '0') }));
            
            let curH = '12', curM = '00';
            if (input.value) {
                [curH, curM] = input.value.split(':');
            }
            this.columnsData.push({ id: 'min-col', data: mins, current: curM });
            this.columnsData.push({ id: 'hour-col', data: hours, current: curH });
        } else if (type === 'date') {
            title = 'انتخاب تاریخ';
            const jalaliMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
            const years = Array.from({length: 20}, (_, i) => { const y = 1395 + i; return { value: y, label: y.toString() }; });
            const months = jalaliMonths.map((m, i) => ({ value: i + 1, label: m }));
            const days = Array.from({length: 31}, (_, i) => ({ value: i + 1, label: (i + 1).toString() }));
            
            // Extract current if any, else default 1405/5/17
            let curY = 1405, curM = 5, curD = 17;
            if (input.value) {
                const parts = input.value.split('/');
                if (parts.length === 3) {
                    curY = parseInt(parts[0]);
                    curM = parseInt(parts[1]);
                    curD = parseInt(parts[2]);
                }
            }
            
            this.columnsData.push({ id: 'day-col', data: days, current: curD });
            this.columnsData.push({ id: 'month-col', data: months, current: curM });
            this.columnsData.push({ id: 'year-col', data: years, current: curY });
        }
        
        this.titleEl.innerText = title;
        this.renderColumns();
        this.modal.classList.add('active');
        
        // Wait for render then scroll to selected
        setTimeout(() => {
            this.scrollToCurrent();
            this.setupScrollListeners();
        }, 10);
    },
    
    close() {
        this.modal.classList.remove('active');
    },
    
    confirm() {
        if (!this.currentInput) return;
        
        // Gather values from centered items
        const cols = Array.from(this.columnsContainer.querySelectorAll('.picker-column'));
        const values = cols.map(col => {
            const centerItem = this.getCenterItem(col);
            return centerItem ? centerItem.dataset.value : null;
        });
        
        let finalVal = '';
        let displayVal = '';
        
        if (this.pickerType === 'select') {
            finalVal = values[0];
            const opt = this.columnsData[0].data.find(d => d.value == finalVal);
            displayVal = opt ? opt.label : finalVal;
        } else if (this.pickerType === 'time') {
            finalVal = `${values[1]}:${values[0]}`;
            displayVal = finalVal;
        } else if (this.pickerType === 'date') {
            finalVal = `${values[2]}/${values[1]}/${values[0]}`; // YYYY/MM/DD
            const mLabel = this.columnsData[1].data.find(d => d.value == values[1]).label;
            displayVal = `${values[0]} ${mLabel} ${values[2]}`; // e.g. 17 مرداد 1405
        }
        
        this.currentInput.value = finalVal;
        
        // trigger change event
        const event = new Event('change', { bubbles: true });
        this.currentInput.dispatchEvent(event);
        
        // Update custom display manually with correct format if date, else fallback to updateDisplay
        if (this.pickerType === 'date') {
            this.currentDisplay.classList.remove('placeholder');
            this.currentDisplay.querySelector('span').innerText = displayVal;
        } else {
            this.updateDisplay(this.currentInput, this.currentDisplay, this.pickerType);
        }
        
        this.close();
    },
    
    renderColumns() {
        this.columnsContainer.innerHTML = '';
        this.columnsData.forEach(colData => {
            const col = document.createElement('div');
            col.className = 'picker-column';
            col.dataset.id = colData.id;
            
            col.insertAdjacentHTML('beforeend', `<div class="picker-item" style="pointer-events:none;color:transparent;">_</div>`);
            col.insertAdjacentHTML('beforeend', `<div class="picker-item" style="pointer-events:none;color:transparent;">_</div>`);
            
            colData.data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'picker-item';
                div.dataset.value = item.value;
                div.innerText = item.label;
                
                div.addEventListener('click', () => {
                    const containerCenter = col.clientHeight / 2;
                    const itemCenter = div.offsetTop + (div.clientHeight / 2);
                    // Temporarily enable smooth scrolling if not supported natively by setting scrollTop
                    col.style.scrollBehavior = 'smooth';
                    col.scrollTop = itemCenter - containerCenter;
                    // Reset scroll behavior after animation to prevent issues with manual drag
                    setTimeout(() => {
                        col.style.scrollBehavior = '';
                    }, 300);
                });
                
                col.appendChild(div);
            });
            
            col.insertAdjacentHTML('beforeend', `<div class="picker-item" style="pointer-events:none;color:transparent;">_</div>`);
            col.insertAdjacentHTML('beforeend', `<div class="picker-item" style="pointer-events:none;color:transparent;">_</div>`);
            
            this.columnsContainer.appendChild(col);
        });
    },
    
    scrollToCurrent() {
        const cols = this.columnsContainer.querySelectorAll('.picker-column');
        cols.forEach((col, index) => {
            const currentVal = this.columnsData[index].current;
            const targetItem = Array.from(col.querySelectorAll('.picker-item')).find(i => i.dataset.value == currentVal);
            
            if (targetItem) {
                // calculate scroll
                const containerCenter = col.clientHeight / 2;
                const itemCenter = targetItem.offsetTop + (targetItem.clientHeight / 2);
                col.scrollTop = itemCenter - containerCenter;
                this.updateSelectedVisual(col);
            }
        });
    },
    
    setupScrollListeners() {
        const cols = this.columnsContainer.querySelectorAll('.picker-column');
        cols.forEach(col => {
            let isScrolling;
            col.addEventListener('scroll', () => {
                window.clearTimeout(isScrolling);
                this.updateSelectedVisual(col);
                
                // If it's date, we might need to update days based on month
                isScrolling = setTimeout(() => {
                    if (this.pickerType === 'date') this.handleDateLogic();
                }, 100);
            });
        });
    },
    
    updateSelectedVisual(col) {
        const centerItem = this.getCenterItem(col);
        const items = col.querySelectorAll('.picker-item');
        items.forEach(i => i.classList.remove('selected'));
        if (centerItem) {
            centerItem.classList.add('selected');
        }
    },
    
    getCenterItem(col) {
        const containerCenter = col.scrollTop + (col.clientHeight / 2);
        const items = Array.from(col.querySelectorAll('.picker-item[data-value]'));
        
        let closestItem = null;
        let minDiff = Infinity;
        
        items.forEach(item => {
            const itemCenter = item.offsetTop + (item.clientHeight / 2);
            const diff = Math.abs(itemCenter - containerCenter);
            if (diff < minDiff) {
                minDiff = diff;
                closestItem = item;
            }
        });
        return closestItem;
    },
    
    handleDateLogic() {
        const cols = Array.from(this.columnsContainer.querySelectorAll('.picker-column'));
        const dayCol = cols[0];
        const monthCol = cols[1];
        
        const monthItem = this.getCenterItem(monthCol);
        if (!monthItem) return;
        
        const month = parseInt(monthItem.dataset.value);
        let maxDays = 31;
        if (month >= 7 && month <= 11) maxDays = 30;
        if (month === 12) maxDays = 29;
        
        const days = Array.from(dayCol.querySelectorAll('.picker-item[data-value]'));
        let needsScrollAdjustment = false;
        
        days.forEach(day => {
            const dVal = parseInt(day.dataset.value);
            if (dVal > maxDays) {
                day.style.display = 'none';
                if (day.classList.contains('selected')) needsScrollAdjustment = true;
            } else {
                day.style.display = 'flex';
            }
        });
        
        if (needsScrollAdjustment) {
            const targetDay = days.find(d => parseInt(d.dataset.value) === maxDays);
            if (targetDay) {
                const containerCenter = dayCol.clientHeight / 2;
                const itemCenter = targetDay.offsetTop + (targetDay.clientHeight / 2);
                dayCol.scrollTop = itemCenter - containerCenter;
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        CustomPicker.init();
    }, 100);
});
