import mongoose from "mongoose";

const centralSchema = new mongoose.Schema({
    name: {
        type: String,
    },
});

const Central =
    mongoose.models.Central || mongoose.model("Central", centralSchema);

export default Central;
