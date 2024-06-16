import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export function convertDate(
  date: string,
  allowReturnAsIs = false,
  omitWeekday = false,
) {
  const dateObject = parseISO(date);
  if (allowReturnAsIs) {
    try {
      if (omitWeekday) {
        return format(dateObject, "MMMM d, yyyy", { locale: enUS });
      } else {
        return format(dateObject, "EEEE, MMMM d, yyyy", { locale: enUS });
      }
    } catch {
      return date;
    }
  }
  if (omitWeekday) {
    return format(dateObject, "MMMM d, yyyy", { locale: enUS });
  } else {
    return format(dateObject, "EEEE, MMMM d, yyyy", { locale: enUS });
  }
}

export function convertDateMonth(date: string) {
  const dateObject = parseISO(date);
  return format(dateObject, "MMMM yyyy", { locale: enUS });
}

export function getYear(date: string) {
  const dateObject = parseISO(date);
  return format(dateObject, "yyyy", { locale: enUS });
}

export function getMonth(date: string) {
  const dateObject = parseISO(date);
  return format(dateObject, "MMMM", { locale: enUS });
}

// lol
export function monthNameToNumber(month: string, locale = "en-US") {
  const date = new Date(Date.parse(month + " 1, 2000"));
  return date.toLocaleString(locale, { month: "numeric" });
}
