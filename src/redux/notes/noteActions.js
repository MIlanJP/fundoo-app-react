import * as actions from './noteType'

export const showListFeature=()=>{
    return{
        type:actions.LIST_FEATURE_ON,
        payload:true
    }
}

export const hideListFeature=()=>{
    return{
        type:actions.LIST_FEATURE_OFF,
        payload:false
    }
}
export const setDescriptList=(list)=>{
    return{
        type:actions.SET_DESCRIPTION_LIST,
        payload:list
    }
}

export const setPinnedStatus=(condition,id)=>{
    return{
        type:actions.UPDATE_PINNED_STATUS_OF_NOTE,
        payload:condition,
        id:id
    }
}

export const notesViewOnClick=(condition,data)=>{
    return{
        type:actions.HIDE_ALL_NOTE_SECTION,
        payload:{condition,data},
    }
}

export const updateTitleFromId=(updatedTitle,id)=>{
return {
    type:actions.UPDATE_TITLE_OF_NOTE_BY_ID,
    payload:{updatedTitle,id}
}
}
export const updateDescriptionById = (updatedDescription,id)=>{
    return{
        type:actions.UPDATE_DESCRIPTION_OF_NOTE_BY_ID,
        payload:{updatedDescription,id}
    }
}

export const updateArchievedStatusById=(id,condition)=>{
    return{
        type:actions.UPDATE_ARCHIEVE_STATUS_BY_OF_NOTE_BY_ID,
        payload:{id,condition}
    }
}

