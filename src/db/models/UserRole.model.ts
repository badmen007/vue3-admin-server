import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  AutoIncrement,
  PrimaryKey,
  Comment,
  ForeignKey,
} from "sequelize-typescript";
import Role from "./Role.model";
import User from "./User.model";
export interface UserRoleAttributes {
  id: number;
  user_id: number;
  role_id: number;
}

// 用户角色 所需的属性
interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "id"> {}

@Table({ tableName: "u_r" })
class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> {
  @PrimaryKey //主键
  @AutoIncrement //自增
  @Comment("id")
  @Column
  id: number;

  @ForeignKey(() => User)
  @Comment("外键 关联user表id")
  @Column
  user_id: number;
  
  @ForeignKey(() => Role)
  @Comment("外键 关联roles表id")
  @Column
  role_id: number;
}

export default UserRole;
