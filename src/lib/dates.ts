const NE_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const NE_WEEKDAYS = ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"];
const NE_WEEKDAYS_SHORT = ["आइत", "सोम", "मंगल", "बुध", "बिहि", "शुक्र", "शनि"];
const NE_AD_MONTHS = ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"];
const NE_BS_MONTHS = ["बैशाख", "जेठ", "असार", "श्रावण", "भदौ", "असोज", "कार्तिक", "मंसिर", "पुस", "माघ", "फाल्गुन", "चैत"];

const bsMonthData: Record<number, number[]> = {
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2083: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
};

export const toNepaliDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => NE_DIGITS[Number(digit)]);

export function adToBs(date: Date) {
  const target = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  let cursor = Date.UTC(2024, 3, 12);
  let year = 2081;
  let month = 1;
  let day = 1;
  const monthDays = (y: number, m: number) =>
    (bsMonthData[y] ?? [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30])[m - 1];

  while (cursor < target) {
    cursor += 86_400_000;
    day += 1;
    if (day > monthDays(year, month)) {
      day = 1;
      month += 1;
      if (month > 12) { month = 1; year += 1; }
    }
  }
  while (cursor > target) {
    cursor -= 86_400_000;
    day -= 1;
    if (day < 1) {
      month -= 1;
      if (month < 1) { month = 12; year -= 1; }
      day = monthDays(year, month);
    }
  }
  return { year, month, day };
}

export const formatAd = (date = new Date()) =>
  `${NE_WEEKDAYS_SHORT[date.getDay()]}, ${NE_AD_MONTHS[date.getMonth()]} ${toNepaliDigits(date.getDate())}, ${toNepaliDigits(date.getFullYear())}`;

export const formatBs = (date = new Date()) => {
  const bs = adToBs(date);
  return `${toNepaliDigits(bs.year)} ${NE_BS_MONTHS[bs.month - 1]} ${toNepaliDigits(bs.day)}, ${NE_WEEKDAYS[date.getDay()]}`;
};
