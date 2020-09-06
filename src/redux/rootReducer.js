import {combineReducers} from 'redux'
import addNoteReducer from './AddNoteTabFeature/addNoteReducer'
import pinFeature from './pinfeature/pinreducer'
const rootReducer=combineReducers({
    addNoteFeature:addNoteReducer,
    pinFeature:pinFeature

})

export default rootReducer;