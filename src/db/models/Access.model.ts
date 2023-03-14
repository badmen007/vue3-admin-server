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
} from "sequelize-typescript";

export interface AccessAttributes {
  id: number; // 权限id
  type: number;
  title: string;
  path: string;
  icon: string;
  name: string;
  sort_id: number;
  parent_id: number;
  status: 0 | 1;
  description: string;
}

interface UserRoleCreationAttributes extends Optional<AccessAttributes, "id"> {}

@Table({ tableName: "access" })
class Access extends Model<AccessAttributes, UserRoleCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Comment("id")
  @Column
  id: number;

  @Comment('权限类型：菜单')
  @Default(1)
  @Column
  type: number;

  @Comment('标题名称')
  @AllowNull(false)
  @Column
  title: string;

  @Comment('url地址')
  @Column
  path: string;

  @Comment('icon 名称')
  @Column
  icon: string;

  @Comment('路由name')
  @Column
  name: string;

  @Comment('排序权重')
  @AllowNull(false)
  @Column
  sort_id: number;

  @Comment('父级id')
  @Column
  parent_id: number;

  @Comment('状态：0禁止 1正常')
  @Default(1)
  @Column
  status: number;

  @Comment('描述')
  @Column
  description: string;
}

export default Access;