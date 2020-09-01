import axios from "axios";
const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";
export default class Service {
  signup(data) {
    return axios({
      method: "POST",
      url: `${baseURL}user/userSignUp`,
      data:   data
    });
  }
  signin(data) {
    return axios({
      method: "POST",
    //   url: `${baseURL}user/login`,
     url:" http://fundoonotes.incubation.bridgelabz.com/api/user/login",
      data:data,
    });
  }

  resetpassword(accessToken,newPassword){
    return axios({
      method:"POST",
      url:`http://fundoonotes.incubation.bridgelabz.com/api/user/reset-password?access_token=${accessToken}`,
      data:{
        newPassword
      }
    })
  }

  recoverEmailID(email){
    return axios({
      method:"POST",
      url:`http://fundoonotes.incubation.bridgelabz.com/api/user/reset`,
      data:{
        email
      }
    })
  }

  setNewPassWord(url,newPassword){
    console.log(url.split('/')[2] ,"Prinitinh URL")
    return axios({
      method:"POST",
      url:`http://fundoonotes.incubation.bridgelabz.com/api/user/reset-password?access_token=${url.split('/')[2]}`,
      data:{
        newPassword
      }
    })
  }


}

// const data=Signup();
// function Print(){
// data.then(data=>{
//     console.log(data)
// }).catch(err =>console.log(err))}

// Print()
