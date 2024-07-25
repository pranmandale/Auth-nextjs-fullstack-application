


import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        if (!userId) {
            console.error("Token error: User ID not found");
            return NextResponse.json({ error: "User ID not found in token" }, { status: 400 });
        }

        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            console.error("Database error: User not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        }, { status: 200 });
    } catch (error: any) {
        console.error("Server error:", error);
        return NextResponse.json({ error: error.message || "An error occurred" }, { status: 400 });
    }
}

