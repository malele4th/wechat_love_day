/** Storage key for love relationship start date (YYYY-MM-DD). */
export const LOVE_START_DATE_KEY = 'love_start_date';

/**
 * @param {string} ymd
 * @returns {Date | null} local midnight semantic date, or null if invalid
 */
function parseYMDLocal(ymd) {
  if (!ymd || typeof ymd !== 'string') return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null;
  return dt;
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function getLoveStartDate() {
  const v = wx.getStorageSync(LOVE_START_DATE_KEY);
  return typeof v === 'string' && v ? v : '';
}

export function setLoveStartDate(ymd) {
  wx.setStorageSync(LOVE_START_DATE_KEY, ymd);
}

/** Today's date in local timezone as YYYY-MM-DD (for picker `end`). */
export function formatTodayYMD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const ms = m < 10 ? `0${m}` : `${m}`;
  const ds = day < 10 ? `0${day}` : `${day}`;
  return `${y}-${ms}-${ds}`;
}

/**
 * Inclusive day count: start day is day 1.
 * @returns {number | null} null if unset, invalid, or start is after today
 */
export function getLoveDayCount() {
  const raw = getLoveStartDate();
  if (!raw) return null;
  const start = parseYMDLocal(raw);
  if (!start) return null;
  const startMs = startOfLocalDay(start);
  const todayMs = startOfLocalDay(new Date());
  const diffDays = Math.floor((todayMs - startMs) / 86400000);
  if (diffDays < 0) return null;
  return diffDays + 1;
}
