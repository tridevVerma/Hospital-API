const router = require("express").Router();
const verifyUser = require("../../../configs/verifyUser");

const ReportsController = require("../../../controllers/api/v1/reportsController");

router.get("/:status", verifyUser, ReportsController.filter);

module.exports = router;
