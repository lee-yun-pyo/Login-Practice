export function SkeletonChat(count) {
  const $container = document.createElement("div");
  $container.classList.add("skeleton-chat__container");

  const repeat = Array.from({ length: count }, (_, idx) => idx);

  const skeletonHTML = repeat
    .map(() => {
      return `
              <div class="skeleton-chat__currentDate"></div>
              <div class="comment-wrapper comment-wrapper__other">
                <div class="skeleton-chat__profile"></div>
                <div class="skeleton-chat__element skeleton-chat__other"></div>  
              </div>
              <div class="comment-wrapper comment-wrapper__self">
                <div class="skeleton-chat__element skeleton-chat__self"></div>
              </div>
        `;
    })
    .join("");

  $container.innerHTML = skeletonHTML;

  return $container;
}
