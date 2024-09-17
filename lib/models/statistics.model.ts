import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema(
    {
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12,
        },
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
        userGroup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserGroup",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        totalEarned: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Create a compound index for efficient querying
statisticsSchema.index({
    year: 1,
    month: 1,
    category: 1,
    central: 1,
    userGroup: 1,
    user: 1,
});

const Statistics =
    mongoose.models.Statistics ||
    mongoose.model("Statistics", statisticsSchema);

export default Statistics;
