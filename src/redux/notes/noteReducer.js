import * as actions from './noteType'
import userData from './userStaticdata.json'
const initialState={
    loading:false,
    displayListFeature:false,
    descriptionCheckBoxList:[''],
    userData:[],
    pinnedNotes:[],
    unPinnedNotes:userData.data.data.filter(pinned=> pinned.isPined===false),
    notesViewOnClick:{},
}

const reducer=(state=initialState,action)=>{
switch(action.type){
    case actions.LIST_FEATURE_ON:{
        return{
            ...state,
            displayListFeature:true
        }
    }

    case actions.GET_ALL_NOTES:{
        return{
            ...state,
            loading:false,
            userData:action.payload,
            pinnedNotes:action.payload.filter(pinned=> pinned.isPined!==true),
            unPinnedNotes:action.payload.filter(pinned=> pinned.isPined!==true),
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
    case actions.UPDATE_PINNED_STATUS_OF_NOTE:{
        const notes=[]
        state.userData.map(data=> { 
            if(data.id===action.id){
                data.isPined=action.payload
            }
            notes.push(data)
        }
            )
           
        return{
            ...state,
            userData:notes,
        }
    }
    case actions.HIDE_ALL_NOTE_SECTION:{
        return{
            ...state,
            notesViewOnClick:action.payload
        }
    }
    case actions.UPDATE_TITLE_OF_NOTE_BY_ID:{
        return {
            ...state,
            userData:        state.userData.map(data=> { 
                if(data.id===action.payload.id){
                    data.title=action.payload.updatedTitle
                }
    return data
    
            })
        }
    }

    case actions.UPDATE_DESCRIPTION_OF_NOTE_BY_ID:{
        return{
            ...state,
            userData:state.userData.map(data =>{
                if(action.payload.id===data.id){
                    data.description=action.payload.updatedDescription
                }
                return data
            })
        }
    }
    case actions.UPDATE_ARCHIEVE_STATUS_BY_OF_NOTE_BY_ID:{
        return{
            ...state,
            userData:state.userData.map(data=> {
                if(action.payload.id===data.id){
                    data.isArchived = action.payload.condition
                }
                return data
            })
        }
    }

    default : return state
}
}

export default reducer