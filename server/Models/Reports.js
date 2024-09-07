const { Schema, model, default: mongoose } = require("mongoose");

const reportSchema = new Schema({
  reportMaker: String,
  reportDetails: String,
  isResolved: { type: Boolean, default: false },
  actionDetails:String
});

const Report = model("Report", reportSchema);

module.exports = Report;
