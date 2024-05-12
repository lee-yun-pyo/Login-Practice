import { PASSWORD_MIN_LENGTH } from "../constants";

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

export function isPasswordInCorrect(password, passwordConfirm) {
  return password !== passwordConfirm;
}

export function isInValidPassword(password) {
  return password.length < PASSWORD_MIN_LENGTH;
}

export function isValidEmail(email, emailRegex) {
  return emailRegex.test(email);
}
