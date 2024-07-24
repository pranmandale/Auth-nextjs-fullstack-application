
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
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600">
            <h1>{loading ? "Processing " : "Login"}</h1>
            <br/>
            
            <label htmlFor="email">email</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600"
                id="email"
                type="email" 
                placeholder="Email" 
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <br/>
            <label htmlFor="password">password</label>
            <input 
             className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600"
                id="password"
                type="password" 
                placeholder="Password" 
                value={user.password}  // Corrected typo here
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600" 
            onClick={onLogin}>
                {/* Login */}
                {loading ? "Processing" : buttonDisabled ? "No login" : "Login"}
            </button>
            <label htmlFor="">Dont have an account?</label>
            <Link href="/signup">Signup</Link>
        </div>
    );
}
