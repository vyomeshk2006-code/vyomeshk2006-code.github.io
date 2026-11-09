document.body.classList.add("js");

const menu = document.querySelector(".menu");
const nav = document.querySelector("#navigation");

function closeMenu() {
  if (!menu || !nav) return;

  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}

if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = menu.getAttribute("aria-expanded") === "true";

    menu.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      menu.focus();
    }
  });

  const mobileLayout = window.matchMedia("(max-width: 700px)");

  mobileLayout.addEventListener("change", () => {
    closeMenu();
  });
}

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let revealObserver = null;

function stopRevealAnimations() {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }

  document.querySelectorAll(".motion-enter").forEach((element) => {
    element.classList.remove("motion-enter");
  });
}

function startRevealAnimations() {
  if (
    reducedMotion.matches ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const project = entry.target;

        project.classList.add("motion-enter");
        observer.unobserve(project);

        project.addEventListener(
          "animationend",
          () => {
            project.classList.remove("motion-enter");
          },
          { once: true }
        );
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -24px 0px",
    }
  );

  document.querySelectorAll(".project").forEach((project) => {
    revealObserver.observe(project);
  });
}

reducedMotion.addEventListener("change", () => {
  stopRevealAnimations();

  if (!reducedMotion.matches) {
    startRevealAnimations();
  }
});

startRevealAnimations();