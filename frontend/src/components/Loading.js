export function Loading() {
  const $container = document.createElement("div");
  $container.style.display = "none";
  $container.classList.add("loadingUI");
  $container.innerText = "콘텐츠 불러오는 중...";

  return $container;
}
