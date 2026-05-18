/* ============================================================
   AI 行业研究报告 · 逻辑层 v0.2
   ============================================================ */

let D;
let s2Done = false, s3Done = false, s4Done = false, s5Done = false;
let mapView = 'brand';
let radarChart = null;

/* ── Tooltip ── */
const TT = document.getElementById('tooltip');
function ttShow(html, e) { TT.innerHTML = html; TT.style.display = 'block'; ttMove(e); }
function ttMove(e) {
  TT.style.left = Math.min(e.clientX + 14, window.innerWidth  - 270) + 'px';
  TT.style.top  = Math.min(e.clientY - 10,  window.innerHeight - 160) + 'px';
}
function ttHide() { TT.style.display = 'none'; }
document.addEventListener('mousemove', e => { if (TT.style.display !== 'none') ttMove(e); });

/* ════════════════════════════════════════
   Tab 切换
════════════════════════════════════════ */
function showTab(n) {
  document.querySelectorAll('.sp').forEach((s, i) => s.classList.toggle('on', i === n - 1));
  document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('on', i === n - 1));
  if (n === 2 && !s2Done) { s2Done = true; renderS6(); }  // s2 DOM has s6-*-wrap IDs
  if (n === 3 && !s3Done) { s3Done = true; renderS4(); }  // s3 DOM has lx-*-wrap IDs
  if (n === 4 && !s4Done) { s4Done = true; renderS5(); }  // s4 DOM has s5-content IDs
  if (n === 5 && !s5Done) { s5Done = true; renderVibeCoding(); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  D = window.AI_DATA;
  if (!D) { console.error('[Report] AI_DATA not found'); return; }
  renderS1();
});

/* ════════════════════════════════════════
   SECTION 01 · 行业概览
════════════════════════════════════════ */
function renderS1() {
  renderMilestones();   /* 01 · 行业里程碑   */
  renderGlossary();     /* 02 · 技术词典     */
  renderPyramid();      /* 03 · 产业链金字塔  */
  renderPlayerMap();    /* 04 · 全球玩家格局  */
  renderFormFactor();   /* 06 · 形态展望     */
}

/* 03 · 产业链金字塔 — SVG 三角形 + 两级词卡 */
function renderPyramid() {
  const wrap = document.getElementById('pyramid-wrap');
  if (!wrap) return;
  const layers = D.pyramid_layers; /* [app, model, infra] — top→bottom */

  /* Proper triangle: apex (150,0), base (0,270)–(300,270)
     At y: left_x = 150*(1 – y/270),  right_x = 150*(1 + y/270)
     Band 0 (app):   y=0→90:   edges at x=100,200
     Band 1 (model): y=90→180: edges at x=50,250
     Band 2 (infra): y=180→270: edges at x=0,300  */
  const svgBands = [
    { path: 'M150,0 L200,90 L100,90 Z',               cy: 48  },
    { path: 'M100,90 L200,90 L250,180 L50,180 Z',     cy: 135 },
    { path: 'M50,180 L250,180 L300,270 L0,270 Z',     cy: 225 },
  ];

  wrap.innerHTML = `
    <div class="pyr-layout">
      <div class="pyr-shape-col">
        <svg class="pyr-svg" viewBox="0 0 300 272" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="pyr-clip-0"><path d="M150,0 L200,90 L100,90 Z"/></clipPath>
            <clipPath id="pyr-clip-1"><path d="M100,90 L200,90 L250,180 L50,180 Z"/></clipPath>
            <clipPath id="pyr-clip-2"><path d="M50,180 L250,180 L300,270 L0,270 Z"/></clipPath>
          </defs>
          ${layers.map((l, i) => `
            <path d="${svgBands[i].path}" fill="${l.color}" class="pyr-svg-band"
                  id="pyr-band-${i}" onclick="showPyramidDetail(${i})"
                  style="cursor:pointer;opacity:0.93;transition:opacity .15s"/>
            <text x="150" y="${svgBands[i].cy - 4}" text-anchor="middle"
                  fill="white" font-family="Georgia,serif" font-size="12" font-weight="700"
                  clip-path="url(#pyr-clip-${i})" pointer-events="none">${l.name}</text>
            <text x="150" y="${svgBands[i].cy + 10}" text-anchor="middle"
                  fill="rgba(255,255,255,0.72)" font-family="monospace" font-size="9"
                  pointer-events="none">${i === 0 ? 'Applications' : l.en}</text>
          `).join('')}
          <!-- divider lines -->
          <line x1="100" y1="90"  x2="200" y2="90"  stroke="white" stroke-width="1.5" opacity="0.5" pointer-events="none"/>
          <line x1="50"  y1="180" x2="250" y2="180" stroke="white" stroke-width="1.5" opacity="0.5" pointer-events="none"/>
        </svg>
        <div class="pyr-hint">点击层级查看详情 →</div>
      </div>
      <div class="pyr-detail-col" id="pyramid-detail"></div>
    </div>
  `;

  /* default: show 应用层 → 智能眼镜 (showPyramidDetail auto-expands first item) */
  showPyramidDetail(0);
}

function showPyramidDetail(layerIdx) {
  /* highlight active band */
  document.querySelectorAll('.pyr-svg-band').forEach((el, i) => {
    el.style.opacity = i === layerIdx ? '1' : '0.65';
  });
  const l = D.pyramid_layers[layerIdx];
  const panel = document.getElementById('pyramid-detail');
  if (!panel) return;
  panel.innerHTML = `
    <div class="pyr-det-hd" style="border-left:4px solid ${l.color}">
      <span class="pyr-det-name" style="color:${l.color}">${l.name}</span>
      <span class="pyr-det-en">${l.en}</span>
    </div>
    <div class="pyr-items">
      ${l.bracket_items.map((item, ii) => `
        <button class="pyr-item-btn" id="pyr-item-${layerIdx}-${ii}"
                onclick="showPyramidItem(${layerIdx},${ii})"
                style="--tc:${l.color}">
          <span class="pyr-item-icon">${item.icon}</span>
          <span class="pyr-item-name">${item.name}</span>
          <span class="pyr-item-arrow">▸</span>
        </button>
      `).join('')}
    </div>
    <div class="pyr-item-detail" id="pyr-item-detail"></div>
  `;
  /* auto-expand first item for all layers */
  showPyramidItem(layerIdx, 0);
}

function showPyramidItem(layerIdx, itemIdx) {
  const l = D.pyramid_layers[layerIdx];
  const item = l.bracket_items[itemIdx];
  /* toggle */
  const btn = document.getElementById(`pyr-item-${layerIdx}-${itemIdx}`);
  const det = document.getElementById('pyr-item-detail');
  if (!btn || !det) return;
  if (btn.classList.contains('active')) {
    btn.classList.remove('active');
    det.innerHTML = ''; return;
  }
  document.querySelectorAll('.pyr-item-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const insightHtml = item.insight ? `
    <div class="pyr-insight-bar" style="border-left:3px solid ${l.color}">
      <span class="pyr-insight-icon">${item.insight.icon}</span>
      <div>
        <div class="pyr-insight-title" style="color:${l.color}">${item.insight.title}</div>
        <div class="pyr-insight-body">${item.insight.body}</div>
      </div>
    </div>` : '';
  det.innerHTML = `
    <div class="pyr-players-hd">
      <span class="pyr-players-icon">${item.icon}</span>
      <span class="pyr-players-name" style="color:${l.color}">${item.name} — 主要玩家</span>
    </div>
    <div class="pyr-players-grid">
      ${item.players.map(p => `
        <div class="pyr-player-card" style="--tc:${l.color}">
          <div class="pyr-player-top">
            <span class="pyr-player-name">${p.name}</span>
            <span class="pyr-player-product">${p.product}</span>
          </div>
          <div class="pyr-player-desc">${p.desc}</div>
        </div>
      `).join('')}
    </div>
    ${insightHtml}
  `;
}

/* keep old helpers but they're no longer called */
/* (old pyramid helpers removed — replaced by showPyramidDetail / showPyramidItem above) */

/* 02 · 核心技术词典（可折叠维度）*/
/* 02 · 行业里程碑时间轴 */
function renderMilestones() {
  const wrap = document.getElementById('milestone-wrap');
  if (!wrap) return;
  const data = D.industry_milestones;
  if (!data || !data.length) return;

  /* turning-point banner strip */
  const tpYears = data.filter(y => y.turning_point);
  const tpBanner = `
    <div class="ms-turning-strip">
      <div class="ms-turning-label">三大转折点</div>
      <div class="ms-turning-items">
        ${tpYears.map(y => `
          <div class="ms-turning-item" style="--ec:${y.turning_point.color}">
            <div class="ms-turning-item-top">
              <span class="ms-turning-icon">${y.turning_point.icon}</span>
              <span class="ms-turning-year">${y.year}</span>
              <span class="ms-turning-name">${y.turning_point.label}</span>
            </div>
            <div class="ms-turning-desc">${y.turning_point.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  /* legend tags */
  const tagSet = {};
  data.forEach(y => y.events.forEach(e => { tagSet[e.tag] = e.color; }));
  const legend = Object.entries(tagSet).map(([tag, color]) => `
    <div class="ms-legend-item">
      <span class="ms-legend-dot" style="background:${color}"></span>
      <span>${tag}</span>
    </div>
  `).join('');

  /* year columns: banner/spacer → events → dot → year-label
     ms-cols uses align-items:flex-end so ALL dots stay on same horizontal axis */
  const cols = data.map(y => {
    const isCurrent = y.year === 2026;
    const isTp      = !!y.turning_point;
    const tp        = y.turning_point;

    const evCards = y.events.map(e => `
      <div class="ms-event" style="--ec:${e.color}">
        <div class="ms-ev-top">
          <span class="ms-tag">${e.tag}</span>
          <span class="ms-title">${e.title}</span>
        </div>
        <div class="ms-desc">${e.desc}</div>
      </div>
    `).join('');

    const banner = isTp
      ? `<div class="ms-tp-banner" style="--ec:${tp.color}">
           <span class="ms-tp-icon">${tp.icon}</span>
           <span class="ms-tp-txt">${tp.label}</span>
         </div>`
      : `<div class="ms-tp-spacer"></div>`;

    const dotStyle = isTp ? `style="border-color:${tp.color};background:${tp.color}"` : '';

    return `
      <div class="ms-year-col ${isCurrent ? 'current' : ''} ${isTp ? 'turning' : ''}">
        ${banner}
        <div class="ms-events">${evCards}</div>
        <div class="ms-dot-row">
          <div class="ms-dot ${isTp ? 'tp' : ''} ${isCurrent ? 'current' : ''}" ${dotStyle}></div>
        </div>
        <div class="ms-year-label">${y.year}</div>
        ${isTp
          ? `<div class="ms-tp-era" style="color:${tp.color}">${tp.icon} ${tp.label}</div>`
          : `<div class="ms-tp-era-spacer"></div>`}
      </div>
    `;
  }).join('');

  wrap.innerHTML = `
    ${tpBanner}
    <div class="ms-legend">${legend}</div>
    <div class="ms-track">
      <div class="ms-axis"></div>
      <div class="ms-cols">${cols}</div>
    </div>
  `;
}

/* 02 · 技术词典 — 左侧纵轴导航 + 右侧词卡展开 */
function renderGlossary() {
  const nav = document.getElementById('gloss-nav');
  const panel = document.getElementById('gloss-panel');
  if (!nav || !panel) return;
  const dims = D.glossary_dims;

  /* left nav: vertical axis with dimension buttons */
  nav.innerHTML = `
    <div class="gloss-axis-wrap">
      <div class="gloss-axis-line"></div>
      ${dims.map((dim, di) => `
        <div class="gloss-nav-item ${di === 0 ? 'active' : ''}"
             style="--dc:${dim.color}"
             onclick="selectGlossDim(${di})">
          <div class="gloss-nav-dot"></div>
          <div class="gloss-nav-body">
            <div class="gloss-nav-pill">维度 ${dim.dim}</div>
            <div class="gloss-nav-label">${dim.label}</div>
            <div class="gloss-nav-en">${dim.en}</div>
            <div class="gloss-nav-desc">${dim.desc}</div>
            <div class="gloss-nav-count">${dim.terms.length} 个词条</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  /* show first dimension by default */
  showGlossDim(0);
}

function selectGlossDim(di) {
  document.querySelectorAll('.gloss-nav-item').forEach((el, i) => {
    el.classList.toggle('active', i === di);
  });
  showGlossDim(di);
}

function showGlossDim(di) {
  const panel = document.getElementById('gloss-panel');
  if (!panel) return;
  const dim = D.glossary_dims[di];
  panel.innerHTML = `
    <div class="gloss-panel-hd" style="border-left:4px solid ${dim.color}">
      <span class="gloss-panel-dim" style="color:${dim.color}">维度 ${dim.dim}</span>
      <span class="gloss-panel-title">${dim.label}</span>
      <span class="gloss-panel-en">${dim.en}</span>
    </div>
    <div class="gloss-panel-desc">${dim.desc}</div>
    <div class="gloss-cards">
      ${dim.terms.map((t, ti) => `
        <div class="gloss-fan-card ${t.highlight ? 'highlight' : ''}" style="--dc:${dim.color}">
          <div class="gloss-fan-no">${dim.dim}${ti + 1}</div>
          <div class="gloss-fan-term">${t.term}</div>
          <div class="gloss-fan-full">${t.full}</div>
          ${t.en && t.en.toLowerCase() !== t.term.toLowerCase()
            ? `<div class="gloss-fan-en-full">${t.en}</div>`
            : ''}
          <div class="gloss-fan-def">${t.def}</div>
          ${t.brands ? `
            <div class="gloss-fan-brands">
              <div class="gloss-fan-brands-label">主要厂商</div>
              <div class="gloss-fan-chips">
                ${t.brands.map(b => `<span class="gloss-fan-chip">${b.name}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          <div class="gloss-fan-key">${t.key}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/* 04 · 全球玩家格局（世界地图 + 竞争洞察） */
function renderPlayerMap() {
  const wrap = document.getElementById('map-svg-player');
  if (!wrap) return;
  buildPlayerLegend();
  drawWorldMap('map-svg-player', 'map-detail-player', getPlayerColor, onPlayerClick, '156');
  /* insight cards are now embedded in the click panel — do not render separately */
}

function renderPlayerInsights() {
  const el = document.getElementById('player-insights');
  if (!el) return;
  const insights = D.global_player_insights;
  if (!insights) return;
  el.innerHTML = `
    <div class="pi-grid">
      ${insights.map(ins => `
        <div class="pi-card" style="border-top:3px solid ${ins.color}">
          <div class="pi-region">${ins.region}</div>
          <div class="pi-tagline" style="color:${ins.color}">${ins.tagline}</div>
          <div class="pi-desc">${ins.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function buildPlayerLegend() {
  const el = document.getElementById('player-map-legend');
  if (!el) return;
  el.innerHTML = Object.entries(D.camp_colors).map(([camp, color]) => `
    <div class="player-camp-badge">
      <div class="player-camp-dot" style="background:${color}"></div>
      <span>${camp}</span>
    </div>
  `).join('');
}

function getPlayerColor(id) {
  const info = D.player_camps[id];
  if (!info) return null;
  return D.camp_colors[info.camp] || '#4A4743';
}

function onPlayerClick(id) {
  const det = document.getElementById('map-detail-player');
  if (!det) return;
  const info = D.player_camps[id];
  if (!info) return;
  const clr = D.camp_colors[info.camp] || '#4A4743';
  const traits = (D.country_traits || {})[id];
  const insight = traits && traits.insight_idx !== undefined
    ? (D.global_player_insights || [])[traits.insight_idx] : null;

  const leftHtml = `
    <div class="map-det-hd" style="border-left:4px solid ${clr}">
      <span class="map-detail-cluster" style="background:${clr}">${info.camp}</span>
      <strong class="map-det-name">${info.name}</strong>
    </div>
    ${traits ? `
      <div class="map-country-traits">
        <div class="map-trait-tags">
          ${traits.tags.map(t => `<span class="map-trait-tag" style="background:color-mix(in srgb,${clr} 12%,var(--sf));color:${clr}">${t}</span>`).join('')}
        </div>
        <div class="map-trait-note">${traits.note}</div>
      </div>` : ''}
    ${insight ? `<p class="map-det-insight">${insight.desc}</p>` : ''}
  `;

  const rightHtml = `
    <div class="map-det-players-wrap">
      <p class="map-det-players-label">主要玩家</p>
      <div class="map-detail-players">
        ${info.players.map(p => `
          <button class="map-player-tag clickable" onclick="showCompanyDetail('${p.replace(/'/g,"\\'")}',this)">${p}</button>
        `).join('')}
      </div>
      <div class="map-company-detail" id="map-company-detail"></div>
    </div>
  `;

  det.innerHTML = `<div class="map-det-inner">${leftHtml}<div>${rightHtml}</div></div>`;
  det.classList.add('has-content');
}

function showCompanyDetail(name, btn) {
  const det = document.getElementById('map-company-detail');
  if (!det) return;
  const prof = D.company_profiles[name];
  if (btn.classList.contains('active')) {
    btn.classList.remove('active');
    det.innerHTML = ''; det.classList.remove('open');
    return;
  }
  document.querySelectorAll('.map-player-tag').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (!prof) {
    det.innerHTML = `<div class="map-cpd-inner"><p style="color:var(--i3);font-size:12px">暂无详细信息</p></div>`;
  } else {
    det.innerHTML = `
      <div class="map-cpd-inner">
        <div class="map-cpd-top">
          <span class="map-cpd-name">${name}</span>
          <span class="map-cpd-track">${prof.track}</span>
        </div>
        <div class="map-cpd-products">代表产品：${prof.products}</div>
        <p class="map-cpd-desc">${prof.desc}</p>
      </div>
    `;
  }
  det.classList.add('open');
}

/* 04 · 三大核心趋势 */
function renderTrends() {
  const el = document.getElementById('trends-grid');
  if (!el) return;
  el.innerHTML = D.trends.map(t => `
    <div class="trend-card ${t.highlight ? 'highlight' : ''}">
      <div class="trend-icon">${t.icon}</div>
      <div class="trend-title ${t.highlight ? 'accent' : ''}">${t.title}</div>
      <div class="trend-en">${t.en}</div>
      <div class="trend-tagline">${t.tagline}</div>
      <div class="trend-desc">${t.desc}</div>
      <div class="trend-signals">
        ${t.signals.map(s => `
          <div class="trend-signal">
            <span class="trend-signal-label">${s.label}</span>
            <span>
              <span class="trend-signal-value">${s.value}</span>
              <span class="trend-signal-trend">${s.trend}</span>
            </span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* 共用地图绘制函数 */
function drawWorldMap(svgWrapId, detailId, colorFn, clickFn, defaultId) {
  const wrap = document.getElementById(svgWrapId);
  if (!wrap) return;
  const W = wrap.clientWidth || 900, H = 500;
  const svg = d3.select(wrap).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  const proj = d3.geoNaturalEarth1().scale(W / 6.0).translate([W / 2, H / 2 + 10]);
  const path = d3.geoPath().projection(proj);

  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(world => {
      const features = topojson.feature(world, world.objects.countries).features;
      svg.selectAll('path.country').data(features).join('path')
        .attr('class', 'country')
        .attr('d', path)
        .attr('fill', d => colorFn(String(d.id)) || 'var(--ru)')
        .attr('stroke', '#fff').attr('stroke-width', 0.4)
        .style('cursor', d => colorFn(String(d.id)) ? 'pointer' : 'default')
        .on('click', (e, d) => {
          const id = String(d.id);
          if (colorFn(id)) clickFn(id);
        })
        .on('mouseover', (e, d) => {
          const id = String(d.id);
          if (!colorFn(id)) return;
          const info = D.player_camps[id];
          if (info) ttShow(`<strong>${info.name}</strong><br><span style="font-size:11px;color:#ccc">${info.camp}</span>`, e);
        })
        .on('mouseleave', ttHide);
      /* auto-select default country */
      if (defaultId && colorFn(defaultId)) clickFn(defaultId);
    })
    .catch(() => {
      wrap.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:500px;color:var(--i3);font-size:13px;text-align:center;">地图加载需要网络连接<br>请通过本地服务器访问（python3 -m http.server）</div>';
    });
}

/* 04 · 用户画像 */
function renderPersonas() {
  const el = document.getElementById('persona-grid');
  if (!el) return;
  el.innerHTML = D.personas.map(p => `
    <div class="persona-card">
      <div class="persona-icon">${p.icon}</div>
      <div class="persona-name">${p.name}</div>
      <div class="persona-tags">
        ${p.tags.map(t => `<span class="persona-tag tag-${t.c}">${t.t}</span>`).join('')}
      </div>
      <div class="persona-desc">${p.desc}</div>
      <div class="persona-products"><strong>常用产品：</strong>${p.products}</div>
    </div>
  `).join('');
}

/* 05 · 场景渗透率 */
function renderPenetration() {
  const el = document.getElementById('penetration-wrap');
  if (!el) return;
  el.innerHTML = D.penetration.map(p => `
    <div class="pt-row">
      <div class="pt-scene">${p.scene}</div>
      <div class="pt-bar-track">
        <div class="pt-bar-fill" style="width:${p.rate}%;background:${p.color}"></div>
      </div>
      <div class="pt-rate">${p.rate}%</div>
      <div class="pt-yoy">${p.yoy}</div>
    </div>
    <div class="pt-note">${p.note}</div>
  `).join('');
}


/* 06 · 形态展望 */
function renderFormFactor() {
  const wrap = document.getElementById('form-factor-wrap');
  if (!wrap) return;
  const ff = D.form_factor;

  function buildPanel(trackKey) {
    const t = ff[trackKey];
    return `
      <div class="ff-tagline" style="--tc:${t.color}">${t.tagline}</div>
      <div class="ff-cards">
        ${t.tracks.map(card => `
          <div class="ff-card" style="--tc:${t.color}">
            <div class="ff-card-hd">
              <span class="ff-card-icon">${card.icon}</span>
              <div class="ff-card-cat">${card.name}</div>
              <div class="ff-card-name">${card.title}</div>
              <div class="ff-card-sub">${card.subtitle}</div>
            </div>
            <div class="ff-card-body">
              ${card.insights.map(ins => `
                <div class="ff-insight">
                  <div class="ff-insight-label">${ins.label}</div>
                  <div class="ff-insight-text">${ins.text}</div>
                </div>
              `).join('')}
              ${card.products ? `
                <div class="ff-products">
                  <div class="ff-products-hd">代表产品</div>
                  <div class="ff-products-list">
                    ${card.products.map(p => `
                      <div class="ff-product-item">
                        <span class="ff-product-name">${p.name}</span>
                        <span class="ff-product-note">${p.note}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderTabs(activeKey) {
    const tabs = ['software', 'hardware'].map(key => {
      const t = ff[key];
      const isActive = key === activeKey;
      return `
        <button class="ff-tab-btn ${isActive ? 'active' : ''}"
                style="--tc:${t.color}"
                onclick="switchFF('${key}')">
          <span class="ff-tab-icon">${t.icon}</span>
          <span>${t.label}</span>
        </button>
      `;
    }).join('');
    return `<div class="ff-tabs">${tabs}</div>`;
  }

  window.switchFF = function(key) {
    wrap.innerHTML = renderTabs(key) + buildPanel(key);
  };

  wrap.innerHTML = renderTabs('software') + buildPanel('software');
}

/* ════════════════════════════════════════
   SECTION 02 · 赛道拆解和行业未来
════════════════════════════════════════ */
function renderS2() {
  renderS2Barriers();       /* 01 · 发展困境三面墙 */
  renderS2BreakSoftware();  /* 02 · 破解软件墙 */
  renderS2BreakHardware();  /* 03 · 破解硬件墙 */
  renderS2BreakCloud();     /* 04 · 破解云端墙 */
  /* 05 终局畅想 & 06 附录 已移至 S06，在 renderS6() 中渲染 */
}

/* ── 行业转向模块通用：单个 approach 卡片 ── */
function _approachCard(a) {
  return `
    <div class="s2bk-approach" style="--ac:${a.color}">
      <div class="s2bk-approach-hd">
        <span class="s2bk-approach-icon">${a.icon}</span>
        <div>
          <div class="s2bk-approach-title">${a.title}</div>
          <div class="s2bk-approach-sub">${a.subtitle}</div>
        </div>
      </div>
      <div class="s2bk-points">
        ${a.points.map(p => `
          <div class="s2bk-point">
            <div class="s2bk-point-label">${p.label}</div>
            <div class="s2bk-point-text">${p.text}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* 02 · 破解软件墙 */
function renderS2BreakSoftware() {
  const wrap = document.getElementById('s2-break-software-wrap');
  if (!wrap) return;
  const d = D.s2_break_software;
  if (!d) return;
  wrap.innerHTML = `
    <div class="s2bk-wall-badge" style="background:${d.color}18;color:${d.color};border:1px solid ${d.color}35">
      💻 ${d.wall}
    </div>
    <div class="s2bk-dilemma">
      <span class="s2bk-dilemma-label">⚠ 核心困境</span>
      <span class="s2bk-dilemma-text">${d.dilemma}</span>
    </div>
    <div class="s2bk-solution-hd" style="border-left:3px solid ${d.color}">
      <div class="s2bk-solution-label">${d.solution_label}</div>
      <div class="s2bk-trend">${d.trend}</div>
    </div>
    <div class="s2bk-approaches">
      ${d.approaches.map(a => _approachCard(a)).join('')}
    </div>
    <div class="s2bk-metric" style="--wc:${d.color}">
      <span class="s2bk-metric-label">📊 ${d.metric.label}</span>
      <span class="s2bk-metric-text">${d.metric.text}</span>
    </div>
  `;
}

/* 03 · 破解硬件墙 */
function renderS2BreakHardware() {
  const wrap = document.getElementById('s2-break-hardware-wrap');
  if (!wrap) return;
  const d = D.s2_break_hardware;
  if (!d) return;
  wrap.innerHTML = `
    <div class="s2bk-wall-badge" style="background:${d.color}18;color:${d.color};border:1px solid ${d.color}35">
      ⚙️ ${d.wall}
    </div>
    <div class="s2bk-dilemma">
      <span class="s2bk-dilemma-label">⚠ 核心困境</span>
      <span class="s2bk-dilemma-text">${d.dilemma}</span>
    </div>
    <div class="s2bk-solution-hd" style="border-left:3px solid ${d.color}">
      <div class="s2bk-solution-label">${d.solution_label}</div>
      <div class="s2bk-trend">${d.solution_desc}</div>
    </div>
    <div class="s2bk-approaches">
      ${d.approaches.map(a => _approachCard(a)).join('')}
    </div>
    <div class="s2bk-conclusion">💡 ${d.conclusion}</div>
  `;
}

/* 04 · 破解云端墙 */
function renderS2BreakCloud() {
  const wrap = document.getElementById('s2-break-cloud-wrap');
  if (!wrap) return;
  const d = D.s2_break_cloud;
  if (!d) return;
  wrap.innerHTML = `
    <div class="s2bk-wall-badge" style="background:${d.color}18;color:${d.color};border:1px solid ${d.color}35">
      ☁️ ${d.wall}
    </div>
    <div class="s2bk-trend-block">${d.trend}</div>
    <div class="s2bk-solution-hd" style="border-left:3px solid ${d.color}">
      <div class="s2bk-solution-label">${d.solution_label}</div>
    </div>
    <div class="s2bk-approaches s2bk-approaches-3">
      ${d.approaches.map(a => _approachCard(a)).join('')}
    </div>
  `;
}

/* 05 · 终局畅想（新版） */
function renderS2EndgameNew() {
  const wrap = document.getElementById('s2-endgame-2-wrap');
  if (!wrap) return;
  const d = D.s2_endgame_2;
  if (!d) return;
  const v = d.vertical, s = d.symbiosis, p = d.pareto_pos;

  /* ── 帕累托前沿 SVG 散点图 ── */
  const paretoSvg = `
    <svg class="s2eg2-pareto-svg" viewBox="0 0 240 158" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="158" fill="#f8fafc" rx="8"/>
      <!-- grid -->
      <line x1="38" y1="14" x2="38" y2="126" stroke="#e2e8f0" stroke-width="1"/>
      <line x1="38" y1="126" x2="228" y2="126" stroke="#e2e8f0" stroke-width="1"/>
      <line x1="38" y1="126" x2="38" y2="14" stroke="#cbd5e1" stroke-width="1.2"/>
      <line x1="38" y1="126" x2="228" y2="126" stroke="#cbd5e1" stroke-width="1.2"/>
      <!-- dominated zone -->
      <path d="M55,30 Q95,52 145,86 L228,126 L38,126 Z" fill="#dbeafe" opacity="0.35"/>
      <!-- frontier curve -->
      <path d="M55,30 Q95,52 145,86 Q185,108 222,122" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/>
      <!-- 生存位 highlight -->
      <rect x="38" y="14" width="72" height="44" rx="5" fill="#7C3AED" opacity="0.07"/>
      <text x="74" y="40" text-anchor="middle" font-size="8" fill="#7C3AED" font-weight="800" font-family="sans-serif">最优生存位</text>
      <!-- model dots -->
      <circle cx="55" cy="30" r="5" fill="#7C3AED"/>
      <text x="62" y="27" font-size="7.5" fill="#7C3AED" font-weight="700" font-family="sans-serif">GPT-4o</text>
      <circle cx="88" cy="46" r="5" fill="#2563EB"/>
      <text x="95" y="43" font-size="7.5" fill="#2563EB" font-weight="700" font-family="sans-serif">Gemini Pro</text>
      <circle cx="145" cy="86" r="5" fill="#059669"/>
      <text x="152" y="83" font-size="7.5" fill="#059669" font-weight="700" font-family="sans-serif">Llama 3 70B</text>
      <circle cx="195" cy="112" r="5" fill="#D97706"/>
      <text x="160" y="124" font-size="7.5" fill="#D97706" font-weight="700" font-family="sans-serif">端侧小模型</text>
      <!-- off-frontier dot (dominated) -->
      <circle cx="130" cy="110" r="4" fill="#94a3b8" opacity="0.6"/>
      <text x="138" y="114" font-size="6.5" fill="#94a3b8" font-family="sans-serif">低效区</text>
      <!-- frontier label -->
      <text x="168" y="92" font-size="7" fill="#2563EB" font-family="sans-serif" font-style="italic">帕累托前沿</text>
      <!-- axis labels -->
      <text x="133" y="143" text-anchor="middle" font-size="8" fill="#94a3b8" font-family="sans-serif">推理延迟（低 → 高）</text>
      <text x="14" y="70" text-anchor="middle" font-size="8" fill="#94a3b8" font-family="sans-serif" transform="rotate(-90,14,70)">模型能力</text>
      <!-- arrows -->
      <polygon points="228,124 223,120 223,128" fill="#94a3b8"/>
      <polygon points="38,14 34,19 42,19" fill="#94a3b8"/>
    </svg>`;

  wrap.innerHTML = `
    <div class="s2eg2-trio">

      <!-- Card 1: 垂直整合 -->
      <div class="s2eg2-card" style="--sc:${v.color}">
        <div class="s2eg2-card-title">${v.title}</div>
        ${v.points.map(pt => `
          <div class="s2eg2-sympoint">
            <span class="s2eg2-sym-icon">${pt.icon}</span>
            <div>
              <div class="s2eg2-sym-label" style="color:${v.color}">${pt.label}</div>
              <div class="s2eg2-sym-text">${pt.text}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Card 2: 软硬共生体 -->
      <div class="s2eg2-card" style="--sc:${s.color}">
        <div class="s2eg2-card-title">${s.title}</div>
        ${s.points.map(pt => `
          <div class="s2eg2-sympoint">
            <span class="s2eg2-sym-icon">${pt.icon}</span>
            <div>
              <div class="s2eg2-sym-label">${pt.label}</div>
              <div class="s2eg2-sym-text">${pt.text}</div>
            </div>
          </div>
        `).join('')}
        <div class="s2eg2-sympoint">
          <span class="s2eg2-sym-icon">🔄</span>
          <div>
            <div class="s2eg2-sym-label">数据飞轮自我强化</div>
            <div class="s2eg2-sym-text">硬件采集真实场景数据反哺模型训练，模型迭代再优化硬件指令集——两者进入相互增强的闭环飞轮。</div>
          </div>
        </div>
        <div class="s2eg2-flow">
          <span class="s2eg2-flow-node">感知</span>
          <span class="s2eg2-flow-arr">→</span>
          <span class="s2eg2-flow-node">决策</span>
          <span class="s2eg2-flow-arr">→</span>
          <span class="s2eg2-flow-node">执行</span>
          <span class="s2eg2-flow-arr">↺</span>
          <span class="s2eg2-flow-note">数据回流</span>
        </div>
      </div>

      <!-- Card 3: 帕累托前沿 -->
      <div class="s2eg2-card" style="--sc:${p.color}">
        <div class="s2eg2-card-title">${p.title}</div>
        <div class="s2eg2-pareto-desc">${p.desc}</div>
        <div class="s2eg2-pareto-explain">在「精度 vs 延迟 vs 能耗」三角约束下，前沿上的每个点意味着：<strong>牺牲延迟才能换取更高精度，或反之</strong>。真正的竞争是把整条曲线向左上方推移——而不是在曲线内部选位置。</div>
        ${paretoSvg}
      </div>

    </div>
  `;
}

/* 07 附录 — 手风琴懒加载 */
const _appRendered = [false, false, false, false];

window.toggleAppItem = function(idx) {
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('app-item-' + i);
    if (el && i !== idx) el.classList.remove('open');
  }
  const target = document.getElementById('app-item-' + idx);
  if (!target) return;
  const wasOpen = target.classList.contains('open');
  target.classList.toggle('open', !wasOpen);
  if (!wasOpen && !_appRendered[idx]) {
    _appRendered[idx] = true;
    if (idx === 0) renderEdgeAI();
    else if (idx === 1) { renderHwTriangleNew(); renderHwChallengesAppendix(); }
    else if (idx === 2) renderAppDistillation();
    else if (idx === 3) renderAppParetoChart();
  }
};

/* 附录 item 1 — 铁三角挑战补充 */
function renderHwChallengesAppendix() {
  const wrap = document.getElementById('hw-triangle-wrap');
  if (!wrap) return;
  const comps = D.hw_components;
  if (!comps) return;
  const div = document.createElement('div');
  div.className = 'hw-chall-section';
  div.innerHTML = `
    <div class="hw-chall-hd">2026 年各组件面临的核心挑战</div>
    <div class="hw-chall-cards">
      ${comps.map(c => `
        <div class="hw-chall-card" style="--cc:${c.color}">
          <div class="hw-chall-name" style="color:${c.color}">${c.icon} ${c.name}</div>
          <div class="hw-chall-full">${c.full}</div>
          <div class="hw-chall-text">${c.challenge || '—'}</div>
        </div>
      `).join('')}
    </div>
  `;
  wrap.appendChild(div);
}

/* 附录 item 2 — 模型蒸馏原理图 */
function renderAppDistillation() {
  const wrap = document.getElementById('app-distill-wrap');
  if (!wrap) return;
  const { distillation, distill_intro } = D.pareto_new;
  wrap.innerHTML = `
    <div class="di-section" style="margin:0">
      <div class="di-label">模型蒸馏：AI 的「浓缩提炼」</div>
      <div class="di-analogy">${distill_intro.analogy}</div>
      <div class="distill-pipeline">
        ${distillation.map((s, i) => `
          <div class="distill-step">
            <div class="distill-icon">${s.icon}</div>
            <div class="distill-label" style="color:${s.color}">${s.label}</div>
            <div class="distill-size">${s.size}</div>
            <div class="distill-desc">${s.desc}</div>
          </div>
          ${i < distillation.length - 1 ? '<div class="distill-arrow">→</div>' : ''}
        `).join('')}
      </div>
      <div class="di-conclusion">💡 ${distill_intro.conclusion}</div>
    </div>
  `;
}

/* 附录 item 3 — 帕累托前沿（重构版） */
function renderAppParetoChart() {
  const wrap = document.getElementById('app-pareto-wrap');
  if (!wrap) return;
  const { pareto_intro, models, frontier, platform_colors, insight } = D.pareto_new;

  /* ── 概念 SVG：坐标轴 + 前沿曲线 + 区域标注 ── */
  const cSvg = `<svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" class="par-concept-svg">
    <defs>
      <marker id="ax" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#8C8A86"/>
      </marker>
      <marker id="push-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#059669"/>
      </marker>
    </defs>
    <!-- 不可达区域 -->
    <path d="M40,10 L40,155 C80,120 130,82 210,42 L260,20 L260,10 Z" fill="#2563EB" opacity="0.07"/>
    <text x="195" y="26" font-size="8.5" fill="#2563EB" opacity="0.75" font-family="sans-serif" text-anchor="middle" font-weight="600">不可达区</text>
    <text x="195" y="36" font-size="7.5" fill="#2563EB" opacity="0.6" font-family="sans-serif" text-anchor="middle">（硬件物理上限）</text>
    <!-- 可优化区域 -->
    <text x="90" y="148" font-size="8.5" fill="#8C8A86" font-family="sans-serif" text-anchor="middle">可优化区</text>
    <text x="90" y="158" font-size="7.5" fill="#B0ADA8" font-family="sans-serif" text-anchor="middle">（还没榨干硬件潜力）</text>
    <!-- 坐标轴 -->
    <line x1="40" y1="155" x2="270" y2="155" stroke="#CBC8C2" stroke-width="1.5" marker-end="url(#ax)"/>
    <line x1="40" y1="155" x2="40" y2="8" stroke="#CBC8C2" stroke-width="1.5" marker-end="url(#ax)"/>
    <!-- 轴标签 -->
    <text x="155" y="175" text-anchor="middle" font-size="9" fill="#8C8A86" font-family="sans-serif">推理延迟 → 越小越好</text>
    <text x="14" y="88" text-anchor="middle" font-size="9" fill="#8C8A86" font-family="sans-serif" transform="rotate(-90,14,88)">模型能力 ↑ 越高越好</text>
    <!-- 当前前沿曲线 -->
    <path d="M40,155 C55,120 90,82 148,58 C185,42 220,30 258,18" fill="none" stroke="#E03D1E" stroke-width="2.2"/>
    <text x="168" y="54" font-size="9" fill="#E03D1E" font-family="sans-serif" font-weight="700">帕累托前沿</text>
    <line x1="162" y1="56" x2="148" y2="62" stroke="#E03D1E" stroke-width="0.8" opacity="0.7"/>
    <!-- 未来推移后的前沿（目标） -->
    <path d="M40,155 C55,106 90,66 148,42 C185,26 220,16 258,10" fill="none" stroke="#059669" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.6"/>
    <text x="148" y="30" font-size="8" fill="#059669" font-family="sans-serif" opacity="0.85">↑ 目标：推移整条曲线</text>
    <!-- 前沿上的点 -->
    <circle cx="76"  cy="120" r="5" fill="#E03D1E" opacity="0.9" stroke="#fff" stroke-width="1"/>
    <circle cx="118" cy="82"  r="5" fill="#E03D1E" opacity="0.9" stroke="#fff" stroke-width="1"/>
    <circle cx="160" cy="56"  r="5" fill="#E03D1E" opacity="0.9" stroke="#fff" stroke-width="1"/>
    <circle cx="210" cy="34"  r="5" fill="#E03D1E" opacity="0.9" stroke="#fff" stroke-width="1"/>
    <!-- 落后点 -->
    <circle cx="140" cy="128" r="5" fill="#CBC8C2" stroke="#fff" stroke-width="1"/>
    <line x1="143" y1="124" x2="156" y2="60" stroke="#CBC8C2" stroke-width="0.8" stroke-dasharray="3,2"/>
    <text x="107" y="135" font-size="7.5" fill="#8C8A86" font-family="sans-serif">落后点</text>
    <text x="107" y="144" font-size="7" fill="#B0ADA8" font-family="sans-serif">（可继续优化）</text>
  </svg>`;

  /* ── 三重约束 ── */
  const constraints = [
    { icon: '💾', label: '内存', limit: '车规 / 手机：≤ 4 GB', color: '#2563EB', bg: '#EBF2FB',
      why: '模型太大直接装不进去，必须蒸馏压缩到 1–4B 参数量' },
    { icon: '⚡', label: '延迟', limit: '智驾紧急避险：< 10 ms', color: '#E03D1E', bg: '#FDECEA',
      why: '50 ms 的响应延迟在高速场景意味着车辆多移动近 1 米' },
    { icon: '🌡️', label: '功耗', limit: '眼镜 / 车规：< 5 W', color: '#D97706', bg: '#FEF3C7',
      why: '功耗超标 → 发热 → 芯片降频 → AI 变笨——物理散热是智能上限' },
  ];

  /* ── 竞争核心 ── */
  const compete = [
    { icon: '❌', label: '在曲线内部挑位置', desc: '只是在「精度 vs 速度」之间做取舍，没有突破物理极限', color: '#8C8A86', bg: '#F3F4F6' },
    { icon: '✅', label: '把整条曲线向左上推', desc: '软硬协同优化，让同等算力下的精度更高——这才是真正的竞争壁垒', color: '#059669', bg: '#E2F5EE' },
  ];

  wrap.innerHTML = `
    <!-- 核心命题 -->
    <div class="par2-insight">
      <span class="par2-insight-icon">💡</span>
      <span class="par2-insight-text">${insight}</span>
    </div>

    <!-- Block 1: 概念图解 -->
    <div class="par2-concept-row">
      <div class="par2-svg-wrap">${cSvg}</div>
      <div class="par2-concept-right">
        <div class="par2-block-title">什么是帕累托前沿？</div>
        <p class="par2-body">在手机或汽车上跑 AI，有两个天然互斥的目标：<strong>模型能力越强越好</strong>（精度、推理能力），<strong>资源占用越少越好</strong>（内存小、延迟低、功耗低）。</p>
        <p class="par2-body">把所有可能的模型方案画在坐标轴上，最优解的边界线就是<strong>帕累托前沿</strong>——在这条线上，你无法在不牺牲另一目标的前提下继续提升某项指标。</p>
        <div class="par2-states">
          ${pareto_intro.states.map(s => `
            <div class="par2-state" style="border-left:3px solid ${s.color}">
              <span class="par2-state-icon">${s.icon}</span>
              <div>
                <div class="par2-state-label" style="color:${s.color}">${s.label}</div>
                <div class="par2-state-desc">${s.desc}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Block 2: 三重约束 -->
    <div class="par2-block-title par2-block-title--section">端侧 AI 的三重硬约束</div>
    <div class="par2-constraints">
      ${constraints.map(c => `
        <div class="par2-constraint-card" style="border-top:3px solid ${c.color}">
          <div class="par2-constraint-hd">
            <span class="par2-constraint-icon" style="background:${c.bg};color:${c.color}">${c.icon}</span>
            <div>
              <div class="par2-constraint-label" style="color:${c.color}">${c.label}</div>
              <div class="par2-constraint-limit">${c.limit}</div>
            </div>
          </div>
          <div class="par2-constraint-why">${c.why}</div>
        </div>`).join('')}
    </div>

    <!-- Block 3: 竞争核心 -->
    <div class="par2-block-title par2-block-title--section">真正的竞争在哪里？</div>
    <div class="par2-compete-row">
      ${compete.map(c => `
        <div class="par2-compete-card" style="border:1.5px solid ${c.color}30;background:${c.bg}">
          <div class="par2-compete-hd" style="color:${c.color}">
            <span>${c.icon}</span> ${c.label}
          </div>
          <div class="par2-compete-desc">${c.desc}</div>
        </div>`).join('')}
    </div>

    <!-- Block 4: 数据散点图 -->
    <div class="par2-block-title par2-block-title--section">实际数据：主流模型在前沿上的位置</div>
    <div class="par2-chart-note">精度 vs 推理延迟 · 红色虚线为帕累托前沿 · 悬停查看详情</div>
    <div id="app-pareto-svg" style="margin-top:8px"></div>
    <div class="par2-data-source">数据来源：MMLU / HumanEval / MT-Bench 公开综合榜单（精度为加权估算值）；推理延迟为各平台实测参考值；理想车载数据参考 MindVLA 技术白皮书。数据截至 2026 年 Q1，仅供趋势参考，非官方基准测试。</div>
  `;

  /* ── D3 散点图 ── */
  const svgWrap = document.getElementById('app-pareto-svg');
  if (!svgWrap || typeof d3 === 'undefined') return;
  const W = Math.max(svgWrap.clientWidth || 860, 640), H = 300;
  const PAD = { top: 20, right: 140, bottom: 44, left: 54 };
  const CW = W - PAD.left - PAD.right, CH = H - PAD.top - PAD.bottom;
  const xExt = [0, 100], yExt = [40, 96];
  const xS = v => PAD.left + ((v - xExt[0]) / (xExt[1] - xExt[0])) * CW;
  const yS = v => PAD.top  + CH - ((v - yExt[0]) / (yExt[1] - yExt[0])) * CH;
  const svg = d3.select(svgWrap).append('svg').attr('width', W).attr('height', H);
  [50,60,70,80,90].forEach(v => {
    svg.append('line').attr('x1',PAD.left).attr('x2',W-PAD.right).attr('y1',yS(v)).attr('y2',yS(v)).attr('stroke','var(--ru)').attr('stroke-width',0.8);
    svg.append('text').attr('x',PAD.left-7).attr('y',yS(v)+4).attr('text-anchor','end').attr('font-size',10).attr('fill','var(--i3)').attr('font-family','var(--mono)').text(v+'%');
  });
  [10,20,40,60,80].forEach(v => {
    svg.append('line').attr('x1',xS(v)).attr('x2',xS(v)).attr('y1',PAD.top).attr('y2',H-PAD.bottom).attr('stroke','var(--ru)').attr('stroke-width',0.5).attr('stroke-dasharray','3,3');
    svg.append('text').attr('x',xS(v)).attr('y',H-PAD.bottom+15).attr('text-anchor','middle').attr('font-size',10).attr('fill','var(--i3)').attr('font-family','var(--mono)').text(v+'ms');
  });
  svg.append('text').attr('x',PAD.left+CW/2).attr('y',H-4).attr('text-anchor','middle').attr('font-size',11).attr('fill','var(--i3)').text('推理延迟（ms/token）→ 越小越好');
  svg.append('text').attr('x',13).attr('y',H/2).attr('transform',`rotate(-90,13,${H/2})`).attr('text-anchor','middle').attr('font-size',11).attr('fill','var(--i3)').text('综合精度（%）↑ 越高越好');
  const sortedF = [...frontier].sort((a,b)=>a.latency-b.latency);
  const lineGen = d3.line().x(d=>xS(d.latency)).y(d=>yS(d.score)).curve(d3.curveStepAfter);
  svg.append('path').datum(sortedF).attr('d',lineGen).attr('fill','none').attr('stroke','var(--acc)').attr('stroke-width',1.8).attr('stroke-dasharray','6,3').attr('opacity',0.55);
  models.forEach(m => {
    const cx=xS(m.latency), cy=yS(m.score);
    svg.append('circle').attr('cx',cx).attr('cy',cy).attr('r',m.platform==='理想车载'?8:6).attr('fill',m.color).attr('opacity',0.88).attr('stroke','#fff').attr('stroke-width',1.5)
      .style('cursor','pointer')
      .on('mouseover',e=>ttShow(`<strong>${m.name}</strong><br>精度 ${m.score}% · 延迟 ${m.latency}ms<br><span style="color:${m.color}">${m.platform}</span>`,e))
      .on('mouseleave',ttHide);
    if (m.platform==='理想车载'||m.latency<15)
      svg.append('text').attr('x',cx+10).attr('y',cy+4).attr('font-size',9).attr('fill',m.color).attr('font-family','var(--mono)').text(m.name);
  });
  const platforms = Object.entries(platform_colors);
  platforms.forEach(([p,col],i)=>{ const lx=W-PAD.right+14,ly=PAD.top+18+i*22; svg.append('circle').attr('cx',lx+5).attr('cy',ly).attr('r',5).attr('fill',col); svg.append('text').attr('x',lx+15).attr('y',ly+4).attr('font-size',10).attr('fill','var(--i2)').text(p); });
}

/* 01 · 发展困境 — 三面墙 */
function renderS2Barriers() {
  const wrap = document.getElementById('s2-barriers-wrap');
  if (!wrap) return;
  const b = D.s2_barriers;
  if (!b) return;

  wrap.innerHTML = `
    <div class="s2b-tagline">${b.tagline}</div>
    <div class="s2b-walls">
      ${b.walls.map(w => `
        <div class="s2b-wall" style="--wc:${w.color}">
          <div class="s2b-wall-hd">
            <span class="s2b-wall-icon">${w.icon}</span>
            <div>
              <div class="s2b-wall-name">${w.name}</div>
              <div class="s2b-wall-title">${w.title}</div>
            </div>
          </div>
          <div class="s2b-points">
            ${w.points.map(p => `
              <div class="s2b-point">
                <div class="s2b-point-label">${p.label}</div>
                <div class="s2b-point-text">${p.text}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* 03 · 终局畅想 — 两张愿景卡 */
function renderS2Endgame() {
  const wrap = document.getElementById('s2-endgame-wrap');
  if (!wrap) return;
  const eg = D.s2_endgame;
  if (!eg) return;

  wrap.innerHTML = `
    <div class="s2eg-tagline">${eg.tagline}</div>
    <div class="s2eg-visions">
      ${eg.visions.map(v => `
        <div class="s2eg-card" style="--vc:${v.color}">
          <div class="s2eg-card-hd">
            <span class="s2eg-icon">${v.icon}</span>
            <span class="s2eg-title">${v.title}</span>
          </div>
          <div class="s2eg-desc">${v.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/* 端侧 AI · 从云端到端侧 */
function renderEdgeAI() {
  const wrap = document.getElementById('edge-ai-wrap');
  if (!wrap) return;
  const { pain_points, comparison, analogy, auto_reasons } = D.edge_ai;
  const an = analogy;
  wrap.innerHTML = `
    <div class="edge-analogy-row">
      <div class="edge-ana-card cloud">
        <div class="edge-ana-icon">${an.cloud.icon}</div>
        <div class="edge-ana-name">${an.cloud.name}</div>
        <div class="edge-ana-desc">${an.cloud.desc}</div>
      </div>
      <div class="edge-ana-vs">VS</div>
      <div class="edge-ana-card edge">
        <div class="edge-ana-icon">${an.edge.icon}</div>
        <div class="edge-ana-name">${an.edge.name}</div>
        <div class="edge-ana-desc">${an.edge.desc}</div>
      </div>
    </div>
    <div class="edge-trend-bar">
      <span class="edge-trend-icon">→</span>
      <span class="edge-trend-txt">${an.trend}</span>
    </div>

    <div class="edge-ai-layout">
      <div class="edge-pain-grid">
        <div class="edge-pain-header">云端 AI 的四大痛点</div>
        ${pain_points.map(p => `
          <div class="edge-pain-card">
            <div class="edge-pain-icon">${p.icon}</div>
            <div class="edge-pain-title" style="color:${p.color}">${p.title}</div>
            <div class="edge-pain-desc">${p.desc}</div>
          </div>
        `).join('')}
      </div>
      <div class="edge-compare-panel">
        <div class="edge-compare-header">云端 vs 端侧：六维对比</div>
        <table class="edge-compare-table">
          <thead><tr><th>维度</th><th>☁️ 云端 AI</th><th>📱 端侧 AI</th></tr></thead>
          <tbody>
            ${comparison.map(r => `
              <tr>
                <td class="cmp-dim">${r.dim}</td>
                <td class="cmp-val ${r.winner==='cloud' ? 'cmp-win' : 'cmp-lose'}">${r.cloud}</td>
                <td class="cmp-val ${r.winner==='edge'  ? 'cmp-win' : 'cmp-lose'}">${r.edge}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="edge-insight">💡 <strong>结论：</strong>云端 AI 是算力天花板，端侧 AI 是落地前提。二者不是竞争关系，而是「训练在云，推理在端」的分工协作。</div>
      </div>
    </div>

    <div class="edge-auto-section">
      <div class="edge-auto-label">🚗 汽车行业为什么是端侧 AI 的终极战场</div>
      <div class="edge-auto-reasons">
        ${auto_reasons.map(r => `
          <div class="edge-auto-card" style="border-left-color:${r.color}">
            <div class="edge-auto-hd">
              <span class="edge-auto-icon">${r.icon}</span>
              <span class="edge-auto-title" style="color:${r.color}">${r.title}</span>
            </div>
            <div class="edge-auto-desc">${r.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* 02 · 硬件铁三角 */
function renderHwTriangleNew() {
  const wrap = document.getElementById('hw-triangle-wrap');
  if (!wrap) return;
  const comps = D.hw_components;
  wrap.innerHTML = `
    <div class="hw-tri-layout">
      <div class="hw-tri-cards">
        ${comps.map((c, i) => `
          <div class="hw-tri-card" id="hw-card-${c.id}" onclick="showHwDetail('${c.id}')">
            <div class="hw-tri-icon">${c.icon}</div>
            <div class="hw-tri-name" style="color:${c.color}">${c.name}</div>
            <div class="hw-tri-full">${c.full}</div>
            <div class="hw-tri-metaphor">
              <span class="hw-metaphor-role">${c.metaphor}</span>
              <span class="hw-metaphor-sep">—</span>
              <span class="hw-metaphor-desc">${c.metaphor_desc}</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="hw-tri-detail" id="hw-tri-detail">
        <div class="hw-tri-placeholder">← 点击左侧组件查看详细解析</div>
      </div>
    </div>
  `;
}

function showHwDetail(id) {
  const c = D.hw_components.find(x => x.id === id);
  if (!c) return;
  document.querySelectorAll('.hw-tri-card').forEach(el => el.classList.remove('active'));
  document.getElementById('hw-card-' + id)?.classList.add('active');
  const panel = document.getElementById('hw-tri-detail');
  if (!panel) return;
  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <span style="font-size:24px">${c.icon}</span>
      <div>
        <div style="font-family:var(--serif);font-size:17px;font-weight:700;color:${c.color}">${c.name}</div>
        <div style="font-size:11px;color:var(--i3);font-family:var(--mono)">${c.en}</div>
      </div>
    </div>
    <div class="hw-detail-metaphor" style="border-left:3px solid ${c.color}">
      <strong>${c.metaphor}：</strong>${c.metaphor_desc}
    </div>
    <div class="hw-detail-desc">${c.desc}</div>
    <div class="hw-detail-specs">
      ${c.specs.map(s => `
        <div class="hw-spec-row">
          <span class="hw-spec-k">${s.k}</span>
          <span class="hw-spec-v">${s.v}</span>
        </div>
      `).join('')}
    </div>
    ${c.rivals ? `
    <div class="hw-rivals-section">
      <div class="hw-rivals-label">竞争格局</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
        ${c.rivals.map(r => `
          <div class="hw-rival-card" style="--rc:${r.color}">
            <div class="hw-rival-hd">
              <span class="hw-rival-icon">${r.icon}</span>
              <span class="hw-rival-name">${r.name}</span>
              <span class="hw-rival-role">${r.role}</span>
            </div>
            <div class="hw-rival-products">${r.products}</div>
            <div class="hw-rival-verdict" style="margin-top:8px;">→ ${r.verdict}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  `;
}

/* 02 · 大模型格局 */
function renderModelLandscape() {
  const wrap = document.getElementById('model-landscape-wrap');
  if (!wrap) return;
  const { insight, camps, challenges } = D.model_landscape;
  wrap.innerHTML = `
    <div class="ml-insight">${insight}</div>
    <div class="ml-camps">
      ${camps.map(camp => `
        <div class="ml-camp" style="--cc:${camp.color}">
          <div class="ml-camp-hd">
            <span class="ml-camp-name" style="color:${camp.color}">${camp.name}</span>
            <span class="ml-camp-tagline">${camp.tagline}</span>
          </div>
          <div class="ml-players">
            ${camp.players.map(p => `
              <div class="ml-player">
                <div class="ml-player-hd">
                  <span class="ml-player-name">${p.name}</span>
                  <span class="ml-player-models">${p.models}</span>
                </div>
                <div class="ml-player-edge">✓ ${p.edge}</div>
                <div class="ml-player-risk">⚠ ${p.risk}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    <div class="ml-challenges-hd">行业共同挑战</div>
    <div class="ml-challenges">
      ${challenges.map(c => `
        <div class="ml-challenge" style="border-top:3px solid ${c.color}">
          <div class="ml-ch-icon">${c.icon}</div>
          <div class="ml-ch-title" style="color:${c.color}">${c.title}</div>
          <div class="ml-ch-desc">${c.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/* 03 · 应用与场景 */
function renderAppLandscape() {
  const wrap = document.getElementById('app-landscape-wrap');
  if (!wrap) return;
  const { insight, tracks } = D.app_landscape;
  wrap.innerHTML = `
    <div class="al-insight">${insight}</div>
    <div class="al-tracks">
      ${tracks.map(t => `
        <div class="al-track" style="--tc:${t.color}">
          <div class="al-track-hd">
            <span class="al-track-icon">${t.icon}</span>
            <span class="al-track-name" style="color:${t.color}">${t.name}</span>
          </div>
          <div class="al-leaders-row">
            <div class="al-leaders-col">
              <div class="al-leaders-label">🌐 全球</div>
              <div class="al-leaders-list">${t.leaders_global.join('　·　')}</div>
            </div>
            <div class="al-leaders-col">
              <div class="al-leaders-label">🇨🇳 国内</div>
              <div class="al-leaders-list">${t.leaders_cn.join('　·　')}</div>
            </div>
          </div>
          <div class="al-dynamics">${t.dynamics}</div>
          <div class="al-challenge">⚡ ${t.challenge}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/* 04c · 帕累托前沿 & 模型蒸馏 */
function renderParetoNew() {
  const wrap = document.getElementById('pareto-new-wrap');
  if (!wrap) return;
  const { distillation, models, frontier, platform_colors, insight, pareto_intro, distill_intro } = D.pareto_new;

  wrap.innerHTML = `
    <div class="pareto-insight">${insight}</div>

    <div class="pi-section">
      <div class="pi-analogy">${pareto_intro.analogy}</div>
      <div class="pi-states">
        ${pareto_intro.states.map(s => `
          <div class="pi-state" style="border-left:3px solid ${s.color}">
            <span class="pi-state-icon">${s.icon}</span>
            <span class="pi-state-label" style="color:${s.color}">${s.label}</span>
            <span class="pi-state-desc">${s.desc}</span>
          </div>
        `).join('')}
      </div>
      <div class="pi-scope">
        ${pareto_intro.scope.map(s => `
          <div class="pi-scope-item">
            <span class="pi-scope-icon">${s.icon}</span>
            <span class="pi-scope-label">${s.label}</span>
            <span class="pi-scope-desc">${s.desc}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="di-section">
      <div class="di-label">模型蒸馏：AI 的「浓缩提炼」</div>
      <div class="di-analogy">${distill_intro.analogy}</div>
      <div class="distill-pipeline" id="distill-pipeline"></div>
      <div class="di-conclusion">💡 ${distill_intro.conclusion}</div>
    </div>

    <div class="pareto-chart-area">
      <div class="pareto-chart-note">精度 vs 推理延迟散点图 · 帕累托前沿</div>
      <div id="pareto-new-svg"></div>
    </div>
  `;

  /* 蒸馏流水线 */
  const pipe = document.getElementById('distill-pipeline');
  pipe.innerHTML = distillation.map((s, i) => `
    <div class="distill-step">
      <div class="distill-icon">${s.icon}</div>
      <div class="distill-label" style="color:${s.color}">${s.label}</div>
      <div class="distill-size">${s.size}</div>
      <div class="distill-desc">${s.desc}</div>
    </div>
    ${i < distillation.length - 1 ? '<div class="distill-arrow">→</div>' : ''}
  `).join('');

  /* 帕累托散点 D3 */
  const svgWrap = document.getElementById('pareto-new-svg');
  if (!svgWrap) return;
  const W = Math.max(svgWrap.clientWidth || 860, 680), H = 320;
  const PAD = { top: 24, right: 150, bottom: 48, left: 56 };
  const CW = W - PAD.left - PAD.right, CH = H - PAD.top - PAD.bottom;

  const xExt = [0, 100], yExt = [40, 96];
  const xS = v => PAD.left + ((v - xExt[0]) / (xExt[1] - xExt[0])) * CW;
  const yS = v => PAD.top  + CH - ((v - yExt[0]) / (yExt[1] - yExt[0])) * CH;

  const svg = d3.select(svgWrap).append('svg').attr('width', W).attr('height', H);

  /* grid */
  [50,60,70,80,90].forEach(v => {
    svg.append('line').attr('x1', PAD.left).attr('x2', W - PAD.right)
      .attr('y1', yS(v)).attr('y2', yS(v))
      .attr('stroke','var(--ru)').attr('stroke-width', 0.8);
    svg.append('text').attr('x', PAD.left - 6).attr('y', yS(v) + 4)
      .attr('text-anchor','end').attr('font-size', 10).attr('fill','var(--i3)')
      .attr('font-family','var(--mono)').text(v + '%');
  });
  [10,20,40,60,80].forEach(v => {
    svg.append('line').attr('x1', xS(v)).attr('x2', xS(v))
      .attr('y1', PAD.top).attr('y2', H - PAD.bottom)
      .attr('stroke','var(--ru)').attr('stroke-width', 0.5).attr('stroke-dasharray','3,3');
    svg.append('text').attr('x', xS(v)).attr('y', H - PAD.bottom + 16)
      .attr('text-anchor','middle').attr('font-size', 10).attr('fill','var(--i3)')
      .attr('font-family','var(--mono)').text(v + 'ms');
  });

  /* axis labels */
  svg.append('text').attr('x', PAD.left + CW / 2).attr('y', H - 6)
    .attr('text-anchor','middle').attr('font-size', 11).attr('fill','var(--i3)').text('推理延迟（ms/token）→ 越小越好');
  svg.append('text').attr('x', 12).attr('y', H / 2)
    .attr('transform', `rotate(-90,12,${H/2})`).attr('text-anchor','middle')
    .attr('font-size', 11).attr('fill','var(--i3)').text('综合精度（%）↑ 越高越好');

  /* pareto frontier line */
  const sortedF = [...frontier].sort((a,b) => a.latency - b.latency);
  const lineGen = d3.line().x(d => xS(d.latency)).y(d => yS(d.score)).curve(d3.curveStepAfter);
  svg.append('path').datum(sortedF).attr('d', lineGen)
    .attr('fill','none').attr('stroke','var(--acc)').attr('stroke-width', 1.5)
    .attr('stroke-dasharray','5,3').attr('opacity', 0.6);

  /* ideal zone */
  svg.append('rect')
    .attr('x', PAD.left).attr('y', PAD.top)
    .attr('width', xS(30) - PAD.left).attr('height', yS(65) - PAD.top)
    .attr('fill','rgba(224,61,30,.04)').attr('stroke','rgba(224,61,30,.15)')
    .attr('stroke-dasharray','3,3');
  svg.append('text').attr('x', PAD.left + 6).attr('y', PAD.top + 14)
    .attr('font-size', 9).attr('fill','var(--acc)').attr('font-family','var(--mono)').text('端侧最优区间');

  /* points */
  models.forEach(m => {
    const cx = xS(m.latency), cy = yS(m.score);
    svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', m.platform === '理想车载' ? 8 : 6)
      .attr('fill', m.color).attr('opacity', 0.85).attr('stroke','#fff').attr('stroke-width', 1.2)
      .on('mouseover', e => ttShow(`<strong>${m.name}</strong><br>精度 ${m.score}% · 延迟 ${m.latency}ms<br><span style="color:${m.color}">${m.platform}</span>`, e))
      .on('mouseleave', ttHide);
    if (m.platform === '理想车载' || m.latency < 15) {
      svg.append('text').attr('x', cx + 10).attr('y', cy + 4)
        .attr('font-size', 9).attr('fill', m.color).attr('font-family','var(--mono)').text(m.name);
    }
  });

  /* legend */
  const platforms = Object.entries(platform_colors);
  platforms.forEach(([p, col], i) => {
    const lx = W - PAD.right + 12, ly = PAD.top + 20 + i * 20;
    svg.append('circle').attr('cx', lx + 5).attr('cy', ly).attr('r', 5).attr('fill', col);
    svg.append('text').attr('x', lx + 14).attr('y', ly + 4)
      .attr('font-size', 10).attr('fill','var(--i2)').text(p);
  });
}

/* 04 · 供应链权力转移 */
function renderSupplyShift() {
  const wrap = document.getElementById('supply-shift-wrap');
  if (!wrap) return;
  const { phases, players } = D.supply_shift;

  wrap.innerHTML = `
    <div class="supply-phases">
      ${phases.map((p, i) => `
        <div class="supply-phase">
          <div class="supply-phase-hd" style="border-left:4px solid ${p.color}">
            <div class="supply-phase-tag">${p.phase}</div>
            <div class="supply-phase-era">${p.era}</div>
            <div class="supply-phase-title" style="color:${p.color}">${p.icon} ${p.title}</div>
          </div>
          <div class="supply-phase-desc">${p.desc}</div>
          <div class="supply-power-row">
            <span class="supply-power-label">价值捕获方：</span>
            <span class="supply-power-val">${p.power}</span>
            <div class="supply-power-bar">
              <div class="supply-power-fill" style="width:${p.bar}%;background:${p.color}"></div>
            </div>
            <span class="supply-power-pct">${p.bar}%</span>
          </div>
        </div>
        ${i < phases.length - 1 ? '<div class="supply-phase-arrow">↓</div>' : ''}
      `).join('')}
    </div>
    <div class="supply-players">
      <div class="supply-players-title">垂直整合代表玩家</div>
      <table class="supply-player-table">
        <thead><tr><th>公司</th><th>自研芯片</th><th>核心策略</th></tr></thead>
        <tbody>
          ${players.map(p => `
            <tr class="${p.highlight ? 'player-highlight' : ''}">
              <td><strong>${p.name}</strong></td>
              <td style="font-family:var(--mono);font-size:11px">${p.chip}</td>
              <td>${p.strategy}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}


/* ════════════════════════════════════════
   SECTION 03 · 行业未来
════════════════════════════════════════ */
function renderS3() {
  renderHwTiers();
  renderFailureLessons();
  renderPhysicalAI();
  renderRobotField();
}

/* 01 · 硬件三梯队 */
function renderHwTiers() {
  const el = document.getElementById('hw-tiers-wrap');
  if (!el) return;
  const D = window.AI_DATA;
  el.innerHTML = `<div class="hw-tiers-grid">${
    D.hw_tiers.map(t => `
      <div class="hw-tier-card" style="border-color:${t.color}30">
        <div class="hw-tier-top">
          <div class="hw-tier-badge" style="background:${t.color}">${t.badge}</div>
          <div>
            <div class="hw-tier-label" style="color:${t.color}">${t.tier}</div>
          </div>
        </div>
        <div class="hw-tier-icon">${t.icon}</div>
        <div class="hw-tier-title">${t.title}</div>
        <div class="hw-tier-subtitle">${t.subtitle}</div>
        <div class="hw-tier-thesis">${t.thesis}</div>
        <div class="hw-tier-examples">
          <div class="hw-tier-examples-hd">代表产品</div>
          ${t.examples.map(e => `
            <div class="hw-example-row">
              <span class="hw-example-name">· ${e.name}</span>
              <span class="hw-example-detail">${e.detail}</span>
            </div>
          `).join('')}
        </div>
        <div class="hw-tier-why">
          <div class="hw-tier-why-hd">为什么是这条路</div>
          ${t.why.map(w => `<div class="hw-why-item">${w}</div>`).join('')}
        </div>
      </div>
    `).join('')
  }</div>`;
}

/* 02 · 失败教训 */
function renderFailureLessons() {
  const el = document.getElementById('failure-wrap');
  if (!el) return;
  const fl = window.AI_DATA.failure_lessons;
  el.innerHTML = `
    <div class="failure-headline">${fl.headline}</div>
    <div class="failure-cases">
      ${fl.cases.map(c => `
        <div class="failure-card">
          <div class="failure-card-hd">
            <div class="failure-card-icon">${c.icon}</div>
            <div>
              <div class="failure-product-name">${c.product}</div>
              <div class="failure-meta">
                <span>${c.year}</span>
                <span>${c.price}</span>
                <span>${c.sold}</span>
              </div>
            </div>
          </div>
          <div class="failure-card-body">
            <div class="failure-pitch">「${c.pitch}」</div>
            <ul class="failure-list">
              ${c.failures.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <div class="failure-lesson">💡 ${c.lesson}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div style="font-size:12px;font-family:var(--mono);color:var(--i3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px">从失败中提炼的产品原则</div>
    <div class="failure-principles">
      ${fl.principles.map(p => `
        <div class="principle-row">
          <div class="principle-icon">${p.icon}</div>
          <div>
            <div class="principle-bad">${p.bad}</div>
            <div class="principle-good">✓ ${p.good}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* 03 · 具身智能·物理常识 */
function renderPhysicalAI() {
  const el = document.getElementById('physical-ai-wrap');
  if (!el) return;
  const pa = window.AI_DATA.physical_ai;
  el.innerHTML = `
    <div class="physical-ai-headline">${pa.headline}</div>
    <div class="physical-ai-tagline">${pa.tagline}</div>
    <div class="physical-concepts">
      ${pa.concepts.map(c => `
        <div class="concept-card">
          <div class="concept-icon">${c.icon}</div>
          <div class="concept-title">${c.title}</div>
          <div class="concept-example">${c.example}</div>
          <div class="concept-challenge">⚠ ${c.challenge}</div>
          <div class="concept-solution">✓ ${c.solution}</div>
        </div>
      `).join('')}
    </div>
    <div class="physical-progress">
      <div class="progress-hd">AI 物理常识进化路线图</div>
      <div class="progress-track">
        ${pa.progress.map(s => `
          <div class="progress-step">
            <div class="progress-dot ${s.done ? 'done' : 'todo'}">${s.done ? '✓' : '…'}</div>
            <div class="progress-stage">${s.stage}</div>
            <div class="progress-desc">${s.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* 04 · 工业现场 */
function renderRobotField() {
  const el = document.getElementById('robot-field-wrap');
  if (!el) return;
  const rf = window.AI_DATA.robot_field;
  el.innerHTML = `
    <div class="robot-field-headline">${rf.headline}</div>
    <div class="robot-field-tagline">${rf.tagline}</div>
    <div class="robot-players">
      ${rf.players.map(p => `
        <div class="robot-card" style="border-color:${p.color}40">
          <div class="robot-card-hd" style="border-bottom-color:${p.color}20;background:${p.color}08">
            <div class="robot-name">${p.name}</div>
            <div class="robot-meta-row">
              <span class="robot-country">${p.country}</span>
              <span class="robot-gen">${p.gen}</span>
              <span class="robot-status-badge" style="background:${p.color}">${p.status}</span>
            </div>
          </div>
          <div class="robot-card-body">
            <div class="robot-stat-row"><span class="robot-stat-k">部署工厂</span><span class="robot-stat-v">${p.factory}</span></div>
            <div class="robot-stat-row"><span class="robot-stat-k">主要任务</span><span class="robot-stat-v">${p.task}</span></div>
            <div class="robot-stat-row"><span class="robot-stat-k">日工作时长</span><span class="robot-stat-v">${p.daily_hours}</span></div>
            <div class="robot-stat-row" style="border-bottom:none"><span class="robot-stat-k">在线规模</span><span class="robot-stat-v">${p.fleet}</span></div>
            <div class="robot-highlight">${p.highlight}</div>
            <div class="robot-weakness">${p.weakness}</div>
            <div class="robot-quote">${p.quote}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ════════════════════════════════════════
   SECTION 04 · 理想汽车：具身智能先行者
════════════════════════════════════════ */
function renderS4() {
  renderLxMilestones();
  renderLxSecondCurve();
  renderLxStrategy();
  renderLxRiskMatrix();  /* 04 · 战略风险和挑战 */
  renderLxAdLevel();     /* 05a · 自动驾驶分级 */
  renderLxRoadmap();     /* 05b · 产品路线图 */
}

/* 03 · 战略落地路径 */
function renderLxStrategy() {
  const el = document.getElementById('lx-strategy-wrap');
  if (!el) return;

  /* ── donut helper ── */
  const DR = 62, DCX = 100, DCY = 100, DSW = 22;
  const DC = +(2 * Math.PI * DR).toFixed(2);

  function makeDonut(segs, centerBig, centerSm) {
    let off = 0;
    const arcs = segs.map(s => {
      const len = +((s.pct / 100) * DC).toFixed(2);
      const el = `<circle cx="${DCX}" cy="${DCY}" r="${DR}" fill="none"
        stroke="${s.color}" stroke-width="${DSW}"
        stroke-dasharray="${len} ${DC}"
        stroke-dashoffset="${(-off).toFixed(2)}"
        transform="rotate(-90 ${DCX} ${DCY})"/>`;
      off += len;
      return el;
    }).join('');
    return `<svg viewBox="0 0 200 200" width="150" height="150">
      <circle cx="${DCX}" cy="${DCY}" r="${DR}" fill="none" stroke="var(--bdr)" stroke-width="${DSW}"/>
      ${arcs}
      <text x="${DCX}" y="${DCY - 5}" text-anchor="middle" font-size="18" font-weight="800"
        fill="var(--fg)" font-family="var(--mono)">${centerBig}</text>
      <text x="${DCX}" y="${DCY + 14}" text-anchor="middle" font-size="10"
        fill="var(--i2)">${centerSm}</text>
    </svg>`;
  }

  function makeLegend(items) {
    return items.map(i => `
      <div class="sa-dleg-row">
        <span class="sa-dleg-dot" style="background:${i.color}"></span>
        <div>
          <div class="sa-dleg-label">${i.label}</div>
          <div class="sa-dleg-val">${i.pct} &nbsp;·&nbsp; ${i.val}</div>
        </div>
      </div>`).join('');
  }

  /* ── A 研发投入 ── */
  const rdContent = `<div class="sa-rd-story">

    <!-- 2025: 两列并排 -->
    <div class="sa-y25-grid">

      <!-- 总营收 -->
      <div class="sa-story-step">
        <div class="sa-step-title">2025 总营收 · 1,123亿</div>
        <div class="sa-donut-block">
          ${makeDonut([
            { pct: 95.01, color: '#5B8DD9' },
            { pct:  4.99, color: '#C8BEAE' },
          ], '1,123亿', '总营收')}
          <div class="sa-dleg">
            ${makeLegend([
              { color: '#5B8DD9', label: '车辆销售（L系列 + i8）', pct: '95.01%', val: '1,067亿' },
              { color: '#C8BEAE', label: '零部件 · 充电 · 维保', pct: '4.99%', val: '56亿' },
            ])}
          </div>
        </div>
        <div class="sa-note-below">
          车辆销售贡献 95% 总营收，L6 放量与 i8 交付稳固基本盘，主业现金流为云端算力与自研芯片投入提供了资金支撑。
        </div>
      </div>

      <!-- 总运营费用 -->
      <div class="sa-story-step">
        <div class="sa-step-title">2025 总运营费用 · 215亿</div>
        <div class="sa-donut-block">
          ${makeDonut([
            { pct: 52.56, color: 'var(--accent)' },
            { pct: 47.44, color: '#C8BEAE' },
          ], '215亿', '总费用')}
          <div class="sa-dleg">
            ${makeLegend([
              { color: 'var(--accent)', label: 'R&D 研发费用（历史新高）', pct: '52.56%', val: '113亿 ↑' },
              { color: '#C8BEAE',       label: 'SG&A 销售 & 管理费用',    pct: '47.44%', val: '107亿 ↓12.8%' },
            ])}
          </div>
        </div>
        <div class="sa-note-below">
          销售管理费用同比下降 12.8%，节约资金被刚性调配至研发序列，实现了运营费用向核心技术资产的战略腾挪。
        </div>
      </div>
    </div>

    <!-- 2026: 突出卡片 -->
    <div class="sa-y26-card">
      <div class="sa-y26-hd">
        <div>
          <div class="sa-y26-label">2026 研发计划</div>
          <div class="sa-y26-sub">AI 专项强制占比 50%，总预算 120亿</div>
        </div>
        <div class="sa-y26-total">120<span class="sa-y26-unit">亿</span></div>
      </div>
      <div class="sa-y26-halves">
        <div class="sa-y26-half ai">
          <div class="sa-y26-lock-badge">🔒 强制锁定</div>
          <div class="sa-y26-pct">50%</div>
          <div class="sa-y26-name">AI 专项</div>
          <div class="sa-y26-val">60亿</div>
          <div class="sa-y26-desc">不可被其他项目挪用</div>
        </div>
        <div class="sa-y26-half ot">
          <div class="sa-y26-pct">50%</div>
          <div class="sa-y26-name">其他研发</div>
          <div class="sa-y26-val">60亿</div>
          <div class="sa-y26-desc">常规研发支出</div>
        </div>
      </div>
    </div>

    <!-- cash note -->
    <div class="sa-cash-strip">
      <span class="sa-cash-icon">💰</span>
      <span>现金储备 <b>1,012 亿元</b> — 全行业最充足弹药库，持续高强度研发投入的底气</span>
    </div>

  </div>`;

  /* ── B 组织调整（研发体系升级 + 协同与决策保障）── */
  const orgContent = `
    <div class="sa-sub-section">
      <div class="sa-sub-label">研发体系升级</div>
      <div class="sa-team-rows">
        ${[
          { icon:'❤️', name:'Infra 团队',   tag:'心脏', desc:'算力基础设施 · 训练平台 · MindSim 仿真环境' },
          { icon:'🧠', name:'基座模型团队', tag:'大脑', desc:'通用大模型底座 · 世界模型 · MindVLA 预训练' },
          { icon:'🦾', name:'软件本体团队', tag:'手脚', desc:'LiOS 操作系统 · 端云协同框架 · 统一 OS' },
          { icon:'⚙️', name:'硬件本体团队', tag:'身体', desc:'马赫芯片 · 线控底盘 · 主动悬架 · 机器人' },
          { icon:'🔬', name:'评估团队',     tag:'标准', desc:'模型评测体系 · 安全红线 · 端到端基准验证' },
        ].map(t => `
          <div class="sa-team-row">
            <span class="sa-team-icon">${t.icon}</span>
            <div class="sa-team-left">
              <span class="sa-team-name">${t.name}</span>
              <span class="sa-tag">${t.tag}</span>
            </div>
            <div class="sa-team-desc">${t.desc}</div>
          </div>`).join('')}
      </div>
    </div>
    <div class="sa-sub-section">
      <div class="sa-sub-label">协同与决策保障</div>
      <div class="sa-cards sa-cards-3">
        ${[
          { icon:'🏛️', name:'AI 技术委员会', tag:'决策', desc:'负责 AI 战略方向制定与关键技术路线审批，确保研发资源向核心目标聚焦' },
          { icon:'⚡', name:'算力工作组',     tag:'资源', desc:'统筹调配训练与推理算力资源，保障各团队研发需求的高效响应' },
          { icon:'🔬', name:'自然科学基金',   tag:'前瞻', desc:'资助前沿科学研究与外部合作，为长周期技术方向提前布局' },
        ].map(t => `
          <div class="sa-card">
            <div class="sa-card-hd">
              <span class="sa-card-icon">${t.icon}</span>
              <div><span class="sa-card-name">${t.name}</span>
                <span class="sa-tag">${t.tag}</span></div>
            </div>
            <div class="sa-card-desc">${t.desc}</div>
          </div>`).join('')}
      </div>
    </div>`;

  /* ── D 护城河搭建（tab switcher）── */
  const moatLayers = [
    { key:'brain',       color:'#5B8DD9', icon:'🧠', layer:'大脑', sub:'算法进化', items:[
      { name:'End-to-End 端到端',      tag:'底层管道',   desc:'取消感知→规划→控制硬编码规则，让传感器数据直接转化为驾驶动作，是智能跃迁基石。' },
      { name:'MindVLA-o1',             tag:'物理智能体', desc:'类 o1 慢思考 + 长程推理，赋予汽车"物理常识"。EFLOPS 超算支撑，迭代从两周压缩至一天。' },
      { name:'世界模型（World Model）', tag:'虚拟沙盘',   desc:'学习海量视频获得"物理直觉"——预判皮球后面跟着小孩，让 AI 行动前先在脑中演练。' },
      { name:'MindSim',                tag:'超级模拟器', desc:'生成式 AI 高保真重建事故场景，生产高价值长尾数据（Data Engine），安全边界无限拓宽。' },
    ]},
    { key:'cerebellum',  color:'#C0604A', icon:'⚡', layer:'小脑', sub:'自研芯片 & 软件', items:[
      { name:'马赫 100（Mach 100）',    tag:'5nm 自研',  desc:'双芯 2560 TOPS（行业 3×）。通用 AI 芯片，智驾与机器人推理算法无缝复用。' },
      { name:'DSA 数据流架构',          tag:'近计算',    desc:'数据在芯片内"流动即计算"，用更低功耗实现超高 VLA 推理效率，解决 GPU 内存墙问题。' },
      { name:'端云协同 System 1+2',     tag:'双层决策',  desc:'<b>System 1（端侧）</b>&lt;20ms 身体反射；<b>System 2（云端）</b>1T+ 参数长程规划。' },
      { name:'统一操作系统（LiOS）',    tag:'神经总线',  desc:'高实时性底层 OS，把 MindVLA-o1 决策无死锁传递给线控底盘，连接大脑与四肢。' },
    ]},
    { key:'body',        color:'#4A9D6F', icon:'🦾', layer:'本体', sub:'执行器进化', items:[
      { name:'全线控底盘',    tag:'毫秒响应',  desc:'纯电信号控制转向/制动，多重冗余设计，构成"零事故可靠"的物理安全兜底。' },
      { name:'800V 主动悬架', tag:'高压平台',  desc:'更快液压响应，精细控制车身姿态，为 AI 提供更稳定"执行环境"，降低物理不确定性。' },
      { name:'双轮机器人',    tag:'量产卡位', desc:'车规级线控 + 800V 高压方案迁移至双轮平衡机器人，优先切入工业/物流场景，率先实现商业闭环。' },
      { name:'双足人形机器人', tag:'下半场入场', desc:'VLA 决策 × 汽车级冗余执行器，从四肢力控到步态规划全栈复用，布局 2027+ 具身智能长赛道。' },
    ]},
  ];

  window._saLayers = moatLayers;

  window.switchSaTab = function(key) {
    document.querySelectorAll('.sa-moat-tab').forEach(b =>
      b.classList.toggle('active', b.dataset.key === key));
    const layer = window._saLayers.find(l => l.key === key);
    document.getElementById('sa-moat-panel').innerHTML = `
      <div class="sa-cards sa-cards-2">
        ${layer.items.map(item => `
          <div class="sa-card" style="border-left:3px solid ${layer.color}">
            <div class="sa-card-hd">
              <span class="sa-card-name">${item.name}</span>
              <span class="sa-tag" style="background:${layer.color}18;color:${layer.color}">${item.tag}</span>
            </div>
            <div class="sa-card-desc">${item.desc}</div>
          </div>`).join('')}
      </div>`;
  };

  const initLayer = moatLayers[0];
  const moatContent = `
    <div class="sa-moat-tabs">
      ${moatLayers.map((l, i) => `
        <button class="sa-moat-tab ${i===0?'active':''}" data-key="${l.key}"
                style="--mc:${l.color}" onclick="switchSaTab('${l.key}')">
          <span>${l.icon} ${l.layer}</span>
          <span class="sa-moat-tab-sub">${l.sub}</span>
        </button>`).join('')}
    </div>
    <div id="sa-moat-panel">
      <div class="sa-cards sa-cards-2">
        ${initLayer.items.map(item => `
          <div class="sa-card" style="border-left:3px solid ${initLayer.color}">
            <div class="sa-card-hd">
              <span class="sa-card-name">${item.name}</span>
              <span class="sa-tag" style="background:${initLayer.color}18;color:${initLayer.color}">${item.tag}</span>
            </div>
            <div class="sa-card-desc">${item.desc}</div>
          </div>`).join('')}
      </div>
    </div>`;

  /* ── Left-nav + right-panel (mirrors 核心技术词典) ── */
  const items = [
    { key:'rd',   label:'A', color:'#5B8DD9', title:'研发投入',   sub:'总预算 120亿 · AI 专项强制占比 50%',     content: rdContent   },
    { key:'org',  label:'B', color:'#C0604A', title:'组织调整',   sub:'研发体系升级 · 协同与决策保障',           content: orgContent  },
    { key:'moat', label:'C', color:'#4A9D6F', title:'护城河搭建', sub:'大脑 · 小脑 · 本体',                    content: moatContent },
  ];

  window._saItems = items;

  window.selectSaItem = function(key) {
    document.querySelectorAll('.sa-lnav-item').forEach(el =>
      el.classList.toggle('active', el.dataset.key === key));
    const item = window._saItems.find(i => i.key === key);
    const panel = document.getElementById('sa-rpanel');
    panel.innerHTML = `
      <div class="sa-panel-hd" style="border-left:4px solid ${item.color}">
        <span class="sa-panel-pill" style="background:${item.color}">${item.label}</span>
        <span class="sa-panel-title">${item.title}</span>
      </div>
      <div class="sa-panel-body">${item.content}</div>`;
  };

  el.innerHTML = `
    <div class="sa-layout">
      <div class="sa-lnav">
        <div class="sa-lnav-axis-wrap">
          <div class="sa-lnav-axis-line"></div>
          ${items.map((item, i) => `
            <div class="sa-lnav-item ${i === 0 ? 'active' : ''}" data-key="${item.key}"
                 style="--sc:${item.color}"
                 onclick="selectSaItem('${item.key}')">
              <div class="sa-lnav-dot"></div>
              <div class="sa-lnav-body">
                <div class="sa-lnav-pill">${item.label}</div>
                <div class="sa-lnav-label">${item.title}</div>
                <div class="sa-lnav-sub">${item.sub}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>
      <div class="sa-rpanel" id="sa-rpanel"></div>
    </div>`;

  /* init first item */
  selectSaItem('rd');
}

/* 02 · 第二成长曲线 */
function renderLxSecondCurve() {
  const el = document.getElementById('lx-second-curve-wrap');
  if (!el) return;

  function makeFlow(steps, color) {
    return steps.map((s, i) => `
      <div class="sc2-step ${s.done ? 'done' : 'future'}" style="--fc:${color}">
        <div class="sc2-step-inner">
          <div class="sc2-step-dot">${s.done ? '✓' : ''}</div>
          <div class="sc2-step-name">${s.label}</div>
          <div class="sc2-step-desc">${s.desc}</div>
        </div>
        ${i < steps.length - 1 ? `<div class="sc2-arrow ${s.done ? 'done' : 'future'}">›</div>` : ''}
      </div>`).join('');
  }

  const trendPanels = [
    {
      color: '#4A9D6F',
      icon: '🚗',
      no: '01',
      title: '汽车行业趋势',
      sub: '从交通工具到机器人',
      thesis: '汽车正在从「代步工具」演变为「可移动的具身智能体」，软件与 AI 能力将成为核心竞争力。',
      steps: [
        { label: '交通工具', desc: '硬件为王', done: true },
        { label: '智能终端', desc: 'OTA 迭代', done: true },
        { label: '空间 Agent', desc: '情境感知', done: false },
        { label: '移动机器人', desc: '具身智能', done: false },
      ],
      insight: '特斯拉市值的逻辑已不是「卖车」，而是「卖算法」——理想必须在同一赛道找到答案。',
    },
    {
      color: '#5B8DD9',
      icon: '🤖',
      no: '02',
      title: 'AI 行业趋势',
      sub: 'AI 不只是工具，还可以成为劳动力替代',
      thesis: 'AI 正在越过「辅助工具」边界，开始替代脑力劳动——下一步是替代体力劳动。',
      steps: [
        { label: 'AI 工具', desc: '人操作 AI', done: true },
        { label: 'AI 助理', desc: 'AI 辅助人', done: true },
        { label: 'AI 员工', desc: '替代脑力', done: false },
        { label: 'AI 劳动力', desc: '替代体力', done: false },
      ],
      insight: '当 AI Agent 可完成完整工作流，企业人力成本模型将被重写——车企首当其冲，也最有机会。',
    },
  ];

  const twoColHtml = `
    <div class="sc2-grid">
      ${trendPanels.map(p => `
        <div class="sc2-panel" style="--sc2:${p.color}">
          <div class="sc2-panel-hd">
            <span class="sc2-panel-no" style="color:${p.color}">${p.no}</span>
            <span class="sc2-panel-icon">${p.icon}</span>
            <div>
              <div class="sc2-panel-title">${p.title}</div>
              <div class="sc2-panel-sub">${p.sub}</div>
            </div>
          </div>
          <div class="sc2-thesis">${p.thesis}</div>
          <div class="sc2-flow">${makeFlow(p.steps, p.color)}</div>
          <div class="sc2-flow-legend">
            <span class="sc2-legend-done">■ 已实现</span>
            <span class="sc2-legend-future">□ 前沿进行中</span>
          </div>
          <div class="sc2-insight" style="border-color:${p.color}40">
            <span class="sc2-insight-tag" style="color:${p.color}">洞察</span>${p.insight}
          </div>
        </div>`).join('')}
    </div>`;

  const conclusionHtml = `
    <div class="sc2-conclusion">
      <div class="sc2-conc-hd">
        <span class="sc2-conc-no" style="color:#C0604A">03</span>
        <span class="sc2-conc-icon">🔭</span>
        <div>
          <div class="sc2-conc-title">具身智能「下半场」</div>
          <div class="sc2-conc-sub">两条趋势交汇的战略终点</div>
        </div>
      </div>
      <div class="sc2-conc-quote">
        <span class="sc2-conc-qmark">"</span>
        <div class="sc2-conc-qtext">自动驾驶是具身智能的上半场，通用人形机器人是具身智能的下半场。</div>
      </div>
      <div class="sc2-conc-phases">
        <div class="sc2-conc-phase" style="--phc:#C0604A">
          <div class="sc2-conc-phase-tag" style="background:#C0604A18;color:#C0604A">上半场 · 自动驾驶</div>
          <div class="sc2-conc-phase-body">
            <div class="sc2-conc-phase-kv"><span class="sc2-conc-kv-k">载体</span>乘用车（L 系列）</div>
            <div class="sc2-conc-phase-kv"><span class="sc2-conc-kv-k">场景</span>高速 & 城市道路结构化场景</div>
            <div class="sc2-conc-phase-kv"><span class="sc2-conc-kv-k">核心赌注</span>MindVLA-o1 + 马赫 100 芯片</div>
            <div class="sc2-conc-phase-kv"><span class="sc2-conc-kv-k">价值</span>完成具身智能第一次规模化验证，积累真实物理世界数据</div>
          </div>
        </div>
        <div class="sc2-conc-phase-arrow">→</div>
        <div class="sc2-conc-phase" style="--phc:#7B5EA7">
          <div class="sc2-conc-phase-tag" style="background:#7B5EA718;color:#7B5EA7">下半场 · 具身机器人</div>
          <div class="sc2-conc-phase-body">
            <div class="sc2-conc-phase-kv"><span class="sc2-conc-kv-k">产品</span>工业双轮机器人 · 通用双足机器人</div>
            <div class="sc2-conc-phase-kv"><span class="sc2-conc-kv-k">迁移资产</span>具身数据、感知模型、端到端架构</div>
            <div class="sc2-conc-phase-kv"><span class="sc2-conc-kv-k">目标</span>从「会开车」到「会干活」的通用具身智能</div>
            <div class="sc2-conc-phase-kv"><span class="sc2-conc-kv-k">护城河</span>上半场积累的数据闭环是机器人时代最稀缺的资产</div>
          </div>
        </div>
      </div>
    </div>`;

  const funnelHtml = `
    <div class="sc2-funnel" aria-hidden="true">
      <svg viewBox="0 0 600 52" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:52px;display:block;">
        <line x1="150" y1="2" x2="300" y2="44" stroke="var(--ru)" stroke-width="1.5"/>
        <line x1="450" y1="2" x2="300" y2="44" stroke="var(--ru)" stroke-width="1.5"/>
        <polygon points="292,43 308,43 300,52" fill="var(--ru)"/>
      </svg>
    </div>`;

  el.innerHTML = twoColHtml + funnelHtml + conclusionHtml;
}

/* 03 · 核心技术突破 */
function renderLxCoreTech() {
  const el = document.getElementById('lx-core-wrap');
  if (!el) return;
  const ct = window.AI_DATA.lx_core_tech;
  if (!ct) return;

  function buildCards(tab) {
    return tab.cards.map(card => `
      <div class="lxct-card" style="--tc:${tab.color}">
        <div class="lxct-card-hd">
          <span class="lxct-card-icon">${card.icon}</span>
          <div>
            <div class="lxct-card-title">${card.title}</div>
            <div class="lxct-card-sub">${card.subtitle}</div>
          </div>
        </div>
        <div class="lxct-card-def">${card.def}</div>
        <div class="lxct-points">
          ${card.points.map(p => `
            <div class="lxct-point">
              <div class="lxct-point-label">${p.label}</div>
              <div class="lxct-point-text">${p.text}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function buildTabs(activeId) {
    return ct.tabs.map(tab => `
      <button class="lxct-tab ${tab.id === activeId ? 'active' : ''}"
              style="--tc:${tab.color}"
              onclick="switchLxCoreTech('${tab.id}')">
        <span>${tab.icon}</span><span>${tab.label}</span>
      </button>
    `).join('');
  }

  function render(activeId) {
    const tab = ct.tabs.find(t => t.id === activeId);
    el.innerHTML = `
      <div class="lxct-tabs">${buildTabs(activeId)}</div>
      <div class="lxct-tagline" style="border-left-color:${tab.color}">${tab.subtitle}</div>
      <div class="lxct-cards">${buildCards(tab)}</div>
    `;
  }

  window.switchLxCoreTech = function(id) { render(id); };
  render('car');
}

/* 02 · 展望 2026 */
function renderLxOutlook() {
  const el = document.getElementById('lx-outlook-wrap');
  if (!el) return;
  const o = window.AI_DATA.lx_outlook_2026;
  if (!o) return;

  el.innerHTML = `
    <div class="lxo-tagline">${o.tagline}</div>
    <div class="lxo-pillars">
      ${o.pillars.map(p => `
        <div class="lxo-pillar" style="--pc:${p.color}">
          <div class="lxo-pillar-hd">
            <span class="lxo-pillar-icon">${p.icon}</span>
            <div>
              <div class="lxo-pillar-title">${p.title}</div>
              <div class="lxo-pillar-sub">${p.subtitle}</div>
            </div>
          </div>
          <div class="lxo-items">
            ${p.items.map(item => `
              <div class="lxo-item">
                <div class="lxo-item-top">
                  <span class="lxo-item-icon">${item.icon}</span>
                  <div class="lxo-item-name">
                    ${item.name}
                    ${item.en ? `<span class="lxo-item-en">${item.en}</span>` : ''}
                  </div>
                </div>
                <div class="lxo-stat">${item.stat}</div>
                <div class="lxo-desc">${item.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* 01 · 战略里程碑 */
/* 01 · 战略里程碑（横向构图） */
function renderLxMilestones() {
  const el = document.getElementById('lx-milestones-wrap');
  if (!el) return;
  const D = window.AI_DATA;
  const ms = D.lx_milestones;
  const tc = D.milestone_type_colors;
  const typeLabels = { founding:'创立', product:'产品', milestone:'里程碑', ai:'AI', chip:'芯片', future:'未来' };

  const items = ms.map(m => `
    <div class="milestone-h-item">
      <div class="mh-year" style="color:${m.color}">${m.year}</div>
      <div class="mh-dot-wrap" style="border-color:${m.color};background:${m.color}18">
        <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5" fill="${m.color}"/></svg>
      </div>
      <span class="mh-type-badge" style="background:${m.color}18;color:${m.color}">${typeLabels[m.type]||m.type}</span>
      <div class="mh-title">${m.title}</div>
      <div class="mh-desc">${m.desc}</div>
    </div>
  `).join('');

  const legendItems = [...new Map(Object.entries(tc)).entries()]
    .filter(([k]) => typeLabels[k])
    .map(([k, c]) => `
      <div class="mh-legend-item">
        <div class="mh-legend-dot" style="background:${c}"></div>
        <span>${typeLabels[k]}</span>
      </div>
    `).join('');

  el.innerHTML = `
    <div class="milestone-h-track">
      <div class="milestone-h-inner">${items}</div>
    </div>
    <div class="milestone-h-legend">${legendItems}</div>
  `;
}
function renderSpaceAgent() {
  const el = document.getElementById('space-agent-wrap');
  if (!el) return;
  const sa = window.AI_DATA.lx_space_agent;

  const evoCards = sa.evolution.map((e, i) => `
    <div class="evolution-card ${i===3?'active':''}" data-phase="${e.phase}">
      <div class="evo-icon">${e.icon}</div>
      <div class="evo-label">${e.label}</div>
      <div class="evo-desc">${e.desc}</div>
    </div>
  `).join('');

  const capCards = sa.capabilities.map(c => `
    <div class="cap-card">
      <div class="cap-icon">${c.icon}</div>
      <div>
        <div class="cap-title">${c.title}</div>
        <div class="cap-desc">${c.desc}</div>
      </div>
    </div>
  `).join('');

  /* ── ADAS tiers section ── */
  const at = sa.adas_tiers;
  const tierCols = at.tiers.map(t => `
    <div class="adas-tier-col" style="--tc:${t.color}">
      <div class="adas-tier-hd">
        <div class="adas-tier-level">${t.level}</div>
        <div class="adas-tier-icon">${t.icon}</div>
        <div class="adas-tier-name">${t.name}</div>
        <div class="adas-tier-full">${t.name_full}</div>
        <div class="adas-tier-en">${t.en}</div>
      </div>
      <div class="adas-tier-desc">${t.desc}</div>
      <div class="adas-tier-brands">
        ${t.brands.map(b => `
          <div class="adas-brand-row ${b.highlight ? 'highlight' : ''}">
            <div class="adas-brand-hd">
              <span class="adas-brand-name">${b.name}</span>
              <span class="adas-brand-system">${b.system}</span>
            </div>
            <div class="adas-brand-note">${b.note}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  el.innerHTML = `
    <div class="space-agent-wrap">

      <div class="adas-section">
        <div class="adas-section-label">当前行业智驾能力格局</div>
        <div class="adas-insight">${at.insight}</div>
        <div class="adas-tier-grid">${tierCols}</div>
      </div>

      <div class="adas-divider">
        <span class="adas-divider-txt">理想汽车的下一步演进 ↓</span>
      </div>

      <div class="space-agent-tagline">${sa.tagline}</div>
      <div>
        <div style="font-family:var(--serif);font-size:13px;font-weight:700;color:var(--i2);margin-bottom:12px;text-transform:uppercase;letter-spacing:.05em">能力演进路径</div>
        <div class="evolution-track">${evoCards}</div>
      </div>
      <div>
        <div style="font-family:var(--serif);font-size:13px;font-weight:700;color:var(--i2);margin-bottom:12px;text-transform:uppercase;letter-spacing:.05em">核心能力矩阵</div>
        <div class="capabilities-grid">${capCards}</div>
      </div>
    </div>
  `;
}

/* 03 · MindVLA */
function renderMindVLA() {
  const el = document.getElementById('mindvla-wrap');
  if (!el) return;
  const mv = window.AI_DATA.lx_mindvla;
  const vt = mv.vs_traditional;

  const vsRows = vt.old.map((o, i) => `
    <div class="vla-vs-row">
      <div class="vla-vs-old"><span class="vla-vs-x">✗</span> ${o}</div>
      <div class="vla-vs-new"><span class="vla-vs-check">✓</span> ${vt.new[i]}</div>
    </div>
  `).join('');

  const modCards = mv.modules.map(m => `
    <div class="vla-module-card" style="border-color:${m.color}30;">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${m.color};border-radius:12px 12px 0 0"></div>
      <div class="vla-mod-icon">${m.icon}</div>
      <div class="vla-mod-name" style="color:${m.color}">${m.name}</div>
      <div class="vla-mod-en">${m.en}</div>
      <div class="vla-mod-headline">${m.headline}</div>
      <div class="vla-mod-desc">${m.desc}</div>
    </div>
  `).join('');

  const benchCards = mv.benchmarks.map(b => `
    <div class="vla-bench-card">
      <div class="vla-bench-value">${b.value}</div>
      <div class="vla-bench-metric">${b.metric}</div>
      <div class="vla-bench-context">${b.context}</div>
    </div>
  `).join('');

  el.innerHTML = `
    <div class="mindvla-wrap">
      <div>
        <div class="mindvla-headline">${mv.headline}</div>
        <div class="mindvla-tagline" style="margin-top:10px">${mv.tagline}</div>
      </div>
      <div class="vla-vs-table">
        <div class="vla-vs-hd">
          <div class="vla-vs-col-label old">${vt.label_old}</div>
          <div class="vla-vs-col-label new">MindVLA</div>
        </div>
        ${vsRows}
      </div>
      <div>
        <div class="sec-label-sm">V · L · A 三层架构</div>
        <div class="vla-modules">${modCards}</div>
      </div>
      <div class="vla-insight-box">
        <span class="vla-insight-icon">💡</span>
        <span>${mv.core_insight}</span>
      </div>
      <div>
        <div class="sec-label-sm">量产实测基准</div>
        <div class="vla-benchmarks">${benchCards}</div>
      </div>
    </div>
  `;
}

/* 04 · 马赫 100 */
function renderMach100() {
  const el = document.getElementById('mach100-wrap');
  if (!el) return;
  const m1 = window.AI_DATA.lx_mach100;
  const ac = m1.arch_contrast;

  const dfCards = m1.dataflow_features.map(f => `
    <div class="rationale-card">
      <div class="rationale-icon">${f.icon}</div>
      <div class="rationale-title">${f.title}</div>
      <div class="rationale-desc">${f.desc}</div>
    </div>
  `).join('');

  const specRows = m1.specs.map(s => `
    <div class="spec-row">
      <span class="spec-key">${s.k}</span>
      <span class="spec-val">${s.v}</span>
    </div>
  `).join('');

  const livis = m1.livis;
  const livisHighlights = livis.highlights.map(h => `<li>${h}</li>`).join('');
  const sy = m1.synergy;

  el.innerHTML = `
    <div class="mach100-wrap">
      <div class="mach100-headline">${m1.headline}</div>
      <div class="arch-contrast-box">
        <div class="arch-contrast-hd">${ac.title}</div>
        <div class="arch-contrast-cols">
          <div class="arch-col old">
            <div class="arch-col-label">⚠ ${ac.old_name}</div>
            <div class="arch-col-desc">${ac.old_desc}</div>
          </div>
          <div class="arch-col-arrow">→</div>
          <div class="arch-col new">
            <div class="arch-col-label">✓ ${ac.new_name}</div>
            <div class="arch-col-desc">${ac.new_desc}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="sec-label-sm">编排式数据流三大特性</div>
        <div class="mach100-rationale">${dfCards}</div>
      </div>
      <div class="mach100-body">
        <div class="mach100-specs">
          <div class="mach100-specs-hd">M100 关键指标</div>
          ${specRows}
        </div>
        <div class="livis-card">
          <div class="livis-tag">量产方案 · L9 Livis</div>
          <div class="livis-name">${livis.name}</div>
          <div class="livis-config">${livis.config}</div>
          <div class="livis-tops">${livis.total_tops}</div>
          <div class="livis-tops-label">${livis.tops_label}</div>
          <ul class="livis-highlights">${livisHighlights}</ul>
        </div>
      </div>
      <div class="synergy-box">
        <div class="synergy-title">${sy.title}</div>
        <div class="synergy-roles">
          <div class="synergy-role mindvla">
            <span class="synergy-chip">MindVLA</span>
            <span>${sy.mindvla_role}</span>
          </div>
          <div class="synergy-role m100">
            <span class="synergy-chip m100">M100</span>
            <span>${sy.m100_role}</span>
          </div>
        </div>
        <div class="synergy-conclusion">${sy.conclusion}</div>
      </div>
    </div>
  `;
}

/* 05 · MindSim */
function renderMindSim() {
  const el = document.getElementById('mindsim-wrap');
  if (!el) return;
  const ms = window.AI_DATA.lx_mindsim;

  const stepItems = ms.steps.map(s => `
    <div class="sim-step">
      <div class="sim-step-no"><span class="sim-step-icon">${s.icon}</span></div>
      <div class="sim-step-content">
        <div class="sim-step-title">${s.step} · ${s.title}</div>
        <div class="sim-step-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');

  const statCards = ms.stats.map(s => `
    <div class="sim-stat-card">
      <div class="sim-stat-value">${s.value}</div>
      <div class="sim-stat-label">${s.label}</div>
    </div>
  `).join('');

  el.innerHTML = `
    <div class="mindsim-wrap">
      <div>
        <div class="mindsim-headline">${ms.headline}</div>
        <div class="mindsim-tagline" style="margin-top:10px">${ms.tagline}</div>
      </div>
      <div>
        <div style="font-family:var(--serif);font-size:13px;font-weight:700;color:var(--i2);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">五步进化闭环</div>
        <div class="mindsim-steps">${stepItems}</div>
      </div>
      <div>
        <div style="font-family:var(--serif);font-size:13px;font-weight:700;color:var(--i2);margin-bottom:14px;text-transform:uppercase;letter-spacing:.05em">规模效应数据</div>
        <div class="mindsim-stats">${statCards}</div>
      </div>
    </div>
  `;
}


/* ════════════════════════════════════════
   SECTION 05 · 试乘体验反馈
════════════════════════════════════════ */
function renderS5() {
  renderReviewerProfile();
  renderTrialHighlights();
  renderComparisonTable();
}

/* 01 · 用户画像 */
function renderReviewerProfile() {
  const wrap = document.getElementById('reviewer-profile-wrap');
  if (!wrap) return;
  const { tags, conclusion, conclusion_desc, pain_points } = D.reviewer_profile;
  wrap.innerHTML = `
    <div class="reviewer-layout">
      <div class="reviewer-tags-card">
        <div class="reviewer-tags-title">👤 体验者标签</div>
        <div class="reviewer-tags">
          ${tags.map(t => `
            <div class="reviewer-tag">
              <span class="reviewer-tag-k">${t.label}</span>
              <span class="reviewer-tag-v">${t.value}</span>
            </div>
          `).join('')}
        </div>
        <div class="reviewer-conclusion">
          <div class="reviewer-conclusion-label">USER TYPE</div>
          <div class="reviewer-conclusion-val">🎯 ${conclusion}</div>
          <div class="reviewer-conclusion-desc">${conclusion_desc}</div>
        </div>
      </div>
      <div class="reviewer-pains">
        <div class="reviewer-pains-title">🔍 核心痛点（试乘前）</div>
        ${pain_points.map(p => `
          <div class="reviewer-pain">
            <span>${p.icon}</span>
            <span>${p.text}</span>
          </div>
        `).join('')}
        <div style="margin-top:18px;padding:14px 16px;background:rgba(37,99,235,.06);border-radius:var(--rad);border-left:3px solid var(--acc2)">
          <div style="font-family:var(--mono);font-size:9px;color:var(--acc2);letter-spacing:1px;margin-bottom:4px">WHY IT MATTERS</div>
          <div style="font-size:12px;color:var(--i2);line-height:1.7">
            「智驾增量用户」不追求极限性能，追求<strong style="color:var(--ink)">降低焦虑感</strong>。
            NOA 渗透率的下一个 10% 增长，来自这类用户——她们需要的不是「更快」，而是「更安心」。
          </div>
        </div>
      </div>
    </div>
  `;
}

/* 02 · 试乘亮点 */
function renderTrialHighlights() {
  const el = document.getElementById('trial-highlights-grid');
  if (!el) return;
  el.innerHTML = D.trial_highlights.map(h => `
    <div class="trial-card">
      <div class="trial-card-hd">
        <div class="trial-icon">${h.icon}</div>
        <div>
          <div class="trial-title" style="color:${h.color}">${h.title}</div>
          <div class="trial-subtitle">${h.subtitle}</div>
        </div>
      </div>
      <div class="trial-desc">${h.desc}</div>
      <div class="trial-insight">
        <div class="trial-insight-label">EXPERT INSIGHT</div>
        ${h.insight}
      </div>
    </div>
  `).join('');
}

/* 03 · 对比表 */
function renderComparisonTable() {
  const wrap = document.getElementById('comparison-table-wrap');
  if (!wrap) return;
  const { note, dims } = D.comparison_table;
  wrap.innerHTML = `
    <div class="cmp-note">${note}</div>
    <table class="cmp-full-table">
      <thead>
        <tr>
          <th style="width:90px">维度</th>
          <th class="th-tesla">Tesla Model Y</th>
          <th class="th-lixiang">理想 i6 / i8</th>
          <th class="th-livis">理想 L9 Livis</th>
          <th class="th-insight">战略洞察 · Expert Insight</th>
        </tr>
      </thead>
      <tbody>
        ${dims.map(d => `
          <tr>
            <td class="cmp-dim-cell">${d.dim}</td>
            <td class="cmp-tesla">
              <span class="cmp-val-strong">${d.tesla.val}</span>
              <span style="font-size:11px;color:var(--i3)">${d.tesla.detail}</span>
            </td>
            <td class="cmp-lixiang">
              <span class="cmp-val-strong">${d.lixiang.val}</span>
              <span style="font-size:11px;color:var(--i2)">${d.lixiang.detail}</span>
            </td>
            <td class="cmp-livis">
              <span class="cmp-val-strong">${d.livis.val}</span>
              <span style="font-size:11px;color:var(--i2)">${d.livis.detail}</span>
            </td>
            <td class="cmp-insight">
              <span class="cmp-insight-title">${d.insight.title}</span>
              <span class="cmp-insight-detail">${d.insight.detail}</span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}


/* ════════════════════════════════════════
   S04-04 · 战略风险和挑战
════════════════════════════════════════ */
function renderLxRiskMatrix() {
  const el = document.getElementById('lx-risk-wrap');
  if (!el) return;

  /* 列定义 */
  const cols = [
    { key: 'org',   label: '① 组织与资源', icon: '🏛️', color: '#5B8DD9' },
    { key: 'tech',  label: '② 技术与工程', icon: '⚙️', color: '#C0604A' },
    { key: 'biz',   label: '③ 商业与市场', icon: '💼', color: '#4A9D6F' },
  ];

  /* 行定义 */
  const rows = [
    {
      key:   'internal',
      label: '内部风险',
      icon:  '🔒',
      color: '#5B8DD9',
      tag:   '可控性较高',
      cells: {
        org: {
          title: '组织复杂度与人才压力',
          star: true,
          items: [
            { star: false, text: '大脑 / 小脑 / 本体三大纵队重组后协同机制尚未稳定，跨纵队接口标准仍在收敛' },
            { star: true,  text: '顶尖 AI 科研人才直接与字节、华为、百度争抢，人才流失将直接影响研发节奏' },
          ],
        },
        tech: {
          title: 'VLA 工程与仿真瓶颈',
          star: true,
          items: [
            { star: false, text: 'VLA 与端到端融合工程复杂度高，端侧算力仍是实时推理瓶颈' },
            { star: true,  text: 'Sim-to-Real Gap：MindSim 仿真数据在极端物理场景下与真实世界存在感知偏差，是行业公认的系统性挑战' },
            { star: false, text: '算法灵活性与硬件刚性之间的博弈尚未找到最优解' },
          ],
        },
        biz: {
          title: '数据燃料断层',
          star: true,
          items: [
            { star: true,  text: '高质量驾驶数据稀缺，从"数据灌量"向"数据精炼"的质变是当前核心挑战' },
            { star: false, text: '保有量相对特斯拉仍有差距，长尾场景的数据积累速度受限' },
            { star: false, text: '海外数据采集受 GDPR 等隐私法规约束，无法复用国内数据飞轮逻辑，出海反而削弱智驾迭代速度' },
          ],
        },
      },
    },
    {
      key:   'external',
      label: '外部风险',
      icon:  '🌐',
      color: '#C0604A',
      tag:   '外部不可控',
      cells: {
        org: {
          title: '政策合规与供应链安全',
          star: true,
          items: [
            { star: true,  text: '大模型黑盒决策的合规压力与舆论反噬风险持续上升，CoT 可视化自证成本高' },
            { star: true,  text: '马赫芯片依赖台积电 5nm 制程，中美芯片管制收紧将直接威胁算力自主可控' },
          ],
        },
        tech: {
          title: '竞争格局加速演变',
          items: [
            { star: false, text: '特斯拉强推 FSD 纯订阅制重构行业商业模式预期；华为 ADS 在国内市场形成差异化对标' },
            { star: false, text: '小鹏"堆叠降本"路线持续压缩智驾硬件毛利，价格战压力向产业链传导' },
          ],
        },
        biz: {
          title: 'AI 变现与品牌双重压力',
          star: true,
          items: [
            { star: false, text: '中国消费者订阅意愿与续费率显著低于海外，SaaS 变现路径存在本土化障碍' },
            { star: true,  text: '品牌心智稀释：理想牢固锚定"家庭 SUV"，向 AI 机器人公司转型面临既有用户认知冲突' },
            { star: true,  text: '出海合规壁垒：各国准入认证周期长（欧洲 WVTA、中东 GSO），标准碎片化拖慢铺量节奏' },
          ],
        },
      },
    },
  ];

  /* ── 矩阵头部 ── */
  const colHeaders = cols.map(c => `
    <div class="lx-risk-col-hd" style="--rc:${c.color}">
      <span class="lx-risk-col-icon">${c.icon}</span>
      <span class="lx-risk-col-label">${c.label}</span>
    </div>`).join('');

  /* ── 矩阵行 ── */
  const rowsHtml = rows.map(row => {
    const cellsHtml = cols.map(col => {
      const cell = row.cells[col.key];
      const itemsHtml = cell.items.map(item => `
        <div class="lx-risk-item ${item.star ? 'star' : ''}">
          ${item.star ? '<span class="lx-risk-star">✦</span>' : '<span class="lx-risk-dot"></span>'}
          <span>${item.text}</span>
        </div>`).join('');
      return `
        <div class="lx-risk-cell" style="--rc:${col.color}">
          <div class="lx-risk-cell-title">${cell.title}${cell.star ? ' <span class="lx-risk-title-star">✦</span>' : ''}</div>
          <div class="lx-risk-items">${itemsHtml}</div>
        </div>`;
    }).join('');

    return `
      <div class="lx-risk-row">
        <div class="lx-risk-row-hd" style="--rrc:${row.color}">
          <span class="lx-risk-row-icon">${row.icon}</span>
          <span class="lx-risk-row-label">${row.label}</span>
          <span class="lx-risk-row-tag">${row.tag}</span>
        </div>
        <div class="lx-risk-cells">${cellsHtml}</div>
      </div>`;
  }).join('');

  /* ── 图例说明 ── */
  const legend = `
    <div class="lx-risk-legend">
      <span class="lx-risk-legend-item"><span class="lx-risk-star-sm">✦</span> 重点关注风险（高影响 · 近期可见）</span>
      <span class="lx-risk-legend-sep">·</span>
      <span class="lx-risk-legend-item"><span class="lx-risk-dot-sm"></span> 一般风险（持续监控）</span>
    </div>`;

  el.innerHTML = `
    <div class="lx-risk-matrix">
      <div class="lx-risk-grid-hd">
        <div class="lx-risk-corner"></div>
        ${colHeaders}
      </div>
      <div class="lx-risk-rows">${rowsHtml}</div>
    </div>
    ${legend}`;
}

/* ════════════════════════════════════════
   S04-05a · 自动驾驶分级说明（L0–L5）
════════════════════════════════════════ */
function renderLxAdLevel() {
  const el = document.getElementById('lx-ad-level-wrap');
  if (!el) return;

  const levels = [
    {
      level: 'L0', name: '无自动化', nameEn: 'No Automation',
      color: '#6B7280',
      desc: '驾驶员全权控制车辆，系统仅提供被动警示（如碰撞预警），不参与任何实际操控。',
      driverPct: 100,
      respLabel: '完全由司机负责',
      year: '1885 — 2000s', yearTag: '传统时代',
      players: ['传统燃油车', '基础代步工具'],
      highlight: false,
    },
    {
      level: 'L1', name: '驾驶辅助', nameEn: 'Driver Assistance',
      color: '#3B82F6',
      desc: '单一维度辅助：自适应巡航（纵向）或车道保持（横向），两者不可同时启用，司机须全程注意。',
      driverPct: 85,
      respLabel: '司机主导，系统单点辅助',
      year: '2000s — 至今', yearTag: '量产普及',
      players: ['丰田 TSS', '本田 Sensing', '大众 IQ.Drive 基础版'],
      highlight: false,
    },
    {
      level: 'L2', name: '部分自动化', nameEn: 'Partial Automation',
      color: '#059669',
      desc: '同时控制纵向与横向运动，驾驶员须全程监控并随时准备接管，事故责任仍归司机。',
      driverPct: 65,
      respLabel: '司机监控，系统执行',
      year: '2016 — 至今', yearTag: '当前主流',
      players: ['Tesla Autopilot / FSD', '理想 AD Max', '小鹏 XNGP', '华为 ADS 2.0'],
      highlight: true, highlightLabel: '行业主战场',
    },
    {
      level: 'L3', name: '有条件自动化', nameEn: 'Conditional Automation',
      color: '#D97706',
      desc: '特定条件（高速 / 低速拥堵）下系统完全接管，但驾驶员须在收到请求后 10 秒内重新接管。',
      driverPct: 30,
      respLabel: '特定场景系统主导，司机待命',
      year: '2021 — 极少量落地', yearTag: '政策突破期',
      players: ['奔驰 Drive Pilot（≤60 km/h）', 'Honda Legend（日本限定）'],
      highlight: false,
    },
    {
      level: 'L4', name: '高度自动化', nameEn: 'High Automation',
      color: '#7C3AED',
      desc: '在特定地理围栏（ODD）内无需人工干预，超出范围则安全停车等待。可不配备方向盘。',
      driverPct: 5,
      respLabel: '系统全责（特定区域内）',
      year: '2023 — 商业化中', yearTag: '局部商用',
      players: ['Waymo One（凤凰城 / 旧金山）', '百度萝卜快跑', '滴滴自动驾驶'],
      highlight: false,
    },
    {
      level: 'L5', name: '完全自动化', nameEn: 'Full Automation',
      color: '#E03D1E',
      desc: '任何场景、任何天气、任何道路全自动驾驶，无需驾驶员。车内所有人均为乘客。',
      driverPct: 0,
      respLabel: '系统完全负责，无需人工',
      year: '2030+ 预测', yearTag: '行业终局',
      players: ['尚无量产车型'],
      highlight: false,
    },
  ];

  /* ── 顶部渐变光谱条 ── */
  const spectrumSegs = levels.map(l =>
    `<div class="lxad-spec-seg" style="background:${l.color}"></div>`).join('');

  /* ── 6 张等级卡 ── */
  const cardsHtml = levels.map(l => {
    const systemPct = 100 - l.driverPct;
    const respBar = `
      <div class="lxad-resp-bar">
        ${l.driverPct > 0 ? `<div class="lxad-seg driver" style="width:${l.driverPct}%">${l.driverPct >= 20 ? '司机' : ''}</div>` : ''}
        ${systemPct  > 0 ? `<div class="lxad-seg system"  style="width:${systemPct}%;background:${l.color}">${systemPct >= 20 ? '系统' : ''}</div>` : ''}
      </div>`;

    const chips = l.players.map(p =>
      `<span class="lxad-chip">${p}</span>`).join('');

    return `
      <div class="lxad-card ${l.highlight ? 'highlight' : ''}" style="--lc:${l.color}">
        ${l.highlight ? `<div class="lxad-badge-highlight">${l.highlightLabel}</div>` : ''}
        <div class="lxad-card-top">
          <span class="lxad-level" style="background:${l.color}">${l.level}</span>
          <div>
            <div class="lxad-name">${l.name}</div>
            <div class="lxad-name-en">${l.nameEn}</div>
          </div>
        </div>
        <div class="lxad-desc">${l.desc}</div>
        <div class="lxad-resp-block">
          <div class="lxad-resp-title">责任归属</div>
          ${respBar}
          <div class="lxad-resp-note">${l.respLabel}</div>
        </div>
        <div class="lxad-year-row">
          <span class="lxad-year-tag" style="color:${l.color};border-color:${l.color}">${l.yearTag}</span>
          <span class="lxad-year">${l.year}</span>
        </div>
        <div class="lxad-players">${chips}</div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="lxad-app-hd">
      <span class="lxad-app-no">A</span>
      <span class="lxad-app-title">自动驾驶分级（L0–L5）</span>
      <span class="lxad-app-sub">责任归属 · 代表玩家 · 落地时间线</span>
    </div>
    <div class="lxad-spectrum">
      <span class="lxad-spec-lbl">👤 人类主导</span>
      <div class="lxad-spec-bar">${spectrumSegs}</div>
      <span class="lxad-spec-lbl">🤖 系统主导</span>
    </div>
    <div class="lxad-grid">${cardsHtml}</div>`;
}

/* ════════════════════════════════════════
   S04-05b · 附录 · 产品路线图
════════════════════════════════════════ */
function renderLxRoadmap() {
  const el = document.getElementById('lx-roadmap-wrap');
  if (!el) return;
  const rm = window.AI_DATA.s4_roadmap;

  /* ── state ── */
  let rmTab   = 'domestic';
  let rmBrand = null;

  /* ── SVG builder (shared logic) ── */
  function buildSvg(data, cfg) {
    const { W, H, mg, xMin, xMax, yMin, yMax, bands, yearTicks, yTicks, yUnit, futureX } = cfg;
    const iW = W - mg.left - mg.right, iH = H - mg.top - mg.bottom;
    const xs = v => ((v - xMin) / (xMax - xMin) * iW).toFixed(2);
    const ys = v => ((1 - (v - yMin) / (yMax - yMin)) * iH).toFixed(2);

    const bandsSvg = bands.map(b => {
      const y1 = ys(b.max), y2 = ys(b.min);
      return `<rect x="0" y="${y1}" width="${iW}" height="${(parseFloat(y2)-parseFloat(y1)).toFixed(2)}" fill="${b.color}"/>
        <text x="-6" y="${((parseFloat(y1)+parseFloat(y2))/2+3.5).toFixed(1)}"
          text-anchor="end" font-size="9" fill="#94a3b8" font-family="var(--mono)">${b.label}</text>`;
    }).join('');

    const gridSvg = yearTicks.map(yr => {
      const x = xs(yr);
      return `<line x1="${x}" y1="0" x2="${x}" y2="${iH}" stroke="#e2e8f0" stroke-width="1"/>
        <text x="${x}" y="${iH+18}" text-anchor="middle" font-size="11" fill="#64748b">${yr}</text>`;
    }).join('');

    const yAxisSvg = yTicks.map(p => {
      const y = ys(p);
      return `<line x1="-4" y1="${y}" x2="0" y2="${y}" stroke="#cbd5e1"/>
        <text x="-8" y="${(parseFloat(y)+3.5).toFixed(1)}" text-anchor="end" font-size="10" fill="#94a3b8">${p}${yUnit}</text>`;
    }).join('');

    const xFut = parseFloat(xs(futureX));
    const futureSvg = `<rect x="${xFut.toFixed(2)}" y="0" width="${(iW-xFut).toFixed(2)}" height="${iH}" fill="rgba(0,0,0,0.018)"/>
      <text x="${((xFut+iW)/2).toFixed(1)}" y="-10" text-anchor="middle" font-size="9.5" fill="#94a3b8" font-style="italic">预计 / 规划</text>`;

    const rangesSvg = data.map(d => {
      if (Math.abs(d.pmax - d.pmin) < 0.5) return '';
      const bc  = rm.brands[d.brand] || { color: '#94a3b8' };
      const x   = xs(d.year);
      const y1  = ys(Math.min(d.pmax, yMax)), y2 = ys(Math.max(d.pmin, yMin));
      const lw  = bc.priority ? 2.8 : 1.8;
      return `<line data-brand="${d.brand}" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"
        stroke="${bc.color}" stroke-width="${lw}" stroke-opacity="${d.planned?0.4:0.62}"
        stroke-dasharray="${d.planned?'5,3':'none'}"/>`;
    }).join('');

    const dotsSvg = data.map(d => {
      const bc  = rm.brands[d.brand] || { color: '#94a3b8' };
      const py  = Math.min(Math.max(d.price, yMin), yMax);
      const x   = xs(d.year), y = ys(py);
      const r   = bc.priority ? 7 : 5;
      return `<circle data-brand="${d.brand}" cx="${x}" cy="${y}" r="${r}"
        fill="${bc.color}" fill-opacity="${d.planned?0.42:1}"
        stroke="white" stroke-width="${bc.priority?2:1.5}"/>`;
    }).join('');

    const labelsSvg = data.map(d => {
      const bc  = rm.brands[d.brand] || { color: '#94a3b8' };
      const py  = Math.min(Math.max(d.price, yMin), yMax);
      const x   = parseFloat(xs(d.year));
      const y   = parseFloat(ys(py));
      const nearRight = x > iW - 90;
      const lx  = nearRight ? x - 7 : x + 7;
      const ly  = bc.priority ? y - 10 : y + 15;
      const fs  = bc.priority ? 11 : 9.5;
      return `<text data-brand="${d.brand}" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}"
        text-anchor="${nearRight?'end':'start'}" font-size="${fs}"
        font-weight="${bc.priority?'700':'500'}" fill="${bc.color}"
        fill-opacity="${d.planned?0.65:1}" font-family="var(--sans)">${d.name}</text>`;
    }).join('');

    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
        width="100%" style="display:block;overflow:visible">
      <g transform="translate(${mg.left},${mg.top})">
        ${bandsSvg}${futureSvg}${gridSvg}${yAxisSvg}
        <line x1="0" y1="0" x2="0" y2="${iH}" stroke="#cbd5e1"/>
        <line x1="0" y1="${iH}" x2="${iW}" y2="${iH}" stroke="#cbd5e1"/>
        ${rangesSvg}${dotsSvg}${labelsSvg}
      </g>
    </svg>`;
  }

  /* ── chart configs ── */
  const domCfg = {
    W:760, H:500, mg:{top:30,right:28,bottom:52,left:72},
    xMin:2018.4, xMax:2027.9, yMin:9, yMax:88,
    bands: rm.price_bands_dom,
    yearTicks: [2019,2020,2021,2022,2023,2024,2025,2026,2027],
    yTicks: [10,20,30,40,50,60,70,80],
    yUnit: '万', futureX: 2025.7,
  };
  const ovsCfg = {
    W:760, H:500, mg:{top:30,right:28,bottom:52,left:82},
    xMin:2020.0, xMax:2027.9, yMin:15, yMax:165,
    bands: [
      { label:'$20–50k', min:20,  max:50,  color:'rgba(34,197,94,0.05)'  },
      { label:'$50–80k', min:50,  max:80,  color:'rgba(59,130,246,0.05)' },
      { label:'$80k+',   min:80,  max:165, color:'rgba(245,158,11,0.05)' },
    ],
    yearTicks: [2021,2022,2023,2024,2025,2026,2027],
    yTicks: [20,40,60,80,100,120,140,160],
    yUnit: 'k$', futureX: 2025.7,
  };

  /* ── brand filter buttons ── */
  function brandBarHtml(data) {
    const uniq = [...new Set(data.map(d => d.brand))];
    const allBtn = `<button class="rm-fbtn${!rmBrand?' active':''}" onclick="window._rmBrand(null)">全部</button>`;
    const brandBtns = uniq.map(b => {
      const c = (rm.brands[b]||{}).color || '#6B7280';
      const on = rmBrand === b;
      return `<button class="rm-fbtn${on?' active':''}" data-b="${b}"
        style="--bc:${c}${on?`;background:${c};color:#fff`:''}"
        onclick="window._rmBrand('${b}')">${b}</button>`;
    }).join('');
    return allBtn + brandBtns;
  }

  /* ── TaaS section (overseas) ── */
  function taasHtml() {
    return `<div class="rm-taas-section">
      <div class="rm-taas-hd">🤖 Robotaxi / TaaS 服务（无固定售价）</div>
      <div class="rm-taas-grid">
        ${rm.overseas_taas.map(t => {
          const c = (rm.brands[t.brand]||{}).color || '#6B7280';
          return `<div class="rm-taas-card${t.planned?' planned':''}" style="--tc:${c}">
            <div class="rm-taas-brand">${t.brand}</div>
            <div class="rm-taas-name">${t.name}</div>
            <div class="rm-taas-row">
              <span class="rm-taas-ai">${t.ai}</span>
              <span class="rm-taas-year">${t.year}</span>
              <span class="rm-taas-markets">${t.markets}</span>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  /* ── filter apply ── */
  function applyFilter() {
    document.querySelectorAll('#rm-chart-area [data-brand]').forEach(el => {
      el.style.opacity = (!rmBrand || el.dataset.brand === rmBrand) ? '' : '0.06';
      el.style.transition = 'opacity .2s';
    });
    document.querySelectorAll('.rm-fbtn').forEach(btn => {
      const b = btn.dataset.b || null;
      const on = b === rmBrand || (b === null && rmBrand === null);
      btn.classList.toggle('active', on);
      const c = b ? (rm.brands[b]||{}).color || '#6B7280' : null;
      btn.style.background = (on && c) ? c : '';
      btn.style.color = (on && c) ? '#fff' : '';
    });
  }

  window._rmBrand = function(b) {
    rmBrand = (rmBrand === b) ? null : b;
    applyFilter();
  };

  window._rmTab = function(tab) {
    rmTab = tab; rmBrand = null;
    ['domestic','overseas'].forEach(t =>
      document.getElementById(`rm-tab-${t}`).classList.toggle('active', t === tab));
    const data   = tab === 'domestic' ? rm.domestic : rm.overseas_scatter;
    const cfg    = tab === 'domestic' ? domCfg : ovsCfg;
    document.getElementById('rm-brand-bar').innerHTML = brandBarHtml(data);
    document.getElementById('rm-chart-area').innerHTML =
      buildSvg(data, cfg) +
      `<div class="rm-foot">● 实心 = 已上市 · ◌ 半透明 = 规划 · | 竖线 = 价格区间${tab==='overseas'?' · 纵轴 = 美元（$k）':''}</div>` +
      (tab === 'overseas' ? taasHtml() : '');
    applyFilter();
  };

  /* ── legend ── */
  function legendHtml(data) {
    const uniq = [...new Set(data.map(d => d.brand))];
    return uniq.map(b => {
      const c = (rm.brands[b]||{}).color || '#6B7280';
      return `<span class="lx-rm-legend-item">
        <span class="lx-rm-legend-dot" style="background:${c}"></span>
        <span class="lx-rm-legend-name">${b}</span>
      </span>`;
    }).join('');
  }

  /* ── initial render ── */
  el.innerHTML = `
    <div class="lxad-app-hd" style="margin-top:40px">
      <span class="lxad-app-no">B</span>
      <span class="lxad-app-title">产品路线图</span>
      <span class="lxad-app-sub">价格区间 × 上市年份 — 国内 &amp; 海外市场全景</span>
    </div>
    <div class="rm-tab-bar">
      <button id="rm-tab-domestic" class="rm-tab active" onclick="window._rmTab('domestic')">🇨🇳 国内市场</button>
      <button id="rm-tab-overseas" class="rm-tab" onclick="window._rmTab('overseas')">🌍 海外市场</button>
    </div>
    <div id="rm-brand-bar" class="rm-brand-bar"></div>
    <div id="rm-chart-area" class="rm-chart-area"></div>`;

  /* trigger domestic */
  window._rmTab('domestic');
}


/* ════════════════════════════════════════
   SECTION 05 · Vibe Coding 思路
════════════════════════════════════════ */
function renderVibeCoding() {

  /* ── 01 · 概览统计数字 ── */
  const statsEl = document.getElementById('vc-stats-wrap');
  if (statsEl) {
    const stats = [
      { n: '4',   l: '文件模块化架构', sub: 'index · styles · charts · data' },
      { n: '5',   l: '报告章节',        sub: 'AI全景 · 困境 · 理想专题 · 试乘 · 制作' },
      { n: '20+', l: '版本文件夹',       sub: '按日期保存，随时可回滚' },
      { n: '3',   l: 'AI 工具协同',     sub: 'Claude Chat · Cowork · Gemini' },
      { n: '2',   l: '次现场试乘体验',  sub: '理想 i6/i8 · L9 Livis' },
    ];
    statsEl.innerHTML = `<div class="vc-stats">${stats.map(s => `
      <div class="vc-stat">
        <div class="vc-stat-n">${s.n}</div>
        <div class="vc-stat-l">${s.l}</div>
        <div class="vc-stat-sub">${s.sub}</div>
      </div>`).join('')}</div>`;
  }

  /* ── 01b · 工具链图 ── */
  const tcEl = document.getElementById('vc-toolchain-wrap');
  if (tcEl) {
    tcEl.innerHTML = `
    <div class="vc-diagram">
      <div class="vc-layer-label">🤖 AI 协作层</div>
      <div class="vc-layer">
        <div class="vc-tool" style="border-top-color:#0052CC">
          <div class="vc-tool-icon" style="background:#EBF2FB;color:#0052CC">C</div>
          <div class="vc-tool-name">Claude Chat</div>
          <div class="vc-tool-tags">
            <span class="vc-tag" style="background:#EBF2FB;color:#0052CC">框架设计</span>
            <span class="vc-tag" style="background:#EBF2FB;color:#0052CC">内容策略</span>
          </div>
          <div class="vc-tool-desc">报告叙事结构规划、分析框架设计、初始 Prompt 工程；用于启动阶段和跨 session 的顶层决策</div>
        </div>
        <div class="vc-flow-arr">→</div>
        <div class="vc-tool" style="border-top-color:#4A9D6F">
          <div class="vc-tool-icon" style="background:#E8F5EE;color:#4A9D6F">CW</div>
          <div class="vc-tool-name">Claude Cowork</div>
          <div class="vc-tool-tags">
            <span class="vc-tag" style="background:#E8F5EE;color:#4A9D6F">代码实现</span>
            <span class="vc-tag" style="background:#E8F5EE;color:#4A9D6F">文件读写</span>
            <span class="vc-tag" style="background:#E8F5EE;color:#4A9D6F">数据迭代</span>
          </div>
          <div class="vc-tool-desc">直接操作 4 个文件、精准 Edit/Read、JSON 维护、版本号管理；本报告的主力开发环境</div>
        </div>
        <div class="vc-flow-arr">←</div>
        <div class="vc-tool" style="border-top-color:#1A6E4E">
          <div class="vc-tool-icon" style="background:#E2F5EE;color:#1A6E4E">G</div>
          <div class="vc-tool-name">Gemini</div>
          <div class="vc-tool-tags">
            <span class="vc-tag" style="background:#E2F5EE;color:#1A6E4E">信息检索</span>
            <span class="vc-tag" style="background:#E2F5EE;color:#1A6E4E">数据核实</span>
            <span class="vc-tag" style="background:#E2F5EE;color:#1A6E4E">Token 优化</span>
          </div>
          <div class="vc-tool-desc">行业背景检索、知识点补充与核实、产品数据素材汇总、Cowork 使用思路指导与 Token 节省建议</div>
        </div>
      </div>

      <div class="vc-layer-conn"><div class="vc-conn-line"></div><span class="vc-conn-label">本地调试 · 版本管理 · 正式部署</span><div class="vc-conn-line"></div></div>

      <!-- 开发工具层 + 部署层并排 -->
      <div class="vc-lower-row">
        <div class="vc-lower-col">
          <div class="vc-layer-label">⚙️ 开发工具层</div>
          <div class="vc-layer vc-layer--fill">
            <div class="vc-tool" style="border-top-color:#4A4743">
              <div class="vc-tool-icon" style="background:#F0EEEB;color:#4A4743">⌨️</div>
              <div class="vc-tool-name">Mac Terminal</div>
              <div class="vc-tool-tags"><span class="vc-tag" style="background:#F0EEEB;color:#4A4743">本地预览</span></div>
              <div class="vc-tool-desc">python -m http.server 实时预览渲染效果，配合 Cmd+Shift+R 硬刷新确认每次改动</div>
            </div>
            <div class="vc-tool" style="border-top-color:#6B4F2A">
              <div class="vc-tool-icon" style="background:#F5EFE6;color:#6B4F2A">🗂️</div>
              <div class="vc-tool-name">本地版本文件夹</div>
              <div class="vc-tool-tags"><span class="vc-tag" style="background:#F5EFE6;color:#6B4F2A">版本管理</span></div>
              <div class="vc-tool-desc">以日期命名文件夹存档每次输出（如 20260517/），无需 Git，打开文件夹即可回滚任意版本</div>
            </div>
          </div>
        </div>

        <div class="vc-lower-sep"></div>

        <div class="vc-lower-col">
          <div class="vc-layer-label">🚀 部署层</div>
          <div class="vc-layer vc-layer--fill">
            <div class="vc-tool" style="border-top-color:#1A1816">
              <div class="vc-tool-icon" style="background:#F0EEEB;color:#1A1816">⑂</div>
              <div class="vc-tool-name">GitHub</div>
              <div class="vc-tool-tags"><span class="vc-tag" style="background:#F0EEEB;color:#1A1816">代码托管</span><span class="vc-tag" style="background:#F0EEEB;color:#1A1816">自动触发</span></div>
              <div class="vc-tool-desc">将四个文件推送至 GitHub 仓库，每次 push 自动触发 Cloudflare Pages 重新部署</div>
            </div>
            <div class="vc-tool" style="border-top-color:#E67E22">
              <div class="vc-tool-icon" style="background:#FDF0D8;color:#E67E22">☁</div>
              <div class="vc-tool-name">Cloudflare Pages</div>
              <div class="vc-tool-tags"><span class="vc-tag" style="background:#FDF0D8;color:#E67E22">全球 CDN</span><span class="vc-tag" style="background:#FDF0D8;color:#E67E22">国内友好</span></div>
              <div class="vc-tool-desc">连接 GitHub 仓库自动部署，全球 CDN 加速，免费 HTTPS，国内访问速度优于 Vercel</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  /* ── 02 · 制作步骤 ── */
  const stepsEl = document.getElementById('vc-steps-wrap');
  if (stepsEl) {
    const steps = [
      { num:'01', color:'#0052CC', bg:'#EBF2FB',
        phase:'需求定义 & 叙事设计',
        desc:'确立五节递进结构，梳理 20+ 子模块与可视化形式，明确读者阅读路径。' },
      { num:'02', color:'#4A9D6F', bg:'#E8F5EE',
        phase:'技术选型 & 架构',
        desc:'4 文件完全分离，JSON 驱动渲染，原生 JS + SVG，零构建工具，浏览器直开。' },
      { num:'03', color:'#854F0B', bg:'#FDF0D8',
        phase:'框架开发',
        desc:'Claude Chat 主导：HTML 骨架、CSS 设计系统、Tab 懒加载引擎与静态模块初稿。' },
      { num:'04', color:'#3A2F8F', bg:'#EFEDFD',
        phase:'核心可视化实现',
        desc:'Claude Cowork 主导：风险矩阵、L0–L5 分级图谱、双 Tab 路线图散点图、试乘对比表。' },
      { num:'05', color:'#B45309', bg:'#FEF3C7',
        phase:'数据准确性维护',
        desc:'上传 CSV 核实 43 条记录；修正 L9 Ultra / Livis 上市状态；补全蔚来、问界、小米新车型。' },
      { num:'06', color:'#8B1A1A', bg:'#FAC8C8',
        phase:'调试 & 上下文管理',
        desc:'处理浏览器缓存、跨 session 上下文压缩续接、SVG 动态品牌过滤等技术问题。' },
      { num:'07', color:'#0B5040', bg:'#E2F5EE',
        phase:'内容迭代打磨',
        desc:'风险矩阵 3 轮精炼；机器人卡片拆分；L9 Livis 第二次试乘后对比表全维度更新。' },
      { num:'08', color:'#E03D1E', bg:'#FDECEA',
        phase:'校对 & 部署上线',
        desc:'全局浏览报告、截图标注问题后批量交给 Claude 修改，涵盖排版、措辞、数据核实；确认无误后推送 GitHub，Cloudflare Pages 自动发布。',
        final: true },
    ];

    /* 分组成对，逐对渲染，中间插入流动连接线 */
    const pairs = [];
    for (let i = 0; i < steps.length; i += 2) pairs.push(steps.slice(i, i+2));

    function stepCard(s) {
      return `<div class="vc-step-card${s.final ? ' vc-step-card--final' : ''}" style="border-left:3px solid ${s.color}">
        <div class="vc-step-hd">
          <span class="vc-step-num2" style="background:${s.bg};color:${s.color}">${s.num}</span>
          <span class="vc-step-phase2">${s.phase}</span>
        </div>
        <div class="vc-step-desc">${s.desc}</div>
      </div>`;
    }

    stepsEl.innerHTML = `<div class="vc-steps-flow">
      ${pairs.map((pair, ri) => `
        <div class="vc-steps-row">
          ${stepCard(pair[0])}
          <div class="vc-sn-harr"><span>→</span></div>
          ${pair[1] ? stepCard(pair[1]) : '<div class="vc-step-card vc-step-card--ghost"></div>'}
        </div>
        ${ri < pairs.length - 1 ? `
          <div class="vc-sn-vconn">
            <div class="vc-sn-vc-line"></div>
            <div class="vc-sn-vc-dot"></div>
            <div class="vc-sn-vc-line"></div>
          </div>` : ''}
      `).join('')}
    </div>`;
  }

  /* ── 03 · 经验与洞察 ── */
  const insEl = document.getElementById('vc-insights-wrap');
  if (insEl) {
    const insights = [
      /* ── 核心洞察（featured）── */
      {
        featured: true,
        icon: '✦', color: '#3A2F8F', bg: '#EFEDFD',
        title: '先做对，再做精——内容迭代优于一次完美',
        body: '风险矩阵经历了 3 轮修改：先建框架 → 增加 4 条新风险 → 删除重复项 → 移动 GDPR 条目到更合适的格。不要追求第一稿完美，Vibe Coding 的优势恰恰在于迭代成本极低。',
      },
      {
        featured: true,
        icon: '🤝', color: '#7C3AED', bg: '#EDE9FE',
        title: '人与 AI 也需要磨合——找到最默契的那个',
        body: '不同 AI 有自己的"人设"与"性格"：给 Claude 的框架太细、文案太足、数据全部来自 Gemini，反而会压缩它的发挥空间，产出质量下降。选用自己认为最合适、最有默契感的工具，比一味堆叠功能更能最大化创造力。工具不是越多越好，而是越顺手越好。',
      },
      {
        featured: true,
        icon: '🚗', color: '#1A6E4E', bg: '#E2F5EE',
        title: '现实体验让数据真正"活"起来',
        body: '两次试乘（i6/i8 和 L9 Livis）让对比表从一个纯规格文档变成了真实的用户感知记录。AI 可以生成框架，但第一手体验细节（"变道像老司机"、"后排像会客厅"）是无法凭空捏造的——这是 Vibe Coding 无法替代的部分。',
      },
      {
        featured: true,
        icon: '🎯', color: '#0B5040', bg: '#E2F5EE',
        title: 'AI 最擅长的是结构化与规模化，而非创意判断',
        body: '本报告中，理想汽车专题的叙事框架、风险矩阵的维度选择、试乘维度的取舍——这些判断都源于人类。AI 的价值在于快速实现、精准修改、不厌其烦地迭代。人机协作的边界：人负责"是否对"，AI 负责"怎么做到"。',
      },
      /* ── 实操经验 ── */
      {
        icon: '🗂️', color: '#0052CC', bg: '#EBF2FB',
        title: '数据与渲染分离是核心架构原则',
        body: '把所有内容放在 data.js 的 JSON 里，HTML/JS 只负责渲染逻辑。这样修改文案只需改 data.js，无需搜索 HTML 里的字符串——大幅降低了出错率，也让 AI 修改更精准。',
      },
      {
        icon: '📸', color: '#4A9D6F', bg: '#E8F5EE',
        title: '截图是最高效的需求表达方式',
        body: '几乎每一次重大调整都始于一张截图，配上简短的文字说明（如"红框内容重复"、"把这个放到上面"）。图胜千言——AI 看到截图后能立即定位问题，无需长篇描述。',
      },
      {
        icon: '🔄', color: '#854F0B', bg: '#FDF0D8',
        title: '跨 session 续接需要主动管理上下文',
        body: 'Cowork 的 session 有 Token 上限。超限时系统会自动生成 summary，下一个 session 从 summary 恢复。关键文件（charts.js / data.js）太大不会自动放入 context，需要手动 Read 或 Grep 确认当前状态再修改。',
      },
      {
        icon: '📋', color: '#0D3F7A', bg: '#DBEAFE',
        title: '持续审阅报告，整理修改意见再交给 AI',
        body: '在 Cowork 会话间隙，定期打开报告完整浏览一遍，把发现的问题用截图 + 简短文字列成清单。这比随想随说效率高得多——AI 能一次性理解多个上下文相关的改动，定位更准，修改更少来回。人扮演的是"审稿编辑"的角色，AI 是"执行助理"。',
      },
    ];
    const featured = insights.filter(i => i.featured);
    const regular  = insights.filter(i => !i.featured);
    insEl.innerHTML = `
      <div class="vc-insights-section-label">核心洞察</div>
      <div class="vc-insights-grid vc-insights-featured">
        ${featured.map(ins => `
          <div class="vc-insight-card vc-insight-card--featured" style="border-top:4px solid ${ins.color}">
            <div class="vc-insight-badge" style="background:${ins.bg};color:${ins.color}">核心</div>
            <div class="vc-insight-icon" style="background:${ins.bg};color:${ins.color}">${ins.icon}</div>
            <div class="vc-insight-title" style="color:${ins.color}">${ins.title}</div>
            <div class="vc-insight-body">${ins.body}</div>
          </div>`).join('')}
      </div>
      <div class="vc-insights-section-label vc-insights-section-label--sub">实操经验</div>
      <div class="vc-insights-grid vc-insights-sub">
        ${regular.map(ins => `
          <div class="vc-insight-card" style="border-top:3px solid ${ins.color}">
            <div class="vc-insight-icon" style="background:${ins.bg};color:${ins.color}">${ins.icon}</div>
            <div class="vc-insight-title" style="color:${ins.color}">${ins.title}</div>
            <div class="vc-insight-body">${ins.body}</div>
          </div>`).join('')}
      </div>`;
  }

  /* ── 04 · 工具横评 ── */
  renderVcToolPick();
}


/* ── Vibe Coding 04 · 工具横评 ── */
function renderVcToolPick() {
  const el = document.getElementById('vc-toolpick-wrap');
  if (!el) return;

  /* ── 横评数据 ── */
  const tools = [
    {
      name: 'Claude Cowork', abbr: 'CW', color: '#4A9D6F', bg: '#E8F5EE',
      type: 'GUI 桌面工具',
      dims: { onboard: 5, file: 5, scale: 3, context: 4, cost: 3, devLevel: 1 },
      best: '非开发者做结构化文档、可视化报告、内容研究',
      limit: 'Session Token 有上限；复杂工程项目文件数量多时效率下降',
      verdict: '★ 本报告首选',
    },
    {
      name: 'Claude Code', abbr: 'CC', color: '#0052CC', bg: '#EBF2FB',
      type: 'CLI 终端工具',
      dims: { onboard: 2, file: 5, scale: 5, context: 5, cost: 3, devLevel: 4 },
      best: '中大型多文件工程项目；需要执行终端命令、跑测试、自动 Git',
      limit: '需要熟悉 Terminal 和 Git；上手门槛明显高于 Cowork',
      verdict: '↑ 下一步进阶',
    },
    {
      name: 'ChatGPT + Codex', abbr: 'GP', color: '#1A7A4A', bg: '#E6F5ED',
      type: '对话 + 沙箱执行',
      dims: { onboard: 4, file: 2, scale: 3, context: 4, cost: 3, devLevel: 2 },
      best: '快速原型验证、数学/数据计算、代码片段生成、多语言能力',
      limit: '文件访问能力弱；需手动复制粘贴代码；长项目上下文连贯性差',
      verdict: '适合轻量原型',
    },
    {
      name: 'Cursor', abbr: 'Cu', color: '#7C3AED', bg: '#EDE9FE',
      type: 'AI IDE（VSCode 分支）',
      dims: { onboard: 3, file: 5, scale: 5, context: 5, cost: 3, devLevel: 4 },
      best: '已有代码库的持续开发；多文件联动修改；开发者日常主力工具',
      limit: '需要习惯 IDE 工作流；对非开发者不友好；月费 $20',
      verdict: '开发者强烈推荐',
    },
    {
      name: 'GitHub Copilot', abbr: 'GC', color: '#1A1816', bg: '#F0EEEB',
      type: '编辑器内联建议',
      dims: { onboard: 4, file: 3, scale: 4, context: 2, cost: 4, devLevel: 3 },
      best: '增量开发、代码补全、函数级别建议；完美融合现有开发习惯',
      limit: '不擅长"从零搭框架"；上下文窗口短；不能主动读取全局文件',
      verdict: '存量代码库首选',
    },
    {
      name: 'Nous Hermes', abbr: 'He', color: '#B45309', bg: '#FEF3C7',
      type: '本地开源模型',
      dims: { onboard: 1, file: 3, scale: 3, context: 3, cost: 5, devLevel: 5 },
      best: '数据隐私敏感项目；离线环境；免费无限调用；定制微调',
      limit: '需要本地 GPU；部署成本高；代码能力弱于商业模型',
      verdict: '隐私/离线场景',
    },
    {
      name: 'Gemini', abbr: 'Ge', color: '#1A6E4E', bg: '#E2F5EE',
      type: 'AI 助手 + 代码生成',
      dims: { onboard: 4, file: 2, scale: 3, context: 5, cost: 4, devLevel: 2 },
      best: '超长上下文处理（100万 Token）；Google 生态整合；数据检索',
      limit: '文件直接操作能力弱；与 Google Workspace 外的工具集成有限',
      verdict: '长文档 / 检索场景',
    },
    {
      name: 'OpenClaw (Cline)', abbr: 'OC', color: '#9333EA', bg: '#F5F3FF',
      type: 'VSCode 开源 AI Agent',
      dims: { onboard: 2, file: 5, scale: 5, context: 4, cost: 5, devLevel: 4 },
      best: '开源免费；自主执行终端命令 + 读写文件；「养虾式」自动化编程',
      limit: '需配置 API Key 和 VSCode 环境；自主操作风险需人工审核；上手门槛较高',
      verdict: '观望中',
    },
  ];

  const dimLabels = {
    onboard: '易上手',
    file:    '文件操作',
    scale:   '项目规模',
    context: '上下文',
    cost:    '性价比',
    devLevel:'Dev 门槛',
  };
  /* 所有列统一：圆点越多 = 该维度越高 */
  const dimNote = { devLevel: '↑ 越高越需 Dev 背景' };

  function stars(v, color) {
    return Array.from({length:5}, (_,i) =>
      `<span style="color:${i < v ? color : '#DDD'};font-size:13px">●</span>`
    ).join('');
  }

  /* ── 按上手门槛排序（高→低，越高越易上手） ── */
  const sortedTools = [...tools].sort((a, b) => b.dims.onboard - a.dims.onboard);

  /* ── 决策矩阵 ── */
  const matrixHtml = `
    <div class="vct-matrix">
      <table class="vct-table">
        <thead>
          <tr>
            <th class="vct-th-tool">工具</th>
            ${Object.entries(dimLabels).map(([k,l]) => `
              <th class="vct-th-dim" title="${dimNote[k]||''}">${l}${dimNote[k]?'<span class="vct-th-note">'+dimNote[k]+'</span>':''}</th>
            `).join('')}
            <th class="vct-th-best">最适合场景</th>
          </tr>
        </thead>
        <tbody>
          ${sortedTools.map(t => `
            <tr>
              <td class="vct-td-name">
                <span class="vct-abbr" style="background:${t.bg};color:${t.color}">${t.abbr}</span>
                <span class="vct-fullname">${t.name}</span>
                <span class="vct-type">${t.type}</span>
              </td>
              ${Object.keys(dimLabels).map(k => `
                <td class="vct-td-dim">${stars(t.dims[k], t.color)}</td>
              `).join('')}
              <td class="vct-td-best">${t.best}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;

  /* ── 决策指南卡片 ── */
  const guides = [
    { status: '已上手',       statusColor: '#1A6E4E', statusBg: '#E2F5EE',
      q: '我没有开发背景，想做可视化报告 / 研究文档',   a: 'Claude Cowork',        color: '#4A9D6F', bg: '#E8F5EE', reason: '文件直接读写 + GUI 交互，无需任何代码知识，本报告的完整制作路径。' },
    { status: '已上手',       statusColor: '#1A6E4E', statusBg: '#E2F5EE',
      q: '我需要处理超长文档 / 与 Google 工具整合',     a: 'Gemini',               color: '#1A6E4E', bg: '#E2F5EE', reason: '100 万 Token 上下文是行业最长，Google Docs / Drive / Search 生态整合天然无缝。' },
    { status: '下一步尝试',   statusColor: '#0052CC', statusBg: '#EBF2FB',
      q: '我有一定 Dev 基础，项目代码文件超过 10 个',   a: 'Claude Code + Cursor',  color: '#0052CC', bg: '#EBF2FB', reason: 'Claude Code 做架构和复杂修改，Cursor 做日常增量开发，两者互补效率最高。' },
    { status: '下一步尝试',   statusColor: '#0052CC', statusBg: '#EBF2FB',
      q: '我需要快速验证一个想法 / 做数据计算',         a: 'ChatGPT + Codex',       color: '#1A7A4A', bg: '#E6F5ED', reason: '沙箱执行代码、画图、算数据，结果即时可见，原型验证最快速。' },
    { status: '观望',         statusColor: '#6B7280', statusBg: '#F3F4F6',
      q: '我在已有代码库迭代 / 想用 Agent 自动执行任务', a: 'GitHub Copilot / OpenClaw (Cline)', color: '#1A1816', bg: '#F0EEEB', reason: 'Copilot 融合编辑器，Tab 补全覆盖日常增量需求；Cline 可自主读写文件并执行终端命令，自动化程度更高——视项目规模和操控需求选择。' },
    { status: '观望',         statusColor: '#6B7280', statusBg: '#F3F4F6',
      q: '我的数据不能上云 / 需要离线运行',             a: 'Nous Hermes（本地部署）', color: '#B45309', bg: '#FEF3C7', reason: '完全本地运行，数据零泄露风险；是否值得部署，需结合项目的隐私要求和资源条件具体判断。' },
  ];

  const guideHtml = `
    <div class="vct-guide-grid">
      ${guides.map(g => `
        <div class="vct-guide-card">
          <div class="vct-guide-status" style="color:${g.statusColor};background:${g.statusBg}">${g.status}</div>
          <div class="vct-guide-q">「${g.q}」</div>
          <div class="vct-guide-a" style="color:${g.color};background:${g.bg}">→ ${g.a}</div>
          <div class="vct-guide-reason">${g.reason}</div>
        </div>
      `).join('')}
    </div>`;

  /* ── 个人判断 ── */
  const personalPoints = [
    { icon: '✅', text: '研究型可视化文档首选 <strong>Claude Cowork</strong>——流程已跑通，学习成本为零。' },
    { icon: '📈', text: '项目规模扩大（超过 5 个文件、需要自动化脚本）时，迁移到 <strong>Claude Code</strong>：同一模型，文件控制权更强。' },
    { icon: '🔍', text: '<strong>Gemini</strong> 已是信息核实和超长文档处理的固定工具，尤其在中文检索上有明显优势。' },
    { icon: '⚖️', text: '工具差异本质是「操控性」：Cowork 拆解问题再执行；Code 给你更细控制权；Cursor 像懂代码的副驾驶坐在旁边——没有绝对好坏，只有场景匹配。' },
    { icon: '🔭', text: '<strong>Claude Code + Cursor</strong> 和 <strong>ChatGPT + Codex</strong> 列入下一步计划；<strong>GitHub Copilot</strong>、<strong>Hermes</strong> 和 <strong>OpenClaw (Cline)</strong> 视项目场景再决定是否引入。' },
  ];
  const personalHtml = `
    <div class="vct-personal">
      <div class="vct-personal-hd">💬 个人判断</div>
      <ul class="vct-personal-list">
        ${personalPoints.map(p => `
          <li class="vct-personal-item">
            <span class="vct-personal-icon">${p.icon}</span>
            <span class="vct-personal-text">${p.text}</span>
          </li>`).join('')}
      </ul>
    </div>`;

  el.innerHTML = matrixHtml + `
    <div class="vct-section-title">🧭 场景决策指南</div>` + guideHtml + personalHtml;
}


/* ════════════════════════════════════════
   SECTION 06 · 发展困境和行业未来
════════════════════════════════════════ */
function renderS6() {
  renderS6PhysicalAI();  /* 01 · 下一阶段：Physical AI */
  renderS6Barriers();    /* 02 · 发展困境 */
  renderS6Tradeoffs();   /* 03 · AI 行业核心 Trade-off */
  renderS6Failure();     /* 04 · 失败教训 */
  renderS2EndgameNew();  /* 05 · 终局畅想 */
  /* 06 附录 — lazy via toggleAppItem() */
}

/* 01 · 三面墙（可点击展开破局详情）+ End-to-End 破局图 */
function renderS6Barriers() {
  const el = document.getElementById('s6-barriers-wrap');
  if (!el) return;
  const B = D.s2_barriers;

  /* ── 每面墙的破局详情内容 ── */
  function buildBreakPanel(wallId) {
    if (wallId === 'software') {
      const d = D.s2_break_software;
      return `<div class="s6-break-panel-inner">

        <div class="s6-bp-section">
          <div class="s6-bp-sec-label s6-bp-sec-label--warn">⚠ 核心困境</div>
          <div class="s6-bp-sec-body">${d.dilemma}</div>
        </div>

        <div class="s6-bp-arrow-bridge">
          <div class="s6-bp-bridge-arrow">↓</div>
          <div class="s6-bp-bridge-badge" style="background:${d.color}15;color:${d.color};border:1px solid ${d.color}35">
            🔑 ${d.solution_label}
          </div>
          <div class="s6-bp-bridge-arrow">↓</div>
        </div>

        <div class="s6-bp-three-cards">

          <!-- ① 合成数据 & 具身演练 -->
          <div class="s6-bp-card" style="--cc:#2563EB">
            <div class="s6-bp-card-hd">
              <span class="s6-bp-card-icon">🌐</span>
              <div>
                <div class="s6-bp-card-title">合成数据 & 具身演练</div>
                <div class="s6-bp-card-sub">Synthetic Data · World Simulator</div>
              </div>
            </div>
            <div class="s6-bp-card-points">
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">大规模虚拟仿真器</div>
                <div class="s6-bp-point-text">超大规模物理引擎（NVIDIA Omniverse、行业自研）在虚拟世界中以 1000× 速度制造训练场景，彻底摆脱真实路测的成本瓶颈。</div>
              </div>
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">生成式世界模拟器</div>
                <div class="s6-bp-point-text">生成式 AI 批量制造极端工况——暴雨逆行、结冰路面、异形障碍。每天模拟 10 亿公里，覆盖 99%+ 长尾场景。</div>
              </div>
            </div>
          </div>

          <!-- ② 端到端架构 + 对比表 -->
          <div class="s6-bp-card" style="--cc:#059669">
            <div class="s6-bp-card-hd">
              <span class="s6-bp-card-icon">🔁</span>
              <div>
                <div class="s6-bp-card-title">端到端学习架构</div>
                <div class="s6-bp-card-sub">End-to-End · VLA Model</div>
              </div>
            </div>
            <table class="s6-e2e-mini-table">
              <thead>
                <tr>
                  <th class="s6-e2e-th-dim"></th>
                  <th class="s6-e2e-th-old">传统模块化<br><span>拼图模式</span></th>
                  <th class="s6-e2e-th-new">端到端架构<br><span>水流模式</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="s6-e2e-row-label">工作流</td>
                  <td class="s6-e2e-old">感知 → 预测 → 规划 → 控制（4 层模块）</td>
                  <td class="s6-e2e-new">传感器 → 单一大模型 → 物理动作</td>
                </tr>
                <tr>
                  <td class="s6-e2e-row-label">决策逻辑</td>
                  <td class="s6-e2e-old">程序员手写 <code>If-Then</code> 规则</td>
                  <td class="s6-e2e-new">神经网络自主「参悟」海量驾驶数据</td>
                </tr>
                <tr>
                  <td class="s6-e2e-row-label">致命缺点</td>
                  <td class="s6-e2e-old">模块间信息损耗，长尾场景失控</td>
                  <td class="s6-e2e-new">无缝连接，眼脑手脚一体化 ✅</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ③ 车企数据获取优势 -->
          <div class="s6-bp-card" style="--cc:#7c3aed">
            <div class="s6-bp-card-hd">
              <span class="s6-bp-card-icon">🏭</span>
              <div>
                <div class="s6-bp-card-title">车企数据获取优势</div>
                <div class="s6-bp-card-sub">Fleet Data Flywheel</div>
              </div>
            </div>
            <div class="s6-bp-card-points">
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">🚗 百万量级实车车队</div>
                <div class="s6-bp-point-text">路上数十万至百万辆在网实车，持续采集多路摄像头、雷达、IMU 数据——机器人初创（百台级）无法企及的先天规模。</div>
              </div>
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">🔁 真实 + 合成双轮闭环</div>
                <div class="s6-bp-point-text">真实数据提供「物理基准」，仿真补充长尾场景，比例可达 1000:1，两者互为校准缺一不可。</div>
              </div>
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">🏆 结构性行业优势</div>
                <div class="s6-bp-point-text">互联网公司缺物理维度，机器人初创规模受限。车企是当前最具大规模具身数据闭环能力的行业。</div>
              </div>
            </div>
          </div>

        </div>

        <div class="s2bk-metric" style="--wc:${d.color}">
          <span class="s2bk-metric-label">📊 ${d.metric.label}</span>
          <span class="s2bk-metric-text">${d.metric.text}</span>
        </div>

      </div>`;
    }
    if (wallId === 'hardware') {
      const d = D.s2_break_hardware;
      return `<div class="s6-break-panel-inner">

        <div class="s6-bp-section">
          <div class="s6-bp-sec-label s6-bp-sec-label--warn">⚠ 核心困境</div>
          <div class="s6-bp-sec-body" style="border-left-color:${d.color};background:#fffbeb">${d.dilemma}</div>
        </div>

        <div class="s6-bp-arrow-bridge">
          <div class="s6-bp-bridge-arrow">↓</div>
          <div class="s6-bp-bridge-badge" style="background:${d.color}15;color:${d.color};border:1px solid ${d.color}35">
            🔑 ${d.solution_label}
          </div>
          <div class="s6-bp-bridge-arrow">↓</div>
        </div>

        <div class="s6-bp-three-cards">

          <!-- ① 算法定义芯片 DSA -->
          <div class="s6-bp-card" style="--cc:${d.color}">
            <div class="s6-bp-card-hd">
              <span class="s6-bp-card-icon">🔧</span>
              <div>
                <div class="s6-bp-card-title">算法定义芯片（DSA）</div>
                <div class="s6-bp-card-sub">Algorithm-Driven Silicon</div>
              </div>
            </div>
            <div class="s6-bp-card-points">
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">量体裁衣</div>
                <div class="s6-bp-point-text">领先玩家（Apple、Tesla、顶尖车企）不再购买「均码」通用芯片，而是根据自研模型的算子特征定制电路，将算法逻辑直接「烧录」进硅片。</div>
              </div>
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">算力利用率跃升</div>
                <div class="s6-bp-point-text">通用 GPU 有效算力利用率约 30%；DSA 自研芯片可提升至 80% 以上——算力规模不变，实际吞吐量翻倍。</div>
              </div>
            </div>
          </div>

          <!-- ② 近存计算 + 对比表 -->
          <div class="s6-bp-card" style="--cc:#7C3AED">
            <div class="s6-bp-card-hd">
              <span class="s6-bp-card-icon">💾</span>
              <div>
                <div class="s6-bp-card-title">近存计算</div>
                <div class="s6-bp-card-sub">Near-Memory Computing · HBM</div>
              </div>
            </div>
            <table class="s6-e2e-mini-table">
              <thead>
                <tr>
                  <th class="s6-e2e-th-dim"></th>
                  <th class="s6-e2e-th-old">冯·诺依曼<br><span>传统架构</span></th>
                  <th class="s6-e2e-th-new" style="color:#7C3AED">近存计算<br><span>HBM 架构</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="s6-e2e-row-label">数据搬运</td>
                  <td class="s6-e2e-old">芯片 ←→ DRAM，路径长</td>
                  <td class="s6-e2e-new" style="color:#5b21b6;background:#f5f3ff">计算紧邻存储，极短路径</td>
                </tr>
                <tr>
                  <td class="s6-e2e-row-label">能耗分配</td>
                  <td class="s6-e2e-old">90% 耗在「搬运数据」</td>
                  <td class="s6-e2e-new" style="color:#5b21b6;background:#f5f3ff">有效算力利用率升至 80%+</td>
                </tr>
                <tr>
                  <td class="s6-e2e-row-label">散热表现</td>
                  <td class="s6-e2e-old">高负载必发烫，被迫降频</td>
                  <td class="s6-e2e-new" style="color:#5b21b6;background:#f5f3ff">低热低功耗，持续满载 ✅</td>
                </tr>
                <tr>
                  <td class="s6-e2e-row-label" style="color:var(--i3);font-size:10px">代表产品</td>
                  <td colspan="2" style="font-size:11px;color:var(--i2);padding:8px 10px;line-height:1.5">
                    英伟达 H100（HBM3，3.35 TB/s）· 苹果 UMA M3 / M4 Max（统一内存架构，CPU / GPU / NPU 共享内存池）
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ③ 垂直整合·算法主权 -->
          <div class="s6-bp-card" style="--cc:#059669">
            <div class="s6-bp-card-hd">
              <span class="s6-bp-card-icon">🔗</span>
              <div>
                <div class="s6-bp-card-title">垂直整合 · 算法主权</div>
                <div class="s6-bp-card-sub">Software × Hardware Symbiosis</div>
              </div>
            </div>
            <div class="s6-bp-card-points">
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">🎟 自研是「决赛门票」</div>
                <div class="s6-bp-point-text">自研芯片不只是降成本，而是拿回「性能定义权」——谁掌握算法与硅片的结合，谁就掌握智能的天花板。</div>
              </div>
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">🧠 软硬「共生体」</div>
                <div class="s6-bp-point-text">AI 拥有「物理直觉」，硬件拥有「思维能力」。芯片架构与内存带宽路径完全根据神经网络拓扑重构——硬件是算法的物理延伸。</div>
              </div>
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">📌 结论</div>
                <div class="s6-bp-point-text">${d.conclusion}</div>
              </div>
            </div>
          </div>

        </div>

      </div>`;
    }
    if (wallId === 'cloud') {
      const d = D.s2_break_cloud;
      return `<div class="s6-break-panel-inner">

        <div class="s6-bp-section">
          <div class="s6-bp-sec-label" style="color:#2563EB">🔄 行业趋势</div>
          <div class="s6-bp-sec-body" style="border-left-color:#2563EB;background:#eff6ff">${d.trend}</div>
        </div>

        <div class="s6-bp-arrow-bridge">
          <div class="s6-bp-bridge-arrow">↓</div>
          <div class="s6-bp-bridge-badge" style="background:${d.color}15;color:${d.color};border:1px solid ${d.color}35">
            🔑 ${d.solution_label}
          </div>
          <div class="s6-bp-bridge-arrow">↓</div>
        </div>

        <div class="s6-bp-three-cards">

          <!-- ① 极致模型压缩 -->
          <div class="s6-bp-card" style="--cc:${d.color}">
            <div class="s6-bp-card-hd">
              <span class="s6-bp-card-icon">🗜️</span>
              <div>
                <div class="s6-bp-card-title">极致模型压缩</div>
                <div class="s6-bp-card-sub">Distillation × Quantization</div>
              </div>
            </div>
            <div class="s6-bp-card-points">
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">蒸馏（Distillation）</div>
                <div class="s6-bp-point-text">用大师模型（Teacher）指导小模型（Student）复现能力，把千亿参数的「智力」浓缩进轻量端侧网络，推理质量接近原版。</div>
              </div>
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">量化（Quantization）</div>
                <div class="s6-bp-point-text">权重精度从 FP32 降至 INT8/INT4，内存占用减少 75%+，推理速度提升 2–4×，让大模型装进几瓦功耗的端侧芯片，无需云端回传。</div>
              </div>
            </div>
          </div>

          <!-- ② 端侧实时闭环 + 延迟对比 -->
          <div class="s6-bp-card" style="--cc:#059669">
            <div class="s6-bp-card-hd">
              <span class="s6-bp-card-icon">⚡</span>
              <div>
                <div class="s6-bp-card-title">端侧 AI 实时闭环</div>
                <div class="s6-bp-card-sub">On-Device · Real-time Loop</div>
              </div>
            </div>
            <div class="s6-latency-section">
              <div class="s6-lat-title">响应延迟对比</div>
              <div class="s6-lat-row">
                <div class="s6-lat-label">云端响应</div>
                <div class="s6-lat-track"><div class="s6-lat-bar s6-lat-bad" style="width:100%"></div></div>
                <span class="s6-lat-val s6-lat-val-bad">500 ms</span>
              </div>
              <div class="s6-lat-row">
                <div class="s6-lat-label">人类反应</div>
                <div class="s6-lat-track"><div class="s6-lat-bar s6-lat-mid" style="width:20%"></div></div>
                <span class="s6-lat-val s6-lat-val-mid">~100 ms</span>
              </div>
              <div class="s6-lat-row">
                <div class="s6-lat-label">端侧 AI</div>
                <div class="s6-lat-track"><div class="s6-lat-bar s6-lat-good" style="width:4%"></div></div>
                <span class="s6-lat-val s6-lat-val-good">&lt; 20 ms ✅</span>
              </div>
              <div class="s6-lat-note">越过「人类感官红线」，达成生理级安全本能</div>
              <div class="s6-lat-use">适用场景：自动驾驶瞬时避险 · AR 眼镜实时交互 · 工业机器人精细协作</div>
            </div>
          </div>

          <!-- ③ 端侧隐私与带宽脱钩 -->
          <div class="s6-bp-card" style="--cc:#374151">
            <div class="s6-bp-card-hd">
              <span class="s6-bp-card-icon">🔒</span>
              <div>
                <div class="s6-bp-card-title">端侧隐私 & 带宽脱钩</div>
                <div class="s6-bp-card-sub">Privacy-First · Zero Bandwidth</div>
              </div>
            </div>
            <div class="s6-bp-card-points">
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">🔐 数据不出户</div>
                <div class="s6-bp-point-text">敏感视觉与语音流在本地处理后即销毁，满足医疗、金融、政务的隐私合规要求，彻底消除「云端监控」顾虑。</div>
              </div>
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">📉 带宽成本骤降 90%</div>
                <div class="s6-bp-point-text">终端只上传结构化摘要而非原始视频流，运营商与企业服务器带宽压力降低 90% 以上，彻底打通商业模式。</div>
              </div>
              <div class="s6-bp-point">
                <div class="s6-bp-point-label">🌐 弱网 / 断网可用</div>
                <div class="s6-bp-point-text">隧道、山区、海上等弱连接场景下，端侧本能不受影响——「断网即有本能」成为差异化竞争力。</div>
              </div>
            </div>
          </div>

        </div>

      </div>`;
    }
    return '';
  }

  const wallsHtml = B.walls.map(w => `
    <div class="s6-wall-card" id="s6-wcard-${w.id}" style="--wc:${w.color}"
         onclick="selectS6Wall('${w.id}', this)" role="button" tabindex="0">
      <div class="s6-wall-card-top">
        <span class="s6-wall-icon">${w.icon}</span>
        <div class="s6-wall-main">
          <div class="s6-wall-name">${w.name}</div>
          <div class="s6-wall-title">${w.title}</div>
        </div>
        <span class="s6-wall-chev">▸</span>
      </div>
      <ul class="s6-wall-points">
        ${w.points.map(p => `<li><strong>${p.label}</strong>　${p.text}</li>`).join('')}
      </ul>
      <div class="s6-wall-hint">点击查看破局路径</div>
    </div>`).join('');

  /* 核心结论：端到端是三面墙的终极解法 */
  const e2eHtml = `
    <div class="s6-concl-wrap">

      <div class="s6-concl-header">
        <div class="s6-concl-kicker">2026 行业共识 · 核心结论</div>
        <div class="s6-concl-headline">
          <span class="s6-concl-e2e">端到端（End-to-End）</span>
          <span class="s6-concl-headline-rest">是解开三面墙的终极钥匙</span>
        </div>
        <div class="s6-concl-sub">
          要跨越物理世界的鸿沟，必须依靠端到端架构对传统技术栈进行全面清洗——
          它同时作用于感知、决策、执行三个层面，是软件、硬件、云端三面墙的共同解法。
        </div>
      </div>

      <div class="s6-concl-rows">

        <div class="s6-concl-row">
          <div class="s6-concl-left">
            <span class="s6-concl-wall-tag" style="background:#2563EB18;color:#2563EB;border:1px solid #2563EB40">软件墙</span>
            <span class="s6-concl-method">以数据飞轮破局</span>
          </div>
          <div class="s6-concl-arrow-col">→</div>
          <div class="s6-concl-outcome">
            端到端架构告别 If-Then 臃肿，靠虚实数据闭环攻克黑盒对齐与长尾场景枯竭。
            <span class="s6-concl-tech">神经网络取代 If-Then · VLA 统一感知-决策-执行</span>
          </div>
        </div>

        <div class="s6-concl-row">
          <div class="s6-concl-left">
            <span class="s6-concl-wall-tag" style="background:#D9770618;color:#D97706;border:1px solid #D9770640">硬件墙</span>
            <span class="s6-concl-method">以芯片自研破局</span>
          </div>
          <div class="s6-concl-arrow-col">→</div>
          <div class="s6-concl-outcome">
            端到端大模型的算力饥渴，倒逼车企与硬件厂商走向 DSA 专用架构芯片的软硬一体化时代。
            <span class="s6-concl-tech">算法定义芯片 · 算力利用率 30% → 80%+</span>
          </div>
        </div>

        <div class="s6-concl-row">
          <div class="s6-concl-left">
            <span class="s6-concl-wall-tag" style="background:#E03D1E18;color:#E03D1E;border:1px solid #E03D1E40">云端墙</span>
            <span class="s6-concl-method">以边缘本能破局</span>
          </div>
          <div class="s6-concl-arrow-col">→</div>
          <div class="s6-concl-outcome">
            毫秒级的物理博弈，迫使算力从云端下沉至端侧（SLM）；云端由此演变为纯粹的世界模型训练工坊。
            <span class="s6-concl-tech">响应 500ms → &lt;20ms · 云端专注训练，端侧专注执行</span>
          </div>
        </div>

      </div>

      <div class="s6-concl-footer">
        <span class="s6-concl-eg-label">已落地案例</span>
        <span class="s6-concl-eg">Tesla FSD v12 全面切换端到端（2024）</span>
        <span class="s6-concl-dot">·</span>
        <span class="s6-concl-eg">理想 MindVLA 城区脱手率 89%</span>
        <span class="s6-concl-dot">·</span>
        <span class="s6-concl-eg">宇树 G1 VLA 架构通用操作</span>
      </div>

    </div>`;

  /* 预先生成三面墙的展开内容（隐藏，按需显示） */
  const panelContents = {};
  B.walls.forEach(w => { panelContents[w.id] = buildBreakPanel(w.id); });

  el.innerHTML = `
    <p class="s6-section-intro">${B.tagline}</p>
    <div class="s6-walls-grid">${wallsHtml}</div>
    <div class="s6-wall-connector" id="s6-wall-connector" style="display:none">
      <svg class="s6-conn-svg" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="0" x2="12" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <polyline points="5,14 12,22 19,14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      </svg>
      <div class="s6-conn-label" id="s6-conn-label"></div>
      <svg class="s6-conn-svg" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="0" x2="12" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <polyline points="5,14 12,22 19,14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="s6-break-panel" id="s6-break-panel" style="display:none"></div>
    ${e2eHtml}`;

  /* 全局：点击墙卡片切换展开面板 */
  let _s6ActiveWall = null;
  window.selectS6Wall = function(id, cardEl) {
    const panel = document.getElementById('s6-break-panel');
    const connector = document.getElementById('s6-wall-connector');
    const connLabel = document.getElementById('s6-conn-label');
    const allCards = el.querySelectorAll('.s6-wall-card');
    const allChevs = el.querySelectorAll('.s6-wall-chev');

    if (_s6ActiveWall === id) {
      /* 再次点击同一张：收起 */
      panel.style.display = 'none';
      panel.innerHTML = '';
      connector.style.display = 'none';
      allCards.forEach(c => c.classList.remove('active'));
      allChevs.forEach(c => c.textContent = '▸');
      _s6ActiveWall = null;
    } else {
      /* 切换到新墙 */
      const wall = B.walls.find(w => w.id === id);
      const color = wall ? wall.color : '#1e293b';
      /* 连接箭头 */
      connector.style.display = 'flex';
      connector.style.color = color;
      connLabel.textContent = `行业转向 · 如何破解${wall ? wall.name : ''}`;
      connLabel.style.cssText = `background:${color}15;color:${color};border:1px solid ${color}35`;
      /* 展开面板 */
      panel.style.display = 'block';
      panel.style.borderTopColor = color;
      panel.innerHTML = panelContents[id];
      /* 滚动到面板 */
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      allCards.forEach(c => c.classList.remove('active'));
      cardEl.classList.add('active');
      allChevs.forEach(c => c.textContent = '▸');
      cardEl.querySelector('.s6-wall-chev').textContent = '▾';
      _s6ActiveWall = id;
    }
  };
}

/* 02 · 核心 Trade-off */
function renderS6Tradeoffs() {
  const el = document.getElementById('s6-tradeoff-wrap');
  if (!el) return;
  const T = D.s6_tradeoffs;

  const tensionStyle = (color, level) => {
    if (level === '高') return `background:color-mix(in srgb,${color} 88%,#fff);color:#fff;border:2px solid ${color};font-weight:900;letter-spacing:.04em`;
    if (level === '中') return `background:color-mix(in srgb,${color} 30%,var(--sf));color:${color};border:1.5px solid color-mix(in srgb,${color} 55%,var(--ru));font-weight:700`;
    return `background:color-mix(in srgb,${color} 8%,var(--sf));color:color-mix(in srgb,${color} 60%,var(--i3));border:1px dashed color-mix(in srgb,${color} 25%,var(--ru));font-weight:600`;
  };

  /* 重构为平铺 grid：Header row → item rows，同行跨列等高 */
  const maxItems = Math.max(...T.groups.map(g => g.items.length));

  const headersHtml = T.groups.map(g => `
    <div class="s6-to-group-hd" style="--gc:${g.color}">
      <span class="s6-to-group-icon">${g.icon}</span>
      <span class="s6-to-group-name">${g.group}</span>
      <span class="s6-to-group-en">${g.en}</span>
    </div>`).join('');

  let cardsHtml = '';
  for (let i = 0; i < maxItems; i++) {
    T.groups.forEach(g => {
      const it = g.items[i];
      if (!it) { cardsHtml += '<div></div>'; return; }
      cardsHtml += `
        <div class="s6-to-card">
          <div class="s6-to-vs-row">
            <div class="s6-to-side left" style="color:${g.color}">
              <div class="s6-to-label">${it.left}</div>
              <div class="s6-to-en">${it.leftEn}</div>
            </div>
            <div class="s6-to-tension-wrap">
              <div class="s6-to-tension-badge" style="${tensionStyle(g.color, it.tension)}">
                ${it.tension}张力
              </div>
            </div>
            <div class="s6-to-side right">
              <div class="s6-to-label">${it.right}</div>
              <div class="s6-to-en">${it.rightEn}</div>
            </div>
          </div>
          <div class="s6-to-insight">💡 ${it.insight}</div>
          <div class="s6-to-resolution" style="border-left-color:${g.color}">
            <span class="s6-to-res-label">现行解法</span>${it.resolution}
          </div>
        </div>`;
    });
  }

  el.innerHTML = `
    <p class="s6-section-intro">${T.intro}</p>
    <div class="s6-to-grid">${headersHtml}${cardsHtml}</div>`;
}

/* 03 · 失败教训 */
function renderS6Failure() {
  const el = document.getElementById('s6-failure-wrap');
  if (!el) return;
  const FL = D.failure_lessons;
  const WF = D.s6_why_fail;

  /* 为什么 AI 公司会失控 */
  const whyHtml = WF.map(r => `
    <div class="s6-fail-reason">
      <div class="s6-fail-reason-icon">${r.icon}</div>
      <div class="s6-fail-reason-body">
        <div class="s6-fail-reason-hd">
          <span class="s6-fail-reason-title">${r.title}</span>
          <span class="s6-fail-reason-tag">${r.tag}</span>
        </div>
        <div class="s6-fail-reason-desc">${r.desc}</div>
      </div>
    </div>`).join('');

  /* 案例卡片 — 三张等宽并列 */
  const GC = D.s6_glasses_case;
  const allCases = [
    ...FL.cases.map(c => ({
      icon: c.icon, product: c.product,
      meta: `${c.year} · ${c.price} · 销量 ${c.sold}`,
      pitch: c.pitch, failures: c.failures, lesson: c.lesson
    })),
    {
      icon: GC.icon, product: GC.product,
      meta: `${GC.year} · ${GC.price} · 个人体验`,
      pitch: GC.pitch, failures: GC.failures, lesson: GC.lesson
    }
  ];

  const casesHtml = allCases.map(c => `
    <div class="s6-fail-case">
      <div class="s6-fail-case-hd">
        <span class="s6-fail-icon">${c.icon}</span>
        <div>
          <div class="s6-fail-product">${c.product}</div>
          <div class="s6-fail-meta">${c.meta}</div>
        </div>
      </div>
      <div class="s6-fail-pitch">"${c.pitch}"</div>
      <ul class="s6-fail-list">
        ${c.failures.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
      </ul>
      <div class="s6-fail-lesson">📌 ${c.lesson}</div>
    </div>`).join('');

  el.innerHTML = `
    <div class="s6-fail-why">
      <div class="s6-fail-why-title">为什么 AI 公司会失控</div>
      <div class="s6-fail-why-grid">${whyHtml}</div>
    </div>
    <div class="s6-fail-cases-title">硬件缺少真实闭环 — 三个典型案例</div>
    <div class="s6-fail-cases-grid s6-fail-cases-grid--trio">${casesHtml}</div>`;
}

/* 04 · Physical AI 三阶段 */
function renderS6PhysicalAI() {
  const el = document.getElementById('s6-physical-wrap');
  if (!el) return;
  const stages = D.s6_physical_ai_stages;
  const PA = D.physical_ai;

  const stagesHtml = stages.map((s, i) => `
    <div class="s6-pa-stage ${s.done ? 'done' : 'future'}" style="--sc:${s.color}">
      <div class="s6-pa-num">${s.stage}</div>
      <div class="s6-pa-era">${s.era}</div>
      <div class="s6-pa-icon">${s.icon}</div>
      <div class="s6-pa-name">${s.name}</div>
      <div class="s6-pa-en">${s.en}</div>
      <div class="s6-pa-desc">${s.desc}</div>
      <div class="s6-pa-caps">
        ${s.caps.map(c => `<span class="s6-pa-cap">${c}</span>`).join('')}
      </div>
      ${s.examples ? `
        <div class="s6-pa-examples">
          <div class="s6-pa-examples-label">代表案例</div>
          ${s.examples.map(ex => `
            <div class="s6-pa-example-item">
              <span class="s6-pa-example-name">${ex.name}</span>
              <span class="s6-pa-example-note">${ex.note}</span>
            </div>`).join('')}
        </div>` : ''}
      <div class="s6-pa-limit">⚑ ${s.limit}</div>
      ${!s.done ? '<div class="s6-pa-future-badge">前沿进行中</div>' : ''}
    </div>
    ${i < stages.length - 1 ? '<div class="s6-pa-arrow">→</div>' : ''}`).join('');

  el.innerHTML = `<div class="s6-pa-timeline">${stagesHtml}</div>`;
}
