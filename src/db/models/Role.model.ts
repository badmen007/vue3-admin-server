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
} from 'sequelize-typescript';
import User from './User.model';
import UserRole from './UserRole.model';

// 角色表中需要的属性
export interface RoleAttributes { 
  id: number; // 角色id
  name: string; // 角色名称
  description: string; // 角色描述
  is_default: 0 | 1; // 是否是默认角色
}

// 创建时所需要的角色
interface RoleCreationAttributes extends Optional<RoleAttributes, "id" | "is_default"> {}

@Table({ tableName: "role" })
class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @PrimaryKey // 主键
  @AutoIncrement // 自增
  @Comment("角色id")
  @Column
  id: number;

  @AllowNull(false) // 不允许为空
  @Comment("角色名称 唯一")
  @Column
  name: string;

  @Comment("说明描述")
  @Column
  description: string;

  @Comment("默认角色 1是 0否")
  @Default(1)
  @Column
  is_default: number;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}

export default Role;