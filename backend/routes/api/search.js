const express = require('express')
const asyncHandler = require('express-async-handler');
const { Op } = require("sequelize");
const {Shop} = require('../../db/models');
const router = express.Router();

router.get('/live/:term', asyncHandler (async (req, res) => {
  const term = req.params.term;

  const results = await Shop.findAll({limit: 20, where: {
    [Op.or]: [
      {name: { [Op.iLike]: `${term}%` }},
      {address: { [Op.iLike]: `${term}%` }},
      {city: { [Op.iLike]:  `${term}%` }},
    ]
  }, attributes: {exclude: ['lat', 'long', 'createdAt', 'updatedAt']}
});

  return res.json(results);

}))

module.exports = router;
