/* ============================================================
   賭場撲克 - 主程式 (i18n + 單螢幕自適應)
   ============================================================ */

const app = document.getElementById('app');
const chipCount = document.getElementById('chipCount');
const App = { redraw: () => renderLobby() };

function refreshChips() { chipCount.textContent = fmt(Bank.get()); }
function toast(msg, ms = 1800) {
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), ms);
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ---------- 點擊音效 (Web Audio 合成，免外部檔) ---------- */
let _actx = null;
function clickSound() {
  try {
    const AC = (typeof window !== 'undefined') && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return;
    if (!_actx) _actx = new AC();
    if (_actx.state === 'suspended') _actx.resume();
    const ctx = _actx, now = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(520, now); o.frequency.exponentialRampToValueAtTime(180, now + 0.05);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.13, now + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
    o.connect(g).connect(ctx.destination);
    o.start(now); o.stop(now + 0.08);
  } catch (e) {}
}
if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('click', (e) => {
    const sel = '.btn,.tile.ready,.chip-btn,.bet-spot,.lang-btn,.card.selectable,#enterBtn,#startBtn,[data-add],[data-bi],[data-spot],[data-coin],[data-coins],[data-u],[data-sel]';
    if (e.target.closest && e.target.closest(sel)) clickSound();
  }, true);
}

/* ---------- 頁面轉場 (淡入) ---------- */
function screenTransition() {
  if (!app.classList) return;
  app.classList.remove('nav-anim');
  void app.offsetWidth;
  app.classList.add('nav-anim');
}

/* ---------- 頁內確認框 (取代原生 confirm，避免被瀏覽器封鎖) ---------- */
function askConfirm(msg, onYes) {
  const ov = document.createElement('div');
  ov.className = 'modal-ov';
  ov.innerHTML = `<div class="modal">
    <p>${msg}</p>
    <div class="modal-btns">
      <button class="btn ghost" data-no>${t('cancel')}</button>
      <button class="btn danger" data-yes>${t('confirmYes')}</button>
    </div></div>`;
  document.body.appendChild(ov);
  ov.querySelector('[data-no]').onclick = () => ov.remove();
  ov.querySelector('[data-yes]').onclick = () => { ov.remove(); onYes(); };
  ov.onclick = (e) => { if (e.target === ov) ov.remove(); };
}

/* ---------- 靜態 i18n (頂部欄) ---------- */
function applyStaticI18n() {
  document.getElementById('brandTxt').innerHTML = t('brand');
  document.getElementById('chipLbl').textContent = t('chips');
  document.getElementById('langBtn').textContent = t('langBtn');
}

/* ---------- 撲克牌渲染 ---------- */
function cardHTML(card, cls = '') {
  if (!card) return `<div class="card back ${cls}"></div>`;
  const red = card.red ? 'red' : '';
  return `<div class="card ${red} ${cls}">
    <div class="r">${card.label}</div>
    <div class="center">${card.suit}</div>
    <div class="s">${card.suit}</div>
  </div>`;
}
function cardsHTML(cards, cls = '') { return cards.map(c => cardHTML(c, cls)).join(''); }

function tableHead(titleKey) {
  return `<div class="table-head">
    <button class="btn ghost sm" onclick="renderLobby()">${t('back')}</button>
    <h2>${t(titleKey)}</h2>
  </div>`;
}

function betSelector(state) {
  const chips = [1, 5, 25, 100, 500];
  return `<div class="bet-row">
    ${chips.map(v => `<div class="chip-btn chip-${v}" data-add="${v}">${v}</div>`).join('')}
    <button class="btn ghost sm" data-bet="clear">${t('clear')}</button>
    <span class="bet-amt" id="betAmt">${fmt(state.bet)}</span>
  </div>`;
}

/* ============================================================
   大廳
   ============================================================ */
const GAME_META = {
  holdem: { icon: '♠️', ready: true }, omaha: { icon: '🔶', ready: false }, stud7: { icon: '7️⃣', ready: false },
  deuce27: { icon: '🔻', ready: false }, horse: { icon: '🐴', ready: false },
  threecard: { icon: '🎴', ready: true }, ultimateth: { icon: '👑', ready: true }, caribbean: { icon: '🏝️', ready: true },
  mississippi: { icon: '🌊', ready: false }, paigow: { icon: '🀄', ready: false }, fourcard: { icon: '4️⃣', ready: false },
  crazy4: { icon: '🤪', ready: false }, thbonus: { icon: '🎁', ready: false }, letitride: { icon: '🎢', ready: true },
  baccarat: { icon: '🎴', ready: true }, blackjack: { icon: '🂡', ready: true }, dragontiger: { icon: '🐉', ready: true },
  casinowar: { icon: '⚔️', ready: true }, videopoker: { icon: '🃏', ready: true }, bigsmall: { icon: '⚖️', ready: true },
};
const CATS = [
  { key: 'catVs', games: ['holdem', 'omaha', 'stud7', 'deuce27', 'horse'] },
  { key: 'catDealer', games: ['threecard', 'ultimateth', 'caribbean', 'letitride', 'mississippi', 'paigow', 'fourcard', 'crazy4', 'thbonus'] },
  { key: 'catOther', games: ['baccarat', 'blackjack', 'dragontiger', 'casinowar', 'bigsmall', 'videopoker'] },
];

/* ---------- 首頁：破產通知書 ---------- */
function renderHome() {
  App.redraw = renderHome; screenTransition();
  const amt = fmt(Bank.get());
  const d = new Date();
  const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  app.innerHTML = `
  <div class="home">
    <div class="notice">
      <div class="notice-stamp">${t('bkStamp')}</div>
      <div class="notice-h">${t('bkTitle')}</div>
      <div class="notice-sub">${t('bkOfficial')}</div>
      <div class="notice-meta"><span>${t('bkNo')}: BK-${ds.replace(/-/g, '')}-07</span><span>${t('bkDate')}: ${ds}</span></div>
      <p class="notice-body">${t('bkBody')}</p>
      <div class="notice-payee">${t('bkPayee')}: <b>${I18N.lang === 'zh' ? '台端' : 'YOU'}</b></div>
      <div class="notice-sign">${t('bkSign')} ✒</div>
      <div class="bill">
        <div class="tape tape-l"></div><div class="tape tape-r"></div>
        <div class="bill-brand">${t('billBrand')}</div>
        <div class="bill-amount">${amt}</div>
        <div class="bill-note">${t('billNote')}</div>
      </div>
    </div>
    <button class="btn primary" id="enterBtn" style="font-size:16px;padding:13px 30px">${t('homeEnter')}</button>
  </div>`;
  document.getElementById('enterBtn').onclick = renderLobby;
}

function renderLobby() {
  App.redraw = renderLobby; screenTransition();
  const s = Bank.stats();
  const winRate = s.hands ? Math.round(s.won / s.hands * 100) : 0;
  const section = (cat) => {
    const ready = cat.games.filter(id => GAME_META[id] && GAME_META[id].ready);
    if (!ready.length) return '';
    return `
    <div class="cat-section">
      <div class="cat-title">${t(cat.key)}</div>
      <div class="tile-grid">
        ${ready.map(id => {
          const m = GAME_META[id];
          return `<div class="tile ready" data-g="${id}">
            <span class="t-ico">${m.icon}</span><span class="t-name">${t('g_' + id)}</span></div>`;
        }).join('')}
      </div>
    </div>`;
  };
  app.innerHTML = `
  <div class="lobby" style="justify-content:flex-start;gap:12px;padding-top:2vh">
    <h1 style="font-size:22px">${t('lobbyTitle')}</h1>
    ${CATS.map(section).join('')}
    <div class="stat-row">
      <span>🎲 ${t('hands')}: <b>${fmt(s.hands)}</b></span>
      <span>🏆 ${t('won')}: <b>${fmt(s.won)}</b> (${winRate}%)</span>
      <span>💰 ${t('biggest')}: <b>${fmt(s.biggest)}</b></span>
      <span>📈 ${t('peak')}: <b>${fmt(s.peak)}</b></span>
    </div>
    <div class="center-txt">
      <button class="btn ghost sm" id="homeBtn">🏠</button>
      <button class="btn ghost sm" id="resetBtn">${t('resetChips')}</button>
      ${Bank.get() < 50 ? `<button class="btn primary sm" id="freeBtn">${t('freeChips')}</button>` : ''}
    </div>
  </div>`;

  app.querySelectorAll('.tile.ready').forEach(c => c.onclick = () => openGame(c.dataset.g));
  document.getElementById('homeBtn').onclick = renderHome;
  document.getElementById('resetBtn').onclick = () => askConfirm(t('resetConfirm'), () => { Bank.set(1000); refreshChips(); renderHome(); });
  const fb = document.getElementById('freeBtn');
  if (fb) fb.onclick = () => { Bank.add(500); refreshChips(); renderLobby(); toast(t('gotFree')); };
}

const GAME_OBJ = {
  blackjack: () => Blackjack, videopoker: () => VideoPoker, holdem: () => Holdem, baccarat: () => Baccarat,
  threecard: () => ThreeCard, ultimateth: () => UTH, caribbean: () => Caribbean, letitride: () => LetItRide,
  dragontiger: () => DragonTiger, casinowar: () => CasinoWar, bigsmall: () => BigSmall,
};

function openGame(id) {
  if (GAME_META[id] && GAME_META[id].ready && GAME_OBJ[id]) introGame(id);
  else toast(t('soon'));
}

// 遊戲介紹頁 (同頁顯示玩法 + 開始按鈕)
function introGame(id) {
  App.redraw = () => introGame(id); screenTransition();
  const m = GAME_META[id];
  const rules = t('howto_' + id).split('|');
  app.innerHTML = `
  ${tableHead('g_' + id)}
  <div class="table-wrap"><div class="felt intro-felt">
    <div class="intro-ico">${m.icon}</div>
    <div class="intro-name">${t('g_' + id)}</div>
    <p class="intro-desc">${t('d_' + id)}</p>
    <ul class="intro-rules">${rules.map(li => `<li>${li}</li>`).join('')}</ul>
    <button class="btn primary intro-start" id="startBtn">${t('startGame')}</button>
  </div></div>`;
  document.getElementById('startBtn').onclick = () => { screenTransition(); GAME_OBJ[id]().enter(); };
}

/* ============================================================
   21 點  Blackjack (含同桌 AI 陪玩)
   ============================================================ */
const BJ_ROSTER = [{ name: 'Ava', emoji: '👩' }, { name: 'Leo', emoji: '🧔' }, { name: 'Sam', emoji: '🧑' }];

const Blackjack = {
  shoe: null, bet: 50, dealer: [], hands: [], active: 0, phase: 'bet', insurance: 0, ai: [], numAi: 0,

  enter() {
    if (!this.shoe) this.shoe = new Shoe(6);
    this.phase = 'bet'; this.dealer = []; this.hands = []; this.insurance = 0;
    // 同桌 AI 陪玩：初次各給 1000 籌碼，之後於本次遊玩期間累積
    if (!this.ai.length) this.ai = BJ_ROSTER.slice(0, this.numAi).map(r => ({ ...r, stack: 1000, cards: [], bet: 0, result: '', bust: false }));
    else this.ai.forEach(a => { a.cards = []; a.bet = 0; a.result = ''; a.bust = false; if (a.stack <= 0) a.stack = 1000; });
    this._msg = ''; this._cls = '';
    this.render();
  },

  render() {
    App.redraw = () => this.render();
    const p = this.phase;
    let dealerCards, dealerVal = '';
    if (p === 'bet') dealerCards = '';
    else if (p === 'player' || p === 'insure') {
      dealerCards = cardHTML(this.dealer[0]) + cardHTML(null);
      dealerVal = `${t('upcard')} ${bjPointLabel([this.dealer[0]])}`;
    } else {
      dealerCards = cardsHTML(this.dealer);
      dealerVal = bjPointLabel(this.dealer);
    }

    const handsHTML = this.hands.map((h, i) => {
      const activeCls = (p === 'player' && i === this.active) ? 'active' : '';
      const res = h.resultKey ? `<div class="status">${t(h.resultKey)}</div>` : '';
      const label = this.hands.length > 1 ? t('handN', { n: i + 1 }) : t('yourCards');
      return `<div class="seat ${activeCls} ${h.bust ? 'folded' : ''}">
        <div class="name">🧑 ${label} · ${t('bet')} ${fmt(h.bet)}</div>
        <div class="cards">${cardsHTML(h.cards)}</div>
        <div class="chips">${bjPointLabel(h.cards)}${h.bj ? ' · BLACKJACK!' : ''}</div>
        ${res}
      </div>`;
    }).join('');

    const aiHTML = this.ai.map(a => {
      const cls = a.result ? ((a.result === 'resWin' || a.result === 'resBlackjack' || a.result === 'resDealerBust') ? 'win' : (a.result === 'resPush' ? '' : 'lose')) : '';
      return `<div class="ai-seat ${cls}">
        <div class="name">${a.emoji} ${a.name}</div>
        <div class="cards">${a.cards.length ? cardsHTML(a.cards, 'sm') : '<div class="small">—</div>'}</div>
        <div class="chips">💰 ${fmt(a.stack)}${a.bet ? ' · ' + t('bet') + ' ' + fmt(a.bet) : ''}</div>
        <div class="status">${a.cards.length ? bjPointLabel(a.cards) : ''} ${a.result ? t(a.result) : ''}</div>
      </div>`;
    }).join('');

    app.innerHTML = `
    ${tableHead('bjTitle')}
    <div class="table-wrap">
      <div class="felt">
        <div class="seat-row">
          <div class="seat">
            <div class="name">🎩 ${t('dealer')}</div>
            <div class="cards">${dealerCards || `<div class="small">${t('waitBet')}</div>`}</div>
            <div class="chips">${dealerVal}</div>
          </div>
        </div>
        <div class="board-area"><span class="small">${t('bjRules')}</span></div>
        ${aiHTML ? `<div class="seat-row">${aiHTML}</div>` : ''}
        <div class="seat-row">${handsHTML || `<div class="seat"><div class="small">${t('dealAfterBet')}</div></div>`}</div>
      </div>
      <div class="msg-bar ${this._cls || ''}">${this._msg || ''}</div>
      <div class="controls" id="ctrls"></div>
    </div>`;
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    if (this.phase === 'bet') {
      c.innerHTML = `<div class="grp">${betSelector(this)}</div>
        <button class="btn primary" id="dealBtn">${t('deal')}</button>`;
      c.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
        this.bet = Math.min(Bank.get(), this.bet + parseInt(b.dataset.add));
        document.getElementById('betAmt').textContent = fmt(this.bet);
      });
      c.querySelector('[data-bet=clear]').onclick = () => { this.bet = 0; document.getElementById('betAmt').textContent = '0'; };
      document.getElementById('dealBtn').onclick = () => this.deal();
    } else if (this.phase === 'insure') {
      c.innerHTML = `<div class="grp"><span>${t('insQ', { n: fmt(Math.floor(this.hands[0].bet / 2)) })}</span>
        <button class="btn" id="insYes">${t('insBuy')}</button>
        <button class="btn ghost" id="insNo">${t('insNo')}</button></div>`;
      document.getElementById('insYes').onclick = () => this.takeInsurance(true);
      document.getElementById('insNo').onclick = () => this.takeInsurance(false);
    } else if (this.phase === 'player') {
      const h = this.hands[this.active];
      const canDouble = h.cards.length === 2 && Bank.get() >= h.bet;
      const canSplit = h.cards.length === 2 && h.cards[0].rank === h.cards[1].rank && Bank.get() >= h.bet && this.hands.length < 4;
      c.innerHTML = `
        <button class="btn primary" id="hitBtn">${t('hit')}</button>
        <button class="btn" id="standBtn">${t('stand')}</button>
        <button class="btn" id="dblBtn" ${canDouble ? '' : 'disabled'}>${t('double')}</button>
        <button class="btn" id="splitBtn" ${canSplit ? '' : 'disabled'}>${t('split')}</button>`;
      document.getElementById('hitBtn').onclick = () => this.hit();
      document.getElementById('standBtn').onclick = () => this.stand();
      document.getElementById('dblBtn').onclick = () => this.double();
      document.getElementById('splitBtn').onclick = () => this.split();
    } else {
      c.innerHTML = `<button class="btn primary" id="againBtn">${t('playAgain')}</button>
        <button class="btn ghost" onclick="renderLobby()">${t('leaveTable')}</button>`;
      document.getElementById('againBtn').onclick = () => this.enter();
    }
  },

  msg(key, params, cls = '') { this._msg = t(key, params); this._cls = cls; },

  deal() {
    if (this.bet <= 0) return toast(t('placeBet'));
    if (this.bet > Bank.get()) return toast(t('notEnough'));
    Bank.add(-this.bet); refreshChips();
    this.dealer = [this.shoe.draw(), this.shoe.draw()];
    this.hands = [{ cards: [this.shoe.draw(), this.shoe.draw()], bet: this.bet, bust: false, done: false }];
    // 同桌 AI 各自下注並發牌 (使用自己的籌碼，不影響你的餘額)
    for (const a of this.ai) {
      a.result = ''; a.bust = false;
      a.bet = Math.min(a.stack, [25, 50, 100][Math.floor(Math.random() * 3)]);
      a.stack -= a.bet;
      a.cards = [this.shoe.draw(), this.shoe.draw()];
    }
    this.active = 0; this._msg = ''; this._cls = '';
    this.hands[0].bj = isBlackjack(this.hands[0].cards);
    if (this.dealer[0].rank === 14) { this.phase = 'insure'; this.render(); return; }
    this.afterDeal();
  },

  takeInsurance(yes) {
    if (yes) { const ins = Math.floor(this.hands[0].bet / 2); if (ins <= Bank.get()) { Bank.add(-ins); this.insurance = ins; refreshChips(); } }
    this.afterDeal();
  },

  afterDeal() {
    if (isBlackjack(this.dealer)) {
      this.phase = 'done';
      if (this.insurance) { Bank.add(this.insurance * 3); refreshChips(); }
      this.settle(); return;
    }
    this.insurance = 0;
    if (this.hands[0].bj) { this.phase = 'done'; this.settle(); return; }
    this.phase = 'player'; this.render();
  },

  hit() {
    const h = this.hands[this.active];
    h.cards.push(this.shoe.draw());
    if (bjValue(h.cards) > 21) { h.bust = true; h.done = true; this.render(); this.nextHand(); }
    else this.render();
  },
  stand() { this.hands[this.active].done = true; this.nextHand(); },
  double() {
    const h = this.hands[this.active];
    Bank.add(-h.bet); refreshChips(); h.bet *= 2; h.cards.push(this.shoe.draw());
    if (bjValue(h.cards) > 21) h.bust = true;
    h.done = true; this.render(); this.nextHand();
  },
  split() {
    const h = this.hands[this.active];
    Bank.add(-h.bet); refreshChips();
    const card2 = h.cards.pop();
    const nh = { cards: [card2, this.shoe.draw()], bet: h.bet, bust: false, done: false };
    h.cards.push(this.shoe.draw());
    this.hands.splice(this.active + 1, 0, nh);
    this.render();
  },
  nextHand() {
    const next = this.hands.findIndex(h => !h.done);
    if (next === -1) this.dealerPlay();
    else { this.active = next; this.render(); }
  },

  async dealerPlay() {
    this.phase = 'dealer'; this.render();
    // 同桌 AI 依基本策略自動補牌 (未達 17 就要牌)
    for (const a of this.ai) {
      if (isBlackjack(a.cards)) continue;
      await sleep(280);
      while (bjValue(a.cards) < 17) { a.cards.push(this.shoe.draw()); if (bjValue(a.cards) > 21) a.bust = true; this.render(); await sleep(320); }
    }
    const anyStanding = this.hands.some(h => !h.bust) || this.ai.some(a => !a.bust);
    if (anyStanding) {
      await sleep(500);
      while (bjValue(this.dealer) < 17) { this.dealer.push(this.shoe.draw()); this.render(); await sleep(550); }
    }
    this.phase = 'done'; this.settle();
  },

  settle() {
    const dv = bjValue(this.dealer), dealerBJ = isBlackjack(this.dealer);
    let net = 0;
    for (const h of this.hands) {
      const pv = bjValue(h.cards);
      let win = 0, key = '';
      if (h.bj && !dealerBJ) { win = h.bet + Math.floor(h.bet * 1.5); key = 'resBlackjack'; }
      else if (h.bust) { win = 0; key = 'resBust'; }
      else if (dealerBJ) { win = 0; key = 'resDealerBJ'; }
      else if (dv > 21) { win = h.bet * 2; key = 'resDealerBust'; }
      else if (pv > dv) { win = h.bet * 2; key = 'resWin'; }
      else if (pv < dv) { win = 0; key = 'resLose'; }
      else { win = h.bet; key = 'resPush'; }
      h.resultKey = key; Bank.add(win); net += win - h.bet;
    }
    refreshChips(); Bank.record(net);
    // 結算同桌 AI (更新自己的籌碼，純陪玩不影響你的餘額)
    for (const a of this.ai) {
      const av = bjValue(a.cards), abj = isBlackjack(a.cards);
      let awin = 0, akey;
      if (abj && !dealerBJ) { awin = a.bet + Math.floor(a.bet * 1.5); akey = 'resBlackjack'; }
      else if (a.bust) { awin = 0; akey = 'resBust'; }
      else if (dealerBJ) { awin = 0; akey = 'resDealerBJ'; }
      else if (dv > 21) { awin = a.bet * 2; akey = 'resDealerBust'; }
      else if (av > dv) { awin = a.bet * 2; akey = 'resWin'; }
      else if (av < dv) { awin = 0; akey = 'resLose'; }
      else { awin = a.bet; akey = 'resPush'; }
      a.stack += awin; a.result = akey; a.bet = 0;
    }
    if (net > 0) this.msg('youWon', { n: fmt(net) }, 'win');
    else if (net < 0) this.msg('youLost', { n: fmt(-net) }, 'lose');
    else this.msg('pushMsg', {}, '');
    this.render();
  },
};

function bjValue(cards) {
  let total = 0, aces = 0;
  for (const c of cards) { if (c.rank === 14) { aces++; total += 11; } else total += Math.min(c.rank, 10); }
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return total;
}
function bjIsSoft(cards) {
  let total = 0, aces = 0;
  for (const c of cards) { if (c.rank === 14) { aces++; total += 11; } else total += Math.min(c.rank, 10); }
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return aces > 0;
}
function isBlackjack(cards) { return cards.length === 2 && bjValue(cards) === 21; }
function bjPointLabel(cards) {
  if (!cards.length) return '';
  const v = bjValue(cards);
  return v + (bjIsSoft(cards) ? ' (' + t('soft') + ')' : '') + (v > 21 ? ' ' + t('bust') + '!' : '');
}

/* ============================================================
   視訊撲克 Jacks or Better (9/6)
   ============================================================ */
const VideoPoker = {
  deck: [], hand: [], held: [], phase: 'bet', coin: 25, coins: 5,

  enter() { this.phase = 'bet'; this.hand = []; this.held = [false, false, false, false, false]; this._win = ''; this._winKey = null; this._winCls = ''; this.render(); },

  paytableHTML(hit) {
    const rows = [
      [t('royal5'), 800 * this.coin + ' ×', 'royal'],
      [t('pt_sf'), '50×', 'sf'], [t('pt_quads'), '25×', 'quads'], [t('pt_fh'), '9×', 'fh'],
      [t('pt_flush'), '6×', 'flush'], [t('pt_straight'), '4×', 'straight'], [t('pt_trips'), '3×', 'trips'],
      [t('pt_twopair'), '2×', 'twopair'], [t('pt_jacks'), '1×', 'jacks'],
    ];
    return `<table class="paytable">${rows.map(([n, p, k]) =>
      `<tr class="${hit === k ? 'hit' : ''}"><td>${n}</td><td>${p}</td></tr>`).join('')}</table>`;
  },

  render() {
    App.redraw = () => this.render();
    const cardsRow = (this.hand.length ? this.hand : [null, null, null, null, null]).map((c, i) => {
      const heldCls = this.held[i] ? 'held' : '';
      const sel = this.phase === 'draw' ? 'selectable' : '';
      const tag = this.held[i] ? `<div class="hold-tag">${t('hold')}</div>` : '';
      return `<div style="position:relative" data-i="${i}">${tag}${cardHTML(c, heldCls + ' ' + sel)}</div>`;
    }).join('');

    app.innerHTML = `
    ${tableHead('vpTitle')}
    <div class="table-wrap">
      <div class="felt" style="border-radius:24px">
        <div class="board-area">${this.paytableHTML(this._winKey)}</div>
        <div class="cards" style="gap:12px" id="vpCards">${cardsRow}</div>
        <div class="msg-bar ${this._winCls || ''}">${this._win || t('selectDeal')}</div>
      </div>
      <div class="controls" id="ctrls"></div>
    </div>`;

    if (this.phase === 'draw') {
      app.querySelectorAll('#vpCards [data-i]').forEach(d => d.onclick = () => { const i = +d.dataset.i; this.held[i] = !this.held[i]; this.render(); });
    }
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    const totalBet = this.coin * this.coins;
    if (this.phase === 'bet' || this.phase === 'done') {
      c.innerHTML = `<div class="grp">
          <span class="small">${t('perCoin')}</span>
          ${[5, 25, 100, 500].map(v => `<button class="btn sm ${this.coin === v ? 'primary' : 'ghost'}" data-coin="${v}">${v}</button>`).join('')}
          <span class="small">${t('numCoins')}</span>
          ${[1, 2, 3, 4, 5].map(v => `<button class="btn sm ${this.coins === v ? 'primary' : 'ghost'}" data-coins="${v}">${v}</button>`).join('')}
          <span class="bet-amt">${t('wager', { n: fmt(totalBet) })}</span>
        </div>
        <button class="btn primary" id="dealBtn">${t('deal')}</button>`;
      c.querySelectorAll('[data-coin]').forEach(b => b.onclick = () => { this.coin = +b.dataset.coin; this.render(); });
      c.querySelectorAll('[data-coins]').forEach(b => b.onclick = () => { this.coins = +b.dataset.coins; this.render(); });
      document.getElementById('dealBtn').onclick = () => this.deal();
    } else {
      c.innerHTML = `<span class="small">${t('clickHold')}</span>
        <button class="btn primary" id="drawBtn">${t('draw')}</button>`;
      document.getElementById('drawBtn').onclick = () => this.draw();
    }
  },

  deal() {
    const totalBet = this.coin * this.coins;
    if (totalBet > Bank.get()) return toast(t('notEnough'));
    Bank.add(-totalBet); refreshChips();
    this.deck = shuffle(freshDeck());
    this.hand = [0, 1, 2, 3, 4].map(() => this.deck.pop());
    this.held = [false, false, false, false, false];
    this._win = ''; this._winKey = null; this._winCls = '';
    this.phase = 'draw'; this.render();
  },

  draw() {
    for (let i = 0; i < 5; i++) if (!this.held[i]) this.hand[i] = this.deck.pop();
    this.phase = 'done'; this.evaluate();
  },

  evaluate() {
    const s = evaluate5(this.hand), coin = this.coin, coins = this.coins;
    let key = null, mult = 0;
    if (s.cat === 8) { if (s.tiebreak[0] === 14) { key = 'royal'; mult = (coins === 5) ? 800 : 250; } else { key = 'sf'; mult = 50; } }
    else if (s.cat === 7) { key = 'quads'; mult = 25; }
    else if (s.cat === 6) { key = 'fh'; mult = 9; }
    else if (s.cat === 5) { key = 'flush'; mult = 6; }
    else if (s.cat === 4) { key = 'straight'; mult = 4; }
    else if (s.cat === 3) { key = 'trips'; mult = 3; }
    else if (s.cat === 2) { key = 'twopair'; mult = 2; }
    else if (s.cat === 1 && s.tiebreak[0] >= 11) { key = 'jacks'; mult = 1; }

    const payout = mult * coin * coins;
    if (payout > 0) {
      Bank.add(payout); refreshChips(); Bank.record(payout - coin * coins);
      this._win = t('vpWin', { name: t('pt_' + key), n: fmt(payout) }); this._winCls = 'win';
    } else {
      Bank.record(-coin * coins);
      this._win = t('vpLose', { name: handName(s) }); this._winCls = 'lose';
    }
    this._winKey = key; this.render();
  },
};

/* ============================================================
   百家樂 Baccarat
   ============================================================ */
const Baccarat = {
  shoe: null, bets: { player: 0, banker: 0, tie: 0, ppair: 0, bpair: 0 }, sel: 'banker', phase: 'bet',
  playerCards: [], bankerCards: [],

  enter() { if (!this.shoe) this.shoe = new Shoe(8); this.phase = 'bet'; this.bets = { player: 0, banker: 0, tie: 0, ppair: 0, bpair: 0 }; this.playerCards = []; this.bankerCards = []; this._msg = ''; this._cls = ''; this.render(); },
  total(cards) { return cards.reduce((s, c) => s + (c.rank >= 10 ? 0 : (c.rank === 14 ? 1 : c.rank)), 0) % 10; },

  render() {
    App.redraw = () => this.render();
    const spots = [['player', t('bPlayer'), '1 : 1'], ['tie', t('bTie'), '8 : 1'], ['banker', t('bBanker'), '0.95 : 1']];
    const pairSpots = [['ppair', t('bPpair'), '11:1'], ['bpair', t('bBpair'), '11:1']];
    const totalBet = Object.values(this.bets).reduce((a, b) => a + b, 0);

    app.innerHTML = `
    ${tableHead('bacTitle')}
    <div class="table-wrap">
      <div class="felt">
        <div class="seat-row">
          <div class="seat"><div class="name">${t('bPlayer')} ${this.playerCards.length ? '· ' + this.total(this.playerCards) : ''}</div>
            <div class="cards">${this.playerCards.length ? cardsHTML(this.playerCards) : '<div class="small">—</div>'}</div></div>
          <div class="seat"><div class="name">${t('bBanker')} ${this.bankerCards.length ? '· ' + this.total(this.bankerCards) : ''}</div>
            <div class="cards">${this.bankerCards.length ? cardsHTML(this.bankerCards) : '<div class="small">—</div>'}</div></div>
        </div>
        <div class="baccarat-bets">
          ${spots.map(([k, n, o]) => `<div class="bet-spot ${this.sel === k ? 'sel' : ''}" data-spot="${k}">
            <div>${n}</div><div class="odd">${o}</div><div class="placed">${this.bets[k] ? fmt(this.bets[k]) : ''}</div></div>`).join('')}
        </div>
        <div class="baccarat-bets">
          ${pairSpots.map(([k, n, o]) => `<div class="bet-spot ${this.sel === k ? 'sel' : ''}" data-spot="${k}">
            <div>${n}</div><div class="odd">${o}</div><div class="placed">${this.bets[k] ? fmt(this.bets[k]) : ''}</div></div>`).join('')}
        </div>
      </div>
      <div class="msg-bar ${this._cls || ''}">${this._msg || t('bacBetInfo', { n: fmt(totalBet) })}</div>
      <div class="controls" id="ctrls"></div>
    </div>`;

    app.querySelectorAll('[data-spot]').forEach(d => d.onclick = () => { if (this.phase === 'bet') { this.sel = d.dataset.spot; this.render(); } });
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    const totalBet = Object.values(this.bets).reduce((a, b) => a + b, 0);
    if (this.phase === 'bet') {
      c.innerHTML = `<div class="grp">
        ${[5, 25, 100, 500].map(v => `<div class="chip-btn chip-${v}" data-add="${v}">${v}</div>`).join('')}
        <button class="btn ghost sm" id="clr">${t('clear')}</button></div>
        <button class="btn primary" id="dealBtn" ${totalBet > 0 ? '' : 'disabled'}>${t('deal')}</button>`;
      c.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
        const v = +b.dataset.add;
        if (totalBet + v > Bank.get()) return toast(t('notEnough'));
        this.bets[this.sel] += v; this.render();
      });
      document.getElementById('clr').onclick = () => { this.bets = { player: 0, banker: 0, tie: 0, ppair: 0, bpair: 0 }; this.render(); };
      document.getElementById('dealBtn').onclick = () => this.deal();
    } else {
      c.innerHTML = `<button class="btn primary" id="again">${t('playAgain')}</button>
        <button class="btn ghost" onclick="renderLobby()">${t('leaveTable')}</button>`;
      document.getElementById('again').onclick = () => this.enter();
    }
  },

  async deal() {
    const totalBet = Object.values(this.bets).reduce((a, b) => a + b, 0);
    if (totalBet > Bank.get()) return toast(t('notEnough'));
    Bank.add(-totalBet); refreshChips();
    this.phase = 'deal';
    const P = this.playerCards = [], B = this.bankerCards = [];
    P.push(this.shoe.draw()); this.render(); await sleep(280);
    B.push(this.shoe.draw()); this.render(); await sleep(280);
    P.push(this.shoe.draw()); this.render(); await sleep(280);
    B.push(this.shoe.draw()); this.render(); await sleep(360);

    let pt = this.total(P), bt = this.total(B);
    if (pt < 8 && bt < 8) {
      let playerThird = null;
      if (pt <= 5) { P.push(this.shoe.draw()); playerThird = P[2]; this.render(); await sleep(360); }
      bt = this.total(B);
      let bankerDraws = false;
      if (playerThird === null) bankerDraws = bt <= 5;
      else {
        const v = playerThird.rank >= 10 ? 0 : (playerThird.rank === 14 ? 1 : playerThird.rank);
        if (bt <= 2) bankerDraws = true;
        else if (bt === 3) bankerDraws = v !== 8;
        else if (bt === 4) bankerDraws = v >= 2 && v <= 7;
        else if (bt === 5) bankerDraws = v >= 4 && v <= 7;
        else if (bt === 6) bankerDraws = v === 6 || v === 7;
      }
      if (bankerDraws) { B.push(this.shoe.draw()); this.render(); await sleep(360); }
    }
    this.settle();
  },

  settle() {
    const P = this.playerCards, B = this.bankerCards;
    const pt = this.total(P), bt = this.total(B);
    const outcome = pt > bt ? 'player' : (bt > pt ? 'banker' : 'tie');
    const isPair = (cards) => cards.length >= 2 && cards[0].rank === cards[1].rank;
    let win = 0; const b = this.bets;
    if (outcome === 'player' && b.player) win += b.player * 2;
    if (outcome === 'banker' && b.banker) win += b.banker + Math.floor(b.banker * 0.95);
    if (outcome === 'tie') { if (b.tie) win += b.tie * 9; win += b.player + b.banker; }
    if (b.ppair && isPair(P)) win += b.ppair * 12;
    if (b.bpair && isPair(B)) win += b.bpair * 12;

    const totalBet = Object.values(b).reduce((a, x) => a + x, 0);
    Bank.add(win); refreshChips();
    const net = win - totalBet; Bank.record(net);
    const who = t(outcome === 'player' ? 'wonPlayer' : outcome === 'banker' ? 'wonBanker' : 'wonTie');
    let m = t('bacResult', { who, p: pt, b: bt });
    if (net > 0) m += ' — ' + t('youWon', { n: fmt(net) });
    else if (net < 0) m += ' — ' + t('youLost', { n: fmt(-net) });
    this._msg = m; this._cls = net > 0 ? 'win' : (net < 0 ? 'lose' : '');
    this.phase = 'done'; this.render();
  },
};

/* ============================================================
   德州撲克 No-Limit Hold'em (電腦陪玩多人，2~5 位 AI)
   ============================================================ */
// AI 對手陣容：每位有不同牌風 (bluff 詐唬率 / aggr 進攻率 / tight 保守度)
const AI_ROSTER = [
  { name: 'Mike', emoji: '🧔', bluff: 0.10, aggr: 0.60, tight: 0.00, styleKey: 'st_balanced' },
  { name: 'Sophie', emoji: '👩', bluff: 0.05, aggr: 0.42, tight: 0.11, styleKey: 'st_tight' },
  { name: 'King', emoji: '🤴', bluff: 0.18, aggr: 0.76, tight: -0.05, styleKey: 'st_aggr' },
  { name: 'Rocky', emoji: '🥊', bluff: 0.26, aggr: 0.88, tight: -0.12, styleKey: 'st_maniac' },
  { name: 'Nina', emoji: '👧', bluff: 0.03, aggr: 0.34, tight: 0.15, styleKey: 'st_rock' },
];

const Holdem = {
  players: [], deck: [], community: [], pot: 0, currentBet: 0, minRaise: 10,
  sb: 5, bb: 10, button: 0, phase: 'setup', toAct: 0, buyin: 500, _lastShowAll: false,
  N: 4, numOpp: 3, selBi: 500,

  enter() {
    const bank = Bank.get();
    if (bank < 100) { toast(t('needSit')); return renderLobby(); }
    this.numOpp = Math.min(this.numOpp || 3, 5);
    this.selBi = Math.min(500, bank);
    this.phase = 'setup'; this.renderSetup();
  },

  renderSetup() {
    App.redraw = () => this.renderSetup();
    const bank = Bank.get();
    const biOpts = [...new Set([100, 250, 500, 1000, Math.min(bank, 5000)])].filter(v => v >= 100 && v <= bank);
    if (!biOpts.includes(this.selBi)) this.selBi = biOpts[0];
    const oppOpts = [2, 3, 4, 5];
    const roster = AI_ROSTER.slice(0, this.numOpp);
    app.innerHTML = `
    ${tableHead('heTitle')}
    <div class="table-wrap"><div class="felt" style="justify-content:center;gap:18px">
      <div class="pot">${t('tableSetup')}</div>
      <div class="setup-row"><span class="setup-lbl">${t('numOpp')}</span>
        ${oppOpts.map(n => `<button class="btn sm ${this.numOpp === n ? 'primary' : 'ghost'}" data-opp="${n}">${n}</button>`).join('')}</div>
      <div class="opp-preview">${t('opponentsPreview')}: ${roster.map(a => `<span class="opp-chip">${a.emoji} ${a.name} · ${t(a.styleKey)}</span>`).join('')}</div>
      <div class="setup-row"><span class="setup-lbl">${t('buyinTitle')}</span>
        ${biOpts.map(v => `<button class="btn sm ${this.selBi === v ? 'primary' : 'ghost'}" data-bi="${v}">${fmt(v)}</button>`).join('')}</div>
      <div class="small">${t('buyinHint', { n: fmt(bank) })}</div>
      <button class="btn primary" id="startTable" style="font-size:16px;padding:13px 32px">${t('startTable')}</button>
    </div>
    <div class="msg-bar"></div>
    <div class="controls"><button class="btn ghost" onclick="renderLobby()">${t('back')}</button></div></div>`;
    app.querySelectorAll('[data-opp]').forEach(b => b.onclick = () => { this.numOpp = +b.dataset.opp; this.renderSetup(); });
    app.querySelectorAll('[data-bi]').forEach(b => b.onclick = () => { this.selBi = +b.dataset.bi; this.renderSetup(); });
    document.getElementById('startTable').onclick = () => this.start(this.selBi, this.numOpp);
  },

  start(bi, numOpp) {
    bi = Math.max(100, Math.min(bi, Bank.get(), 5000));
    this.buyin = bi; this.numOpp = Math.max(2, Math.min(numOpp || 3, 5));
    this.N = this.numOpp + 1;
    Bank.add(-bi); refreshChips();
    const mk = (name, emoji, human, ai) => ({ name, emoji, stack: bi, hole: [], bet: 0, folded: false, allin: false, isHuman: human, contrib: 0, lastAction: '', ...(ai || {}) });
    this.players = [mk(I18N.lang === 'zh' ? '你' : 'You', '🧑', true)];
    for (let i = 0; i < this.numOpp; i++) { const a = AI_ROSTER[i]; this.players.push(mk(a.name, a.emoji, false, { bluff: a.bluff, aggr: a.aggr, tight: a.tight })); }
    this.button = Math.floor(Math.random() * this.N);
    this.newHand();
  },

  leave() { const stack = this.players[0].stack; Bank.add(stack); refreshChips(); toast(t('leftWith', { n: fmt(stack) })); renderLobby(); },

  newHand() {
    if (this.players[0].stack <= 0) { alert(t('bust100')); return renderLobby(); }
    this.players.forEach(p => {
      if (!p.isHuman && p.stack <= 0) p.stack = this.buyin;
      p.hole = []; p.bet = 0; p.folded = false; p.allin = false; p.contrib = 0; p.lastAction = ''; p.acted = false;
    });
    this.deck = shuffle(freshDeck());
    this.community = []; this.pot = 0; this.currentBet = 0; this.minRaise = this.bb;
    this.button = (this.button + 1) % this.N; this.phase = 'preflop'; this._msg = ''; this._cls = ''; this._handOver = false;
    for (let k = 0; k < 2; k++) for (const p of this.players) p.hole.push(this.deck.pop());
    const sbPos = (this.button + 1) % this.N, bbPos = (this.button + 2) % this.N;
    this.postBlind(sbPos, this.sb); this.postBlind(bbPos, this.bb);
    this.currentBet = this.bb; this.minRaise = this.bb;
    this.toAct = (this.button + 3) % this.N;
    this.render(); this.continueLoop();
  },

  postBlind(pos, amt) { const p = this.players[pos]; const a = Math.min(amt, p.stack); p.stack -= a; p.bet = a; p.contrib += a; this.pot += a; if (p.stack === 0) p.allin = true; },
  activeCount() { return this.players.filter(p => !p.folded).length; },
  canActCount() { return this.players.filter(p => !p.folded && !p.allin).length; },

  async continueLoop() {
    if (this.activeCount() === 1) return this.endHand();
    if (this.roundComplete()) return this.nextStreet();
    const p = this.players[this.toAct];
    if (p.folded || p.allin) { this.advance(); return this.continueLoop(); }
    if (p.isHuman) { this.render(); return; }
    this.render();
    await sleep(650 + Math.random() * 450);
    this.aiAct(p); this.advance(); this.continueLoop();
  },

  roundComplete() {
    const inHand = this.players.filter(p => !p.folded);
    if (inHand.length <= 1) return true;
    const acters = inHand.filter(p => !p.allin);
    if (acters.length === 0) return true;
    return acters.every(p => p.bet === this.currentBet && p.acted);
  },

  advance() { let i = this.toAct; for (let k = 0; k < this.N; k++) { i = (i + 1) % this.N; const p = this.players[i]; if (!p.folded && !p.allin) { this.toAct = i; return; } } this.toAct = i; },

  nextStreet() {
    this.players.forEach(p => { p.bet = 0; p.acted = false; });
    this.currentBet = 0; this.minRaise = this.bb;
    if (this.phase === 'preflop') { this.phase = 'flop'; this.deck.pop(); this.community.push(this.deck.pop(), this.deck.pop(), this.deck.pop()); }
    else if (this.phase === 'flop') { this.phase = 'turn'; this.deck.pop(); this.community.push(this.deck.pop()); }
    else if (this.phase === 'turn') { this.phase = 'river'; this.deck.pop(); this.community.push(this.deck.pop()); }
    else if (this.phase === 'river') return this.showdown();

    if (this.canActCount() <= 1 && this.activeCount() > 1) { this.render(); setTimeout(() => this.fastForward(), 750); return; }
    this.toAct = this.button; this.advance(); this.render(); this.continueLoop();
  },

  fastForward() { while (this.community.length < 5) { this.deck.pop(); this.community.push(this.deck.pop()); } this.phase = 'river'; this.showdown(); },

  aiAct(p) {
    const toCall = this.currentBet - p.bet;
    const strength = this.handStrength(p);
    const potOdds = toCall / (this.pot + toCall + 1);
    const r = Math.random();
    p.acted = true;
    // 依性格調整：tight 越高越保守、aggr 越高越常加注、bluff 越高越常詐唬
    const tight = p.tight || 0, aggr = p.aggr != null ? p.aggr : 0.6, bluffP = p.bluff != null ? p.bluff : 0.1;
    const bluff = r < bluffP;
    const emo = (e) => (Math.random() < 0.5 ? ' ' + e : '');

    if (toCall === 0) {
      if (strength > 0.55 + tight || (bluff && r < 0.05)) { const bet = this.aiBetSize(p, strength); this.doRaise(p, bet); p.lastAction = t('aBet', { n: fmt(bet) }) + (bluff ? emo('😏') : emo('💪')); }
      else p.lastAction = t('aCheck');
      return;
    }
    if (strength < potOdds - 0.05 + tight && !bluff) {
      if (toCall <= this.bb && strength > 0.15) { this.doCall(p); p.lastAction = t('aCall', { n: fmt(toCall) }); }
      else { p.folded = true; p.lastAction = t('aFold') + emo('😒'); }
      return;
    }
    if ((strength > 0.72 + tight && r < aggr) || bluff) {
      const raise = this.aiBetSize(p, strength);
      if (raise > toCall) { this.doRaise(p, raise); p.lastAction = t('aRaiseTo', { n: fmt(this.currentBet) }) + (bluff ? emo('😏') : emo('🔥')); return; }
    }
    this.doCall(p);
    p.lastAction = p.allin ? t('aAllinCall') : t('aCall', { n: fmt(toCall) });
  },

  aiBetSize(p, strength) {
    let amt = Math.round(this.pot * (0.4 + strength * 0.5) / this.bb) * this.bb;
    amt = Math.max(this.currentBet + this.minRaise, amt);
    return Math.min(amt, p.stack + p.bet);
  },

  handStrength(p) {
    if (this.community.length === 0) return this.preflopStrength(p.hole);
    const ev = evaluateBest(p.hole.concat(this.community));
    let s = ev.cat / 8;
    if (ev.cat === 0) s = 0.12 + (ev.tiebreak[0] - 2) / 12 * 0.2;
    else if (ev.cat === 1) s = 0.32 + (ev.tiebreak[0] >= 11 ? 0.12 : 0);
    else if (ev.cat === 2) s = 0.55;
    else if (ev.cat === 3) s = 0.68;
    else if (ev.cat >= 4) s = Math.min(0.99, 0.75 + (ev.cat - 4) * 0.05);
    return s;
  },

  preflopStrength(hole) {
    const [a, b] = hole.map(c => c.rank).sort((x, y) => y - x);
    const suited = hole[0].suit === hole[1].suit, pair = a === b;
    let s;
    if (pair) s = 0.5 + (a - 2) / 12 * 0.45;
    else { s = (a + b) / 28 * 0.5; if (suited) s += 0.08; const gap = a - b; if (gap === 1) s += 0.06; else if (gap === 2) s += 0.03; if (a === 14) s += 0.05; }
    return Math.min(0.95, s);
  },

  doCall(p) { const toCall = Math.min(this.currentBet - p.bet, p.stack); p.stack -= toCall; p.bet += toCall; p.contrib += toCall; this.pot += toCall; if (p.stack === 0) p.allin = true; },
  doRaise(p, targetTotal) {
    const add = Math.min(targetTotal - p.bet, p.stack);
    p.stack -= add; p.bet += add; p.contrib += add; this.pot += add;
    const raiseSize = p.bet - this.currentBet;
    if (raiseSize >= this.minRaise) this.minRaise = raiseSize;
    this.currentBet = Math.max(this.currentBet, p.bet);
    if (p.stack === 0) p.allin = true;
    this.players.forEach(x => { if (x !== p && !x.folded && !x.allin) x.acted = false; });
  },

  humanFold() { const p = this.players[0]; p.folded = true; p.acted = true; p.lastAction = t('aFold'); this.advance(); this.continueLoop(); },
  humanCall() { const p = this.players[0]; p.acted = true; const toCall = this.currentBet - p.bet; this.doCall(p); p.lastAction = toCall === 0 ? t('aCheck') : (p.allin ? t('allin') : t('aCall', { n: fmt(toCall) })); this.advance(); this.continueLoop(); },
  humanRaise(total) { const p = this.players[0]; p.acted = true; this.doRaise(p, total); p.lastAction = p.allin ? t('aAllin', { n: fmt(p.bet) }) : t('aRaiseTo', { n: fmt(this.currentBet) }); this.advance(); this.continueLoop(); },

  showdown() {
    this.phase = 'showdown';
    this.players.filter(p => !p.folded).forEach(p => p.score = evaluateBest(p.hole.concat(this.community)));
    this.distributePots(); this.render(true);
  },
  endHand() { this.phase = 'showdown'; this.distributePots(); this.render(false); },

  distributePots() {
    const ps = this.players.map(p => ({ ref: p, contrib: p.contrib, folded: p.folded }));
    const pots = [];
    while (true) {
      const contribs = ps.filter(x => x.contrib > 0);
      if (contribs.length === 0) break;
      const min = Math.min(...contribs.map(x => x.contrib));
      let amount = 0; const eligible = [];
      for (const x of contribs) { amount += min; x.contrib -= min; if (!x.folded) eligible.push(x.ref); }
      if (pots.length && sameSet(pots[pots.length - 1].eligible, eligible)) pots[pots.length - 1].amount += amount;
      else pots.push({ amount, eligible });
    }
    const winsLog = [];
    for (const pot of pots) {
      if (pot.eligible.length === 0) continue;
      let best = null;
      for (const pl of pot.eligible) if (!best || compareScore(pl.score, best.score) > 0) best = pl;
      const winners = pot.eligible.filter(pl => compareScore(pl.score, best.score) === 0);
      const share = Math.floor(pot.amount / winners.length);
      winners.forEach(w => w.stack += share);
      winners[0].stack += pot.amount - share * winners.length;
      winsLog.push({ winners, name: best.score ? handName(best.score) : '' });
    }
    if (this.activeCount() === 1) { const w = this.players.find(p => !p.folded); this._msg = t('winPot', { name: w.name }); }
    else { const main = winsLog[0]; this._msg = t('winShow', { names: main.winners.map(w => w.name).join(', '), hand: main.name }); }
    refreshChips(); this._handOver = true;
  },

  render(showAll) {
    if (showAll !== undefined) this._lastShowAll = showAll; else showAll = this._lastShowAll;
    App.redraw = () => this.render(this._lastShowAll);
    const seats = this.players.map((p, i) => {
      const isBtn = i === this.button;
      const activeCls = (this.toAct === i && this.phase !== 'showdown' && !p.folded && !p.allin) ? 'active' : '';
      let holeHTML;
      if (p.folded) holeHTML = `<div class="small">${t('folded')}</div>`;
      else if (p.isHuman || this.phase === 'showdown' || showAll) holeHTML = cardsHTML(p.hole, 'sm');
      else holeHTML = cardHTML(null, 'sm') + cardHTML(null, 'sm');
      return `<div class="seat ${activeCls} ${p.folded ? 'folded' : ''}">
        <div class="name">${p.emoji || ''} ${p.name}${isBtn ? ' 🔘' : ''}</div>
        <div class="cards">${holeHTML}</div>
        <div class="chips">${t('stackLbl', { n: fmt(p.stack) })}</div>
        <div class="status">${p.bet ? t('betLbl', { n: fmt(p.bet) }) + ' ' : ''}${p.lastAction || ''}</div>
      </div>`;
    });
    const phaseName = t('ph_' + this.phase);

    app.innerHTML = `
    ${tableHead('heTitle')}
    <div class="table-wrap">
      <div class="felt">
        <div class="seat-row">${seats.slice(1).join('')}</div>
        <div class="board-area">
          <div class="pot">${t('pot')} ${fmt(this.pot)} · ${phaseName}</div>
          <div class="cards">${this.community.length ? cardsHTML(this.community) : `<div class="small">${t('waitFlop')}</div>`}</div>
        </div>
        <div class="seat-row">${seats[0]}</div>
      </div>
      <div class="msg-bar ${this._cls || ''}">${this._msg || (this.phase === 'showdown' ? '' : t('blinds') + ' ' + this.sb + '/' + this.bb)}</div>
      <div class="controls" id="ctrls"></div>
    </div>`;
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    const p = this.players[0];
    if (this.phase === 'showdown' || this._handOver) {
      c.innerHTML = `<button class="btn primary" id="next">${t('nextHand')}</button>
        <button class="btn ghost" id="leave">${t('leaveBtn', { n: fmt(p.stack) })}</button>`;
      document.getElementById('next').onclick = () => { this._handOver = false; this._msg = ''; this._cls = ''; this.newHand(); };
      document.getElementById('leave').onclick = () => this.leave();
      return;
    }
    if (this.toAct !== 0 || p.folded || p.allin) { c.innerHTML = `<span class="small">${t('waitOthers')}</span>`; return; }
    const toCall = this.currentBet - p.bet;
    const callTxt = toCall === 0 ? t('check') : (toCall >= p.stack ? t('allinCall', { n: fmt(p.stack) }) : t('call', { n: fmt(toCall) }));
    const minRaiseTotal = this.currentBet + this.minRaise;
    const maxRaiseTotal = p.bet + p.stack;
    const canRaise = maxRaiseTotal > this.currentBet && p.stack > toCall;
    const defaultRaise = Math.min(maxRaiseTotal, Math.max(minRaiseTotal, this.pot + toCall));

    c.innerHTML = `
      <button class="btn danger" id="fold">${t('fold')}</button>
      <button class="btn primary" id="call">${callTxt}</button>
      ${canRaise ? `<div class="slider-wrap">
          <input type="range" id="rSlider" min="${minRaiseTotal}" max="${maxRaiseTotal}" step="${this.bb}" value="${Math.min(defaultRaise, maxRaiseTotal)}">
          <span class="bet-amt" id="rVal">${fmt(Math.min(defaultRaise, maxRaiseTotal))}</span>
          <button class="btn" id="raise">${t('raiseTo')}</button>
          <button class="btn ghost" id="allin">${t('allin')}</button>
        </div>` : ''}`;
    document.getElementById('fold').onclick = () => this.humanFold();
    document.getElementById('call').onclick = () => this.humanCall();
    if (canRaise) {
      const sl = document.getElementById('rSlider'), rv = document.getElementById('rVal');
      sl.oninput = () => rv.textContent = fmt(+sl.value);
      document.getElementById('raise').onclick = () => this.humanRaise(+sl.value);
      document.getElementById('allin').onclick = () => this.humanRaise(maxRaiseTotal);
    }
  },
};

function sameSet(a, b) { if (a.length !== b.length) return false; return a.every(x => b.includes(x)); }

/* ---------- 啟動 ---------- */
document.getElementById('brand').onclick = renderHome;
document.getElementById('langBtn').onclick = () => {
  I18N.set(I18N.lang === 'zh' ? 'en' : 'zh');
  applyStaticI18n();
  App.redraw();
};
applyStaticI18n();
refreshChips();
renderHome();  // 一開始顯示破產通知書
