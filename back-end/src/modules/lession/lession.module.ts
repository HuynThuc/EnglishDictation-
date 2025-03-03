import { Module } from '@nestjs/common';
import { LessionService } from './lession.service';
import { Lession } from './entities/lession.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessionController } from './lession.controller';
import { Section } from '../section/entities/section.entity';
@Module({
  imports: [ TypeOrmModule.forFeature([Lession, Section]),],
  controllers: [LessionController],
  providers: [LessionService]
})
export class LessionModule {}
