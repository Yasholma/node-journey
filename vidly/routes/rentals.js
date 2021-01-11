const { Router } = require("express");
const { validateRental } = require("../utils");
const Rental = require("../models/rental");
const Customer = require("../models/customer");
const Movie = require("../models/movie");

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const rentals = await Rental.find().populate("customer").populate("movie");
    res.send(rentals);
  } catch (error) {
    console.error(error);
    res.send("error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const rental = await Rental.findById(id);
    if (!rental) return res.send("invalid ID");
    res.send(rental);
  } catch (error) {
    console.error(error);
    res.send("error");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.send(error.details[0].message);

  try {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.send("Invalid customer");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.send("Invalid movie");

    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold,
      },
      movie: {
        _id: movie.id,
        title: movie.title,
        genre: movie.genre,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    const result = await rental.save();

    res.send(result);
  } catch (error) {
    console.error(error);
    res.send("error");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Rental.deleteOne({ _id: id });
    if (!result.deletedCount) return res.send("Invalid id");
    res.send("deleted");
  } catch (error) {
    console.error(error);
    res.send("error");
  }
});

module.exports = router;
