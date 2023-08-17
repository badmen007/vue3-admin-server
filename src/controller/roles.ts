import errorInfo from "../constants/errorInfo";
import { RoleAttributes } from "../db/models/Role.model";
import { SuccessResponse, createErrorResponse } from "../utils/Response";
const {
  addRoleNameExistInfo,
  addAccessFailInfo,
  updateRoleNameExistInfo,
  updateRoleFailInfo,
  removeRoleFailInfo,
} = errorInfo;
import {
  getRole,
  createRole,
  getAllRoleService,
  updateRoleById,
  removeRoleById,
} from "../services/roles";

export const addRoleController = async (params: RoleAttributes) => {
  const result = await getRole(params.name);
  if (result) {
    return createErrorResponse(addRoleNameExistInfo);
  }

  if (params) {
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

// 获取全部菜单
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
    await updateRoleById(id, data);
    return new SuccessResponse(null, "角色编辑成功!");
  } catch (error) {
    return createErrorResponse(updateRoleFailInfo);
  }
};

// 删除角色
export const removeRoleController = async (id: number) => {
  try {
    await removeRoleById(id);
    return new SuccessResponse(null, "删除成功!");
  } catch (error) {
    return createErrorResponse(removeRoleFailInfo);
  }
};
