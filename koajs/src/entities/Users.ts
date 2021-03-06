import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tasks } from './Tasks'
import { Tokens } from './Tokens'

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @OneToMany(() => Tasks, (task) => task.user)
  tasks: Tasks[]

  @OneToMany(() => Tokens, (task) => task.user)
  tokens: Tokens[]
}
