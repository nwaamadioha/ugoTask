import express from "express";
import passport from "passport";

const router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});


router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post("/register", passport.authenticate('local-signup', {
    successRedirect: '/blog',
    failureRedirect: '/register'
  }

));

router.post("/login", passport.authenticate('local-signin', {
    successRedirect: '/blog',
    failureRedirect: '/login'
  }

));

router.get("/logout", function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

export default router;