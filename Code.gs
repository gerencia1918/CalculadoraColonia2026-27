// Apps Script del club. Registra cada consulta en la planilla (hoja "Consultas").
// Columnas: Fecha | Hora | Mail | Total | Detalle | ID
// - Al ingresar la persona se crea la fila con fecha, hora y mail.
// - Si luego copia el resumen, se completan Total y Detalle en esa misma fila.
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var d = JSON.parse(e.postData.contents);
    var id = String(d.id || '').slice(0, 60);
    var email = String(d.email || '').trim().slice(0, 120);
    if (!id || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return salida('datos invalidos');
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName('Consultas') || ss.insertSheet('Consultas');
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Fecha', 'Hora', 'Mail', 'Total', 'Detalle', 'ID']);
      sh.setFrozenRows(1);
      sh.hideColumns(6);
    }
    var tz = 'America/Argentina/Buenos_Aires';
    var fila = buscar(sh, id);
    if (d.tipo === 'copia') {
      var total = Number(d.total) || '';
      var detalle = String(d.detalle || '').slice(0, 3000);
      if (fila) { sh.getRange(fila, 4, 1, 2).setValues([[total, detalle]]); }
      else { sh.appendRow([fechaHora(tz, 'dd/MM/yyyy'), fechaHora(tz, 'HH:mm:ss'), email, total, detalle, id]); }
    } else if (!fila) {
      sh.appendRow([fechaHora(tz, 'dd/MM/yyyy'), fechaHora(tz, 'HH:mm:ss'), email, '', '', id]);
    }
    return salida('ok');
  } catch (err) {
    return salida('error');
  } finally {
    lock.releaseLock();
  }
}
function fechaHora(tz, fmt) { return Utilities.formatDate(new Date(), tz, fmt); }
function buscar(sh, id) {
  var n = sh.getLastRow();
  if (n < 2) return 0;
  var ids = sh.getRange(2, 6, n - 1, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) { if (ids[i][0] === id) return i + 2; }
  return 0;
}
function salida(t) { return ContentService.createTextOutput(t); }
