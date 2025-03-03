import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { UserProcess } from '../../user_process/entities/user_process.entity';
import { Section } from 'src/modules/section/entities/section.entity';
import { userInfo } from 'os';

@Entity('lession')
export class Lession {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ type: 'text', nullable: true })
  transcript_path: string;


  @ManyToOne(() => Section, (section) => section.lessons, { onDelete: 'CASCADE' })
  section: Section;

  @OneToMany(() => UserProcess, (userProcess) => userProcess.lession)  // Thêm mối quan hệ với UserProcess
  userProcesses: UserProcess[];  // Mỗi video có nhiều tiến trình của người dùng


  // Liên kết với Comment (các bình luận thuộc video này)
  @OneToMany(() => Comment, (comment) => comment.lession)
  comments: Comment[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;



}
