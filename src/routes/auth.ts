import Router from "@koa/router";
import {
  registerController,
  loginController,
  LoginModel,
} from "../controller/auth";
import { UserAttributes } from "../db/models/User.model";

const router = new Router({
  prefix: "/api/auth",
});

router.get("/test", async (ctx) => {
  ctx.body = "auth test router";
});

/**
 * 用户注册接口
 * /auth/register
 */
router.post("/register", async (ctx) => {
  ctx.body = await registerController(ctx.request.body as UserAttributes);
});

/**
 * 用户登录
 * /auth/login
 */
router.post("/login", async (ctx) => {
  ctx.body = await loginController(ctx.request.body as LoginModel);
});

export default router;
