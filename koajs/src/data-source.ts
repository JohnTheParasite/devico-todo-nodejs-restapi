import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1504",
  database: "todos",
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: [],
})
