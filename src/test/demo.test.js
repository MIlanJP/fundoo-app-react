import React from 'react'
import SignIn from '../pages/signin'
import{ BrowserRouter,Route} from 'react-router-dom'

// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render,fireEvent,screen,cleanup } from './testRender'
// import {}  from '@testing-library/react'

afterEach(cleanup)

it('Renders the connected app with initialState', () => {
 const {asFragment,getByTestId}= render(<BrowserRouter><SignIn /></BrowserRouter>, { initialState: { user: 'Redux User' } })
 expect(asFragment()).toMatchSnapshot();
//  expect(getByTestId('login-component'))
 expect(getByTestId('login-label')).toHaveTextContent("Continue to Fundoo")
  expect(screen.getByText(/Create Account/i)).toBeInTheDocument()
})