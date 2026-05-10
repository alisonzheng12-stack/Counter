const storageKey = "minimal-study-counter-v1";
const themeStorageKey = "minimal-study-counter-theme-v1";
const defaultTheme = {
  bg: "#FCFAF2",
  text: "#1C1C1C",
  line: "#B4A582",
};

const state = {
  choiceCount: 0,
  essayCount: 0,
  correctionCount: 0,
  completedStudyMinutes: 0,
  countdownMinutes: 25,
  remainingMs: 25 * 60 * 1000,
  startedAt: null,
  active: false,
  goals: {
    choice: "",
    essay: "",
    correction: "",
    minutes: "",
  },
};

const els = {
  choiceCount: document.querySelector("#choiceCount"),
  essayCount: document.querySelector("#essayCount"),
  correctionCount: document.querySelector("#correctionCount"),
  studyTime: document.querySelector("#studyTime"),
  saveStatus: document.querySelector("#saveStatus"),
  choiceMinusBtn: document.querySelector("#choiceMinusBtn"),
  choicePlusBtn: document.querySelector("#choicePlusBtn"),
  choiceResetBtn: document.querySelector("#choiceResetBtn"),
  essayMinusBtn: document.querySelector("#essayMinusBtn"),
  essayPlusBtn: document.querySelector("#essayPlusBtn"),
  essayResetBtn: document.querySelector("#essayResetBtn"),
  correctionMinusBtn: document.querySelector("#correctionMinusBtn"),
  correctionPlusBtn: document.querySelector("#correctionPlusBtn"),
  correctionResetBtn: document.querySelector("#correctionResetBtn"),
  countdownMinutesInput: document.querySelector("#countdownMinutesInput"),
  timerToggleBtn: document.querySelector("#timerToggleBtn"),
  timerResetBtn: document.querySelector("#timerResetBtn"),
  resetAllBtn: document.querySelector("#resetAllBtn"),
  bombOverlay: document.querySelector("#bombOverlay"),
  bombCloseBtn: document.querySelector("#bombCloseBtn"),
  choiceGoalCongrats: document.querySelector("#choiceGoalCongrats"),
  essayGoalCongrats: document.querySelector("#essayGoalCongrats"),
  correctionGoalCongrats: document.querySelector("#correctionGoalCongrats"),
  timeGoalCongrats: document.querySelector("#timeGoalCongrats"),
  goalResetBtn: document.querySelector("#goalResetBtn"),
  choiceGoalInput: document.querySelector("#choiceGoalInput"),
  essayGoalInput: document.querySelector("#essayGoalInput"),
  correctionGoalInput: document.querySelector("#correctionGoalInput"),
  timeGoalInput: document.querySelector("#timeGoalInput"),
  bgColorInput: document.querySelector("#bgColorInput"),
  textColorInput: document.querySelector("#textColorInput"),
  lineColorInput: document.querySelector("#lineColorInput"),
};

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || typeof saved !== "object") return;
    state.choiceCount = Math.max(0, Number.parseInt(saved.choiceCount, 10) || 0);
    state.essayCount = Math.max(0, Number.parseInt(saved.essayCount, 10) || 0);
    state.correctionCount = Math.max(0, Number.parseInt(saved.correctionCount, 10) || 0);
    state.completedStudyMinutes = Math.max(
      0,
      Number.parseInt(saved.completedStudyMinutes, 10) || Math.floor((Number.parseInt(saved.accumulatedMs, 10) || 0) / 60000),
    );
    state.countdownMinutes = Math.max(1, Number.parseInt(saved.countdownMinutes, 10) || 25);
    state.remainingMs = Math.max(0, Number.parseInt(saved.remainingMs, 10) || state.countdownMinutes * 60 * 1000);
    state.startedAt = Number.isFinite(saved.startedAt) ? saved.startedAt : null;
    state.active = Boolean(saved.active && state.startedAt);
    state.goals = {
      ...state.goals,
      ...(saved.goals && typeof saved.goals === "object" ? saved.goals : {}),
    };
  } catch {
    return;
  }
}

function currentRemainingMs() {
  const elapsedMs = state.active && state.startedAt ? Date.now() - state.startedAt : 0;
  return Math.max(0, state.remainingMs - elapsedMs);
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
  const colors = Array.isArray(window.NIPPON_COLORS) ? window.NIPPON_COLORS : [];
  if (!colors.length) return theme;
  const values = new Set(colors.map((color) => color.value.toLowerCase()));
  return {
    bg: values.has(String(theme.bg).toLowerCase()) ? theme.bg : defaultTheme.bg,
    text: values.has(String(theme.text).toLowerCase()) ? theme.text : defaultTheme.text,
    line: values.has(String(theme.line).toLowerCase()) ? theme.line : defaultTheme.line,
  };
}

function colorOptionLabel(color) {
  return `${color.name} / ${color.romanized} ${color.value}`;
}

function populateColorSelect(select, selectedValue) {
  const colors = Array.isArray(window.NIPPON_COLORS) ? window.NIPPON_COLORS : [];
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
}

function applyTheme(theme) {
  document.documentElement.style.setProperty("--bg", theme.bg);
  document.documentElement.style.setProperty("--ink", theme.text);
  document.documentElement.style.setProperty("--line", theme.line);
  els.bgColorInput.style.borderLeft = `18px solid ${theme.bg}`;
  els.textColorInput.style.borderLeft = `18px solid ${theme.text}`;
  els.lineColorInput.style.borderLeft = `18px solid ${theme.line}`;
}

function saveTheme() {
  const theme = {
    bg: els.bgColorInput.value,
    text: els.textColorInput.value,
    line: els.lineColorInput.value,
  };
  localStorage.setItem(themeStorageKey, JSON.stringify(theme));
  applyTheme(theme);
}

function showSaved() {
  els.saveStatus.textContent = "\u5df2\u5132\u5b58";
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

function render() {
  els.choiceCount.textContent = state.choiceCount;
  els.essayCount.textContent = state.essayCount;
  els.correctionCount.textContent = state.correctionCount;
  els.studyTime.textContent = formatTime(currentRemainingMs());
  els.countdownMinutesInput.value = state.countdownMinutes;
  els.timerToggleBtn.textContent = state.active ? "\u66ab\u505c" : "\u958b\u59cb";
  els.choiceGoalInput.value = state.goals.choice;
  els.essayGoalInput.value = state.goals.essay;
  els.correctionGoalInput.value = state.goals.correction;
  els.timeGoalInput.value = state.goals.minutes;
  renderGoalStatus();
}

function numericGoal(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function renderGoalStatus() {
  const statuses = [
    [els.choiceGoalCongrats, numericGoal(state.goals.choice), state.choiceCount],
    [els.essayGoalCongrats, numericGoal(state.goals.essay), state.essayCount],
    [els.correctionGoalCongrats, numericGoal(state.goals.correction), state.correctionCount],
    [els.timeGoalCongrats, numericGoal(state.goals.minutes), state.completedStudyMinutes],
  ];

  statuses.forEach(([element, goal, current]) => {
    element.hidden = !(goal !== null && current >= goal);
  });
}

function saveGoals() {
  state.goals = {
    choice: els.choiceGoalInput.value,
    essay: els.essayGoalInput.value,
    correction: els.correctionGoalInput.value,
    minutes: els.timeGoalInput.value,
  };
  save();
  renderGoalStatus();
}

function resetGoals() {
  state.goals = {
    choice: "",
    essay: "",
    correction: "",
    minutes: "",
  };
  save();
  render();
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

function toggleTimer() {
  if (state.active) {
    state.remainingMs = currentRemainingMs();
    state.startedAt = null;
    state.active = false;
  } else {
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
  save();
  render();
  showBomb();
}

function showBomb() {
  els.bombOverlay.hidden = false;
}

function hideBomb() {
  els.bombOverlay.hidden = true;
}

function resetAll() {
  state.choiceCount = 0;
  state.essayCount = 0;
  state.correctionCount = 0;
  state.completedStudyMinutes = 0;
  state.remainingMs = state.countdownMinutes * 60 * 1000;
  state.startedAt = state.active ? Date.now() : null;
  save();
  render();
}

els.choiceMinusBtn.addEventListener("click", () => adjustCounter("choiceCount", -1));
els.choicePlusBtn.addEventListener("click", () => adjustCounter("choiceCount", 1));
els.choiceResetBtn.addEventListener("click", () => resetCounter("choiceCount"));
els.essayMinusBtn.addEventListener("click", () => adjustCounter("essayCount", -1));
els.essayPlusBtn.addEventListener("click", () => adjustCounter("essayCount", 1));
els.essayResetBtn.addEventListener("click", () => resetCounter("essayCount"));
els.correctionMinusBtn.addEventListener("click", () => adjustCounter("correctionCount", -1));
els.correctionPlusBtn.addEventListener("click", () => adjustCounter("correctionCount", 1));
els.correctionResetBtn.addEventListener("click", () => resetCounter("correctionCount"));
els.countdownMinutesInput.addEventListener("change", updateCountdownSetting);
els.timerToggleBtn.addEventListener("click", toggleTimer);
els.timerResetBtn.addEventListener("click", resetTimer);
els.resetAllBtn.addEventListener("click", resetAll);
els.bombCloseBtn.addEventListener("click", hideBomb);
els.goalResetBtn.addEventListener("click", resetGoals);
els.choiceGoalInput.addEventListener("input", saveGoals);
els.essayGoalInput.addEventListener("input", saveGoals);
els.correctionGoalInput.addEventListener("input", saveGoals);
els.timeGoalInput.addEventListener("input", saveGoals);
els.bgColorInput.addEventListener("change", saveTheme);
els.textColorInput.addEventListener("change", saveTheme);
els.lineColorInput.addEventListener("change", saveTheme);

load();
const theme = loadTheme();
populateThemeControls(theme);
applyTheme(theme);
render();
window.setInterval(() => {
  if (!state.active) return;
  if (currentRemainingMs() <= 0) {
    finishCountdown();
    return;
  }
  render();
}, 1000);
