const Report = require("../../../models/Report");
const Patient = require("../../../models/Patient");

module.exports.createReport = async (req, res) => {
  try {
    const status = req.body.status;
    const report = await Report.create({
      patient: req.params.id,
      doctor: req.user._id,
      status,
    });

    await Patient.updateOne(
      { _id: req.params.id },
      { $push: { reports: report._id } }
    );
    return res.status(201).json({
      success: true,
      data: {
        report,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.allReports = async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id }).populate({
      path: "reports",
      model: "Report",
      select: "doctor status date",
      options: {
        sort: { date: -1 },
      },
      populate: {
        path: "doctor",
        model: "Doctor",
        select: "username",
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        patient,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.filter = async (req, res) => {
  try {
    const reportsFound = await Report.find({
      status: req.params.status,
    }).populate([
      { path: "patient", model: "Patient", select: "name age phone" },
      { path: "doctor", model: "Doctor", select: "username" },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        reportsFound,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
