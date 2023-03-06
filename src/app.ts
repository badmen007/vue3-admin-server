import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
// routes
import authRoutes from './routes/auth';
import './db'


// koa应用实例
const app = new Koa();

// 中间件
app.use(cors());
app.use(bodyParser(
  {
    // 解析请求体
    enableTypes: ['json', 'form', 'text'],
  }
));
app.use(logger());

// routes
// 用户雅正路由(登录 注册)
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

// listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.on('error', err => console.error('server error', err))