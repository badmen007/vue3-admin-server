import Router from "@koa/router";
import {
  addAccessController,
  getAccessAllController,
  removeAccessController,
  updateAccessController,
  updateBulkAccessController,
} from "../controller/access";
import { AccessAttributes } from "../db/models/Access.model";

const router = new Router({
  prefix: "/api/access",
});

/**
 * 添加菜单
 * post /api/access/menu
 */
router.post("/menu", async (ctx) => {
  ctx.body = await addAccessController(ctx.request.body as AccessAttributes);
});

/**
 * 获取菜单
 * get /api/access/menu
 */
router.get("/menu", async (ctx) => {
  ctx.body = await getAccessAllController();
});

/**
 * 删除某一个菜单
 * delete /api/access/menu
 */
router.delete("/menu/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await removeAccessController(Number(id));
});

/**
 * 编辑某一个菜单
 * put /api/access/menu/:id
 */
router.put("/menu/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await updateAccessController(
    Number(id),
    ctx.request.body as AccessAttributes
  );
});

/**
 * 批量更新菜单用于菜单排序操作
 * patch /api/access/menu/update
 */
router.patch('/menu/update', async (ctx) => {
  const { access } = ctx.request.body as { access: AccessAttributes[] };
  ctx.body = await updateBulkAccessController(access);
})

export default router;
