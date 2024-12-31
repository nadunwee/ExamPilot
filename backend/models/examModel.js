const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const examSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  module_code: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  subject_area: {
    type: String,
    require: true,
  },
  module: {
    type: String,
    require: true,
  },
  semester: {
    type: String,
    require: true,
  },
  assigned_lecturer: {
    type: String,
    require: true,
  },
  start_data: {
    type: String,
    require: true,
  },
  no_of_questions: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Exam", examSchema);
