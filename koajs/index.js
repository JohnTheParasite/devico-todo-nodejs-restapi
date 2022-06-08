import '@babel/register';
import Koa from 'koa';
import koaBody from 'koa-body'
import router from './router/index.js';

const app = new Koa()

app.use(koaBody())
app.use(router.allowedMethods())
app.use(router.routes())

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}...`))
