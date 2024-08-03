"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast"
import axios from "axios";


export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",  // Corrected typo here
        
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    
    const onLogin = async () => {
        try {
          setLoading(true);
          const response = await axios.post("/api/users/login", user);
          console.log("login successfully",response.data)
          toast.success("login success")
          router.push("/profile")
        } catch (error:any) {
         console.log("login failed", error.message)
         toast.error(error.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center items-center bg-gray-600 py-2 border min-h-screen">
           <div className='bg-white rounded w-[400px] h-[450px]'>
           <h1 className='flex justify-center items-center p-4 font-bold text-2xl'>{loading ? "Processing " : "Login"}</h1>
        
            
           <div className='flex flex-col px-3'>
           <label htmlFor="email" className='p-2 font-semibold text-xl'>Email</label>
            <input 
            className="border-gray-300 focus:border-gray-600 mb-3 p-2 border rounded-lg focus:outline-none"
                id="email"
                type="email" 
                placeholder="Email" 
                value={user.email}
                required
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
           </div>
           

            <div className='flex flex-col px-3'>
            <label htmlFor="password" className='p-2 font-semibold text-xl'>password</label>
            <input 
             className="border-gray-300 focus:border-gray-600 mb-3 p-2 border rounded-lg focus:outline-none"
                id="password"
                type="password" 
                placeholder="Password" 
                value={user.password}  // Corrected typo here
                required
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            </div>

            <div className='flex flex-col justify-center items-center'>
            <button className="border-gray-300 focus:border-gray-600 bg-blue-400 hover:bg-blue-500 mb-3 p-2 border rounded-lg w-[50%] focus:outline-none" 
            onClick={onLogin}>
                {/* Login */}
                {loading ? "Processing" : buttonDisabled ? "No login" : "Login"}
            </button>
            <label htmlFor="">Dont have an account?</label>
            <Link href="/signup" className='font-semibold text-green-900'>Signup</Link>

           <label className='p-6 font-semibold'>
            Thanks for choosing us 
           </label>
           
            </div>

           </div>
        </div>
    );
}
