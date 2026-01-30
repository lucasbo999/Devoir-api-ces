
const Catway = require('../models/catway');

exports.getAll = async(req, res) => {

  try {
    let catways = await Catway.find();

        return res.status(200).json(catways);
  } catch (error) {
        return res.status(501).json(error);
  }
}

exports.getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    let catways = await Catway.findById(id);

    if (catways) {
      return res.status(200).json(catways);
    }

    return res.status(404).json('catway_not_found');
  } catch (error) {
    return res.status(501).json(error);
  }
}

exports.add = async (req, res, next) => {

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        catwaytype: req.body.catwayType,
        catwayState: req.body.catwayState
    });

    try {
        let catways = await Catway.create(temp);

        return res.status(201).json(catways);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const id = req.params.id
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        catwaytype: req.body.catwayType,
        catwayState: req.body.catwayState
    });

    try {
        let catways = await Catway.findOne({ _id : id});

        if (catways) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catways[key] = temp[key];
                }
            });

            await catways.save();
            return res.status(201).json(catways);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id

    try {
        await Catway.deleteOne({ _id : id });

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}