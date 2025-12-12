document.addEventListener("DOMContentLoaded", function() {
    const welcomeMessage = document.getElementsByClassName("hero-title")[0];
    const sentence = welcomeMessage.textContent.trim();
    const words = sentence.split(" ");

    // Clear original text so we can animate each word separately
    welcomeMessage.textContent = "";

    words.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        welcomeMessage.appendChild(span);

        // Fade-in each word with incremental delay
        setTimeout(() => {
            span.classList.add("show");
        }, index * 300);
    });
});

// ========================= Back To Top Button =========================

const backToTopButton = document.getElementById("backToTop");

// Toggle visibility based on scroll distance
window.addEventListener("scroll", () => {
    backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
});

// Smooth scroll back to top
backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ========================= Scroll Reveal Elements =========================

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".scroll-reveal");

    // Reveal elements when they enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
});

// ========================= GSAP Coffee Cinematic Transition =========================

const transition = document.getElementById("coffee-transition");
const cup = document.getElementById("coffee-cup");
const exploreBtn = document.querySelector(".explore-btn");

let played = false;

function playGSAPTransition() {
    if (played) return;
    played = true;

    // Fade in the overlay container
    gsap.to(transition, { opacity: 1, duration: 0.4 });

    // Generate falling coffee beans
    for (let i = 0; i < 25; i++) {
        let bean = document.createElement("div");
        bean.classList.add("bean");

        let startX = Math.random() * window.innerWidth;
        let endX = startX + (Math.random() * 200 - 100);

        bean.style.left = startX + "px";
        bean.style.top = "-150px";

        transition.appendChild(bean);

        // Animate each bean falling downward with rotation
        gsap.fromTo(bean,
            {
                opacity: 1,
                y: -200,
                rotation: 0,
                scale: gsap.utils.random(0.8, 1.3)
            },
            {
                y: window.innerHeight + 200,
                x: endX - startX,
                rotation: gsap.utils.random(180, 720),
                duration: gsap.utils.random(1.2, 2),
                ease: "power4.in",
                opacity: 0,
                onComplete: () => bean.remove()
            }
        );
    }

    // Fade and lift the coffee cup into view
    gsap.to(cup, {
        opacity: 1,
        duration: 1,
        delay: 1.6,
        ease: "power3.out",
        bottom: 30
    });

    // Final cup bounce effect
    gsap.to(cup, {
        bottom: 10,
        duration: 0.4,
        delay: 2.3,
        ease: "bounce.out"
    });

    // Fade out transition overlay and scroll to the menu section
    gsap.to(transition, {
        opacity: 0,
        delay: 3.8,
        duration: 1,
        onComplete: () => {
            transition.style.display = "none";
            document.querySelector("#menu-section").scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}

// Play transition when clicking the button
exploreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    playGSAPTransition();
});

// Optional: auto-trigger when scrolling past hero section
window.addEventListener("scroll", () => {
    if (!played && window.scrollY > 150) {
        playGSAPTransition();
    }
});
