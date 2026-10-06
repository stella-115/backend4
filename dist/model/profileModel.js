import mongoose, { Schema } from "mongoose";
const profileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "newUser",
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    nationality: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const profileModel = mongoose.model("userProfile", profileSchema);
export default profileModel;
//# sourceMappingURL=profileModel.js.map