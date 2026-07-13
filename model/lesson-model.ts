import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILesson extends Document {
    title: string;
    description: string;
    duration: string;
    video_url: string;
    published: boolean;
    slug: string;
    access: string;
}

const lessonSchema = new Schema<ILesson>({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    duration: {
        required: true,
        type: String,
    },
    video_url: {
        required: true,
        type: String,
    },
    published: {
        required: true,
        type: Boolean,
    },
    slug: {
        required: true,
        type: String,
    },
    access: {
        required: true,
        type: String,
    },
});

export const Lesson: Model<ILesson> = mongoose.models.Lesson ?? mongoose.model<ILesson>("Lesson", lessonSchema);
