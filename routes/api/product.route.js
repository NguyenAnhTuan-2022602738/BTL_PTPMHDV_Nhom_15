const express = require("express");
const router = express.Router();

const controller = require("../../controllers/api/product.controller");

router.get("/", controller.index);

router.get("/deleted", controller.deleted);

router.get("/detail/:id", controller.detail);

router.post("/create", controller.create);

router.patch("/edit/:id", controller.edit);

router.delete("/delete/:id", controller.delete);

router.patch("/change_multi", controller.changeMulti);//xóa nhiều xe cùng lúc

router.get("/count_by_segment", controller.countBySegment);

module.exports = router;
