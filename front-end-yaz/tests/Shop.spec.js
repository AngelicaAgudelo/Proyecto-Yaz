import Shop from '../src/components/Shop.vue'
import { createLocalVue,shallowMount, config } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vue from 'vue';

config.mocks.$store ={
    state:{
        shoopingCar:[]
    },
    shoopingCar:["ds", "ds"]
}

describe('Shop.vue', () => {
    const vuetify = new Vuetify();
    
    beforeEach(() => {
        Vue.use(Vuetify);
    })
  
    it('renders a vue instance', () => {
        const wrapper = shallowMount(Shop, {
        propsData: { totalElements: 3, shoopingCar:[] },
        mocks: {
            $vuetify: { breakpoint: {} },
            shoopingCar:["sdad", "sdsad"]
          },
          vuetify,
          Vue
      })
  
      // With jest we can create snapshot files of the HTML output
      //expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.isVueInstance()).toBe(true);
      // We could also verify this differently
      // by checking the text content
      //const title = wrapper.find('badge')
  
      //expect(title.text()).toBe(3)
    })
  /*
    it('should emit an event when the action v-btn is clicked', () => {
      const wrapper = mount(CustomCard, {
        localVue,
        vuetify,
        propsData: { title: 'Foobar' },
      })
  
      const event = jest.fn()
      const button = wrapper.find('.v-btn')
  
      // Here we bind a listener to the wrapper
      // instance to catch our custom event
      // https://vuejs.org/v2/api/#Instance-Methods-Events
      wrapper.vm.$on('action-btn:clicked', event)
  
      expect(event).toHaveBeenCalledTimes(0)
  
      // Simulate a click on the button
      button.trigger('click')
  
      // Ensure that our mock event was called
      expect(event).toHaveBeenCalledTimes(1)
    })
    */
  })










