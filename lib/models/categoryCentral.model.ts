import mongoose from "mongoose";

// Association between Central and Product Category
const categoryCentralSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    central: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Central",
        required: true,
    },
});

// Create a compound index to ensure uniqueness of the category-central pair
categoryCentralSchema.index({ category: 1, central: 1 }, { unique: true });

const CategoryCentral =
    mongoose.models.CategoryCentral ||
    mongoose.model("CategoryCentral", categoryCentralSchema);

export default CategoryCentral;
