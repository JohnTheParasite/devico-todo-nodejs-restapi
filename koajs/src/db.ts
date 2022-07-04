import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  password: '1504',
  host: 'localhost',
  port: 5432,
  database: 'todos'
})

export default pool
