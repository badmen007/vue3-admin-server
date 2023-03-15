import { getUserInfo } from "./../services/auth";
import { UserAttributes, UserAttributeWithRoles } from "./../db/models/User.model";
import { SuccessResponse, createErrorResponse } from "./../utils/Response";
import {
  allocUserRoleService,
  destroyUserRoleByUserID,
  getAllUserService,
  updateUserService,
  removeUserService
} from "../services/user";
import errorInfo from "../constants/errorInfo";

const {
  allocUserRoleFailInfo,
  getUserListFailInfo,
  updateUserExistFailInfo,
  deleteUserFailInfo
} = errorInfo;

// 分配用户角色
export const allocUserRoleController = async (
  id: number,
  roles: number[] = []
) => {
  // 移除之前改用户与角色记录
  await destroyUserRoleByUserID(id);
  try {
    await allocUserRoleService(id, roles);
    return new SuccessResponse(null, "用户角色分配成功");
  } catch (error) {
    console.log(error);
    return createErrorResponse(allocUserRoleFailInfo);
  }
};

// 获取全部菜单
export interface WhereQuery {
  name: string;
  status: number;
  mobile: string;
}
export interface UserListParams {
  offset: number;
  limit: number;
  query: Record<string, any>;
}

// 获取用户全部列表
export const getAllUserController = async ({
  offset,
  limit,
  query,
}: UserListParams) => {
  try {
    // 获取所有的用户
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
  data: UserAttributeWithRoles
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
    await destroyUserRoleByUserID(id)
    await allocUserRoleService(id, roleIds);
    return new SuccessResponse(null, "用户信息修改成功");
  } catch (error) {
    return createErrorResponse(getUserListFailInfo);
  }
};

// 删除用户
export const removeUserController = async (id: number) => {
  try {
    await removeUserService(id)
    return new SuccessResponse(null, "用户删除成功")
  } catch (error) {
    return createErrorResponse(deleteUserFailInfo);
  }
}