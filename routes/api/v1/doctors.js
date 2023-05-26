const router = require("express").Router();
const DoctorsController = require("../../../controllers/api/v1/doctorController");

router.post("/register", DoctorsController.register);
router.post("/login", DoctorsController.login);

module.exports = router;
