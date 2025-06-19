// Show only one section at a time
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => {
    sec.classList.remove('show');
    sec.style.display = 'none';
  });

  const active = document.getElementById(sectionId);
  if (active) {
    active.style.display = 'block';
    setTimeout(() => active.classList.add('show'), 10);
  }
}

// Scroll-based image fade-in
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

// Timeline scroll-reveal
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Nav link click behavior
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Avoid handling variant dropdown here
      if (!link.hasAttribute("data-variant")) {
        const targetId = link.getAttribute("href").substring(1);
        showSection(targetId);
      }
    });
  });

  // Show intro by default
  showSection("intro");

  // Observe fade-in images
  document.querySelectorAll('.fade-in').forEach(el => {
    imageObserver.observe(el);
  });

  // Observe timeline elements
  document.querySelectorAll('.timeline-event').forEach(el => {
    timelineObserver.observe(el);
  });

  // Handle variant dropdown clicks
  const variantLinks = document.querySelectorAll('[data-variant]');
  const variantSections = document.querySelectorAll('.variant');

  variantLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Show the versions section
      showSection("versions");

      // Hide all variant content
      variantSections.forEach(v => v.classList.add("hidden"));

      // Show the selected variant
      const targetId = link.dataset.variant;
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.remove("hidden");
      }
    });
  });
});
const variantLinks = document.querySelectorAll('[data-variant]');
const variantSections = document.querySelectorAll('.variant');

variantLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    // Always show the main versions section
    showSection("versions");

    // Hide all variants
    variantSections.forEach(v => v.classList.add("hidden"));

    // Show the one matching the clicked data-variant
    const targetId = link.dataset.variant;
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.remove("hidden");
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
