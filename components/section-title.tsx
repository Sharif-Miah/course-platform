import { cn } from "@/lib/utils";
import React from "react";

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
}

export const SectionTitle = ({ children, className }: SectionTitleProps) => {
    return (
        <h2 className={cn("text-xl md:text-2xl lg:text-3xl font-bold", className)}>
            {children}
        </h2>
    );
};
