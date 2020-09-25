import { createStore ,applyMiddleware} from 'redux';
import logger from 'redux-logger'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(logger,thunk)))
// export const storeFactory=(initialState)=>{return createStore(rootReducer,initialState)}
export default store
