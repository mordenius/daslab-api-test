import { Entity, Index, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { User } from "./user";

const COORDINATE_NUMBERS_SCALE = 8;

@Entity()
export class TestingLocation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.testingLocations)
    @Index()
    user: User;

    @Column("decimal", { precision: 10, scale: COORDINATE_NUMBERS_SCALE })
    longitude: number;

    @Column("decimal", { precision: 10, scale: COORDINATE_NUMBERS_SCALE })
		latiture: number;
		
		@CreateDateColumn()
		plannedTimeArrive: Date;
		
		@Column()
		formattedAddress: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
