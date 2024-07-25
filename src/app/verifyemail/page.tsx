// // "use client"

// // import axios from "axios";
// // import Link from "next/link";
// // import React, {useEffect, useState} from "react"



// // export default function  VerifyEmailPage() {
// //     const [token, setToken] useState("");
// //     const [verified, setVerified] = useState(false);
// //     const [error, setError] = useState(false);

// //     const verifyUserEmail = async () => {
// //         try {
// //            await axios.post('/api/users/verifyemail', {token})
// //            setVerified(true);
// //         } catch (error:any) {
// //             setError(true)
// //             console.log('====================================');
// //             console.log(error.response.data);
// //             console.log('====================================');
// //         }
// //     }

// //     useEffect(() => {
// //         const urlToken = window.location.search.split("=")[1];
// //         setToken(urlToken || "");
// //     },[])

// //     useEffect (() => {
// //         if(token.length > 0) {
// //             verifyUserEmail();
// //         }
// //     },[token])

// //     return (
// //         <div className='flex flex-col items-center justify-center min-h-screen py-2'>
// //             <h1 className='text-4xl'>verify email</h1>
// //             <h2 className='p-2 bg-green-500 text-white'>{token ? `${token}` : "no token"}</h2>

// //             {
// //                 verified && (
// //                     <div>
// //                         <h2 className='text-2xl'>email verified</h2>
// //                         <Link href="/login">login</Link>
// //                     </div>
// //                 )
// //             }

// //             {
// //                 error && (
// //                     <div>
// //                         <h2 className='text-2xl bg-red-500'>error is occured</h2>
                        
// //                     </div>
// //                 )
// //             }
// //         </div>
// //     )
// // }


// "use client"

// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// export default function VerifyEmailPage() {
//     const [token, setToken] = useState(""); // Corrected useState initialization
//     const [verified, setVerified] = useState(false);
//     const [error, setError] = useState(false);

//     const verifyUserEmail = async () => {
//         try {
//             await axios.post('/api/users/verifyemail', { token });
//             setVerified(true);
//         } catch (error: any) {
//             setError(true);
//             console.error("Error verifying email:", error.response?.data || error.message);
//         }
//     };

//     useEffect(() => {
//         const urlToken = new URLSearchParams(window.location.search).get("token");
//         setToken(urlToken || "");
//     }, []);

//     useEffect(() => {
//         if (token.length > 0) {
//             verifyUserEmail();
//         }
//     }, [token]);

//     return (
//         <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600'>
//             <h1 className='text-4xl'>Verify Email</h1>
//             <h2 className='p-2 bg-green-500 text-white'>{token ? `Token: ${token}` : "No token provided"}</h2>

//             {verified && (
//                 <div>
//                     <h2 className='text-2xl'>Email verified</h2>
//                     <Link href="/login" className='text-blue-500'>Login</Link>
//                 </div>
//             )}

//             {error && (
//                 <div>
//                     <h2 className='text-2xl bg-red-500 p-2 rounded'>An error occurred during verification</h2>
//                 </div>
//             )}
//         </div>
//     );
// }


"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState(""); 
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post('/api/users/verifyemail', { token });
            console.log("Verification response:", response.data); // Log response data
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.error("Error verifying email:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600'>
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2 bg-green-500 text-white'>{token ? `Token: ${token}` : "No token provided"}</h2>

            {verified && (
                <div>
                    <h2 className='text-2xl'>Email verified</h2>
                    <Link href="/login" className='text-blue-500'>Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className='text-2xl bg-red-500 p-2 rounded'>An error occurred during verification</h2>
                </div>
            )}
        </div>
    );
}
