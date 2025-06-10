import { User } from '../../users/entities/user.entity';
import { Post } from './post.entity';
export declare class Comment {
    id: string;
    content: string;
    author: User;
    author_id: string;
    post: Post;
    post_id: string;
    created_at: Date;
    updated_at: Date;
}
