import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import ListingRow from '@/components/ListingRow.vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

const mockProps = {
  todo: {
    id: '111',
    title: 'My Title',
    completed: false,
    user: {
      name: 'Jane Doe',
      username: 'jdoe',
      company: {
        name: 'Acme Inc.'
      }
    }
  }
}

const $router = {
  push: jest.fn()
}

let wrapper
beforeEach(() => {
  wrapper = shallowMount(ListingRow, {
    propsData: mockProps
  })
})

describe('ListingRow.vue', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find('v-list-tile-title-stub').text()).toBe(mockProps.todo.title)
    expect(wrapper.find('v-list-tile-sub-title-stub.text--primary').text()).toBe(mockProps.todo.user.company.name)
    expect(wrapper.find('.row-name').text()).toBe(mockProps.todo.user.name)
    expect(wrapper.find('.row-username').text()).toBe(mockProps.todo.user.username)
  })

  it('should have filled in star if todo IS NOT completed', () => {
    expect(wrapper.find('.row-star').text()).toBe('star_border')
    expect(wrapper.contains('.row-star[color*=grey]')).toBe(true)
  })

  it('should have an outlined star if todo IS completed', () => {
    const uncompletedProps = JSON.parse(JSON.stringify(mockProps)) // deep clone
    uncompletedProps.todo.completed = true
    wrapper.setProps(uncompletedProps)
    expect(wrapper.find('.row-star').text()).toBe('star')
    expect(wrapper.contains('.row-star[color*=yellow]')).toBe(true)
  })

  it('should push to detail page when clicked', () => {
    wrapper.vm.$router = $router
    wrapper.find('.row-container').vm.$emit('click')
    expect($router.push).toHaveBeenCalledWith({
      path: `/details/${mockProps.todo.id}`
    })
  })
})
