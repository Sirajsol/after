"use client"
import { useRouter } from "next/navigation";
import Load from "./load";
const Welcome = () => {
    const router=useRouter()
    return <div className=" flex w-screen h-full absolute z-40">
        <div className=" flex w-screen h-screen bg-black opacity-70 "></div>
        <div className="flex  flex-col justify-evenly absolute top-[30%] left-[30%] w-[40%]">
           <h1 className="flex h-[40px]   text-white justify-center my-[20px]">أهلا بك</h1>
            <h1 className="flex  h-[40px] text-white justify-center text-center my-[20px]"> تسرنا زيارتك, نتمنى ان تتعرف من خلالنا على الأحداث التي قد تهمك</h1>
            
            <div className=" flex  h-[40px] justify-center items-center my-[60px]">
                <button 
                onClick={()=>{

                    router.push('/all-events')
                }}
                className="flex bg-orange-600 justify-center items-center text-white w-[120px] h-[40px] rounded-md shadow-md shadow-white">
                    اكتشف اكثر
                </button>
            </div>
        </div>
          <Load/>
      
        
    </div>
}
 
export default Welcome;