import Vue from 'vue'
import Vuex from 'vuex'

import request from 'request'
import cheerio from 'cheerio'

import Themes from '@/common/theme'

Vue.use(Vuex)

const STORAGE_TAG = 'v1'
const DEFAULT_DATA = {
  name: '',
  theme: 0
}

export default new Vuex.Store({
  state: {
    userName: '',
    userTheme: 0,
    userView: '',
    commitHistory: [],
    commitHistoryMeta: {
      max: {
        date: '',
        count: 0
      },
      min: {
        date: '',
        count: 1
      }
    },
    commitDate: {
      month: [],
      weekDay: []
    },
    loading: true,
    errorCount: 0,
    error: '',
    errorDetail: '',
    theme: 'light'
  },
  mutations: {
    SET_USER_NAME (state, name) {
      state.userName = name
    },
    SET_USER_THEME (state, theme) {
      state.userTheme = theme
    },
    SET_USER_DATA (state, { name, theme }) {
      state.userName = name || ''
      state.userTheme = theme || 0
    },
    SET_VIEW (state, view) {
      state.userView = view
    },
    SET_COMMIT_DATE (state, { key, data }) {
      state.commitDate[key].push(data)
    },
    SET_META_DATA (state, { type, date, count }) {
      state.commitHistoryMeta[type].date = date
      state.commitHistoryMeta[type].count = count
    },
    SET_LOADING_STATUS (state, status) {
      state.loading = status
    },
    SET_ERROR_MESSAGE (state, { message, detail }) {
      state.errorCount++
      state.error = message
      state.errorDetail = detail
    },
    PUSH_HISTORY_DATA (state, weekData) {
      state.commitHistory.push(weekData)
    },
    CLEAR_COMMIT_HISTORY (state) {
      state.commitHistory = []
      state.commitDate.month = []
      state.commitDate.weekDay = []
      state.commitHistoryMeta.max.count = 0
      state.commitHistoryMeta.min.count = 1
    },
    CURRENT_THEME (state, theme) {
      state.theme = theme || 'light'
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute(
        'data-theme', state.theme
      )
    }
  },
  actions: {
    LOAD_USER_DATA ({ commit }) {
      try {
        const data = JSON.parse(localStorage.getItem(STORAGE_TAG))
        const theme = localStorage.getItem('theme')
        commit('SET_USER_DATA', data || DEFAULT_DATA)
        commit('CURRENT_THEME', theme || 'light')
      } catch (e) {
        commit('SET_USER_DATA', DEFAULT_DATA)
        commit('CURRENT_THEME', 'light')
      }
    },
    SAVE_USER_DATA ({ state }) {
      try {
        const data = {
          name: state.userName,
          theme: state.userTheme
        }
        localStorage.setItem(STORAGE_TAG, JSON.stringify(data))
      } catch (e) {
        localStorage.setItem(STORAGE_TAG, JSON.stringify(DEFAULT_DATA))
      }
    },
    GET_COMMIT_HISTORY ({ state, commit, dispatch }) {
      if (state.userName) {
        commit('SET_LOADING_STATUS', true)
        commit('CLEAR_COMMIT_HISTORY')

        request.get(`https://github.com/${state.userName}`, (err, res, body) => {
          if (err || res.statusCode === 500) {
            commit('SET_VIEW', 'setting')
            commit('SET_ERROR_MESSAGE', {
              message: 'Can not get github page data',
              detail: err.toString()
            })
            return
          }

          if (res.statusCode === 404) {
            commit('SET_VIEW', 'setting')
            commit('SET_ERROR_MESSAGE', {
              message: `${state.userName} user not found`,
              detail: '404 Error'
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
                  let date = dayOfweek.attribs['data-date']
                  let count = parseInt(dayOfweek.attribs['data-count'])

                  if (count > state.commitHistoryMeta.max.count) {
                    commit('SET_META_DATA', { type: 'max', date, count })
                  }

                  if (count < state.commitHistoryMeta.min.count) {
                    commit('SET_META_DATA', { type: 'min', date, count })
                  }

                  weekHistoryData.days.push({ date, count })
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

          dispatch('SAVE_USER_DATA')
          commit('SET_VIEW', 'home')
          commit('SET_LOADING_STATUS', false)
        })
      } else {
        commit('SET_VIEW', 'setting')
      }
    },
    TOGGLE_DARKMODE ({ state, commit }) {
      commit('CURRENT_THEME', state.theme === 'light' ? 'dark' : 'light')
    },
    CHANGE_THEME ({ state, commit, dispatch }) {
      let index = Themes.SCHEME.length <= state.userTheme + 1
        ? 0 : state.userTheme + 1
      commit('SET_USER_THEME', index)
      dispatch('SAVE_USER_DATA')
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
