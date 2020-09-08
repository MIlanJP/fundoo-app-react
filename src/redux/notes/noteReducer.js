import * as actions from './noteType'
import userData from './userStaticdata.json'
const initialState={
    displayListFeature:false,
    descriptionCheckBoxList:[''],
    userData:userData.data.data,
    pinnedNotes:userData.data.data.filter(pinned=> pinned.isPined===true),
    unPinnedNotes:userData.data.data.filter(pinned=> pinned.isPined===false)
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