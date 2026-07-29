
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import { getCourseDetails } from "@/queries/courses";



const testimonials = [
    {
        id: "1",
        content: "This course is amazing! Highly recommended.",
        rating: 5,
        user: {
            first_name: "John",
            last_name: "Doe",
            profile_picture: "https://i.pravatar.cc/56",
        },
    },
    {
        id: "2",
        content: "I learned so much from this course. It was very well structured and easy to follow.",
        rating: 4,
        user: {
            first_name: "Jane",
            last_name: "Smith",
            profile_picture: "https://i.pravatar.cc/56",
        },
    },
];

const SingleCoursePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const course = await getCourseDetails(id);
    console.log(course?.testimonials);
    return (
        <>
            <div className="overflow-x-hidden  grainy">
                <CourseDetailsIntro
                    title={course?.title}
                    subtitle={course?.subtitle}
                    thumbnail={course?.thumbnail}
                />
            </div>

            <CourseDetails course={[]} />

            {/* Testimonials */}
            <Testimonials testimonials={course?.testimonials} />

            {/* Releated Course */}
            <RelatedCourses />
        </>
    );
};
export default SingleCoursePage;