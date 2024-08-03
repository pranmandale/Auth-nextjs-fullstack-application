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
            const errorMessage = (error as any).response?.data?.message || (error as any).message || "An error occurred during logout";
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
            const errorMessage = (error as any).response?.data?.message || (error as any).message || "Failed to fetch user details";
            console.error("GetUserDetails error:", errorMessage);
            toast.error(errorMessage);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center bg-gray-600 py-2 min-h-screen">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="bg-yellow-400 p-1 rounded">
                {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 mt-4 px-4 py-2 rounded font-bold text-white"
            >
                Logout
            </button>

            <button
                onClick={getUserDetails}
                className="bg-yellow-500 hover:bg-yellow-600 mt-4 px-4 py-2 rounded font-bold text-white"
            >
                Get User Details
            </button>
        </div>
    );
}
