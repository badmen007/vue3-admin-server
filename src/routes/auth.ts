import Router from "@koa/router";
import { registerController, loginController } from "../controller/auth";
import { UserAttributes } from "./../db/models/User.model";

const router = new Router({
  prefix: "/api/auth",
});

/**用户注册接口
 * /auth/register
 */
router.post("/register", async (ctx) => {
  ctx.body = await registerController(ctx.request.body as UserAttributes);
});

/**
 * 用户登录接口
 * /auth/login
 */
router.post("/login", async (ctx) => {
  ctx.body = await loginController(ctx.request.body as UserAttributes);
})

router.get("/test", async (ctx) => {
  ctx.body = "测试接口";
});

export default router;
