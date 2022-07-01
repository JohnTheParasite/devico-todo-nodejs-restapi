import '@babel/register';
import Koa from 'koa';
import koaBody from 'koa-body'
import cors from '@koa/cors'
import router from './router';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.DB_URL as string

async function start() {

    await mongoose.connect(uri)

    const app = new Koa()

    app.use(cors());
    app.use(koaBody())
    app.use(router.allowedMethods())
    app.use(router.routes())

    const port = process.env.PORT || 8081;
    app.listen(port, () => console.log(`Listening on port ${port}...`))

}

start()
