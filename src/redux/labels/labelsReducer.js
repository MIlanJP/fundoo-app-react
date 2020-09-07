import * as actions from './labelsType'

const initialState = {
    loading :false,
    labelList:[],
    onlyLabelsList:[],
    userData:{},
    pinnedLabel:{},
    deletedLabel:{},
    archievedLabels:{},
    error:''
}

 const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actions.GET_ALL_NOTES:{
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
                ...state,
                loading:false,
                error:action.payload
            }
        }
        case actions.GET_ALL_THE_LABELS:{
            return {
                ...state,
                loading:false,
                labelList:action.payload
            }
        }
        case actions.ONLY_LABELS_LIST:{
            return {
                ...state,
                loading:false,
                onlyLabelsList:action.payload
            }
        }
        default: return state;
    }
}
export default reducer