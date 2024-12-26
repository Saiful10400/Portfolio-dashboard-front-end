"use client";
import React from "react";
import style from "./css/login.module.css";
import useSendPost from "../utils/useSendPost";
import { useLoginMutation } from "@/redux/api/api";
import notification from "../utils/ShowMessage";
import { useAppdispatch } from "@/redux/featcher/hoocks";
import { switchLoading } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
 
const Login = () => {
  const [send, startLoading] = useSendPost(useLoginMutation);
  const dispatch = useAppdispatch();
  
 
  const router = useRouter();

  
 

  const loginHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    startLoading();
    const response = await send({ email, password }); // send data and get the response.
    console.log(response);
    if (response?.error?.status === 401) {
      notification("Invalid email or password", "error");
      dispatch(switchLoading());
    } else if (response?.data?.statusCode === 200) {
      notification("Loggedin successfully", "success");
      dispatch(switchLoading());
      router.push('/dashboard/profile')
    } else {
      notification("Something is wrong!", "error");
      dispatch(switchLoading());
    }
  };

  return (
    <form
      onSubmit={loginHandle}
      className={` text-center w-[450px] h-screen lg:h-[500px] shadow-lg rounded-xl flex flex-col justify-center items-center ${style.loginContainer}`}
    >
      <h1 className="text-5xl font-medium text-white">Login</h1>

      <div className="flex justify-center w-full items-center flex-col gap-3 px-10 mt-20">
        <input
          type="email"
          name="email"
          placeholder="email address"
          className="outline-none shadow-md border border-gray700 text-xl w-full rounded-lg pl-2 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="outline-none shadow-md border border-gray700 text-xl w-full rounded-lg pl-2 py-2"
        />
        <button className="btn btn-primary  text-lg text-white rounded-full px-16 py-2 mt-7">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
