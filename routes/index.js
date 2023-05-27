const router = require("express").Router();

router.use("/api", require("./api"));
router.get("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message:
      "This is a COVID-19 Hospital API, To view documentation visit my github page at https://github.com/tridevVerma/Hospital-API",
  });
});
module.exports = router;
