const express = require('express')
const asyncHandler = require('express-async-handler');
const {Checkin} =require('../../db/models')
const router = express.Router();

// router.get('/', asyncHandler)


router.put('/', asyncHandler (async(req, res) => {
  const {userId, shopId} = req.body;

  const user = await Checkin.create({
    userId,
    shopId
  });
  console.log(user);
  return res.json(user);
}))





module.exports = router;
