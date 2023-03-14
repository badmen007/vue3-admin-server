import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  AutoIncrement,
  PrimaryKey,
  Comment,
  AllowNull,
  Default,
  BelongsToMany,
} from "sequelize-typescript";
import Role from "./Role.model"; // 角色表
import UserRole from "./UserRole.model"; // 用户角色表

export interface UserAttributes {
  id: number; // 用户id
  username: string; // 用户名
  password: string; // 密码
  email: string; // 邮箱
  mobile: string; // 手机号
  avatar: string; // 头像
  description: string; // 描述
  isSuper: 0 | 1; // 是否是超级管理员
  status: 0 | 1; // 状态
}

// 用户表包含对应的角色
export type UserAttributeWithRoles = UserAttributes & { roleIds: [] };

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "isSuper" | "status" | "avatar"> {}
@Table({ tableName: "user" })
class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey  // 主键
  @AutoIncrement // 自增
  @Comment("用户id")
  @Column
  id: number;

  @AllowNull(false) // 不允许为空
  @Comment("用户名")
  @Column
  username: string;

  @AllowNull(false) // 不允许为空
  @Comment("密码")
  @Column
  password: string;

  @Comment("用户邮箱")
  @Column
  email: string;

  @Comment("手机号")
  @Column
  mobile: string;

  @Comment("头像")
  @Column
  avatar: string;

  @Comment('描述说明')
  @Column
  description: string;

  @Comment("是否是超级管理员 1是 0否")
  @Default(0)
  @Column
  isSuper: boolean;

  @Comment("账户禁用状态 1正常 0禁用")
  @Default(1)
  @Column
  status: boolean;

  // 一个用户关联多个角色
  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}

export default User;
