import '@babel/register';
import Koa from 'koa';
import koaBody from 'koa-body'
import cors from '@koa/cors'
import router from './router/index.js';
import mongoose from 'mongoose'

const uri = 'mongodb://localhost:27017/todos'
await mongoose.connect(uri)

const app = new Koa()

app.use(cors());
app.use(koaBody())
app.use(router.allowedMethods())
app.use(router.routes())

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}...`))
