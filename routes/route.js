const express = require('express'),
  router = express.Router(),
  userController = require('../controller/UserController'),
  passport = require("passport");

//みんなの投稿
router.get('/', userController.displayMono);

router.post('/', userController.addMono);

router.get('/signup', userController.getSignUp);

router.post('/signup', userController.postSignUp);

router.get('/signin', userController.getSignIn);

// ログイン処理
router.post('/signin', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/signin',
    session: true
  }
));

router.get('/logout', userController.getLogOut);

router.post('/delete', userController.postDelete);

router.post('/edit', userController.postEdit);

router.post('/sortexp', userController.postExpire);

router.post('/sortexp2', userController.postExpire2);

router.post('/sortexp3', userController.postExpire3);

module.exports = router;

