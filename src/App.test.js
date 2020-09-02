import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {configure,shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import VisibilityOff from './pages/resetPassword.jsx'
import Visibility from './pages/resetPassword.jsx'
import SnackBar from './components/SnackBars'
configure({adapter:new Adapter()})


// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("Testing Elements",()=>{
  it('should not show password',()=>{
    const wrapper=shallow(<VisibilityOff/>)
    expect(wrapper.find(VisibilityOff));
  });  it('should not show password',()=>{
    const wrapper=shallow(<Visibility/>)
    expect(wrapper.find(Visibility));
  });
  it('should hide snack at initial',()=>{
    const wrapper=shallow(<SnackBar/>)
    expect(wrapper.find(SnackBar));
  });
})