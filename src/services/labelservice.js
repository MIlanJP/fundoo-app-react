import { ApiCall } from "./apicall";

const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";



 class LabelService {

  getAllLists() {
    const token=localStorage.getItem("token");
    return ApiCall('',`${baseURL}notes/getNotesList?access_token=${token}`,'GET')
  }
  getLabelLists() {
    const token=localStorage.getItem("token");
    return ApiCall('',`${baseURL}noteLabels/getNoteLabelList?access_token=${token}`,'GET')
  }
 
  addLabel(){
      
  }

}

export default new LabelService();