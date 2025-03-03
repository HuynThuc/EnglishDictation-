import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Comment } from './entities/comment.entity'; // Import entity của bạn
import { CreateCommentDto } from './dto/comment.dto'; // Tạo DTO này để nhận dữ liệu đầu vào
import { UpdateCommentDto } from './dto/comment.dto'; // Tạo DTO để cập nhật comment
import { User } from '../auth/entities/user.entity'; // Import User entity
import { Lession } from '../lession/entities/lession.entity'; // Import Video entity

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,

        // Injecting User and Video repositories
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Lession)
        private readonly lessionRepository: Repository<Lession>,
    ) { }

    // Tạo comment mới
    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const { content, userId, lessionId, parentId } = createCommentDto;
        // Kiểm tra xem video có tồn tại không
        const lession = await this.lessionRepository.findOne({ where: { id: lessionId } });
        // Chuyển đổi lessionId sang kiểu string
        if (!lession) {
            throw new NotFoundException('lession not found');
        }
        // Kiểm tra xem user có tồn tại không
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        // Kiểm tra xem bình luận cha có tồn tại không nếu có parentId
        let parentComment: Comment | undefined = undefined;
        if (parentId) {
            parentComment = await this.commentRepository.findOneBy({ id: parentId });
            if (!parentComment) {
                throw new NotFoundException('Parent comment not found');
            }
        }
        // Tạo bình luận mới
        const newComment = this.commentRepository.create({
            content,
            user,
            lession,
            parent: parentComment, // Liên kết với bình luận cha nếu có
        });

        return await this.commentRepository.save(newComment); // Lưu bình luận mới
    }

    // Trong CommentService



    // Alternative method using QueryBuilder for more complex queries
    async getCommentsWithRepliesQueryBuilder(videoId: number): Promise<Comment[]> {
        const queryBuilder = this.commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')  
            .leftJoinAndSelect('comment.replies', 'replies') 
            .leftJoinAndSelect('replies.user', 'replyUser') 
            .where('comment.lessionId = :lessionId')  // Sửa lỗi
            .setParameter('lessionId', videoId)  // Gán tham số đúng cách
            .andWhere('comment.parent IS NULL') 
            .orderBy('comment.created_at', 'ASC') 
            .addOrderBy('replies.created_at', 'ASC');
    
        const comments = await queryBuilder.getMany();
        return comments;
    }
    

    // Trong CommentService

    // Lấy tất cả bình luận của user theo userId
    async getCommentsByUser(userId: number): Promise<Comment[]> {
        const comments = await this.commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')  // Join với user để lấy thông tin người dùng
            .where('comment.userId = :userId', { userId }) // Lọc bình luận theo userId
            .orderBy('comment.created_at', 'DESC') // Sắp xếp theo thời gian tạo của bình luận
            .getMany();

        if (!comments.length) {
            throw new NotFoundException('No comments found for this user');
        }

        return comments;
    }













    // Cập nhật comment
    async updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentRepository.findOneBy({ id });
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        // Cập nhật nội dung bình luận
        if (updateCommentDto.content) {
            comment.content = updateCommentDto.content;
        }

        return await this.commentRepository.save(comment); // Lưu bình luận đã được cập nhật
    }

    // Xóa comment
    async deleteComment(id: number): Promise<void> {
        const comment = await this.commentRepository.findOneBy({ id });
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        await this.commentRepository.remove(comment); // Xóa bình luận
    }
}
