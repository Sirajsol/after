"use client"
import Link from "next/link";
import { useState ,useEffect } from "react";
import {useCntxt} from '../../context/context'
const NavBar = ({children}) => {

    const[visible,setVisible]=useState(false)
    const {user,setUser,loaded}=useCntxt()
     const[auth,setAuth]=useState(false)
   
     useEffect(()=>{
 if(loaded){
   if(!user ||!user?.name){
      setVisible(false)
         }
         else{
             setVisible(true)
         }
 }
     },[loaded,user])

    const[oncontrol,setOnControl]=useState(false)
    const[onevent,setOnEvent]=useState(false)
    return <div>
  {visible &&(  <div className="flex w-full justify-end h-[50px] bg-blue-100 py-[30px] items-center  ">
        
        
        <div className="flex flex-col relative ml-[50px] cursor-pointer font-[800] text-[25px] text-blue-950 pb-[10px] mr-[150px]"
         onMouseEnter={()=>{setOnControl(true)}} onMouseLeave={()=>{setOnControl(false)}}>التحكم
        {oncontrol &&( <div className="bg-yellow-600 w-[140px] h-[2px] absolute left-[-25px] top-[35px]"></div>)}

        {oncontrol &&(<div className="flex flex-col absolute   bg-gray-900  w-[200px] h-[300px] mt-[40px] ml-[-20px] justify-between rounded shadow-black shadow-md z-20">
            <div onClick={()=>{setOnControl(false)}} className="flex h-[50px]  mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950 cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600">ارسال دعوة</div>
            <div  onClick={()=>{setOnControl(false)}} className="flex  h-[50px]  mx-[5px] bg-gray-900 text-white text-center justify-center hover:bg-blue-950 cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600"  ><Link href="/events/invitations">الدعوات  العامة </Link></div>
            <div  onClick={()=>{setOnControl(false)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/titleOne">الألقاب1</Link></div>
            <div  onClick={()=>{setOnControl(false)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/titleTwo">الألقاب2</Link></div>
            <div  onClick={()=>{setOnControl(false)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/personCat">الفئات</Link></div>
           {(user.role=='مدير')&&(<div  onClick={()=>{setOnControl(false)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/add-users">إضافة مستخدمين</Link></div>)} 

        </div>)}
        </div>
        <div div className="flex flex-col relative ml-[50px] cursor-pointer font-[800] text-[25px] text-blue-950 pb-[10px] mr-[150px] "
         onMouseEnter={()=>{setOnEvent(true)}} onMouseLeave={()=>{setOnEvent(false)}}>الفعاليات
        {onevent &&( <div className="bg-yellow-600 w-[140px] h-[2px] absolute left-[-25px] top-[35px]"></div>)}
        {onevent &&(<div className="flex flex-col absolute   bg-gray-900  w-[200px] h-[300px] mt-[40px] ml-[-20px] justify-between rounded shadow-black shadow-md z-20">
            <div onClick={()=>{setOnEvent(false)}} className="flex h-[50px]  mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950 cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events">الفعاليات</Link></div>
            <div onClick={()=>{setOnEvent(false)}} className="flex  h-[50px]  mx-[5px] bg-gray-900 text-white text-center justify-center hover:bg-blue-950 cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/places">أماكن الفعاليات</Link></div>
            <div onClick={()=>{setOnEvent(false)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600"> <Link href="/events/chair-categories">فئات الكراسي </Link></div>
            <div onClick={()=>{setOnEvent(false)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/chairs">الكراسي</Link></div>
            <div onClick={()=>{setOnEvent(false)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[25px] hover:border-b-[1px] border-yellow-600">جميع الدعوات</div>

        </div>)}
        </div>
        
       
    </div>
    )}
    {children}
    </div>
}
 
export default NavBar;
