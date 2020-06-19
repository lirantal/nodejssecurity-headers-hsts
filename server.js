const http = require("http");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const expressHandlebars = require("express-handlebars");
const appRoutes = require("./routes/app.routes.js");

const HTTP_PORT_NUMBER = process.env.PORT || 80;

const httpApp = express();
httpApp.engine("handlebars", expressHandlebars());
httpApp.set("view engine", "handlebars");

httpApp.use(
  helmet.hsts({
    maxAge: 86400,
  })
);

httpApp.use(morgan("dev"));
httpApp.use("/", appRoutes);

httpApp.use(express.static("public"));

const httpServer = http.createServer(httpApp);
httpServer.listen(HTTP_PORT_NUMBER, function () {
  console.log(`Server started on port: ${httpServer.address().port}`);
});