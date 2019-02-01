import Vue from 'vue'
import Vuex from 'vuex'
import ListService from './services/ListService'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    todos: [],
    users: [],
    tab: null,
    searchTerm: '',
    completedToggle: false
  },
  mutations: {
    SET_TODOS: (state, data) => {
      Vue.set(state, 'todos', data)
    },
    SET_USERS: (state, data) => {
      Vue.set(state, 'users', data)
    },
    SET_TAB: (state, tab) => {
      Vue.set(state, 'tab', tab)
    },
    SET_SEARCH_TERM: (state, term) => {
      Vue.set(state, 'searchTerm', term)
    },
    SET_COMPLETED_TOGGLE: (state, status) => {
      Vue.set(state, 'completedToggle', status)
    }
  },
  actions: {
    GET_TODOS: async ({ commit }) => {
      const response = await ListService.getTodos()
      commit('SET_TODOS', response.data)
    },
    GET_USERS: async ({ commit }) => {
      const response = await ListService.getUsers()
      commit('SET_USERS', response.data)
    },
    INIT: async ({ commit, state }) => {
      if (!state.todos.length) {
        const response = await ListService.getTodos()
        commit('SET_TODOS', response.data)
      }
      if (!state.users.length) {
        const usersResponse = await ListService.getUsers()
        commit('SET_USERS', usersResponse.data)
      }
    },
    SET_TAB: ({ commit }, tab) => {
      commit('SET_TAB', tab)
    },
    SET_SEARCH_TERM: ({ commit }, term) => {
      commit('SET_SEARCH_TERM', term)
    },
    SET_COMPLETED_TOGGLE: ({ commit }, status) => {
      commit('SET_COMPLETED_TOGGLE', status)
    }
  },
  getters: {
    hasTodos: state => (state.todos.length),
    getTodos: state => (state.todos),
    getUsers: state => (state.users),
    getTodosWithUsers: state => {
      const todos = [...state.todos]
      return todos.map(t => {
        const user = state.users && state.users.filter(u => u.id === t.userId)
        return { ...t, user: user && user.length && user[0] }
      })
    },
    getTodoDetails: state => (id) => {
      const todoAry = state.todos.filter(t => t.id === parseInt(id, 10))
      if (todoAry.length) {
        const todo = { ...todoAry[0] }
        const user = state.users && state.users.filter(u => u.id === todo.userId)
        todo.user = user && user.length && user[0]
        return todo
      }
    },
    getActiveTab: state => (state.tab),
    getSearchTerm: state => (state.searchTerm),
    getCompletedToggle: state => (state.completedToggle)
  }
})
