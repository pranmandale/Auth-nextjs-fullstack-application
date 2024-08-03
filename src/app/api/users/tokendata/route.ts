import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/UserModel";
import { connect } from "@/dbConfig/dbConfig";

// Establish a database connection
connect();

export async function GET(request: NextRequest) {
    try {
        // Extract user ID from token
        const userId = await getDataFromToken(request);

        // Check if the user ID was retrieved successfully
        if (!userId) {
            console.error("Token error: User ID not found");
            return NextResponse.json({ error: "User ID not found in token" }, { status: 400 });
        }

        // Fetch the user from the database, excluding the password field
        const user = await User.findById(userId).select("-password");

        // Check if the user was found
        if (!user) {
            console.error("Database error: User not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Respond with the user data
        return NextResponse.json({
            message: "User found",
            data: user
        }, { status: 200 });

    } catch (error: any) {
        // Log and respond with the error
        console.error("Server error:", error);
        return NextResponse.json({ error: error.message || "An error occurred" }, { status: 500 });
    }
}
