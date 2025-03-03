import { Section } from 'src/modules/section/entities/section.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';

@Entity('topic')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string; // Mô tả chủ đề

  @Column()
  level: string; // Trình độ: A1-C1

  @Column({ default: 0 })
  totalLessons: number; // Tổng số bài học

  @Column()
  title: string;

  @Column()
  image: string;

  @OneToMany(() => Section, (section) => section.topic, { cascade: true })
  sections: Section[];
}
