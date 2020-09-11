import * as actions from './noteType'
import service from '../../services/labelservice'
import {fetchLabelList} from '../labels/labelsAction'
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
export const fetchUserFailed = (error) => {
    return {
      type: actions.FETCH_USER_FAILURE,
      payload: error,
    };
  };
export const setDescriptList=(list)=>{
    return{
        type:actions.SET_DESCRIPTION_LIST,
        payload:list
    }
}

export const setPinnedStatus=(condition,id)=>{
    return{
        type:actions.UPDATE_PINNED_STATUS_OF_NOTE,
        payload:{condition,id},
       
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
export const getAllLabels = (userData) => {
    return {
      type: actions.GET_ALL_NOTES,
      payload: userData,
    };
  };
  export const fetchUserReqests = (usersData) => {
    return {
      type: actions.FETCH_USERS_REQUESTS,
    };
  };

  export const collaboratorsPopUp=(condition,id)=>{
      return{
        type: actions.DISPLAY_COLLABORATOR_POPUP,
        payload: {condition,id}
      }
  }

  export const updateReminderById=(reminderTime,id)=>{
    return{
      type:actions.UPDATE_REMINDER_BY_USER_ID,
      payload:{reminderTime,id}
    }
  } 
   export const removeReminderById=(id)=>{
    return{
      type:actions.REMOVE_REMINDER_BY_USER_ID,
      payload:id
    }
  }

  export const getCollabDataById=(id)=>{
return{
  type:actions.GET_COLLAB_DATA_BY_ID,
  payload:id
}
  }
  export const toggleCollaboratorSearch=(condition)=>{
    return{
      type:actions.TOGGLE_SEARCH_FOR_COLLABORATOR_SEARCH,
      payload:condition
    }
  }

export const fetchAllUserData = () => {
    return (dispatch) => {
      dispatch(fetchUserReqests);
      service
        .getAllLists()
        .then((response) => {
          const listofLabels = response.data.data.data;
          dispatch(getAllLabels(listofLabels));
          dispatch(fetchLabelList());
        })
        .catch((error) => {
          const errorMessage = error;
          dispatch(fetchUserFailed(errorMessage));
        });
    };
  };