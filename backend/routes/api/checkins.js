const express = require('express')
const asyncHandler = require('express-async-handler');
const {Checkin, Shop} =require('../../db/models')
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

//checkins by userId
router.get('/:id', asyncHandler(async(req,res)=>{
  const userId = req.params.id;

  const checkins = await Checkin.findAll({include: {model: Shop, attributes: ['name','city',]}, where:{
    userId,
  }, order: [['updatedAt', 'DESC']],
  })
  return res.json(checkins);
  })
)



module.exports = router;
