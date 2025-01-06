"use client"
import ChairGenerate from "../../components/chairGenerat/ChairGenerate";
import SearchChair from "../../components/SearchChair"
import { useState,useEffect } from "react";
import {useCntxt} from '../../context/context'
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Container from "../../components/Contaner";
const getd=async(qu)=>{
    
    // const res=await fetch(qu,
    // {
    //     headers:{
    //         'Content-Type'  : 'application/json'
    //     },
    //     cache:"no-store"
    // }
    // )
    // return res.json()
    const resl= await fetch(qu,
        {
            headers:{
                'Content-Type'  : 'application/json'
            },
            cache:"no-store"
        }
        ).then(res=> res.json()).catch(error=>{console.log("rror is happig ",error)})
return resl
}


// const Chairs = async({searchParams}) => {
    const Chairs = () => {

//         const[entriesPerPage,setEntriesPerPage]=useState(5)
// const[page,setPage]=useState(1)
const[total,setTotal]=useState(0)
const[wt,setWt]=useState(false)
        const router=useRouter()
        const {user,setUser,loaded,wait,setWait}=useCntxt()
         const[data,setData]=useState([])
         const[connectionError,setConnectionError]=useState(false)
const[searchTerm,setSearchTerm]=useState('')
         useEffect(()=>{
     if(loaded){
       if(!user){// ||!user?.role!='مدير'){
           router.push('/')
             }
             else{
                 setAuth(true)
             }
     }
         },[loaded])
         console.log('add users user is ',user)
         const[auth,setAuth]=useState(false)

        // const[place,setPlace]=useState('')
// const placeId=searchParams.placeId
//    const[data,setData]=useState([])
// let qu='/api/chair'
//     if(placeId){qu=`/api/chair?placeId=${placeId}`}
 

useEffect(()=>{
    const chr=async()=>{
        setWt(true)
        // let term=''
        // if(place.length>0){
        //     term=`?placeId=${place}`
        // }
//         const x=await fetch(`/api/chair${searchTerm}`)
//         .then(res=>{
//             if(res.status=='200'){

// setWt(false)
// setWait(false)
// MdSubdirectoryArrowRight(false)
// return res.json()
//             }
//             else{
//                 toast.error('fuck')
//             }
//         }).catch(error=>{
//     setConnectionError(true)
//     setWt(false)
// setWait(false)

//         })
const x=await fetch(`/api/chair${searchTerm}`)
.then(res=> res.json()
   

   
).catch(error=>{
    // alert('[ppppp')
setConnectionError(true)


})
setWt(false)
setWait(false)
       if(x) {const {chrs:rs,count}=x
        setData(rs)
        // alert(count)
        setTotal(count)
    }
    }

chr()
},[searchTerm])





    // const data=await getd(qu)
  if(connectionError && auth){console.log("noooooooooooooooooo dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
return<div className=" flex w-screen h-screen justify-center items-center">
    <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
     text-red-600 text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
</div>
}  
 return <div>
    <Container>
    {(wait||wt)&&(<div className="flex absolute ">
        <div className=" flex w-screen h-screen bg-black opacity-30 absolute"></div>
        <div className="flex w-[500px] h-[100px] justify-center items-center left-[550px] top-[150px] 
         bg-blue-950 text-white absolute rounded-md shadow-md shadow-white z-10">الرجاء الانتظار , جاري تحميل البيانات</div>
    </div>)}
 {!connectionError&& auth&&(<div className="flex w-screen h-screen  mt-[80px] ">
        <div className="flex flex-col w-[70%] rounded h-[650px]">
       <SearchChair setSearchTerm={setSearchTerm} count={total} />
       <div className="flex mb-[50px] justify-center flex-col items-center border-[1px] mx-[10px] overflow-scroll h-[300px]">
    
    <table  className=" flex flex-col w-full  overflow-scroll" align="rtl">
        <thead className="flex flex-row-reverse justify-evenly w-full py-[10px] bg-blue-950 text-white border-b-[1px] border-white">
            
            
           
            <th className="flex w-[35%] justify-end">المعرف</th>
            <th className="flex-1 justify-end text-right ">الرمز</th>
    
            <th className="flex-1 justify-end text-right">اللون</th>
            <th className="flex-1 justify-end  text-right">مكان الفعالية</th>
            <th className="flex-1 "></th>
            </thead>
            {data&&data.length>0&&data.map(d=>{return(
            <tr key={d.id} className="flex flex-row-reverse h-[35px] text-[20px] border-b-[1px] text-yellow-600 bg-blue-950">
           
           <td className="  text-right w-[35%] text-yellow-600 bg-blue-950">{d.id}</td>
            <td className="  text-right flex-1">{d.title}</td>
            <td td className=" flex    text-right flex-1  justify-end"><div style={{display:"flex",justifyContent:"flex-start", backgroundColor: `${d.category.color}`,color:`${d.category.textColor}` ,width:"20px",height:"20px"}}></div></td>

            <td td className="   text-right flex-1" >{d.placeId}</td>
            <td td className="   text-right flex-1" ></td>
        </tr>
        
            )})}
       
    </table>
    </div>
    </div>
        <div className=" flex">
            <ChairGenerate/>
        </div>

    </div>)}
    </Container>
    </div>
}
 
export default Chairs;