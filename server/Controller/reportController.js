const Report = require('../Models/Reports');

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('reportMaker', 'username');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ message: 'Error creating report', error: error.message });
  }
};

