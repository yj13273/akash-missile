document.addEventListener("DOMContentLoaded", () => {
  // Section navigation
  function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach((sec) => {
      sec.classList.remove("show");
      sec.style.display = "none";
    });

    const active = document.getElementById(sectionId);
    if (active) {
      active.style.display = "block";
      setTimeout(() => active.classList.add("show"), 10);
    }
  }

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href").substring(1);
      showSection(id);
    });
  });

  showSection("intro");

  // Timeline reveal
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".timeline-event").forEach((event) => {
    timelineObserver.observe(event);
  });

  // Accordion
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Tabs
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tabContents.forEach(c => c.classList.add("hidden"));

      tab.classList.add("active");
      const contentId = tab.dataset.tab;
      const content = document.getElementById(contentId);
      if (content) content.classList.remove("hidden");
    });
  });

  // Theme
  const toggleCheckbox = document.getElementById("theme-toggle");
  const toggleWrapper = document.querySelector(".theme-switch");

  function updateTooltip() {
    const tooltip = document.body.classList.contains("dark")
      ? "Toggle Light Mode"
      : "Toggle Dark Mode";
    toggleWrapper.setAttribute("data-tooltip", tooltip);
  }

  function setTheme(mode) {
    if (mode === "dark") {
      document.body.classList.add("dark");
      toggleCheckbox.checked = true;
    } else {
      document.body.classList.remove("dark");
      toggleCheckbox.checked = false;
    }
    updateTooltip();
  }

  function getSystemPreference() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function loadTheme() {
    const saved = localStorage.getItem("theme");
    const theme = saved || getSystemPreference();
    setTheme(theme);
  }

  toggleCheckbox.addEventListener("change", () => {
    const newTheme = toggleCheckbox.checked ? "dark" : "light";

    document.body.classList.add("fading");

    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.body.classList.remove("fading");

      toggleWrapper.classList.add("pulse");
      setTimeout(() => toggleWrapper.classList.remove("pulse"), 600);
    }, 200);
  });

  // Run theme load on startup
  loadTheme();

const trajCanvas = document.getElementById('trajectoryChart');

if (trajCanvas) {
  const trajCtx = trajCanvas.getContext('2d');

  const trajData = [
    { x: 0,   y: 0 },
    { x: 20,  y: 80 },
    { x: 50,  y: 120 },
    { x: 80,  y: 100 },
    { x: 100, y: 0 }
  ];

  const trajectoryChart = new Chart(trajCtx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Flight Path',
        data: trajData,
        borderColor: '#0d47a1',
        borderWidth: 3,
        showLine: true,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Horizontal Distance (km)' },
          type: 'linear'
        },
        y: {
          title: { display: true, text: 'Altitude (km)' },
          min: 0
        }
      },
      plugins: {
        legend: { display: false }
      },
      animation: {
        duration: 2000,
        onProgress: function(animation) {
          const t = animation.currentStep / animation.numSteps;
          const dataset = trajectoryChart.data.datasets[0];
          const point = trajectoryChart.getDatasetMeta(0).data[Math.floor(t * (dataset.data.length - 1))];
          const ctx = trajCtx;
          ctx.drawImage(rocketImage, point.x - 8, point.y - 16, 16, 32);
        }
      }
    }
  });

  const rocketImage = new Image();
  rocketImage.src = 'assets/rocket-icon.png'; // Make sure this path is valid
}

 
});
