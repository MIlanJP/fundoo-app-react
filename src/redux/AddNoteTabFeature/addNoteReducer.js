import * as actions from './addNoteType'

const initialState={
    addNote:false
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actions.ADDNOTE_AFTER_CLICK:{
            return{
                addNote:true
            }
        }
        case actions.ADDNOTE_BEFORE_CLICK:{
            return{
                addNote:false
            }
        }
        default:return state
    }
}
export default reducer