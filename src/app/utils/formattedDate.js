const longDateOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
export function formattedLongDate(dateString) {
  return new Date(dateString).toLocaleDateString("fr-FR", longDateOptions);
}

const smallDateOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};
export function formattedSmallDate(dateString) {
  return new Date(dateString).toLocaleDateString("fr-FR", smallDateOptions);
}

export const toJavaDateFormat = (dateString) => {
  const date = new Date(dateString);
  const timeZoneOffsetInHours = date.getTimezoneOffset() / 60;
  date.setHours(22 - timeZoneOffsetInHours); // adjust to get 22:00:00 in UTC
  return date.toISOString(); // converts to "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
}
