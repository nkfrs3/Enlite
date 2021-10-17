//this is just for reference, on how to set up file upload for aws
const express = require('express')
const asyncHandler = require('express-async-handler');
const {singlePublicFileUpload, singleMulterUpload, singleFileDelete} = require('../../awsS3');
const {Review, User, Shop, Checkin} = require('../../db/models');
const router = express.Router();


router.post(
  "/",
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { rating, comment, userId, shopId  } = req.body;
    const image = await singlePublicFileUpload(req.file);
    const review = await Review.create({  //to do change Table name and method.
    rating,
    comment,
    image,
    userId,
    shopId
    });
    console.log(review);
    // setTokenCookie(res, review);
    let associatedUser = user.findOne({where: {id: userId}})
    review.User = associatedUser;
    return res.json({
      review,
    });
  })
);

// get all reviews for each shop
router.get('/', asyncHandler(async (req, res) => {
   const allReviews = await Review.findAll()
    return res.json(allReviews);
}));

//get all reviews for a single user
router.get('/users/:id', asyncHandler(async(req,res)=> {
  const userId = parseInt(req.params.id);
  const review = await Review.findAll({include: {model: Shop, attributes: ['name', 'address', 'city', 'image']}, where:{
    userId,
  }, order: [['updatedAt', 'DESC']],
  })
  return res.json(review);
}))

// get all reviews for a single shop
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = req.params.id;

  const reviews = await Review.findAll({where: {shopId: id}, include: User, order: [["updatedAt", 'DESC']], limit: 20});
    return res.json(reviews);
  })
)
router.put('/:id',singleMulterUpload("image"), asyncHandler (async (req, res)=> {
  const id = req.params.id;
  const {comment, rating} = req.body;
  const image = await singlePublicFileUpload(req.file);
  await Review.update( {image, comment, rating}, { where: {id} } )

    const review = await Review.findOne({
      where: {
          id,
      }
    });

    return res.json(review)

}))

router.delete('/:id', asyncHandler(async(req, res)=> {
    const response = await Review.destroy( {where:{id: req.params.id}} );
  //  const awsDeleted = await singleFileDelete()
    res.json({status: 0, data: response});
}));

router.get('/recent', asyncHandler(async(req,res)=> {
  const recentReviews = await Review.findAll( { include: [{model: User, attributes: ['username', 'profileIcon', 'profileColor']}, {model: Shop, attributes: ['name']} ], order: [["createdAt", 'DESC']], limit: 5 })
  console.log('made it to request!!!')
  // const recentCheckins = await Checkin.findAll( { include: {model: User, attributes: ['username', 'profileIcon', 'profileColor']}, order: [["createdAt", 'DESC']], limit: 5 })
  const recentCheckins = await Checkin.findAll( { include: [{model: User, attributes: ['username', 'profileIcon', 'profileColor']}, {model: Shop, attributes: ['name']}], order: [["createdAt", 'DESC']], limit: 5 })
  let sortedValues = [...recentReviews, ...recentCheckins].sort((a,b) => b.createdAt - a.createdAt)
  console.log(sortedValues);
  // res.json({'ok': 'ok'})
  res.send(sortedValues);
 } ))

module.exports = router;
