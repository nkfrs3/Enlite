const express = require('express')
const router = express.Router();
const {check} = require('express-validator')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');



const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.get('/:id', asyncHandler(async (req,res)=> {
  const user = await User.findByPk(req.params.id);
  res.json(user);
}))

router.put('/:id', asyncHandler(async(req,res) => {
  const id = req.params.id;
  const {color, icon} = req.body;
  await User.update( {profileIcon: icon, profileColor: color}, {where: {id}});

  const user = await User.findOne({where: {
    id,
  }})

  return res.json(user);
}));

// router.delete('/:id/:password', asyncHandler(async(req,res)=> {
//   const {password, id} = req.params;
//   const userToDelete = await User.scope('loginUser').findOne({where: {id}});
//   console.log(userToDelete, 'User2delete');
//   const isValidated = await userToDelete.validatePassword(password)
//   if (isValidated){
//     await userToDelete.destroy();
//     res.send({status: "success"});
//   }else res.json({status: "failed"});
// }))
module.exports = router;
