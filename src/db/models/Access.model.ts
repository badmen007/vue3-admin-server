import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  AutoIncrement,
  PrimaryKey,
  Comment,
  Default,
  AllowNull,
  BelongsToMany,
} from "sequelize-typescript";
import Role from "./Role.model";
import RoleAccess from "./RoleAccess.model";

export interface AccessAttributes {
  id: number;
  type: number;
  title: string;
  path: string;
  icon: string;
  name: string;
  sort_id: number;
  parent_id: number | null;
  status: 0 | 1;
  description: string;
}

interface UserRoleCreationAttributes extends Optional<AccessAttributes, "id"> {}
@Table({ tableName: "access" })
class Access extends Model<AccessAttributes, UserRoleCreationAttributes> {
  @PrimaryKey //主键
  @AutoIncrement //自增
  @Comment("id")
  @Column
  id: number;

  @Comment("权限类型：菜单")
  @Default(1)
  @Column
  type: number;

  @Comment("标题名称")
  @AllowNull(false)
  @Column
  title: string;

  @Comment("url地址")
  @Column
  path: string;

  @Comment("icon名称")
  @Column
  icon: string;

  @Comment("路由name")
  @Column
  name: string;

  @Comment("排序权重")
  @AllowNull(false)
  @Column
  sort_id: number;

  @Comment("父id")
  @Column
  parent_id: number;

  @Comment("状态 0禁止 1正常")
  @Default(1)
  @Column
  status: number;

  @Comment("描述")
  @Column
  description: string;

  // 一个菜单关联多个角色
  @BelongsToMany(() => Role, () => RoleAccess)
  roles: Role[];
}
export default Access;
