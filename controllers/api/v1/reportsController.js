const Report = require("../../../models/Report");
const Patient = require("../../../models/Patient");

// Create a report (authentication required)
module.exports.createReport = async (req, res) => {
  try {
    // Check if patient exist --> if not throw error
    const patient = await Patient.findOne({ _id: req.params.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient don't exist",
      });
    }

    // create new report
    const report = await Report.create({
      patient: req.params.id, // From passed parameters
      doctor: req.user._id, // From token attached with request
      status: req.body.status, // From body passed with request
    });

    // update patient's reports array with his/her latest report and save it
    await patient.reports.push(report._id);
    await patient.save();

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

// Get all reports of a user (authentication required)
module.exports.allReports = async (req, res) => {
  try {
    // Find patient with id passed in params
    // populate their reports and doctor allotted to them
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

// Filter out reports with specific status term (authentication required)
module.exports.filter = async (req, res) => {
  try {
    // Find reports with status from params
    // populate patient and doctor of that report
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
