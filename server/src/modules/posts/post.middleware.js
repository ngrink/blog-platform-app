import { ApiError } from '../../api.exceptions';
import { PostError } from './post.exceptions';
import { PostService } from './post.service';


export class PostMiddleware {
    static async postOwner(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;

            const isOwner = await PostService.checkPostOwner(postId, accountId);
            isOwner
                ? next()
                : next(ApiError.Forbidden())
        } catch (e) {
            next(ApiError.Forbidden())
        }
    }
}
