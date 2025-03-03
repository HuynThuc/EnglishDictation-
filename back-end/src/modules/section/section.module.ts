import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionService } from './section.service';
import { Section } from './entities/section.entity';
import { Topic } from '../topic/entities/topic.entity';
import { SectionController } from './section.controller';
import { Lession } from '../lession/entities/lession.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section, Topic, Lession])],
  controllers:[SectionController],
  providers: [SectionService]
})
export class SectionModule {}
