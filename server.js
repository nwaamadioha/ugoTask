import express from "express";
import passport from "passport";
import session from "express-session";
import 'dotenv/config';
import ejs from "ejs";
import bodyParser from "body-parser";
import Sequelize  from "sequelize";
import User from "./models/User.js";
import authRouter from "./routes/auth.js"
import homeRouter from "./routes/index.js"
import { signupStrategy, signinStrategy  } from "./config/passport/passport.js"


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// session secret 
app.use(session({ 
    secret: 'SomethingICantForget',
    resave: false, 
    saveUninitialized:false
}));


// For Passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Strategy
signupStrategy(passport, User);
signinStrategy(passport, User);

// Passport serializer
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
// Passport deserializer  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

app.use("/", homeRouter);
app.use("/", authRouter);



const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});

const connect = async () => {
    try {
      await sequelize.sync({ force: false });
    //   await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };



app.listen(3000, function(){
    console.log("Server is running on 3000");
    connect();
})