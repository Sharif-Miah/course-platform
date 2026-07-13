import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";

import { ArrowRight } from "lucide-react";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



import { getCourseList } from "@/queries/courses";
import CourseCard from "./_components/CourseCard";
import SearchCourse from "./_components/SearchCourse";
import SortCourse from "./_components/SortCourse";
import FilterCourseMobile from "./_components/FilterCourseMobile";
import ActiveFilters from "./_components/ActiveFilters";
import FilterCourse from "./_components/FilterCourse";


interface PageProps {
    searchParams: Promise<{
        categories?: string | string[];
        price?: string | string[];
        sort?: string | string[];
        query?: string | string[];
    }>;
}

const CoursesPage = async ({ searchParams }: PageProps) => {
    const resolvedSearchParams = await searchParams;

    const categories = typeof resolvedSearchParams.categories === "string"
        ? resolvedSearchParams.categories.split(",")
        : Array.isArray(resolvedSearchParams.categories)
        ? resolvedSearchParams.categories.flatMap(c => c.split(","))
        : [];

    const price = typeof resolvedSearchParams.price === "string"
        ? resolvedSearchParams.price.split(",")
        : Array.isArray(resolvedSearchParams.price)
        ? resolvedSearchParams.price.flatMap(p => p.split(","))
        : [];

    const sort = typeof resolvedSearchParams.sort === "string"
        ? resolvedSearchParams.sort
        : Array.isArray(resolvedSearchParams.sort)
        ? resolvedSearchParams.sort[0]
        : undefined;

    const query = typeof resolvedSearchParams.query === "string"
        ? resolvedSearchParams.query
        : Array.isArray(resolvedSearchParams.query)
        ? resolvedSearchParams.query[0]
        : undefined;

    const courses = await getCourseList({
        categories,
        price,
        sort,
        query,
    });

    return (
        <section
            id="courses"
            className="container space-y-6   dark:bg-transparent py-6"
        >
            {/* <h2 className="text-xl md:text-2xl font-medium">All Courses</h2> */}
            {/* header */}
            <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
                <SearchCourse />
                <div className="flex items-center justify-end gap-2 max-lg:w-full">
                    <SortCourse />

                    {/* Filter Menus For Mobile */}
                    <FilterCourseMobile />
                </div>
            </div>
            {/* header ends */}
            {/* active filters */}
            <ActiveFilters
                filter={{
                    categories,
                    price,
                }}
            />
            <section className="pb-24 pt-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    {/* these component can be re use for mobile also */}
                    <FilterCourse />
                    {/* Course grid */}
                    <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        {courses.map((course) => {
                            return (
                                <CourseCard key={course.id} course={course} />
                            );
                        })}
                    </div>
                </div>
            </section>
        </section>
    );
};
export default CoursesPage;