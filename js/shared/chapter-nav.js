/* Chapter nav — tracks which Part is in view */
export function initChapterNav() {
  const chapterCurrent = document.getElementById("chapter-current");
  const chapterDots = document.querySelectorAll(".chapter-dot");
  if (!chapterCurrent || !chapterDots.length) return;

  /* The dots are the source of truth for how many chapters a page has, so the
     same nav works on both the nutrition and the training essay. */
  const chapterSections = Array.from(chapterDots)
    .map((dot) => document.getElementById(dot.dataset.target))
    .filter(Boolean);

  const chapterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = chapterSections.indexOf(entry.target);
        if (idx === -1) return;
        chapterCurrent.textContent = String(idx + 1).padStart(2, "0");
        chapterDots.forEach((dot, i) => dot.classList.toggle("active", i === idx));
      });
    },
    { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
  );
  chapterSections.forEach((el) => chapterObserver.observe(el));

  chapterDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      document.getElementById(dot.dataset.target)?.scrollIntoView({ behavior: "smooth" });
    });
  });
}
