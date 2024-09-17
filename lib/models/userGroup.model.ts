import mongoose from "mongoose";

const userGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const UserGroup =
    mongoose.models.UserGroup || mongoose.model("UserGroup", userGroupSchema);

export default UserGroup;
