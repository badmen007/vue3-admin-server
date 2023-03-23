import Sequelize from "sequelize";
import AccessModel, { AccessAttributes } from "../db/models/Access.model";

const OP = Sequelize.Op;

// 创建菜单资源
export const createAccess = async (params: AccessAttributes) => {
  const result = await AccessModel.create({
    ...params,
  });
  return result.toJSON();
};

// 获取所有菜单资源
export const getAllAccess = async () => {
  const result = await AccessModel.findAll({
    order: [["sort_id", "ASC"]],
  });
  return result;
};

// 通过id删除菜单 包括parentId为该id的菜单
export const removeAccessById = async (id: number) => {
  const result = await AccessModel.destroy({
    where: {
      [OP.or]: [
        // id = 1 or parent_id = 1
        { id },
        { parent_id: id },
      ],
    },
  });
  return result;
};

// 编辑菜单
export const updateAccessById = async (id: number, data: AccessAttributes) => {
  const { title, name, path, icon } = data;
  const result = await AccessModel.update(
    {
      title,
      name,
      path,
      icon,
    },
    {
      where: {
        id,
      },
    }
  );
  return result
};

// 批量更新菜单
export const updateBulkAccess = async (data: AccessAttributes[]) => {
  const result = await AccessModel.bulkCreate(data, {
    updateOnDuplicate: ['sort_id'],
  });
  return result;
}
