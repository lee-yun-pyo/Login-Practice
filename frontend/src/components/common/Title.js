export function Title(content) {
  const $title = document.createElement("h2");

  $title.innerText = content;

  return $title;
}
