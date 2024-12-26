import Login from '@/Modules/components/Login';
import React from 'react';
import "./style.css"

const page = () => {
  return (
    <div className='login-container flex justify-center items-center min-h-screen'>
      <Login/>
    </div>
  );
};

export default page;