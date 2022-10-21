import { Schema, model } from "mongoose";


const PostSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    description: { type: String },
    preview: { type: String },
    tags: {type: [String], default: []},

    views: { type: Number, default: 0 },
    likes: { type: [String], default: [] },
    comments: { type: [Object], default: []},
    published: { type: Boolean, default: false },
}, {
    timestamps: true
})

const PostModel = model('Post', PostSchema);
export { PostModel }
