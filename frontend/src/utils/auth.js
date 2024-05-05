export function isEmptyEmail(email) {
  return email === "";
}

export function isEmptyPassword(passowrd) {
  return passowrd === "";
}

export function isValidEmail(email, emailRegex) {
  return emailRegex.test(email);
}
