import '@babel/register'
import "reflect-metadata"
import Koa from 'koa'
import koaBody from 'koa-body'
import cors from '@koa/cors'
import router from './router'
import { AppDataSource } from './data-source'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 8081;

async function start() {

    const app = new Koa()

    app.use(cors());
    app.use(koaBody())
    app.use(router.allowedMethods())
    app.use(router.routes())

    AppDataSource.initialize().then(() => {
        console.log('Database connected successfully')
        app.listen(port, () => console.log(`Listening on port ${port}...`))
    }).catch((error) => {
        console.log('Failed connecting database.', error)
    })
}

start()
