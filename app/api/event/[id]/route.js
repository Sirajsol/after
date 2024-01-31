import prisma from '../../../../lib/prismadb'
import { NextResponse } from "next/server"
export const GET =async(req,{params})=>{
    const {id}=params
   
try{
    const inv=await prisma.event.findUnique({
        where:{id:id}
    })
    return new NextResponse(JSON.stringify(inv,{status:'200'}))
    // return new NextResponse(id)
}
catch(error){
    return error
}


}

export const PUT =async(req,{params})=>{
    console.log("inside  event put ")
    // const {id}=params
    const{title,placeId,date,description,time,enMessage,arMessage}=await req.json()
    const {id}=params
    console.log("inside  event put id is ",id)
    try{
        const d=await prisma.event.update({
            data: {title,placeId,date,description,time,enMessage,arMessage},
            where:{id:id}
        })
        console.log("vefore return ",d)
        return new NextResponse(JSON.stringify(d,{status:'200'}))
    }
    catch(error){
        console.log("errro in inv put ",error)
        return new null
    }
    // return new NextResponse(id)
}