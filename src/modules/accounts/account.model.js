import { Schema, model } from "mongoose";


const ProfileSchema = new Schema({
    fullname: { type: String, required: true },
    about: { type: String },
    avatar: { type: String },
    socials: [{
        type: { type: String, required: true},
        url: { type: String, required: true}
    }]
}, {
    _id: false,
    timestamps: false
})

const AccountSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: ProfileSchema
}, {
    timestamps: true
})

const AccountModel = model('Account', AccountSchema);
export { AccountModel }
