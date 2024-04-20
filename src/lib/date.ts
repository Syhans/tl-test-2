import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export function convertDate(date: string) {
  const dateObject = parseISO(date);
  return format(dateObject, "MMMM do, yyyy", { locale: enUS });
}
