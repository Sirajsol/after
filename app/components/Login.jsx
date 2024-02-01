"use client"
import { useState,useEffect,useContext } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {getCurrentUser} from '../../actions/getUser'
import {Mcotext} from '../context/context'
import { useCntxt } from "../context/context";
const Login = ({setShow}) => {
    
const[name,setName]=useState('')
const[password,setPassword]=useState('')

const router=useRouter()
// const {user}=useCntxt()
// if(user){router.push("/add-users")}
const {user,setUser,loaded}=useCntxt()
console.log('the user is ',user)
    
  
    useEffect(()=>{
      
if(loaded){
    
  if(user && user?.role!="مدير"){
      router.push('/events')
        }
        else{
            if(user && user?.role=="مدير"){
                router.push('/add-users')
            }
        }
}
    },[loaded,user])


const onSubmittt=async()=>{
const data={name:name,password:password}
    // setIsLoading(true)
   signIn('credentials',{
       ...data,
        redirect:false
    })
     .then((callback)=>{
        // setIsLoading(false)

        if(callback?.ok){   // if we successfully log in the user
            localStorage.setItem('use','siraj')
            // router.push('/events')
            // router.refresh()
            toast.success('loged in')
                            }
                            if(callback?.error){
                                toast.error(callback.error) //will be the message from autorize function in [...nextauth]
                            }

    })
}




const log=async()=>{

  toast('الرجاء الانتظار')
   console.log("fuck  log")
    // const res=await fetch(`/api/user?name=${name}&password=${password}`,{
        
    //     // body:JSON.stringify({name,password})
    // })
    const ps=await fetch(`/api/user?name=${name}&password=${password}`).then(res=>res.json()).catch((error)=>{
            toast.error("خطأ")
        })
        if(ps.length>0){console.log("many users",ps)
            // toast.success("yeh")
            setUser(ps[0])
            localStorage.setItem('user',JSON.stringify(ps[0]))
if(ps[0]?.role=='مدير'){ router.push('/add-users')}
           else if(ps[0]?.role=='موظف'){ router.push('/add-users')}
            console.log('done sitting ',ps[0].role)
        }
    if(ps.length==0){
        console.log("no users")
        toast.error('مستخدم عير موجود  ')
    }
    if(ps){
setUser(ps[0])
    }
// setUser('ali')
}
const j=async()=>{
    console.log("m")
    const m= await getCurrentUser(name,password)
    if(m){console.log(m)}
}

    return <div className="flex justify-center items-start
    w-full h-full bg-slate-500  ">
        <div className="flex justify-center items-start top-[0px] left-[0px]
    w-full h-screen bg-black opacity-35 absolute border-[2px] "
    // onClick={()=>{setShow(false)}}
    ></div>
    <div className="hidden sm:flex w-[40%] mx-auto flex-col top-[80px] border-[1px] left-[450px]
     bg-blue-950 border-yellow-500 p-[40px] rounded shadow-white shadow-lg 
     absolute z-40">
<div className="flex justify-between my-[30px]">
   
    <input type="text" id="name"
    value={name}
    onChange={(e)=>{setName(e.target.value)}}
    className="flex outline-none border-b-[1px] border-yellow-500 text-[20px] text-white rounded-sm bg-transparent text-right px-[5px] "
    />
    <label 
    htmlFor="name"
    className=" text-right text-[20px] border-b-[1px] w-[170px] border-yellow-500 text-white ">اسم المستخدم</label>
</div>

<div className="flex justify-between my-[30px]">
    
    <input type="password" id="pass"
        className="flex outline-none border-b-[1px] border-yellow-500 text-[20px] text-white rounded-sm bg-transparent text-right px-[5px] "
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
    
    />
   <label 
   htmlFor="pass"
   className=" text-right text-[20px] w-[170px] border-b-[1px] border-yellow-500 text-white ">كلمة المرور</label>
</div>


<div className=" flex justify-end "><button className=" flex w-[80px] py-[5px] rounded-sm
shadow-sm shadow-white hover:shadow-md hover:shadow-white text-white bg-orange-600 justify-center items-center"
onClick={()=>{
   log()
//    j()
    }}
>دخول</button></div>
    </div>
    </div>
}
 
export default Login;