import Koa from 'koa'
import cors from '@koa/cors'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import authRoutes from './routes/auth'
import "./db"

const app = new Koa()

app.use(cors())
app.use(
  bodyparser({
    // 解析请求体
    enableTypes: ["json", "form", "text"],
  })
);

app.use(logger())

app.use(authRoutes.routes()).use(authRoutes.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server listening on ${port}`)
})
app.on('error', err => console.log('server error', err))