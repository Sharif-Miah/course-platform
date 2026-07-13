export const replaceMongoIdInObject = (obj: any): any => {
    if (!obj) return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => replaceMongoIdInObject(item));
    }

    if (typeof obj === "object") {
        // Handle MongoDB ObjectId or BSON type
        if (obj.constructor && obj.constructor.name === "ObjectId") {
            return obj.toString();
        }
        if (obj._bsontype === "ObjectID") {
            return obj.toString();
        }
        // Next.js supports Date serialization in RSC props
        if (obj instanceof Date) {
            return obj;
        }

        const newObj: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const val = obj[key];
                if (key === "_id" && val) {
                    newObj["id"] = val.toString();
                } else if (key !== "_id") {
                    newObj[key] = replaceMongoIdInObject(val);
                }
            }
        }
        return newObj;
    }

    return obj;
};

export const replaceMongoIdInArray = (array: any[]): any[] => {
    if (!array) return [];
    return array.map(item => replaceMongoIdInObject(item));
};
