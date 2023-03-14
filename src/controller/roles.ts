import { getAllRoleService, removeRoleById, updateRoleService } from "./../services/roles";
import { createErrorResponse } from "./../utils/Response";
import { RoleAttributes } from "./../db/models/Role.model";
import { getRole, createRole } from "../services/roles";
import errorInfo from "../constants/errorInfo";
import { SuccessResponse } from "../utils/Response";

const {
  addRoleNameExistInfo,
  addAccessFailInfo,
  updateRoleNameExistInfo,
  updateRoleFailInfo,
  removeRoleFailInfo,
} = errorInfo;

// 添加菜单
export const addRoleController = async (params: RoleAttributes) => {
  const result = await getRole(params.name);

  // 是否有此角色
  if (result) {
    return createErrorResponse(addRoleNameExistInfo);
  }

  if (params) {
    // 创建角色
    try {
      const result = await createRole({
        ...params,
      });
      return new SuccessResponse(result);
    } catch (error) {
      return createErrorResponse(addAccessFailInfo);
    }
  }
};

// 获取全部角色
interface RoleListParams {
  offset: number;
  limit: number;
}

export const getAllRoleController = async ({
  offset,
  limit,
}: RoleListParams) => {
  try {
    const result = await getAllRoleService(offset, limit);
    return new SuccessResponse(result);
  } catch (error) {
    return createErrorResponse(addAccessFailInfo);
  }
};

// 编辑角色
export const updateRoleController = async (
  id: number,
  data: RoleAttributes
) => {
  // 查找角色是不是存在
  const result = await getRole(data.name || "");
  if (result && result.id !== id) {
    return createErrorResponse(updateRoleNameExistInfo);
  }
  // 更新角色
  try {
    await updateRoleService(id, data);
    return new SuccessResponse(null, "角色编辑成功");
  } catch (error) {
    return createErrorResponse(updateRoleFailInfo);
  }
};

// 删除角色
export const removeRoleController = async (id: number) => {
  try {
    await removeRoleById(id);
    return new SuccessResponse(null, "角色删除成功");
  } catch (error) {
    return createErrorResponse(removeRoleFailInfo);
  }
}
