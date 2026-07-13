import mongoose, { Schema, Document, Model } from "mongoose";

export interface IModule extends Document {
    title: string;
    description: string;
    status: string;
    slug: string;
    course: string;
    lessonIds: string[];
}

const moduleSchema = new Schema<IModule>({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    status: {
        required: true,
        type: String,
    },
    slug: {
        required: true,
        type: String,
    },
    course: {
        required: true,
        type: String,
    },
    lessonIds: [
        { type: Schema.Types.ObjectId, ref: "Lesson" }
    ],
});

export const Module: Model<IModule> = mongoose.models.Module ?? mongoose.model<IModule>("Module", moduleSchema);
