const router = require("express").Router();
const PatientController = require("../../../controllers/api/v1/patientController");
const ReportsController = require("../../../controllers/api/v1/reportsController");
const verifyUser = require("../../../configs/verifyUser");

router.post("/register", verifyUser, PatientController.register);
router.post("/:id/create_report", verifyUser, ReportsController.createReport);
router.get("/:id/all_reports", verifyUser, ReportsController.allReports);
module.exports = router;
