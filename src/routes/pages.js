const express = require('express');
const router = express.Router();

const { checkJWT } = require('../../middlewares/private');
const Reservation = require('../models/reservation');
const Catway = require('../models/catway')
const User = require('../models/user')

router.use((req, res, next) => {
  if (req.cookies && req.cookies.token) {
    req.headers['authorization'] = 'Bearer ' + req.cookies.token;
  }
  next();
});

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/dashboard', checkJWT, async (req, res) => {
  const reservations = await Reservation.find({userId: req.params.id});
  res.render('dashboard', { reservations: reservations, user: req.user });
});





router.get('/users', checkJWT, async (req, res) => {
  const users = await User.find();
  res.render('users', { users });
});

router.post('/users/add', checkJWT, async (req, res) => {
    const user = new User(
      {name: req.body.name, firstname: req.body.firstname, email: req.body.email, password: req.body.password}
      );
    await user.save();
    res.redirect('/users');
});

router.post('/users/update', checkJWT, async (req, res) => {
    await User.findByIdAndUpdate(
      req.body.userId,
      {name: req.body.name, firstname: req.body.firstname, email: req.body.email, password: req.body.password}
    );
    res.redirect('/users');
});

router.post('/users/delete', checkJWT, async (req, res) => {
  await User.findByIdAndDelete(req.body.userId);
  res.redirect('/users');
});





router.get('/catways', checkJWT, async (req, res) => {
  const catways = await Catway.find();
  res.render('catways', { catways });
});

router.post('/catways/add', checkJWT, async (req, res) => {
    const catway = new Catway(
      {catwayNumber: req.body.catwayNumber, catwayType: req.body.catwayType, catwayState: req.body.catwayState}
      );
    await catway.save();
    res.redirect('/catways');
});

router.post('/catways/update', checkJWT, async (req, res) => {
    await Catway.findByIdAndUpdate(
      req.body.catwayId,
      {catwayType: req.body.catwayType, catwayState: req.body.catwayState}
    );
    res.redirect('/catways');
});

router.post('/catways/delete', checkJWT, async (req, res) => {
  await Catway.findByIdAndDelete(req.body.catwayId);
  res.redirect('/catways');
});




router.get('/reservations', checkJWT, async (req, res) => {
  const reservations = await Reservation.find();
  res.render('reservations', { reservations });
});

router.post('/reservations/add', checkJWT, async (req, res) => {
    const reservation = new Reservation(
      {clientName: req.user.firstname + " " + req.user.name,
      boatName: req.body.boatName,
      catwayNumber: req.body.catwayNumber,
      startDate: req.body.startDate,
      endDate: req.body.endDate}
  );
    await reservation.save();
    res.redirect('/reservations');
});

router.post('/reservations/update', checkJWT, async (req, res) => {
    await Reservation.findByIdAndUpdate(
      req.body.reservationId,
      {catwayNumber: req.body.catwayNumber, startDate: req.body.startDate, endDate: req.body.endDate}
    );
    res.redirect('/reservations');
});

router.post('/reservations/delete', checkJWT, async (req, res) => {
    await Reservation.findByIdAndDelete(req.body.reservationId);
    res.redirect('/reservations');
});

router.get('/documentation', (req, res) => {
  res.render('documentation');
});


router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});




module.exports = router;