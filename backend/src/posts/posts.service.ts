import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      order: { created_at: 'DESC' },
      relations: ['author'],
    });
  }

  async findOne(id: string): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async create(createPostDto: { content: string; authorId: string }): Promise<Post> {
    const post = this.postsRepository.create({
      content: createPostDto.content,
      author: { id: createPostDto.authorId },
    });
    return this.postsRepository.save(post);
  }

  async addComment(postId: string, authorId: string, content: string): Promise<Comment> {
    const comment = this.commentsRepository.create({
      content,
      post: { id: postId },
      author: { id: authorId },
    });
    return this.commentsRepository.save(comment);
  }

  async toggleLike(postId: string, authorId: string): Promise<Like> {
    const existingLike = await this.likesRepository.findOne({
      where: { post_id: postId, author_id: authorId },
    });

    if (existingLike) {
      await this.likesRepository.remove(existingLike);
      return null;
    }

    const like = this.likesRepository.create({
      post: { id: postId },
      author: { id: authorId },
    });
    return this.likesRepository.save(like);
  }
} 