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