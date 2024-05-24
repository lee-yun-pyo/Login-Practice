export function formatDateToAmPm(dateString) {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "오후" : "오전";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0시를 12시로 변환
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  return `${ampm} ${hours}:${minutesStr}`;
}
