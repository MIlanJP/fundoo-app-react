import * as actions from './pinType'

const initialState={
    pinNote:false
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actions.PINNED:{
            return{
                pinNote:true
            }
        }
        case actions.UNPINNED:{
            return{
                pinNote:false
            }
        }
        default:return state
    }
}
export default reducer