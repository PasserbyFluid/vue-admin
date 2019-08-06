import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/login/veifys',
    method: 'post',
    data
  })
}
export function reg(data) {
  return request({
    url: '/login/login/create',
    method: 'post',
    data
  })
}
export function getInfo(uid) {
  return request({
    url: '/login/login/getinfo',
    method: 'get',
    data:{'uid':uid}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
