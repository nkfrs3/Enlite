//this is just for reference, on how to set up file upload for aws
const express = require('express')
const asyncHandler = require('express-async-handler');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3');
const {Review, User} = require('../../db/models');
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

    return res.json({
      review,
    });
  })
);

// get all reviews for each shop
router.get('/', asyncHandler(async (req, res) => {
   const allReviews = await Review.findAll()
    console.log(allReviews)
    return res.json(allReviews);
}));

// get all reviews for a single shop
router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;

  const reviews = await Review.findAll({where: {shopId: id}, include: User, order: [["updatedAt", 'DESC']], limit: 20});

    console.log(reviews)
    return res.json(reviews);
  })
)
router.put('/:id', asyncHandler (async (req, res)=> {
  // const {}

}))


module.exports = router;
