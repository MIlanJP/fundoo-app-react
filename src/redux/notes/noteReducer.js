import * as actions from './noteType'
import userData from './userStaticdata.json'
import _ from 'lodash'
const initialState={
    loading:false,
    displayListFeature:false,
    descriptionCheckBoxList:[{itemName:"",status:'open'}],
    userData:[],
    pinnedNotes:[],
    unPinnedNotes:userData.data.data.filter(pinned=> pinned.isPined===false),
    notesViewOnClick:{},
    collaboratorDisplay:false,
    collaboratorData:{},
    searchCollaborator:false
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
        // const notes=[]
        
           
        return{
            ...state,
            userData:state.userData.map(data=> { 
                if(data.id===action.payload.id){
                    data.isPined=action.payload.condition
                }
                return data
            }
                ),
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
    case actions.UPDATE_REMINDER_BY_USER_ID:{
        const reminder=[action.payload.reminderTime]

        return{
            ...state,
            userData:state.userData.map(data=>{
                if(data.id===action.payload.id){
                    data.reminder=reminder
                }
                return data
            })
        }
    }

    case actions.REMOVE_REMINDER_BY_USER_ID:{
        return{
            ...state,
            userData:state.userData.map(data=>{
                if(data.id===action.payload){
                    data.reminder=[]
                }
                return data
            })
        }
    }

    case actions.DISPLAY_COLLABORATOR_POPUP:{
        return{
            ...state,
            collaboratorDisplay:action.payload.condition,
            collaboratorData:  state.userData.filter(data=>data.id===action.payload.id)
        }
    }
    case actions.TOGGLE_SEARCH_FOR_COLLABORATOR_SEARCH:{
        return{
            ...state,
            searchCollaborator:action.payload
        }
    }

    case actions.REMOVE_LABEL_FROM_NOTE:{
        return{
            ...state,
            userData:state.userData.map(data=> {
                if(data.id===action.payload.id){
                   data.noteLabels= data.noteLabels.filter(label=>label.label!==action.payload.labelName)
                }
            return data}
            )
        }
    }
    case actions.UPDATE_BGCOLOR_OF_NOTE_BY_ID:{
        return {
            ...state,
            userData:state.userData.map(data=> {
                if(data.id===action.payload.id){
                    data.color=action.payload.color
                }
                return data
            })
        }
    }


    case actions.ADD_LABEL_TO_NOTE:{
        return{
            ...state,
            userData:state.userData.map(data=>{
                if(data.id===action.payload.id){
                    let datalists=[]
                    if(!_.some(datalists,{id:action.payload.labelDetails.id}) ){
                        datalists.push(...data.noteLabels,action.payload.labelDetails)
                        console.log(datalists)
                        data.noteLabels=datalists
                    }
 
                }
                return data
            })
        }
    }
    case actions.UPDATE_DELETE_STATUS_BY_OF_NOTE_BY_ID:{
        return {
            ...state,
            userData:state.userData.map(data=> {
                if(data.id===action.payload.id){
                    data.isDeleted=action.payload.condition
                }
                return data
            })
        }
    }
    case actions.DELETE_NOTE_FOREVER:{
        return{
            ...state,
            userData:state.userData.filter(data=>data.id!==action.payload)
        }
    }

    default : return state
}
}

export default reducer