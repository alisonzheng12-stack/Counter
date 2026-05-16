const SHEET_NAME = 'CounterData';
const ACCESS_TOKEN = 'CHANGE_ME_TO_YOUR_PRIVATE_TOKEN';

function doPost(e) {
  const payloadText = e.parameter.payload || e.postData.contents || '{}';
  const payload = JSON.parse(payloadText);
  if (payload.token !== ACCESS_TOKEN) {
    return jsonResponse({ ok: false, error: 'unauthorized' });
  }

  const sheet = getSheet();
  const now = new Date();
  const deviceId = String(payload.deviceId || 'default');
  const data = JSON.stringify(payload.data || {});

  const rows = sheet.getDataRange().getValues();
  const rowIndex = rows.findIndex((row, index) => index > 0 && row[0] === deviceId);

  if (rowIndex >= 1) {
    sheet.getRange(rowIndex + 1, 2, 1, 2).setValues([[now, data]]);
  } else {
    sheet.appendRow([deviceId, now, data]);
  }

  return jsonResponse({ ok: true, savedAt: now.toISOString() });
}

function doGet(e) {
  const token = e.parameter.token;
  if (token !== ACCESS_TOKEN) {
    return jsonResponse({ ok: false, error: 'unauthorized' }, e.parameter.callback);
  }

  const deviceId = String(e.parameter.deviceId || 'default');
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const row = rows.find((item, index) => index > 0 && item[0] === deviceId);

  if (!row) {
    return jsonResponse({ ok: true, data: null }, e.parameter.callback);
  }

  return jsonResponse({
    ok: true,
    savedAt: row[1],
    data: JSON.parse(row[2] || '{}'),
  }, e.parameter.callback);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['deviceId', 'savedAt', 'data']);
  }
  return sheet;
}

function jsonResponse(data, callback) {
  const json = JSON.stringify(data);
  if (callback) {
    return ContentService
      .createTextOutput(`${callback}(${json});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
