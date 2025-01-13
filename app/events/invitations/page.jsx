"use client"
import { useEffect, useState } from "react"
import InvitForm from "../../components/InviteFotm/InvitForn"
import EditInvetation from "../../components/EditInvitation/EditInvetation"
import EditInternalInvetation from "../../components/editInternalInvetation/EditInternalInvetation"
import InvitationRow from '../../components/InvitationRow'
import {useCntxt} from '../../context/context'
import { useRouter } from "next/navigation"
import Container from "../../components/Contaner"
import {toast} from 'react-hot-toast'
import Load from "@/app/components/load"
const InvitationSent = () => {
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
   
        const reset=()=>{
            setSelectedCatedgory('')
            setName('')
            setSelectedEvent('')
            setSelectedPersonCat('')
            setEmail('')
            setWhatsapp('')
            setIType('')
            setSearchTerm('')
        }
    
const[whatsapp,setWhatsapp]=useState('')
   
const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const [categories,setCategories]=useState([])
    const[selectedCategory,setSelectedCatedgory]=useState('')
    const [events,setEvents]=useState([])
    const[selectedEvent,setSelectedEvent]=useState('')
    const[personCats,setPersonCats]=useState([])
    const[selectedPersonCat,setSelectedPersonCat]=useState('')
    const[searchTerm,setSearchTerm]=useState('')
  
    const[itype,setIType]=useState('')



    const[show,setShow]=useState(false)
    const[iEShow,setIEShow]=useState(false)
    const[eShow,setEShow]=useState(false)
    const[onButton,setOnButton]=useState(false)
    const[invetations,setInvetations]=useState([])
    const[wait,setWait]=useState(false)
    const[wt,setWt]=useState(true)
    const[invId,setInvId]=useState('')
    const[mutate,setMutate]=useState(false)
    const[empty,setEmpty]=useState(false)
    // useEffect(()=>{
       
       
    //     const pls=async()=>{
    //          setWt(true)
    //         const ps=await fetch('/api/invetation').then(res=>res.json()).catch((error)=>{toast.error("خطأ")}).finally(setWait(false))
    //         if(ps){setInvetations(ps)}
           
    //         setWt(false)
    //     }
    //     pls()
    // },[mutate])
    useEffect(()=>{
       
        const pls=async()=>{
            setWt(true)
           setEmpty(false)
             const {inv:ps,count}=await fetch(`/api/invetation${searchTerm}`).then(res=>{
             if(!res.ok) {throw Error("no connection")}
           return  res.json()
        }
             )
             .catch((error)=>{toast.error("خطأ")})
                
                if(ps.length==0){setEmpty(true)}
            if(ps){setInvetations(ps)
            setTotal(count)
            }
            setWt(false)
        }
        pls()
      
    },[searchTerm,mutate])

    useEffect(()=>{
        
        const cts=async()=>{
            setWt(true)
            const {events:cs}=await fetch('/api/event').then(res=>res.json())
            if(cs){setEvents(cs)}
            setWt(false)
        }
        cts()
    },[])
    
    useEffect(()=>{
        const cts=async()=>{
            setWt(true)
            const cs=await fetch('/api/personcat').then(res=>res.json())
            if(cs){setPersonCats(cs)}
            setWt(false)
        }
        cts()
    },[])

    useEffect(()=>{
        const cts=async()=>{
            setWt(true)
            const cs=await fetch('/api/category').then(res=>res.json())
            if(cs){setCategories(cs)}
            setWt(false)
        }
        cts()
    },[])
useEffect(()=>{
    search()
},[page])
    const search=()=>{
        let terms=[]
        let ter=""
        if(selectedCategory.length>0){terms.push(`chaircategory=${selectedCategory}`)}
        if(selectedPersonCat.length>0){terms.push(`categoryId=${selectedPersonCat}`)}
        if(name.length>0){terms.push(`name=${name}`)}
        if(email.length>0){terms.push(`email=${email}`)}
        if(itype.length>0){terms.push(`itype=${itype}`)}
        if(selectedEvent.length>0){terms.push(`eventId=${selectedEvent}`)}
        if(whatsapp.length>0){terms.push(`whatsapp=${whatsapp}`)}

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
        {/* {wt&&(<div className="flex justify-center items-center absolute top-[150px] bg-blue-900 w-[400px] h-[80px] left-[500px] text-white
      text-[30px] px-[40px] shadow-black shadow-md rounded">الرجاء الإنتظار</div>)} */}
        
        {wt&&(<Load/>)}
        {!wt && empty && invetations.length==0 && (
    <div className="flex absolute top-[300px] justify-center items-center w-full h-[40px]
     bg-blue-950 text-yellow-500 text-[30px]">! لا توجد  دعوات</div>
)}
        {!connectionError &&auth&&(      <div className='flex flex-col w-screen h-screen items-end relative mb-[70px]  '
    // onClick={()=>{if(!onButton)setShow(false)}}
    >
        <label htmlFor="" className='flex  text-blue-800 font-[900] text-[25px] mr-[100px]'>لوحة التحكم /إرسال الدعوات</label>
        <div className='flex h-[30px]'></div>
        <button className='flex bg-orange-600 w-[80px] py-[5px] items-center justify-center rounded-md
         shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400 text-white font-[700] text-[20px] mr-[100px]'
        onClick={()=>{setShow((prev=>{return !prev}))}}
        onMouseEnter={()=>{setOnButton(true)}}
        onMouseLeave={()=>{setOnButton(false)}}
       
       >إضافة</button>
       
      <div className="flex w-full h-[3px] bg-yellow-500 mt-[10px]"></div>
{invId.length>0 && eShow&&(<EditInvetation id={invId} setShow={setEShow} setMutate={setMutate} inv={invetations.filter(invi=>invi.id==invId)[0]}/>)}
{invId.length>0 && iEShow&&(<EditInternalInvetation id={invId} setShow={setIEShow} setMutate={setMutate}  inv={invetations.filter(invi=>invi.id==invId)[0]}/>)}
{/* {invId.length>0 &&(<InvitForm />)} */}

   
        {/* <div className="flex w-full h-[3px] bg-yellow-500 mt-[10px]"></div> */}
        <div className="flex w-[50%] justify-end mr-[90px] cursor-pointer hover:text-yellow-400"
        
            onClick={()=>{reset()}}
            >تفريغ حقول التصفية</div>
{invetations&&invetations.length>0&&(
        <div className='flex flex-col w-full justify-between  border-b-[1px] border-yellow-500 mt-[20px] py-[20px] ' >

        <div className="flex  justify-evenly">
            
           
            <label className="flex w-[50%] justify-end mr-[100px]" htmlFor="">بحث</label>
        </div>
        <div className="flex justify-end mt-[30px] mx-[20px]">


<div className="flex flex-col w-[25%] ml-[80px] items-end">
<label className=" text-right">الاسم</label>
<input 

value={name}
onChange={(e)=>{setName(e.target.value)}}
className="flex border-[1px] text-right w-[210px] h-[30px]"/>

</div>
<div className="flex flex-col w-[25%] items-end">
<label className=" text-right">البريد الالكتروني</label>
<input
value={email}
onChange={(e)=>{setEmail(e.target.value)}}
className="flex border-[1px] text-right w-[210px] h-[30px]"/>

</div>
<div className="flex flex-col w-[25%] items-end mr-[100px]">
<label className=" text-right">فئة الكرسي</label>
<select 
value={selectedCategory} onChange={(e)=>{setSelectedCatedgory(e.target.value)}}
className="flex border-[1px] w-[210px] h-[30px] text-right">
    <option value="">اختر فئة الكرسي</option>
{categories.length>0 && categories.map(ctg=>{
return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
})}
</select>

</div>

<div className="flex flex-col mr-[80px]">
<label className=" text-right">نوع الدعوة</label>
<select className="flex border-[1px] w-[210px] h-[30px] text-right"></select>

</div>
</div>


<div className="flex  mt-[10px] justify-end">
<div className="flex flex-col w-[25%] ml-[100px] items-end">
<label className=" text-right">الفعالية</label>
<select
value={selectedEvent} onChange={(e)=>{setSelectedEvent(e.target.value)}}
className="flex border-[1px] w-[210px] h-[30px] text-right">
<option value="">اختر فعالية</option>
{events.length>0 && events.map(ctg=>{
return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
})}
</select>

</div>
<div className="flex flex-col w-[25%] items-end">
<label className=" text-right">داخلي/خارجي</label>
<select className="flex border-[1px] w-[210px] h-[30px] text-right text-black"
value={itype}
onChange={(e)=>{setIType(e.target.value)}}
>
<option value="">مصدر الدعوة</option>
<option value="داخلي">داخلي</option>
<option value="خارجي">خارجي</option>

</select>

</div>
<div className="flex flex-col w-[25%] items-end mr-[100px]">
<label className=" text-right">الفئة</label>
<select 
value={selectedPersonCat} onChange={(e)=>{setSelectedPersonCat(e.target.value)}}

className="flex border-[1px] w-[210px] h-[30px] text-right">
<option value={""}>اختر فئة المدعو</option>
{personCats.length>0 && personCats.map(ctg=>{
return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
})}
</select>

</div>
<div className="flex flex-col mr-[100px]">
<label className=" text-right">رقم الجوال</label>
<input 
value={whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}
className="flex border-[1px] text-right w-[210px] h-[30px]"/>

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
        // search()
    }
    }}
    disabled={wt}>السابق</button>
<input type="text" disabled={true} value={page+"/"+Math.ceil(total/entriesPerPage)} className="flex w-[60px] mx-[10px] justify-center h-[30px] items-center outline-none border-b-[1px] border-yellow-500 text-center"/>
<button className="glex w-[70px]  h-[30px] justify-center items-center bg-orange-700 text-white rounded-md  shadow-black shadow-md"
onClick={()=>{
    if((entriesPerPage*page)+1<=total){
    setPage(prev=>prev+1)
    // search()
}
}}
disabled={wt}

>التالي</button>
</div>
</div>
</div>
</div>
)}
{show && <InvitForm tog={setShow}/>}
{invetations&&invetations.length>0&&(
        <table  className=" flex flex-col w-full border-[1px] border-black" align="ltr">
        <thead className="flex justify-evenly w-full h-[40px] bg-blue-950 text-white ">
    
   
    <th className="border-[1px]  flex-1">الفعالية</th>
    <th className="border-[1px]  flex-1">داخلي/خارجي</th>
    <th className="border-[1px]  flex-1">حالة الطلب </th>
    <th className="border-[1px]  flex-1">البريد الالكتروني</th>
    <th className="border-[1px]  flex-1">رقم الواتساب</th>
    <th className="border-[1px]  flex-1">الاسم</th>
    <th className="border-[1px]  flex-1">تاريخ الإرسال</th>
    <th className="border-[1px]  flex-1">المعرف</th>
    </thead>
{/* {wt &&(<div className="flex absolute w-[500px] h-[100px] left-[500px] top-[100px] justify-center items-center 
text-[25px] text-white bg-blue-800 shadow-black rounded-md shadow-md">الرجاء الإنتظار</div>)} */}
{!wt && invetations.length>0 && invetations.map(inv=>{
    return <tr key={inv.id} >
        <InvitationRow inv={inv} setEShow={setEShow} setIEShow={setIEShow} setInvId={setInvId} setMutate={setMutate}/>
    </tr>
    
})}

{!wt && empty && invetations.length==0 && (
    <div className="flex justify-center items-center w-full h-[40px] bg-blue-950 text-yellow-500 text-[30px]">! لا توجد نتائج مطابقة</div>
)}

</table>
       )}
    </div>)}
    </Container>
    </div>
}
 
export default InvitationSent;