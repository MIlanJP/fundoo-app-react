import {combineReducers} from 'redux'
import addNoteReducer from './AddNoteTabFeature/addNoteReducer'
import pinFeature from './pinfeature/pinreducer'
import labelReducer from './labels/labelsReducer'
import notesReducer from './notes/noteReducer'
import {reducer as formReducer} from 'redux-form'
const rootReducer=combineReducers({
    addNoteFeature:addNoteReducer,
    pinFeature:pinFeature,
    labels:labelReducer,
    notes:notesReducer,
    form:formReducer

})

export default rootReducer;