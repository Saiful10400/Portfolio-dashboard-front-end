import AsideNav from "@/Modules/components/AsideNav";
import Loading from "@/Modules/components/Loading";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <div className="flex flex-col lg:flex-row gap-7">
      <div className="lg:w-[15%] lg:border-r border-gray-800 w-full h-screen lg:sticky top-0"><AsideNav /></div>
      <div className=" lg:pr-2 lg:pt-4 pb-4 w-full min-h-screen">{children}</div>
      <Loading/>
    </div>
  );
};

export default layout;
