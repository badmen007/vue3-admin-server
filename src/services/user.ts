import { RoleModel, UserModel, UserRoleModel } from "../db/models";
import { UserAttributes } from "../db/models/User.model";

// 分配用户角色
export const allocUserRoleService = async (id: number, data: number[]) => {
  const roles = data.map((rid) => ({
    user_id: id,
    role_id: rid,
  }));
  const result = await UserRoleModel.bulkCreate(roles);
  return result;
};

// 获取全部用户
export const getAllUserService = async (
  offset = 0,
  limit = 10,
  query: Record<string, any>
) => {
  const whereProps = {} as Record<string, any>;
  // 检索条件处理
  if (query.mobile) {
    whereProps.mobile = query.mobile;
  }
  if (query.username) {
    whereProps.username = query.username;
  }
  if (!isNaN(query.status)) {
    whereProps.status = Number(query.status);
  }

  const { count, rows } = await UserModel.findAndCountAll({
    attributes: [
      "id",
      "username",
      "email",
      "mobile",
      "isSuper",
      "status",
      "avatar",
      "description",
      "createdAt",
    ],
    where: whereProps,
    limit,
    offset: limit * offset,
    distinct: true,
    include: [
      // 联表查询
      {
        model: RoleModel,
        attributes: ["id", "name", "description"],
      },
    ],
  });
  return {
    users: rows,
    count,
  };
};

// 修改用户
export const updateUserService = async (id: number, data: UserAttributes) => {
  const result = await UserModel.update(data, {
    where: {
      id,
    },
  });
  return result;
};

/**
 * 删除与该用户相关联的记录
 * @param id 角色id
 * @returns
 */
export const destroyUserRoleByUserID = async (id: number) => {
  const result = await UserRoleModel.destroy({
    where: {
      user_id: id,
    },
  });
  return result;
};

// 根据用户id删除用户
export const removeUserService = async (id: number) => {
  const result = await UserModel.destroy({
    where: {
      id,
    },
  });
  return result;
};
