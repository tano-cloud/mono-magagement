const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const passport = require("passport");

//みんなの投稿
router.get('/', userController.displayMono);

router.post('/', userController.addMono)

router.get('/signup', userController.getSignUp)

router.post('/signup', userController.postSignUp)

router.get('/signin', userController.getSignIn)

// ログイン処理
router.post('/signin', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/signin',
    session: true
  }
));

router.get('/logout', userController.getLogOut)

router.post('/delete', userController.postDelete)

router.post('/edit', userController.postEdit)

module.exports = router;

