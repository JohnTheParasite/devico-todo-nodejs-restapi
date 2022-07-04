import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  login: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  roleId: number

  @Column()
  createdAt: string
}
