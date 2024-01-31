"use client"
import { useState,useEffect } from "react";
import { useRouter } from "next/dist/client/components/navigation";
const SerchChair = ({setSearchTerm,count}) => {

    const[places,setPlaces]=useState([])
    const[entriesPerPage,setEntriesPerPage]=useState(5)
    const[page,setPage]=useState(1)
    const[total,setTotal]=useState(10)
    const[title,setTitle]=useState('')
    const[place,setPlace]=useState('')
    const router=useRouter()


    const search=()=>{
        let terms=[]
        let ter=""
        if(place.length>0){terms.push(`placeId=${place}`)}
        if(title.length>0){terms.push(`title=${title}`)}
       
       
        if(Number(page)>0){ 
            //
            // alert('pagggge')
        terms.push(`page=${page}`)}
        // alert('search')
        if(Number(entriesPerPage)>0){terms.push(`entriesPerPage=${entriesPerPage}`)}
       
        if(terms.length>0){
            for(var i=0;i<terms.length-1;i++){
                 ter=ter+terms[i]+"&"
            }
            ter="?"+ter+terms[terms.length-1]
          
        }
        setSearchTerm(ter)
    }

    useEffect(()=>{
        const pls=async()=>{
            const plss=await fetch('/api/place').then(res=>res.json())
            if(plss){setPlaces(plss)}
        }
        pls()
    },[])
    return   <div className="flex flex-col ">
    <div className="flex my-[50px] justify-evenly border-b-[1px]  bg-blue-950 mx-[20px]">
   
    
        <div className="flex flex-row h-[100px] items-end border-[1px] mt-[50px]">
           
            <input type="text" 
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            className="m-[10px]" />
            <label htmlFor="" className="flex justify-end items-center mb-[5px] h-[30px] text-right rounded-sm mr-[40px]  text-white ">ابحث عن</label>
        </div>
        
    <div className="flex flex-col border-[1px] h-[150px] justify-evenly items-end px-[20px] my-[10px] ">
        <label className=" flex  mr-[30px]  text-white text-[25px]">مكان الفعالية</label>
        <select value={place}
         className="flex w-[180px] bg-blue-950 h-[30px] text-white text-right rounded-sm mr-[40px] border-[1px]"
        onChange={(e)=>{
            // router.push(`?placeId=${e.target.value}`)
        setPlace(e.target.value)
        }}
        > 
        <option value="" >اختر مكان</option>
             {places && places.length>0&& places.map(cat=> {
                return(<option key={cat.id} value={cat.name} >{cat.name}</option>)
                })}
        </select>
        <div className="flex">
        <label htmlFor="" className="flex justify-end items-end w-[40px] h-[30px] text-right rounded-sm  text-[20px] text-white ">سجلات</label>
            <input  type="number" value={entriesPerPage}
            onChange={(e)=>setEntriesPerPage(e.target.value)}
            min={2} className="flex w-[50px] bg-blue-950 h-[30px] text-white text-right rounded-sm mx-[10px]"/>
      
            <label htmlFor="" className="flex justify-end items-end w-[40px] h-[30px] text-right rounded-sm mr-[40px]  text-white ">اعرض</label>
        </div>
        <div className=" flex justify-between w-[90%] mx-auto">
            <button className=" flex border-[1px] text-white justify-center items-center px-[20px] py-[5px] rounded-md "
             onClick={()=>{
                if(entriesPerPage*(page)<count)
                setPage(prev=>prev+1)
            }}
            >التالي</button>
            <label className="flex w-[50px] text-white justify-center items-center">{page}</label>
            <button className=" flex border-[1px] text-white justify-center items-center px-[15px] py-[5px] rounded-md mr-[25px]"
            onClick={()=>{
                if(page-1>0)
                setPage(prev=>prev-1)
            }}
          >السابق</button>
        </div>
    </div>
   
    </div>
    <div className="flex w-full justify-end">
        <button 
        onClick={()=>{search()}}
        className="flex mr-[40px] w-[80px] py-[5px] justify-center items-center bg-orange-600 text-white rounded-md mb-[10px] shadow-black shadow-md ">ابحث</button>
    </div>
    </div>
        
}
 
export default SerchChair;