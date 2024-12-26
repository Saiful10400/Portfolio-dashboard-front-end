"use client";
import style from "./css/login.module.css";
const Login = () => {
  return (
    <form
      className={` text-center w-[450px] h-screen lg:h-[500px] shadow-lg rounded-xl flex flex-col justify-center items-center ${style.loginContainer}`}
    >
      <h1 className="text-5xl font-medium text-white">Login</h1>

      <div className="flex justify-center w-full items-center flex-col gap-3 px-10 mt-20">
        <input
          type="email"
          placeholder="email address"
          className="outline-none shadow-md border border-gray700 text-xl w-full rounded-lg pl-2 py-2"
        />
        <input
          type="password"
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
