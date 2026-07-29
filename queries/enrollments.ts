import { Enrollment } from "@/model/enrollments";

import { replaceMongoIdInArray } from "@/lib/convertData";


export async function getEnrollmentsForCourse(courseId: string) {
    const enrollments = await Enrollment.find({ course: courseId }).lean();
    return replaceMongoIdInArray(enrollments);
}