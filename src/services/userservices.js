import axios from "axios";
import { ApiCall } from "./apicall";
const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";

const apicall = (data, url, method) => {
  return new Promise((resolve, reject) => {
    axios({ method, url, data })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log({err});
        reject(err);
      });
  });
};

 class Service {
  signUp(data) {
    return apicall(data, `${baseURL}user/userSignUp`, "POST");
  }
  signIn(data) {
    return apicall(data, `${baseURL}user/login`, "POST");
  }

  resetPassword(accessToken, newPassword) {
    return apicall(
      newPassword,
      `${baseURL}user/reset-password?access_token=${accessToken}`,
      "POST"
    );
  }

  recoverEmailID(email) {
    const data={email}
    return apicall(data, `${baseURL}user/reset`, "POST");
  }

  setNewPassWord(url, newPassword) {
    const data={newPassword}
    return apicall(
      data,
      `${baseURL}user/reset-password?access_token=${url.split("/")[2]}`,
      "POST"
    );
  }
}

export default new Service();