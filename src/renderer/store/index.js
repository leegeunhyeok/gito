import Vue from 'vue'
import Vuex from 'vuex'

import request from 'request'
import cheerio from 'cheerio'

Vue.use(Vuex)

const STORAGE_TAG = 'v1'
const DEFAULT_DATA = {
  name: '',
  theme: 'default',
  view: 'home',
  error: '',
  errorDetail: ''
}

export default new Vuex.Store({
  state: {
    userName: '',
    userTheme: '',
    commitHistory: [],
    commitDate: {
      month: [],
      weekDay: []
    }
  },
  mutations: {
    SET_USER_DATA (state, { name, theme, view }) {
      state.userName = name || ''
      state.userTheme = theme || ''
      state.userView = view || 'home'
    },
    PUSH_HISTORY_DATA (state, weekData) {
      state.commitHistory.push(weekData)
    },
    SET_COMMIT_DATE (state, { key, data }) {
      state.commitDate[key].push(data)
    },
    SET_ERROR_MESSAGE (state, { message, detail }) {
      state.error = message
      state.errorDetail = detail
    },
    CLEAR_COMMIT_HISTORY (state) {
      state.commitHistory = []
      state.commitDate.month = []
      state.commitDate.weekDay = []
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
      if (!state.userName) {
        commit('CLEAR_COMMIT_HISTORY')
        request.get(`https://github.com/${'leegeunhyeok'}`, (err, _, body) => {
          if (err) {
            commit('SET_ERROR_MESSAGE', {
              message: 'Can not get github page data',
              detail: err.toString()
            })
            return
          }

          const $ = cheerio.load(body)
          const graph = $('svg.js-calendar-graph-svg > g')
          let weekCount = 0
          graph.find('g').each((_, element) => {
            if (weekCount++ >= 22) {
              const weekHistoryData = {
                week: element.attribs.transform,
                days: []
              }

              element.childNodes.forEach(dayOfweek => {
                if (dayOfweek.name === 'rect') {
                  weekHistoryData.days.push({
                    ...dayOfweek.attribs
                  })
                }
              })

              commit('PUSH_HISTORY_DATA', weekHistoryData)
            }
          })

          let month = 0
          graph.find('text').each((_, element) => {
            let data = element.firstChild.data
            if (month < 12) {
              commit('SET_COMMIT_DATE', { key: 'month', data })
              month++
            } else {
              commit('SET_COMMIT_DATE', { key: 'weekDay', data })
            }
          })
        })
      }
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
