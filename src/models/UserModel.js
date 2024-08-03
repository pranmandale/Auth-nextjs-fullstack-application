import mongoose from "mongoose";

// Define the user schema with validation and default values
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        trim: true, // Remove whitespace from both ends of a string
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true, // Remove whitespace from both ends of a string
        lowercase: true, // Convert email to lowercase
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

// Ensure the model is not recompiled if it already exists
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
