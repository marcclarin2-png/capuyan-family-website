// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(
    ".person, .story-card, .about h2, .stories h2, .stories-intro"
);


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal");

                setTimeout(() => {
                    entry.target.classList.add("show");
                }, 50);

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

});


// =========================
// NAV: SHADOW ON SCROLL
// =========================

const nav = document.querySelector("nav");

function updateNavShadow() {

    if (window.scrollY > 10) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }

}

updateNavShadow();
window.addEventListener("scroll", updateNavShadow);


// =========================
// NAV: ACTIVE LINK TRACKING
// =========================

const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section[id]");

const navObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const id = entry.target.getAttribute("id");

                navLinks.forEach((link) => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`
                    );

                });

            }

        });

    },
    {
        // Trigger when a section is roughly in the middle of the viewport
        rootMargin: "-45% 0px -45% 0px"
    }
);

sections.forEach((section) => {
    navObserver.observe(section);
});


// =========================
// HERO PHOTO PARALLAX
// =========================

// Target the wrapping div, not the img itself - the img already
// has its own hover scale/rotate transform in CSS, and setting an
// inline transform directly on it would override that on hover.
const heroPhotoWrap = document.querySelector(".hero-photo");
const heroSection = document.querySelector(".hero");

function updateParallax() {

    if (!heroPhotoWrap || !heroSection) {
        return;
    }

    const heroHeight = heroSection.offsetHeight;
    const scrollY = window.scrollY;

    // Only move the photo while the hero section is still in view
    if (scrollY < heroHeight) {

        const offset = scrollY * 0.15;
        heroPhotoWrap.style.transform = `translateY(${offset}px)`;

    }

}

window.addEventListener("scroll", updateParallax);