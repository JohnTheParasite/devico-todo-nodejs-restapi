import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from './Users'

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'boolean', default: () => 'false' })
  done: boolean

  @Column()
  content: string

  @ManyToOne(() => Users, (user) => user.tasks)
  user: Users
}
