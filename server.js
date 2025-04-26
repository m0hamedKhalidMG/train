const express = require("express");
const mongoose = require("mongoose");
const Train = require("./models/train");
const connectDB = require("./database");
const adminRoutes = require("./routes/admin");
const passRoutes = require("./routes/passenger");
const station = require("./routes/station-manager");
const train_operator = require("./routes/train_operator");
const user = require("./routes/user");
const session = require('express-session');

const app = express();
const PORT = 3000;
app.use(
    session({
      secret: 'your-secret-key', // A secret key used to sign the session ID cookie
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // 'secure' should be true in production with HTTPS
    })
  );
// Middleware
app.use(express.static("public")); // Serve static files like CSS/JS
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Use EJS for templating
app.use('/styles', express.static('public'));

// Connect to MongoDB
connectDB();


app.get('/', (req, res) => {
    res.render('index',{ user: req.session.user }); // Render index.ejs
  });
  
app.use("/admin", adminRoutes);
app.use("/Passenger", passRoutes);
app.use("/station-manager", station);
app.use("/train-operator", train_operator);
app.use("/user", user);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
