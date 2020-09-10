import { ApiCall } from "./apicall";

const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";

class LabelService {
  getAllLists() {
    const token = localStorage.getItem("token");
    return ApiCall(
      "",
      `${baseURL}notes/getNotesList?access_token=${token}`,
      "GET"
    );
  }
  getLabelLists() {
    const token = localStorage.getItem("token");
    return ApiCall(
      "",
      `${baseURL}noteLabels/getNoteLabelList?access_token=${token}`,
      "GET"
    );
  }

  getUserID(data) {
    const token = localStorage.getItem("token");
    return ApiCall(data, `${baseURL}user?access_token=${token}`, "GET");
  }

  addLabel(data) {
    const token = localStorage.getItem("token");
    return ApiCall(data, `${baseURL}noteLabels?access_token=${token}`, "POST");
  }

  updateLabel(id, data) {
    const token = localStorage.getItem("token");
    return ApiCall(
      data,
      `${baseURL}noteLabels/${id}/updateNoteLabel?access_token=${token}`,
      "POST"
    );
  }

  deleteLabel(id) {
    const token = localStorage.getItem("token");
    return ApiCall(
      "",
      `${baseURL}noteLabels/${id}/deleteNoteLabel?access_token=${token}`,
      "DELETE"
    );
  }

  updateIsPined(data){
    const token = localStorage.getItem("token");
    return ApiCall(
      data,
      `${baseURL}notes/pinUnpinNotes?access_token=${token}`,
      "POST"
    );
  }

  addNote(data){
    const token = localStorage.getItem("token");
    return ApiCall(
      data,
      `${baseURL}notes/addNotes?access_token=${token}`,
      "POST"
    );
  }
  updateNote(data){
    const token = localStorage.getItem("token");
    return ApiCall(
      data,
      `${baseURL}notes/updateNotes?access_token=${token}`,
      "POST"
    );
  }
  

  addUpdateReminderNotes(data){
    const token = localStorage.getItem("token");
    return ApiCall(
      data,
      `${baseURL}notes/addUpdateReminderNotes?access_token=${token}`,
      "POST"
    );
  }

  removeReminderNotes(data){
    const token = localStorage.getItem("token");
    return ApiCall(
      data,
      `${baseURL}notes/removeReminderNotes?access_token=${token}`,
      "POST"
    );
  }

}

export default new LabelService();
