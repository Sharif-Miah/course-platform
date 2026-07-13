"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const PRICE_OPTIONS = [
    { label: "Free", value: "free" },
    { label: "Paid", value: "paid" },
];

const CATEGORY_OPTIONS = [
    {
        id: 1,
        label: "Design",
        value: "design",
    },

    {
        id: 3,
        label: "Development",
        value: "development",
    },
    {
        id: 4,
        label: "Marketing",
        value: "marketing",
    },
    {
        id: 5,
        label: "IT & Software",
        value: "it-software",
    },
    {
        id: 6,
        label: "Personal Development",
        value: "personal-development",
    },
    {
        id: 7,
        label: "Business",
        value: "business",
    },
    {
        id: 8,
        label: "Photography",
        value: "photography",
    },
    {
        id: 9,
        label: "Music",
        value: "music",
    },
];

const FilterCourse = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeCategories = searchParams.get("categories") ? searchParams.get("categories")!.split(",") : [];
    const activePrices = searchParams.get("price") ? searchParams.get("price")!.split(",") : [];

    //   apply checkbox filter
    const applyArrayFilter = ({ type, value }: { type: "categories" | "price"; value: string }) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentValues = params.get(type) ? params.get(type)!.split(",") : [];

        const newValues = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value];

        if (newValues.length > 0) {
            params.set(type, newValues.join(","));
        } else {
            params.delete(type);
        }

        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <div className="hidden lg:block">
            <Accordion defaultValue={["categories"]}>
                {/* Categories filter */}
                <AccordionItem value="categories">
                    <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900 dark:text-white">
                            Categories
                        </span>
                    </AccordionTrigger>

                    <AccordionContent className="pt-6 animate-none">
                        <ul className="space-y-4">
                            {CATEGORY_OPTIONS.map((option, optionIdx) => (
                                <li
                                    key={option.value}
                                    className="flex items-center"
                                >
                                    <Checkbox
                                        id={`category-${optionIdx}`}
                                        onCheckedChange={() => {
                                            applyArrayFilter({
                                                type: "categories",
                                                value: option.value,
                                            });
                                        }}
                                        checked={activeCategories.includes(
                                            option.value
                                        )}
                                    />
                                    <label
                                        htmlFor={`category-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600 dark:text-white cursor-pointer"
                                    >
                                        {option.label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                {/* Price filter */}
                <AccordionItem value="price">
                    <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900 dark:text-white">Price</span>
                    </AccordionTrigger>

                    <AccordionContent className="pt-6 animate-none">
                        <ul className="space-y-4">
                            {PRICE_OPTIONS.map((option, optionIdx) => (
                                <li
                                    key={option.value}
                                    className="flex items-center"
                                >
                                    <Checkbox
                                        id={`price-${optionIdx}`}
                                        onCheckedChange={() => {
                                            applyArrayFilter({
                                                type: "price",
                                                value: option.value,
                                            });
                                        }}
                                        checked={activePrices.includes(
                                            option.value
                                        )}
                                    />
                                    <label
                                        htmlFor={`price-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600 dark:text-white cursor-pointer"
                                    >
                                        {option.label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FilterCourse;