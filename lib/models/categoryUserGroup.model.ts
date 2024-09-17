import mongoose from "mongoose";
// Association between Product Category and UserGroup
const categoryUserGroupSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    userGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserGroup",
        required: true,
    },
});

// Create a compound index to ensure uniqueness of the category-userGroup pair
categoryUserGroupSchema.index({ category: 1, userGroup: 1 }, { unique: true });

const CategoryUserGroup =
    mongoose.models.CategoryUserGroup ||
    mongoose.model("CategoryUserGroup", categoryUserGroupSchema);

export default CategoryUserGroup;
