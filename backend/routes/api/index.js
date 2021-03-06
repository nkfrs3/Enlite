const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const shopsRouter = require('./shops.js');
const reviewsRouter = require('./reviews.js')
const searchRouter = require('./search')
const checkinRouter = require('./checkins');
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/shops', shopsRouter);
router.use('/reviews', reviewsRouter);
router.use('/search', searchRouter);
router.use('/checkin', checkinRouter)
//  Test Routes for auth

//    GET /api/set-token-cookie
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      },
    })
  setTokenCookie(res, user);
  return res.json({ user });
}));

const { restoreUser } = require('../../utils/auth.js');
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);



module.exports = router;
