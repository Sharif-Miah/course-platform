"use client"

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchCourse = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialQuery = searchParams.get("query") || "";
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    useEffect(() => {
        setSearchQuery(searchParams.get("query") || "");
    }, [searchParams]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchQuery) {
                params.set("query", searchQuery);
            } else {
                params.delete("query");
            }
            router.push(`${pathname}?${params.toString()}`);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, pathname, router, searchParams]);

    return (
        <div className="relative h-10 max-lg:w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
            <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 text-sm"
            />
        </div>
    )
}

export default SearchCourse