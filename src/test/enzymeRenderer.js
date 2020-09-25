// test-utils.js
import React from 'react'
import * as enzyme from 'enzyme';
import { shallow as rtlRender } from 'enzyme'
import  Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// Import your own reducer
import reducer from '../redux/rootReducer'
enzyme.configure({adapter:new Adapter()})

function renderr(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything

// override render method
export { renderr }