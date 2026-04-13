document.addEventListener("DOMContentLoaded", () => {
    // 1. Sticky Navbar & Scroll Effects
    const header = document.getElementById("header");
    const navLinks = document.querySelectorAll(".nav-link");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // Active Link Update
        let current = "";
        const sections = document.querySelectorAll("section");
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 120) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 2. Close mobile menu when clicking a link (Bootstrap adjustment)
    const navCollapse = document.getElementById('navMenu');
    if (navCollapse) {
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth < 992) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
    }

    // 3. Menu Filtering Tab
    const menuTabs = document.querySelectorAll(".menu-tab");
    const menuItems = document.querySelectorAll(".menu-item");

    menuTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove("active"));
            // Add active class to clicked tab
            tab.classList.add("active");
            
            const category = tab.getAttribute("data-category");
            
            menuItems.forEach(item => {
                // Fade out effect
                item.style.opacity = '0';
                
                setTimeout(() => {
                    if (item.classList.contains(category)) {
                        item.classList.remove("hidden");
                        // Slight delay for fade in
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.classList.add("hidden");
                    }
                }, 300);
            });
        });
    });

    // Initial fade in for visible items
    menuItems.forEach(item => {
        if (!item.classList.contains("hidden")) {
            item.style.transition = "opacity 0.3s ease, transform 0.4s ease, box-shadow 0.4s ease";
            item.style.opacity = '1';
        }
    });
});
