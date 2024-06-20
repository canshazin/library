const express = require("express");

const controller = require("../controllers/controller.js");

const router = express.Router();

router.get("/updateData/:bookName", controller.updateData);

router.post("/saveData", controller.saveData);
router.get("/borrowed", controller.borrowed);
router.get("/returned", controller.returned);
router.get("/", controller.HomePage);
router.use("/", controller.pageNotFound);

module.exports = router;
