import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Topic } from 'src/modules/topic/entities/topic.entity';
import { Lession } from 'src/modules/lession/entities/lession.entity';
@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Lession, (lesson) => lesson.section)
  lessons: Lession[];

  @ManyToOne(() => Topic, (topic) => topic.sections, { onDelete: 'CASCADE' })
  topic: Topic;

   @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
