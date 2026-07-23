document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavbar();
    initCurrentYear();
    initBackToTop();
    initScrollAnimations();

    if (document.getElementById("countdown")) initCountdown();
    if (document.querySelector(".stat-number")) initAnimatedCounters();
    if (document.querySelector(".tab-btn")) initProgrammeTabs();
    if (document.querySelector(".filter-btn")) initSpeakerFilter();
    if (document.getElementById("registration-form")) initFormValidation();
});

/* DARK MODE */
function initTheme() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    toggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector("#theme-toggle i");
    if (icon) icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill";
}

/* NAVBAR */
function initNavbar() {
    const header = document.getElementById("main-header");
    const burger = document.getElementById("burger-menu");
    const navLinks = document.getElementById("nav-links");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    });

    if (burger && navLinks) {
        burger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }
}

/*COMPTE À REBOURS TEMPS RÉEL*/
function initCountdown() {
    const eventDate = new Date("November 12, 2026 09:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) return;

        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
}

/* COMPTEURS ANIMÉS AU SCROLL */
function initAnimatedCounters() {
    const counters = document.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute("data-target");
                let count = 0;
                const speed = target / 100;

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}