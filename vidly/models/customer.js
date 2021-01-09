const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 150 },
  phone: { type: Number, required: true },
  isGold: { type: Boolean, default: false },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
