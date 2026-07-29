import { Testimonial } from "@/model/testimonial-model";
import { replaceMongoIdInArray } from "@/lib/convertData";

export async function getTestimonialsForCourse(courseId: string) {
    const testimonials = await Testimonial.find({ courseId: courseId }).lean();
    return replaceMongoIdInArray(testimonials);
}
