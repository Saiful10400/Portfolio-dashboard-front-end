"use client"

import { useAppSelector } from '@/redux/featcher/hoocks';
import React from 'react';


const Loading = () => {

    const{isLoading}=useAppSelector(s=>s.authSlice)

    return (
        <div  className={`absolute  top-0 left-0  bg-[#ffffffb9] justify-center items-center w-full h-screen ${isLoading?"flex":"hidden"}`}>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
};

export default Loading;