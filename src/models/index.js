"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
test();

db.orders = require("./orders/orders")(sequelize, Sequelize);
db.orderStatus = require("./orders/orderStatus")(sequelize, Sequelize);
db.orderItems = require("./orders/orderItems")(sequelize, Sequelize);
db.orderOptions = require("./orders/orderOptions")(sequelize, Sequelize);

db.orderStatus.hasMany(db.orders, { foreignKey: { allowNull: false } });
db.orders.belongsTo(db.orderStatus);

db.orders.hasMany(db.orderItems, {
  foreignKey: { name: "orderId", allowNull: false },
});
db.orderItems.belongsTo(db.orders, {
  foreignKey: { name: "orderId", allowNull: false },
});

db.orderItems.hasMany(db.orderOptions, {
  foreignKey: { name: "orderItemId", allowNull: false },
});
db.orderOptions.belongsTo(db.orderItems, {
  foreignKey: { name: "orderItemId", allowNull: false },
});

module.exports = db;
