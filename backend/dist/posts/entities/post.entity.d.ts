import { User } from '../../users/entities/user.entity';
export declare class Post {
    id: string;
    content: string;
    author: User;
    author_id: string;
    wallet_address: string;
    created_at: Date;
    updated_at: Date;
}
