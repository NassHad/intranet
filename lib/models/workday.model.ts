import mongoose from "mongoose";

const workdaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const WorkDay =
    mongoose.models.WorkDay || mongoose.model("WorkDay", workdaySchema);

export default WorkDay;
