"use client"
import React from 'react'

function Load() {
    const {wait}=useCntxt()
       return (<div>{wait&&(<div className="flex justify-center items-center absolute top-[150px] bg-blue-900 w-[400px] h-[80px] left-[500px] text-white
    text-[30px] px-[40px] shadow-black shadow-md rounded">الرجاء الإنتظار</div>)}</div>)
   
}

export default Load
