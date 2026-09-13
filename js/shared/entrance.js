/* Entrance driver.
   The .anim class is set by a blocking snippet in each page's <head> so the
   opening frame is composed rather than flashing the finished hero. This
   waits for fonts (with a guard so a stalled font can't hold the page),
   plays the sequence once, then removes both classes — leaving no timers
   and no residual transforms. */
export function initEntrance() {
  const root = document.documentElement;
  if (!root.classList.contains("anim")) return;

  let started = false;

  function play() {
    if (started) return;
    started = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.add("play");
        setTimeout(() => {
          root.classList.remove("play");
          root.classList.remove("anim");
        }, 2150);
      });
    });
  }

  const guard = setTimeout(play, 500);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      clearTimeout(guard);
      play();
    });
  } else {
    clearTimeout(guard);
    play();
  }
}
