const router = require("express").Router();

router.use("/api", require("./api"));
router.get("*", (req, res) => {
  return res.send(
    '<p>This is a COVID-19 Hospital API, To view documentation visit my github page <a href="https://github.com/tridevVerma/Hospital-API">Tridev Verma</a></p>'
  );
});
module.exports = router;
