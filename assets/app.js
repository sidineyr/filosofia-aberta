(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const storage = {
    get(key, fallback = null) {
      try {
        const value = window.localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },
  };

  let fontSize = Number(storage.get("fa-font-size", "18"));
  if (!Number.isFinite(fontSize)) fontSize = 18;
  fontSize = Math.min(24, Math.max(16, fontSize));
  root.style.setProperty("--reading-size", `${fontSize}px`);

  const spacious = storage.get("fa-spacious", "0") === "1";
  const focusMode = storage.get("fa-focus", "0") === "1";
  body.classList.toggle("spacious", spacious);
  body.classList.toggle("focus-mode", focusMode);

  const setPressed = (selector, pressed) => {
    document.querySelectorAll(selector).forEach((button) => {
      button.setAttribute("aria-pressed", String(pressed));
    });
  };

  setPressed("[data-space]", spacious);
  setPressed("[data-focus]", focusMode);

  document.querySelectorAll("[data-font]").forEach((button) => {
    button.addEventListener("click", () => {
      const delta = button.dataset.font === "increase" ? 1 : -1;
      fontSize = Math.min(24, Math.max(16, fontSize + delta));
      root.style.setProperty("--reading-size", `${fontSize}px`);
      storage.set("fa-font-size", String(fontSize));
    });
  });

  document.querySelectorAll("[data-space]").forEach((button) => {
    button.addEventListener("click", () => {
      const active = body.classList.toggle("spacious");
      storage.set("fa-spacious", active ? "1" : "0");
      setPressed("[data-space]", active);
    });
  });

  document.querySelectorAll("[data-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      const active = body.classList.toggle("focus-mode");
      storage.set("fa-focus", active ? "1" : "0");
      setPressed("[data-focus]", active);
    });
  });

  const moduleSlugs = document.body.dataset.coreModules
    ? document.body.dataset.coreModules.split(",").filter(Boolean)
    : [];

  const isComplete = (slug) => storage.get(`fa-complete:${slug}`, "0") === "1";

  const renderProgress = () => {
    if (!moduleSlugs.length) return;
    const completed = moduleSlugs.filter(isComplete).length;
    const percent = Math.round((completed / moduleSlugs.length) * 100);
    document.querySelectorAll("[data-progress-fill]").forEach((bar) => {
      bar.style.width = `${percent}%`;
    });
    document.querySelectorAll("[data-progress-track]").forEach((track) => {
      track.setAttribute("aria-valuenow", String(completed));
      track.setAttribute("aria-valuetext", `${completed} de ${moduleSlugs.length} leituras concluídas`);
    });
    document.querySelectorAll("[data-progress-text]").forEach((label) => {
      label.textContent = `${completed} de ${moduleSlugs.length} leituras concluídas (${percent}%)`;
    });

    const nextSlug = moduleSlugs.find((slug) => !isComplete(slug)) || moduleSlugs[0];
    document.querySelectorAll("[data-continue]").forEach((link) => {
      link.href = `leituras/${nextSlug}.html`;
      link.textContent = completed === moduleSlugs.length ? "Revisitar o percurso" : "Continuar minha leitura";
    });
  };

  const completionButton = document.querySelector("[data-complete]");
  if (completionButton) {
    const slug = completionButton.dataset.complete;
    const renderButton = () => {
      const complete = isComplete(slug);
      completionButton.setAttribute("aria-pressed", String(complete));
      completionButton.textContent = complete ? "Leitura concluída ✓" : "Marcar como concluída";
    };
    completionButton.addEventListener("click", () => {
      storage.set(`fa-complete:${slug}`, isComplete(slug) ? "0" : "1");
      renderButton();
      renderProgress();
    });
    renderButton();
  }

  const notes = document.querySelector("[data-notes]");
  const notesStatus = document.querySelector("[data-notes-status]");
  if (notes) {
    const slug = notes.dataset.notes;
    notes.value = storage.get(`fa-notes:${slug}`, "");
    let statusTimer;
    notes.addEventListener("input", () => {
      const saved = storage.set(`fa-notes:${slug}`, notes.value);
      if (!notesStatus) return;
      notesStatus.textContent = saved ? "Anotação salva neste navegador." : "Não foi possível salvar neste navegador.";
      window.clearTimeout(statusTimer);
      statusTimer = window.setTimeout(() => {
        notesStatus.textContent = "";
      }, 2600);
    });
  }

  const filter = document.querySelector("[data-library-filter]");
  const filterStatus = document.querySelector("[data-filter-status]");
  if (filter) {
    const cards = [...document.querySelectorAll("[data-search]")];
    const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    filter.addEventListener("input", () => {
      const query = normalize(filter.value.trim());
      let visible = 0;
      cards.forEach((card) => {
        const match = !query || normalize(card.dataset.search).includes(query);
        card.hidden = !match;
        if (match) visible += 1;
      });
      if (filterStatus) {
        filterStatus.textContent = `${visible} ${visible === 1 ? "leitura encontrada" : "leituras encontradas"}.`;
      }
    });
  }

  renderProgress();
})();
