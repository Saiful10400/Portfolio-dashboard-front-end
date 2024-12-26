import { useAppdispatch } from "@/redux/featcher/hoocks";
import { switchLoading } from "@/redux/slice/authSlice";
import notification from "./ShowMessage";

interface Tdata{
    statusCode:number,
    message:string,
    success:boolean
}

const useShowResponse = () => {
    const dispatch=useAppdispatch()
    const responseShow=({data}:{data:Tdata})=>{
       console.log("hi gyes.")
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