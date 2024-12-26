import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useAppdispatch:()=>AppDispatch=useDispatch
export const useAppSelector:TypedUseSelectorHook<RootState> =useSelector