import Cookies from 'js-cookie'

const TokenKey = 'uid'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getPower() {
  return Cookies.get('power')
}
export function getName() {
  return Cookies.get('name')
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setPower(power) {
  return Cookies.set('power', power)
}
export function setName(name) {
  return Cookies.set('name', name)
}
export function removePower() {
  return Cookies.remove('power')
}
export function removeName() {
  return Cookies.remove('name')
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
