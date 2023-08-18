import {
  destroyUserRoleByUserID,
  allocUserRoleService,
  getAllUserService,
  updateUserService,
  removeUserService,
} from "../services/user";
import { SuccessResponse, createErrorResponse } from "../utils/Response";
import errorInfo from "../constants/errorInfo";
import {
  UserAttributes,
  UserAttributesWithRoles,
} from "../db/models/User.model";
import { getUserInfo } from "../services/auth";

const {
  updateUserExistFailInfo,
  getUserListFailInfo,
  allocUserRoleFailInfo,
  deleteUserInfoFailInfo,
} = errorInfo;

export const allocUserRoleController = async (id: number, roles: number[]) => {
  // 移除之前该用户与角色的记录
  await destroyUserRoleByUserID(id);
  try {
    await allocUserRoleService(id, roles);
    return new SuccessResponse(null, "用户角色分配成功");
  } catch (error) {
    console.log(error);
    return createErrorResponse(allocUserRoleFailInfo);
  }
};

export interface UserListParams {
  offset: number;
  limit: number;
  query: Record<string, any>;
}
// 获取全部用户列表
export const getAllUserController = async ({
  offset,
  limit,
  query,
}: UserListParams) => {
  try {
    const result = await getAllUserService(offset, limit, query);
    return new SuccessResponse(result);
  } catch (error) {
    console.log(error);
    return createErrorResponse(getUserListFailInfo);
  }
};

// 更改用户信息
export const updateUserController = async (
  id: number,
  data: UserAttributesWithRoles
) => {
  const { username, email, mobile, description, status, roleIds } = data;
  // 判断修改后的用户名是否已经存在其他重名用户
  const userInfo = await getUserInfo({ username });
  if (userInfo && userInfo.id !== id) {
    return createErrorResponse(updateUserExistFailInfo);
  }

  try {
    await updateUserService(id, {
      username,
      email,
      mobile,
      description,
      status,
    } as UserAttributes);
    await destroyUserRoleByUserID(id); // 销毁角色重新分配
    await allocUserRoleController(id, roleIds);
    return new SuccessResponse(null, "用户信息修改成功");
  } catch (error) {
    return createErrorResponse(getUserListFailInfo);
  }
};

// 删除用户
export const removeUserController = async (id: number) => {
  try {
    await removeUserService(id);
    return new SuccessResponse(null, "用户删除成功");
  } catch (error) {
    return createErrorResponse(deleteUserInfoFailInfo);
  }
};
