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
  // sync s5 section visibility (s5 is the 5th .sp)

  if (n === 2 && !s2Done) { s2Done = true; renderS2(); }
  if (n === 3 && !s3Done) { s3Done = true; renderS3(); }
  if (n === 4 && !s4Done) { s4Done = true; renderS4(); }
  if (n === 5 && !s5Done) { s5Done = true; renderS5(); }
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
  renderPyramid();
  renderGlossary();
  renderPlayerMap();
  renderTrends();
}

/* 01 · 产业链架构金字塔 */
function renderPyramid() {
  const wrap = document.getElementById('pyramid-wrap');
  if (!wrap) return;
  const layers = D.pyramid_layers; // [app, model, infra] top→bottom

  // widths: app=52%, model=76%, infra=100%
  const widths = layers.map(l => l.pct);

  wrap.innerHTML = `
    <div class="pyramid-layers">
      ${layers.map((l, i) => `
        <div class="pyramid-layer"
          style="width:${widths[i]}%;background:${l.color};margin-bottom:${i < layers.length-1 ? '3px' : '0'}"
          onclick="showPyramidDetail(${i})">
          <div class="pyramid-layer-name">${l.name}</div>
          <div class="pyramid-layer-en">${l.en}</div>
          <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px">
            <span class="pyramid-layer-size">${l.marketSize}</span>
            <span class="pyramid-layer-yoy">${l.yoy} YoY</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="pyramid-detail-panel" id="pyramid-detail">
      <div class="pyramid-detail-placeholder">← 点击左侧层级<br>查看详情</div>
    </div>
  `;
}

function showPyramidDetail(i) {
  const l = D.pyramid_layers[i];
  const panel = document.getElementById('pyramid-detail');
  if (!panel) return;
  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${l.color}"></span>
      <div class="pyramid-detail-title" style="margin-bottom:0">${l.name}</div>
      <span style="font-family:var(--mono);font-size:11px;color:var(--i3);margin-left:auto">${l.marketSize} · ${l.yoy}</span>
    </div>
    <div style="font-size:11px;color:var(--i3);font-family:var(--mono);margin-bottom:8px;letter-spacing:.5px">细分赛道</div>
    <div class="pyramid-detail-cats">
      ${l.categories.map(c => `<span class="pyramid-detail-cat">${c}</span>`).join('')}
    </div>
    <div class="pyramid-detail-examples">
      <strong>代表公司 / 产品：</strong>${l.examples.join('  ·  ')}
    </div>
  `;
}

/* 02 · 核心技术词典 */
function renderGlossary() {
  const el = document.getElementById('glossary-grid');
  if (!el) return;
  const dims = D.glossary_dims;

  // Build 3 stacks; first one open by default
  el.innerHTML = `<div class="gloss-stacks">${
    dims.map((dim, di) => `
      <div class="gloss-stack ${di === 0 ? 'open' : ''}" style="--dc:${dim.color}">
        <div class="gloss-trigger" onclick="toggleGlossStack(this.parentElement)">
          <div class="gloss-trigger-left">
            <span class="gloss-dim-pill">维度 ${dim.dim}</span>
            <span class="gloss-dim-name">${dim.label}</span>
            <span class="gloss-dim-en">· ${dim.en}</span>
          </div>
          <div class="gloss-trigger-right">
            <span class="gloss-count">${dim.terms.length} 词</span>
            <span class="gloss-arrow">▸</span>
          </div>
          <div class="gloss-deck-preview">
            ${dim.terms.slice(0,3).map((_,i) => `<div class="gloss-deck-card" style="--k:${i}"></div>`).join('')}
          </div>
        </div>
        <div class="gloss-fan-wrap">
          <div class="gloss-fan">
            ${dim.terms.map((t, ti) => `
              <div class="gloss-fan-card ${t.highlight ? 'highlight' : ''}" style="--i:${ti}">
                <div class="gloss-fan-no">${dim.dim}${ti + 1}</div>
                <div class="gloss-fan-term">${t.term}</div>
                <div class="gloss-fan-full">${t.full}</div>
                <div class="gloss-fan-def">${t.def}</div>
                <div class="gloss-fan-key">${t.key}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('')}
  </div>`;
}

function toggleGlossStack(stack) {
  const isOpen = stack.classList.contains('open');
  document.querySelectorAll('.gloss-stack').forEach(s => s.classList.remove('open'));
  if (!isOpen) stack.classList.add('open');
}

/* 03 · 玩家图谱（世界地图 · 三大阵营） */
function renderPlayerMap() {
  const wrap = document.getElementById('map-svg-player');
  if (!wrap) return;
  buildPlayerLegend();
  drawWorldMap('map-svg-player', 'map-detail-player', getPlayerColor, onPlayerClick);
}

function buildPlayerLegend() {
  const el = document.getElementById('player-map-legend');
  if (!el) return;
  el.innerHTML = Object.entries(D.camp_colors).map(([camp, color]) => `
    <div class="player-camp-badge">
      <div class="player-camp-dot" style="background:${color}"></div>
      <span>${camp}</span>
    </div>
  `).join('') + `<span class="player-camp-desc">${Object.values(D.camp_desc).join('　·　')}</span>`;
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
  det.innerHTML = `
    <h4>${info.name}</h4>
    <span class="map-detail-cluster" style="background:${clr}">${info.camp}</span>
    <div class="map-detail-players">
      <p style="font-size:11px;color:var(--i3);margin-bottom:6px;margin-top:10px">主要 AI 玩家</p>
      ${info.players.map(p => `<span class="map-player-tag">${p}</span>`).join('')}
    </div>
  `;
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
function drawWorldMap(svgWrapId, detailId, colorFn, clickFn) {
  const wrap = document.getElementById(svgWrapId);
  if (!wrap) return;
  const W = wrap.clientWidth || 800, H = 420;
  const svg = d3.select(wrap).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  const proj = d3.geoNaturalEarth1().scale(W / 6.5).translate([W / 2, H / 2 + 10]);
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
    })
    .catch(() => {
      wrap.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:420px;color:var(--i3);font-size:13px;text-align:center;">地图加载需要网络连接<br>请通过本地服务器访问（python3 -m http.server）</div>';
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


/* ════════════════════════════════════════
   SECTION 02 · 赛道拆解
════════════════════════════════════════ */
function renderS2() {
  renderEdgeAI();
  renderHwTriangleNew();
  renderParetoNew();
  renderSupplyShift();
}

/* 01 · 端侧 AI */
function renderEdgeAI() {
  const wrap = document.getElementById('edge-ai-wrap');
  if (!wrap) return;
  const { pain_points, comparison } = D.edge_ai;
  wrap.innerHTML = `
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
    <div class="hw-tri-flow">
      <div class="hw-flow-label">端侧推理数据流</div>
      <div class="hw-flow-chain">
        <div class="hw-flow-node node-ddr">DDR 内存<br><small>存放模型权重</small></div>
        <div class="hw-flow-arrow">→<br><small>900 GB/s</small></div>
        <div class="hw-flow-node node-npu">NPU<br><small>矩阵乘加运算</small></div>
        <div class="hw-flow-arrow">→<br><small>结果写回</small></div>
        <div class="hw-flow-node node-cpu">CPU<br><small>调度与后处理</small></div>
        <div class="hw-flow-arrow">→<br><small>输出</small></div>
        <div class="hw-flow-node node-out">Token 输出<br><small>&lt;20ms</small></div>
      </div>
      <div class="hw-flow-note">⚠️ 瓶颈在箭头，不在方块——内存带宽决定 NPU 实际速度</div>
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
  `;
}

/* 03 · 帕累托前沿 & 模型蒸馏 */
function renderParetoNew() {
  const wrap = document.getElementById('pareto-new-wrap');
  if (!wrap) return;
  const { distillation, models, frontier, platform_colors, insight } = D.pareto_new;

  wrap.innerHTML = `
    <div class="pareto-insight">${insight}</div>
    <div class="distill-pipeline" id="distill-pipeline"></div>
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
  renderSpaceAgent();
  renderMindVLA();
  renderMach100();
  renderMindSim();
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

  el.innerHTML = `
    <div class="space-agent-wrap">
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
          <th style="width:110px">维度</th>
          <th class="th-tesla">Tesla Model Y</th>
          <th class="th-lixiang">理想 i8 / i6</th>
          <th class="th-insight">战略洞察 · Expert Insight</th>
        </tr>
      </thead>
      <tbody>
        ${dims.map(d => `
          <tr>
            <td class="cmp-dim-cell">${d.dim}</td>
            <td class="cmp-tesla">
              <span class="cmp-val-strong">${d.tesla.val}</span>
              <span style="font-size:11.5px;color:var(--i3)">${d.tesla.detail}</span>
            </td>
            <td class="cmp-lixiang">
              <span class="cmp-val-strong">${d.lixiang.val}</span>
              <span style="font-size:11.5px;color:var(--i2)">${d.lixiang.detail}</span>
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
