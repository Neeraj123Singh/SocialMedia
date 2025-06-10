"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const comment_entity_1 = require("./entities/comment.entity");
const like_entity_1 = require("./entities/like.entity");
let PostsService = class PostsService {
    constructor(postsRepository, commentsRepository, likesRepository) {
        this.postsRepository = postsRepository;
        this.commentsRepository = commentsRepository;
        this.likesRepository = likesRepository;
    }
    async findAll() {
        return this.postsRepository.find({
            order: { created_at: 'DESC' },
            relations: ['author'],
        });
    }
    async findOne(id) {
        return this.postsRepository.findOne({
            where: { id },
            relations: ['author'],
        });
    }
    async create(createPostDto) {
        const post = this.postsRepository.create({
            content: createPostDto.content,
            author: { id: createPostDto.authorId },
        });
        return this.postsRepository.save(post);
    }
    async addComment(postId, authorId, content) {
        const comment = this.commentsRepository.create({
            content,
            post: { id: postId },
            author: { id: authorId },
        });
        return this.commentsRepository.save(comment);
    }
    async toggleLike(postId, authorId) {
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
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(2, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map