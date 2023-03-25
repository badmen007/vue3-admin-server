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
import Access from "./Access.model";
import RoleAccess from "./RoleAccess.model";
import User from "./User.model";
import UserRole from "./UserRole.model";

// 角色表中需要的属性
export interface RoleAttributes {
  id: number;
  name: string;
  description: string;
  is_default: number;
}
// 创建时所需的角色
interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id" | "is_default"> {}

@Table({ tableName: "role" })
class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @PrimaryKey //主键
  @AutoIncrement //自增
  @Comment("角色 id")
  @Column
  id: number;

  @AllowNull(false)
  @Comment("角色名称 唯一")
  @Column
  name: string;

  @Comment("说明描述")
  @Column
  description: string;

  @Comment("默认角色 1是 0不是")
  @Default(1)
  @Column
  is_default: number;

  // 一个角色关联多个用户
  @BelongsToMany(() => User, () => UserRole)
  users: User[];

  // 一个角色关联多个权限
  @BelongsToMany(() => Access, () => RoleAccess)
  access: Access[];
}

export default Role;
