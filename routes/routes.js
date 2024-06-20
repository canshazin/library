const express = require("express");

const controller = require("../controllers/controller.js");

const router = express.Router();
// router.get("/getAttendence/:attendenceDate", controller.getData);

// router.get("/getStudents", controller.getStudents);
// router.get("/fetch", controller.fetch);
// router.post("/addData", controller.addData);

// // /admin/add-product => GET
// // router.get("/add-product", adminController.getAddProduct);

router.get("/updateData/:bookName", controller.updateData);

router.post("/saveData", controller.saveData);
router.get("/borrowed", controller.borrowed);
router.get("/returned", controller.returned);
router.get("/", controller.HomePage);
router.use("/", controller.pageNotFound);

module.exports = router;
