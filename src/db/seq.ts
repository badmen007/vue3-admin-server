import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  host: "localhost",
  database: "vue3-admin",
  timezone: "+08:00",
  dialect: "mysql",
  username: "root",
  password: '',
  models: [__dirname + "/models/*.model.ts"],
  pool: {
    // 连接池配置
    max: 5, // 最大连接数
    min: 0, // 最小连接数
    idle: 10000 // 闲置时间
  }
})

export default sequelize