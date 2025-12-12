// create a function to format date label from '2025-12-10-00-00' to '00:00'
export function formatDateForGraphLabel(dateString: string) {
  const parts = dateString.split('-');
  const hours = parts[3];
  const minutes = parts[4];
  return `${hours}:${minutes}`;
}
