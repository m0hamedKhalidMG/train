const express = require("express");
const router = express.Router();
const Train = require("../models/train");
const { requireRole } = require('./Middleware');

// Admin Dashboard
router.get("/",requireRole('Admin'), async (req, res) => {
  try {
    const trains = await Train.find();
    res.render("../views/admin.ejs", { trains });
  } catch (error) {
    console.error("Error fetching trains:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Add a new train
router.post("/add", requireRole('Admin'),async (req, res) => {
  const { train_no, origin, destination, departure, arrival } = req.body;

  try {
    const newTrain = new Train({ train_no, origin, destination, departure, arrival });
    await newTrain.save();
    res.redirect("/admin");
  } catch (error) {
    console.error("Error adding train:", error.message);
    res.status(500).send("Failed to add train");
  }
});

// Delete a train
router.post("/delete/:train_no",requireRole('Admin'), async (req, res) => {
  const train_no = req.params.train_no;

  try {
    await Train.deleteOne({ train_no });
    res.redirect("/admin");
  } catch (error) {
    console.error("Error deleting train:", error.message);
    res.status(500).send("Failed to delete train");
  }
});
router.post("/update",requireRole('Admin'), async (req, res) => {
    const { train_no, origin, destination, departure, arrival } = req.body;
  
    try {
      // await Train.updateOne(
      //   { train_no },
      //   { origin, destination, departure, arrival }
      // );
      res.redirect("/admin");
    } catch (error) {
      console.error("Error updating train:", error.message);
      res.status(500).send("Failed to update train");
    }
  });
module.exports = router;
