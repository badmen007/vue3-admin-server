
import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize({
  host: 'localhost',
  database: 'vue3-admin',
  timezone: '+08:00',
  dialect: 'mysql',
  username: 'root',
  password: '123456',
  models: [__dirname + '/models/*.model.ts'], // or [User, Role]
  pool: {
    max:  5,
    min:  0,
    idle: 10000 // 一个连接池10s之内 没有被使用 则释放
  }
})

export default sequelize

