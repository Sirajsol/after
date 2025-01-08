"use client"
import React from 'react'
import { useCntxt } from '../context/context'
function Load() {
    const {wait}=useCntxt()
       return (<div>{(<div className="flex justify-center items-center absolute top-[30%] bg-blue-900 w-[60%] left-[20%] md:w-[400px] h-[80px]  text-white
       text-[20px] sm:text-[30px] px-[40px] shadow-black shadow-md rounded z-10" >الرجاء الإنتظار</div>)}</div>)
   
}

export default Load
