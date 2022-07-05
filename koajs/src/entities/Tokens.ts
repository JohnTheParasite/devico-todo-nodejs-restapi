import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Users } from './Users'

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  refreshToken: string

  @ManyToOne(() => Users, (user) => user.tokens)
  user: Users
}
