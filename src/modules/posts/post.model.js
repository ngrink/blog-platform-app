import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


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
        type: Object,
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
    isPublished: {
        type: Boolean,
        default: false
    },
    description: String,
    preview: String,
    publishedAt: Date,
}, {
    timestamps: true
})

PostSchema.plugin(mongoosePaginate);

const PostModel = model('Post', PostSchema);
export { PostModel }
