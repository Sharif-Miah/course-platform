import { Category } from "@/model/category-model";
import { dbConnect } from "@/service/mongo";
import { replaceMongoIdInArray } from "@/lib/convertData";

export async function getCategoryList() {
    await dbConnect();
    const category = await Category.find({}).lean();
    return replaceMongoIdInArray(category as any);

}