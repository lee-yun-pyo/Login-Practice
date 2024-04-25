const $loginDiv = document.createElement("div");
$loginDiv.classList.add("sign-wrapper");

function Title(isLoginPage) {
  const $title = document.createElement("h2");
  $title.innerText = isLoginPage ? "로그인" : "회원가입";
  return $title;
}

function spanInFormTag(isLoginPage) {
  const $span = document.createElement("span");
  $span.classList.add("sign-textBtn");
  $span.innerText = isLoginPage
    ? "계정이 없다면 회원가입"
    : "계정이 있다면 로그인";
  return $span;
}

function loginFormTag() {
  const $form = document.createElement("form");
  $form.classList.add("sign-form");
  $form.innerHTML = ` 
      <input
        class="sign-inputText"
        type="text"
        required
        placeholder="example@email.com"
      />
      <input
        class="sign-inputText"
        type="password"
        required
        placeholder="비밀번호"
        autocomplete="off"
      />
      <input class="sign-submitBtn" type="submit" value="로그인" />
    `;
  return $form;
}

function signupFormTag() {
  const $form = document.createElement("form");
  $form.classList.add("sign-form");
  $form.innerHTML = ` 
      <input
        class="sign-inputText"
        type="text"
        required
        placeholder="example@email.com"
      />
      <input
        class="sign-inputText"
        type="text"
        required
        placeholder="이름"
      />
      <input
        class="sign-inputText"
        type="password"
        required
        placeholder="비밀번호"
        autocomplete="off"
      />
      <input
        class="sign-inputText"
        type="password"
        required
        placeholder="비밀번호 확인"
        autocomplete="off"
      />
      <input class="sign-submitBtn" type="submit" value="회원가입" />
    `;
  return $form;
}

function render() {
  const isLoginPage = true; // Todo: url에 따른 분기처리
  $loginDiv.appendChild(Title(isLoginPage));
  $loginDiv.appendChild(isLoginPage ? loginFormTag() : signupFormTag());
  $loginDiv.appendChild(spanInFormTag(isLoginPage));
}

render();

export default $loginDiv;
