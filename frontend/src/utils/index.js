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

export function formatDateToYMD(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
}
