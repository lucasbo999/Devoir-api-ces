const Reservation = require('../models/reservation');

exports.getAll = async (req, res) => {
  const catwayNumber = req.params.id;

  try {
    let reservations = await Reservation.find({ catwayNumber: catwayNumber });
    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.getById = async (req, res, next) => {
  const idReservation = req.params.idReservation;
  const catwayNumber = req.params.id;

  try {
    let reservation = await Reservation.findOne({
      _id: idReservation,
      catwayNumber: catwayNumber
    });

    if (reservation) {
      return res.status(200).json(reservation);
    }

    return res.status(404).json('reservation_not_found');
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.add = async (req, res, next) => {
  const catwayNumber = req.params.id;

  const temp = {
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    catwayNumber: catwayNumber,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut
  };

  try {
    let reservation = await Reservation.create(temp);
    return res.status(201).json(reservation);
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.update = async (req, res, next) => {
  const idReservation = req.params.idReservation;
  const catwayNumber = req.params.id;

  const temp = {
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut
  };

  try {
    let reservation = await Reservation.findOne({
      _id: idReservation,
      catwayNumber: catwayNumber
    });

    if (reservation) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          reservation[key] = temp[key];
        }
      });

      await reservation.save();
      return res.status(201).json(reservation);
    }

    return res.status(404).json('reservation_not_found');
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.delete = async (req, res, next) => {
  const idReservation = req.params.idReservation;
  const catwayNumber = req.params.id;

  try {
    await Reservation.deleteOne({
      _id: idReservation,
      catwayNumber: catwayNumber
    });

    return res.status(204).json('delete_ok');
  } catch (error) {
    return res.status(501).json(error);
  }
};