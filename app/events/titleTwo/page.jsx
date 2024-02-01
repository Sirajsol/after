"use client"
import { useState ,useEffect } from "react"
import TitleTw from "../../components/titletwo/TitleTwo"
import { toast } from "react-hot-toast";
import TitleTEdit from "../../components/TitleTwoEdit"
import { TiDelete } from "react-icons/ti";
import { MdModeEditOutline } from "react-icons/md";
import { useRouter } from "next/navigation"
import {useCntxt} from '../../context/context'
import Container from "../../components/Contaner";

const TitleTwo = () => {

    const router=useRouter()
    const {user,setUser,loaded}=useCntxt()
     const[auth,setAuth]=useState(false)
   
     useEffect(()=>{
 if(loaded){
   if(!user ||!user?.name){
       router.push('/')
         }
         else{
             setAuth(true)
         }
 }
     },[loaded])

    const[show,setShow]=useState(false)
    const[eShow,setEShow]=useState(false)
    const[onButton,setOnButton]=useState(false)
   const[showDelete,setShowDelete]=useState(false)
   const[selectedId,setSelectedId]=useState('')
   const [deleting,setDeleting]=useState(false)
   const[wt,setWt]=useState(false)
const[mutate,setMutate]=useState(false)
const[titles,setTitles]=useState([])
const[selectedTitle,setSelectedTitle]=useState(null)
const[connectionError,setConnectionError]=useState(false)





    // useEffect(()=>{
    //     const pls=async()=>{
    //         setWt(true)
           
    //         const {events:ps,count}=await fetch(`/api/titlerwo`).then(res=>res.json())
    //         .catch((error)=>{
    //             setConnectionError(true)
    //             toast.error("خطأ")})
    //         if(ps){setTitles(ps)
    //         // setMCount(count)
    //         }
    //         if(ps&& ps.length==0){ setEmptyResult(true)}
    //         setWt(false)
    //         setMutate(false)
    //         // setChairId('')
    //     }
    //     pls()
    //     },[mutate])


        useEffect(()=>{
            const pls=async()=>{
               setWt(true)
                // console.log("search term is ",searchTerm)
                // setEmptyResult(false)
                const ps=await fetch(`/api/titletwo`).then((res)=>{
                    // alert('fuck you'+res.status)
                 return   res.json()
                // if(res)
                    // if(res.status=='200'){
                    //      toast.success('hi')
                    //     return  res.json()
                    // }
                    // else{
                    //     toast.error('fuck')
                       
                    //      }
                }
               
                
                ).catch((error)=>{
                    // toast.error("خطأ")
                    console.log("error isssssssssssssssssssssssssssss ",error)
                    setConnectionError(true)
                   })
                 
                if(ps){setTitles(ps)
             console.log('ps is ',ps)
                }
                if(ps&& ps.length==0){ 
                    // setEmptyResult(true)
                }
                setWt(false)
                setMutate(false)
                // setChairId('')
            }
            pls()
            },[mutate])


const deleteit=async()=>{

    setDeleting(true)
    const t=await fetch(`/api/titletwo/${selectedId}`,{
        method:'DELETE'
    }

    ).then(res=>{
        if(res.status=='200'){
            toast.success('تم حذف اللقب')
            setShowDelete(false)
        }
        else{
            toast.error('لم يتم الحذف')
        }
        setDeleting(false)
    })
}
// if(connectionError && auth){console.log("noooooooooooooooooo dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
// return<div className=" flex w-screen h-screen justify-center items-center">
//     <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
//      text-red-600 text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
// </div>
// } 
    return <div>
        <Container>
        {connectionError && auth&&(
<div className=" flex w-screen h-screen justify-center items-center">
    <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
     text-red-600 text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
</div>
        )} 
        {wt&&(<div className="flex justify-center items-center absolute top-[150px] bg-blue-900 w-[400px] h-[80px] left-[500px] text-white
      text-[30px] px-[40px] shadow-black shadow-md rounded">الرجاء الإنتظار</div>)}
         {!connectionError &&auth&& titles&&titles.length>0&&( <div className='flex  w-screen h-screen flex-col  items-end relative mb-[70px]  '

    >
        <label htmlFor="" className='flex mr-[50px] text-blue-800 font-[900] text-[25px]'>لوحة التحكم / اللقب 2</label>
        <div className='flex h-[30px]'></div>
        <button className='flex bg-orange-600 w-[80px] py-[5px] items-center justify-center rounded-md
         shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400 text-white font-[700] text-[20px] mr-[50px]'
        onClick={()=>{setShow(true)}}
        onMouseEnter={()=>{setOnButton(true)}}
        onMouseLeave={()=>{setOnButton(false)}}
        >إضافة</button>
        <div className='flex w-full justify-between  border-b-[1px] border-yellow-500 mt-[20px] py-[20px] ' >

        <div className='flex ml-[70px] py-[10px]  shadow-black shadow-md px-[20px]'>
                <input className='bg-blue-950 text-white rounded-md border-b-[1px] text-right px-[5px] h-[30px] border-yellow-300'/>
                <label htmlFor="" className='flex font-[700] text-[25px] ml-[50px]'>search</label>
            </div>

            <div className='flex justify-start mr-[50px] py-[10px] shadow-black shadow-md px-[20px]'>
                <label htmlFor="" className='flex font-[700] text-[25px] mr-[50px]'>entries</label>
                <input  min={1} type='number' className='bg-blue-950 w-[90px] text-white rounded-md border-b-[1px] px-[10px] text-[25px] mt-[5px] text-right  h-[30px] border-yellow-300'/>
                <label className='flex font-[700] text-[25px] ml-[50px]'>show</label>
            </div>
            
        </div>
        {deleting&&(<div className=" flex w-[400px] h-[80px] absolute z-20 left-[550px] top-[100px] bg-blue-950  shadow-black shadow-sm rounded-md text-white justify-center items-center
">...جاري الحذف</div>)}
        {!deleting&& showDelete&&(<div className="flex justify-center flex-col absolute left-[600px] rounded-md p-[30px] top-[200px]  bg-blue-950 ">
  <div className=" flex text-white text-[25px] mb-[30px] justify-center items-center">هل أنت متأكد انك تريد الحذف؟</div>
  <div className="flex justify-between items-center">
      <button className="flex w-[70px] bg-red-700 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
      onClick={()=>{
          setShowDelete(false)
          deleteit()}}
      >نعم</button>
      <button className="flex w-[70px] bg-green-600 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
      onClick={()=>{setShowDelete(false)}}
      >لا</button>
  </div>
</div>)}
      {show&&(<div className="absolute top-[0px]"><TitleTw setShow={setShow}/></div> )} 
      {eShow&&(<div className="absolute top-[0px]"><TitleTEdit setEShow={setEShow} tit={selectedTitle} setMutate={setMutate}/></div> )} 

      <table  className=" flex     flex-col  w-full border-[1px] border-black overflow-scroll h-[500px] justify-start" align="ltr">
        <thead className="flex justify-evenly  h-[40px] bg-blue-950 text-white  ">
    
   
   
    <th className="border-[1px]  flex-1"></th>
    <th className="border-[1px]  flex-1">اللغة </th>
    <th className="border-[1px]  flex-1">اللقب </th>

    <th className="border-[1px]  flex-1">المعرف</th>
    </thead>
    {titles&& titles.length>0&&titles.map(t=>{
        return<tr key={t.id}>
         <div className=" flex w-full justify-between flex-row-reverse h-[40px] border-b-[1px]">
            <div className="flex w-full justify-end items-end bg-blue-950 text-white">{t.id}</div>
            <div className="flex w-full justify-end items-end bg-blue-950 text-white">{t.title}</div>
            <div className="flex w-full justify-end items-end bg-blue-950 text-white">{t.lang}</div>
            <div className=" flex w-full justify-evenly items-end border-[1px] bg-blue-950">
            <div className=" flex border-[1px] cursor-pointer"> <MdModeEditOutline size={20} color="white"
               onClick={()=>{setSelectedTitle(t)
            setEShow(true)
            }}
               /></div> 
               <div className=" flex border-[1px] cursor-pointer"> <TiDelete size={20} color="white"
               onClick={()=>{setSelectedId(t.id)
            setShowDelete(true)
            }}
               /></div>
            </div>
        </div>
        </tr>
    })}
    </table>
    </div>)} 
    </Container>
    </div>
}
export default TitleTwo;