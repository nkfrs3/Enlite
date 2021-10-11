//this is just for reference, on how to set up file upload for aws
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3');

router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const image = await singlePublicFileUpload(req.file);
    const review = await User.signup({  //to do change Table name and method.
      username,
      email,
      password,
      image,
    });

    setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);
