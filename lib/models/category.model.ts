import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
});

const Category =
    mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
