import Vue from 'vue'
import Vuex from 'vuex'

import request from 'request'

Vue.use(Vuex)

const STORAGE_TAG = 'v1'
const DEFAULT_DATA = {
  name: '',
  theme: 'default',
  view: 'home'
}

export default new Vuex.Store({
  state: {
    userName: '',
    userTheme: '',
    commitHistory: []
  },
  mutations: {
    SET_USER_DATA (state, { name, theme, view }) {
      state.userName = name || ''
      state.userTheme = theme || ''
      state.userView = view || 'home'
    },
    CLEAR_COMMIT_HISTORY (state) {
      state.commitHistory = []
    }
  },
  actions: {
    LOAD_USER_DATA ({ commit }) {
      try {
        const data = JSON.parse(localStorage.getItem(STORAGE_TAG) || 'null')
        commit('SET_USER_DATA', data)
      } catch (e) {
        commit('SET_USER_DATA', DEFAULT_DATA)
      }
    },
    SAVE_USER_DATA ({ state }) {
      try {
        const data = {
          name: state.userName,
          theme: state.userTheme,
          view: state.userView
        }
        localStorage.setItem(STORAGE_TAG, JSON.stringify(data))
      } catch (e) {
        localStorage.setItem(STORAGE_TAG, JSON.stringify(DEFAULT_DATA))
      }
    },
    GET_COMMIT_HISTORY ({ state, commit }) {
      if (state.userName) {
        request.get(`https://github.com/${state.userName}`, (err, _, body) => {
          if (err) {
            return
          }
          console.log(body)
        })
      }
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
