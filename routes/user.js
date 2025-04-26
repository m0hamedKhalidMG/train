const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

router.get('/signup', (req, res) => {
    res.render('signup');
  });
  
  // Handle Signup
  router.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword, role });
      await newUser.save();
      res.redirect('/user/login');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error signing up');
    }
  });
  
  // Render Login Page
  router.get('/login', (req, res) => {
    res.render('login');
  });
  
  // Handle Login
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = null
          //await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        console.log(user)

        // Store user info in session
        req.session.user = { id: user._id, role: user.role };
        if (user.role === 'Admin') res.redirect('/admin');
        else if (user.role === 'Train Operator') res.redirect('/train-operator');
        else if (user.role === 'Station Manager') res.redirect('/station-manager');
        else res.redirect('/passenger');
      } else {
        res.status(401).send('Invalid email or password');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error logging in');
    }
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/user/login');
  });
  module.exports = router;
