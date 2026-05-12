const storageKey = "minimal-study-counter-v1";
const themeStorageKey = "minimal-study-counter-theme-v1";
const themeCollapsedStorageKey = "minimal-study-counter-theme-collapsed";
const themeMemoryStorageKey = "minimal-study-counter-theme-memory-v1";
const themeMemoryBundleVersionKey = "minimal-study-counter-theme-memory-bundle-20260511-2";
const newsSourceStorageKey = "minimal-study-counter-news-source-v1";
const languageStorageKey = "minimal-study-counter-language-v1";
const newsSources = {
  tw: {
    label: "TW",
    feedUrl: "https://news.google.com/rss?hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
    moreUrl: "https://news.google.com/topstories?hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
    fallbackText: "\u958b\u555f Google News \u67e5\u770b\u4eca\u65e5\u91cd\u9ede",
  },
  bbc: {
    label: "BBC",
    feedUrl: "https://feeds.bbci.co.uk/news/rss.xml",
    moreUrl: "https://www.bbc.com/news",
    fallbackText: "\u958b\u555f BBC News \u67e5\u770b\u4eca\u65e5\u91cd\u9ede",
  },
  dw: {
    label: "DW",
    feedUrl: "https://rss.dw.com/rdf/rss-de-all",
    moreUrl: "https://www.dw.com/de/themen/s-9077",
    fallbackText: "\u958b\u555f DW \u5fb7\u8a9e\u65b0\u805e\u67e5\u770b\u4eca\u65e5\u91cd\u9ede",
  },
};
let sharedAudio = null;
const translatedPresetNames = {
  zh: ["日系", "櫻花可愛風", "自然風", "夏日清霜"],
  en: ["Japanese", "Sakura Cute", "Nature", "Summer Frost"],
  de: ["Japanisch", "Sakura süß", "Natur", "Sommerfrost"],
  ja: ["和風", "桜かわいい", "自然風", "夏の霜"],
};
const translations = {
  zh: {
    htmlLang: "zh-Hant",
    title: "你能做到",
    brand: "你能做到",
    currentTime: "現在時間",
    language: "語言",
    todayGoals: "今日目標",
    clear: "清空",
    todoPlaceholder: "輸入今日要完成的事",
    countdown: "倒數時間",
    setMinutes: "設定分鐘",
    set: "設置",
    focusTotal: "已累積專注時間",
    minuteUnit: "分鐘",
    focusMode: "專注模式",
    exit: "退出",
    start: "開始",
    pause: "暫停",
    reset: "歸零",
    level: "等級與經驗值",
    xpNote: "每一次前進都會累積成自己的經驗",
    levelReset: "等級歸零",
    future: "未來活動",
    futurePlaceholder: "一行一個未來活動",
    news: "今日重點新聞",
    refresh: "更新",
    more: "更多",
    loadingNews: "載入新聞中",
    updating: "更新中...",
    updated: "已更新",
    newsFail: "自動載入暫時失敗，可先點「更多」查看。",
    saved: "已儲存",
    themeToggleOpen: "展開色彩設定",
    themeToggleClose: "收合色彩設定",
    colorToggle: "色",
    bg: "背景",
    text: "字體",
    line: "框線",
    width: "粗細",
    paper: "格子",
    panel: "主底",
    presets: "預設配色",
    customMemory: "自訂記憶",
    save: "存",
    load: "取",
    savedSlot: "已存",
    noRecord: "無記錄",
    confirmOverwrite: "確定要覆蓋自訂 {n} 的配色嗎？",
    loaded: "已取",
    timeUp: "時間到！",
    bombMessage: "休息一下，然後繼續前進。",
    ok: "知道了",
  },
  en: {
    htmlLang: "en",
    title: "You Can Do It",
    brand: "You Can Do It",
    currentTime: "Current Time",
    language: "Language",
    todayGoals: "Today's Goals",
    clear: "Clear",
    todoPlaceholder: "Enter something to complete today",
    countdown: "Countdown",
    setMinutes: "Set minutes",
    set: "Set",
    focusTotal: "Accumulated Focus Time",
    minuteUnit: "min",
    focusMode: "Focus Mode",
    exit: "Exit",
    start: "Start",
    pause: "Pause",
    reset: "Reset",
    level: "Level & EXP",
    xpNote: "Every step forward becomes part of your experience.",
    levelReset: "Reset Level",
    future: "Future Events",
    futurePlaceholder: "One future event per line",
    news: "Today's Key News",
    refresh: "Refresh",
    more: "More",
    loadingNews: "Loading news",
    updating: "Updating...",
    updated: "updated",
    newsFail: "Auto loading failed for now. Use More to view news.",
    saved: "Saved",
    themeToggleOpen: "Open color settings",
    themeToggleClose: "Collapse color settings",
    colorToggle: "Color",
    bg: "Background",
    text: "Text",
    line: "Border",
    width: "Width",
    paper: "Card",
    panel: "Panel",
    presets: "Presets",
    customMemory: "Custom Memory",
    save: "Save",
    load: "Load",
    savedSlot: "Saved",
    noRecord: "Empty",
    confirmOverwrite: "Overwrite custom palette {n}?",
    loaded: "Loaded",
    timeUp: "Time's up!",
    bombMessage: "Take a short break, then keep going.",
    ok: "OK",
  },
  de: {
    htmlLang: "de",
    title: "Du schaffst das",
    brand: "Du schaffst das",
    currentTime: "Aktuelle Uhrzeit",
    language: "Sprache",
    todayGoals: "Tagesziele",
    clear: "Leeren",
    todoPlaceholder: "Aufgabe für heute eingeben",
    countdown: "Countdown",
    setMinutes: "Minuten einstellen",
    set: "Setzen",
    focusTotal: "Gesammelte Fokuszeit",
    minuteUnit: "Min.",
    focusMode: "Fokusmodus",
    exit: "Beenden",
    start: "Start",
    pause: "Pause",
    reset: "Reset",
    level: "Level & Erfahrung",
    xpNote: "Jeder Schritt nach vorn wird Teil deiner Erfahrung.",
    levelReset: "Level zurücksetzen",
    future: "Künftige Termine",
    futurePlaceholder: "Ein künftiger Termin pro Zeile",
    news: "Wichtige Nachrichten heute",
    refresh: "Neu",
    more: "Mehr",
    loadingNews: "Nachrichten werden geladen",
    updating: "Aktualisiere...",
    updated: "aktualisiert",
    newsFail: "Automatisches Laden ist gerade fehlgeschlagen. Nutze Mehr.",
    saved: "Gespeichert",
    themeToggleOpen: "Farbeinstellungen öffnen",
    themeToggleClose: "Farbeinstellungen einklappen",
    colorToggle: "Farbe",
    bg: "Hintergrund",
    text: "Text",
    line: "Rahmen",
    width: "Stärke",
    paper: "Karten",
    panel: "Panel",
    presets: "Vorgaben",
    customMemory: "Eigene Speicher",
    save: "Speich.",
    load: "Laden",
    savedSlot: "Gespeichert",
    noRecord: "Leer",
    confirmOverwrite: "Eigene Palette {n} überschreiben?",
    loaded: "Geladen",
    timeUp: "Zeit ist um!",
    bombMessage: "Mach kurz Pause und geh dann weiter.",
    ok: "OK",
  },
  ja: {
    htmlLang: "ja",
    title: "あなたならできる",
    brand: "あなたならできる",
    currentTime: "現在時刻",
    language: "言語",
    todayGoals: "今日の目標",
    clear: "クリア",
    todoPlaceholder: "今日やることを入力",
    countdown: "カウントダウン",
    setMinutes: "分を設定",
    set: "設定",
    focusTotal: "累積集中時間",
    minuteUnit: "分",
    focusMode: "集中モード",
    exit: "退出",
    start: "開始",
    pause: "一時停止",
    reset: "リセット",
    level: "レベルと経験値",
    xpNote: "一歩ずつの前進が、自分の経験になる。",
    levelReset: "レベルリセット",
    future: "今後の予定",
    futurePlaceholder: "1行に1つ予定を入力",
    news: "今日の主要ニュース",
    refresh: "更新",
    more: "もっと見る",
    loadingNews: "ニュース読み込み中",
    updating: "更新中...",
    updated: "更新済み",
    newsFail: "自動読み込みに失敗しました。「もっと見る」を使ってください。",
    saved: "保存しました",
    themeToggleOpen: "色設定を開く",
    themeToggleClose: "色設定を閉じる",
    colorToggle: "色",
    bg: "背景",
    text: "文字",
    line: "枠線",
    width: "太さ",
    paper: "カード",
    panel: "パネル",
    presets: "プリセット",
    customMemory: "カスタム記憶",
    save: "保存",
    load: "読込",
    savedSlot: "保存済",
    noRecord: "なし",
    confirmOverwrite: "カスタム {n} の配色を上書きしますか？",
    loaded: "読込済",
    timeUp: "時間です！",
    bombMessage: "少し休んで、また進もう。",
    ok: "OK",
  },
};
const fallbackNipponColors = [
  { name: "GOFUN", romanized: "GOFUN", value: "#FCFAF2" },
  { name: "SUMI", romanized: "SUMI", value: "#1C1C1C" },
  { name: "SHIRONERI", romanized: "SHIRONERI", value: "#FFFFFB" },
  { name: "GINNEZUMI", romanized: "GINNEZUMI", value: "#91989F" },
  { name: "SANGOSYU", romanized: "SANGOSYU", value: "#F75C2F" },
  { name: "KONJYO", romanized: "KONJYO", value: "#08192D" },
  { name: "NAE", romanized: "NAE", value: "#86C166" },
  { name: "TOKIWA", romanized: "TOKIWA", value: "#1B813E" },
  { name: "RIKYUSHIRACHA", romanized: "RIKYUSHIRACHA", value: "#B4A582" },
  { name: "KOBICHA", romanized: "KOBICHA", value: "#6E552F" },
  { name: "UGUISUCHA", romanized: "UGUISUCHA", value: "#6C6024" },
  { name: "AIKOBICHA", romanized: "AIKOBICHA", value: "#4D5139" },
  { name: "ARAZOME", romanized: "ARAZOME", value: "#D7C4BB" },
  { name: "KAMENOZOKI", romanized: "KAMENOZOKI", value: "#A5DEE4" },
  { name: "BYAKUROKU", romanized: "BYAKUROKU", value: "#A8D8B9" },
  { name: "ASAGI", romanized: "ASAGI", value: "#33A6B8" },
  { name: "MIZUASAGI", romanized: "MIZUASAGI", value: "#81C7D4" },
  { name: "KARAKURENAI", romanized: "KARAKURENAI", value: "#CB1B45" },
  { name: "YAMABUKI", romanized: "YAMABUKI", value: "#F9BF45" },
];
const defaultTheme = {
  bg: "#FCFAF2",
  text: "#1C1C1C",
  line: "#B4A582",
  lineWidth: "1px",
  paper: "#FFFFFB",
  timer: "#FFFFFB",
};
const themeSlotNames = ["\u65e5\u7cfb", "\u6afb\u82b1\u53ef\u611b\u98a8", "\u81ea\u7136\u98a8", "\u590f\u65e5\u6e05\u971c"];
const defaultThemeMemory = [
  {
    bg: "#FCFAF2",
    text: "#1C1C1C",
    line: "#B4A582",
    lineWidth: "1px",
    paper: "#FFFFFB",
    timer: "#FFFFFB",
  },
  {
    bg: "#FEDFE1",
    text: "#64363C",
    line: "#F596AA",
    lineWidth: "3px",
    paper: "#FFFFFB",
    timer: "#F8C3CD",
  },
  {
    bg: "#86C166",
    text: "#1C1C1C",
    line: "#1B813E",
    lineWidth: "2px",
    paper: "#FCFAF2",
    timer: "#B4A582",
  },
  {
    bg: "#A5DEE4",
    text: "#08192D",
    line: "#33A6B8",
    lineWidth: "2px",
    paper: "#FFFFFB",
    timer: "#FCFAF2",
  },
];
const bundledCustomThemeMemory = [
  {
    bg: "#FCFAF2",
    text: "#D7C4BB",
    line: "#B4A582",
    lineWidth: "3px",
    paper: "#4D5139",
    timer: "#6C6024",
  },
  {
    bg: "#91989F",
    text: "#F75C2F",
    line: "#08192D",
    lineWidth: "3px",
    paper: "#4D5139",
    timer: "#6E552F",
  },
  {
    bg: "#86C166",
    text: "#1C1C1C",
    line: "#1B813E",
    lineWidth: "2px",
    paper: "#FCFAF2",
    timer: "#B4A582",
  },
];

const state = {
  choiceCount: 0,
  level: 1,
  xp: 0,
  remainingWrongCount: 0,
  totalWrongCount: 0,
  futureActivities: "",
  completedStudyMinutes: 0,
  focusRewardBlocks: 0,
  countdownMinutes: 25,
  remainingMs: 25 * 60 * 1000,
  startedAt: null,
  active: false,
  goalsDate: localDateKey(),
  goals: {
    todos: [
      { text: "", done: false },
      { text: "", done: false },
      { text: "", done: false },
      { text: "", done: false },
    ],
  },
};

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const els = {
  choiceCount: document.querySelector("#choiceCount"),
  levelValue: document.querySelector("#levelValue"),
  xpValue: document.querySelector("#xpValue"),
  xpNeedValue: document.querySelector("#xpNeedValue"),
  xpBar: document.querySelector("#xpBar"),
  futureActivitiesInput: document.querySelector("#futureActivitiesInput"),
  studyTime: document.querySelector("#studyTime"),
  focusTotalMinutes: document.querySelector("#focusTotalMinutes"),
  focusTotalUnit: document.querySelector("#focusTotalUnit"),
  currentTime: document.querySelector("#currentTime"),
  languageSelect: document.querySelector("#languageSelect"),
  saveStatus: document.querySelector("#saveStatus"),
  choiceMinusBtn: document.querySelector("#choiceMinusBtn"),
  choicePlusBtn: document.querySelector("#choicePlusBtn"),
  choiceResetBtn: document.querySelector("#choiceResetBtn"),
  levelResetBtn: document.querySelector("#levelResetBtn"),
  quickActionBtns: document.querySelectorAll(".quick-actions button[data-counter]"),
  countdownMinutesInput: document.querySelector("#countdownMinutesInput"),
  countdownSetBtn: document.querySelector("#countdownSetBtn"),
  focusModeInput: document.querySelector("#focusModeInput"),
  focusExitBtn: document.querySelector("#focusExitBtn"),
  timerToggleBtn: document.querySelector("#timerToggleBtn"),
  timerResetBtn: document.querySelector("#timerResetBtn"),
  bombOverlay: document.querySelector("#bombOverlay"),
  bombCloseBtn: document.querySelector("#bombCloseBtn"),
  goalResetBtn: document.querySelector("#goalResetBtn"),
  todoChecks: document.querySelectorAll("[data-todo-check]"),
  todoTexts: document.querySelectorAll("[data-todo-text]"),
  bgColorInput: document.querySelector("#bgColorInput"),
  textColorInput: document.querySelector("#textColorInput"),
  lineColorInput: document.querySelector("#lineColorInput"),
  lineWidthInput: document.querySelector("#lineWidthInput"),
  paperColorInput: document.querySelector("#paperColorInput"),
  timerColorInput: document.querySelector("#timerColorInput"),
  themePresetBtns: document.querySelectorAll("[data-theme-preset]"),
  themeSaveBtns: document.querySelectorAll("[data-theme-save]"),
  themeLoadBtns: document.querySelectorAll("[data-theme-load]"),
  themeControl: document.querySelector(".theme-control"),
  themeToggleBtn: document.querySelector("#themeToggleBtn"),
  newsList: document.querySelector("#newsList"),
  newsStatus: document.querySelector("#newsStatus"),
  newsRefreshBtn: document.querySelector("#newsRefreshBtn"),
  newsMoreLink: document.querySelector("#newsMoreLink"),
  newsSourceBtns: document.querySelectorAll("[data-news-source]"),
};

function currentLanguage() {
  const saved = localStorage.getItem(languageStorageKey);
  return translations[saved] ? saved : "zh";
}

function t(key) {
  return translations[currentLanguage()][key] ?? translations.zh[key] ?? key;
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function setHtml(selector, html) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = html;
}

function applyLanguage() {
  const lang = currentLanguage();
  const dict = translations[lang];
  document.documentElement.lang = dict.htmlLang;
  document.title = dict.title;
  els.languageSelect.value = lang;
  setHtml(".device-header h1", dict.brand);
  setText(".current-time span", dict.currentTime);
  setText(".language-control span", dict.language);
  setText(".goal-head span", dict.todayGoals);
  els.goalResetBtn.textContent = dict.clear;
  els.todoTexts.forEach((input) => {
    input.placeholder = dict.todoPlaceholder;
  });
  setText(".time-card .counter-label", dict.countdown);
  setText(".countdown-setting > span", dict.setMinutes);
  els.countdownSetBtn.textContent = dict.set;
  setText(".focus-total > span", dict.focusTotal);
  els.focusTotalUnit.textContent = dict.minuteUnit;
  setText(".focus-toggle span", dict.focusMode);
  els.focusExitBtn.textContent = dict.exit;
  els.timerResetBtn.textContent = dict.reset;
  setText(".level-mini-label", dict.level);
  els.levelResetBtn.textContent = dict.levelReset;
  setText(".future-card .counter-label", dict.future);
  els.futureActivitiesInput.placeholder = dict.futurePlaceholder;
  setText(".news-card .counter-label", dict.news);
  els.newsRefreshBtn.textContent = dict.refresh;
  els.newsMoreLink.textContent = dict.more;
  translateThemePanel();
  (translatedPresetNames[lang] || translatedPresetNames.zh).forEach((name, index) => {
    if (els.themePresetBtns[index]) els.themePresetBtns[index].textContent = name;
  });
  translateBomb();
  render();
  renderThemeMemoryButtons();
}

function changeLanguage(lang) {
  if (!translations[lang]) return;
  localStorage.setItem(languageStorageKey, lang);
  applyLanguage();
  loadNews();
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || typeof saved !== "object") return;
    state.choiceCount = Math.max(0, Number.parseInt(saved.choiceCount, 10) || 0);
    state.level = Math.max(1, Number.parseInt(saved.level, 10) || 1);
    state.xp = Math.max(0, Number.parseInt(saved.xp, 10) || Number.parseInt(saved.essayCount, 10) || 0);
    normalizeLevel();
    const oldCorrectionCount = Math.max(0, Number.parseInt(saved.correctionCount, 10) || 0);
    state.totalWrongCount = Math.max(0, Number.parseInt(saved.totalWrongCount, 10) || oldCorrectionCount);
    state.remainingWrongCount = Math.max(0, Number.parseInt(saved.remainingWrongCount, 10) || oldCorrectionCount);
    state.remainingWrongCount = Math.min(state.remainingWrongCount, state.totalWrongCount);
    state.futureActivities = typeof saved.futureActivities === "string" ? saved.futureActivities : "";
    state.completedStudyMinutes = Math.max(
      0,
      Number.parseInt(saved.completedStudyMinutes, 10) || Math.floor((Number.parseInt(saved.accumulatedMs, 10) || 0) / 60000),
    );
    state.focusRewardBlocks = Math.max(0, Number.parseInt(saved.focusRewardBlocks, 10) || Math.floor(state.completedStudyMinutes / 25));
    state.countdownMinutes = Math.max(1, Number.parseInt(saved.countdownMinutes, 10) || 25);
    state.remainingMs = Math.max(0, Number.parseInt(saved.remainingMs, 10) || state.countdownMinutes * 60 * 1000);
    state.startedAt = Number.isFinite(saved.startedAt) ? saved.startedAt : null;
    state.active = Boolean(saved.active && state.startedAt);
    state.goals = {
      ...state.goals,
      ...(saved.goals && typeof saved.goals === "object" ? saved.goals : {}),
    };
    state.goals.todos = normalizeTodos(state.goals.todos);
    state.goalsDate = typeof saved.goalsDate === "string" ? saved.goalsDate : localDateKey();
    resetGoalsIfNewDay(false);
  } catch {
    return;
  }
}

function normalizeTodos(todos) {
  const list = Array.isArray(todos) ? todos : [];
  return Array.from({ length: 4 }, (_, index) => ({
    text: String(list[index]?.text ?? ""),
    done: Boolean(list[index]?.done),
  }));
}

function currentRemainingMs() {
  const elapsedMs = state.active && state.startedAt ? Date.now() - state.startedAt : 0;
  return Math.max(0, state.remainingMs - elapsedMs);
}

function currentSessionFocusMinutes() {
  const totalMs = state.countdownMinutes * 60 * 1000;
  const remainingMs = currentRemainingMs();
  if (remainingMs <= 0 || remainingMs >= totalMs) return 0;
  return Math.floor((totalMs - remainingMs) / 60000);
}

function save() {
  localStorage.setItem(storageKey, JSON.stringify({ ...state, remainingMs: currentRemainingMs() }));
  showSaved();
}

function loadTheme() {
  try {
    const saved = JSON.parse(localStorage.getItem(themeStorageKey));
    return sanitizeTheme({ ...defaultTheme, ...(saved && typeof saved === "object" ? saved : {}) });
  } catch {
    return { ...defaultTheme };
  }
}

function sanitizeTheme(theme) {
  const colors = getNipponColors();
  if (!colors.length) return theme;
  const values = new Set(colors.map((color) => color.value.toLowerCase()));
  return {
    bg: values.has(String(theme.bg).toLowerCase()) ? theme.bg : defaultTheme.bg,
    text: values.has(String(theme.text).toLowerCase()) ? theme.text : defaultTheme.text,
    line: values.has(String(theme.line).toLowerCase()) ? theme.line : defaultTheme.line,
    lineWidth: ["1px", "2px", "3px", "4px"].includes(theme.lineWidth) ? theme.lineWidth : defaultTheme.lineWidth,
    paper: values.has(String(theme.paper).toLowerCase()) ? theme.paper : defaultTheme.paper,
    timer: values.has(String(theme.timer).toLowerCase()) ? theme.timer : defaultTheme.timer,
  };
}

function getNipponColors() {
  return Array.isArray(window.NIPPON_COLORS) && window.NIPPON_COLORS.length ? window.NIPPON_COLORS : fallbackNipponColors;
}

function colorOptionLabel(color) {
  return `${color.name} / ${color.romanized} ${color.value}`;
}

function populateColorSelect(select, selectedValue) {
  const colors = getNipponColors();
  select.innerHTML = "";
  colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color.value;
    option.textContent = colorOptionLabel(color);
    option.style.backgroundColor = color.value;
    option.style.color = "#ffffff";
    if (color.value.toLowerCase() === selectedValue.toLowerCase()) option.selected = true;
    select.append(option);
  });
}

function populateThemeControls(theme) {
  populateColorSelect(els.bgColorInput, theme.bg);
  populateColorSelect(els.textColorInput, theme.text);
  populateColorSelect(els.lineColorInput, theme.line);
  els.lineWidthInput.value = theme.lineWidth;
  populateColorSelect(els.paperColorInput, theme.paper);
  populateColorSelect(els.timerColorInput, theme.timer);
}

function applyTheme(theme) {
  document.documentElement.style.setProperty("--bg", theme.bg);
  document.documentElement.style.setProperty("--ink", theme.text);
  document.documentElement.style.setProperty("--line", theme.line);
  document.documentElement.style.setProperty("--line-width", theme.lineWidth);
  document.documentElement.style.setProperty("--paper", theme.paper);
  document.documentElement.style.setProperty("--paper-soft", mixHex(theme.paper, theme.line, 0.16));
  document.documentElement.style.setProperty("--panel-bg", theme.timer);
  els.bgColorInput.style.borderLeft = `18px solid ${theme.bg}`;
  els.textColorInput.style.borderLeft = `18px solid ${theme.text}`;
  els.lineColorInput.style.borderLeft = `18px solid ${theme.line}`;
  els.paperColorInput.style.borderLeft = `18px solid ${theme.paper}`;
  els.timerColorInput.style.borderLeft = `18px solid ${theme.timer}`;
}

function saveTheme() {
  const theme = currentThemeFromInputs();
  localStorage.setItem(themeStorageKey, JSON.stringify(theme));
  applyTheme(theme);
}

function currentThemeFromInputs() {
  return {
    bg: els.bgColorInput.value,
    text: els.textColorInput.value,
    line: els.lineColorInput.value,
    lineWidth: els.lineWidthInput.value,
    paper: els.paperColorInput.value,
    timer: els.timerColorInput.value,
  };
}

function mixHex(hexA, hexB, ratio) {
  const a = parseHex(hexA);
  const b = parseHex(hexB);
  const mixed = a.map((channel, index) => Math.round(channel * (1 - ratio) + b[index] * ratio));
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function parseHex(hex) {
  const value = String(hex).replace("#", "");
  return [0, 2, 4].map((start) => Number.parseInt(value.slice(start, start + 2), 16) || 0);
}

function setThemeCollapsed(collapsed) {
  els.themeControl.classList.toggle("collapsed", collapsed);
  els.themeToggleBtn.setAttribute(
    "aria-label",
    collapsed ? t("themeToggleOpen") : t("themeToggleClose"),
  );
  localStorage.setItem(themeCollapsedStorageKey, collapsed ? "1" : "0");
}

function translateThemePanel() {
  els.themeToggleBtn.textContent = t("colorToggle");
  const labels = els.themeControl.querySelectorAll(":scope > label > span");
  [t("bg"), t("text"), t("line"), t("width"), t("paper"), t("panel")].forEach((text, index) => {
    if (labels[index]) labels[index].textContent = text;
  });
  const memoryLabels = els.themeControl.querySelectorAll(".theme-memory > span");
  if (memoryLabels[0]) memoryLabels[0].textContent = t("presets");
  if (memoryLabels[1]) memoryLabels[1].textContent = t("customMemory");
  setThemeCollapsed(els.themeControl.classList.contains("collapsed"));
}

function translateBomb() {
  setText(".bomb-card strong", t("timeUp"));
  setText(".bomb-card span", t("bombMessage"));
  els.bombCloseBtn.textContent = t("ok");
}

function loadThemeMemory() {
  try {
    const saved = JSON.parse(localStorage.getItem(themeMemoryStorageKey));
    return Array.isArray(saved) ? saved : bundledCustomThemeMemory;
  } catch {
    return bundledCustomThemeMemory;
  }
}

function saveThemeMemory(slots) {
  localStorage.setItem(themeMemoryStorageKey, JSON.stringify(slots.slice(0, 3)));
}

function seedBundledThemeMemory() {
  if (localStorage.getItem(themeMemoryBundleVersionKey) === "1") return;
  saveThemeMemory(bundledCustomThemeMemory);
  localStorage.setItem(themeMemoryBundleVersionKey, "1");
}

function renderThemeMemoryButtons() {
  const slots = loadThemeMemory();
  els.themeSaveBtns.forEach((button, index) => {
    button.textContent = slots[index] ? `\u2713 ${t("savedSlot")} ${index + 1}` : `${t("save")} ${index + 1}`;
    button.classList.toggle("filled", Boolean(slots[index]));
  });
  els.themeLoadBtns.forEach((button, index) => {
    button.textContent = `${t("load")} ${index + 1}`;
    button.disabled = !slots[index];
  });
}

function applyThemePreset(index) {
  const theme = sanitizeTheme(defaultThemeMemory[index]);
  const presetName = (translatedPresetNames[currentLanguage()] || translatedPresetNames.zh)[index] || themeSlotNames[index];
  localStorage.setItem(themeStorageKey, JSON.stringify(theme));
  populateThemeControls(theme);
  applyTheme(theme);
  flashThemeButton(els.themePresetBtns[index], `${t("loaded")} ${presetName}`);
  showSaved();
}

function saveThemeSlot(index) {
  const slots = loadThemeMemory();
  if (slots[index] && !window.confirm(t("confirmOverwrite").replace("{n}", index + 1))) {
    return;
  }
  slots[index] = currentThemeFromInputs();
  saveThemeMemory(slots);
  renderThemeMemoryButtons();
  flashThemeButton(els.themeSaveBtns[index], `${t("savedSlot")} ${index + 1}`);
  showSaved();
}

function loadThemeSlot(index) {
  const slots = loadThemeMemory();
  if (!slots[index]) {
    flashThemeButton(els.themeLoadBtns[index], t("noRecord"));
    return;
  }
  const theme = sanitizeTheme(slots[index]);
  localStorage.setItem(themeStorageKey, JSON.stringify(theme));
  populateThemeControls(theme);
  applyTheme(theme);
  flashThemeButton(els.themeLoadBtns[index], `${t("loaded")} ${index + 1}`);
  showSaved();
}

function flashThemeButton(button, text) {
  const original = button.textContent;
  button.textContent = text;
  window.clearTimeout(button.flashTimer);
  button.flashTimer = window.setTimeout(() => {
    renderThemeMemoryButtons();
  }, 950);
}

function showSaved() {
  els.saveStatus.textContent = t("saved");
  window.clearTimeout(showSaved.timer);
  showSaved.timer = window.setTimeout(() => {
    els.saveStatus.textContent = "";
  }, 900);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
  }
  return [minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

function formatCurrentTime(date = new Date()) {
  return date.toLocaleTimeString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function xpNeed() {
  return state.level * 100;
}

function normalizeLevel() {
  while (state.xp >= xpNeed()) {
    state.xp -= xpNeed();
    state.level += 1;
  }
}

function applyFocusTimeRewards() {
  const rewardBlocks = Math.floor(state.completedStudyMinutes / 25);
  const newBlocks = Math.max(0, rewardBlocks - state.focusRewardBlocks);
  if (newBlocks <= 0) return;
  state.xp += newBlocks * 20;
  state.focusRewardBlocks = rewardBlocks;
  normalizeLevel();
}

function render() {
  if (els.choiceCount) els.choiceCount.textContent = state.choiceCount;
  els.levelValue.textContent = state.level;
  els.xpValue.textContent = state.xp;
  els.xpNeedValue.textContent = xpNeed();
  els.xpBar.style.width = `${Math.min(100, (state.xp / xpNeed()) * 100)}%`;
  if (document.activeElement !== els.futureActivitiesInput) {
    els.futureActivitiesInput.value = state.futureActivities;
  }
  els.studyTime.textContent = formatTime(currentRemainingMs());
  els.focusTotalMinutes.textContent = state.completedStudyMinutes + currentSessionFocusMinutes();
  if (document.activeElement !== els.countdownMinutesInput) {
    els.countdownMinutesInput.value = state.countdownMinutes;
  }
  els.timerToggleBtn.textContent = state.active ? t("pause") : t("start");
  renderTodos();
}

function renderNewsItems(items) {
  els.newsList.innerHTML = "";
  items.slice(0, 5).forEach((item) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = item.link;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = item.title;
    li.append(link);
    els.newsList.append(li);
  });
}

function renderNewsFallback(message) {
  const source = currentNewsSource();
  els.newsList.innerHTML = "";
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = source.moreUrl;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = `${t("more")} ${source.label}`;
  li.append(link);
  els.newsList.append(li);
  els.newsStatus.textContent = message;
}

function currentNewsSourceKey() {
  const saved = localStorage.getItem(newsSourceStorageKey);
  return newsSources[saved] ? saved : "tw";
}

function currentNewsSource() {
  return newsSources[currentNewsSourceKey()];
}

function renderNewsSourceControls() {
  const key = currentNewsSourceKey();
  els.newsSourceBtns.forEach((button) => {
    const active = button.dataset.newsSource === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  els.newsMoreLink.href = currentNewsSource().moreUrl;
}

async function loadNews() {
  if (!els.newsList) return;
  const source = currentNewsSource();
  renderNewsSourceControls();
  els.newsStatus.textContent = t("updating");
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(source.feedUrl)}`;
    const response = await fetch(proxyUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("news request failed");
    const text = await response.text();
    const xml = new DOMParser().parseFromString(text, "application/xml");
    const items = Array.from(xml.querySelectorAll("item"))
      .map((item) => ({
        title: item.querySelector("title")?.textContent?.trim() || "",
        link: item.querySelector("link")?.textContent?.trim() || "",
      }))
      .filter((item) => item.title && item.link);
    if (!items.length) throw new Error("empty news feed");
    renderNewsItems(items);
    els.newsStatus.textContent = `${source.label} ${t("updated")} ${formatCurrentTime()}`;
  } catch {
    renderNewsFallback(t("newsFail"));
  }
}

function selectNewsSource(key) {
  if (!newsSources[key]) return;
  localStorage.setItem(newsSourceStorageKey, key);
  loadNews();
}

function renderCurrentTime() {
  els.currentTime.textContent = formatCurrentTime();
}

function renderTodos() {
  els.todoChecks.forEach((input, index) => {
    input.checked = Boolean(state.goals.todos[index]?.done);
  });
  els.todoTexts.forEach((input, index) => {
    if (document.activeElement !== input) {
      input.value = state.goals.todos[index]?.text ?? "";
    }
  });
}

function saveTodos() {
  resetGoalsIfNewDay(false);
  const previousTodos = state.goals.todos;
  const nextTodos = Array.from({ length: 4 }, (_, index) => ({
    text: els.todoTexts[index].value,
    done: els.todoChecks[index].checked,
  }));
  const newlyCompleted = nextTodos.filter((todo, index) => todo.done && !previousTodos[index]?.done).length;
  if (newlyCompleted > 0) {
    state.xp += newlyCompleted * 20;
    normalizeLevel();
  }
  state.goals.todos = nextTodos;
  state.goalsDate = localDateKey();
  save();
  render();
}

function saveFutureActivities() {
  state.futureActivities = els.futureActivitiesInput.value;
  save();
}

function resetGoals() {
  state.goals = {
    todos: normalizeTodos([]),
  };
  state.goalsDate = localDateKey();
  save();
  render();
}

function resetGoalsIfNewDay(shouldRender = true) {
  const today = localDateKey();
  if (state.goalsDate === today) return;
  state.goals = {
    todos: normalizeTodos([]),
  };
  state.goalsDate = today;
  save();
  if (shouldRender) render();
}

function adjustCounter(key, delta) {
  state[key] = Math.max(0, state[key] + delta);
  save();
  render();
}

function resetCounter(key) {
  state[key] = 0;
  save();
  render();
}

function resetLevel() {
  state.level = 1;
  state.xp = 0;
  save();
  render();
}

function adjustRemainingWrong(delta) {
  const previous = state.remainingWrongCount;
  state.remainingWrongCount = Math.max(0, Math.min(state.totalWrongCount, state.remainingWrongCount + delta));
  const corrected = Math.max(0, previous - state.remainingWrongCount);
  if (corrected > 0) {
    state.xp += corrected * 10;
    normalizeLevel();
  }
  save();
  render();
}

function setTotalWrong(nextTotal) {
  const normalizedTotal = Math.max(0, Number.parseInt(nextTotal, 10) || 0);
  const delta = normalizedTotal - state.totalWrongCount;
  state.totalWrongCount = normalizedTotal;
  state.remainingWrongCount = Math.max(0, Math.min(state.totalWrongCount, state.remainingWrongCount + delta));
  save();
  render();
}

function addTotalWrong(amount) {
  setTotalWrong(state.totalWrongCount + amount);
}

function resetWrongCounts() {
  state.remainingWrongCount = 0;
  state.totalWrongCount = 0;
  save();
  render();
}

function toggleTimer() {
  if (state.active) {
    state.remainingMs = currentRemainingMs();
    state.startedAt = null;
    state.active = false;
  } else {
    unlockAudio();
    if (currentRemainingMs() <= 0) {
      state.remainingMs = state.countdownMinutes * 60 * 1000;
    }
    state.startedAt = Date.now();
    state.active = true;
  }
  save();
  render();
}

function resetTimer() {
  state.completedStudyMinutes = 0;
  state.focusRewardBlocks = 0;
  state.remainingMs = state.countdownMinutes * 60 * 1000;
  state.startedAt = state.active ? Date.now() : null;
  save();
  render();
}

function updateCountdownSetting() {
  state.countdownMinutes = Math.max(1, Number.parseInt(els.countdownMinutesInput.value, 10) || 1);
  state.active = false;
  state.startedAt = null;
  state.remainingMs = state.countdownMinutes * 60 * 1000;
  save();
  render();
}

function finishCountdown() {
  state.active = false;
  state.startedAt = null;
  state.remainingMs = 0;
  state.completedStudyMinutes += state.countdownMinutes;
  applyFocusTimeRewards();
  save();
  render();
  showBomb();
  playTimeUpChime();
  playExplosionSound();
}

function showBomb() {
  els.bombOverlay.hidden = false;
}

function hideBomb() {
  els.bombOverlay.hidden = true;
}

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!sharedAudio || sharedAudio.state === "closed") {
    sharedAudio = new AudioContext();
  }
  if (sharedAudio.state === "suspended") {
    sharedAudio.resume().catch(() => {});
  }
  return sharedAudio;
}

function unlockAudio() {
  const audio = getAudioContext();
  if (!audio) return;
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.0001, audio.currentTime);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.02);
}

function playTimeUpChime() {
  const audio = getAudioContext();
  if (!audio) return;
  [880, 1174.66, 1567.98].forEach((frequency, index) => {
    const start = audio.currentTime + index * 0.16;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.45, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.14);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.16);
  });
}

function setFocusMode(enabled) {
  if (enabled && !state.active) {
    unlockAudio();
    if (currentRemainingMs() <= 0) {
      state.remainingMs = state.countdownMinutes * 60 * 1000;
    }
    state.startedAt = Date.now();
    state.active = true;
    save();
  }
  document.body.classList.toggle("focus-mode", enabled);
  els.focusModeInput.checked = enabled;
  render();
}

function playExplosionSound() {
  const audio = getAudioContext();
  if (!audio) return;
  const duration = 0.9;
  const sampleRate = audio.sampleRate;
  const buffer = audio.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < data.length; index += 1) {
    const progress = index / data.length;
    const decay = (1 - progress) ** 3;
    data[index] = (Math.random() * 2 - 1) * decay;
  }

  const noise = audio.createBufferSource();
  noise.buffer = buffer;

  const lowpass = audio.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(900, audio.currentTime);
  lowpass.frequency.exponentialRampToValueAtTime(80, audio.currentTime + duration);

  const boomGain = audio.createGain();
  boomGain.gain.setValueAtTime(0.0001, audio.currentTime);
  boomGain.gain.exponentialRampToValueAtTime(0.9, audio.currentTime + 0.03);
  boomGain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);

  const thump = audio.createOscillator();
  thump.type = "sine";
  thump.frequency.setValueAtTime(95, audio.currentTime);
  thump.frequency.exponentialRampToValueAtTime(38, audio.currentTime + 0.45);

  const thumpGain = audio.createGain();
  thumpGain.gain.setValueAtTime(0.0001, audio.currentTime);
  thumpGain.gain.exponentialRampToValueAtTime(0.75, audio.currentTime + 0.02);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.5);

  noise.connect(lowpass).connect(boomGain).connect(audio.destination);
  thump.connect(thumpGain).connect(audio.destination);
  noise.start();
  thump.start();
  noise.stop(audio.currentTime + duration);
  thump.stop(audio.currentTime + 0.5);

}

if (els.choiceMinusBtn) els.choiceMinusBtn.addEventListener("click", () => adjustCounter("choiceCount", -1));
if (els.choicePlusBtn) els.choicePlusBtn.addEventListener("click", () => adjustCounter("choiceCount", 1));
if (els.choiceResetBtn) els.choiceResetBtn.addEventListener("click", () => resetCounter("choiceCount"));
els.levelResetBtn.addEventListener("click", resetLevel);
els.quickActionBtns.forEach((button) => {
  button.addEventListener("click", () => adjustCounter(button.dataset.counter, Number.parseInt(button.dataset.amount, 10) || 0));
});
els.futureActivitiesInput.addEventListener("input", saveFutureActivities);
els.newsRefreshBtn.addEventListener("click", loadNews);
els.newsSourceBtns.forEach((button) => {
  button.addEventListener("click", () => selectNewsSource(button.dataset.newsSource));
});
els.countdownSetBtn.addEventListener("click", updateCountdownSetting);
els.countdownMinutesInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    updateCountdownSetting();
  }
});
els.focusModeInput.addEventListener("change", () => setFocusMode(els.focusModeInput.checked));
els.focusExitBtn.addEventListener("click", () => setFocusMode(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("focus-mode")) {
    setFocusMode(false);
  }
});
els.timerToggleBtn.addEventListener("click", toggleTimer);
els.timerResetBtn.addEventListener("click", resetTimer);
els.bombCloseBtn.addEventListener("click", hideBomb);
els.goalResetBtn.addEventListener("click", resetGoals);
els.todoChecks.forEach((input) => input.addEventListener("change", saveTodos));
els.todoTexts.forEach((input) => input.addEventListener("input", saveTodos));
els.bgColorInput.addEventListener("change", saveTheme);
els.textColorInput.addEventListener("change", saveTheme);
els.lineColorInput.addEventListener("change", saveTheme);
els.lineWidthInput.addEventListener("change", saveTheme);
els.paperColorInput.addEventListener("change", saveTheme);
els.timerColorInput.addEventListener("change", saveTheme);
els.themePresetBtns.forEach((button) => {
  button.addEventListener("click", () => applyThemePreset(Number.parseInt(button.dataset.themePreset, 10) || 0));
});
els.themeSaveBtns.forEach((button) => {
  button.addEventListener("click", () => saveThemeSlot(Number.parseInt(button.dataset.themeSave, 10) || 0));
});
els.themeLoadBtns.forEach((button) => {
  button.addEventListener("click", () => loadThemeSlot(Number.parseInt(button.dataset.themeLoad, 10) || 0));
});
els.themeToggleBtn.addEventListener("click", () => setThemeCollapsed(!els.themeControl.classList.contains("collapsed")));
els.languageSelect.addEventListener("change", () => changeLanguage(els.languageSelect.value));

load();
const theme = loadTheme();
populateThemeControls(theme);
applyTheme(theme);
seedBundledThemeMemory();
setThemeCollapsed(localStorage.getItem(themeCollapsedStorageKey) === "1");
applyLanguage();
renderCurrentTime();
loadNews();
window.setInterval(() => {
  renderCurrentTime();
  resetGoalsIfNewDay();
  if (!state.active) return;
  if (currentRemainingMs() <= 0) {
    finishCountdown();
    return;
  }
  render();
}, 1000);

