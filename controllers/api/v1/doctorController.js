const Doctor = require("../../../models/Doctor");
const jwt = require("jsonwebtoken");
const env = require("../../../configs/environment");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const doctor = await Doctor.findOne({ username });
    if (doctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exist",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    await Doctor.create({ ...req.body, password: encryptedPassword });

    return res.status(201).json({
      success: true,
      message: "Doctor registered successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ username: req.body.username });

    const encryptedPassword = await bcrypt.compare(
      req.body.password,
      doctor.password
    );
    if (!doctor || !encryptedPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid Username / Password",
      });
    }

    return res.status(201).json({
      success: true,
      data: {
        token: jwt.sign(doctor.toObject(), env.jwt_key, {
          expiresIn: 60 * 60,
        }),
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
