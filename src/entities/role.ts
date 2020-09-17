import { Entity, Index, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { User } from "./user";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(type => User, user => user.roles)
    @Index()
    user: User;

    @Column({ default: false })
    owner: boolean;

    @Column()
    @Index()
    type: string;

    @Column()
    @Index()
    orgId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
