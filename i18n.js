/* ============================================================
   多國語言 (中文 / English)
   ============================================================ */
const I18N = {
  lang: localStorage.getItem('casino_lang') || 'zh',
  set(l) { this.lang = l; localStorage.setItem('casino_lang', l); },
  t(key, p) {
    let s = (this.dict[this.lang] && this.dict[this.lang][key]);
    if (s === undefined) s = this.dict.zh[key] || key;
    if (typeof s === 'function') return s(p || {});
    if (p) for (const k in p) s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), p[k]);
    return s;
  },
  dict: {
    zh: {
      brand: '撲克<span>遊戲</span>', chips: '籌碼', langBtn: 'EN',
      lobbyTitle: '🃏 撲克遊戲', lobbySub: '選擇一款遊戲開始 · 籌碼會自動保存',
      hands: '總局數', won: '獲勝', biggest: '最大單筆贏得', peak: '巔峰籌碼',
      resetChips: '🏳️ 再次宣告破產', freeChips: '領取救濟金 +500',
      resetConfirm: '確定放棄目前所有籌碼、再次宣告破產,只留下最後的 1,000 重來?', gotFree: '已領取 500 救濟籌碼',
      back: '← 返回大廳', leaveTable: '離開牌桌', playAgain: '再來一局',
      cancel: '取消', confirmYes: '確定',
      bet: '下注', clear: '清除', deal: '發牌', notEnough: '籌碼不足', placeBet: '請先下注',
      youWon: '你贏了 {n} 籌碼!', youLost: '你輸了 {n} 籌碼', pushMsg: '平手，退回下注',
      // 遊戲名 / 說明
      g_blackjack: '21 點', g_holdem: '德州撲克', g_videopoker: '視訊撲克', g_baccarat: '百家樂',
      d_blackjack: '經典牌桌遊戲。點數接近 21 但不爆牌。支援加倍、分牌、保險。',
      d_holdem: '無限注德州撲克，對戰 3 位 AI 對手。含盲注、下注圈、邊池。',
      d_videopoker: 'Jacks or Better。發五張、保留、換牌，湊出牌型領獎。皇家同花順 800 倍!',
      d_baccarat: '押閒家、莊家或和局。最接近 9 點者勝，含對子邊注。',
      // Blackjack
      bjTitle: '🂡 21 點', dealer: '莊家', yourCards: '你的牌', handN: '手牌 {n}',
      bjRules: '莊家 17 點停牌 · Blackjack 賠 3:2 · 6 副牌', waitBet: '等待下注…', dealAfterBet: '下注後發牌',
      upcard: '明牌', soft: '軟', bust: '爆', hit: '要牌 Hit', stand: '停牌 Stand',
      double: '加倍 Double', split: '分牌 Split', insQ: '莊家亮 A，是否買保險 ({n})?',
      insBuy: '買保險', insNo: '不買', resBlackjack: 'BLACKJACK 贏 3:2', resBust: '爆牌 ✗',
      resDealerBJ: '莊家 BLACKJACK ✗', resDealerBust: '莊家爆牌 ✓', resWin: '贏 ✓', resLose: '輸 ✗', resPush: '和局 =',
      // Video Poker
      vpTitle: '🃏 視訊撲克', perCoin: '每枚硬幣', numCoins: '枚數', wager: '投注 {n}',
      hold: '保留', selectDeal: '選擇下注後發牌', clickHold: '點擊卡片保留，然後換牌', draw: '換牌 Draw',
      vpWin: '🎉 {name}! 贏得 {n} 籌碼', vpLose: '{name} — 未中獎，再試一次',
      pt_royal: '皇家同花順', pt_sf: '同花順', pt_quads: '四條', pt_fh: '葫蘆', pt_flush: '同花',
      pt_straight: '順子', pt_trips: '三條', pt_twopair: '兩對', pt_jacks: '對 J 或以上',
      royal5: '皇家同花順 (5 枚)',
      // Baccarat
      bacTitle: '🎴 百家樂', bPlayer: '閒 Player', bBanker: '莊 Banker', bTie: '和 Tie',
      bPpair: '閒對子', bBpair: '莊對子', bacBetInfo: '已下注 {n} · 點擊區域選擇，再用籌碼下注',
      wonPlayer: '閒家', wonBanker: '莊家', wonTie: '和局',
      bacResult: '{who}勝 (閒 {p} · 莊 {b})',
      // Holdem
      heTitle: "♠️ 德州撲克", buyinPrompt: '選擇買入金額 (100 - {max})',
      needSit: '至少需要 100 籌碼才能入座', leaveWith: '帶著 {n} 籌碼離桌',
      bust100: '你的籌碼輸光了！返回大廳。', leaveBtn: '離桌 (帶走 {n})', nextHand: '下一手',
      pot: '底池', blinds: '盲注', waitOthers: '等待其他玩家行動…',
      fold: '棄牌 Fold', check: '過牌 Check', call: '跟注 {n}', allinCall: 'All-in 跟注 {n}',
      raiseTo: '加注', allin: 'All-in', waitFlop: '等待翻牌…',
      ph_preflop: '翻牌前', ph_flop: '翻牌 Flop', ph_turn: '轉牌 Turn', ph_river: '河牌 River', ph_showdown: '攤牌',
      aFold: '棄牌', aCheck: '過牌', aCall: '跟注 {n}', aBet: '下注 {n}', aRaiseTo: '加注至 {n}',
      aAllin: 'All-in {n}', aAllinCall: 'All-in 跟注', folded: '已棄牌', stackLbl: '籌碼 {n}', betLbl: '下注 {n}',
      winPot: '{name} 獲勝，贏得底池', winShow: '攤牌：{names} 以 {hand} 獲勝',
      leftWith: '帶著 {n} 籌碼離桌',
      // 牌型
      h0: '高牌', h1: '一對', h2: '兩對', h3: '三條', h4: '順子', h5: '同花', h6: '葫蘆', h7: '四條', h8: '同花順', h9: '皇家同花順',
    },
    en: {
      brand: 'Poker&nbsp;<span>Games</span>', chips: 'Chips', langBtn: '中',
      lobbyTitle: '🃏 Poker Games', lobbySub: 'Pick a game to start · Your chips are saved automatically',
      hands: 'Hands', won: 'Wins', biggest: 'Biggest Win', peak: 'Peak Chips',
      resetChips: '🏳️ Go bankrupt again', freeChips: 'Claim bailout +500',
      resetConfirm: 'Give up all your chips and go bankrupt again, keeping only your last 1,000?', gotFree: 'Claimed 500 bailout chips',
      back: '← Back to Lobby', leaveTable: 'Leave Table', playAgain: 'Play Again',
      cancel: 'Cancel', confirmYes: 'Confirm',
      bet: 'Bet', clear: 'Clear', deal: 'Deal', notEnough: 'Not enough chips', placeBet: 'Place a bet first',
      youWon: 'You won {n} chips!', youLost: 'You lost {n} chips', pushMsg: 'Push — bet returned',
      g_blackjack: 'Blackjack', g_holdem: "Texas Hold'em", g_videopoker: 'Video Poker', g_baccarat: 'Baccarat',
      d_blackjack: 'The classic card game. Get close to 21 without busting. Double, split & insurance supported.',
      d_holdem: 'No-Limit Hold\'em vs 3 AI opponents. Blinds, betting rounds and side pots.',
      d_videopoker: 'Jacks or Better. Deal five, hold, draw and hit a paying hand. Royal flush pays 800x!',
      d_baccarat: 'Bet Player, Banker or Tie. Closest to 9 wins. Pair side bets included.',
      bjTitle: '🂡 Blackjack', dealer: 'Dealer', yourCards: 'Your Hand', handN: 'Hand {n}',
      bjRules: 'Dealer stands on 17 · Blackjack pays 3:2 · 6 decks', waitBet: 'Waiting for bet…', dealAfterBet: 'Deal after betting',
      upcard: 'up', soft: 'soft', bust: 'bust', hit: 'Hit', stand: 'Stand',
      double: 'Double', split: 'Split', insQ: 'Dealer shows Ace. Buy insurance ({n})?',
      insBuy: 'Insurance', insNo: 'No', resBlackjack: 'BLACKJACK pays 3:2', resBust: 'Bust ✗',
      resDealerBJ: 'Dealer BLACKJACK ✗', resDealerBust: 'Dealer busts ✓', resWin: 'Win ✓', resLose: 'Lose ✗', resPush: 'Push =',
      vpTitle: '🃏 Video Poker', perCoin: 'Per coin', numCoins: 'Coins', wager: 'Wager {n}',
      hold: 'HOLD', selectDeal: 'Set your bet then deal', clickHold: 'Click cards to hold, then draw', draw: 'Draw',
      vpWin: '🎉 {name}! Won {n} chips', vpLose: '{name} — no win, try again',
      pt_royal: 'Royal Flush', pt_sf: 'Straight Flush', pt_quads: 'Four of a Kind', pt_fh: 'Full House', pt_flush: 'Flush',
      pt_straight: 'Straight', pt_trips: 'Three of a Kind', pt_twopair: 'Two Pair', pt_jacks: 'Jacks or Better',
      royal5: 'Royal Flush (5 coins)',
      bacTitle: '🎴 Baccarat', bPlayer: 'Player', bBanker: 'Banker', bTie: 'Tie',
      bPpair: 'Player Pair', bBpair: 'Banker Pair', bacBetInfo: 'Bet {n} placed · tap a spot then add chips',
      wonPlayer: 'Player', wonBanker: 'Banker', wonTie: 'Tie',
      bacResult: '{who} wins (P {p} · B {b})',
      heTitle: "♠️ Texas Hold'em", buyinPrompt: 'Choose buy-in (100 - {max})',
      needSit: 'You need at least 100 chips to sit', leaveWith: 'Left the table with {n} chips',
      bust100: 'You are out of chips! Returning to lobby.', leaveBtn: 'Leave (take {n})', nextHand: 'Next Hand',
      pot: 'Pot', blinds: 'Blinds', waitOthers: 'Waiting for other players…',
      fold: 'Fold', check: 'Check', call: 'Call {n}', allinCall: 'All-in Call {n}',
      raiseTo: 'Raise', allin: 'All-in', waitFlop: 'Waiting for flop…',
      ph_preflop: 'Pre-Flop', ph_flop: 'Flop', ph_turn: 'Turn', ph_river: 'River', ph_showdown: 'Showdown',
      aFold: 'folded', aCheck: 'check', aCall: 'call {n}', aBet: 'bet {n}', aRaiseTo: 'raise to {n}',
      aAllin: 'All-in {n}', aAllinCall: 'All-in call', folded: 'Folded', stackLbl: 'Stack {n}', betLbl: 'bet {n}',
      winPot: '{name} wins the pot', winShow: 'Showdown: {names} wins with {hand}',
      leftWith: 'Left the table with {n} chips',
      h0: 'High Card', h1: 'Pair', h2: 'Two Pair', h3: 'Three of a Kind', h4: 'Straight', h5: 'Flush', h6: 'Full House', h7: 'Four of a Kind', h8: 'Straight Flush', h9: 'Royal Flush',
    },
  },
};
function t(k, p) { return I18N.t(k, p); }
// 依牌型結果取得當前語言名稱
function handName(score) {
  if (score.cat === 8 && score.tiebreak[0] === 14) return t('h9');
  return t('h' + score.cat);
}
