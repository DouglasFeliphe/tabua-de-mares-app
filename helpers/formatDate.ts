/**
 * format date with timezone
 * @param date
 * @returns the date in the format: 'hhhh-mm-dd-hh-mm'
 */
export function formatDateWithTimeZone(date: Date = new Date()) {
  const dateParts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).formatToParts(date);

  const year = dateParts.find((part) => part.type === 'year')?.value;
  const month = dateParts.find((part) => part.type === 'month')?.value;
  const day = dateParts.find((part) => part.type === 'day')?.value;
  const hours = dateParts.find((part) => part.type === 'hour')?.value;
  const minutes = dateParts.find((part) => part.type === 'minute')?.value;
  // const minutes = '00';

  const dateString = `${year}-${month}-${day}-${hours}-${minutes}`;

  return dateString;
}
