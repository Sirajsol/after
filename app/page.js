
import Ht from './components/H'
import InvitForm from './components/InviteFotm/InvitForn'
import EmailSend from './components/email'
import Login from './components/Login'
import Welcome from './components/Welcome'
// import Container from './components/Contaner'
import  Container from '@/app/components/Contaner'
import Link from "next/link"

import EventCard from './components/eventcard/EventCard'

import { PrismaClient } from "@prisma/client";

export const BASE_API_URL=process.env.NEXT_PUBLIC_BASE_API_URL
const getm=async()=>{
    //const {events:d,count}=await fetch('http://localhost:3000/api/event',{
        const {events:d,count}=await fetch(`${BASE_API_URL}/api/event`,{
        headers:{
            'Content-Type'  : 'application/json'
        },
        cache:"no-store"
    }
    ).then(res=>{
        if(!res.ok){
            console.log('fuck')
            throw Error('')
        }
       return res.json()}).catch(error=>{
            console.log('fuck catch')
        })
    return d
}
// export const getm=async()=>{
// try{
//  const pr=new PrismaClient()
//     const events=await prisma?.event.findMany({
//     //    const events=await pr.event.findMany({
//         // include:{
//         //     user:true
//         // },
//         // orderBy:{
//         //     createDate:'desc'
//         // }
       
//     })
//     return events
// }
// catch(error){
//     return error
// }
   
// }

// const hh=async()=>{
//   const d= await fetch("http://localhost:3000/api/event",
// {
//   headers:{
//       'Content-Type'  : 'application/json'
//   },
//   cache:"no-store"
// }
// )
// return d.json()
// }

// const getm=async()=>{
 
//     const res=await fetch('127.0.0.1:3000/api/event',
//         {
//             headers:{
//                 'Content-Type'  : 'application/json'
//             },
//             cache:"no-store"
//         }
//         )
//         return res.json()
//     }

export default async function Home() {
  // export default Home=async()=>{
  
  // const u=await hh()
// console.log("u-------------------------------------------",u)
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     {/* <InvitForm/> */}
  //     {/* <img src={`data:image/jpg;base64,${u.name}`} alt={u.id} className='w-[200px] h-[300px]' /> */}
  //    {/* <Ht/> */}
  //     {/* <EmailSend/> */}
  //     <Login/>
  //   </main>
  // )


  const data=await getm()

  if(!BASE_API_URL){
    return null
}
  return <Container>
    <Welcome/>
      {/* <Login /> */}
  <div className=" flex justify-center items-center flex-wrap w-[80%] mx-auto overflow-scroll">
      
      {data?.length>0&&(
          data.map(d=>{
              return <Link href={`/all-events/${d.id}`} key={d.id}>
              <EventCard ev={d} />
              </Link>
              
            
          })
      )}
  </div>
  </Container>

}
