import express from "express";

const router = express.Router();

router.get("/", function(req, res){
    res.render("home")
});

router.get("/blog", function(req, res){
    res.render("blog")
});

export default router;