import { AccessModel, RoleAccessModel, RoleModel } from "../db/models";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

/**
 * 删除与该角色相关联记录
 * @param id 角色id
 */
export const destroyRoleAccessByRoleID = async (id: number) => {
  const result = await RoleAccessModel.destroy({
    where: {
      role_id: id,
    },
  });
  return result;
};

/**
 * 添加与该角色相关联记录
 * @param id 角色id
 * @param access 菜单id列表
 */
export const createRoleAccess = async (id: number, access: number[]) => {
  const records = access.map((aid) => ({
    role_id: id,
    access_id: aid,
  }));
  // 批量插入
  const result = await RoleAccessModel.bulkCreate(records);
  return result;
};

/**
 * 获取与该角色相关联记录
 * @param id 角色id
 */
export const getRoleAccessByID = async (id: number) => {
  const result = await RoleAccessModel.findAll({
    attributes: ["id", "role_id", "access_id"],
    where: {
      role_id: id,
    },
  });
  return result;
};

export const getAccessByRolesService = async (roles: number[]) => {
  const { rows: access } = await AccessModel.findAndCountAll({
    distinct: true,
    order: [["sort_id", "ASC"]],
    include: [
      {
        model: RoleModel,
        attributes: ["id", "name", "description"],
        where: {
          id: {
            [Op.in]: roles,
          },
        },
      },
    ],
  });

  return {
    access,
  };
};
