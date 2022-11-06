import { Schema, model } from "mongoose";


const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        count: { type: Number, default: 0 },
        items: { type: [String], default: [] },
    },
    comments: {
        count: { type: Number, default: 0 },
        items: [{
            author: { type: Schema.Types.ObjectId, ref: "Account" },
            comment: { type: String }
        }],
    },
    views: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: false
    },
    description: String,
    preview: String,
}, {
    timestamps: true
})

const PostModel = model('Post', PostSchema);
export { PostModel }
