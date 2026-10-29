(function () {
  "use strict";

  /* A single full-width trunk (see style.css — .flow is one column, not
     three), because this algorithm genuinely runs top to bottom with
     exactly two sideways fan-outs rather than a trunk with a permanent
     side column: the stable/unstable pair (row 3) and the four
     agent-specific reversal pathways below it (row 4). Both are handled
     as "group" wrappers, same mechanism as every other tool's YES/NO
     pairs — just generalized here to also support a 4-way group, since
     no earlier tool's source algorithm forked this wide. */
  const LAYOUT = {
    step1:              { col: "full", row: 1 },
    stability_check:    { col: "full", row: 2, decision: true },
    // Side-by-side pair (stable / unstable) — same pattern as every
    // other tool's YES/NO pair, so the two incoming arrows from the
    // decision don't land in one column.
    stable_mgmt:        { col: null, row: 3, group: "severity" },
    unstable_mgmt:      { col: null, row: 3, group: "severity" },
    // Four-way fan-out — new: the source figure forks into four
    // parallel, agent-specific reversal boxes side by side, not two.
    vka_pathway:         { col: null, row: 4, group: "pathways" },
    dabigatran_pathway:  { col: null, row: 4, group: "pathways" },
    fxa_pathway:         { col: null, row: 4, group: "pathways" },
    heparin_pathway:     { col: null, row: 4, group: "pathways" },
    endoscopy:           { col: "full", row: 5 },
    post_haemostasis:    { col: "full", row: 6 }
  };

  // How many columns each named group's wrapper subdivides into — picks
  // the matching CSS class (flow-wrap-2 / flow-wrap-4) in render() below.
  const GROUP_COLUMNS = { severity: 2, pathways: 4 };

  const EDGES = [
    ["step1", "stability_check"],
    ["stability_check", "stable_mgmt", "Yes"],
    ["stability_check", "unstable_mgmt", "No"],
    // The source figure draws this as a line down the left margin,
    // bypassing the unstable branch and all four reversal-pathway boxes
    // entirely, rather than crossing through them — see DETOUR below.
    ["stable_mgmt", "endoscopy"],
    ["unstable_mgmt", "vka_pathway"],
    ["unstable_mgmt", "dabigatran_pathway"],
    ["unstable_mgmt", "fxa_pathway"],
    ["unstable_mgmt", "heparin_pathway"],
    ["vka_pathway", "endoscopy"],
    ["dabigatran_pathway", "endoscopy"],
    ["fxa_pathway", "endoscopy"],
    ["heparin_pathway", "endoscopy"],
    ["endoscopy", "post_haemostasis"]
  ];

  // Edges that would otherwise be drawn as a direct bezier straight
  // through an unrelated, "sandwiched" box in between — routed instead
  // around that obstacle's live bounding rect at draw time (same
  // mechanism as the agitation-delirium tool's DETOUR table; never a
  // hardcoded pixel offset, since the obstacle's actual position is
  // read fresh on every draw/resize).
  const DETOUR = {
    "stable_mgmt->endoscopy": { obstacle: "vka_pathway", side: "left", clearance: 16 }
  };

  const byId = {};
  NODES.forEach((n) => (byId[n.id] = n));

  /* ---- plain-text safety + glossary auto-linking ---- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // longest match first, so a longer term wins over any shorter overlapping one
  const GLOSSARY_SORTED = GLOSSARY.slice().sort((a, b) => b.match.length - a.match.length);

  function linkify(rawText, usedTerms) {
    const text = escapeHtml(rawText);
    let result = "";
    let cursor = 0;
    // find the earliest, longest unused glossary match from `cursor` onward
    while (cursor < text.length) {
      let best = null;
      for (const g of GLOSSARY_SORTED) {
        if (usedTerms.has(g.match)) continue;
        const re = new RegExp("\\b" + g.match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
        const m = re.exec(text.slice(cursor));
        if (
          m &&
          (!best || m.index < best.index || (m.index === best.index && m[0].length > best.text.length))
        ) {
          best = { index: m.index, text: m[0], g };
        }
      }
      if (!best) break;
      const matchStart = cursor + best.index;
      const matchEnd = matchStart + best.text.length;
      result += text.slice(cursor, matchStart);
      const g = best.g;
      const label = g.full ? g.full[0].toUpperCase() + g.full.slice(1) : "";
      result +=
        '<button type="button" class="term" aria-expanded="false">' +
        best.text +
        "</button>" +
        '<span class="term-def" hidden>' +
        (g.full ? "<strong>" + escapeHtml(label) + "</strong> — " : "") +
        escapeHtml(g.def) +
        "</span>";
      usedTerms.add(g.match);
      cursor = matchEnd;
    }
    result += text.slice(cursor);
    return result;
  }

  const flowEl = document.getElementById("flow");
  const edgesSvg = document.getElementById("edges");

  function nodeEl(n) {
    const layout = LAYOUT[n.id] || {};
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "node-" + n.id;
    btn.dataset.node = n.id;
    btn.setAttribute("aria-pressed", "false");

    let cls = "node";
    if (layout.decision) cls += " node--decision";
    if (n.type === "terminal") cls += " node--terminal";
    if (n.tone === "key") cls += " node--key";
    if (n.tone === "alarm") cls += " node--alarm";
    if (layout.col) cls += " " + layout.col;
    btn.className = cls;
    // Explicit row keeps every edge short and direct instead of relying
    // on implicit grid auto-placement. (Grouped nodes sit inside their
    // own flow-wrap-N subgrid, not the outer .flow grid, so the row goes
    // on the wrapper instead — see render().)
    if (layout.row && !layout.group) btn.style.gridRow = String(layout.row);

    const title = document.createElement("span");
    title.className = "node__title";
    title.textContent = n.label;
    btn.appendChild(title);

    if (n.sub) {
      const sub = document.createElement("span");
      sub.className = "node__sub";
      sub.textContent = n.sub;
      btn.appendChild(sub);
    }

    btn.addEventListener("click", () => selectNode(n.id));
    return btn;
  }

  function render() {
    // group ordinary nodes by document order, wrapping named groups in a
    // subgrid sized to that group's actual member count (2-way severity
    // pair, 4-way reversal-pathway row).
    const seenGroups = {};
    NODES.forEach((n) => {
      const layout = LAYOUT[n.id] || {};
      if (layout.group) {
        let wrap = seenGroups[layout.group];
        if (!wrap) {
          wrap = document.createElement("div");
          const cols = GROUP_COLUMNS[layout.group] || 2;
          wrap.className = "flow-wrap-" + cols;
          // The wrapper itself sits in the outer .flow grid — its row
          // comes from the first grouped node's own `row`, since the
          // nodes inside share one wrapper position.
          if (layout.row) wrap.style.gridRow = String(layout.row);
          flowEl.appendChild(wrap);
          seenGroups[layout.group] = wrap;
        }
        wrap.appendChild(nodeEl(n));
      } else {
        flowEl.appendChild(nodeEl(n));
      }
    });
  }

  function clearActive() {
    document.querySelectorAll(".node.is-active").forEach((el) => {
      el.classList.remove("is-active");
      el.setAttribute("aria-pressed", "false");
    });
  }

  const readout = document.getElementById("readout");
  const readoutIdle = document.getElementById("readoutIdle");
  const readoutContent = document.getElementById("readoutContent");
  const readoutClose = document.getElementById("readoutClose");
  const backdrop = document.getElementById("backdrop");

  function kindTag(ids) {
    return ids
      .map((id) => '<a class="refchip" href="#ref-' + id + '">[' + id + "]</a>")
      .join("");
  }

  function renderDose(rows, usedTerms) {
    if (!rows) return "";
    const trs = rows
      .map(
        (r) =>
          "<tr><td>" +
          linkify(r[0], usedTerms) +
          "</td><td>" +
          linkify(r[1], usedTerms) +
          "</td></tr>"
      )
      .join("");
    return '<table class="dose-table"><tbody>' + trs + "</tbody></table>";
  }

  function selectNode(id) {
    const n = byId[id];
    if (!n) return;
    clearActive();
    const el = document.getElementById("node-" + id);
    if (el) {
      el.classList.add("is-active");
      el.setAttribute("aria-pressed", "true");
    }

    readoutIdle.hidden = true;
    readoutContent.hidden = false;

    const usedTerms = new Set();

    let html = "";
    html += '<p class="readout__tag">' + escapeHtml(n.type) + "</p>";
    html += '<h2 class="readout__title">' + escapeHtml(n.label) + "</h2>";
    if (n.sub) html += '<p class="readout__sub">' + escapeHtml(n.sub) + "</p>";
    if (n.needsAuthor) {
      html +=
        '<span class="readout__flag">awaiting author citation</span>';
    }
    html += "<h3>What this means</h3><p>" + linkify(n.meaning, usedTerms) + "</p>";
    if (n.dose) {
      html += "<h3>Dosing, as authored</h3>" + renderDose(n.dose, usedTerms);
    }
    html += "<h3>Why</h3><p>" + linkify(n.rationale, usedTerms) + "</p>";
    if (n.cautions && n.cautions.length) {
      html +=
        "<h3>Cautions &amp; special populations</h3><ul class=\"caution-list\">" +
        n.cautions.map((c) => "<li>" + linkify(c, usedTerms) + "</li>").join("") +
        "</ul>";
    }
    html += "<h3>References</h3><div class=\"refchips\">" + kindTag(n.refs) + "</div>";

    readoutContent.innerHTML = html;

    if (window.matchMedia("(max-width: 900px)").matches) {
      readout.classList.add("is-open");
      backdrop.classList.add("is-open");
    }
  }

  function closeReadout() {
    readout.classList.remove("is-open");
    backdrop.classList.remove("is-open");
  }

  readoutContent.addEventListener("click", (e) => {
    const btn = e.target.closest(".term");
    if (!btn) return;
    const def = btn.nextElementSibling;
    if (!def || !def.classList.contains("term-def")) return;
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", open ? "false" : "true");
    def.hidden = open;
  });

  readoutClose.addEventListener("click", closeReadout);
  backdrop.addEventListener("click", closeReadout);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeReadout();
  });

  /* ---- references list ---- */
  function renderReferences() {
    const list = document.getElementById("referencesList");
    const count = document.getElementById("refCount");
    if (count) count.textContent = "(" + REFERENCES.length + ")";
    REFERENCES.forEach((r) => {
      const li = document.createElement("li");
      li.id = "ref-" + r.id;
      const linkHtml = r.url
        ? "<br><a href=\"" +
          r.url +
          '" target="_blank" rel="noopener">' +
          r.url +
          "</a>"
        : "";
      li.innerHTML =
        r.text + ' <span class="kind">' + r.kind + "</span>" + linkHtml;
      list.appendChild(li);
    });
  }

  /* ---- connector lines (desktop only) ---- */
  function pointAt(el, side) {
    const flowRect = flowEl.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const x = {
      left: r.left,
      right: r.right,
      center: (r.left + r.right) / 2
    };
    const y = {
      top: r.top,
      bottom: r.bottom,
      center: (r.top + r.bottom) / 2
    };
    return {
      x: x[side.x] - flowRect.left,
      y: y[side.y] - flowRect.top
    };
  }

  function drawEdges() {
    // Drawn on every viewport — mobile shows the identical diagram
    // inside a horizontally scrollable .scope, rather than a reflowed
    // linear stack, so the arrows are needed there too.
    const flowRect = flowEl.getBoundingClientRect();
    edgesSvg.setAttribute("width", flowRect.width);
    edgesSvg.setAttribute("height", flowRect.height);
    edgesSvg.setAttribute("viewBox", "0 0 " + flowRect.width + " " + flowRect.height);
    edgesSvg.innerHTML =
      '<defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#4A6684"/></marker></defs>';

    EDGES.forEach(([fromId, toId, label, variant]) => {
      const a = document.getElementById("node-" + fromId);
      const b = document.getElementById("node-" + toId);
      if (!a || !b) return;
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();

      // Compare vertical CENTERS, not tops: a decision diamond uses
      // align-self:center (it doesn't stretch to the row's full height),
      // while an ordinary box with multi-line sub text can be taller than
      // the row's other cells and define the row height itself — so two
      // nodes genuinely on the same grid row can still have different
      // `top`s even though they're vertically centered on each other.
      const aCenterY = (ar.top + ar.bottom) / 2;
      const bCenterY = (br.top + br.bottom) / 2;

      let p1, p2;
      if (Math.abs(aCenterY - bCenterY) < 8) {
        // same row: connect sides
        p1 = pointAt(a, { x: ar.left < br.left ? "right" : "left", y: "center" });
        p2 = pointAt(b, { x: ar.left < br.left ? "left" : "right", y: "center" });
      } else {
        p1 = pointAt(a, { x: "center", y: "bottom" });
        p2 = pointAt(b, { x: "center", y: "top" });
      }

      const midY = (p1.y + p2.y) / 2;
      const detour = DETOUR[fromId + "->" + toId];
      let d;
      if (detour) {
        const obEl = document.getElementById("node-" + detour.obstacle);
        const obR = obEl.getBoundingClientRect();
        const detourX =
          detour.side === "left"
            ? obR.left - flowRect.left - detour.clearance
            : obR.right - flowRect.left + detour.clearance;
        const topY = obR.top - flowRect.top - 10;
        const botY = obR.bottom - flowRect.top + 10;
        d =
          "M" + p1.x + "," + p1.y +
          " C" + p1.x + "," + (p1.y + 18) + " " + detourX + "," + topY + " " + detourX + "," + topY +
          " L" + detourX + "," + botY +
          " C" + detourX + "," + botY + " " + p2.x + "," + (p2.y - 18) + " " + p2.x + "," + p2.y;
      } else {
        d =
          Math.abs(p1.y - p2.y) < 4
            ? "M" + p1.x + "," + p1.y + " L" + p2.x + "," + p2.y
            : "M" + p1.x + "," + p1.y +
              " C" + p1.x + "," + midY + " " + p2.x + "," + midY + " " + p2.x + "," + p2.y;
      }

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "flow-edge" + (variant === "info" ? " is-info" : ""));
      if (variant !== "info") path.setAttribute("marker-end", "url(#arrow)");
      edgesSvg.appendChild(path);

      if (label) {
        const sameRow = Math.abs(p1.y - p2.y) < 4;
        const lx = sameRow ? (p1.x + p2.x) / 2 : p2.x + (p1.x > p2.x ? -10 : 10);
        const ly = sameRow ? p1.y - 8 : p1.y + (p2.y - p1.y) * 0.22;

        // Label background scales with text length.
        const labelW = Math.max(28, label.length * 6.1 + 12);

        const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bg.setAttribute("class", "edge-label-bg");
        bg.setAttribute("x", lx - labelW / 2);
        bg.setAttribute("y", ly - 11);
        bg.setAttribute("width", labelW);
        bg.setAttribute("height", 14);
        edgesSvg.appendChild(bg);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("class", "edge-label");
        text.setAttribute("x", lx);
        text.setAttribute("y", ly);
        text.setAttribute("text-anchor", "middle");
        text.textContent = label;
        edgesSvg.appendChild(text);
      }
    });
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawEdges, 120);
  });

  render();
  renderReferences();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(drawEdges);
  }
  window.addEventListener("load", drawEdges);
  drawEdges();
})();
