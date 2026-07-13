import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Video, Lock } from "lucide-react";

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

interface CourseModuleListProps {
    module: ModuleType;
}

const CourseModuleList = ({ module }: CourseModuleListProps) => {
    const lessons = module.lessonIds || [];
    return (
        <AccordionItem value={module.id}>
            <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4 text-left">
                    <span className="text-gray-900 dark:text-white">
                        {module.title}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
                <p className="text-xs text-gray-500 mb-4">{module.description}</p>
                <ul className="space-y-2">
                    {lessons.map((lesson) => (
                        <li
                            key={lesson.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                        >
                            <div className="flex items-center gap-2">
                                <Video className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        {lesson.title}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {lesson.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{lesson.duration}</span>
                                {lesson.access !== "public" && (
                                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </AccordionContent>
        </AccordionItem>
    );
};

export default CourseModuleList;
