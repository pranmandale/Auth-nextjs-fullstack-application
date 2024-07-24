"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast"
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
         const response =  await axios.post("/api/users/signup", user);
        console.log("signup succesfully done", response.data);
        router.push("/login")
        // see in database access

        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message || "Signup failed, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <br />
            <label htmlFor="username">Username</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <br />
            <label htmlFor="email">Email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600"
                id="email"
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <br />
            <label htmlFor="password">Password</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button 
                className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600" 
                onClick={onSignup}
                disabled={buttonDisabled}
            >
                {loading ? "Processing" : buttonDisabled ? "No Signup" : "Signup"}
            </button>
            <label htmlFor="">Already have an account?</label>
            <Link href="/login">Login</Link>
        </div>
    );
}
