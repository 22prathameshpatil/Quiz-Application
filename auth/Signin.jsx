import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signin() {

    const [loginData,setLoginData] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate();
    
    function handleSignin() {
            const {email,password} = loginData;
            if (!email || !password) {
                alert("Please fill all fields");
                return;
            }
            
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const existingUser = users.find((user) => user.email === email && user.password === password);
            if (existingUser) {
                localStorage.setItem("currentUser",JSON.stringify(existingUser));
                alert("User Login Successfully");
                navigate("/");
            }
            else{
                alert("Invalid User");
            }
    }

  return (
    <div className='p-6 max-w-md mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Sign In</h1>

        <input
        type="email"
        placeholder="Email"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        />

        <input
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        />  

        <button
        onClick={handleSignin}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
            Sign In
        </button>
        
    </div>
  )
}

export default Signin