"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("logout successful")
            console.log("logout successfull")
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600">
            <h1>profile page</h1>

            <hr/>

            <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}
            >
                Logout
            </button>
        </div>
    )
}