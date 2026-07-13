import { getCourseDetails } from "@/queries/courses";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";

interface PageProps {
    params: Promise<{ id: string }>;
}

const SingleCoursePage = async ({ params }: PageProps) => {
    const { id } = await params;
    const course = await getCourseDetails(id);
    return (
        <>
            <CourseDetailsIntro
                title={course?.title}
                subtitle={course?.subtitle}
                thumbnail={course?.thumbnail} />

            <CourseDetails course={course} />

            {course?.testimonials && <Testimonials testimonials={course.testimonials} />}

            <RelatedCourses />
        </>
    );
};
export default SingleCoursePage;