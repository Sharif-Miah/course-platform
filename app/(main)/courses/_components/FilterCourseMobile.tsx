"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react";
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

const FilterCourseMobile = () => {
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
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger className="flex items-center gap-1 text-sm font-medium border px-3 py-1.5 rounded-md hover:bg-muted">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left">Filter Courses</SheetTitle>
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
                          id={`category-mobile-${optionIdx}`}
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
                          htmlFor={`category-mobile-${optionIdx}`}
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
                          id={`price-mobile-${optionIdx}`}
                          onCheckedChange={() => {
                            applyArrayFilter({
                              type: "price",
                              value: option.value,
                            });
                          }}
                          checked={activePrices.includes(option.value)}
                        />
                        <label
                          htmlFor={`price-mobile-${optionIdx}`}
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
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterCourseMobile;
