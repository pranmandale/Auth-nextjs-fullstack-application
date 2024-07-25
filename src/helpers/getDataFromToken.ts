
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string | null => {
    try {
        // Retrieve the token from cookies
        const token = request.cookies.get("token")?.value || '';
        
        if (!token) {
            throw new Error("Token is missing");
        }

        // Verify and decode the token
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        // Return the user ID or any other relevant data from the token
        return decodedToken.id || null;
    } catch (error: any) {
        console.error("Error verifying token:", error.message);
        throw new Error("Invalid token");
    }
};
