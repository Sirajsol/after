"use client"
import { useRouter } from "next/navigation"
import { useCntxt } from "../context/context"
const PNave = ({children}) => {
    const router=useRouter()
    const{setUser}=useCntxt()
    return <div className=" flex bg-blue-900 w-full h-[60px]   justify-between">
        <div className="flex w-[40%] justify-evenly">
            <div className="flex flex-col relative ml-[50px] cursor-pointer font-[800] text-[25px] text-white "
            onClick={()=>{localStorage.removeItem('user')
            setUser(null)
            router.push('/')

            }}
            >logout</div>
        <div className="flex flex-col relative ml-[50px] cursor-pointer font-[800] text-[25px] text-white "> logo2</div>
        </div>
        {children}
    </div>
}
 
export default PNave;