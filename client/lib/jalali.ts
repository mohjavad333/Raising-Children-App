/**
 * Jalali (Persian/Farsi) Calendar Utilities
 */

// Convert Gregorian date to Jalali
export function gregorianToJalali(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    const gy = d.getFullYear();
    const gm = d.getMonth() + 1;
    const gd = d.getDate();
  
    let jy, jm, jd;
  
    if (gm > 2) {
      jy = gy + 1;
    } else {
      jy = gy;
    }
  
    const g_d_n = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
    const j_d_n = 365 * jy + Math.floor((jy - 979) / 33) * 8 + Math.floor(((jy - 979) % 33 + 3) / 4) + 78 + gd;
    const j_day_of_year = j_d_n - (365 * jy + Math.floor((jy - 979) / 33) * 8 + Math.floor(((jy - 979) % 33) / 4));
  
    if (j_day_of_year <= 186) {
      jm = 1 + Math.floor(j_day_of_year / 31);
      jd = 1 + (j_day_of_year % 31);
    } else {
      jm = 7 + Math.floor((j_day_of_year - 186) / 30);
      jd = 1 + ((j_day_of_year - 186) % 30);
    }
  
    return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  }
  
  // Convert Jalali date to Gregorian
  export function jalaliToGregorian(jy: number, jm: number, jd: number): Date {
    const jy2 = jy + 1474;
    let days = 365 * jy2 + Math.floor(jy2 / 33) * 8 + Math.floor(((jy2 % 33) + 3) / 4) + jd;
  
    let gy = 400 * Math.floor(days / 146097);
    days %= 146097;
  
    let flag = true;
    if (days >= 36525) {
      days -= 1;
      gy += 100 * Math.floor(days / 36524);
      days %= 36524;
      if (days >= 365) {
        days += 1;
      }
      flag = false;
    }
  
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
  
    if (flag) {
      if (days >= 366) {
        days -= 1;
        gy += Math.floor(days / 365);
        days = (days % 365) + 1;
      }
    } else {
      gy += Math.floor(days / 365);
      days = (days % 365) + 1;
    }
  
    const gm = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let gMonth = 0;
    for (let i = 0; i < gm.length; i++) {
      gm[i] = gm[i] + (i > 1 && isGregorianLeapYear(gy) ? 1 : 0);
      if (gm[i] < days) {
        gMonth = i;
      }
    }
  
    const gDay = days - gm[gMonth];
    return new Date(gy, gMonth, gDay);
  }
  
  // Check if Gregorian year is leap year
  function isGregorianLeapYear(gy: number): boolean {
    return (gy % 400 === 0) || (gy % 100 !== 0 && gy % 4 === 0);
  }
  
  // Parse Jalali date string and return object
  export function parseJalaliDate(dateStr: string): { year: number; month: number; day: number } | null {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;
    
    return {
      year: parseInt(parts[0]),
      month: parseInt(parts[1]),
      day: parseInt(parts[2]),
    };
  }
  
  // Format Jalali date nicely
  export function formatJalaliDate(dateStr: string): string {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return dateStr;
    
    const months = [
      "فروردین", "اردیبهشت", "خرداد", "تیر",
      "مرداد", "شهریور", "مهر", "آبان",
      "آذر", "دی", "بهمن", "اسفند"
    ];
    
    const year = parts[0];
    const month = months[parseInt(parts[1]) - 1] || parts[1];
    const day = parts[2];
    
    return `${day} ${month} ${year}`;
  }
  
  // Get today's date in Jalali format
  export function getTodayJalali(): string {
    return gregorianToJalali(new Date());
  }
  
  // Calculate age from Jalali birth date
  export function calculateAgeFromJalali(jalaliDate: string): number {
    const parsed = parseJalaliDate(jalaliDate);
    if (!parsed) return 0;
  
    const today = getTodayJalali();
    const todayParsed = parseJalaliDate(today);
    if (!todayParsed) return 0;
  
    let age = todayParsed.year - parsed.year;
    if (
      todayParsed.month < parsed.month ||
      (todayParsed.month === parsed.month && todayParsed.day < parsed.day)
    ) {
      age--;
    }
  
    return age;
  }
  