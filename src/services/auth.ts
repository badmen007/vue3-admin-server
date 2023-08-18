import UserModel, { UserAttributes } from "../db/models/User.model";
import { UserWhereProps } from "./types";
import { createHmac } from "../utils/createHmac";

import { WhereOptions } from "sequelize";
import { RoleModel } from "../db/models";
/**
 * 创建用户
 */
export const createUser = async ({
  username,
  password,
  email,
  mobile,
  status,
}: UserAttributes) => {
  const result = await UserModel.create({
    username,
    password,
    email,
    mobile,
    status,
  });
  return result.toJSON();
};
/**
 * 根据用户名 获取用户信息
 * @param username 用户名
 * @param password 密码
 * @param id 用户id
 * @returns 用户信息
 */
export const getUserInfo = async ({
  username,
  password,
  id,
}: UserWhereProps): Promise<UserAttributes | null> => {
  const where: WhereOptions<UserWhereProps> = {
    username,
  };
  if (password) {
    where.password = createHmac(password);
  }
  if (typeof id != "undefined") {
    where.id = id;
  }
  const result = await UserModel.findOne({
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
    where,
  });

  if (result == null) return null;
  return result.toJSON() as UserAttributes;
};

export const getUserInfoAndRoles = async (id: number) => {
  console.log(id)
  const user = await UserModel.findOne({
    attributes: [
      "id",
      "username",
      "email",
      "mobile",
      "isSuper",
      "status",
      "avatar",
      "description"
    ],
    where: {
      id
    },
    include: [
      //连表查询
      {
        model: RoleModel,
        attributes: ["id", "name", "description"]
      }
    ]
  })
  return user
}
