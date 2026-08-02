/* ============================================================
   撲克遊戲 - 第 2 批遊戲模組
   三張撲克 / 終極德州撲克 / 加勒比海撲克 / 狂歡梭哈 / 龍虎鬥 / 賭場戰爭
   ============================================================ */

/* ---------- 補充多國語言 ---------- */
Object.assign(I18N.dict.zh, {
  // 首頁 / 破產通知
  homeEnter: '拿這筆錢進場 →', homeSub: '點擊入場，坐上牌桌翻身',
  bkTitle: '破 產 通 知 書', bkOfficial: '財務清算 · 資產處分通知',
  bkNo: '案號', bkDate: '通知日期', bkPayee: '受款人',
  bkBody: '茲通知台端：您名下所有資產、房產、車輛與存款，業經法院清算完畢。扣除全部債務後，僅餘下列款項發還。望善加運用，東山再起。',
  bkStamp: '破產', bkSign: '清算人 簽章',
  billNote: '你破產了 — 只剩下這些錢', billBrand: '撲克信用憑證 · 見票即付',
  // 分類
  catVs: '玩家互相對抗', catDealer: '玩家對抗莊家', catOther: '其他熱門紙牌',
  soon: '即將推出',
  buyinTitle: '選擇買入金額', buyinHint: '你目前有 {n} 籌碼 · 離桌時帶走剩餘籌碼',
  tableSetup: '牌桌設定', numOpp: '對手人數', opponentsPreview: '同桌對手', startTable: '入座開打 →',
  st_balanced: '穩健', st_tight: '保守', st_aggr: '進攻', st_maniac: '瘋狂', st_rock: '岩石',
  bjSeats: '同桌玩家', bjAiPlaying: '{name} 思考中…',
  startGame: '開始遊戲 →',
  howto_holdem: '你和 3 位電腦玩家對戰，莊家位置每局輪換。|每人先發 2 張底牌，桌面再陸續翻出 5 張公用牌。|用手中 2 張搭配公用牌，湊出最強的 5 張牌。|每一輪可下注、跟注、加注或蓋牌，比牌大或逼退對手。',
  howto_threecard: '先下「底注」，也可加押「對子紅利」。|你和莊家各發 3 張牌。|看牌後決定跟注(再下一注)或棄牌。|莊家需 Q 高以上才成立，牌大者勝。注意：順子大於同花!',
  howto_ultimateth: '先下相等的「底注」與「盲注」，可另押「三條紅利」。|越早下注，倍數越高(翻牌前最高 4 倍)。|以 2 張底牌加 5 張公用牌和莊家比大小。|莊家需一對以上才成立，盲注在大牌時另有加彩。',
  howto_caribbean: '先下「底注」，你和莊家各發 5 張(莊家亮 1 張)。|看牌後決定加注(底注 2 倍)或棄牌。|莊家需「A-K 高」以上才成立。|莊家成立且你贏，加注依牌型賠付，皇家同花順最高 100 倍。',
  howto_letitride: '一次下三注，發你 3 張牌與 2 張蓋著的公用牌。|看牌後可「收回」一注，或「保留」讓它留在桌上。|翻開第 1 張公用牌，再決定第二注。|最終湊出「一對 10 或以上」才中獎，皇家同花順最高 1000 倍。',
  howto_dragontiger: '押「龍」、「虎」或「和」。|龍與虎各發一張，比點數大小(A 最小、K 最大)。|點數大的一方獲勝，賠 1 賠 1。|押中「和」賠 8 倍；開和時龍虎注輸一半。',
  howto_casinowar: '下注後，你和莊家各發一張牌(A 最大)。|點數大者勝，賠 1 賠 1。|平手時可「宣戰」(再加一注)或「投降」(輸一半)。|宣戰後各補一張，只要不輸就贏，戰注賠 1 賠 1。',
  howto_baccarat: '押「閒」、「莊」或「和」，也可加押閒／莊對子。|閒莊各發 2 至 3 張，最接近 9 點者勝。|閒賠 1 賠 1；莊賠 0.95(抽 5% 水);和賠 8 倍。|10 與人頭牌算 0 點，總和只取個位數。',
  howto_blackjack: '下注後與莊家各發 2 張，莊家有一張明牌。|點數越接近 21 越好，但超過就「爆牌」。|可要牌、停牌、加倍，成對還能分牌。|前兩張 21 點賠 3 賠 2，莊家 17 點停牌。',
  howto_videopoker: '選好每枚硬幣與投注枚數後，發 5 張牌。|點選想保留的牌，其餘換掉。|換牌後依牌型賠付，一對 J 以上才中獎。|投滿 5 枚時，皇家同花順高達 800 倍!',
  howto_bigsmall: '下注後，你和莊家各發一張牌。|點數大的一方獲勝，賠 1 賠 1(A 最大)。|平手則退還本金。|一翻兩瞪眼，最直接的比大小!',
  // 遊戲名
  g_omaha: '奧馬哈撲克', g_stud7: '七張梭哈', g_deuce27: '2-7 三次換牌', g_horse: 'H.O.R.S.E.',
  g_threecard: '三張撲克', g_ultimateth: '終極德州撲克', g_caribbean: '加勒比海撲克',
  g_mississippi: '密西西比撲克', g_paigow: '牌九撲克', g_fourcard: '四張撲克',
  g_crazy4: '瘋狂四張撲克', g_thbonus: '德州紅利撲克', g_letitride: '狂歡梭哈',
  g_dragontiger: '龍虎鬥', g_casinowar: '賭場戰爭', g_bigsmall: '比大小',
  d_threecard: '下注底注與對子紅利，三張定勝負。順子大於同花!',
  d_ultimateth: '一注到底的德州撲克，越早下注賠越多。對抗莊家。',
  d_caribbean: '五張梭哈對莊家。莊家需 A-K 以上才算成立。',
  d_letitride: '三注下注，牌好留、牌壞收。湊出對 10 以上就贏。',
  d_dragontiger: '龍與虎各一張，比大小。最簡單刺激的紙牌。',
  d_casinowar: '一張定生死，比大小。平手可宣戰!',
  d_bigsmall: '最簡單的比牌：你和莊家各一張，點數大的贏。',
  // 共用
  ante: '底注 Ante', playBet: '加注 Play', fold: '棄牌 Fold', check: '過牌 Check',
  dealerQ: '莊家', playerQ: '你', dealerNoQualify: '莊家不成立', dealerQualifies: '莊家成立',
  push: '和局', win1: '贏', lose1: '輸', reveal: '開牌', deal: '發牌',
  pairPlus: '對子紅利', trips: '三條紅利', blindBet: '盲注 Blind', raise2x: '加注',
  // 三張撲克
  tc_hint: '底注必下 · 對子紅利選擇性', tc_play: '跟注 (×1)', tc_fold: '棄牌',
  tc3_0: '高牌', tc3_1: '一對', tc3_2: '同花', tc3_3: '順子', tc3_4: '三條', tc3_5: '同花順',
  // 終極德州
  uth_hint: '底注=盲注 · 三條紅利選擇性', uth_bet4: '下注 4×', uth_bet3: '下注 3×',
  uth_bet2: '下注 2×', uth_bet1: '下注 1×', uth_check: '過牌',
  // 加勒比 / 狂歡
  cs_raise: '加注 (×2)', cs_fold: '棄牌', lir_pull: '收回此注', lir_ride: '保留 Let It Ride',
  lir_unit: '每注', lir_hint: '共三注 · 前兩注可收回，第三注保留到底',
  // 龍虎 / 戰爭
  dt_dragon: '龍 Dragon', dt_tiger: '虎 Tiger', dt_tie: '和 Tie',
  war_war: '宣戰 (加注)', war_surr: '投降 (輸一半)', war_tieMsg: '平手! 宣戰或投降?',
  dragonWin: '龍勝', tigerWin: '虎勝', tieResult: '和局',
});
Object.assign(I18N.dict.en, {
  homeEnter: 'Take the money & play →', homeSub: 'Step in and win it back at the tables',
  bkTitle: 'NOTICE OF BANKRUPTCY', bkOfficial: 'Financial Liquidation · Asset Disposal Notice',
  bkNo: 'Case No.', bkDate: 'Date', bkPayee: 'Payee',
  bkBody: 'This is to notify you: all your assets, property, vehicles and deposits have been liquidated by the court. After settling all debts, only the amount below is returned to you. Use it wisely and make your comeback.',
  bkStamp: 'BANKRUPT', bkSign: 'Liquidator Signature',
  billNote: "You're bankrupt — this is all you have left", billBrand: 'POKER CREDIT NOTE · PAY ON DEMAND',
  catVs: 'Player vs Player', catDealer: 'Player vs Dealer', catOther: 'Other Popular Card Games',
  soon: 'Coming soon',
  buyinTitle: 'Choose your buy-in', buyinHint: 'You have {n} chips · take your stack when you leave',
  tableSetup: 'Table Setup', numOpp: 'Opponents', opponentsPreview: 'At your table', startTable: 'Take a Seat →',
  st_balanced: 'Balanced', st_tight: 'Tight', st_aggr: 'Aggressive', st_maniac: 'Maniac', st_rock: 'Rock',
  bjSeats: 'Players', bjAiPlaying: '{name} thinking…',
  startGame: 'Start Game →',
  howto_holdem: 'Play against 3 computer opponents; the dealer button rotates each hand.|Everyone gets 2 hole cards, then 5 community cards are dealt out.|Make your best 5-card hand from your 2 cards plus the shared cards.|Each round you can bet, call, raise or fold — outdraw or outlast the rest.',
  howto_threecard: 'Place an Ante; you may also add a Pair Plus side bet.|You and the dealer each receive 3 cards.|After seeing yours, choose to Play (match your Ante) or Fold.|The dealer needs Queen-high to qualify, then the higher hand wins. Note: a straight beats a flush!',
  howto_ultimateth: 'Post equal Ante and Blind; you may add a Trips bonus.|The earlier you make the Play bet, the bigger it can be (up to 4× pre-flop).|Beat the dealer using your 2 hole cards and 5 community cards.|The dealer needs a pair to qualify; the Blind pays a bonus on strong hands.',
  howto_caribbean: 'Place an Ante; you and the dealer get 5 cards (one dealer card shown).|After seeing yours, Raise (2× Ante) or Fold.|The dealer must have Ace-King high or better to qualify.|If the dealer qualifies and you win, the Raise pays by hand — up to 100× for a royal flush.',
  howto_letitride: 'Make three equal bets; get 3 cards plus 2 face-down community cards.|Pull a bet back on weak cards, or let it ride.|Reveal the first community card, then decide on the second bet.|A pair of 10s or better pays — up to 1000× for a royal flush.',
  howto_dragontiger: 'Bet on Dragon, Tiger or Tie.|One card goes to each side; higher rank wins (Ace low, King high).|The higher side wins even money.|A Tie pays 8×; on a tie, Dragon and Tiger bets lose half.',
  howto_casinowar: 'After betting, you and the dealer each get one card (Ace high).|The higher card wins even money.|On a tie, Go to War (add a bet) or Surrender (lose half).|In war you each draw one more card — tie or win, and your war bet pays even money.',
  howto_baccarat: 'Bet on Player, Banker or Tie — or on a Player/Banker pair.|Each side draws 2–3 cards; closest to 9 wins.|Player pays 1:1, Banker 0.95:1 (5% commission), Tie 8:1.|Tens and face cards count as 0 — only the last digit of the total matters.',
  howto_blackjack: 'After betting, you and the dealer get 2 cards; one dealer card is face up.|Get as close to 21 as you can without going over (busting).|Hit, stand, double down, or split a pair.|A Blackjack (21 on your first two cards) pays 3:2; the dealer stands on 17.',
  howto_videopoker: 'Choose your coin size and number of coins, then get 5 cards.|Click the cards you want to keep; the rest are replaced.|After the draw you\'re paid by hand — Jacks or better wins.|Bet the full 5 coins and a royal flush pays up to 800×!',
  howto_bigsmall: 'After betting, you and the dealer each get one card.|The higher card wins, paying even money (Ace high).|A tie returns your bet.|Fast and simple — highest card takes it!',
  g_omaha: 'Omaha Hold\'em', g_stud7: 'Seven-Card Stud', g_deuce27: '2-7 Triple Draw', g_horse: 'H.O.R.S.E.',
  g_threecard: 'Three Card Poker', g_ultimateth: 'Ultimate Texas Hold\'em', g_caribbean: 'Caribbean Stud',
  g_mississippi: 'Mississippi Stud', g_paigow: 'Pai Gow Poker', g_fourcard: 'Four Card Poker',
  g_crazy4: 'Crazy 4 Poker', g_thbonus: "Texas Hold'em Bonus", g_letitride: 'Let It Ride',
  g_dragontiger: 'Dragon Tiger', g_casinowar: 'Casino War', g_bigsmall: 'Hi-Lo Showdown',
  d_threecard: 'Bet Ante and Pair Plus. Three cards decide it. Straight beats flush!',
  d_ultimateth: 'One bet, ride it out. Bet earlier to win more. You vs the dealer.',
  d_caribbean: 'Five-card stud vs the dealer. Dealer needs A-K or better to qualify.',
  d_letitride: 'Three bets — keep them on good cards, pull them on bad. Pair of 10s wins.',
  d_dragontiger: 'One card each for Dragon and Tiger. Simplest thrill in cards.',
  d_casinowar: 'One card decides it all. Go to war on a tie!',
  d_bigsmall: 'The simplest showdown: one card each, higher card wins.',
  ante: 'Ante', playBet: 'Play', fold: 'Fold', check: 'Check',
  dealerQ: 'Dealer', playerQ: 'You', dealerNoQualify: 'Dealer does not qualify', dealerQualifies: 'Dealer qualifies',
  push: 'Push', win1: 'Win', lose1: 'Lose', reveal: 'Reveal', deal: 'Deal',
  pairPlus: 'Pair Plus', trips: 'Trips Bonus', blindBet: 'Blind', raise2x: 'Raise',
  tc_hint: 'Ante required · Pair Plus optional', tc_play: 'Play (×1)', tc_fold: 'Fold',
  tc3_0: 'High Card', tc3_1: 'Pair', tc3_2: 'Flush', tc3_3: 'Straight', tc3_4: 'Three of a Kind', tc3_5: 'Straight Flush',
  uth_hint: 'Ante = Blind · Trips optional', uth_bet4: 'Bet 4×', uth_bet3: 'Bet 3×',
  uth_bet2: 'Bet 2×', uth_bet1: 'Bet 1×', uth_check: 'Check',
  cs_raise: 'Raise (×2)', cs_fold: 'Fold', lir_pull: 'Pull this bet', lir_ride: 'Let It Ride',
  lir_unit: 'Per bet', lir_hint: 'Three bets · pull the first two, the third rides to the end',
  dt_dragon: 'Dragon', dt_tiger: 'Tiger', dt_tie: 'Tie',
  war_war: 'Go to War (raise)', war_surr: 'Surrender (lose half)', war_tieMsg: 'Tie! Go to war or surrender?',
  dragonWin: 'Dragon wins', tigerWin: 'Tiger wins', tieResult: 'Tie',
});

function chipsRow(ids = [5, 25, 100, 500]) {
  return ids.map(v => `<div class="chip-btn chip-${v}" data-add="${v}">${v}</div>`).join('');
}
function handName3(sc) { return t('tc3_' + sc.cat); }
function resultCls(net) { return net > 0 ? 'win' : (net < 0 ? 'lose' : ''); }

/* ============================================================
   三張撲克 Three Card Poker
   ============================================================ */
const TCP_PAIRPLUS = { 1: 1, 2: 3, 3: 6, 4: 30, 5: 40 };      // 依 3 張牌型
const TCP_ANTEBONUS = { 3: 1, 4: 4, 5: 5 };                    // 順子/三條/同花順

const ThreeCard = {
  deck: [], player: [], dealer: [], ante: 25, pairplus: 0, play: 0, sel: 'ante', phase: 'bet',
  enter() { this.player = []; this.dealer = []; this.ante = 25; this.pairplus = 0; this.play = 0; this.sel = 'ante'; this.phase = 'bet'; this._msg = ''; this._cls = ''; this.render(); },

  render() {
    App.redraw = () => this.render();
    const show = this.phase === 'done';
    const dealerCards = this.dealer.length ? (show ? cardsHTML(this.dealer) : cardsHTML([null, null, null])) : '<div class="small">—</div>';
    const spots = [['ante', t('ante'), '1:1'], ['pairplus', t('pairPlus'), '1~40:1']];
    app.innerHTML = `
    ${tableHead('g_threecard')}
    <div class="table-wrap"><div class="felt">
      <div class="seat-row"><div class="seat">
        <div class="name">${t('dealerQ')} ${show ? '· ' + handName3(evaluate3(this.dealer)) : ''}</div>
        <div class="cards">${dealerCards}</div></div></div>
      <div class="baccarat-bets">
        ${spots.map(([k, n, o]) => `<div class="bet-spot ${this.sel === k ? 'sel' : ''}" data-spot="${k}">
          <div>${n}</div><div class="odd">${o}</div><div class="placed">${this[k] ? fmt(this[k]) : ''}</div></div>`).join('')}
      </div>
      <div class="seat-row"><div class="seat">
        <div class="name">${t('playerQ')} ${this.player.length ? '· ' + handName3(evaluate3(this.player)) : ''}</div>
        <div class="cards">${this.player.length ? cardsHTML(this.player) : '<div class="small">—</div>'}</div>
        ${this.play ? `<div class="chips">${t('playBet')} ${fmt(this.play)}</div>` : ''}
      </div></div>
    </div>
    <div class="msg-bar ${this._cls}">${this._msg || t('tc_hint')}</div>
    <div class="controls" id="ctrls"></div></div>`;
    app.querySelectorAll('[data-spot]').forEach(d => d.onclick = () => { if (this.phase === 'bet') { this.sel = d.dataset.spot; this.render(); } });
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    if (this.phase === 'bet') {
      c.innerHTML = `<div class="grp">${chipsRow()}<button class="btn ghost sm" id="clr">${t('clear')}</button></div>
        <button class="btn primary" id="deal" ${this.ante > 0 ? '' : 'disabled'}>${t('deal')}</button>`;
      c.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
        const v = +b.dataset.add;
        if (this.ante + this.pairplus + v > Bank.get()) return toast(t('notEnough'));
        this[this.sel] += v; this.render();
      });
      document.getElementById('clr').onclick = () => { this.ante = 0; this.pairplus = 0; this.render(); };
      document.getElementById('deal').onclick = () => this.deal();
    } else if (this.phase === 'decide') {
      const canPlay = Bank.get() >= this.ante;
      c.innerHTML = `<button class="btn primary" id="play" ${canPlay ? '' : 'disabled'}>${t('tc_play')}</button>
        <button class="btn danger" id="fold">${t('tc_fold')}</button>`;
      document.getElementById('play').onclick = () => this.decide(true);
      document.getElementById('fold').onclick = () => this.decide(false);
    } else {
      c.innerHTML = `<button class="btn primary" id="again">${t('playAgain')}</button>
        <button class="btn ghost" onclick="renderLobby()">${t('leaveTable')}</button>`;
      document.getElementById('again').onclick = () => this.enter();
    }
  },

  deal() {
    if (this.ante <= 0) return toast(t('placeBet'));
    const stake = this.ante + this.pairplus;
    if (stake > Bank.get()) return toast(t('notEnough'));
    Bank.add(-stake); refreshChips();
    this.deck = shuffle(freshDeck());
    this.player = [this.deck.pop(), this.deck.pop(), this.deck.pop()];
    this.dealer = [this.deck.pop(), this.deck.pop(), this.deck.pop()];
    this.phase = 'decide'; this.render();
  },

  decide(playOn) {
    let payout = 0;
    const pev = evaluate3(this.player), dev = evaluate3(this.dealer);
    const staked = this.ante + this.pairplus + (playOn ? this.ante : 0);
    if (playOn) {
      this.play = this.ante; Bank.add(-this.ante); refreshChips();
      // 對子紅利
      if (this.pairplus && TCP_PAIRPLUS[pev.cat]) payout += this.pairplus * (1 + TCP_PAIRPLUS[pev.cat]);
      // 底注紅利 (無論莊家是否成立)
      if (TCP_ANTEBONUS[pev.cat]) payout += this.ante * TCP_ANTEBONUS[pev.cat];
      const qualify = dev.cat >= 1 || dev.tiebreak[0] >= 12;
      const cmp = compareScore({ cat: pev.cat, tiebreak: pev.tiebreak }, { cat: dev.cat, tiebreak: dev.tiebreak });
      if (!qualify) { payout += this.ante * 2 + this.play; }          // 底注 1:1，加注退還
      else if (cmp > 0) { payout += this.ante * 2 + this.play * 2; }  // 兩注全贏
      else if (cmp === 0) { payout += this.ante + this.play; }        // 和局退還
      // cmp<0 全輸
    }
    // 棄牌：底注+對子紅利全沒收
    Bank.add(payout); refreshChips();
    const net = payout - staked; Bank.record(net);
    this.phase = 'done';
    this._msg = (playOn ? (net > 0 ? t('youWon', { n: fmt(net) }) : net < 0 ? t('youLost', { n: fmt(-net) }) : t('push'))
      : t('youLost', { n: fmt(staked) }));
    this._cls = resultCls(net);
    this.render();
  },
};

/* ============================================================
   終極德州撲克 Ultimate Texas Hold'em
   ============================================================ */
const UTH_BLIND = { 4: 1, 5: 1.5, 6: 3, 7: 10, 8: 50 };  // 盲注賠付 (依 5 張最佳牌型 cat)；皇家另計 500
const UTH_TRIPS = { 3: 3, 4: 4, 5: 7, 6: 8, 7: 30, 8: 40 }; // 三條紅利；皇家另計 50

const UTH = {
  ante: 25, trips: 0, play: 0, phase: 'bet', pHole: [], dHole: [], comm: [], deck: [], folded: false,
  enter() { this.ante = 25; this.trips = 0; this.play = 0; this.phase = 'bet'; this.pHole = []; this.dHole = []; this.comm = []; this.folded = false; this._msg = ''; this._cls = ''; this.sel = 'ante'; this.render(); },

  render() {
    App.redraw = () => this.render();
    const done = this.phase === 'done';
    const dealerCards = this.dHole.length ? (done ? cardsHTML(this.dHole, 'sm') : cardHTML(null, 'sm') + cardHTML(null, 'sm')) : '<div class="small">—</div>';
    const commSlots = [0, 1, 2, 3, 4].map(i => this.comm[i] ? cardHTML(this.comm[i]) : cardHTML(null)).join('');
    app.innerHTML = `
    ${tableHead('g_ultimateth')}
    <div class="table-wrap"><div class="felt">
      <div class="seat-row"><div class="seat">
        <div class="name">${t('dealerQ')} ${done ? '· ' + handName(evaluateBest(this.dHole.concat(this.comm))) : ''}</div>
        <div class="cards">${dealerCards}</div></div></div>
      <div class="board-area"><div class="pot">${t('ante')} ${fmt(this.ante)} · ${t('blindBet')} ${fmt(this.ante)}${this.play ? ' · ' + t('playBet') + ' ' + fmt(this.play) : ''}${this.trips ? ' · ' + t('trips') + ' ' + fmt(this.trips) : ''}</div>
        <div class="cards">${this.pHole.length ? commSlots : '<div class="small">' + t('uth_hint') + '</div>'}</div></div>
      <div class="seat-row"><div class="seat">
        <div class="name">${t('playerQ')} ${done ? '· ' + handName(evaluateBest(this.pHole.concat(this.comm))) : ''}</div>
        <div class="cards">${this.pHole.length ? cardsHTML(this.pHole, 'sm') : '<div class="small">—</div>'}</div></div></div>
    </div>
    <div class="msg-bar ${this._cls}">${this._msg || ''}</div>
    <div class="controls" id="ctrls"></div></div>`;
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    const p = this.phase;
    if (p === 'bet') {
      const spots = [['ante', t('ante') + '/' + t('blindBet')], ['trips', t('trips')]];
      c.innerHTML = `<div class="grp">
        ${spots.map(([k, n]) => `<button class="btn sm ${this.sel === k ? 'primary' : 'ghost'}" data-sel="${k}">${n}: ${fmt(this[k])}</button>`).join('')}
        ${chipsRow()}<button class="btn ghost sm" id="clr">${t('clear')}</button></div>
        <button class="btn primary" id="deal" ${this.ante > 0 ? '' : 'disabled'}>${t('deal')}</button>`;
      c.querySelectorAll('[data-sel]').forEach(b => b.onclick = () => { this.sel = b.dataset.sel; this.render(); });
      c.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
        const v = +b.dataset.add;
        const need = (this.sel === 'ante' ? v * 2 : v); // ante 同時佔 blind
        if (this.ante * 2 + this.trips + need > Bank.get()) return toast(t('notEnough'));
        this[this.sel] += v; this.render();
      });
      document.getElementById('clr').onclick = () => { this.ante = 0; this.trips = 0; this.render(); };
      document.getElementById('deal').onclick = () => this.deal();
    } else if (p === 'preflop') {
      const can4 = Bank.get() >= this.ante * 4, can3 = Bank.get() >= this.ante * 3;
      c.innerHTML = `<button class="btn primary" id="b4" ${can4 ? '' : 'disabled'}>${t('uth_bet4')}</button>
        <button class="btn primary" id="b3" ${can3 ? '' : 'disabled'}>${t('uth_bet3')}</button>
        <button class="btn" id="ck">${t('uth_check')}</button>`;
      document.getElementById('b4').onclick = () => this.bet(4);
      document.getElementById('b3').onclick = () => this.bet(3);
      document.getElementById('ck').onclick = () => this.checkStage();
    } else if (p === 'flop') {
      const can2 = Bank.get() >= this.ante * 2;
      c.innerHTML = `<button class="btn primary" id="b2" ${can2 ? '' : 'disabled'}>${t('uth_bet2')}</button>
        <button class="btn" id="ck">${t('uth_check')}</button>`;
      document.getElementById('b2').onclick = () => this.bet(2);
      document.getElementById('ck').onclick = () => this.checkStage();
    } else if (p === 'river') {
      const can1 = Bank.get() >= this.ante;
      c.innerHTML = `<button class="btn primary" id="b1" ${can1 ? '' : 'disabled'}>${t('uth_bet1')}</button>
        <button class="btn danger" id="fold">${t('fold')}</button>`;
      document.getElementById('b1').onclick = () => this.bet(1);
      document.getElementById('fold').onclick = () => this.doFold();
    } else {
      c.innerHTML = `<button class="btn primary" id="again">${t('playAgain')}</button>
        <button class="btn ghost" onclick="renderLobby()">${t('leaveTable')}</button>`;
      document.getElementById('again').onclick = () => this.enter();
    }
  },

  deal() {
    const stake = this.ante * 2 + this.trips;
    if (stake > Bank.get()) return toast(t('notEnough'));
    Bank.add(-stake); refreshChips();
    this.deck = shuffle(freshDeck());
    this.pHole = [this.deck.pop(), this.deck.pop()];
    this.dHole = [this.deck.pop(), this.deck.pop()];
    this.comm = [];
    this.phase = 'preflop'; this._msg = ''; this.render();
  },
  bet(mult) { this.play = this.ante * mult; Bank.add(-this.play); refreshChips(); while (this.comm.length < 5) this.comm.push(this.deck.pop()); this.settle(); },
  checkStage() {
    if (this.phase === 'preflop') { this.comm.push(this.deck.pop(), this.deck.pop(), this.deck.pop()); this.phase = 'flop'; }
    else if (this.phase === 'flop') { this.comm.push(this.deck.pop(), this.deck.pop()); this.phase = 'river'; }
    this.render();
  },
  doFold() { this.folded = true; while (this.comm.length < 5) this.comm.push(this.deck.pop()); this.settle(); },

  settle() {
    const pH = evaluateBest(this.pHole.concat(this.comm)), dH = evaluateBest(this.dHole.concat(this.comm));
    const staked = this.ante * 2 + this.trips + this.play;
    let payout = 0;
    // 三條紅利 (無論輸贏/棄牌都結算)
    if (this.trips) {
      const royal = pH.cat === 8 && pH.tiebreak[0] === 14;
      const m = royal ? 50 : UTH_TRIPS[pH.cat];
      if (m) payout += this.trips * (1 + m);
    }
    if (!this.folded) {
      const cmp = compareScore(pH, dH);
      const dq = dH.cat >= 1;
      // Play
      if (cmp > 0) payout += this.play * 2; else if (cmp === 0) payout += this.play;
      // Ante
      if (!dq) payout += this.ante; else if (cmp > 0) payout += this.ante * 2; else if (cmp === 0) payout += this.ante;
      // Blind
      const royal = pH.cat === 8 && pH.tiebreak[0] === 14;
      const bm = royal ? 500 : UTH_BLIND[pH.cat];
      if (cmp > 0) payout += this.ante + (bm ? this.ante * bm : 0);
      else if (cmp === 0) payout += this.ante;
    }
    Bank.add(payout); refreshChips();
    const net = payout - staked; Bank.record(net);
    this.phase = 'done';
    this._msg = net > 0 ? t('youWon', { n: fmt(net) }) : net < 0 ? t('youLost', { n: fmt(-net) }) : t('push');
    this._cls = resultCls(net);
    this.render();
  },
};

/* ============================================================
   加勒比海撲克 Caribbean Stud
   ============================================================ */
const CARIB = { 0: 1, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 7, 7: 20, 8: 50 }; // 依 5 張 cat；皇家 100

const Caribbean = {
  ante: 25, raise: 0, phase: 'bet', player: [], dealer: [], deck: [],
  enter() { this.ante = 25; this.raise = 0; this.phase = 'bet'; this.player = []; this.dealer = []; this._msg = ''; this._cls = ''; this.render(); },

  render() {
    App.redraw = () => this.render();
    const done = this.phase === 'done';
    let dealerCards;
    if (!this.dealer.length) dealerCards = '<div class="small">—</div>';
    else if (done) dealerCards = cardsHTML(this.dealer, 'sm');
    else dealerCards = cardHTML(this.dealer[0], 'sm') + [1, 2, 3, 4].map(() => cardHTML(null, 'sm')).join('');
    app.innerHTML = `
    ${tableHead('g_caribbean')}
    <div class="table-wrap"><div class="felt">
      <div class="seat-row"><div class="seat">
        <div class="name">${t('dealerQ')} ${done ? '· ' + handName(evaluate5(this.dealer)) : ''}</div>
        <div class="cards">${dealerCards}</div></div></div>
      <div class="board-area"><div class="pot">${t('ante')} ${fmt(this.ante)}${this.raise ? ' · ' + t('raise2x') + ' ' + fmt(this.raise) : ''}</div></div>
      <div class="seat-row"><div class="seat">
        <div class="name">${t('playerQ')} ${this.player.length ? '· ' + handName(evaluate5(this.player)) : ''}</div>
        <div class="cards">${this.player.length ? cardsHTML(this.player, 'sm') : '<div class="small">—</div>'}</div></div></div>
    </div>
    <div class="msg-bar ${this._cls}">${this._msg || ''}</div>
    <div class="controls" id="ctrls"></div></div>`;
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    if (this.phase === 'bet') {
      c.innerHTML = `<div class="grp"><span class="small">${t('ante')}: ${fmt(this.ante)}</span>${chipsRow()}<button class="btn ghost sm" id="clr">${t('clear')}</button></div>
        <button class="btn primary" id="deal" ${this.ante > 0 ? '' : 'disabled'}>${t('deal')}</button>`;
      c.querySelectorAll('[data-add]').forEach(b => b.onclick = () => { const v = +b.dataset.add; if (this.ante + v > Bank.get()) return toast(t('notEnough')); this.ante += v; this.render(); });
      document.getElementById('clr').onclick = () => { this.ante = 0; this.render(); };
      document.getElementById('deal').onclick = () => this.deal();
    } else if (this.phase === 'decide') {
      const canRaise = Bank.get() >= this.ante * 2;
      c.innerHTML = `<button class="btn primary" id="raise" ${canRaise ? '' : 'disabled'}>${t('cs_raise')}</button>
        <button class="btn danger" id="fold">${t('cs_fold')}</button>`;
      document.getElementById('raise').onclick = () => this.decide(true);
      document.getElementById('fold').onclick = () => this.decide(false);
    } else {
      c.innerHTML = `<button class="btn primary" id="again">${t('playAgain')}</button>
        <button class="btn ghost" onclick="renderLobby()">${t('leaveTable')}</button>`;
      document.getElementById('again').onclick = () => this.enter();
    }
  },

  deal() {
    if (this.ante > Bank.get()) return toast(t('notEnough'));
    Bank.add(-this.ante); refreshChips();
    this.deck = shuffle(freshDeck());
    this.player = [0, 0, 0, 0, 0].map(() => this.deck.pop());
    this.dealer = [0, 0, 0, 0, 0].map(() => this.deck.pop());
    this.phase = 'decide'; this.render();
  },

  decide(raiseOn) {
    const pev = evaluate5(this.player), dev = evaluate5(this.dealer);
    let staked = this.ante, payout = 0;
    if (raiseOn) {
      this.raise = this.ante * 2; Bank.add(-this.raise); refreshChips(); staked += this.raise;
      const qualify = dev.cat >= 1 || (dev.tiebreak[0] === 14 && dev.tiebreak[1] === 13);
      const cmp = compareScore(pev, dev);
      if (!qualify) { payout += this.ante * 2 + this.raise; }   // 底注 1:1，加注退還
      else if (cmp > 0) {
        const royal = pev.cat === 8 && pev.tiebreak[0] === 14;
        const m = royal ? 100 : CARIB[pev.cat];
        payout += this.ante * 2 + this.raise * (1 + m);
      } else if (cmp === 0) { payout += this.ante + this.raise; }
      // cmp<0 全輸
    }
    Bank.add(payout); refreshChips();
    const net = payout - staked; Bank.record(net);
    this.phase = 'done';
    this._msg = raiseOn ? (net > 0 ? t('youWon', { n: fmt(net) }) : net < 0 ? t('youLost', { n: fmt(-net) }) : t('push'))
      : t('youLost', { n: fmt(this.ante) });
    this._cls = resultCls(net);
    this.render();
  },
};

/* ============================================================
   狂歡梭哈 Let It Ride
   ============================================================ */
const LIR = { 4: 5, 5: 8, 6: 11, 7: 50, 8: 200 };  // 順子起跳；皇家 1000；對子(10+)1、兩對2、三條3

const LetItRide = {
  unit: 25, bets: [0, 0, 0], pulled: [false, false, false], phase: 'bet', player: [], comm: [], deck: [], stage: 0,
  enter() { this.unit = 25; this.bets = [0, 0, 0]; this.pulled = [false, false, false]; this.phase = 'bet'; this.player = []; this.comm = []; this.stage = 0; this._msg = ''; this._cls = ''; this.render(); },

  render() {
    App.redraw = () => this.render();
    const done = this.phase === 'done';
    const c0 = this.comm[0] ? cardHTML(this.comm[0]) : cardHTML(null);
    const c1 = this.comm[1] ? cardHTML(this.comm[1]) : cardHTML(null);
    const betLbls = ['1', '2', '3'].map((n, i) =>
      `<div class="bet-spot ${this.pulled[i] ? 'folded' : (this.bets[i] ? 'sel' : '')}" style="min-width:70px">
        <div>$${n}</div><div class="placed">${this.pulled[i] ? '—' : (this.bets[i] ? fmt(this.bets[i]) : '')}</div></div>`).join('');
    app.innerHTML = `
    ${tableHead('g_letitride')}
    <div class="table-wrap"><div class="felt">
      <div class="board-area"><div class="cards">${this.player.length ? cardsHTML(this.player) : '<div class="small">' + t('lir_hint') + '</div>'}
        ${this.player.length ? c0 + c1 : ''}</div></div>
      <div class="baccarat-bets">${betLbls}</div>
      ${done ? `<div class="chips" style="text-align:center;margin-top:8px">${handName(evaluate5(this.player.concat(this.comm)))}</div>` : ''}
    </div>
    <div class="msg-bar ${this._cls}">${this._msg || ''}</div>
    <div class="controls" id="ctrls"></div></div>`;
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    if (this.phase === 'bet') {
      c.innerHTML = `<div class="grp"><span class="small">${t('lir_unit')}: ${fmt(this.unit)}</span>
        ${[5, 25, 100, 500].map(v => `<button class="btn sm ${this.unit === v ? 'primary' : 'ghost'}" data-u="${v}">${v}</button>`).join('')}</div>
        <button class="btn primary" id="deal">${t('deal')}</button>`;
      c.querySelectorAll('[data-u]').forEach(b => b.onclick = () => { this.unit = +b.dataset.u; this.render(); });
      document.getElementById('deal').onclick = () => this.deal();
    } else if (this.phase === 'd1' || this.phase === 'd2') {
      c.innerHTML = `<button class="btn" id="pull">${t('lir_pull')}</button>
        <button class="btn primary" id="ride">${t('lir_ride')}</button>`;
      document.getElementById('pull').onclick = () => this.decide(true);
      document.getElementById('ride').onclick = () => this.decide(false);
    } else {
      c.innerHTML = `<button class="btn primary" id="again">${t('playAgain')}</button>
        <button class="btn ghost" onclick="renderLobby()">${t('leaveTable')}</button>`;
      document.getElementById('again').onclick = () => this.enter();
    }
  },

  deal() {
    const total = this.unit * 3;
    if (total > Bank.get()) return toast(t('notEnough'));
    Bank.add(-total); refreshChips();
    this.bets = [this.unit, this.unit, this.unit]; this.pulled = [false, false, false];
    this.deck = shuffle(freshDeck());
    this.player = [this.deck.pop(), this.deck.pop(), this.deck.pop()];
    this.comm = []; this.stage = 1; this.phase = 'd1'; this._msg = ''; this.render();
  },

  decide(pull) {
    const idx = this.stage - 1; // 第 1 個決定影響 bet1，第 2 個影響 bet2
    if (pull) { this.pulled[idx] = true; Bank.add(this.bets[idx]); refreshChips(); }
    if (this.stage === 1) { this.comm.push(this.deck.pop()); this.stage = 2; this.phase = 'd2'; this.render(); }
    else { this.comm.push(this.deck.pop()); this.settle(); }
  },

  settle() {
    const ev = evaluate5(this.player.concat(this.comm));
    let mult = 0;
    if (ev.cat === 8) mult = (ev.tiebreak[0] === 14) ? 1000 : 200;
    else if (LIR[ev.cat]) mult = LIR[ev.cat];
    else if (ev.cat === 3) mult = 3;
    else if (ev.cat === 2) mult = 2;
    else if (ev.cat === 1 && ev.tiebreak[0] >= 10) mult = 1; // 對 10 以上
    let payout = 0, activeStake = 0;
    for (let i = 0; i < 3; i++) if (!this.pulled[i]) { activeStake += this.bets[i]; if (mult) payout += this.bets[i] * (1 + mult); }
    Bank.add(payout); refreshChips();
    const net = payout - activeStake; Bank.record(net);
    this.phase = 'done';
    this._msg = net > 0 ? t('youWon', { n: fmt(net) }) : (net < 0 ? t('youLost', { n: fmt(-net) }) : t('push'));
    this._cls = resultCls(net);
    this.render();
  },
};

/* ============================================================
   龍虎鬥 Dragon Tiger  (A 最小、K 最大)
   ============================================================ */
const DragonTiger = {
  bets: { dragon: 0, tiger: 0, tie: 0 }, sel: 'dragon', phase: 'bet', d: null, tg: null,
  val(c) { return c.rank === 14 ? 1 : c.rank; },
  enter() { this.bets = { dragon: 0, tiger: 0, tie: 0 }; this.sel = 'dragon'; this.phase = 'bet'; this.d = null; this.tg = null; this._msg = ''; this._cls = ''; this.render(); },

  render() {
    App.redraw = () => this.render();
    const spots = [['dragon', t('dt_dragon'), '1:1'], ['tie', t('dt_tie'), '8:1'], ['tiger', t('dt_tiger'), '1:1']];
    app.innerHTML = `
    ${tableHead('g_dragontiger')}
    <div class="table-wrap"><div class="felt">
      <div class="seat-row" style="gap:8vh">
        <div class="seat"><div class="name">🐉 ${t('dt_dragon')} ${this.d ? '· ' + this.val(this.d) : ''}</div>
          <div class="cards">${this.d ? cardHTML(this.d) : cardHTML(null)}</div></div>
        <div class="seat"><div class="name">🐯 ${t('dt_tiger')} ${this.tg ? '· ' + this.val(this.tg) : ''}</div>
          <div class="cards">${this.tg ? cardHTML(this.tg) : cardHTML(null)}</div></div>
      </div>
      <div class="baccarat-bets">
        ${spots.map(([k, n, o]) => `<div class="bet-spot ${this.sel === k ? 'sel' : ''}" data-spot="${k}">
          <div>${n}</div><div class="odd">${o}</div><div class="placed">${this.bets[k] ? fmt(this.bets[k]) : ''}</div></div>`).join('')}
      </div>
    </div>
    <div class="msg-bar ${this._cls}">${this._msg || t('bacBetInfo', { n: fmt(this.bets.dragon + this.bets.tiger + this.bets.tie) })}</div>
    <div class="controls" id="ctrls"></div></div>`;
    app.querySelectorAll('[data-spot]').forEach(x => x.onclick = () => { if (this.phase === 'bet') { this.sel = x.dataset.spot; this.render(); } });
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    const total = this.bets.dragon + this.bets.tiger + this.bets.tie;
    if (this.phase === 'bet') {
      c.innerHTML = `<div class="grp">${chipsRow()}<button class="btn ghost sm" id="clr">${t('clear')}</button></div>
        <button class="btn primary" id="deal" ${total > 0 ? '' : 'disabled'}>${t('deal')}</button>`;
      c.querySelectorAll('[data-add]').forEach(b => b.onclick = () => { const v = +b.dataset.add; if (total + v > Bank.get()) return toast(t('notEnough')); this.bets[this.sel] += v; this.render(); });
      document.getElementById('clr').onclick = () => { this.bets = { dragon: 0, tiger: 0, tie: 0 }; this.render(); };
      document.getElementById('deal').onclick = () => this.deal();
    } else {
      c.innerHTML = `<button class="btn primary" id="again">${t('playAgain')}</button>
        <button class="btn ghost" onclick="renderLobby()">${t('leaveTable')}</button>`;
      document.getElementById('again').onclick = () => this.enter();
    }
  },

  async deal() {
    const total = this.bets.dragon + this.bets.tiger + this.bets.tie;
    if (total > Bank.get()) return toast(t('notEnough'));
    Bank.add(-total); refreshChips(); lockInput();
    const deck = shuffle(freshDeck());
    this.phase = 'deal'; this.d = deck.pop(); this.render(); await sleep(400);
    this.tg = deck.pop(); this.render(); await sleep(500);
    this.settle(total);
  },

  settle(total) {
    unlockInput();
    const dv = this.val(this.d), tv = this.val(this.tg);
    let payout = 0, res;
    if (dv > tv) { res = t('dragonWin'); payout += this.bets.dragon * 2; }
    else if (tv > dv) { res = t('tigerWin'); payout += this.bets.tiger * 2; }
    else { res = t('tieResult'); payout += this.bets.tie * 9 + Math.floor(this.bets.dragon / 2) + Math.floor(this.bets.tiger / 2); } // 和局：龍虎輸一半
    Bank.add(payout); refreshChips();
    const net = payout - total; Bank.record(net);
    this._msg = res + ' — ' + (net > 0 ? t('youWon', { n: fmt(net) }) : net < 0 ? t('youLost', { n: fmt(-net) }) : t('push'));
    this._cls = resultCls(net); this.phase = 'done'; this.render();
  },
};

/* ============================================================
   賭場戰爭 Casino War  (A 最大)
   ============================================================ */
const CasinoWar = {
  ante: 25, phase: 'bet', p: null, d: null, warBet: 0, deck: [],
  enter() { this.ante = 25; this.phase = 'bet'; this.p = null; this.d = null; this.warBet = 0; this._msg = ''; this._cls = ''; this.render(); },

  render() {
    App.redraw = () => this.render();
    app.innerHTML = `
    ${tableHead('g_casinowar')}
    <div class="table-wrap"><div class="felt">
      <div class="seat-row" style="gap:8vh">
        <div class="seat"><div class="name">${t('dealerQ')} ${this.d ? '· ' + this.d.label : ''}</div>
          <div class="cards">${this.d ? cardHTML(this.d) : cardHTML(null)}</div></div>
        <div class="seat"><div class="name">${t('playerQ')} ${this.p ? '· ' + this.p.label : ''}</div>
          <div class="cards">${this.p ? cardHTML(this.p) : cardHTML(null)}</div></div>
      </div>
      <div class="board-area"><div class="pot">${t('ante')} ${fmt(this.ante)}${this.warBet ? ' · War ' + fmt(this.warBet) : ''}</div></div>
    </div>
    <div class="msg-bar ${this._cls}">${this._msg || ''}</div>
    <div class="controls" id="ctrls"></div></div>`;
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    if (this.phase === 'bet') {
      c.innerHTML = `<div class="grp"><span class="small">${t('ante')}: ${fmt(this.ante)}</span>${chipsRow()}<button class="btn ghost sm" id="clr">${t('clear')}</button></div>
        <button class="btn primary" id="deal" ${this.ante > 0 ? '' : 'disabled'}>${t('deal')}</button>`;
      c.querySelectorAll('[data-add]').forEach(b => b.onclick = () => { const v = +b.dataset.add; if (this.ante + v > Bank.get()) return toast(t('notEnough')); this.ante += v; this.render(); });
      document.getElementById('clr').onclick = () => { this.ante = 0; this.render(); };
      document.getElementById('deal').onclick = () => this.deal();
    } else if (this.phase === 'war') {
      const canWar = Bank.get() >= this.ante;
      c.innerHTML = `<button class="btn primary" id="war" ${canWar ? '' : 'disabled'}>${t('war_war')}</button>
        <button class="btn danger" id="surr">${t('war_surr')}</button>`;
      document.getElementById('war').onclick = () => this.goWar();
      document.getElementById('surr').onclick = () => this.surrender();
    } else {
      c.innerHTML = `<button class="btn primary" id="again">${t('playAgain')}</button>
        <button class="btn ghost" onclick="renderLobby()">${t('leaveTable')}</button>`;
      document.getElementById('again').onclick = () => this.enter();
    }
  },

  async deal() {
    if (this.ante > Bank.get()) return toast(t('notEnough'));
    Bank.add(-this.ante); refreshChips(); lockInput();
    this.deck = shuffle(freshDeck());
    this.warBet = 0;
    this.phase = 'reveal'; this.d = this.deck.pop(); this.render(); await sleep(350);
    this.p = this.deck.pop(); this.render(); await sleep(400);
    if (this.p.rank > this.d.rank) this.finish(this.ante * 2, 'win');
    else if (this.p.rank < this.d.rank) this.finish(0, 'lose');
    else { unlockInput(); this.phase = 'war'; this._msg = t('war_tieMsg'); this._cls = ''; this.render(); }
  },

  surrender() { const back = Math.floor(this.ante / 2); Bank.add(back); refreshChips(); Bank.record(back - this.ante); this._msg = t('youLost', { n: fmt(this.ante - back) }); this._cls = 'lose'; this.phase = 'done'; this.render(); },

  async goWar() {
    Bank.add(-this.ante); refreshChips(); lockInput(); this.warBet = this.ante;
    for (let i = 0; i < 3 && this.deck.length; i++) this.deck.pop(); // 燒三張
    this.d = this.deck.pop(); this.render(); await sleep(350);
    this.p = this.deck.pop(); this.render(); await sleep(400);
    // 宣戰後：平手或贏 → war 注 1:1，底注退還(push)；輸 → 全輸
    if (this.p.rank >= this.d.rank) this.finishWar(this.ante + this.warBet * 2);
    else this.finishWar(0);
  },
  finishWar(payout) {
    unlockInput();
    Bank.add(payout); refreshChips();
    const staked = this.ante * 2; const net = payout - staked; Bank.record(net);
    this._msg = net > 0 ? t('youWon', { n: fmt(net) }) : net < 0 ? t('youLost', { n: fmt(-net) }) : t('push');
    this._cls = resultCls(net); this.phase = 'done'; this.render();
  },
  finish(payout, kind) {
    unlockInput();
    Bank.add(payout); refreshChips();
    const net = payout - this.ante; Bank.record(net);
    this._msg = kind === 'win' ? t('youWon', { n: fmt(net) }) : t('youLost', { n: fmt(this.ante) });
    this._cls = kind === 'win' ? 'win' : 'lose'; this.phase = 'done'; this.render();
  },
};

/* ============================================================
   比大小 Hi-Lo Showdown  (A 最大，大者勝，平手退還)
   ============================================================ */
const BigSmall = {
  ante: 25, phase: 'bet', p: null, d: null,
  enter() { this.ante = 25; this.phase = 'bet'; this.p = null; this.d = null; this._msg = ''; this._cls = ''; this.render(); },

  render() {
    App.redraw = () => this.render();
    app.innerHTML = `
    ${tableHead('g_bigsmall')}
    <div class="table-wrap"><div class="felt">
      <div class="seat-row" style="gap:8vh">
        <div class="seat"><div class="name">🧑 ${t('playerQ')} ${this.p ? '· ' + this.p.label : ''}</div>
          <div class="cards">${this.p ? cardHTML(this.p) : cardHTML(null)}</div></div>
        <div class="seat"><div class="name">🎩 ${t('dealerQ')} ${this.d ? '· ' + this.d.label : ''}</div>
          <div class="cards">${this.d ? cardHTML(this.d) : cardHTML(null)}</div></div>
      </div>
      <div class="board-area"><div class="pot">${t('ante')} ${fmt(this.ante)}</div></div>
    </div>
    <div class="msg-bar ${this._cls}">${this._msg || ''}</div>
    <div class="controls" id="ctrls"></div></div>`;
    this.renderControls();
  },

  renderControls() {
    const c = document.getElementById('ctrls');
    if (this.phase === 'bet') {
      c.innerHTML = `<div class="grp"><span class="small">${t('ante')}: ${fmt(this.ante)}</span>${chipsRow()}<button class="btn ghost sm" id="clr">${t('clear')}</button></div>
        <button class="btn primary" id="deal" ${this.ante > 0 ? '' : 'disabled'}>${t('deal')}</button>`;
      c.querySelectorAll('[data-add]').forEach(b => b.onclick = () => { const v = +b.dataset.add; if (this.ante + v > Bank.get()) return toast(t('notEnough')); this.ante += v; this.render(); });
      document.getElementById('clr').onclick = () => { this.ante = 0; this.render(); };
      document.getElementById('deal').onclick = () => this.deal();
    } else {
      c.innerHTML = `<button class="btn primary" id="again">${t('playAgain')}</button>
        <button class="btn ghost" onclick="renderLobby()">${t('leaveTable')}</button>`;
      document.getElementById('again').onclick = () => this.enter();
    }
  },

  async deal() {
    if (this.ante > Bank.get()) return toast(t('notEnough'));
    Bank.add(-this.ante); refreshChips(); lockInput();
    const deck = shuffle(freshDeck());
    this.phase = 'reveal'; this.p = deck.pop(); this.render(); await sleep(350);
    this.d = deck.pop(); this.render(); await sleep(420);
    this.settle();
  },

  settle() {
    unlockInput();
    const pv = this.p.rank, dv = this.d.rank;
    let payout = 0;
    if (pv > dv) payout = this.ante * 2; else if (pv === dv) payout = this.ante; // 平手退還
    Bank.add(payout); refreshChips();
    const net = payout - this.ante; Bank.record(net);
    const gap = ` (${t('playerQ')} ${this.p.label} · ${t('dealerQ')} ${this.d.label})`;
    this._msg = (net > 0 ? t('youWon', { n: fmt(net) }) : net < 0 ? t('youLost', { n: fmt(this.ante) }) : t('push')) + gap;
    this._cls = resultCls(net); this.phase = 'done'; this.render();
  },
};
