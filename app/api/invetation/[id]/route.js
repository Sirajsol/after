import prisma from '../../../../lib/prismadb'
import { NextResponse } from "next/server"
export const GET =async(req,{params})=>{
    const {id}=params
   
try{
    const inv=await prisma.invetation.findUnique({
        where:{id:id}
    })
    return new NextResponse(JSON.stringify(inv,{status:'200'}))
    return new NextResponse(id)
}
catch(error){
    return new NextResponse(JSON.stringify(error,{status:400}))
}



}

export const PUT =async(req,{params})=>{
    console.log("inside  inv put ")
    // const {name,eventId,title,orgnization,position,email,whatsapp,category,istate}=await req.json()
    const data=await req.json()
    const {id}=params
    
    try{
        const d=await prisma.invetation.update({
            // data: {name,eventId,title,orgnization,position,email,whatsapp,category,istate},
            data:data,
            where:{id:id}
        })
        return new NextResponse(JSON.stringify(d,{status:'200'}))
    }
    catch(error){
        console.log("errro in inv put ",error)
        return new new NextResponse(JSON.stringify(error,{status:400}))
    }
   
}