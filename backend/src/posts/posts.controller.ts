import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Post()
  async create(@Body() createPostDto: { content: string; authorId: string }): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Post(':id/comment')
  async addComment(
    @Param('id') id: string,
    @Body() body: { authorId: string; content: string },
  ): Promise<Comment> {
    return this.postsService.addComment(id, body.authorId, body.content);
  }

  @Post(':id/like')
  async toggleLike(
    @Param('id') id: string,
    @Body() body: { authorId: string },
  ): Promise<Like> {
    return this.postsService.toggleLike(id, body.authorId);
  }
} 