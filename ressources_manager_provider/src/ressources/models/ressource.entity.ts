import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ressource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: number;

}