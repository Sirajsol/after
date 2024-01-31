import prisma from '../../../lib/prismadb'
import { NextResponse } from "next/server"
export const POST=async(req)=>{

    const{name,password,role}=await req.json()
    try{
    const u=await prisma.mUser.create({
        data:{name,password,role}
    })
return new NextResponse(JSON.stringify(u,{status:'200'}))

}
catch(error){
    console.log(error)
    return new NextResponse(JSON.stringify(error,{status:400}))
}
}

export const GET=async(req)=>{
    // const{name,password}=await req.json()
    const ur=new URL(req.url)
    // console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
// let{name}=searchPparams.get('name')
const name=searchParams.get('name')
const password=searchParams.get('password')
//  console.log("search  params is    ",searchParams.get('placeId'))
    try{
       
        const us=await prisma.mUser.findMany({
            where:{
                ...(name && {name:name}),
                ...(password && {password:password}),
                // password:password
                
                
            }
        })
        // if(name=='siraj'){
        //     const us="hi"
        //     return new NextResponse(JSON.stringify(us,{status:'200'}))
        // }
       if(us) {return new NextResponse(JSON.stringify(us,{status:'200'}))}
       

    }
    catch(error){
        return  new NextResponse(JSON.stringify({},{status:'404'}))
    }
   
}

