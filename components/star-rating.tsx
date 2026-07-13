import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
    rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
        <div className="flex items-center gap-0.5">
            {stars.map((star) => (
                <Star
                    key={star}
                    className={cn(
                        "w-4 h-4",
                        star <= rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                    )}
                />
            ))}
        </div>
    );
}
