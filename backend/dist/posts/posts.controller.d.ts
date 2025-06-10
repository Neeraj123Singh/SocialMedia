import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<PostEntity[]>;
    findOne(id: string): Promise<PostEntity>;
    create(createPostDto: {
        content: string;
        authorId: string;
    }): Promise<PostEntity>;
    addComment(id: string, body: {
        authorId: string;
        content: string;
    }): Promise<Comment>;
    toggleLike(id: string, body: {
        authorId: string;
    }): Promise<Like>;
}
