import * as actions from './labelsType'

const initialState = {
    loading :false,
    labelList:[],
    userData:{},
    error:''
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actions.GET_ALL_LABELS:{
            return{
                ...state,
                userData:action.payload
            }
        }
        case actions.FETCH_USERS_REQUESTS:{
            return{
                ...state,
            }
        }
        default: return state;
    }
}
