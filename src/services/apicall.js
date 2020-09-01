import axios from 'axios'

export   const  ApiCall=(data,url,method)=>{
    axios({
     method,
     url,
     data
   }).then(data=>{
     return data;}
     ).catch(err=>{
       return err
     });
 }