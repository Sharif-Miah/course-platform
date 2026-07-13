import { Accordion } from "@/components/ui/accordion";
import { BookCheck, Clock10 } from "lucide-react";
import CourseModuleList from "./module/CourseModuleList";

interface LessonType {
    id: string;
    title: string;
    description: string;
    duration: string;
    video_url: string;
    published: boolean;
    slug: string;
    access: string;
}

interface ModuleType {
    id: string;
    title: string;
    description: string;
    status: string;
    slug: string;
    course: string;
    lessonIds?: LessonType[];
}

interface CourseCurriculamProps {
    course: {
        modules?: ModuleType[];
    };
}

const CourseCurriculam = ({ course }: CourseCurriculamProps) => {
    const totalDuration = course?.modules?.reduce((acc: number, obj: ModuleType) => {
        const totalSeconds = obj.lessonIds?.reduce((lessonAcc: number, lesson: LessonType) => {
            if (!lesson || !lesson.duration) return lessonAcc;
            const parts = lesson.duration.split(":").map(Number);
            if (parts.length === 2) {
                return lessonAcc + parts[0] * 60 + parts[1];
            } else if (parts.length === 3) {
                return lessonAcc + parts[0] * 3600 + parts[1] * 60 + parts[2];
            }
            return lessonAcc;
        }, 0) || 0;
        return acc + (totalSeconds / 60); // minutes
    }, 0) || 0;

    const defaultOpenItems = course?.modules?.map(m => m.id) || [];

    return (
        <>
            <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                <span className="flex items-center gap-1.5">
                    <BookCheck className="w-4 h-4" />
                    {course?.modules?.length || 0} Chapters
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock10 className="w-4 h-4" />
                    {(totalDuration / 60).toPrecision(2)} Hours
                </span>
            </div>

            {/* contents */}
            <Accordion
                defaultValue={defaultOpenItems}
                multiple
                className="w-full"
            >
                {
                    course?.modules && course?.modules.map(module => (
                        <CourseModuleList key={module.id} module={module} />
                    ))
                }
            </Accordion>
        </>
    );
};

export default CourseCurriculam;