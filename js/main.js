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

/*ONGLETS PROGRAMME */
function initProgrammeTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.style.display = "none");

            tab.classList.add("active");
            document.getElementById(tab.getAttribute("data-target")).style.display = "block";
        });
    });
}

/*FILTRAGE INTERVENANTS */
function initSpeakerFilter() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".speaker-card");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            cards.forEach(card => {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/*VALIDATION DE FORMULAIRE */
function initFormValidation() {
    const form = document.getElementById("registration-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;

        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const msg = document.getElementById("message");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value)) {
            showError(email, "Email invalide");
            valid = false;
        } else showSuccess(email);

        if (phone.value.length < 8) {
            showError(phone, "Minimum 8 chiffres requis");
            valid = false;
        } else showSuccess(phone);

        if (msg.value.length < 20) {
            showError(msg, "Minimum 20 caractères requis");
            valid = false;
        } else showSuccess(msg);

        if (valid) {
            document.getElementById("form-success").style.display = "block";
            form.reset();
        }
    });
}

function showError(input, message) {
    input.style.borderColor = "red";
    const errSpan = input.nextElementSibling;
    if (errSpan && errSpan.classList.contains("error-msg")) errSpan.innerText = message;
}

function showSuccess(input) {
    input.style.borderColor = "green";
    const errSpan = input.nextElementSibling;
    if (errSpan && errSpan.classList.contains("error-msg")) errSpan.innerText = "";
}
/*DIVERS Back-to-top & Scroll Observer*/
function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initCurrentYear() {
    document.querySelectorAll(".current-year").forEach(el => el.innerText = new Date().getFullYear());
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add("fade-in-visible");
        });
    });
    document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
}