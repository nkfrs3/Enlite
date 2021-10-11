//this is just for reference, on how to set up file upload for aws
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3');
const {Review } = require('../../db')

router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { rating, comment, image  } = req.body;
    const image = await singlePublicFileUpload(req.file);
    const review = await Review.signup({  //to do change Table name and method.
    rating,
    comment,
    image,
    });

    setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);
