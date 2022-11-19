import axios from "axios";
import crypto from "crypto";
import moment from "moment";
import { slug } from "slug-gen";

import { AccountModel } from "../accounts/account.model";
import { PostModel } from "./post.model";
import { PostValidator } from "./post.validator";
import { PostError } from "./post.exceptions";


export class PostService {
    static async createPost(data) {
        PostValidator.createPost(data);

        if (!data.slug) {
            data.slug = slug(data.title);
        }

        const post = await PostModel.create(data);
        return post
    }

    static async getAllPosts(
        accountId,
        {
            page=1,
            limit=10,
            feed="new",
            author=null,
            range=null,
            query=null
        }
    ) {
        if (limit > 25) {
            throw PostError.LimitOptionInvalidValue();
        }

        let follows = null;
        let bookmarks = null;

        if (feed === "followed") {
            const account = await AccountModel.findById(accountId, {follows: 1});
            follows = account.follows?.items;
        }

        if (feed === "bookmarks") {
            const account = await AccountModel.findById(accountId, {bookmarks: 1});
            bookmarks = account.bookmarks?.items;
        }

        const feedFilterOptions = {
            "popular": {},
            "new": {},
            "followed": {author: { $in: follows }},
            "bookmarks": {_id: { $in: bookmarks }},
            "drafts": {author: accountId, isPublished: false},
        }

        const feedPaginateOptions = {
            "popular": {sort: {rating: -1}},
            "new": {sort: {publishedAt: -1}},
            "followed": {sort: {publishedAt: -1}},
            "bookmarks": {sort: {publishedAt: -1}},
            "drafts": {sort: {publishedAt: -1}},
        }

        const authorOptions = author ? { author } : {}

        const rangeOptions = (range) => {
            return range
                ? {publishedAt: {$gte: moment().subtract(1, range).toDate()}}
                : {}
        }

        const queryOptions = query ? {
            $or: [
                {title: new RegExp(query, "i")},
                {description: new RegExp(query, "i")}
            ]
        } : {}

        const paginatedPosts = await PostModel.paginate(
            {
                isPublished: true,
                ...feedFilterOptions[feed],
                ...authorOptions,
                ...rangeOptions(range),
                ...queryOptions
            },
            {
                "page": page,
                "limit": limit,
                "select": {content: 0},
                "populate": {
                    path: 'author',
                    select: {
                        username: 1,
                        profile: {fullname: 1, avatar: 1}
                    }
                },
                ...feedPaginateOptions[feed],
            }
        );

        paginatedPosts.docs = paginatedPosts.docs.map(post => {
            const postData = PostService._computePostFields(accountId, post._doc)
            return postData
        })

        return paginatedPosts
    }

    static async getPost(accountId, postId) {
        const post = await PostModel.findById(postId)
            .populate("author", {
                username: 1,
                profile: {fullname: 1, avatar: 1, username: 1}
            });

        if (!post) {
            throw PostError.PostNotFound();
        }
        post.views += 1;
        post.save();

        const postData = PostService._computePostFields(accountId, post._doc);
        return postData
    }

    static async updatePost(postId, data) {
        PostValidator.updatePost(data);

        const post = await PostModel.findByIdAndUpdate(postId, data, {new: true});
        return post
    }

    static async deletePost(postId) {
        await PostModel.findByIdAndDelete(postId);
    }

    static async publicatePost(postId) {
        const post = await PostModel.findById(postId, {isPublished: 1});
        if (!post) {
            throw PostError.PostNotFound()
        }
        if (post.isPublished) {
            throw PostError.PostAlreadyPublished()
        }

        post.isPublished = true;
        post.publishedAt = new Date();
        post.save();
    }

    static async likePost(accountId, postId) {
        const post = await PostModel.findById(postId, {likes: 1})
        if (post.likes.items.includes(accountId)) {
            throw PostError.PostAlreadyLikedByUser()
        }

        post.likes.count += 1;
        post.likes.items.push(accountId);
        await post.save();
    }

    static async unlikePost(accountId, postId) {
        const post = await PostModel.findById(postId, {likes: 1})
        if (!post.likes.items.includes(accountId)) {
            throw PostError.PostNotLikedByUser()
        }

        post.likes.count -= 1;
        post.likes.items = post.likes.items.filter(item => item !== accountId);
        await post.save();
    }

    static async bookmarkPost(accountId, postId) {
        const account = await AccountModel.findById(accountId, {bookmarks: 1})

        if (account.bookmarks.items.includes(postId)) {
            throw PostError.PostAlreadyBookmarked()
        }

        account.bookmarks.count += 1;
        account.bookmarks.items.push(postId);
        await account.save();
    }

    static async unbookmarkPost(accountId, postId) {
        const account = await AccountModel.findById(accountId, {bookmarks: 1})

        if (!account.bookmarks.items.includes(postId)) {
            throw PostError.PostNotBookmarked()
        }

        account.bookmarks.count -= 1;
        account.bookmarks.items = account.bookmarks.items.filter(item => item !== postId);
        await account.save();
    }

    static async getPostComments(accountId, postId) {
        const post = await PostModel.findById(postId, {comments: 1});
        if (!post) {
            throw PostError.PostNotFound();
        }

        const comments = post._doc.comments;
        comments.isCommentedByUser = comments.items.filter(c => c.author === accountId) > 0;
        return comments
    }

    static async createPostComment(accountId, postId, comment) {
        const post = await PostModel.findByIdAndUpdate(
            postId,
            {
                $inc: {"comments.count": 1},
                $push: {"comments.items": {
                    author: accountId,
                    comment
                }}
            }
        );
        if (!post) {
            throw PostError.PostNotFound();
        }
    }

    static async _checkPostOwner(postId, accountId) {
        return await PostModel.exists({
            postId,
            author: accountId
        })
    }

    static _computePostFields(accountId, post) {
        post.isPostOwnedByUser = post.author._id == accountId
        post.likes.isLikedByUser =  post.likes.items.includes(accountId);
        post.comments.isCommentedByUser = post.comments.items.filter(c => c.author == accountId).length > 0;
        delete post.likes.items;
        delete post.comments.items;

        return post;
    }

    static async _computeAndPersistPostRatings() {
        const posts = await PostModel.find(
            {}, {"likes.count": 1, "comments.count": 1, "views": 1},
        )

        posts.map(post => {
            post.rating = (post.likes.count) + (3 * post.comments.count) + (0.3 * post.views)
            post.save();
        })
    }

    static async _generateRandomPost(accountId) {
        const title = await axios.get("https://fish-text.ru/get?type=title&number=1&format=json");
        const description = await axios.get("https://fish-text.ru/get?type=sentence&number=3&format=json");
        const blocks = []

        const sectionsN = Math.round(Math.random() * 3 + 2);
        for (let i=0; i < sectionsN; i++) {
            blocks.push({
                id: crypto.randomBytes(5).toString('hex'),
                type: "header",
                data: {
                    text: (await axios.get("https://fish-text.ru/get?type=title&number=1&format=json")).data.text,
                    level: 3
                }
            })

            const paragraphsN = Math.round(Math.random() * 2 + 1);
            for (let i=0; i < paragraphsN; i++) {
                blocks.push({
                    id: crypto.randomBytes(5).toString('hex'),
                    type: "paragraph",
                    data: {
                        text: (await axios.get(`https://fish-text.ru/get?type=paragraph&number=1&format=json`)).data.text }
                })
            }
        }

        const content = {
            blocks: [
                ...blocks
            ]
        }

        const tagsData = [
            "Network",
            "Infrastructure",
            "Engineering",
            "React",
            "Hardware",
            "Nvidia",
            "RDNA",
            "Ryzen",
            "Redux",
            "NextJS",
            "Web development",
            "ChakraUI",
            "React Hook Form",
            "React Query",
            "GraphQL",
            "NodeJS",
            "Express",
            "Technologies",
            "React Router",
            "Backup",
            "Compressing",
            "Event",
            "Code",
            "Byte",
            "Algorithm",
            "Database",
            "Debugger",
            "Developer   ",
            "Azure",
            "Microsoft",
            "Apple",
            "Yandex",
            "Google",
            "Twitter",
            "VK",
            "Youtube",
            "Hacking ",
            "LAN",
            "LCD",
            "Level",
            "Library",
            "Logfile",
            "Package",
            "Mail",
            "LSM",
            "Programming language",
            "Replica",
            "Random",
            "Signature",
            "Software ",
            "Toolkit",
            "ASP",
            "Abstraction",
            "Interface",
            "Agile",
            "Scrum",
            "Administration",
            "Identitification",
            "Accounting",
            "Access",
            "Alpha",
            "Delta",
            "API",
            "Archivation",
            "Outsource",
            "Bug",
            "Report",
            "Bundling",
            "Headless",
            "Benchmarking",
            "Testing",
            "DevOps",
            "Big data",
            "Backlog",
            "Validation",
            "Wi-Fi",
            "Badblocks",
            "Windows",
            "Virus",
            "Gadget",
            "Guide",
            "Gate",
            "Git",
            "GitHub",
            "GitLab",
            "GUI",
            "Dump",
            "Downloaders",
            "Deadline",
            "Deploy",
            "Destructor",
            "Jumper",
            "Junior",
            "Middle",
            "Senior",
            "Hardware",
            "Releases",
            "HTTP",
            "HTTPS",
            "SSL",
            "ICMP",
            "SMTP",
            "DNS",
            "TCP/IP",
            "MAC",
            "Encapsulation",
        ]

        const tn = Math.round(Math.random() * 7 + 3);
        const tags = tagsData.sort(() => 0.5 - Math.random()).slice(0, tn)

        let preview;
        const isPreview = Math.random() <= 0.4;

        if (isPreview) {
            const pn = Math.round(Math.random() * 1000);
            preview = `https://picsum.photos/id/${pn}/640/400`;
        }

        const body = {
            "title": title.data.text,
            "content": content,
            "tags": tags,
            "description": description.data.text,
            "preview": preview,
        }

        const post = await PostService.createPost({author: accountId, ...body});
        await PostService.publicatePost(post._id);
        return post;
    }
}
