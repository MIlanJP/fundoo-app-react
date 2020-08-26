import React,{useState} from 'react'

export default function Header() {
    const [heading]=useState('fundooNotes')
    return (
        <div className='header'>
           <h1 className='main-heading'>{heading}</h1>
        </div>
    )
}
