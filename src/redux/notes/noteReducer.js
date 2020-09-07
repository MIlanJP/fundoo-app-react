import * as actions from './noteType'

const initialState={
    displayListFeature:false,
    descriptionCheckBoxList:[''],
}

const reducer=(state=initialState,action)=>{
switch(action.type){
    case actions.LIST_FEATURE_ON:{
        return{
            ...state,
            displayListFeature:true
        }
    }

    case actions.LIST_FEATURE_OFF:{
        return{
            ...state,
            displayListFeature:false
        }
    }
    
    case actions.SET_DESCRIPTION_LIST:{
        return{
            ...state,
            descriptionCheckBoxList:action.payload
        }
    }

    default : return state
}
}

export default reducer