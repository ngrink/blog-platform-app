import axios from "axios";

import { PostService } from "./post.service";


export class PostController {
    static async createPost(req, res, next) {
        try {
            const { accountId } = req.token
            const body = req.body;

            const post = await PostService.createPost({author: accountId, ...body});
            res.status(201).json(post);
        } catch (e) {
            next(e);
        }
    }

    static async getAllPosts(req, res, next) {
        try {
            const { accountId } = req.token;

            const posts = await PostService.getAllPosts(accountId, {}); // #TODO: Add paginataion and filtering, views count
            res.status(200).json(posts);
        } catch (e) {
            next(e);
        }
    }

    static async getPost(req, res, next) {
        try {
            const { postId } = req.params;

            const post = await PostService.getPost(postId);
            res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const { postId } = req.params;
            const data = req.body;

            const updated = await PostService.updatePost(postId, data);
            res.status(200).json(updated);
        } catch (e) {
            next(e);
        }
    }

    static async deletePost(req, res, next) {
        try {
            const { postId } = req.params;

            await PostService.deletePost(postId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async publicatePost(req, res, next) {
        try {
            const { postId } = req.params;

            await PostService.publicatePost(postId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async likePost(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;

            const post = await PostService.likePost(accountId, postId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async unlikePost(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;

            await PostService.unlikePost(accountId, postId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async getPostComments(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;

            const comments = await PostService.getPostComments(accountId, postId);
            res.status(200).json(comments);
        } catch (e) {
            next(e);
        }
    }

    static async createPostComment(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;
            const { comment } = req.body

            await PostService.createPostComment(accountId, postId, comment);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async generateRandomPost(req, res, next) {
        try {
            const { accountId } = req.token;

            const title = await axios.get("https://fish-text.ru/get?type=title&number=1&format=json");
            const description = await axios.get("https://fish-text.ru/get?type=sentence&number=3&format=json");

            const n = Math.round(Math.random() * 10 + 5);
            const content = await axios.get(`https://fish-text.ru/get?type=paragraph&number=${n}&format=json`)

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
                "Gogym",
                "Sizunit",
                "Kob",
                "Waz",
                "Kuryr",
                "Waq",
                "Hydoduc",
                "Akacizojo",
                "Cosyb",
                "Ypa",
                "Ohewa",
                "Lixusar",
                "Aze",
                "Rytujep",
                "Lynok",
                "Rumer",
                "Hixopykak",
                "Bid",
                "Gonyjul",
                "Haqytygaf",
                "Luzaz",
                "Fetej",
                "Tovogezix",
                "Eto",
                "Fywim",
                "Ceh",
                "Dat",
                "Lymit",
                "Typeb",
                "Xin",
                "Uxitegeqa",
                "Vaqagyb",
                "Wegafaj",
                "Ufu",
                "Vumapas",
                "Waqesihaq",
                "Ehube",
                "Pymab",
                "Xyg",
                "Dejegaw",
                "Caj",
                "Ocufywaxo",
                "Tasij",
                "Yqyxari",
                "Mygasog",
                "Puz",
                "Ryqujub",
                "Najyc",
                "Tacof",
                "Nazylihoc",
                "Ziwez",
                "Enavy",
                "Tunyp",
                "Ipa",
                "Fof",
                "Zakit",
                "Gaberydos",
                "Safij",
                "Okeku",
                "Ehaco",
                "Zofuh",
                "Kywinim",
                "Movilis",
                "Zacojul",
                "Syn",
                "Ryd",
                "Rurytev",
                "Egivyloza",
                "Xyqib",
                "Zimab",
                "Aboweno",
                "Igoqewo",
                "Tesot",
                "Egeko",
                "Sebovol",
                "Fet",
                "Haxiqeriv",
                "Byv",
                "Aquxisi",
                "Tarosir",
                "God",
                "Kyboj",
                "Vevyp",
                "Nosuc",
                "Kyqoc",
                "Wuvim",
                "Munohok",
                "Syken",
                "Adyge",
                "Zedyvub",
                "Eluve",
                "Wovymat",
                "Vomux",
                "Upanumo",
                "Vaxifur",
                "Cofyw",
                "Hucidax",
                "Gyceh",
                "Uxy",
                "Cyludinat",
                "Hususuk",
                "Mubud",
                "Gofup",
                "Kokik",
                "Xepof",
                "Ukanacy",
                "Pikotygyb",
                "Ewodyja",
                "Mizap",
                "Gufolyn",
                "Ydili",
                "Xovyt",
                "Res",
                "Towukev",
                "Rodenajyb",
                "Wyjetij",
                "Witawam",
                "Ruwoqac",
                "Zovaw",
                "Wyxad",
                "Mezytivif",
                "Rogapij",
                "Vuzyvub",
                "Ijeweve",
                "Sog",
                "Yteki",
                "Xuc",
                "Veq",
                "Aqajaxo",
                "Fop",
                "Exacu",
                "Ogiwigo",
                "Dewywow",
                "Dehef",
                "Vosuz",
                "Nyfeb",
                "Fuwulab",
                "Kaqer",
                "Tivonip",
                "Diver",
                "Vosyr",
                "Etyru",
                "Kuqaqek",
                "Ref",
                "Nohivyz",
                "Rucifeq",
                "Ciwip",
                "Fohugob",
                "Ajubezuto",
                "Axicy",
            ]

            const tn = Math.round(Math.random() * 7 + 3);
            const tags = tagsData.sort(() => 0.5 - Math.random()).slice(0, tn)

            let preview;
            const isPreview = Math.random() > 0.65;

            if (isPreview) {
                const pn = Math.round(Math.random() * 1000);
                preview = `https://picsum.photos/id/${pn}/640/400`;
            }

            const body = {
                "title": title.data.text,
                "content": content.data.text,
                "tags": tags,
                "description": description.data.text,
                "preview": preview,
            }

            const post = await PostService.createPost({author: accountId, ...body});
            await PostService.publicatePost(post._id);
            res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    }
}
