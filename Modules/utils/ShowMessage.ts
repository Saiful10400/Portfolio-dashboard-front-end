"use client"
import { toast } from "react-toastify";


const notification=(message:string,type:"success" |"error"|"warning")=>{

    toast[type](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
  
        });
}

export default notification