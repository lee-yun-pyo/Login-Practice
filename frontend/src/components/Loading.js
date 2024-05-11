const $loading = document.createElement("div");

function render() {
  $loading.style.display = "none";
  $loading.classList.add("loadingUI");
  $loading.innerText = "콘텐츠 불러오는 중...";
}

render();

export default $loading;
