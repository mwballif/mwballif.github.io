(function () {
  const DATA_URL = "/data/datasets_snapshot.json";

  const state = {
    datasets: [],
    opportunities: [],
    search: "",
    topic: "",
    gapOnly: false,
    selectedId: null,
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function fmtScore(value) {
    if (typeof value !== "number") return "0.00";
    return value.toFixed(2);
  }

  async function loadData() {
    const response = await fetch(DATA_URL, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error("Could not load dataset snapshot");
    }
    const payload = await response.json();
    if (Array.isArray(payload)) {
      state.datasets = payload;
      state.opportunities = payload.filter((d) => d.gap_flag).slice(0, 25);
      return;
    }
    state.datasets = payload.datasets || [];
    state.opportunities = payload.opportunities || [];
  }

  function hydrateTopicFilter() {
    const topics = [...new Set(state.datasets.map((d) => d.domain).filter(Boolean))].sort();
    const select = byId("dataset-topic");
    topics.forEach((topic) => {
      const option = document.createElement("option");
      option.value = topic;
      option.textContent = topic;
      select.appendChild(option);
    });
  }

  function bindEvents() {
    byId("dataset-search").addEventListener("input", (event) => {
      state.search = event.target.value.trim().toLowerCase();
      renderList();
    });

    byId("dataset-topic").addEventListener("change", (event) => {
      state.topic = event.target.value;
      renderList();
    });

    byId("dataset-gap-only").addEventListener("change", (event) => {
      state.gapOnly = !!event.target.checked;
      renderList();
    });
  }

  function filteredDatasets() {
    return state.datasets.filter((dataset) => {
      if (state.topic && dataset.domain !== state.topic) return false;
      if (state.gapOnly && !dataset.gap_flag) return false;
      if (!state.search) return true;
      const haystack = `${dataset.name || ""} ${dataset.provider || ""} ${dataset.description || ""}`.toLowerCase();
      return haystack.includes(state.search);
    });
  }

  function renderOpportunities() {
    const container = byId("dataset-opportunities");
    container.innerHTML = "";
    if (!state.opportunities.length) {
      container.textContent = "No opportunity records in snapshot.";
      return;
    }

    state.opportunities.slice(0, 15).forEach((item) => {
      const button = document.createElement("button");
      button.className = "dataset-link-button";
      button.type = "button";
      button.textContent = `${item.name} (${item.provider || "unknown"})`;
      button.addEventListener("click", () => {
        state.selectedId = item.id;
        renderDetail();
      });
      container.appendChild(button);
    });
  }

  function renderList() {
    const container = byId("dataset-list");
    const datasets = filteredDatasets();
    container.innerHTML = "";

    if (!datasets.length) {
      container.textContent = "No datasets match the current filters.";
      return;
    }

    datasets.forEach((dataset) => {
      const row = document.createElement("article");
      row.className = "dataset-row";
        row.innerHTML = `
        <button type="button" class="dataset-link-button">${esc(dataset.name)}</button>
        <div class="dataset-meta">
          <span>${esc(dataset.provider || "unknown")}</span>
          <span>${esc(dataset.domain || "unclassified")}</span>
          <span>U* ${fmtScore(dataset.usefulness_score)}</span>
          <span>O* ${fmtScore(dataset.opportunity_score)}</span>
          <span>R ${fmtScore(dataset.relevance_score)}</span>
          <span>N ${fmtScore(dataset.novelty_score)}</span>
          <span>U ${fmtScore(dataset.usability_score)}</span>
          ${dataset.gap_flag ? '<span class="dataset-gap-flag">gap</span>' : ""}
        </div>
      `;
      row.querySelector("button").addEventListener("click", () => {
        state.selectedId = dataset.id;
        renderDetail();
      });
      container.appendChild(row);
    });
  }

  function renderDetail() {
    const container = byId("dataset-detail");
    const dataset = state.datasets.find((d) => d.id === state.selectedId);
    if (!dataset) {
      container.textContent = "Select a dataset from the list.";
      return;
    }

    const papers = dataset.papers || [];
    const methods = dataset.methods || [];
    const questions = dataset.questions || [];
    const useCases = dataset.suggested_use_cases || [];

    const paperList = papers.length
      ? `<ul>${papers
          .map(
            (paper) =>
              `<li>${paper.url ? `<a href="${esc(paper.url)}" target="_blank">${esc(paper.title || "Untitled paper")}</a>` : esc(paper.title || "Untitled paper")} ${paper.year ? `(${paper.year})` : ""}</li>`
          )
          .join("")}</ul>`
      : "<p>No linked papers yet.</p>";

    container.innerHTML = `
      <h4>${esc(dataset.name)}</h4>
      <p>${esc(dataset.description || "No description available.")}</p>
      <p><strong>Provider:</strong> ${esc(dataset.provider || "unknown")}</p>
      <p><strong>Topic:</strong> ${esc(dataset.domain || "unclassified")}</p>
      <p><strong>Access:</strong> ${dataset.access_url ? `<a href="${esc(dataset.access_url)}" target="_blank">${esc(dataset.access_url)}</a>` : "N/A"}</p>
      <p><strong>Methods used:</strong> ${methods.length ? methods.map(esc).join(", ") : "None detected"}</p>
      <p><strong>Questions answered:</strong> ${questions.length ? questions.map(esc).join(", ") : "None detected"}</p>
      <p><strong>Usefulness score:</strong> ${fmtScore(dataset.usefulness_score)}</p>
      <p><strong>Opportunity score:</strong> ${fmtScore(dataset.opportunity_score)}</p>
      <p><strong>Suggested economic use-cases:</strong> ${useCases.length ? useCases.map(esc).join("; ") : "N/A"}</p>
      <p><strong>Gap signal:</strong> ${dataset.gap_flag ? esc(dataset.gap_reason || "Underused and potentially high value for economic research.") : "No gap flag currently."}</p>
      <div><strong>Papers:</strong>${paperList}</div>
    `;
  }

  async function main() {
    const requiredNodes = ["dataset-search", "dataset-topic", "dataset-gap-only", "dataset-opportunities", "dataset-list", "dataset-detail"];
    if (!requiredNodes.every((id) => byId(id))) {
      return;
    }
    try {
      await loadData();
      hydrateTopicFilter();
      bindEvents();
      renderOpportunities();
      renderList();
      renderDetail();
    } catch (error) {
      byId("dataset-detail").textContent = `Failed to load dataset data: ${error.message}`;
    }
  }

  main();
})();
