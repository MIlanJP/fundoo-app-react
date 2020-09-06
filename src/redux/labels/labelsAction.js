import * as actions from './labelsType'
import services from '../../services/userservices'
export const  getLabelsList=(labelData)=>{
    return {
        type:actions.GET_ALL_LABELS,
        payload:labelData

    }
}

export const fetchUserReqests=(usersData)=>{
return{
    type:actions.FETCH_USERS_REQUESTS,
}
}

export const fetchUserFailed=(error)=>{
    return{
        type:actions.FETCH_USER_FAILURE,
        payload:error
    }
}

export const fetchAllUserData=()=>{
return (dispatch)=>{
    dispatch(fetchUserReqests)
services.getAllLists().then((response)=>{
const listofLabels=response.data.data.data
dispatch(getLabelsList(listofLabels))
}).catch((error=>{
    const errorMessage=error;
dispatch(fetchUserFailed(errorMessage))
}))
    
}
}
