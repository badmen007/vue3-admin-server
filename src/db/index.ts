import sequelize from "./seq";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
// 同步更新model
(async () => {
  await sequelize.sync({ alter: true });
  console.log("sync ok");
})();
