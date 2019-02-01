import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Listing from '@/components/Listing.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

const mockState = {
  todos: [
    {
      userId: 1,
      id: 1,
      title: 'one two three',
      completed: false
    },
    {
      userId: 1,
      id: 2,
      title: 'two three four',
      completed: true
    },
    {
      userId: 2,
      id: 3,
      title: 'three four five',
      completed: false
    }
  ],
  users: [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'policy',
      company: {
        name: 'Foo'
      }
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'fly',
      company: {
        name: 'Bar'
      }
    }
  ],
  tab: null,
  searchTerm: '',
  completedToggle: false
}

const mockTodosWithUsers = mockState.todos.map(t => {
  const user = mockState.users && mockState.users.filter(u => u.id === t.userId)
  return { ...t, user: user && user.length && user[0] }
})

// this is somewhat of a hack but since I just want to shallow test and
// not have to load an additional library, it works fine here
const mockInputChange = (searchTerm, completed, lengthShouldBe) => {
  wrapper.vm.searchTerm = searchTerm
  wrapper.vm.completed = completed
  wrapper.vm.onFilterOrSortChanged()
  expect(wrapper.findAll('listingrow-stub').length).toEqual(lengthShouldBe)
}

let wrapper, actions, getters, store
beforeEach(() => {
  actions = {
    SET_COMPLETED_TOGGLE: jest.fn(),
    SET_SEARCH_TERM: jest.fn()
  }
  getters = {
    getSearchTerm: () => (mockState.searchTerm),
    getCompletedToggle: () => (mockState.completedToggle),
    getTodosWithUsers: () => (mockTodosWithUsers)
  }
  store = new Vuex.Store({
    state: mockState,
    actions,
    getters
  })
  wrapper = shallowMount(Listing, { store, localVue })
})

describe('Listing.vue', () => {
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.vm.searchTerm).toEqual(mockState.searchTerm)
    expect(wrapper.vm.todos).toEqual(mockTodosWithUsers)
  })

  it('stores inputs when a change is made', () => {
    mockInputChange('one', false, 1)
    expect(actions.SET_SEARCH_TERM).toHaveBeenCalled()
    expect(actions.SET_COMPLETED_TOGGLE).toHaveBeenCalled()
  })

  it('should filter list accurately with input change', () => {
    mockInputChange('one', false, 1)
    mockInputChange('One', false, 1)
    mockInputChange('two', false, 2)
    mockInputChange('Three', false, 3)
  })

  it('should sort list by showing only completed todos', () => {
    mockInputChange('', false, 3)
    mockInputChange('', true, 1)
  })

  it('should sort and filter list accurately', () => {
    mockInputChange('one', true, 0)
    mockInputChange('two', false, 2)
    mockInputChange('two', true, 1)
    mockInputChange('three', true, 1)
    mockInputChange('five', false, 1)
    mockInputChange('five', true, 0)
  })
})
