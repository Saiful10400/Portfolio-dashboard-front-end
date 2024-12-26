"use client"
import { useAppdispatch } from "@/redux/featcher/hoocks";
import notification from "./ShowMessage";
import { switchLoading } from "@/redux/slice/authSlice";


interface Tdata{
    message:string,
    statusCode:number,
    success:boolean
    
}



const useShowResponse = () => {
    const dispatch=useAppdispatch()
    const responseShow=({data}:{data:Tdata})=>{
       
        dispatch(switchLoading())
        if(data?.statusCode===200||data?.success===true){
            notification(data?.message,"success")
        } else{
            notification(data?.message || "something is wrong!","error")
        }
         

    }

    return responseShow
  
};

export default useShowResponse;




    
