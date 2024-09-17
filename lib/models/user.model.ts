import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserGroup",
    },
    salesman: {
        type: Boolean,
    },
    salesmanCode: {
        type: String,
        default: null,
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
