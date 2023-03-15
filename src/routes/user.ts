import Router from "@koa/router";
import {
  getAllUserController,
  updateUserController,
  allocUserRoleController,
  removeUserController,
} from "../controller/user";
import { UserAttributes, UserAttributeWithRoles } from "../db/models/User.model";

const router = new Router({
  prefix: "/api/user",
});

/**
 * 给用户分配角色
 * post /api/user/role/:id
 */
router.post("/role/:id", async (ctx) => {
  const { id } = ctx.params;
  const { roles } = ctx.request.body as { roles: number[] };
  ctx.body = await allocUserRoleController(Number(id), roles);
});

/**
 * 获取用户列表
 * get /api/user
 */
router.get("/", async (ctx) => {
  const { pageNum = 0, pageSize = 10, ...query } = ctx.request.query;
  ctx.body = await getAllUserController(
    {
      offset: Number(pageNum),
      limit: Number(pageSize),
      query
    }
  );
});

/**
 * 编辑用户roles
 * post /api/user/:id
 */
router.put('/:id', async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await updateUserController(
    Number(id),
    ctx.request.body as UserAttributeWithRoles
  );
})

/**
 * 删除用户
 * delete /api/user/:id
 */
router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await removeUserController(Number(id));
})

export default router