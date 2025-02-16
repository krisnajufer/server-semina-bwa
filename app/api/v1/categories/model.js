const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, "Name is too short"],
      maxLength: [20, "Name is too long"],
      required: [true, "Name is required"],
    },
  },
  { timestramps: true }
);

module.exports = model("Category", categorySchema);
