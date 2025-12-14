//Trying to make some animation for the header 
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // adjust for header height
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Select buttons by ID
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.id; // Use button ID to find section
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Reveal Animation
function reveal() {
  ''
  document.querySelectorAll(".reveal").forEach((el) => {
    let top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 120) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();
// --- dynamic header offset to prevent overlap ---
function updateHeaderOffset() {
  const header = document.querySelector('header');
  if (!header) return;

  // get computed height including margins
  const rect = header.getBoundingClientRect();
  const headerHeight = Math.ceil(rect.height);

  // add a small extra gap (e.g., 24px) so content doesn't sit flush under header
  const gap = 24;
  const offset = headerHeight + gap;

  // set CSS variable used by CSS to add padding-top to sections
  document.documentElement.style.setProperty('--header-offset', offset + 'px');
}

// run on load and on resize (debounced to be efficient)
updateHeaderOffset();
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateHeaderOffset, 120);
});

// Also update after fonts/images load (ensures correct height)
window.addEventListener('load', updateHeaderOffset);

// Dynamic swapping for the text 
  const words = document.querySelectorAll(".swap-word");
  let current = 0;

  setInterval(() => {
    words[current].classList.remove("is-visible");
    current = (current + 1) % words.length;
    words[current].classList.add("is-visible");
  }, 3200);

// Show the client logos with a delay
const testimonials = [
  {
    text: "Outstanding service and exceptional quality! The team exceeded our expectations.",
    name: "Asmaa Mohamed",
    img: "pics/client1.jpg"
  },
  {
    text: "Professional, reliable, and innovative. Highly recommend for any project!",
    name: "Ali Amer",
    img: "pics/client2.jpg"
  },
  {
    text: "A fantastic experience from start to finish. Their expertise is unmatched.",
    name: "Razan Hassan",
    img: "pics/client3.jpg"
  }
];

let index = 0;

function changeTestimonial() {
  const textEl = document.getElementById("testimonial-text");
  const nameEl = document.getElementById("testimonial-name");
  const imgEl = document.getElementById("testimonial-img");

  // Animate out
  textEl.style.opacity = 0;
  textEl.style.transform = "translateY(20px)";
  nameEl.style.opacity = 0;
  imgEl.style.transform = "scale(0.8)";
  imgEl.style.opacity = 0;

  setTimeout(() => {
    // Change content
    textEl.textContent = testimonials[index].text;
    nameEl.textContent = testimonials[index].name;
    imgEl.src = testimonials[index].img;

    // Animate in
    textEl.style.opacity = 1;
    textEl.style.transform = "translateY(0)";
    nameEl.style.opacity = 1;
    imgEl.style.opacity = 1;
    imgEl.style.transform = "scale(1)";

    // Next testimonial
    index = (index + 1) % testimonials.length;
  }, 500);
}

// Change every 4 seconds
setInterval(changeTestimonial, 4000);
