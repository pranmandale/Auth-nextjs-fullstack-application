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
            <h1>{loading ? "Processing " : "Login"}</h1>
            <br/>
            
            <label htmlFor="email">email</label>
            <input 
            className="border-gray-300 focus:border-gray-600 mb-3 p-2 border rounded-lg focus:outline-none"
                id="email"
                type="email" 
                placeholder="Email" 
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <br/>
            <label htmlFor="password">password</label>
            <input 
             className="border-gray-300 focus:border-gray-600 mb-3 p-2 border rounded-lg focus:outline-none"
                id="password"
                type="password" 
                placeholder="Password" 
                value={user.password}  // Corrected typo here
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button className="border-gray-300 focus:border-gray-600 mb-3 p-2 border rounded-lg focus:outline-none" 
            onClick={onLogin}>
                {/* Login */}
                {loading ? "Processing" : buttonDisabled ? "No login" : "Login"}
            </button>
            <label htmlFor="">Dont have an account?</label>
            <Link href="/signup">Signup</Link>
        </div>
    );
}
