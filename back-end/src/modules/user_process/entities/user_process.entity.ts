import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Lession } from 'src/modules/lession/entities/lession.entity';

@Entity('user_process')
export class UserProcess {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userProcesses)
  user: User;

  @ManyToOne(() => Lession, (lession) => lession.userProcesses)  // Thêm mối quan hệ với Lession
  lession: Lession;  // Mỗi user_process sẽ thuộc về một video (lession)

  @Column({ type: 'float', default: 0 })
  currentTime: number; // Thời gian đã xem

  @Column({ type: 'float', default: 0 })
  completionPercentage: number; // Phần trăm hoàn thành

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
