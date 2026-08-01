/* ============================================================
   賭場撲克 - 核心引擎
   牌組、洗牌、撲克牌型判定、籌碼銀行
   ============================================================ */

const SUITS = ['♠', '♥', '♦', '♣'];
const SUIT_NAMES = { '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs' };
const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // 11=J 12=Q 13=K 14=A
const RANK_LABEL = { 11: 'J', 12: 'Q', 13: 'K', 14: 'A' };

function rankLabel(r) { return RANK_LABEL[r] || String(r); }

function makeCard(rank, suit) {
  return {
    rank, suit,
    red: (suit === '♥' || suit === '♦'),
    label: rankLabel(rank),
    id: rankLabel(rank) + suit,
  };
}

function freshDeck() {
  const d = [];
  for (const s of SUITS) for (const r of RANKS) d.push(makeCard(r, s));
  return d;
}

// Fisher–Yates 洗牌
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// 牌靴 (多副牌，賭場常用 6/8 副) —— 給 21 點 / 百家樂
class Shoe {
  constructor(numDecks = 6) {
    this.numDecks = numDecks;
    this.reset();
  }
  reset() {
    this.cards = [];
    for (let n = 0; n < this.numDecks; n++) this.cards.push(...freshDeck());
    shuffle(this.cards);
    // 切牌點：剩約 25% 時洗牌
    this.cutIndex = Math.floor(this.cards.length * 0.25);
  }
  draw() {
    if (this.cards.length <= this.cutIndex) this.reset();
    return this.cards.pop();
  }
  needsShuffle() { return this.cards.length <= this.cutIndex; }
}

/* ---------- 撲克牌型判定 (5 張 / 從 7 張取最佳) ---------- */

const HAND_NAMES = [
  '高牌',        // 0
  '一對',        // 1
  '兩對',        // 2
  '三條',        // 3
  '順子',        // 4
  '同花',        // 5
  '葫蘆',        // 6
  '四條',        // 7
  '同花順',      // 8
  '皇家同花順',  // 9 (特例，由同花順 + A 高判定)
];

// 評估 5 張牌 -> { cat, tiebreak:[...], name }
function evaluate5(cards) {
  const ranks = cards.map(c => c.rank).sort((a, b) => b - a);
  const suits = cards.map(c => c.suit);
  const isFlush = suits.every(s => s === suits[0]);

  // 統計每個點數出現次數
  const counts = {};
  for (const r of ranks) counts[r] = (counts[r] || 0) + 1;
  // 依 (次數, 點數) 排序
  const groups = Object.keys(counts).map(Number).sort((a, b) => {
    if (counts[b] !== counts[a]) return counts[b] - counts[a];
    return b - a;
  });

  // 順子判定
  const uniq = [...new Set(ranks)];
  let straightHigh = 0;
  if (uniq.length === 5) {
    if (uniq[0] - uniq[4] === 4) straightHigh = uniq[0];
    // A-2-3-4-5 (輪子)，A 當 1
    else if (uniq[0] === 14 && uniq[1] === 5 && uniq[4] === 2) straightHigh = 5;
  }

  const countPattern = groups.map(r => counts[r]).join('');

  let cat, tiebreak;
  if (isFlush && straightHigh) { cat = 8; tiebreak = [straightHigh]; }
  else if (countPattern === '41') { cat = 7; tiebreak = [groups[0], groups[1]]; }
  else if (countPattern === '32') { cat = 6; tiebreak = [groups[0], groups[1]]; }
  else if (isFlush) { cat = 5; tiebreak = ranks; }
  else if (straightHigh) { cat = 4; tiebreak = [straightHigh]; }
  else if (countPattern === '311') { cat = 3; tiebreak = [groups[0], groups[1], groups[2]]; }
  else if (countPattern === '221') { cat = 2; tiebreak = [groups[0], groups[1], groups[2]]; }
  else if (countPattern === '2111') { cat = 1; tiebreak = groups; }
  else { cat = 0; tiebreak = ranks; }

  let name = HAND_NAMES[cat];
  if (cat === 8 && straightHigh === 14) name = HAND_NAMES[9]; // 皇家同花順

  return { cat, tiebreak, name };
}

function compareScore(a, b) {
  if (a.cat !== b.cat) return a.cat - b.cat;
  for (let i = 0; i < Math.max(a.tiebreak.length, b.tiebreak.length); i++) {
    const x = a.tiebreak[i] || 0, y = b.tiebreak[i] || 0;
    if (x !== y) return x - y;
  }
  return 0;
}

// 從 5~7 張取最佳 5 張
function combinations(arr, k) {
  const res = [];
  const combo = [];
  (function pick(start) {
    if (combo.length === k) { res.push(combo.slice()); return; }
    for (let i = start; i < arr.length; i++) { combo.push(arr[i]); pick(i + 1); combo.pop(); }
  })(0);
  return res;
}

function evaluateBest(cards) {
  if (cards.length <= 5) return { ...evaluate5(cards), best: cards };
  let best = null, bestCombo = null;
  for (const c of combinations(cards, 5)) {
    const s = evaluate5(c);
    if (!best || compareScore(s, best) > 0) { best = s; bestCombo = c; }
  }
  return { ...best, best: bestCombo };
}

// 三張牌牌型 (三張撲克用)。注意：順子 > 同花 (因三張時順子較稀有)
// cat: 0高牌 1對 2同花 3順子 4三條 5同花順
function evaluate3(cards) {
  const ranks = cards.map(c => c.rank).sort((a, b) => b - a);
  const suits = cards.map(c => c.suit);
  const isFlush = suits.every(s => s === suits[0]);
  const counts = {}; ranks.forEach(r => counts[r] = (counts[r] || 0) + 1);
  const uniq = [...new Set(ranks)];
  let straightHigh = 0;
  if (uniq.length === 3) {
    if (ranks[0] - ranks[2] === 2) straightHigh = ranks[0];
    else if (ranks[0] === 14 && ranks[1] === 3 && ranks[2] === 2) straightHigh = 3; // A-2-3 最小順
  }
  let cat, tiebreak;
  if (straightHigh && isFlush) { cat = 5; tiebreak = [straightHigh]; }
  else if (uniq.length === 1) { cat = 4; tiebreak = [ranks[0]]; }
  else if (straightHigh) { cat = 3; tiebreak = [straightHigh]; }
  else if (isFlush) { cat = 2; tiebreak = ranks; }
  else if (uniq.length === 2) {
    const pr = Number(Object.keys(counts).find(r => counts[r] === 2));
    const kick = Number(Object.keys(counts).find(r => counts[r] === 1));
    cat = 1; tiebreak = [pr, kick];
  } else { cat = 0; tiebreak = ranks; }
  return { cat, tiebreak };
}

// 四張牌型 (四張撲克 / 瘋狂四張)。cat: 0高牌 1對 2兩對 3順子 4同花 5三條 6同花順 7四條
function evaluate4(cards) {
  const ranks = cards.map(c => c.rank).sort((a, b) => b - a);
  const suits = cards.map(c => c.suit);
  const isFlush = suits.every(s => s === suits[0]);
  const counts = {}; ranks.forEach(r => counts[r] = (counts[r] || 0) + 1);
  const groups = Object.keys(counts).map(Number).sort((a, b) => counts[b] - counts[a] || b - a);
  const uniq = [...new Set(ranks)];
  let straightHigh = 0;
  if (uniq.length === 4) {
    if (ranks[0] - ranks[3] === 3) straightHigh = ranks[0];
    else if (ranks[0] === 14 && ranks[1] === 4 && ranks[2] === 3 && ranks[3] === 2) straightHigh = 4; // A-2-3-4
  }
  const patt = groups.map(r => counts[r]).join('');
  let cat, tb;
  if (patt === '4') { cat = 7; tb = [groups[0]]; }
  else if (straightHigh && isFlush) { cat = 6; tb = [straightHigh]; }
  else if (patt === '31') { cat = 5; tb = groups; }
  else if (isFlush) { cat = 4; tb = ranks; }
  else if (straightHigh) { cat = 3; tb = [straightHigh]; }
  else if (patt === '22') { cat = 2; tb = groups; }
  else if (patt === '211') { cat = 1; tb = groups; }
  else { cat = 0; tb = ranks; }
  return { cat, tiebreak: tb };
}
function evaluateBest4(cards) {
  if (cards.length <= 4) return evaluate4(cards);
  let best = null;
  for (const c of combinations(cards, 4)) { const s = evaluate4(c); if (!best || compareScore(s, best) > 0) best = s; }
  return best;
}

// 奧馬哈評牌：必須用剛好 2 張手牌 + 3 張公用牌
function omahaEval(hole, community) {
  let best = null;
  const h2 = combinations(hole, 2), c3 = combinations(community, 3);
  for (const a of h2) for (const b of c3) { const s = evaluate5(a.concat(b)); if (!best || compareScore(s, best) > 0) best = s; }
  return best;
}

/* ---------- 籌碼銀行 (localStorage 保存) ---------- */

const Bank = {
  KEY: 'casino_chips_v1',
  STATS_KEY: 'casino_stats_v1',
  get() {
    const v = parseInt(localStorage.getItem(this.KEY), 10);
    return isNaN(v) ? 1000 : v;
  },
  set(v) { localStorage.setItem(this.KEY, String(Math.max(0, Math.round(v)))); },
  add(v) { this.set(this.get() + v); return this.get(); },
  stats() {
    try { return JSON.parse(localStorage.getItem(this.STATS_KEY)) || { hands: 0, won: 0, biggest: 0, peak: 1000 }; }
    catch (e) { return { hands: 0, won: 0, biggest: 0, peak: 1000 }; }
  },
  saveStats(s) { localStorage.setItem(this.STATS_KEY, JSON.stringify(s)); },
  record(net) {
    const s = this.stats();
    s.hands++;
    if (net > 0) { s.won++; if (net > s.biggest) s.biggest = net; }
    s.peak = Math.max(s.peak || 0, this.get());
    this.saveStats(s);
  },
};

function fmt(n) { return n.toLocaleString('en-US'); }
