import { User } from '../../users/entities/user.entity';
import { Post } from './post.entity';
export declare class Like {
    wallet_address: string;
    post_id: string;
    author: User;
    author_id: string;
    post: Post;
    created_at: Date;
    updated_at: Date;
}
