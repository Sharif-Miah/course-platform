import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
    title: string;
    description: string;
    thumbnail: string;
    modules: mongoose.Types.ObjectId[];
    price: number;
    active: boolean;
    category?: mongoose.Types.ObjectId;
    instructor?: mongoose.Types.ObjectId;
    quizzes?: mongoose.Types.ObjectId;
    testimonials: mongoose.Types.ObjectId[];
}

const courseSchema = new Schema<ICourse>({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    thumbnail: {
        required: true,
        type: String,
    },
    modules: [
        { type: Schema.Types.ObjectId, ref: "Module" }
    ],
    price: {
        required: true,
        type: Number,
    },
    active: {
        required: true,
        type: Boolean,
    },

    category: {
        type: Schema.Types.ObjectId, ref: "Category"
    },

    instructor: {
        type: Schema.Types.ObjectId, ref: "User"
    },

    quizzes: {
        required: false,
        type: Schema.Types.ObjectId,
    },

    testimonials: [{
        type: Schema.Types.ObjectId, ref: "Testimonial"
    }],
});

export const Course: Model<ICourse> =
    mongoose.models.Course ?? mongoose.model<ICourse>("Course", courseSchema);
