import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
    content: string;
    user: string;
    courseId: string;
    rating: number;
}

const testimonialSchema = new Schema<ITestimonial>({
    content: {
        required: true,
        type: String,
    },
    user: {
        required: true,
        type: String,
    },
    courseId: {
        required: true,
        type: String,
    },
    rating: {
        required: true,
        type: Number,
    },
});

export const Testimonial: Model<ITestimonial> =
    mongoose.models.Testimonial ??
    mongoose.model<ITestimonial>("Testimonial", testimonialSchema);
