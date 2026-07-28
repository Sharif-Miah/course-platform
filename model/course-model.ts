import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
    title: string;
    subtitle: string;
    description: string;
    thumbnail: string;
    modules: mongoose.Types.ObjectId[];
    price: number;
    active: boolean;
    category?: mongoose.Types.ObjectId;
    instructor?: mongoose.Types.ObjectId;
    quizSet?: mongoose.Types.ObjectId;
    testimonials: mongoose.Types.ObjectId[];
    learning: string[];
    createdOn: Date;
    modifiedOn: Date;
}

const courseSchema = new Schema<ICourse>({
    title: {
        required: true,
        type: String
    },
    subtitle: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    thumbnail: {
        required: true,
        type: String
    },
    modules: [{ type: Schema.ObjectId, ref: "Module" }],

    price: {
        required: true,
        type: Number
    },
    active: {
        required: true,
        type: Boolean
    },

    category: { type: Schema.ObjectId, ref: "Category" },

    instructor: { type: Schema.ObjectId, ref: "User" },

    quizSet: { type: Schema.ObjectId, ref: "Quizset" },

    testimonials: [{ type: Schema.ObjectId, ref: "Testimonial" }],

    learning: {
        required: true,
        type: [String]
    },

    createdOn: {
        required: true,
        type: Date
    },

    modifiedOn: {
        required: true,
        type: Date
    }
});

export const Course: Model<ICourse> =
    mongoose.models.Course ?? mongoose.model<ICourse>("Course", courseSchema);
