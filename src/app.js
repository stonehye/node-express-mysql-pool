const express = require("express");
require("dotenv").config({ path: "./.env.dev" });
const expressErrorHandler = require("express-error-handler");
const config = require("./config/config");
const router = require("./routes");
const sequelize = require("./models/index").sequelize;

const app = express();

app.set("port", process.env.PORT || 3000);

//delete when production env
sequelize.sync({ force: true });

app.use(router);

app.listen(app.get("port"), () => {
  console.log("I'm listening at Port: ", app.get("port"));
});
