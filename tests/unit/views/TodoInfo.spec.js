import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TodoInfo from '@/views/TodoInfo.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

const $router = {
  go: jest.fn()
}

const $route = {
  params: {
    id: '111'
  }
}

const mockState = {
  todos: [
    {
      userId: 2,
      id: 1,
      title: 'one two three',
      completed: false,
      user: {
        id: 2,
        name: 'Leanne Graham',
        username: 'policy',
        address: {
          street: 'Pennsilvania Avenue',
          city: 'Washington D.C.',
          zipcode: '00000'
        },
        company: {
          name: 'Foo'
        }
      }
    }
  ],
  tab: null
}

const mockTabClick = tab => {
  wrapper.vm.active = tab
  wrapper.vm.onNewTab()
}

let wrapper, mutations, actions, getters, store

const initWrapper = state => {
  actions = {
    SET_TAB: jest.fn()
  }
  getters = {
    getTodoDetails: () => () => (state.todos[0]),
    getActiveTab: () => (state.tab)
  }
  store = new Vuex.Store({
    state: state,
    mutations,
    actions,
    getters
  })
  wrapper = shallowMount(TodoInfo, {
    store,
    localVue,
    mocks: {
      $route,
      $router
    }
  })
}

describe('TodoInfo.vue', () => {
  it('renders correctly', () => {
    initWrapper(mockState)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('goes to previous page when back button is clicked', () => {
    initWrapper(mockState)
    wrapper.vm.$router = $router
    wrapper.find('#btn-back').vm.$emit('click')
    expect($router.go).toHaveBeenCalledWith(-1)
  })

  it('stores the clicked tab', () => {
    initWrapper(mockState)
    mockTabClick('User')
    expect(actions.SET_TAB).toHaveBeenCalled()
  })

  it('initializes with the correct preselected tab', () => {
    const state = {
      ...mockState,
      tab: 'User'
    }
    initWrapper(state)
    expect(wrapper.vm.active).toEqual('User')
  })
})
