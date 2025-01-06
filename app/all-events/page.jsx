
import Link from "next/link"
import Container from "../components/Contaner"
import EventCard from '../components/eventcard/EventCard'
import PNave from "../components/PNav"
import NavBar from "../components/nav/Nav"
import AllCards from "../components/AllCards"

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
//     try{
       
//         const events=await prisma?.event.findMany({
//             // include:{
//             //     user:true
//             // },
//             // orderBy:{
//             //     createDate:'desc'
//             // }
           
//         })
//         return events
//     }
//     catch(error){}
       
//     }
    
const AllEvents = async() => {
    if(!BASE_API_URL){
        return null
    }
const data=await getm()


    return<div className="min-h-[700px]">
     <Container>
       <NavBar/>
        {/* <div>{BASE_API_URL}</div> */}
    {/* <div className=" flex absolute  mt-[40px] justify-center items-center flex-wrap w-[80%] mx-auto">
        
        {data?.length>0&&(
            data.map(d=>{
                return <Link href={`/all-events/${d.id}`} key={d.id}>
                <EventCard ev={d} />
                </Link>
                
             
            })
        )}
        {!data&&(
        <div className=" flex w-screen h-screen justify-center items-center">
        <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
         text-red-600 text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
    </div>
       )}
    </div> */}
    <div className=" flex absolute  mt-[40px] justify-center items-center flex-wrap w-[80%] mx-auto">
    <AllCards/>
    </div>
    </Container>
    </div>
}
 
export default AllEvents;