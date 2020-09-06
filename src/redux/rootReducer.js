import {combineReducers} from 'redux'
import addNoteReducer from './AddNoteTabFeature/addNoteReducer'
import pinFeature from './pinfeature/pinreducer'
import labelReducer from './labels/labelsReducer'
const rootReducer=combineReducers({
    addNoteFeature:addNoteReducer,
    pinFeature:pinFeature,
    labels:labelReducer

})

export default rootReducer;