import mongoose, { Schema } from "mongoose";


export interface iProfile extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
    nationality: string;
    dateOfBirth: string;
    createdAt: Date;
}

const profileSchema: Schema = new Schema({

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
    email:{
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    nationality: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const profileModel = mongoose.model<iProfile>("userProfile", profileSchema)

export default profileModel;