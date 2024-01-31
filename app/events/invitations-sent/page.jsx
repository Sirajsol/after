"use client"
import { useState ,useEffect} from "react"
import InvitForm from "../../components/InviteFotm/InvitForn"
import EditInvetation from '../../components/EditInvitation/EditInvetation'
import EditInternalInvetation from '../../components/editInternalInvetation/EditInternalInvetation'
import InvitationSentRow from '../../components/InvitationSentRow'
import {useCntxt} from '../../context/context'

import { useRouter } from "next/navigation"
// import Container from "../../components/Contaner"
import  Container from '@/app/components/Contaner'
import {toast} from 'react-hot-toast'
const Invitations = () => {
const[wt,setWt]=useState(false)


const[entriesPerPage,setEntriesPerPage]=useState(5)
const[page,setPage]=useState(1)
const[total,setTotal]=useState(10)

// import {useCntxt} from '../../context/context'
const router=useRouter()
const {user,setUser,loaded}=useCntxt()
 const[auth,setAuth]=useState(false)
const[connectionError,setConnectionError]=useState(false)
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
    const[eshow,setEShow]=useState(false)
    const[iEShow,setIEShow]=useState(false)
    const[onButton,setOnButton]=useState(false)
    const [wait,setWait]=useState(false)
    const[mutate,setMutate]=useState(false)
    const[expand,setExpand]=useState(false)
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[whatsapp,setWhatsapp]=useState('')
    const[confirmed,setConfirmed]=useState('')
    const[searchTerm,setSearchTerm]=useState('')
    const[invitations,setInvetations]=useState([])
    const[invId,setInvId]=useState('')
    

    const[itype,setIType]=useState('')


    const reset=()=>{
       
        setName('')
       
       
        setEmail('')
        setWhatsapp('')
        setIType('')
        setSearchTerm('')
    }

    useEffect(()=>{
        setWt(true)
        const pls=async()=>{
            const {inv:ps,count}=await fetch(`/api/invetation${searchTerm}`).then(res=>{
                if(!res.ok) {throw Error("no connection")}
              return  res.json()
           })
            .catch((error)=>{
                setConnectionError(true)
                toast.error("خطأ")})
            setWt(false)
            if(ps){setInvetations(ps)
            setTotal(count)
            }
           
        }
        pls()
    },[searchTerm,mutate])


    useEffect(()=>{
        search()
    },[page])

    const search=()=>{
        let terms=[]
        let ter=""
        if(name.length>0){terms.push(`name=${name}`)}
        if(email.length>0){terms.push(`email=${email}`)}
        if(whatsapp.length>0){terms.push(`whatsapp=${whatsapp}`)}
        if(confirmed.length>0){terms.push(`affirm=${confirmed}`)}

        if(Number(page)>0){ 
            //
            // alert('pagggge')
        terms.push(`page=${page}`)}
        // alert('search')
        if(Number(entriesPerPage)>0){terms.push(`entriesPerPage=${entriesPerPage}`)}


        // if(name.length>0){terms.push(`name=${name}`)}
        // if(name.length>0){terms.push(`name=${name}`)}
        if(terms.length>0){
            for(var i=0;i<terms.length-1;i++){
                 ter=ter+terms[i]+"&"
            }
            ter="?"+ter+terms[terms.length-1]
          
        }
        setSearchTerm(ter)
    }



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
           {!connectionError &&auth&& invitations&&invitations.length>0&&(  <div className='flex flex-col h-screen w-screen items-end relative mb-[70px]  '
    // onClick={()=>{if(!onButton)setShow(false)}}
    >
        <label htmlFor="" className='flex  text-blue-800 font-[900] text-[25px] mr-[100px]'>لوحة التحكم / الدعوات العامة</label>
        <div className='flex h-[30px]'></div>
        <button className='flex bg-orange-600 w-[80px] py-[5px] items-center justify-center rounded-md
         shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400 text-white font-[700] text-[20px] mr-[100px]'
        onClick={()=>{setShow((prev=>{return !prev}))}}
        onMouseEnter={()=>{setOnButton(true)}}
        onMouseLeave={()=>{setOnButton(false)}}
       
       >إضافة</button>
<div className="flex w-full h-[3px] bg-yellow-500 mt-[10px]"></div>
{invId.length>0 && eshow&&(<EditInvetation id={invId} setShow={setEShow}  setMutate={setMutate}  inv={invitations.filter(invi=>invi.id==invId)[0]}/>)}
{invId.length>0 && iEShow&&(<EditInternalInvetation id={invId} setShow={setIEShow}  setMutate={setMutate} inv={invitations.filter(invi=>invi.id==invId)[0]}/>)}
 
 


       <div className='flex flex-col w-full justify-between  border-b-[1px] border-yellow-500 mt-[20px] py-[20px] ' >

<div className="flex  justify-evenly">
    
    <div className="flex w-[50%] justify-end mr-[90px]  cursor-pointer hover:text-yellow-400"
    onClick={()=>{reset()}}
    >تفريغ حقول التصفية</div>
    <label className="flex w-[50%] justify-end mr-[100px]" htmlFor="">بحث</label>
</div>
    <div className="flex justify-between mt-[30px]">
<div className="flex flex-col ml-[100px]">
<label className=" text-right">تأكيد الحضور</label>
<select 
value={confirmed} onChange={(e)=>{setConfirmed(e.target.value)}}
className="flex border-[1px] w-[180px] text-right">
<option value="">اختر حالة</option>
<option value="نعم">نعم</option>
<option value="لا">لا</option>
</select>

</div>
<div className="flex flex-col">
<label className=" text-right">رقم الواتس</label>
<input 
value={whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}
className="flex border-[1px] text-right"/>

</div>
<div className="flex flex-col">
<label className=" text-right">البريد الالكتروني</label>
<input 
value={email} onChange={(e)=>{setEmail(e.target.value)}}
className="flex border-[1px] text-right"/>

</div>
<div className="flex flex-col mr-[100px]">
<label className=" text-right">الاسم</label>
<input className="flex border-[1px] text-right"/>

</div>
    </div>



    <div className="flex justify-between w-full flex-row-reverse">
<div className="flex justify-end mt-[20px] w-[30%]">
<button className="flex w-[70px] py-[5px] bg-orange-700
 text-white font-[700] mr-[100px] justify-center rounded
 shadow-black shadow-md
 "
 
 onClick={()=>{search()

}}
 >اذهب</button>

</div>

<div className=" flex justify-between w-[60%]">
<div className=" flex justify-between items-end flex-row-reverse ml-[60px]">
    <label>عرض</label>
    <input
    className="flex w-[60px] mx-[10px] justify-center h-[30px] items-center outline-none border-b-[1px] border-yellow-500 text-center"
    type="number" value={entriesPerPage} onChange={(e)=>{setEntriesPerPage(e.target.value)}}></input>
    <label>سجلات</label>
</div>

<div className="flex justify-between items-center mt-[20px]">
<button className="glex w-[70px] h-[30px] justify-center items-center bg-orange-700 text-white rounded-md shadow-black shadow-md"
onClick={()=>{
    if(page-1>0){
        setPage(prev=>prev-1)
        search()
    }
    }}
    disabled={wt}
>السابق</button>
<input type="text" disabled={true} value={page+"/"+Math.ceil(total/entriesPerPage)}  className="flex w-[60px] mx-[10px] justify-center h-[30px] items-center outline-none border-b-[1px] border-yellow-500 text-center"/>
<button className="glex w-[70px]  h-[30px] justify-center items-center bg-orange-700 text-white rounded-md  shadow-black shadow-md"
onClick={()=>{
    if((entriesPerPage*page)+1<=total){
    setPage(prev=>prev+1)
    search()
}
}}

disabled={wt}
>التالي</button>
</div>
</div>
</div>

</div>

{show && <InvitForm tog={setShow}/>}

        <table  className=" flex flex-col w-full border-[1px] border-black" align="ltr">
        <thead className="flex justify-evenly w-full h-[40px] bg-blue-950 text-white ">
    

    <th className="border-[1px]  flex-1">تأكيد الحضور</th>
    <th className="border-[1px]  flex-1">البريد الالكتروني</th>
    <th className="border-[1px]  flex-1">رقم الواتساب</th>
    <th className="border-[1px]  flex-1">الاسم</th>
    <th className="border-[1px]  flex-1">تاريخ الإرسال</th>
    <th className="border-[1px]  flex-1">المعرف</th>
    </thead>
    {/* {wt &&(<div className="flex absolute w-[500px] h-[100px] left-[500px] top-[100px] justify-center items-center 
text-[25px] text-white bg-blue-800 shadow-black rounded-md shadow-md">الرجاء الإنتظار</div>)} */}
    {invitations.length>0 && invitations.map(inv=>{
    
    return<tr key={inv.id}>
    <InvitationSentRow  inv={inv} setInvId={setInvId} setEShow={setEShow} setIEShow={setIEShow}/>
    </tr>})}
</table>

    </div>)}
    </Container>
    </div>
}
 
export default Invitations;