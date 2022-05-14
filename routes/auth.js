import 'dotenv/config';
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import Post from "../models/Post.js";
const router = express.Router();




router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get("/logout", function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});


//protected route
router.get("/posts", authenticateToken, (req, res) => {
  res.render("posts")
  // res.json(posts.filter(post=>post.username === req.user.name))
  
})

router.post("/login", 
  passport.authenticate('local-signin', { failureRedirect: '/login', failureMessage: true}), 
  function(req, res){
    const username = req.user.username 
    const user = {name: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
    
    // res.redirect('/blog' );
  }
);

function authenticateToken (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null ) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.json({success: false, message: "Failed to authenticate token"})
    req.user = user
    next()
  })
}



router.post("/posts", async function(req, res){
  const postContent = req.body.content;
  const newPost = Post.build({ content: postContent,arthur: req.user });
  await newPost.save();
  res.status(200).send("post saved")
})

router.post("/register", 
  passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register'
  })
);





export default router;