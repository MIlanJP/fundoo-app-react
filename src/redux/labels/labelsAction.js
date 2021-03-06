import * as actions from "./labelsType";
import services from "../../services/labelservice";


export const fetchUserReqestslabel = (usersData) => {
  return {
    type: actions.FETCH_USERS_REQUESTS,
  };
};

export const fetchUserFailedlabel = (error) => {
  return {
    type: actions.FETCH_USER_FAILURE,
    payload: error,
  };
};

export const onlyLabelLists=(list)=>{
    return {
        type: actions.ONLY_LABELS_LIST,
        payload: list,
      };
}

export const addLabel = (successMessge) => {
  return {
    type: actions.ADD_LABEL,
    payload: successMessge,
  };
};

export const getUserId = (userId,email,firstName,secondName) => {
    return {
      type: actions.GET_USER_ID,
      payload: {userId,email,firstName,secondName},
    };
  };
export const getLabelLists = (labelLists) => {
  return {
    type: actions.GET_ALL_THE_LABELS,
    payload: labelLists,
  };
};

export const setEmailId = (emailId) => {
    return {
      type: actions.SET_EMAIL_ID,
      payload: emailId,
    };
  };

  export const UpdateLabelonChange = (id,labelName)=>{
      return {
          type:actions.UPDATE_LABEL_ID_INSTATE,
          id:id,
          labelName:labelName
      }
  }


// API ACTIONS





export const fetchLabelList = () => {
  return (dispatch) => {
    let list1 = [];
    let list2 = [];
    const startTabs = ["Notes", "Reminder"];
    const endTabs = ["Edit Labels", "Archive", "Bin"];
    const lists = [];
    dispatch(fetchUserReqestslabel);
    services
      .getLabelLists()
      .then((response) => {
        response.data.data.details.map((label) => {
          if (label.isDeleted === false) {
            list1.push(label.label);
            list2.push(label);
          }
        });
        
        lists.push(...startTabs, ...list1, ...endTabs);
        localStorage.setItem('labels',JSON.stringify(list1))
        dispatch(onlyLabelLists(list2))
        dispatch(getLabelLists(lists));
      })
      .catch((error) => {
       
        const startTabs = ["Notes", "Reminder"];
        const endTabs = ["Edit Labels", "Archive", "Bin"];
        const errorMessage = error;
        const lists = [];
        lists.push(...startTabs, ...list1, ...endTabs);
        // dispatch(getLabelLists(lists));
        dispatch(fetchUserFailedlabel(errorMessage));
      });
  };
};

export const fetchUserIdByEmail=(emailId)=>{
    return (dispatch)=>{
        services.getUserID().then(data=>{
            let userID=''
            const userId=data.data.filter(data=>{ if(data.email===emailId){
                userID=data.id
                console.log(data.id)
                dispatch(getUserId(data.id,data.email,data.firstName,data.lastName))
                return data.id
            }})
            
        }).catch(error=>{
            dispatch(fetchUserFailedlabel(error.errorMessage));
        })
    }

}