const { Schema, model } = require("mongoose");

const rentalSchema = new Schema({
  customer: {
    type: new Schema({
      name: { type: String, required: true, minlength: 3, maxlength: 150 },
      phone: { type: Number, required: true },
      isGold: { type: Boolean, default: false },
    }),
    required: true,
  },
  movie: {
    type: new Schema({
      title: { type: String, required: true, trim: true },
      genre: {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
      numberInStock: { type: Number, default: 0, min: 0, max: 255 },
      dailyRentalRate: { type: Number, default: 0, min: 0, max: 255 },
    }),
    required: true,
  },
  dateOut: { type: Date, required: true, default: Date.now() },
  dateReturned: Date,
  rentalFee: { type: Number, min: 0 },
});

const Rental = model("Rental", rentalSchema);

module.exports = Rental;
