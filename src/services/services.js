import axios from "axios";
const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";
export default class Service {
  signup(firstName, lastName, email, password) {
    return axios({
      method: "POST",
      url: `${baseURL}user/userSignUp`,
      data: {
        firstName,
        lastName,
        email,
        password,
        service: "advance",
      },
    });
  }
  signin(email, password) {
    return axios({
      method: "POST",
    //   url: `${baseURL}user/login`,
     url:" http://fundoonotes.incubation.bridgelabz.com/api/user/login",
      data: {
        email,
        password,
      },
    });
  }
}

// const data=Signup();
// function Print(){
// data.then(data=>{
//     console.log(data)
// }).catch(err =>console.log(err))}

// Print()
