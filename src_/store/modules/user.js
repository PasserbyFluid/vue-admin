import { login, logout, getInfo,reg } from '@/api/user'
import { getToken, setToken, removeToken,setPower,removePower ,setName,getName,removeName} from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: getName(),
  avatar: '',
  // uid:getUid()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), passwd: password }).then(response => {
        console.log(response)
        if (response.code == 1) {
          commit('SET_TOKEN', response.msg.id)
          setToken(response.msg.id)
          setPower(response.msg.power)
          setName(response.msg.name)
          commit('SET_NAME', response.msg.name)
          commit('SET_AVATAR', 'avatar')
          
        }
        // const { data } = response
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  reg({ commit }, userInfo) {
    const { name, password, type } = userInfo
    return new Promise((resolve, reject) => {
      reg({ name: name.trim(), password: password , type:type}).then(response => {
        console.log(response)
        // const { data } = response
        // commit('SET_TOKEN', response.msg.id)
        // setToken(response.msg.id)
        // setPower(response.msg.power)
        // commit('SET_NAME', 'name')
        // commit('SET_AVATAR', 'avatar')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', 'name')
        commit('SET_AVATAR', 'avatar')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      removePower()
      resetRouter()
      removeName()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

