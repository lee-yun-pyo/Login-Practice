export function isEmptyEmail(email) {
  return email === "";
}

export function isEmptyPassword(passowrd) {
  return passowrd === "";
}

export function isEmptyName(name) {
  return name === "";
}

export function isEmptyPasswordConfirm(password) {
  return password === "";
}

export function isValidEmail(email, emailRegex) {
  return emailRegex.test(email);
}
