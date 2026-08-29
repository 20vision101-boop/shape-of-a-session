/* A filterable, expandable card library.
   Three of the four essays need the same component — movements on the
   training page, practices on the cortisol page, levers on the testosterone
   page — so the behaviour lives here and each page supplies its own items.

   An item looks like:
     {
       name, category,               // category matches a slug in `categories`
       tags: ["strength"],           // optional, matched against `tagGroup`
       meta: "Lower body · Beginner",// the line under the name
       chips: ["3 × 5", "Barbell"],  // pills under the head, first one accented
       summary,                      // the paragraph the card opens with
       sections: [                   // rendered in order
         { label: "Works", text: "..." },
         { label: "How to do it", ol: [...] },
         { label: "Cues", ul: [...] },
       ],
       flags: { bodyweight: true },  // read by whatever toggles a page defines
     }

   Config: { mount, countEl, items, categories, tagGroup, categoryEl, tagEl,
             expandAllEl, toggles, noun }
   `toggles` is [{ el, predicate }] — each button filters when active.
   Returns { setTag, render } so a page can drive the filters from elsewhere. */

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function sectionHtml(section) {
  if (section.text) return `<p class="detail-text">${section.text}</p>`;
  if (section.ol) return `<ol class="step-list">${section.ol.map((i) => `<li>${i}</li>`).join("")}</ol>`;
  return `<ul class="cue-list">${section.ul.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

export function createLibrary(config) {
  const {
    mount, countEl, items, categories, tagGroup,
    categoryEl, tagEl, expandAllEl, toggles = [], noun = "entries",
  } = config;

  const wrap = document.querySelector(mount);
  if (!wrap) return { setTag() {}, render() {} };

  const state = { category: "all", tag: "all", active: new Set(), expanded: new Set() };

  function matches(item) {
    if (state.category !== "all" && item.category !== state.category) return false;
    if (state.tag !== "all" && !(item.tags || []).includes(state.tag)) return false;
    return toggles.every((t) => !state.active.has(t.el) || t.predicate(item));
  }

  function cardHtml(item) {
    const slug = slugify(item.name);
    const open = state.expanded.has(slug);
    const badges = (item.tags || [])
      .map((t) => (tagGroup?.options || []).find((o) => o.slug === t))
      .filter(Boolean)
      .map((o) => `<span class="tag school-tag" style="--school: ${o.color}">${o.name}</span>`)
      .join("");
    const chips = (item.chips || [])
      .map((c, i) => `<span class="tag${i === 0 ? "" : " subtle"}">${c}</span>`)
      .join("");

    return `
      <article class="exercise-card${open ? " open" : ""}" data-slug="${slug}">
        <button class="exercise-head" type="button" aria-expanded="${open}" aria-controls="detail-${slug}">
          <span class="exercise-title">
            <span class="exercise-name">${item.name}</span>
            <span class="exercise-meta">${item.meta}</span>
          </span>
          <span class="exercise-chevron" aria-hidden="true">▾</span>
        </button>

        <div class="exercise-summary">${chips}${badges}</div>

        <div class="exercise-detail" id="detail-${slug}" ${open ? "" : "hidden"}>
          <p class="exercise-why">${item.summary}</p>
          ${item.sections
            .map((s) => `<p class="detail-label">${s.label}</p>${sectionHtml(s)}`)
            .join("")}
        </div>
      </article>
    `;
  }

  function render() {
    const shown = items.filter(matches);

    wrap.innerHTML = shown.length
      ? shown.map(cardHtml).join("")
      : `<p class="caption">Nothing matches that combination — try clearing a filter.</p>`;

    if (countEl) {
      document.querySelector(countEl).textContent =
        `Showing ${shown.length} of ${items.length} ${noun}. Click any card for the full detail.`;
    }

    wrap.querySelectorAll(".exercise-head").forEach((head) => {
      head.addEventListener("click", () => {
        const slug = head.closest(".exercise-card").dataset.slug;
        if (state.expanded.has(slug)) state.expanded.delete(slug);
        else state.expanded.add(slug);
        render();
      });
    });

    if (expandAllEl) {
      const btn = document.querySelector(expandAllEl);
      const allOpen = shown.length > 0 && shown.every((i) => state.expanded.has(slugify(i.name)));
      btn.textContent = allOpen ? "Collapse all" : "Expand all";
      btn.classList.toggle("active", allOpen);
    }
  }

  function drawChips(el, options, key, activeSlug) {
    const host = document.querySelector(el);
    if (!host) return;
    host.innerHTML = options
      .map(
        (o) => `
        <button class="toggle-btn filter-chip${o.slug === activeSlug ? " active" : ""}"
                type="button" data-slug="${o.slug}"${o.color ? ` style="--school: ${o.color}"` : ""}>${o.name}</button>
      `
      )
      .join("");
    host.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        state[key] = chip.dataset.slug;
        host.querySelectorAll(".filter-chip").forEach((c) =>
          c.classList.toggle("active", c.dataset.slug === state[key])
        );
        render();
      });
    });
  }

  if (categoryEl) drawChips(categoryEl, [{ slug: "all", name: "All" }, ...categories], "category", "all");
  if (tagEl && tagGroup) {
    drawChips(tagEl, [{ slug: "all", name: tagGroup.allLabel }, ...tagGroup.options], "tag", "all");
  }

  toggles.forEach((t) => {
    const btn = document.querySelector(t.el);
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (state.active.has(t.el)) state.active.delete(t.el);
      else state.active.add(t.el);
      btn.classList.toggle("active", state.active.has(t.el));
      render();
    });
  });

  if (expandAllEl) {
    document.querySelector(expandAllEl)?.addEventListener("click", () => {
      const shown = items.filter(matches);
      const allOpen = shown.every((i) => state.expanded.has(slugify(i.name)));
      shown.forEach((i) => {
        if (allOpen) state.expanded.delete(slugify(i.name));
        else state.expanded.add(slugify(i.name));
      });
      render();
    });
  }

  render();

  return {
    /* Lets a page's own cards drive the tag filter (the school cards do this). */
    setTag(slug) {
      state.tag = slug;
      document.querySelectorAll(`${tagEl} .filter-chip`).forEach((c) =>
        c.classList.toggle("active", c.dataset.slug === slug)
      );
      render();
    },
    render,
  };
}
