import { Entity, Index, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { Role } from "./role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true }) // firebase uid
    @Index()
    uid: string;

    @Column()
    email: string;

    @Column({ default: false })
    emailVerified: boolean;

    @Column()
    phoneNumber: string;

    @OneToMany(roles => Role, role => role.user)
    roles: Role[];

    @Column({ default: 'en' })
    language: string;

    @Column({ default: 'web' })
    createdOnPlatform: string;

    @Column({ default: 'daslab' })
    createdOnTheme: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}