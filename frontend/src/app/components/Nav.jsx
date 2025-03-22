import React from 'react'

const Nav = () => {
  const logoutHandler=async()=>{
    console.log("hello")
    localStorage.removeItem('authToken'); // or sessionStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/';
  };
  return (
    <div className='w-lvw h-1/10 flex justify-between p-5 items-center bg-red-400'>
        <div className="logo">
            <h2 className='text-2xl'>Money Tracker</h2>
        </div>
        <div className="navbuttons">
            <button onClick={logoutHandler} className='bg-black p-2 rounded-xl text-white'>logout</button>
        </div>
    </div>
  )
}

export default Nav