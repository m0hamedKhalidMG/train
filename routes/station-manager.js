const express = require("express");
const router = express.Router();
const Platform = require("../models/platform"); // Import the Platform model
const { requireRole } = require('./Middleware');

// Display the Station Manager Dashboard
router.get("/",requireRole('Station Manager'), async (req, res) => {
  try {
    const platforms = await Platform.find(); // Fetch all platforms from the database
    res.render("station-manager", { platforms });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
// View Reports (Platform Data)
router.get("/reports", async (req, res) => {
    try {
      const platforms = await Platform.find(); // Fetch all platforms from the database
      res.render("reports", { platforms }); // Render data to the "reports" page
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
  
// Add a New Platform
router.post("/add", requireRole('Station Manager'),async (req, res) => {
  const { platform_no, train_no, arrival, departure, status } = req.body;

  try {
    const newPlatform = new Platform({
      platform_no,
      train_no,
      arrival,
      departure,
      status,
    });

    await newPlatform.save(); // Save the new platform to the database
    res.redirect("/station-manager");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Delete a Platform
router.post("/delete/:id",requireRole('Station Manager'), async (req, res) => {
  const platformId = req.params.id;

  try {
    await Platform.findByIdAndDelete(platformId); // Delete the platform by its ID
    res.redirect("/station-manager");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
