const storageKey = "minimal-study-counter-v1";
const themeStorageKey = "minimal-study-counter-theme-v1";
const themeCollapsedStorageKey = "minimal-study-counter-theme-collapsed";
const themeMemoryStorageKey = "minimal-study-counter-theme-memory-v1";
const themeMemoryBundleVersionKey = "minimal-study-counter-theme-memory-bundle-20260511-2";
const themeSlot01SnapshotKey = "minimal-study-counter-theme-slot-01-snapshot-20260514-3";
const newsSourceStorageKey = "minimal-study-counter-news-source-v1";
const languageStorageKey = "minimal-study-counter-language-v1";
const syncUrlStorageKey = "minimal-study-counter-sync-url-v1";
const syncTokenStorageKey = "minimal-study-counter-sync-token-v1";
const layoutVisibilityStorageKey = "minimal-study-counter-layout-visibility-v1";
const musicSettingsStorageKey = "minimal-study-counter-music-settings-v1";
const routineMaxCount = 50;
const routineSelectedMax = 6;
const defaultSyncUrl = "https://script.google.com/macros/s/AKfycbxFvPv6gazMnjheujk_gsx5ZtijmhJ5vz9N656YyUvT0517EXmSsteBTJ_gftCgtDsU/exec";
const autoSyncDelayMs = 6000;
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
let autoBackupTimer = null;
let localMusicTracks = [];
const rewardDropTable = [
  { label: "🌿 休息5分鐘", weight: 35, coins: 0 },
  { label: "🎵 聽歌1~2首", weight: 25, coins: 0 },
  { label: "🤖 GPT提問10分鐘", weight: 20, coins: 0 },
  { label: "🧠 科技探索10分鐘", weight: 10, coins: 0 },
  { label: "+10N幣", weight: 9, coins: 10 },
  { label: "+50N幣", weight: 0.9, coins: 50 },
  { label: "Tomica小車", weight: 0.1, coins: 0 },
];
const rewardDropExpUnit = 20;
const translatedPresetNames = {
  zh: ["日系", "櫻花可愛風", "靜謐感氛圍", "夏日清霜"],
  en: ["Japanese", "Sakura Cute", "Quiet Mood", "Summer Frost"],
  de: ["Japanisch", "Sakura süß", "Stille Stimmung", "Sommerfrost"],
  ja: ["和風", "桜かわいい", "静かな雰囲気", "夏の霜"],
};
const translations = {
  zh: {
    htmlLang: "zh-Hant",
    title: "你能做到",
    brand: "你能做到",
    currentTime: "現在時間",
    language: "語言",
    todayGoals: "今日目標",
    currentGoal: "現在目標",
    currentGoalEmpty: "先輸入一個目標",
    rewardIncome: "累積收入",
    rewardEmpty: "尚未掉落",
    rewardTool: "獎勵",
    rewardTitle: "獎勵列表",
    rewardHistoryTitle: "歷史獲得",
    rewardClaimed: "已領取",
    rewardUnclaimed: "未領取",
    goalResetHint: "每日00:00重置",
    completedGoals: "完成歷史",
    clear: "清空",
    layoutTitle: "面板顯示",
    layoutToggle: "面",
    toolLabels: {
      theme: "色彩",
      inspiration: "靈感",
      layout: "面板",
      music: "音樂",
      reward: "獎勵",
      worlds: "九界",
      routine: "目標",
      sync: "同步",
    },
    moreTool: "更多",
    toolMenu: "工具",
    layoutFeatures: {
      music: "音樂",
      level: "等級經驗",
      goals: "今日目標",
      timer: "倒數時間",
      future: "未來活動",
      news: "重點新聞",
      sync: "同步",
      theme: "色彩",
      inspiration: "靈感",
      worlds: "九界",
      inventory: "背包",
    },
    music: "音樂",
    musicPlay: "播放",
    musicPause: "暫停",
    musicLoop: "循環",
    musicChoose: "選擇本機音檔",
    musicEmpty: "請從你的裝置選擇音檔。",
    musicLoadFail: "音樂清單載入失敗。",
    musicSelected: "已選擇 {n} 首。重新開啟網頁後需再選一次。",
    dailyTodoApply: "加入每日",
    dailyTodoSave: "管理目標",
    dailyTodoSaved: "每日必做已保存。",
    dailyTodoEmpty: "先設定每日必做。",
    todoPlaceholder: "輸入今日要完成的事",
    todoNormal: "普通",
    todoChallenge: "限時",
    todoDeadline: "期限",
    todoPastDeadline: "不能設定已經過去的時間。",
    moreGoals: "新增更多目標",
    hideMoreGoals: "收起更多目標",
    countdown: "倒數時間",
    setMinutes: "設定分鐘",
    set: "設置",
    focusTotal: "已累積專注時間",
    minuteUnit: "分鐘",
    minuteShortUnit: "分",
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
    futureSearchDate: "搜尋日期",
    futureAll: "全部",
    futureEventDate: "活動日期",
    dateHint: "年/月/日",
    futureEventText: "活動內容",
    futureEventPlaceholder: "輸入未來活動",
    futureAdd: "加入",
    futureEmpty: "尚未加入活動",
    futureNoMatch: "這天沒有活動",
    futureDelete: "刪除",
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
    save: "保存",
    load: "取",
    use: "使用",
    delete: "刪除",
    savedSlot: "已存",
    noRecord: "無記錄",
    confirmOverwrite: "確定要覆蓋自訂 {n} 的配色嗎？",
    loaded: "已取",
    timeUp: "時間到！",
    bombMessage: "休息一下，然後繼續前進。",
    ok: "知道了",
    sync: "同步",
    syncTitle: "自動備份",
    syncPassword: "備份密碼",
    syncPasswordPlaceholder: "輸入你自己設定的同步密碼",
    syncSave: "立即備份",
    syncLoad: "還原",
    syncNeedPassword: "請先填同步密碼。",
    syncAutoSaved: "已自動備份。",
    syncSaved: "已送出備份。",
    syncNoData: "雲端尚無可還原資料。",
    syncRestored: "已從雲端還原，重新整理中。",
    syncReading: "正在從雲端讀取...",
    syncReadFail: "讀取失敗，請確認密碼。",
    inventory: "背包",
    inspiration: "靈感",
    inspirationTitle: "靈感寫入",
    inspirationPlaceholder: "先把腦中的構想丟進來。",
    inspirationSave: "保存",
    inspirationClear: "清空",
  },
  en: {
    htmlLang: "en",
    title: "You Can Do It",
    brand: "You Can Do It",
    currentTime: "Current Time",
    language: "Language",
    todayGoals: "Today's Goals",
    currentGoal: "Current Goal",
    currentGoalEmpty: "Add a goal first",
    rewardIncome: "Total Income",
    rewardEmpty: "No drop yet",
    rewardTool: "Reward",
    rewardTitle: "Rewards",
    rewardHistoryTitle: "History",
    rewardClaimed: "Claimed",
    rewardUnclaimed: "Open",
    goalResetHint: "Resets daily at 00:00",
    completedGoals: "Done",
    clear: "Clear",
    layoutTitle: "Panel Display",
    layoutToggle: "Panel",
    toolLabels: {
      theme: "Color",
      inspiration: "Idea",
      layout: "Panel",
      music: "Music",
      reward: "Reward",
      worlds: "World",
      routine: "Goal",
      sync: "Sync",
    },
    moreTool: "More",
    toolMenu: "Tools",
    layoutFeatures: {
      music: "Music",
      level: "Level",
      goals: "Goals",
      timer: "Timer",
      future: "Activities",
      news: "News",
      sync: "Sync",
      theme: "Colors",
      inspiration: "Ideas",
      worlds: "Worlds",
      inventory: "Bag",
    },
    music: "Music",
    musicPlay: "Play",
    musicPause: "Pause",
    musicLoop: "Loop",
    musicChoose: "Choose Local Audio",
    musicEmpty: "Choose audio files from your device.",
    musicLoadFail: "Music list failed to load.",
    musicSelected: "{n} selected. Please choose again after reopening the page.",
    dailyTodoApply: "Fill Routine",
    dailyTodoSave: "Manage Goals",
    dailyTodoSaved: "Daily routine saved.",
    dailyTodoEmpty: "Set your daily routine first.",
    todoPlaceholder: "Enter something to complete today",
    todoNormal: "Normal",
    todoChallenge: "Timed",
    todoDeadline: "Due",
    todoPastDeadline: "You cannot set a time that has already passed.",
    moreGoals: "Add More Goals",
    hideMoreGoals: "Hide More Goals",
    countdown: "Countdown",
    setMinutes: "Set minutes",
    set: "Set",
    focusTotal: "Accumulated Focus Time",
    minuteUnit: "min",
    minuteShortUnit: "min",
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
    futureSearchDate: "Search Date",
    futureAll: "All",
    futureEventDate: "Event Date",
    dateHint: "YYYY/MM/DD",
    futureEventText: "Event",
    futureEventPlaceholder: "Enter a future event",
    futureAdd: "Add",
    futureEmpty: "No events yet",
    futureNoMatch: "No events on this date",
    futureDelete: "Delete",
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
    use: "Use",
    delete: "Delete",
    savedSlot: "Saved",
    noRecord: "Empty",
    confirmOverwrite: "Overwrite custom palette {n}?",
    loaded: "Loaded",
    timeUp: "Time's up!",
    bombMessage: "Take a short break, then keep going.",
    ok: "OK",
    sync: "Sync",
    syncTitle: "Auto Backup",
    syncPassword: "Backup Password",
    syncPasswordPlaceholder: "Enter your sync password",
    syncSave: "Back Up Now",
    syncLoad: "Restore",
    syncNeedPassword: "Enter your sync password first.",
    syncAutoSaved: "Auto backup saved.",
    syncSaved: "Backup sent.",
    syncNoData: "No backup data found.",
    syncRestored: "Restored. Reloading.",
    syncReading: "Reading backup...",
    syncReadFail: "Restore failed. Check your password.",
    inventory: "Bag",
    inspiration: "Idea",
    inspirationTitle: "Idea Capture",
    inspirationPlaceholder: "Drop the idea from your head here.",
    inspirationSave: "Save",
    inspirationClear: "Clear",
  },
  de: {
    htmlLang: "de",
    title: "Du schaffst das",
    brand: "Du schaffst das",
    currentTime: "Aktuelle Uhrzeit",
    language: "Sprache",
    todayGoals: "Tagesziele",
    currentGoal: "Aktuelles Ziel",
    currentGoalEmpty: "Erst ein Ziel eingeben",
    rewardIncome: "Gesamtertrag",
    rewardEmpty: "Noch kein Fund",
    rewardTool: "Bonus",
    rewardTitle: "Belohnungen",
    rewardHistoryTitle: "Verlauf",
    rewardClaimed: "Erhalten",
    rewardUnclaimed: "Offen",
    goalResetHint: "Reset um 00:00",
    completedGoals: "Fertig",
    clear: "Leeren",
    layoutTitle: "Anzeige",
    layoutToggle: "Panel",
    toolLabels: {
      theme: "Farb",
      inspiration: "Idee",
      layout: "Panel",
      music: "Mus",
      reward: "Bonus",
      worlds: "Welt",
      routine: "Ziel",
      sync: "Sync",
    },
    moreTool: "Mehr",
    toolMenu: "Tool",
    layoutFeatures: {
      music: "Musik",
      level: "Level",
      goals: "Ziele",
      timer: "Timer",
      future: "Termine",
      news: "Nachrichten",
      sync: "Sync",
      theme: "Farben",
      inspiration: "Ideen",
      worlds: "Welten",
      inventory: "Tasche",
    },
    music: "Musik",
    musicPlay: "Start",
    musicPause: "Pause",
    musicLoop: "Loop",
    musicChoose: "Lokale Musik wählen",
    musicEmpty: "Bitte Audiodateien von deinem Gerät auswählen.",
    musicLoadFail: "Musikliste konnte nicht geladen werden.",
    musicSelected: "{n} ausgewählt. Nach dem erneuten Öffnen bitte wieder auswählen.",
    dailyTodoApply: "Routine",
    dailyTodoSave: "Ziele verwalten",
    dailyTodoSaved: "Tägliche Routine gespeichert.",
    dailyTodoEmpty: "Bitte zuerst die Routine festlegen.",
    todoPlaceholder: "Aufgabe für heute eingeben",
    todoNormal: "Normal",
    todoChallenge: "Zeit",
    todoDeadline: "Bis",
    todoPastDeadline: "Vergangene Zeiten sind nicht erlaubt.",
    moreGoals: "Mehr Ziele",
    hideMoreGoals: "Einklappen",
    countdown: "Countdown",
    setMinutes: "Minuten",
    set: "Setzen",
    focusTotal: "Fokuszeit gesamt",
    minuteUnit: "Min.",
    minuteShortUnit: "Min.",
    focusMode: "Fokusmodus",
    exit: "Beenden",
    start: "Start",
    pause: "Pause",
    reset: "Reset",
    level: "Level & EXP",
    xpNote: "Jeder Schritt nach vorn wird Teil deiner Erfahrung.",
    levelReset: "Level-Reset",
    future: "Künftige Termine",
    futurePlaceholder: "Ein künftiger Termin pro Zeile",
    futureSearchDate: "Suche",
    futureAll: "Alle",
    futureEventDate: "Datum",
    dateHint: "JJJJ/MM/TT",
    futureEventText: "Text",
    futureEventPlaceholder: "Termin eingeben",
    futureAdd: "Hinzuf.",
    futureEmpty: "Noch keine Termine",
    futureNoMatch: "Keine Termine an diesem Datum",
    futureDelete: "Löschen",
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
    use: "Nutzen",
    delete: "Lösch.",
    savedSlot: "Gespeichert",
    noRecord: "Leer",
    confirmOverwrite: "Eigene Palette {n} überschreiben?",
    loaded: "Geladen",
    timeUp: "Zeit ist um!",
    bombMessage: "Mach kurz Pause und geh dann weiter.",
    ok: "OK",
    sync: "Sync",
    syncTitle: "Auto-Backup",
    syncPassword: "Backup-Passwort",
    syncPasswordPlaceholder: "Gib dein Sync-Passwort ein",
    syncSave: "Jetzt sichern",
    syncLoad: "Wiederherstellen",
    syncNeedPassword: "Bitte zuerst das Passwort eingeben.",
    syncAutoSaved: "Automatisch gesichert.",
    syncSaved: "Sicherung gesendet.",
    syncNoData: "Keine Sicherung gefunden.",
    syncRestored: "Wiederhergestellt. Seite lädt neu.",
    syncReading: "Sicherung wird gelesen...",
    syncReadFail: "Fehler beim Laden. Passwort prüfen.",
    inventory: "Tasche",
    inspiration: "Idee",
    inspirationTitle: "Idee notieren",
    inspirationPlaceholder: "Gedanken hier schnell festhalten.",
    inspirationSave: "Speich.",
    inspirationClear: "Leeren",
  },
  ja: {
    htmlLang: "ja",
    title: "あなたならできる",
    brand: "あなたならできる",
    currentTime: "現在時刻",
    language: "言語",
    todayGoals: "今日の目標",
    currentGoal: "現在の目標",
    currentGoalEmpty: "先に目標を入力",
    rewardIncome: "累積収入",
    rewardEmpty: "まだドロップなし",
    rewardTool: "報酬",
    rewardTitle: "報酬リスト",
    rewardHistoryTitle: "獲得履歴",
    rewardClaimed: "受取済",
    rewardUnclaimed: "未受取",
    goalResetHint: "毎日00:00にリセット",
    completedGoals: "完了",
    clear: "クリア",
    layoutTitle: "表示パネル",
    layoutToggle: "面",
    toolLabels: {
      theme: "色彩",
      inspiration: "発想",
      layout: "面板",
      music: "音楽",
      reward: "報酬",
      worlds: "九界",
      routine: "目標",
      sync: "同期",
    },
    moreTool: "もっと",
    toolMenu: "道具",
    layoutFeatures: {
      music: "音楽",
      level: "レベル",
      goals: "今日の目標",
      timer: "タイマー",
      future: "予定",
      news: "ニュース",
      sync: "同期",
      theme: "色彩",
      inspiration: "ひらめき",
      worlds: "九界",
      inventory: "バッグ",
    },
    music: "音楽",
    musicPlay: "再生",
    musicPause: "一時停止",
    musicLoop: "ループ",
    musicChoose: "端末の音声を選択",
    musicEmpty: "端末から音声ファイルを選択してください。",
    musicLoadFail: "音楽リストを読み込めませんでした。",
    musicSelected: "{n}曲を選択しました。再度開いたらもう一度選択してください。",
    dailyTodoApply: "必須を入力",
    dailyTodoSave: "目標管理",
    dailyTodoSaved: "毎日の必須タスクを保存しました。",
    dailyTodoEmpty: "先に毎日の必須タスクを設定してください。",
    todoPlaceholder: "今日やることを入力",
    todoNormal: "通常",
    todoChallenge: "時間",
    todoDeadline: "期限",
    todoPastDeadline: "過ぎた時間は設定できません。",
    moreGoals: "目標をさらに追加",
    hideMoreGoals: "追加目標を閉じる",
    countdown: "カウントダウン",
    setMinutes: "分を設定",
    set: "設定",
    focusTotal: "累積集中時間",
    minuteUnit: "分",
    minuteShortUnit: "分",
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
    futureSearchDate: "日付検索",
    futureAll: "全部",
    futureEventDate: "予定日",
    dateHint: "年/月/日",
    futureEventText: "予定",
    futureEventPlaceholder: "未来の予定を入力",
    futureAdd: "追加",
    futureEmpty: "予定はまだありません",
    futureNoMatch: "この日の予定はありません",
    futureDelete: "削除",
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
    use: "使用",
    delete: "削除",
    savedSlot: "保存済",
    noRecord: "なし",
    confirmOverwrite: "カスタム {n} の配色を上書きしますか？",
    loaded: "読込済",
    timeUp: "時間です！",
    bombMessage: "少し休んで、また進もう。",
    ok: "OK",
    sync: "同期",
    syncTitle: "自動バックアップ",
    syncPassword: "バックアップパスワード",
    syncPasswordPlaceholder: "自分で設定した同期パスワードを入力",
    syncSave: "今すぐ保存",
    syncLoad: "復元",
    syncNeedPassword: "同期パスワードを入力してください。",
    syncAutoSaved: "自動保存しました。",
    syncSaved: "保存しました。",
    syncNoData: "復元できるデータがありません。",
    syncRestored: "復元しました。再読み込みします。",
    syncReading: "読み込み中...",
    syncReadFail: "読み込み失敗。パスワードを確認してください。",
    inventory: "バッグ",
    inspiration: "ひらめき",
    inspirationTitle: "ひらめきメモ",
    inspirationPlaceholder: "頭に浮かんだことをここに置く。",
    inspirationSave: "保存",
    inspirationClear: "クリア",
  },
};
const worldTooltipTranslations = {
  zh: [
    ["阿斯嘉（神界）", "核心：榮耀感", "玩法：解鎖稱號、展示成就、收藏勳章、史詩任務"],
    ["華納海姆（生命界）", "核心：成長", "玩法：學習植物、技能樹、習慣養成、長期累積"],
    ["米德加（人界）", "核心：現實生活", "玩法：每日任務、飲食、睡眠、運動、金錢管理"],
    ["約頓海姆（巨人國）", "核心：突破壓力", "玩法：Boss戰、模擬考、限時戰、高難題、衝刺模式"],
    ["亞爾夫海姆（光精靈）", "核心：靈感", "玩法：插畫、音樂、世界觀、創作圖鑑、靈感卡片"],
    ["黑暗界（鍛造界）", "核心：知識加工", "玩法：經驗鍛造、卡片合成、技能進化、筆記精煉"],
    ["火界（穆斯貝爾海姆）", "核心：短期爆發", "玩法：EXP倍率、限時活動、連擊、狂熱模式"],
    ["冰界（尼福爾海姆）", "核心：安靜專注", "玩法：深度專注、白噪音、呼吸、心流"],
    ["海爾海姆（亡界）", "核心：失敗循環", "玩法：死亡回放、重生、復活、黑化進化"],
  ],
  en: [
    ["Asgard", "Core: Glory", "Play: titles, achievements, medals, epic quests"],
    ["Vanaheim", "Core: Growth", "Play: plants, skill trees, habits, long-term progress"],
    ["Midgard", "Core: Real Life", "Play: daily tasks, food, sleep, exercise, money"],
    ["Jotunheim", "Core: Pressure Breakthrough", "Play: boss fights, timed trials, hard challenges"],
    ["Alfheim", "Core: Inspiration", "Play: art, music, worldbuilding, idea cards"],
    ["Nidavellir", "Core: Knowledge Crafting", "Play: refining notes, synthesis, skill evolution"],
    ["Muspelheim", "Core: Short Burst", "Play: EXP boosts, timed events, combos, fever mode"],
    ["Niflheim", "Core: Quiet Focus", "Play: deep focus, white noise, breathing, flow"],
    ["Helheim", "Core: Failure Loop", "Play: replay, rebirth, revival, dark evolution"],
  ],
  de: [
    ["Asgard", "Kern: Ruhm", "Spiel: Titel, Erfolge, Medaillen, epische Aufgaben"],
    ["Vanaheim", "Kern: Wachstum", "Spiel: Pflanzen, Skillbaum, Gewohnheiten, Langzeitaufbau"],
    ["Midgard", "Kern: Alltag", "Spiel: Tagesaufgaben, Essen, Schlaf, Sport, Geld"],
    ["Jotunheim", "Kern: Druck durchbrechen", "Spiel: Bosskampf, Zeitprüfung, schwere Aufgaben"],
    ["Alfheim", "Kern: Inspiration", "Spiel: Kunst, Musik, Weltenbau, Ideen-Karten"],
    ["Nidavellir", "Kern: Wissen schmieden", "Spiel: Notizen veredeln, Synthese, Skills"],
    ["Muspelheim", "Kern: kurzer Sprint", "Spiel: EXP-Boost, Events, Kombos, Fiebermodus"],
    ["Niflheim", "Kern: ruhiger Fokus", "Spiel: Tiefenfokus, Rauschen, Atmung, Flow"],
    ["Helheim", "Kern: Scheitern nutzen", "Spiel: Rückblick, Neubeginn, Wiederkehr, Entwicklung"],
  ],
  ja: [
    ["アースガルズ", "核心：栄光", "遊び：称号、実績、勲章、叙事クエスト"],
    ["ヴァナヘイム", "核心：成長", "遊び：植物、スキルツリー、習慣、長期蓄積"],
    ["ミズガルズ", "核心：現実生活", "遊び：日課、食事、睡眠、運動、お金"],
    ["ヨトゥンヘイム", "核心：圧力突破", "遊び：ボス戦、模試、制限時間、高難度"],
    ["アルフヘイム", "核心：ひらめき", "遊び：絵、音楽、世界観、図鑑、カード"],
    ["ニザヴェッリル", "核心：知識加工", "遊び：経験鍛造、合成、技能進化、ノート精錬"],
    ["ムスペルヘイム", "核心：短期爆発", "遊び：EXP倍率、限定イベント、連撃、熱狂"],
    ["ニヴルヘイム", "核心：静かな集中", "遊び：深い集中、白色雑音、呼吸、フロー"],
    ["ヘルヘイム", "核心：失敗循環", "遊び：回想、再生、復活、暗黒進化"],
  ],
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
const slot01Theme = {
  bg: "#FCFAF2",
  text: "#E03C8A",
  line: "#CAAD5F",
  lineWidth: "2px",
  paper: "#FFFFFB",
  timer: "#FFFFFB",
};
const themeSlotNames = ["\u65e5\u7cfb", "\u6afb\u82b1\u53ef\u611b\u98a8", "\u975c\u8b10\u611f\u6c1b\u570d", "\u590f\u65e5\u6e05\u971c"];
const defaultThemeMemory = [
  {
    bg: "#FFFFFF",
    text: "#5B3D31",
    line: "#6F4B3E",
    lineWidth: "2px",
    paper: "#FFFFFF",
    timer: "#F3F1F1",
  },
  {
    bg: "#FEDFE1",
    text: "#64363C",
    line: "#F596AA",
    lineWidth: "2px",
    paper: "#FFFFFB",
    timer: "#F8C3CD",
  },
  {
    bg: "#07110D",
    text: "#E8F0EA",
    line: "#5F7A68",
    lineWidth: "3px",
    paper: "#14221B",
    timer: "#0D1A14",
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
  slot01Theme,
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
  rewardExpUnits: 0,
  nCoins: 0,
  lastNCoinGain: 0,
  lastNCoinGrowth: 0,
  rewardHistory: [],
  claimedRewardHistory: [],
  remainingWrongCount: 0,
  totalWrongCount: 0,
  futureActivities: "",
  futureEvents: [],
  futureSearchDate: "",
  completedStudyMinutes: 0,
  focusRewardBlocks: 0,
  countdownMinutes: 25,
  remainingMs: 25 * 60 * 1000,
  startedAt: null,
  active: false,
  currentGoalText: "",
  goalsDate: localDateKey(),
  goals: {
    todos: [
      { text: "", done: false },
      { text: "", done: false },
      { text: "", done: false },
      { text: "", done: false },
    ],
  },
  dailyTodoTemplate: [],
  dailyTodoPool: [],
  completedGoals: [],
  inspirations: [],
  unlockedWorlds: [],
};
const todoCount = 8;
const inventorySlotCount = 32;
const worldKeys = [
  { id: 1, level: 10, name: "Asgard", initial: "A" },
  { id: 2, level: 20, name: "Vanaheim", initial: "V" },
  { id: 3, level: 30, name: "Midgard", initial: "M" },
  { id: 4, level: 40, name: "Jotunheim", initial: "J" },
  { id: 5, level: 50, name: "Alfheim", initial: "A" },
  { id: 6, level: 60, name: "Nidavellir", initial: "N" },
  { id: 7, level: 70, name: "Muspelheim", initial: "M" },
  { id: 8, level: 80, name: "Niflheim", initial: "N" },
  { id: 9, level: 90, name: "Helheim", initial: "H" },
];
const maxWorldKeyCount = worldKeys.length;
const layoutFeatures = ["music", "level", "goals", "timer", "future", "news", "sync", "theme", "inspiration", "worlds", "inventory"];
const defaultLayoutVisibility = Object.fromEntries(layoutFeatures.map((feature) => [feature, true]));

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const els = {
  toolSidebar: document.querySelector(".tool-sidebar"),
  toolSidebarToggleBtn: document.querySelector("#toolSidebarToggleBtn"),
  toolButtons: document.querySelectorAll("[data-tool]"),
  choiceCount: document.querySelector("#choiceCount"),
  levelValue: document.querySelector("#levelValue"),
  xpValue: document.querySelector("#xpValue"),
  xpNeedValue: document.querySelector("#xpNeedValue"),
  xpBar: document.querySelector("#xpBar"),
  rewardLabel: document.querySelector("#rewardLabel"),
  nCoinValue: document.querySelector("#nCoinValue"),
  rewardGrowth: document.querySelector("#rewardGrowth"),
  rewardLatest: document.querySelector("#rewardLatest"),
  rewardDock: document.querySelector(".reward-dock"),
  rewardPanelTitle: document.querySelector(".reward-head span"),
  rewardPanelCount: document.querySelector("#rewardPanelCount"),
  rewardHistoryBtn: document.querySelector("#rewardHistoryBtn"),
  rewardCloseBtn: document.querySelector("#rewardCloseBtn"),
  rewardList: document.querySelector("#rewardList"),
  futureSearchDateInput: document.querySelector("#futureSearchDateInput"),
  futureClearSearchBtn: document.querySelector("#futureClearSearchBtn"),
  futureDateInput: document.querySelector("#futureDateInput"),
  futureTextInput: document.querySelector("#futureTextInput"),
  futureAddBtn: document.querySelector("#futureAddBtn"),
  futureList: document.querySelector("#futureList"),
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
  countdownPresetBtns: document.querySelectorAll("[data-countdown-minutes]"),
  countdownSetBtn: document.querySelector("#countdownSetBtn"),
  focusModeInput: document.querySelector("#focusModeInput"),
  focusExitBtn: document.querySelector("#focusExitBtn"),
  timerToggleBtn: document.querySelector("#timerToggleBtn"),
  timerResetBtn: document.querySelector("#timerResetBtn"),
  bombOverlay: document.querySelector("#bombOverlay"),
  bombCloseBtn: document.querySelector("#bombCloseBtn"),
  dailyTodoApplyBtn: document.querySelector("#dailyTodoApplyBtn"),
  dailyTodoSaveBtn: document.querySelector("#dailyTodoSaveBtn"),
  currentGoalSelect: document.querySelector("#currentGoalSelect"),
  completedGoalsBtn: document.querySelector("#completedGoalsBtn"),
  goalResetBtn: document.querySelector("#goalResetBtn"),
  extraGoals: document.querySelector(".extra-goals"),
  extraGoalsToggleBtn: document.querySelector("#extraGoalsToggleBtn"),
  todoChecks: document.querySelectorAll("[data-todo-check]"),
  todoTexts: document.querySelectorAll("[data-todo-text]"),
  todoTypes: document.querySelectorAll("[data-todo-type]"),
  todoDeadlines: document.querySelectorAll("[data-todo-deadline]"),
  bgColorInput: document.querySelector("#bgColorInput"),
  textColorInput: document.querySelector("#textColorInput"),
  lineColorInput: document.querySelector("#lineColorInput"),
  lineWidthInput: document.querySelector("#lineWidthInput"),
  paperColorInput: document.querySelector("#paperColorInput"),
  timerColorInput: document.querySelector("#timerColorInput"),
  themePresetBtns: document.querySelectorAll("[data-theme-preset]"),
  themeNameInputs: document.querySelectorAll("[data-theme-name]"),
  themeSaveBtns: document.querySelectorAll("[data-theme-save]"),
  themeLoadBtns: document.querySelectorAll("[data-theme-load]"),
  themeDeleteBtns: document.querySelectorAll("[data-theme-delete]"),
  themeControl: document.querySelector(".theme-control"),
  themeToggleBtn: document.querySelector("#themeToggleBtn"),
  layoutControl: document.querySelector(".layout-control"),
  layoutToggleBtn: document.querySelector("#layoutToggleBtn"),
  layoutCloseBtn: document.querySelector("#layoutCloseBtn"),
  layoutOptions: document.querySelector("#layoutOptions"),
  musicDock: document.querySelector(".music-dock"),
  musicToggleBtn: document.querySelector("#musicToggleBtn"),
  musicCloseBtn: document.querySelector("#musicCloseBtn"),
  musicFileInput: document.querySelector("#musicFileInput"),
  musicSelect: document.querySelector("#musicSelect"),
  musicPlayBtn: document.querySelector("#musicPlayBtn"),
  musicPauseBtn: document.querySelector("#musicPauseBtn"),
  musicLoopInput: document.querySelector("#musicLoopInput"),
  musicVolumeInput: document.querySelector("#musicVolumeInput"),
  musicStatus: document.querySelector("#musicStatus"),
  musicAudio: document.querySelector("#musicAudio"),
  inspirationDock: document.querySelector(".inspiration-dock"),
  inspirationToggleBtn: document.querySelector("#inspirationToggleBtn"),
  inspirationCloseBtn: document.querySelector("#inspirationCloseBtn"),
  inspirationInput: document.querySelector("#inspirationInput"),
  inspirationSaveBtn: document.querySelector("#inspirationSaveBtn"),
  inspirationClearBtn: document.querySelector("#inspirationClearBtn"),
  inspirationCount: document.querySelector("#inspirationCount"),
  inspirationList: document.querySelector("#inspirationList"),
  newsList: document.querySelector("#newsList"),
  newsStatus: document.querySelector("#newsStatus"),
  newsRefreshBtn: document.querySelector("#newsRefreshBtn"),
  newsMoreLink: document.querySelector("#newsMoreLink"),
  newsSourceBtns: document.querySelectorAll("[data-news-source]"),
  syncPanel: document.querySelector("#syncPanel"),
  syncToggleBtn: document.querySelector("#syncToggleBtn"),
  syncCloseBtn: document.querySelector("#syncCloseBtn"),
  syncUrlInput: document.querySelector("#syncUrlInput"),
  syncTokenInput: document.querySelector("#syncTokenInput"),
  syncSaveBtn: document.querySelector("#syncSaveBtn"),
  syncLoadBtn: document.querySelector("#syncLoadBtn"),
  syncStatus: document.querySelector("#syncStatus"),
  rightDock: document.querySelector(".right-dock"),
  rightDockToggleBtn: document.querySelector("#rightDockToggleBtn"),
  inventoryPanel: document.querySelector(".inventory-panel"),
  inventoryToggleBtn: document.querySelector("#inventoryToggleBtn"),
  inventoryGrid: document.querySelector("#inventoryGrid"),
  worldSwatches: document.querySelectorAll("[data-world]"),
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
  setText(".layout-head span", dict.layoutTitle);
  els.layoutToggleBtn.textContent = dict.layoutToggle;
  if (els.toolSidebarToggleBtn) {
    const toolMenuLabel = dict.moreTool || dict.toolMenu || "更多";
    const labelNode = els.toolSidebarToggleBtn.querySelector(".tool-label");
    if (labelNode) labelNode.textContent = toolMenuLabel;
    else els.toolSidebarToggleBtn.textContent = toolMenuLabel;
    els.toolSidebarToggleBtn.title = toolMenuLabel;
  }
  els.toolButtons.forEach((button) => {
    const key = button.dataset.tool;
    const label = dict.toolLabels?.[key] || button.textContent;
    const labelNode = button.querySelector(".tool-label");
    if (labelNode) labelNode.textContent = label;
    else button.textContent = label;
    button.title = label;
  });
  renderLayoutOptions();
  translateMusicPanel();
  setText(".goal-title span", dict.todayGoals);
  setText(".goal-title small", dict.goalResetHint);
  els.dailyTodoApplyBtn.textContent = dict.dailyTodoApply;
  els.dailyTodoSaveBtn.textContent = dict.toolLabels?.routine || dict.dailyTodoSave;
  els.dailyTodoSaveBtn.title = dict.dailyTodoSave;
  els.completedGoalsBtn.textContent = dict.completedGoals;
  els.goalResetBtn.textContent = dict.clear;
  els.todoTexts.forEach((input) => {
    input.placeholder = dict.todoPlaceholder;
  });
  els.todoTypes.forEach((select) => {
    const value = select.value || "normal";
    select.innerHTML = "";
    [
      ["normal", dict.todoNormal],
      ["challenge", dict.todoChallenge],
    ].forEach(([optionValue, label]) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = label;
      select.append(option);
    });
    select.value = value === "challenge" ? "challenge" : "normal";
  });
  els.todoDeadlines.forEach((input) => {
    input.title = dict.todoDeadline;
    input.setAttribute("aria-label", dict.todoDeadline);
    input.min = currentTimeInputValue();
  });
  updateExtraGoalsToggle();
  setText(".time-card .counter-label", dict.countdown);
  setText(".countdown-setting > span", dict.setMinutes);
  if (els.countdownSetBtn) els.countdownSetBtn.textContent = dict.set;
  setText(".focus-total > span", dict.focusTotal);
  els.focusTotalUnit.textContent = dict.minuteUnit;
  setText(".focus-toggle span", dict.focusMode);
  els.focusExitBtn.textContent = dict.exit;
  els.timerResetBtn.textContent = dict.reset;
  setText(".level-mini-label", dict.level);
  els.levelResetBtn.textContent = dict.levelReset;
  setText(".future-card .counter-label", dict.future);
  setText(".future-search-field span", `${dict.futureSearchDate} ${dict.dateHint}`);
  setText(".future-add label:nth-of-type(1) span", `${dict.futureEventDate} ${dict.dateHint}`);
  setText(".future-add label:nth-of-type(2) span", dict.futureEventText);
  document.querySelectorAll(".date-field").forEach((field) => {
    field.dataset.dateHint = dict.dateHint;
  });
  [els.futureSearchDateInput, els.futureDateInput].forEach((input) => {
    input.lang = dict.htmlLang;
    input.title = dict.dateHint;
    input.setAttribute("aria-label", dict.dateHint);
  });
  els.futureTextInput.placeholder = dict.futureEventPlaceholder;
  els.futureClearSearchBtn.textContent = dict.futureAll;
  els.futureAddBtn.textContent = dict.futureAdd;
  setText(".news-card .counter-label", dict.news);
  els.newsRefreshBtn.textContent = dict.refresh;
  els.newsMoreLink.textContent = dict.more;
  els.syncToggleBtn.textContent = dict.toolLabels?.sync || dict.sync;
  setText(".sync-head span", dict.syncTitle);
  setText(".sync-password-field span", dict.syncPassword);
  els.syncTokenInput.placeholder = dict.syncPasswordPlaceholder;
  els.syncSaveBtn.textContent = dict.syncSave;
  els.syncLoadBtn.textContent = dict.syncLoad;
  if (els.rewardPanelTitle) els.rewardPanelTitle.textContent = dict.rewardTitle;
  if (els.rewardHistoryBtn) els.rewardHistoryBtn.textContent = dict.rewardHistoryTitle;
  els.inventoryToggleBtn.querySelector("span:first-child").textContent = dict.inventory;
  els.inspirationToggleBtn.textContent = dict.inspiration;
  setText(".inspiration-head span", dict.inspirationTitle);
  els.inspirationInput.placeholder = dict.inspirationPlaceholder;
  els.inspirationSaveBtn.textContent = dict.inspirationSave;
  els.inspirationClearBtn.textContent = dict.inspirationClear;
  translateThemePanel();
  (translatedPresetNames[lang] || translatedPresetNames.zh).forEach((name, index) => {
    if (els.themePresetBtns[index]) els.themePresetBtns[index].textContent = name;
  });
  translateBomb();
  translateWorldTooltips();
  render();
  renderFutureEvents();
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
    state.rewardExpUnits = Math.max(0, Number.parseInt(saved.rewardExpUnits, 10) || 0);
    state.nCoins = Math.max(0, Number.parseInt(saved.nCoins, 10) || 0);
    state.lastNCoinGain = Math.max(0, Number.parseInt(saved.lastNCoinGain, 10) || 0);
    state.lastNCoinGrowth = Math.max(0, Number(saved.lastNCoinGrowth) || 0);
    const loadedRewardHistory = normalizeRewardHistory(saved.rewardHistory);
    const alreadyClaimed = loadedRewardHistory.filter((reward) => reward.claimed);
    state.rewardHistory = loadedRewardHistory.filter((reward) => !reward.claimed);
    state.claimedRewardHistory = [
      ...alreadyClaimed,
      ...normalizeRewardHistory(saved.claimedRewardHistory, Infinity),
    ];
    normalizeLevel();
    const oldCorrectionCount = Math.max(0, Number.parseInt(saved.correctionCount, 10) || 0);
    state.totalWrongCount = Math.max(0, Number.parseInt(saved.totalWrongCount, 10) || oldCorrectionCount);
    state.remainingWrongCount = Math.max(0, Number.parseInt(saved.remainingWrongCount, 10) || oldCorrectionCount);
    state.remainingWrongCount = Math.min(state.remainingWrongCount, state.totalWrongCount);
    state.futureActivities = typeof saved.futureActivities === "string" ? saved.futureActivities : "";
    state.futureEvents = normalizeFutureEvents(saved.futureEvents, state.futureActivities);
    sortFutureEventsInState();
    state.futureSearchDate = /^\d{4}-\d{2}-\d{2}$/.test(String(saved.futureSearchDate || "")) ? saved.futureSearchDate : "";
    pruneExpiredFutureEvents(false, false);
    state.completedStudyMinutes = Math.max(
      0,
      Number.parseInt(saved.completedStudyMinutes, 10) || Math.floor((Number.parseInt(saved.accumulatedMs, 10) || 0) / 60000),
    );
    state.focusRewardBlocks = Math.max(0, Number.parseInt(saved.focusRewardBlocks, 10) || Math.floor(state.completedStudyMinutes / 25));
    state.countdownMinutes = Math.max(1, Number.parseInt(saved.countdownMinutes, 10) || 25);
    state.remainingMs = Math.max(0, Number.parseInt(saved.remainingMs, 10) || state.countdownMinutes * 60 * 1000);
    state.startedAt = Number.isFinite(saved.startedAt) ? saved.startedAt : null;
    state.active = Boolean(saved.active && state.startedAt);
    state.currentGoalText = typeof saved.currentGoalText === "string" ? saved.currentGoalText : "";
    state.goals = {
      ...state.goals,
      ...(saved.goals && typeof saved.goals === "object" ? saved.goals : {}),
    };
    state.goals.todos = normalizeTodos(state.goals.todos);
    state.dailyTodoTemplate = normalizeDailyTodoTemplate(saved.dailyTodoTemplate);
    state.dailyTodoPool = normalizeDailyTodoPool(saved.dailyTodoPool, state.dailyTodoTemplate);
    state.completedGoals = normalizeCompletedGoals(saved.completedGoals);
    state.inspirations = normalizeInspirations(saved.inspirations);
    state.unlockedWorlds = normalizeWorldList(saved.unlockedWorlds);
    state.goalsDate = typeof saved.goalsDate === "string" ? saved.goalsDate : localDateKey();
    resetGoalsIfNewDay(false);
  } catch {
    return;
  }
}

function normalizeTodos(todos) {
  const list = Array.isArray(todos) ? todos : [];
  return Array.from({ length: todoCount }, (_, index) => ({
    text: String(list[index]?.text ?? ""),
    done: Boolean(list[index]?.done),
    type: list[index]?.type === "challenge" ? "challenge" : "normal",
    deadline: /^\d{2}:\d{2}$/.test(String(list[index]?.deadline || "")) ? String(list[index].deadline) : "",
  }));
}

function normalizeDailyTodoTemplate(todos) {
  if (!Array.isArray(todos)) return [];
  return todos
    .map((todo) => ({
      text: String(todo?.text || "").trim(),
      type: todo?.type === "challenge" ? "challenge" : "normal",
      deadline: /^\d{2}:\d{2}$/.test(String(todo?.deadline || "")) ? String(todo.deadline) : "",
    }))
    .filter((todo) => todo.text)
    .slice(0, routineSelectedMax);
}

function normalizeDailyTodoPool(pool, fallbackTemplate = []) {
  const source = Array.isArray(pool) ? pool : fallbackTemplate;
  return source
    .map((todo, index) => ({
      id: String(todo?.id || `routine-${index}-${Date.now()}`),
      text: String(todo?.text || "").trim(),
      type: todo?.type === "challenge" ? "challenge" : "normal",
      deadline: /^\d{2}:\d{2}$/.test(String(todo?.deadline || "")) ? String(todo.deadline) : "",
      selected: Boolean(todo?.selected || fallbackTemplate.some((item) => item.text && item.text === todo?.text)),
    }))
    .filter((todo) => todo.text)
    .slice(0, routineMaxCount);
}

function normalizeCompletedGoals(goals) {
  if (!Array.isArray(goals)) return [];
  return goals
    .map((goal) => ({
        id: String(goal?.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`),
        text: String(goal?.text || "").trim(),
        type: goal?.type === "challenge" ? "challenge" : "normal",
        deadline: /^\d{2}:\d{2}$/.test(String(goal?.deadline || "")) ? String(goal.deadline) : "",
        exp: Math.max(0, Number.parseInt(goal?.exp, 10) || (goal?.type === "challenge" ? 40 : 20)),
        date: /^\d{4}-\d{2}-\d{2}$/.test(String(goal?.date || "")) ? String(goal.date) : localDateKey(),
      completedAt: String(goal?.completedAt || new Date().toISOString()),
    }))
    .filter((goal) => goal.text);
}

function normalizeInspirations(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => ({
      id: String(item?.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`),
      text: String(item?.text || "").trim(),
      createdAt: String(item?.createdAt || new Date().toISOString()),
    }))
    .filter((item) => item.text)
    .slice(0, 500);
}

function normalizeRewardHistory(items, limit = 80) {
  if (!Array.isArray(items)) return [];
  const normalized = items
    .map((item) => ({
      label: String(item?.label || "").trim(),
      coins: Math.max(0, Number.parseInt(item?.coins, 10) || 0),
      createdAt: String(item?.createdAt || new Date().toISOString()),
      claimed: Boolean(item?.claimed),
      claimedAt: item?.claimedAt ? String(item.claimedAt) : "",
    }))
    .filter((item) => item.label)
  return Number.isFinite(limit) ? normalized.slice(0, limit) : normalized;
}

function normalizeFutureEvents(events, legacyText = "") {
  const normalized = Array.isArray(events)
    ? events
        .map((event) => ({
          id: String(event?.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`),
          date: /^\d{4}-\d{2}-\d{2}$/.test(String(event?.date || "")) ? String(event.date) : localDateKey(),
          text: String(event?.text || "").trim(),
        }))
        .filter((event) => event.text)
    : [];
  if (normalized.length || !legacyText) return normalized;
  return String(legacyText)
    .split(/\r?\n/)
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text, index) => ({
      id: `legacy-${Date.now()}-${index}`,
      date: localDateKey(),
      text,
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
  scheduleAutoBackup();
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
  const colorOrDefault = (value, fallback) => (/^#[0-9a-f]{6}$/i.test(String(value || "")) ? value : fallback);
  return {
    bg: colorOrDefault(theme.bg, defaultTheme.bg),
    text: colorOrDefault(theme.text, defaultTheme.text),
    line: colorOrDefault(theme.line, defaultTheme.line),
    lineWidth: ["1px", "2px", "3px", "4px"].includes(theme.lineWidth) ? theme.lineWidth : defaultTheme.lineWidth,
    paper: colorOrDefault(theme.paper, defaultTheme.paper),
    timer: colorOrDefault(theme.timer, defaultTheme.timer),
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
  const normalizedSelected = String(selectedValue || "").toLowerCase();
  select.innerHTML = "";
  const hasSelected = colors.some((color) => color.value.toLowerCase() === normalizedSelected);
  if (!hasSelected && /^#[0-9a-f]{6}$/i.test(String(selectedValue || ""))) {
    const option = document.createElement("option");
    option.value = selectedValue;
    option.textContent = `自訂 / CUSTOM ${selectedValue}`;
    option.style.backgroundColor = selectedValue;
    option.style.color = selectedValue.toLowerCase() === "#070605" ? "#ffffff" : "#111111";
    option.selected = true;
    select.append(option);
  }
  colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color.value;
    option.textContent = colorOptionLabel(color);
    option.style.backgroundColor = color.value;
    option.style.color = "#ffffff";
    if (color.value.toLowerCase() === normalizedSelected) option.selected = true;
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
  collapseThemeAfterMobileChange();
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
  updateToolSidebar();
}

function loadLayoutVisibility() {
  try {
    const saved = JSON.parse(localStorage.getItem(layoutVisibilityStorageKey) || "{}");
    return {
      ...defaultLayoutVisibility,
      ...(saved && typeof saved === "object" ? saved : {}),
    };
  } catch {
    return { ...defaultLayoutVisibility };
  }
}

function saveLayoutVisibility(visibility) {
  localStorage.setItem(layoutVisibilityStorageKey, JSON.stringify(visibility));
}

function applyLayoutVisibility() {
  const visibility = loadLayoutVisibility();
  layoutFeatures.forEach((feature) => {
    const key = `show${feature[0].toUpperCase()}${feature.slice(1)}`;
    document.body.dataset[key] = visibility[feature] ? "true" : "false";
  });
  if (!visibility.sync) setSyncPanelOpen(false);
  if (!visibility.inspiration) setInspirationOpen(false);
  if (!visibility.theme) setThemeCollapsed(true);
  if (!visibility.worlds && !visibility.inventory) setRightDockOpen(false);
  if (!visibility.music) {
    setMusicOpen(false);
    pauseMusic();
  }
}

function setLayoutPanelOpen(isOpen) {
  els.layoutControl.classList.toggle("collapsed", !isOpen);
  els.layoutToggleBtn.setAttribute("aria-expanded", String(isOpen));
  updateToolSidebar();
}

function closeAllTools(except = "") {
  if (except !== "theme") setThemeCollapsed(true);
  if (except !== "inspiration") setInspirationOpen(false);
  if (except !== "layout") setLayoutPanelOpen(false);
  if (except !== "music") setMusicOpen(false);
  if (except !== "reward") setRewardOpen(false);
  if (except !== "worlds") setRightDockOpen(false);
  if (except !== "sync") setSyncPanelOpen(false);
}

function toggleTool(tool) {
  const isThemeOpen = !els.themeControl.classList.contains("collapsed");
  const isInspirationOpen = els.inspirationDock.dataset.open === "true";
  const isLayoutOpen = !els.layoutControl.classList.contains("collapsed");
  const isMusicOpen = els.musicDock.dataset.open === "true";
  const isRewardOpen = els.rewardDock.dataset.open === "true";
  const isWorldsOpen = els.rightDock.dataset.collapsed !== "true";
  const openMap = { theme: isThemeOpen, inspiration: isInspirationOpen, layout: isLayoutOpen, music: isMusicOpen, reward: isRewardOpen, worlds: isWorldsOpen };
  if (openMap[tool]) {
    closeAllTools();
    return;
  }
  closeAllTools(tool);
  if (tool === "theme") setThemeCollapsed(false);
  if (tool === "inspiration") setInspirationOpen(true);
  if (tool === "layout") setLayoutPanelOpen(true);
  if (tool === "music") setMusicOpen(true);
  if (tool === "reward") setRewardOpen(true);
  if (tool === "worlds") setRightDockOpen(true);
}

function updateToolSidebar() {
  if (!els.toolButtons?.length) return;
  const active = {
    theme: !els.themeControl.classList.contains("collapsed"),
    inspiration: els.inspirationDock.dataset.open === "true",
    layout: !els.layoutControl.classList.contains("collapsed"),
    music: els.musicDock.dataset.open === "true",
    reward: els.rewardDock.dataset.open === "true",
    worlds: els.rightDock.dataset.collapsed !== "true",
  };
  els.toolButtons.forEach((button) => {
    button.classList.toggle("active", Boolean(active[button.dataset.tool]));
  });
}

function setToolSidebarOpen(isOpen) {
  if (!els.toolSidebar) return;
  els.toolSidebar.dataset.open = isOpen ? "true" : "false";
  els.toolSidebarToggleBtn?.setAttribute("aria-expanded", String(isOpen));
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function collapseThemeAfterMobileChange() {
  if (isMobileViewport()) window.setTimeout(() => setThemeCollapsed(true), 120);
}

function renderLayoutOptions() {
  if (!els.layoutOptions) return;
  const dict = translations[currentLanguage()];
  const visibility = loadLayoutVisibility();
  els.layoutOptions.innerHTML = "";
  layoutFeatures.forEach((feature) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    input.type = "checkbox";
    input.checked = visibility[feature] !== false;
    input.addEventListener("change", () => {
      const next = loadLayoutVisibility();
      next[feature] = input.checked;
      saveLayoutVisibility(next);
      applyLayoutVisibility();
      renderLayoutOptions();
      showSaved();
    });
    span.textContent = dict.layoutFeatures?.[feature] || feature;
    label.append(input, span);
    els.layoutOptions.append(label);
  });
}

function loadMusicSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(musicSettingsStorageKey) || "{}");
    return {
      src: typeof saved.src === "string" ? saved.src : "",
      volume: Math.min(1, Math.max(0, Number(saved.volume) || 0.7)),
      loop: Boolean(saved.loop),
    };
  } catch {
    return { src: "", volume: 0.7, loop: false };
  }
}

function saveMusicSettings() {
  const selectedTrack = localMusicTracks[Number.parseInt(els.musicSelect.value, 10)];
  localStorage.setItem(
    musicSettingsStorageKey,
    JSON.stringify({
      src: selectedTrack?.name || "",
      volume: Number(els.musicVolumeInput.value) / 100,
      loop: els.musicLoopInput.checked,
    }),
  );
}

function musicNameFromPath(path) {
  const file = decodeURIComponent(String(path || "").split("/").pop() || "");
  return file.replace(/\.[a-z0-9]+$/i, "");
}

function normalizeMusicTracks(payload) {
  const list = Array.isArray(payload?.tracks) ? payload.tracks : [];
  return list
    .map((track) => {
      if (typeof track === "string") {
        return { src: track, name: musicNameFromPath(track) };
      }
      const src = String(track?.src || "").trim();
      return { src, name: String(track?.name || musicNameFromPath(src)).trim() };
    })
    .filter((track) => track.src);
}

function translateMusicPanel() {
  if (!els.musicDock) return;
  setText(".music-head span", t("music"));
  els.musicToggleBtn.textContent = t("music").slice(0, 1);
  els.musicPlayBtn.textContent = t("musicPlay");
  els.musicPauseBtn.textContent = t("musicPause");
  const fileLabel = els.musicFileInput?.closest("label")?.querySelector("span");
  if (fileLabel) fileLabel.textContent = t("musicChoose");
  const loopLabel = els.musicLoopInput?.closest("label")?.querySelector("span");
  if (loopLabel) loopLabel.textContent = t("musicLoop");
  if (!els.musicSelect.options.length) els.musicStatus.textContent = t("musicEmpty");
}

function setMusicOpen(isOpen) {
  els.musicDock.dataset.open = isOpen ? "true" : "false";
  els.musicToggleBtn.setAttribute("aria-expanded", String(isOpen));
  updateToolSidebar();
}

function setRewardOpen(isOpen) {
  if (!els.rewardDock) return;
  els.rewardDock.dataset.open = isOpen ? "true" : "false";
  if (isOpen) renderRewards();
  updateToolSidebar();
}

function applyMusicSettings() {
  const settings = loadMusicSettings();
  els.musicVolumeInput.value = String(Math.round(settings.volume * 100));
  els.musicAudio.volume = settings.volume;
  els.musicLoopInput.checked = settings.loop;
  els.musicAudio.loop = settings.loop;
}

async function loadMusicList() {
  applyMusicSettings();
  els.musicSelect.innerHTML = "";
  els.musicAudio.removeAttribute("src");
  els.musicAudio.load();
  els.musicStatus.textContent = t("musicEmpty");
}

function renderLocalMusicTracks() {
  const settings = loadMusicSettings();
  els.musicSelect.innerHTML = "";
  localMusicTracks.forEach((track, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = track.name;
    els.musicSelect.append(option);
  });
  if (!localMusicTracks.length) {
    els.musicStatus.textContent = t("musicEmpty");
    return;
  }
  const savedIndex = localMusicTracks.findIndex((track) => track.name === settings.src);
  els.musicSelect.value = String(savedIndex >= 0 ? savedIndex : 0);
  changeMusicTrack();
  els.musicStatus.textContent = t("musicSelected").replace("{n}", String(localMusicTracks.length));
}

function changeMusicTrack() {
  const track = localMusicTracks[Number.parseInt(els.musicSelect.value, 10)];
  if (!track) return;
  els.musicAudio.src = track.url;
  els.musicStatus.textContent = track.name;
  saveMusicSettings();
}

function chooseLocalMusicFiles() {
  localMusicTracks.forEach((track) => URL.revokeObjectURL(track.url));
  localMusicTracks = Array.from(els.musicFileInput.files || [])
    .filter((file) => file.type.startsWith("audio/") || /\.webm$/i.test(file.name))
    .map((file) => ({
      name: file.name.replace(/\.[a-z0-9]+$/i, ""),
      url: URL.createObjectURL(file),
    }));
  renderLocalMusicTracks();
}

function playMusic() {
  if (!els.musicAudio.src && els.musicSelect.value) changeMusicTrack();
  els.musicAudio.play().catch(() => {
    els.musicStatus.textContent = t("musicLoadFail");
  });
}

function pauseMusic() {
  els.musicAudio.pause();
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

function translateWorldTooltips() {
  const worlds = worldTooltipTranslations[currentLanguage()] || worldTooltipTranslations.zh;
  els.worldSwatches.forEach((swatch, index) => {
    const lines = worlds[index] || worldTooltipTranslations.zh[index];
    if (!lines) return;
    const tooltip = lines.join("\n");
    swatch.dataset.tooltip = tooltip;
    swatch.title = lines[0];
    swatch.setAttribute("aria-label", tooltip);
  });
}

function updateExtraGoalsToggle() {
  const expanded = els.extraGoals?.dataset.expanded === "true";
  const label = expanded ? t("hideMoreGoals") : t("moreGoals");
  const labelEl = els.extraGoalsToggleBtn?.querySelector("span:first-child");
  if (labelEl) labelEl.textContent = label;
  els.extraGoalsToggleBtn?.setAttribute("aria-expanded", expanded ? "true" : "false");
}

function toggleExtraGoals() {
  const expanded = els.extraGoals.dataset.expanded === "true";
  els.extraGoals.dataset.expanded = expanded ? "false" : "true";
  updateExtraGoalsToggle();
}

function setInspirationOpen(isOpen) {
  els.inspirationDock.dataset.open = isOpen ? "true" : "false";
  els.inspirationToggleBtn.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    renderInspirations();
    window.setTimeout(() => els.inspirationInput.focus(), 0);
  }
  updateToolSidebar();
}

function toggleInventory() {
  const collapsed = els.inventoryPanel.dataset.collapsed === "true";
  els.inventoryPanel.dataset.collapsed = collapsed ? "false" : "true";
  els.inventoryToggleBtn.setAttribute("aria-expanded", collapsed ? "true" : "false");
}

function setRightDockOpen(isOpen) {
  els.rightDock.dataset.collapsed = isOpen ? "false" : "true";
  els.rightDockToggleBtn.setAttribute("aria-expanded", String(isOpen));
  updateToolSidebar();
}

function toggleRightDock() {
  setRightDockOpen(els.rightDock.dataset.collapsed === "true");
}

function renderWorldKeys() {
  const availableKeys = availableWorldKeyCount();
  els.worldSwatches.forEach((swatch) => {
    const worldId = Number.parseInt(swatch.dataset.world, 10);
    const unlocked = state.unlockedWorlds.includes(worldId);
    const baseTitle = swatch.dataset.tooltip?.replace(/\n/g, "｜") || swatch.dataset.worldName || "";
    swatch.classList.toggle("world-unlocked", unlocked);
    swatch.classList.toggle("world-earned", availableKeys > 0 && !unlocked);
    swatch.classList.toggle("world-locked", !unlocked);
    swatch.title = unlocked ? `${baseTitle}｜已解鎖` : `${baseTitle}｜雙擊使用鑰匙解鎖`;
  });

  els.inventoryGrid.innerHTML = "";
  const keyCount = availableWorldKeyCount();
  Array.from({ length: inventorySlotCount }, (_, index) => {
    const slot = document.createElement("li");
    if (index < keyCount) {
      const key = document.createElement("button");
      key.type = "button";
      key.className = "world-key";
      key.title = "通用鑰匙：雙擊右側任一未解鎖世界使用";
      key.setAttribute("aria-label", key.title);
      key.innerHTML = `<span aria-hidden="true">⚿</span><b>${index + 1}</b>`;
      slot.classList.add("filled");
      slot.append(key);
    }
    els.inventoryGrid.append(slot);
  });
}

function unlockWorldKey(worldId) {
  const id = Number.parseInt(worldId, 10);
  if (availableWorldKeyCount() <= 0 || state.unlockedWorlds.includes(id)) return;
  state.unlockedWorlds = normalizeWorldList([...state.unlockedWorlds, id]);
  save();
  render();
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

function themeSlotTheme(slot) {
  return slot?.theme ? slot.theme : slot;
}

function themeSlotName(slot, index) {
  return slot?.name ? String(slot.name) : `${t("customMemory")} ${index + 1}`;
}

function defaultThemeSlotName(index) {
  return `${t("customMemory")} ${index + 1}`;
}

function makeThemeSlot(theme, name, index) {
  return {
    name: String(name || "").trim() || defaultThemeSlotName(index),
    theme,
  };
}

function seedBundledThemeMemory() {
  if (localStorage.getItem(themeMemoryBundleVersionKey) === "1") return;
  saveThemeMemory(bundledCustomThemeMemory.map((theme, index) => makeThemeSlot(theme, `${t("customMemory")} ${index + 1}`, index)));
  localStorage.setItem(themeMemoryBundleVersionKey, "1");
}

function saveSlot01Preset() {
  if (localStorage.getItem(themeSlot01SnapshotKey) === "1") return;
  const slots = loadThemeMemory();
  slots[0] = makeThemeSlot(slot01Theme, defaultThemeSlotName(0), 0);
  saveThemeMemory(slots);
  localStorage.setItem(themeSlot01SnapshotKey, "1");
}

function renderThemeMemoryButtons() {
  const slots = loadThemeMemory();
  els.themeNameInputs.forEach((input, index) => {
    const slot = slots[index];
    input.placeholder = defaultThemeSlotName(index);
    if (document.activeElement !== input) {
      input.value = slot ? themeSlotName(slot, index) : "";
    }
    input.closest(".theme-slot")?.classList.toggle("saved", Boolean(slot));
  });
  els.themeSaveBtns.forEach((button) => {
    button.textContent = t("save");
  });
  els.themeLoadBtns.forEach((button, index) => {
    button.textContent = t("use");
    button.disabled = !slots[index];
  });
  els.themeDeleteBtns.forEach((button, index) => {
    button.textContent = t("delete");
    button.disabled = !slots[index];
  });
  markActiveThemeControl();
}

function applyThemePreset(index) {
  const theme = sanitizeTheme(defaultThemeMemory[index]);
  localStorage.setItem(themeStorageKey, JSON.stringify(theme));
  populateThemeControls(theme);
  applyTheme(theme);
  markActiveThemeControl(els.themePresetBtns[index]);
  showSaved();
  collapseThemeAfterMobileChange();
}

function saveThemeSlot(index) {
  const slots = loadThemeMemory();
  if (slots[index] && !window.confirm(t("confirmOverwrite").replace("{n}", index + 1))) {
    return;
  }
  const name = els.themeNameInputs[index]?.value || themeSlotName(slots[index], index);
  slots[index] = makeThemeSlot(currentThemeFromInputs(), name, index);
  saveThemeMemory(slots);
  renderThemeMemoryButtons();
  flashThemeButton(els.themeSaveBtns[index], t("saved"));
  showSaved();
}

function loadThemeSlot(index) {
  const slots = loadThemeMemory();
  if (!slots[index]) {
    flashThemeButton(els.themeLoadBtns[index], t("noRecord"));
    return;
  }
  const theme = sanitizeTheme(themeSlotTheme(slots[index]));
  localStorage.setItem(themeStorageKey, JSON.stringify(theme));
  populateThemeControls(theme);
  applyTheme(theme);
  markActiveThemeControl(els.themeLoadBtns[index].closest(".theme-slot"));
  showSaved();
  collapseThemeAfterMobileChange();
}

function deleteThemeSlot(index) {
  const slots = loadThemeMemory();
  if (!slots[index]) return;
  slots[index] = null;
  saveThemeMemory(slots);
  if (els.themeNameInputs[index]) els.themeNameInputs[index].value = "";
  renderThemeMemoryButtons();
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

function markActiveThemeControl(target = null) {
  document.querySelectorAll(".theme-memory .active-theme").forEach((element) => {
    element.classList.remove("active-theme");
  });
  if (target) {
    target.classList.add("active-theme");
  }
}

function showSaved() {
  els.saveStatus.textContent = t("saved");
  window.clearTimeout(showSaved.timer);
  showSaved.timer = window.setTimeout(() => {
    els.saveStatus.textContent = "";
  }, 900);
}

function syncPayload() {
  return {
    storage: JSON.parse(localStorage.getItem(storageKey) || "{}"),
    theme: JSON.parse(localStorage.getItem(themeStorageKey) || "{}"),
    themeMemory: JSON.parse(localStorage.getItem(themeMemoryStorageKey) || "[]"),
    themeCollapsed: localStorage.getItem(themeCollapsedStorageKey) || "0",
    layoutVisibility: JSON.parse(localStorage.getItem(layoutVisibilityStorageKey) || "{}"),
    musicSettings: JSON.parse(localStorage.getItem(musicSettingsStorageKey) || "{}"),
    newsSource: localStorage.getItem(newsSourceStorageKey) || "tw",
    language: localStorage.getItem(languageStorageKey) || "zh",
    savedAt: new Date().toISOString(),
  };
}

function syncSettings() {
  const url = els.syncUrlInput.value.trim() || defaultSyncUrl;
  const token = els.syncTokenInput.value.trim();
  localStorage.setItem(syncUrlStorageKey, url);
  if (token) localStorage.setItem(syncTokenStorageKey, token);
  return { url, token };
}

function setSyncStatus(message) {
  els.syncStatus.textContent = message;
}

function setSyncPanelOpen(isOpen) {
  els.syncPanel.dataset.open = isOpen ? "true" : "false";
  els.syncToggleBtn.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    window.setTimeout(() => els.syncTokenInput.focus(), 0);
  }
  els.syncToggleBtn.classList.toggle("active", isOpen);
}

function hasSyncCredentials() {
  const url = els.syncUrlInput?.value.trim() || localStorage.getItem(syncUrlStorageKey) || defaultSyncUrl;
  const token = els.syncTokenInput?.value.trim() || localStorage.getItem(syncTokenStorageKey) || "";
  return Boolean(url && token);
}

function scheduleAutoBackup() {
  if (!hasSyncCredentials()) return;
  window.clearTimeout(autoBackupTimer);
  autoBackupTimer = window.setTimeout(() => {
    backupToGoogle({ automatic: true });
  }, autoSyncDelayMs);
}

function postToGoogle(url, payload) {
  const iframeName = `syncFrame${Date.now()}`;
  const iframe = document.createElement("iframe");
  iframe.name = iframeName;
  iframe.hidden = true;
  document.body.append(iframe);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = url;
  form.target = iframeName;
  form.hidden = true;

  const input = document.createElement("input");
  input.name = "payload";
  input.value = JSON.stringify(payload);
  form.append(input);
  document.body.append(form);
  form.submit();

  window.setTimeout(() => {
    form.remove();
    iframe.remove();
  }, 5000);
}

function backupToGoogle(options = {}) {
  const { url, token } = syncSettings();
  if (!url || !token) {
    if (!options.automatic) setSyncStatus(t("syncNeedPassword"));
    return;
  }
  postToGoogle(url, {
    token,
    deviceId: "main",
    data: syncPayload(),
  });
  setSyncStatus(options.automatic ? t("syncAutoSaved") : t("syncSaved"));
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.body.append(script);
    window.setTimeout(() => script.remove(), 5000);
  });
}

async function restoreFromGoogle() {
  const { url, token } = syncSettings();
  if (!url || !token) {
    setSyncStatus(t("syncNeedPassword"));
    return;
  }
  const callbackName = `receiveCounterBackup${Date.now()}`;
  window[callbackName] = (response) => {
    try {
      if (!response?.ok || !response.data) {
        setSyncStatus(t("syncNoData"));
        return;
      }
      const data = response.data;
      if (data.storage) localStorage.setItem(storageKey, JSON.stringify(data.storage));
      if (data.theme) localStorage.setItem(themeStorageKey, JSON.stringify(data.theme));
      if (data.themeMemory) localStorage.setItem(themeMemoryStorageKey, JSON.stringify(data.themeMemory));
      if (data.themeCollapsed) localStorage.setItem(themeCollapsedStorageKey, data.themeCollapsed);
      if (data.layoutVisibility) localStorage.setItem(layoutVisibilityStorageKey, JSON.stringify(data.layoutVisibility));
      if (data.musicSettings) localStorage.setItem(musicSettingsStorageKey, JSON.stringify(data.musicSettings));
      if (data.newsSource) localStorage.setItem(newsSourceStorageKey, data.newsSource);
      if (data.language) localStorage.setItem(languageStorageKey, data.language);
      setSyncStatus(t("syncRestored"));
      window.setTimeout(() => window.location.reload(), 600);
    } finally {
      delete window[callbackName];
    }
  };
  const syncUrl = new URL(url);
  syncUrl.searchParams.set("token", token);
  syncUrl.searchParams.set("deviceId", "main");
  syncUrl.searchParams.set("callback", callbackName);
  setSyncStatus(t("syncReading"));
  try {
    await loadScript(syncUrl.toString());
  } catch {
    delete window[callbackName];
    setSyncStatus(t("syncReadFail"));
  }
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

function dateLocale() {
  return {
    zh: "zh-TW",
    en: "en-US",
    de: "de-DE",
    ja: "ja-JP",
  }[currentLanguage()] || "zh-TW";
}

function formatDateByLanguage(dateKey) {
  const [year, month, day] = String(dateKey || "").split("-").map((part) => Number.parseInt(part, 10));
  if (!year || !month || !day) return dateKey || "";
  return new Date(year, month - 1, day).toLocaleDateString(dateLocale(), {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function updateDateFieldHints() {
  [els.futureSearchDateInput, els.futureDateInput].forEach((input) => {
    input.closest(".date-field")?.classList.toggle("has-date", Boolean(input.value));
  });
}

function formatHeaderTime(date = new Date()) {
  return date.toLocaleTimeString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function currentTimeInputValue() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
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

function rollRewardDrop() {
  const roll = Math.random() * 100;
  let cursor = 0;
  return rewardDropTable.find((reward) => {
    cursor += reward.weight;
    return roll < cursor;
  }) || rewardDropTable[0];
}

function addRewardDrop() {
  const reward = rollRewardDrop();
  const coinsBefore = state.nCoins;
  state.nCoins += reward.coins;
  state.lastNCoinGain = reward.coins;
  state.lastNCoinGrowth = reward.coins > 0
    ? Math.round((reward.coins / Math.max(1, coinsBefore)) * 1000) / 10
    : 0;
  state.rewardHistory = normalizeRewardHistory([
    {
      label: reward.label,
      coins: reward.coins,
      createdAt: new Date().toISOString(),
      claimed: false,
    },
    ...state.rewardHistory,
  ]);
}

function addExperience(amount) {
  const exp = Math.max(0, Number.parseInt(amount, 10) || 0);
  if (exp <= 0) return;
  const beforeUnits = state.rewardExpUnits;
  state.rewardExpUnits += exp;
  const drops = Math.floor(state.rewardExpUnits / rewardDropExpUnit) - Math.floor(beforeUnits / rewardDropExpUnit);
  for (let index = 0; index < drops; index += 1) addRewardDrop();
  state.xp += exp;
  normalizeLevel();
}

function normalizeWorldList(list) {
  const ids = Array.isArray(list) ? list : [];
  return [...new Set(ids.map((id) => Number.parseInt(id, 10)).filter((id) => id >= 1 && id <= 9))].sort((a, b) => a - b);
}

function earnedWorldKeyCount() {
  return Math.min(maxWorldKeyCount, Math.floor(state.level / 10));
}

function availableWorldKeyCount() {
  return Math.max(0, earnedWorldKeyCount() - state.unlockedWorlds.length);
}

function applyFocusTimeRewards() {
  const rewardBlocks = Math.floor(state.completedStudyMinutes / 25);
  const newBlocks = Math.max(0, rewardBlocks - state.focusRewardBlocks);
  if (newBlocks <= 0) return;
  addExperience(newBlocks * 20);
  state.focusRewardBlocks = rewardBlocks;
}

function render() {
  document.body.classList.toggle("timer-running", state.active);
  setText(".goal-title span", t("todayGoals"));
  if (els.choiceCount) els.choiceCount.textContent = state.choiceCount;
  els.levelValue.textContent = state.level;
  els.xpValue.textContent = state.xp;
  els.xpNeedValue.textContent = xpNeed();
  els.xpBar.style.width = `${Math.min(100, (state.xp / xpNeed()) * 100)}%`;
  if (els.rewardLabel) els.rewardLabel.textContent = t("rewardIncome");
  if (els.nCoinValue) els.nCoinValue.textContent = state.nCoins;
  if (els.rewardGrowth) {
    const prefix = state.lastNCoinGrowth >= 0 ? "+" : "";
    els.rewardGrowth.textContent = `${prefix}${state.lastNCoinGrowth}%`;
  }
  if (els.rewardLatest) els.rewardLatest.textContent = state.rewardHistory[0]?.label || t("rewardEmpty");
  if (document.activeElement !== els.futureSearchDateInput) {
    els.futureSearchDateInput.value = state.futureSearchDate;
  }
  if (document.activeElement !== els.futureDateInput && !els.futureDateInput.value) {
    els.futureDateInput.value = localDateKey();
  }
  updateDateFieldHints();
  els.studyTime.textContent = formatTime(currentRemainingMs());
  els.focusTotalMinutes.textContent = state.completedStudyMinutes + currentSessionFocusMinutes();
  if (document.activeElement !== els.countdownMinutesInput) {
    els.countdownMinutesInput.value = state.countdownMinutes;
  }
  els.countdownPresetBtns.forEach((button) => {
    const minutes = Number.parseInt(button.dataset.countdownMinutes, 10);
    button.textContent = `${minutes}${t("minuteShortUnit") || t("minuteUnit")}`;
    button.classList.toggle("active", minutes === state.countdownMinutes);
    button.setAttribute("aria-pressed", String(minutes === state.countdownMinutes));
  });
  els.timerToggleBtn.textContent = state.active ? t("pause") : t("start");
  renderTodos();
  renderFutureEvents();
  renderWorldKeys();
  renderInspirations();
  renderRewards();
}

function formatRewardDate(isoText) {
  const date = new Date(isoText);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(undefined, {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderRewards() {
  if (!els.rewardList) return;
  const total = state.rewardHistory.length;
  if (els.rewardPanelCount) els.rewardPanelCount.textContent = `${total}`;
  els.rewardList.innerHTML = "";
  if (!total) {
    const empty = document.createElement("p");
    empty.className = "reward-empty";
    empty.textContent = t("rewardEmpty");
    els.rewardList.append(empty);
    return;
  }
  state.rewardHistory.forEach((item, index) => {
    const label = document.createElement("label");
    label.className = "reward-item";
    label.dataset.claimed = item.claimed ? "true" : "false";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(item.claimed);
    checkbox.addEventListener("change", () => {
      if (!checkbox.checked) return;
      const [claimedReward] = state.rewardHistory.splice(index, 1);
      if (claimedReward) {
        state.claimedRewardHistory = [
          {
            ...claimedReward,
            claimed: true,
            claimedAt: new Date().toISOString(),
          },
          ...normalizeRewardHistory(state.claimedRewardHistory, Infinity),
        ];
      }
      save();
      renderRewards();
    });

    const textWrap = document.createElement("span");
    const name = document.createElement("strong");
    name.textContent = item.label;
    const meta = document.createElement("small");
    meta.textContent = `${formatRewardDate(item.createdAt)} · ${t("rewardUnclaimed")}`;
    textWrap.append(name, meta);

    label.append(checkbox, textWrap);
    els.rewardList.append(label);
  });
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

async function loadCachedNews(sourceKey) {
  const response = await fetch(`news.json?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error("news cache request failed");
  const payload = await response.json();
  const source = payload?.sources?.[sourceKey];
  const items = Array.isArray(source?.items) ? source.items.filter((item) => item.title && item.link) : [];
  if (!items.length) throw new Error("empty news cache");
  renderNewsItems(items);
  const updatedAt = payload.updatedAt ? formatCurrentTime(new Date(payload.updatedAt)) : formatCurrentTime();
  els.newsStatus.textContent = `${source.label || currentNewsSource().label} ${t("updated")} ${updatedAt}`;
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
  const sourceKey = currentNewsSourceKey();
  const source = currentNewsSource();
  renderNewsSourceControls();
  els.newsStatus.textContent = t("updating");
  try {
    await loadCachedNews(sourceKey);
    return;
  } catch {
    // Fall back to live RSS through a public CORS proxy when the GitHub cache is not available yet.
  }
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
  els.currentTime.textContent = formatHeaderTime();
}

function activeTodoEntries() {
  return state.goals.todos
    .map((todo, index) => ({ ...todo, index }))
    .filter((todo) => todo.text && !todo.done);
}

function selectedCurrentGoalIndex() {
  const activeTodos = activeTodoEntries();
  if (!activeTodos.length) return 0;
  const byText = activeTodos.find((todo) => todo.text === state.currentGoalText);
  return (byText || activeTodos[0]).index;
}

function renderCurrentGoalSelect(currentGoalIndex) {
  if (!els.currentGoalSelect) return;
  const activeTodos = activeTodoEntries();
  els.currentGoalSelect.innerHTML = "";
  if (!activeTodos.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = t("currentGoalEmpty");
    els.currentGoalSelect.append(option);
    els.currentGoalSelect.disabled = true;
    return;
  }
  els.currentGoalSelect.disabled = false;
  activeTodos.forEach((todo) => {
    const option = document.createElement("option");
    option.value = String(todo.index);
    option.textContent = todo.text;
    els.currentGoalSelect.append(option);
  });
  els.currentGoalSelect.value = String(currentGoalIndex);
}

function renderTodos() {
  els.todoChecks.forEach((input, index) => {
    input.checked = Boolean(state.goals.todos[index]?.done);
    input.closest(".todo-item")?.classList.remove("current-goal");
  });
  els.todoTexts.forEach((input, index) => {
    if (document.activeElement !== input) {
      input.value = state.goals.todos[index]?.text ?? "";
    }
  });
  els.todoTypes.forEach((select, index) => {
    if (document.activeElement !== select) {
      select.value = state.goals.todos[index]?.type === "challenge" ? "challenge" : "normal";
    }
    select.closest(".todo-item")?.classList.toggle("challenge", select.value === "challenge");
  });
  els.todoDeadlines.forEach((input, index) => {
    input.min = currentTimeInputValue();
    if (document.activeElement !== input) {
      input.value = state.goals.todos[index]?.deadline ?? "";
      if (input.value) validateTodoDeadline(input, false);
    }
  });
}

function isChallengeOnTime(deadline) {
  const normalized = /^\d{2}:\d{2}$/.test(String(deadline || "")) ? deadline : "23:59";
  const [hours, minutes] = normalized.split(":").map((part) => Number.parseInt(part, 10));
  const due = new Date();
  due.setHours(hours, minutes, 59, 999);
  return Date.now() <= due.getTime();
}

function validateTodoDeadline(input, shouldAlert = true) {
  input.min = currentTimeInputValue();
  if (!input.value || isChallengeOnTime(input.value)) return true;
  input.value = "";
  if (shouldAlert) window.alert(t("todoPastDeadline"));
  return false;
}

function renderInspirations() {
  els.inspirationList.innerHTML = "";
  const inspirations = normalizeInspirations(state.inspirations);
  if (els.inspirationCount) els.inspirationCount.textContent = `${inspirations.length}/500`;
  inspirations.forEach((item) => {
    const li = document.createElement("li");
    const time = document.createElement("time");
    const date = new Date(item.createdAt);
    time.textContent = Number.isNaN(date.getTime()) ? "" : date.toLocaleString();
    const text = document.createElement("span");
    text.textContent = item.text;
    li.append(time, text);
    els.inspirationList.append(li);
  });
}

function saveInspiration() {
  const text = els.inspirationInput.value.trim();
  if (!text) return;
  state.inspirations = normalizeInspirations([
    {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      createdAt: new Date().toISOString(),
    },
    ...state.inspirations,
  ]);
  els.inspirationInput.value = "";
  save();
  renderInspirations();
}

function clearInspirationDraft() {
  els.inspirationInput.value = "";
  els.inspirationInput.focus();
}

function currentTodosFromInputs() {
  return Array.from({ length: todoCount }, (_, index) => ({
    text: els.todoTexts[index].value.trim(),
    done: els.todoChecks[index].checked,
    type: els.todoTypes[index].value === "challenge" ? "challenge" : "normal",
    deadline: /^\d{2}:\d{2}$/.test(els.todoDeadlines[index].value) ? els.todoDeadlines[index].value : "",
  }));
}

function sanitizeDailyTodoForToday(todo) {
  const normalized = {
    text: String(todo?.text || "").trim(),
    type: todo?.type === "challenge" ? "challenge" : "normal",
    deadline: /^\d{2}:\d{2}$/.test(String(todo?.deadline || "")) ? String(todo.deadline) : "",
  };
  if (normalized.type === "challenge" && normalized.deadline && !isChallengeOnTime(normalized.deadline)) {
    normalized.deadline = "";
  }
  return normalized;
}

function saveDailyTodoTemplate() {
  window.location.href = "routine.html";
}

function applyDailyTodoTemplate() {
  const template = normalizeDailyTodoTemplate(state.dailyTodoTemplate).map(sanitizeDailyTodoForToday);
  if (!template.length) {
    window.alert(t("dailyTodoEmpty"));
    window.location.href = "routine.html";
    return;
  }
  const current = currentTodosFromInputs()
    .filter((todo) => todo.text)
    .map((todo) => ({ ...todo, done: false }));
  const seen = new Set(current.map((todo) => todo.text));
  state.completedGoals
    .filter((goal) => goal.date === localDateKey())
    .forEach((goal) => seen.add(goal.text));
  template.forEach((todo) => {
    if (current.length >= todoCount || seen.has(todo.text)) return;
    current.push({ ...todo, done: false });
    seen.add(todo.text);
  });
  state.goals.todos = normalizeTodos(current);
  if (!state.goals.todos.some((todo) => todo.text === state.currentGoalText)) {
    state.currentGoalText = state.goals.todos.find((todo) => todo.text)?.text || "";
  }
  state.goalsDate = localDateKey();
  save();
  render();
}

function saveTodos() {
  resetGoalsIfNewDay(false);
  const completedNow = [];
  const activeTodos = [];
  currentTodosFromInputs().forEach((todo) => {
    if (todo.done && todo.text) {
      const exp = todo.type === "challenge" && isChallengeOnTime(todo.deadline) ? 40 : 20;
      completedNow.push({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        text: todo.text,
        type: todo.type,
        deadline: todo.deadline,
        exp,
        date: localDateKey(),
        completedAt: new Date().toISOString(),
      });
      return;
    }
    if (todo.text) activeTodos.push({ text: todo.text, done: false, type: todo.type, deadline: todo.deadline });
  });
  const completedExp = completedNow.reduce((sum, todo) => sum + todo.exp, 0);
  if (completedExp > 0) {
    addExperience(completedExp);
    state.completedGoals = normalizeCompletedGoals([...completedNow, ...state.completedGoals]);
  }
  state.goals.todos = normalizeTodos(activeTodos);
  if (!state.goals.todos.some((todo) => todo.text === state.currentGoalText)) {
    state.currentGoalText = state.goals.todos.find((todo) => todo.text)?.text || "";
  }
  state.goalsDate = localDateKey();
  save();
  render();
}

function sortedFutureEvents() {
  return [...state.futureEvents].sort((a, b) => a.date.localeCompare(b.date) || a.text.localeCompare(b.text));
}

function sortFutureEventsInState() {
  state.futureEvents = sortedFutureEvents();
}

function pruneExpiredFutureEvents(shouldSave = true, shouldRender = true) {
  const today = localDateKey();
  const beforeCount = state.futureEvents.length;
  state.futureEvents = state.futureEvents.filter((event) => event.date >= today);
  let changed = state.futureEvents.length !== beforeCount;
  if (state.futureSearchDate && state.futureSearchDate < today) {
    state.futureSearchDate = "";
    changed = true;
  }
  if (!changed) return false;
  sortFutureEventsInState();
  if (shouldSave) save();
  if (shouldRender) renderFutureEvents();
  return true;
}

function renderFutureEvents() {
  if (!els.futureList) return;
  if (document.activeElement !== els.futureSearchDateInput) {
    els.futureSearchDateInput.value = state.futureSearchDate;
  }
  const filtered = sortedFutureEvents().filter((event) => !state.futureSearchDate || event.date === state.futureSearchDate);
  els.futureList.innerHTML = "";
  if (!filtered.length) {
    const li = document.createElement("li");
    li.className = "future-empty";
    li.textContent = state.futureEvents.length ? t("futureNoMatch") : t("futureEmpty");
    els.futureList.append(li);
    updateDateFieldHints();
    return;
  }
  filtered.forEach((event) => {
    const li = document.createElement("li");
    const time = document.createElement("time");
    const text = document.createElement("span");
    const button = document.createElement("button");
    time.dateTime = event.date;
    time.textContent = formatDateByLanguage(event.date);
    text.textContent = event.text;
    button.type = "button";
    button.textContent = "×";
    button.setAttribute("aria-label", `${t("futureDelete")} ${event.text}`);
    button.addEventListener("click", () => deleteFutureEvent(event.id));
    li.append(time, text, button);
    els.futureList.append(li);
  });
  updateDateFieldHints();
}

function addFutureEvent() {
  const text = els.futureTextInput.value.trim();
  const date = /^\d{4}-\d{2}-\d{2}$/.test(els.futureDateInput.value) ? els.futureDateInput.value : localDateKey();
  if (!text) return;
  state.futureEvents.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date,
    text,
  });
  sortFutureEventsInState();
  els.futureTextInput.value = "";
  save();
  render();
}

function deleteFutureEvent(id) {
  state.futureEvents = state.futureEvents.filter((event) => event.id !== id);
  sortFutureEventsInState();
  save();
  render();
}

function updateFutureSearchDate() {
  state.futureSearchDate = els.futureSearchDateInput.value;
  updateDateFieldHints();
  save();
  renderFutureEvents();
}

function clearFutureSearchDate() {
  state.futureSearchDate = "";
  els.futureSearchDateInput.value = "";
  updateDateFieldHints();
  save();
  renderFutureEvents();
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

function openCompletedGoalsPage() {
  window.location.href = "completed.html";
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
  state.rewardExpUnits = 0;
  state.nCoins = 0;
  state.lastNCoinGain = 0;
  state.lastNCoinGrowth = 0;
  state.rewardHistory = [];
  state.claimedRewardHistory = [];
  save();
  render();
}

function adjustRemainingWrong(delta) {
  const previous = state.remainingWrongCount;
  state.remainingWrongCount = Math.max(0, Math.min(state.totalWrongCount, state.remainingWrongCount + delta));
  const corrected = Math.max(0, previous - state.remainingWrongCount);
  if (corrected > 0) {
    addExperience(corrected * 10);
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

function updateCountdownSetting(minutes) {
  const nextMinutes = Number.parseInt(minutes ?? els.countdownMinutesInput.value, 10);
  state.countdownMinutes = Math.max(1, nextMinutes || 1);
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
els.futureSearchDateInput.addEventListener("change", updateFutureSearchDate);
els.futureClearSearchBtn.addEventListener("click", clearFutureSearchDate);
els.futureDateInput.addEventListener("change", () => save());
els.futureAddBtn.addEventListener("click", addFutureEvent);
els.syncToggleBtn.addEventListener("click", () => {
  const shouldOpen = els.syncPanel.dataset.open !== "true";
  closeAllTools(shouldOpen ? "sync" : "");
  setSyncPanelOpen(shouldOpen);
  if (window.matchMedia("(max-width: 760px)").matches) setToolSidebarOpen(false);
});
els.syncCloseBtn.addEventListener("click", () => setSyncPanelOpen(false));
els.syncUrlInput.addEventListener("change", () => {
  localStorage.setItem(syncUrlStorageKey, els.syncUrlInput.value.trim());
  scheduleAutoBackup();
});
els.syncTokenInput.addEventListener("change", () => {
  localStorage.setItem(syncTokenStorageKey, els.syncTokenInput.value.trim());
  scheduleAutoBackup();
});
els.syncSaveBtn.addEventListener("click", backupToGoogle);
els.syncLoadBtn.addEventListener("click", restoreFromGoogle);
els.futureTextInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addFutureEvent();
  }
});
els.newsRefreshBtn.addEventListener("click", loadNews);
els.newsSourceBtns.forEach((button) => {
  button.addEventListener("click", () => selectNewsSource(button.dataset.newsSource));
});
if (els.countdownSetBtn) {
  els.countdownSetBtn.addEventListener("click", () => updateCountdownSetting());
}
els.countdownPresetBtns.forEach((button) => {
  button.addEventListener("click", () => updateCountdownSetting(button.dataset.countdownMinutes));
});
els.focusModeInput.addEventListener("change", () => setFocusMode(els.focusModeInput.checked));
els.focusExitBtn.addEventListener("click", () => setFocusMode(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && els.syncPanel.dataset.open === "true") {
    setSyncPanelOpen(false);
  }
  if (event.key === "Escape" && els.inspirationDock.dataset.open === "true") {
    setInspirationOpen(false);
  }
  if (event.key === "Escape" && document.body.classList.contains("focus-mode")) {
    setFocusMode(false);
  }
});
els.timerToggleBtn.addEventListener("click", toggleTimer);
els.timerResetBtn.addEventListener("click", resetTimer);
els.bombCloseBtn.addEventListener("click", hideBomb);
els.dailyTodoApplyBtn.addEventListener("click", applyDailyTodoTemplate);
els.dailyTodoSaveBtn.addEventListener("click", saveDailyTodoTemplate);
if (els.currentGoalSelect) {
  els.currentGoalSelect.addEventListener("change", () => {
    const index = Number.parseInt(els.currentGoalSelect.value, 10);
    state.currentGoalText = state.goals.todos[index]?.text || "";
    save();
    render();
  });
}
els.completedGoalsBtn.addEventListener("click", openCompletedGoalsPage);
els.goalResetBtn.addEventListener("click", resetGoals);
els.extraGoalsToggleBtn.addEventListener("click", toggleExtraGoals);
els.rightDockToggleBtn.addEventListener("click", toggleRightDock);
els.inventoryToggleBtn.addEventListener("click", toggleInventory);
els.inventoryGrid.addEventListener("dblclick", (event) => {
  const key = event.target.closest(".world-key");
  if (!key) return;
  showSaved();
});
els.worldSwatches.forEach((swatch) => {
  swatch.addEventListener("dblclick", () => unlockWorldKey(swatch.dataset.world));
});
els.todoChecks.forEach((input) => input.addEventListener("change", saveTodos));
els.todoTexts.forEach((input) => input.addEventListener("input", saveTodos));
els.todoTypes.forEach((select) => select.addEventListener("change", saveTodos));
els.todoDeadlines.forEach((input) => {
  input.addEventListener("focus", () => {
    input.min = currentTimeInputValue();
  });
  input.addEventListener("change", () => {
    validateTodoDeadline(input);
    saveTodos();
  });
});
els.bgColorInput.addEventListener("change", saveTheme);
els.textColorInput.addEventListener("change", saveTheme);
els.lineColorInput.addEventListener("change", saveTheme);
els.lineWidthInput.addEventListener("change", saveTheme);
els.paperColorInput.addEventListener("change", saveTheme);
els.timerColorInput.addEventListener("change", saveTheme);
els.themePresetBtns.forEach((button) => {
  button.addEventListener("click", () => applyThemePreset(Number.parseInt(button.dataset.themePreset, 10) || 0));
});
els.themeNameInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    const index = Number.parseInt(input.dataset.themeName, 10) || 0;
    const slots = loadThemeMemory();
    const slotName = slots[index] ? themeSlotName(slots[index], index) : "";
    const defaultName = defaultThemeSlotName(index);
    input.dataset.previousValue = input.value;
    if (!slotName || slotName === defaultName) {
      input.value = "";
    }
  });
  input.addEventListener("blur", () => {
    if (!input.value.trim()) {
      input.value = input.dataset.previousValue || "";
    }
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveThemeSlot(Number.parseInt(input.dataset.themeName, 10) || 0);
    }
  });
});
els.themeSaveBtns.forEach((button) => {
  button.addEventListener("click", () => saveThemeSlot(Number.parseInt(button.dataset.themeSave, 10) || 0));
});
els.themeLoadBtns.forEach((button) => {
  button.addEventListener("click", () => loadThemeSlot(Number.parseInt(button.dataset.themeLoad, 10) || 0));
});
els.themeDeleteBtns.forEach((button) => {
  button.addEventListener("click", () => deleteThemeSlot(Number.parseInt(button.dataset.themeDelete, 10) || 0));
});
els.themeToggleBtn.addEventListener("click", () => setThemeCollapsed(!els.themeControl.classList.contains("collapsed")));
els.layoutToggleBtn.addEventListener("click", () => setLayoutPanelOpen(els.layoutControl.classList.contains("collapsed")));
els.layoutCloseBtn.addEventListener("click", () => setLayoutPanelOpen(false));
els.musicToggleBtn.addEventListener("click", () => setMusicOpen(els.musicDock.dataset.open !== "true"));
els.musicCloseBtn.addEventListener("click", () => setMusicOpen(false));
els.rewardCloseBtn?.addEventListener("click", () => setRewardOpen(false));
els.rewardHistoryBtn?.addEventListener("click", () => {
  window.location.href = "rewards.html";
});
els.toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleTool(button.dataset.tool);
    if (window.matchMedia("(max-width: 760px)").matches) setToolSidebarOpen(false);
  });
});
els.toolSidebarToggleBtn?.addEventListener("click", () => {
  setToolSidebarOpen(els.toolSidebar.dataset.open !== "true");
});
els.musicFileInput.addEventListener("change", chooseLocalMusicFiles);
els.musicSelect.addEventListener("change", changeMusicTrack);
els.musicPlayBtn.addEventListener("click", playMusic);
els.musicPauseBtn.addEventListener("click", pauseMusic);
els.musicLoopInput.addEventListener("change", () => {
  els.musicAudio.loop = els.musicLoopInput.checked;
  saveMusicSettings();
});
els.musicVolumeInput.addEventListener("input", () => {
  els.musicAudio.volume = Number(els.musicVolumeInput.value) / 100;
  saveMusicSettings();
});
els.inspirationToggleBtn.addEventListener("click", () => setInspirationOpen(els.inspirationDock.dataset.open !== "true"));
els.inspirationCloseBtn.addEventListener("click", () => setInspirationOpen(false));
els.inspirationSaveBtn.addEventListener("click", saveInspiration);
els.inspirationClearBtn.addEventListener("click", clearInspirationDraft);
els.inspirationInput.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    saveInspiration();
  }
});
els.languageSelect.addEventListener("change", () => changeLanguage(els.languageSelect.value));

load();
els.syncUrlInput.value = localStorage.getItem(syncUrlStorageKey) || defaultSyncUrl;
els.syncTokenInput.value = localStorage.getItem(syncTokenStorageKey) || "";
const theme = loadTheme();
populateThemeControls(theme);
applyTheme(theme);
seedBundledThemeMemory();
saveSlot01Preset();
setThemeCollapsed(localStorage.getItem(themeCollapsedStorageKey) === "1");
applyLanguage();
applyLayoutVisibility();
renderCurrentTime();
loadMusicList();
loadNews();
window.addEventListener("pagehide", () => {
  if (hasSyncCredentials()) backupToGoogle({ automatic: true });
});
window.setInterval(() => {
  renderCurrentTime();
  resetGoalsIfNewDay();
  pruneExpiredFutureEvents();
  if (!state.active) return;
  if (currentRemainingMs() <= 0) {
    finishCountdown();
    return;
  }
  render();
}, 1000);

