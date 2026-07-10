import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    bio?: string;
    socialMedia?: Record<string, any>;
    profilePicture?: string;
}

const userSchema = new Schema<IUser>({
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    phone: {
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: String,
    },
    bio: {
        required: false,
        type: String,
    },
    socialMedia: {
        required: false,
        type: Object,
    },
    profilePicture: {
        required: false,
        type: String,
    },
});

export const User: Model<IUser> = mongoose.models.User ?? mongoose.model<IUser>("User", userSchema);
