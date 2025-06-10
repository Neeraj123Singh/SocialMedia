import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
export declare class PostsService {
    private postsRepository;
    private commentsRepository;
    private likesRepository;
    constructor(postsRepository: Repository<Post>, commentsRepository: Repository<Comment>, likesRepository: Repository<Like>);
    findAll(): Promise<Post[]>;
    findOne(id: string): Promise<Post>;
    create(createPostDto: {
        content: string;
        authorId: string;
    }): Promise<Post>;
    addComment(postId: string, authorId: string, content: string): Promise<Comment>;
    toggleLike(postId: string, authorId: string): Promise<Like>;
}
