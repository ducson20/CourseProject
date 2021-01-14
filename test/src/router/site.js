const express = require('express');
const passport = require('passport');
const { checkAuthenticated, checkNotAuthenticated } = require('../app/middlewares/Auth');


const router = express.Router();

const siteController = require('../app/controllers/SiteController');
router.get('/image', siteController.image);
router.get('/', checkAuthenticated, siteController.index);
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}),);
router.get('/login', checkNotAuthenticated, siteController.login);
router.post('/login', checkNotAuthenticated,
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }),
);
router.get('/register', checkNotAuthenticated, siteController.registerGet)
router.post('/register', checkNotAuthenticated, siteController.registerPost)
router.delete('/logout', siteController.logout);
module.exports = router;