import { Schema, model } from "mongoose";


const AccountSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
})

const AccountModel = model('Account', AccountSchema);
export { AccountModel }
