const express = require('express')
const asyncHandler = require('express-async-handler');
const { User, Shop } = require('../../db/models/');

const router = express.Router();

router.get('/', asyncHandler(async(req,res)=>{
  const allshops = await Shop.findAll( { order: [['name'] ]})
  console.log(allshops);
  return res.json(allshops);

}))

router.get('/:shopId(\\d+)', asyncHandler(async(req,res) => {
  const shopId = req.params.shopId;

  const shop = await Shop.findByPk(shopId)

  console.log(shop)
  return res.json(shop);

}))


module.exports = router;
