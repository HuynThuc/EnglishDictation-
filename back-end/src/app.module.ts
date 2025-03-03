import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModule } from './modules/topic/topic.module';

import { SectionModule } from './modules/section/section.module';
import { LessionModule } from './modules/lession/lession.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    SectionModule,
    LessionModule,
    TopicModule,
    CommentModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
