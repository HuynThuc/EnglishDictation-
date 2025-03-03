import { Entity, PrimaryGeneratedColumn, Column, 
    CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { UserProcess } from '../../user_process/entities/user_process.entity';
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    username: string;

    @Column({ length: 255 })
    email: string;

    @Column()
    password: string;

    @Column()
    refresh_token: string;

    @Column({ nullable: true })
    googleId?: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ nullable: true, length: 500 })
    avatar?: string;

    @Column({ type: 'int', nullable: true })
    roleId: number;

    // Many-to-One relation with Role
    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'roleId' })  // Liên kết với roleId
    role: Role;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    // Liên kết với tiến trình người dùng
    @OneToMany(() => UserProcess, (userProcess) => userProcess.user)
    userProcesses: UserProcess[];
}
