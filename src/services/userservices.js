import { ApiCall } from "./apicall";

const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";

class UserService {
  signUp(data) {
    return ApiCall(data, `${baseURL}user/userSignUp`, "POST");
  }
  signIn(data) {
    return ApiCall(data, `${baseURL}user/login`, "POST");
  }

  resetPassword(accessToken, newPassword) {
    return ApiCall(
      newPassword,
      `${baseURL}user/reset-password?access_token=${accessToken}`,
      "POST"
    );
  }

  recoverEmailID(email) {
    const data = { email };
    return ApiCall(data, `${baseURL}user/reset`, "POST");
  }

  setNewPassWord(url, newPassword) {
    const data = { newPassword };
    return ApiCall(
      data,
      `${baseURL}user/reset-password?access_token=${url.split("/")[2]}`,
      "POST"
    );
  }
}

export default new UserService();
