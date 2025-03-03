import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { User } from '../auth/entities/user.entity';
import { Lession } from '../lession/entities/lession.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Lession])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
