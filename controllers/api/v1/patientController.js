const Patient = require("../../../models/Patient");

// Register patient (requires authentication)
module.exports.register = async (req, res) => {
  try {
    // Check if patient exist
    const patient = await Patient.findOne({ phone: req.body.phone });
    if (patient) {
      return res.status(400).json({
        success: false,
        message: "Patient already exists",
        data: {
          patient,
        },
      });
    }

    // Create new patient
    const newPatient = await Patient.create({ ...req.body });

    return res.status(201).json({
      success: true,
      data: {
        newPatient,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
