"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"
import axios from "axios";


export default function SignupPage() {

    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignup = async () => {
        setLoading(true);
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user);
            console.log("signup succesfully done", response.data);
            router.push("/login")
            // see in database access

        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message || "Signup failed, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-600 py-2 min-h-screen">
            <div className="bg-white w-[400px] h-[500px]">
                <h1 className="flex justify-center items-center p-4 font-bold text-2xl">{loading ? "Processing" : "Signup"}</h1>
                

                
                   <div className='flex flex-col justify-center justify-center px-4'>
                   <label htmlFor="username" className="pb-2 font-semibold text-xl">Username</label>
                   
                    <input
                        className="items-center border-gray-300 focus:border-gray-600 mb-3 p-2 border rounded-lg focus:outline-none"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                   </div>
                

               

                <div className="flex flex-col justify-center px-4">
                <label htmlFor="email" className="p-2 font-semibold text-xl">Email</label>
                <input
                    className="items-center border-gray-300 focus:border-gray-600 mb-3 p-2 border rounded-lg focus:outline-none"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                </div>
             

                <div className="flex flex-col px-4">
                <label htmlFor="password" className="p-2 font-semibold text-xl">Password</label>
                <input
                    className="items-center border-gray-300 focus:border-gray-600 mb-3 p-2 border rounded-lg focus:outline-none"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                </div>
                
                <div className="flex justify-center">
                <button
                    className="border-gray-300 focus:border-gray-600 bg-blue-400 hover:bg-blue-500 mb-3 p-2 border rounded-lg w-[50%] focus:outline-none"
                    onClick={onSignup}
                    disabled={buttonDisabled}
                >
                    {loading ? "Processing" : buttonDisabled ? "No Signup" : "Signup"}
                </button>
                </div>
                <div className="flex flex-col justify-center items-center">
                <label htmlFor="">Already have an account?</label>
                <Link href="/login" className="font-semibold text-green-900">Login</Link>
                </div>

            </div>
        </div>
    );
}
