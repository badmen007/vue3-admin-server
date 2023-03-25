import Router from "@koa/router";
import {
  addRoleAccessController,
  getRoleAccessController,
  getAccessByRolesController,
} from "../controller/roleAccess";

const router = new Router({
  prefix: "/api/role_access",
});

/**
 * 添加菜单与角色关联
 * post /api/role_access' . 某个角色关联某个菜单
 */
router.post("/:id", async (ctx) => {
  const { id } = ctx.params;
  const { access } = ctx.request.body as { access: number[] };
  ctx.body = await addRoleAccessController(Number(id), access);
});

/**
 * 根据角色id获取关联菜单id
 * post /api/role_access'
 */
router.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await getRoleAccessController(Number(id));
});

/**
 * 通过角色获取权限
 * post /role/access'
 */
router.post("/role/access", async (ctx) => {
  const { roles } = ctx.request.body as { roles: string[] };

  const ids = roles.map(Number);
  ctx.body = await getAccessByRolesController(ids);
  // ctx.body = typeof roles
});

export default router;
