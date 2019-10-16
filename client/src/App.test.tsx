import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import App from './App'

configure({ adapter: new Adapter() })
const mockStore = configureMockStore()
const store = mockStore({})

it('renders without crashing', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  expect(wrapper.contains(<App />)).toBe(true)
})
