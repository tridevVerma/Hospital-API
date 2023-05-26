const Doctor = require("../../../models/Doctor");
const jwt = require("jsonwebtoken");
const env = require("../../../configs/environment");
const bcrypt = require("bcrypt");

// Register Doctors
module.exports.register = async (req, res) => {
  try {
    // Check if Doctor exists --> throw error
    const { username, password } = req.body;
    const doctor = await Doctor.findOne({ username });

    if (doctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exist",
      });
    }

    // Encrypt password with bcrypt
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
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
    // Find doctor with username
    const doctor = await Doctor.findOne({ username: req.body.username });

    // decrypt found doctor's password and match with submitted password
    const encryptedPassword = await bcrypt.compare(
      req.body.password,
      doctor.password
    );

    // If doctor not found or password not match --> throw error
    if (!doctor || !encryptedPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid Username / Password",
      });
    }

    // send jwt token with expiry of 1 hour
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
