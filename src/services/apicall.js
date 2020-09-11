import axios from 'axios'

export   const  ApiCall=(data,url,method,headerConfig)=>{
  return new Promise((resolve, reject) => {
    axios({ method, url, data,
        headers: {
          'Content-Type': headerConfig
        }
      
    },
     
      )
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
 }