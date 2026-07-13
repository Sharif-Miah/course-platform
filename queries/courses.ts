import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import { Testimonial } from "@/model/testimonial-model";
import { Module } from "@/model/module.model";
import { dbConnect } from "@/service/mongo";
import { replaceMongoIdInArray } from "@/lib/convertData";

export async function getCourseList(filters: {
    categories?: string[];
    price?: string[];
    query?: string;
    sort?: string;
} = {}) {
    await dbConnect();

    const mongoQuery: any = {};

    // 1. Categories
    if (filters.categories && filters.categories.length > 0) {
        const categoryList = await Category.find({}).lean();
        const matchingCategoryIds = categoryList
            .filter((cat) => {
                const slug = cat.title.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
                return filters.categories!.includes(slug);
            })
            .map((cat) => cat._id);

        mongoQuery.category = { $in: matchingCategoryIds };
    }

    // 2. Price
    if (filters.price && filters.price.length > 0) {
        const priceConditions = [];
        if (filters.price.includes("free")) {
            priceConditions.push({ price: 0 });
        }
        if (filters.price.includes("paid")) {
            priceConditions.push({ price: { $gt: 0 } });
        }
        if (priceConditions.length > 0) {
            mongoQuery.$or = priceConditions;
        }
    }

    // 3. Search Query
    if (filters.query) {
        const searchQuery = {
            $or: [
                { title: { $regex: filters.query, $options: "i" } },
                { description: { $regex: filters.query, $options: "i" } }
            ]
        };
        if (mongoQuery.$or) {
            // If we already have price or other conditions, place query inside $and
            mongoQuery.$and = [{ $or: mongoQuery.$or }, searchQuery];
            delete mongoQuery.$or;
        } else {
            mongoQuery.$or = searchQuery.$or;
        }
    }

    // 4. Sorting
    let sortObj: any = {};
    if (filters.sort === "price-asc") {
        sortObj.price = 1;
    } else if (filters.sort === "price-desc") {
        sortObj.price = -1;
    }

    const coursesQuery = Course.find(mongoQuery)
        .select(["title", "subtitle", "thumbnail", "modules", "price", "category", "instructor", "description"])
        .populate({
            path: "category",
            model: Category
        })
        .populate({
            path: "instructor",
            model: User
        })
        .populate({
            path: "testimonials",
            model: Testimonial
        })
        .populate({
            path: "modules",
            model: Module
        });

    if (Object.keys(sortObj).length > 0) {
        coursesQuery.sort(sortObj);
    }

    const courses = await coursesQuery.lean();
    return replaceMongoIdInArray(courses as any);
}
