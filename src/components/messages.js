
import {useState} from 'react'
export default initialVal=>{
    const[value,setValue1]=useState(initialVal);
    const handleChange=(e)=>{
        setValue1(e.target.value)
    }
    const reset=()=>{
       setValue1('') 
    }
    return[value ,handleChange, reset]
}
