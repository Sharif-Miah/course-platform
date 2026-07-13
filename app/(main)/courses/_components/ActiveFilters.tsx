"use client"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface Filter {
    categories: string[];
    price: string[];
}

interface ActiveFiltersProps {
    filter: Filter;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filter }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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
        <div className="flex items-center gap-2 flex-wrap">
            {/* active categories */}
            {filter.categories.length > 0 &&
                filter.categories.map((category) => (
                    <Button
                        key={category}
                        variant="ghost"
                        className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
                        onClick={() =>
                            applyArrayFilter({ type: "categories", value: category })
                        }
                    >
                        {category}
                        <X className="w-3" />
                    </Button>
                ))}
            {/* active prices */}
            {filter.price.length > 0 &&
                filter.price.map((price) => (
                    <Button
                        key={price}
                        variant="ghost"
                        className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
                        onClick={() => applyArrayFilter({ type: "price", value: price })}
                    >
                        {price}
                        <X className="w-3" />
                    </Button>
                ))}
        </div>
    );
};

export default ActiveFilters;