const { Router } = require("express");
const Customer = require("../models/customers");
const { validateCustomer } = require("../utils");

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const customers = await Customer.find();
    res.send(customers);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const customer = await Customer.findById(id);
    if (!customer)
      return res.status(404).send("Can not find customer with this ID");

    res.send(customer);
  } catch (error) {
    console.log(error);
    res.send("not found");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.send(error.details[0].message);

  try {
    let customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold || false,
    });

    customer = await customer.save();
    res.send(customer);
  } catch (error) {
    console.log(error);
    res.send("unable to create customer");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  //   const { error } = validateCustomer(req.body);
  //   if (error) return res.send(error.details[0].message);

  try {
    const customer = Customer.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          isGold: req.body.isGold || false,
        },
      },
      { new: true }
    );

    res.send(customer);
  } catch (error) {
    console.log(error);
    res.send("unable to update customer");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Customer.deleteOne({ _id: id });
    res.send("done");
  } catch (error) {
    console.log(error);
    res.send("failed");
  }
});

module.exports = router;
