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
                loading:false,
                userData:action.payload
            }
        }
        case actions.FETCH_USERS_REQUESTS:{
            return{
                ...state,
                loading:true
            }
        }
        case actions.FETCH_USER_FAILURE:{
            return {
                loading:false,
                error:action.payload
            }
        }
        default: return state;
    }
}
export default reducer