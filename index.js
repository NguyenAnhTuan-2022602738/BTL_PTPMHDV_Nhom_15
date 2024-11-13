const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("express-flash"); //thư viện dùng cho thông báo
const cookieParser = require("cookie-parser"); // thư viện hỗ trợ cùng flash
const session = require("express-session"); // thư viện hỗ trợ cùng flash
require("dotenv").config();

const database = require(`${__dirname}/config/database`);
const route = require(`${__dirname}/routes/client/index.route`);
const routeAdmin = require(`${__dirname}/routes/admin/index.route`);

const systemConfig = require(`${__dirname}/config/system`);
database.connect();

const app = express();
const port = process.env.PORT;

//server sight render
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//tiny mce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
//End tiny mce

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));

//flash
app.use(cookieParser("TUANNGUYENCODER"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//End flash

// App local variable - tạo ra biến toàn cục
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`)); //dùng để public dữ liệu

//routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
