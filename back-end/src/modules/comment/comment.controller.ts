import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  async createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentService.createComment(createCommentDto);
  }

  //Lấy tất cả comment hoặc comment theo videoId
  @Get(':videoId?')
  async getComments(@Param('videoId') videoId?: number): Promise<Comment[]> {
    return await this.commentService.getCommentsWithRepliesQueryBuilder(videoId);
  }

  // Route để cập nhật comment
  @Put(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return await this.commentService.updateComment(id, updateCommentDto);
  }

  // Route để xóa comment
  @Delete(':id')
  async deleteComment(@Param('id') id: number): Promise<void> {
    return await this.commentService.deleteComment(id);
  }

  @Get('user/:userId')
  async getCommentsByUser(@Param('userId') userId: number) {
      try {
          const comments = await this.commentService.getCommentsByUser(userId);
          return comments;
      } catch (error) {
          return { message: 'An error occurred while fetching comments', error: error.message };
      }
  }
  
}
