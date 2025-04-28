import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Signup() {

    const [userData,setUserData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate();
    
    function handleSignup() {
            const {username,email,password} = userData;
            if (!username || !email || !password) {
                alert("Please fill all fields");
                return;
            }
            
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const existingUser = users.find((user) => user.email === email);
            if (existingUser) {
                alert("User already exists");
                return;
            }
            
            users.push({ username, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Signup successful!");
            navigate("/signin");
    }

  return (
    <div className='p-6 max-w-md mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Sign Up</h1>

        <input
        type="text"
        placeholder="Username"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        />

        <input
        type="email"
        placeholder="Email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        />

        <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        />  

        <button
        onClick={handleSignup}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
            Sign Up
        </button>

    </div>
  )
}

export default Signup