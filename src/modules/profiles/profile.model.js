import { Schema, model } from "mongoose";

const SocialSchema = new Schema({
    type: { type: String, required: true},
    url: { type: String, required: true}
})

const ProfileSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true, unique: true },
    fullname: { type: String },
    about: { type: String },
    avatar: { type: String },
    socials: { type: [SocialSchema] }
}, {
    timestamps: true
})



const ProfileModel = model('Profile', ProfileSchema);
export { ProfileModel }
