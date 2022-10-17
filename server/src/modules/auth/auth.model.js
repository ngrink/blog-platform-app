import { Schema, model } from "mongoose";


const AuthSchema = new Schema({
    accountId: { type: String, required: true },
    refreshToken: { type: String, required: true },
}, {
    timestamps: true
})

const AuthModel = model('Auth', AuthSchema);
export { AuthModel }
