import { createSlice } from "@reduxjs/toolkit"

type TinitialState={
    isLoading:boolean,
    loggedInUser:TloggedInUser | null
}

type TloggedInUser={
    name:string,
    email:string,
    role:string,
    id:string
}

const initialState:TinitialState={
    isLoading:false,
    loggedInUser:null
}


const authSlice=createSlice({
    name:"authentication",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.loggedInUser=action.payload
            state.isLoading=false
        },
        setLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        switchLoading:(state)=>{
            state.isLoading=!state.isLoading
        }
    }
})

export const{setLoading,switchLoading,setUser}=authSlice.actions
const authReducer=authSlice.reducer
export default authReducer