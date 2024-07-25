

"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An error occurred during logout";
            console.error("Logout error:", errorMessage);
            toast.error(errorMessage);
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/tokendata');
            console.log("User data:", res.data);
            if (res.data?.data?._id) {
                setData(res.data.data._id);
            } else {
                toast.error("User ID not found in response");
                setData("nothing");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch user details";
            console.error("GetUserDetails error:", errorMessage);
            toast.error(errorMessage);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-yellow-400">
                {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>

            <button
                onClick={getUserDetails}
                className="bg-yellow-500 mt-4 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
                Get User Details
            </button>
        </div>
    );
}
