
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import { getCourseDetails } from "@/queries/courses";

const SingleCoursePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const course = await getCourseDetails(id);
    // console.log(course);
    return (
        <>
            <div className="overflow-x-hidden  grainy">
                <CourseDetailsIntro
                    title={course?.title}
                    subtitle={course?.subtitle}
                    thumbnail={course?.thumbnail}
                />
            </div>

            <CourseDetails course={course || {}} />

            {/* Testimonials */}
            {course?.testimonials && course.testimonials.length > 0 && <Testimonials testimonials={course?.testimonials} />}

            {/* Releated Course */}
            <RelatedCourses />
        </>
    );
};
export default SingleCoursePage;