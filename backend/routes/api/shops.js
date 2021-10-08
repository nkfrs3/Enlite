const express = require('express')
const asyncHandler = require('express-async-handler');
const { User, Shop } = require('../../db/models/');

const router = express.Router();

router.get('/', asyncHandler(async(req,res)=>{
  const allshops = await Shop.findAll()
  console.log(allshops);
  return res.json(allshops);

}))

module.exports = router;
