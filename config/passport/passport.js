
import bcrypt from 'bcrypt';
import LocalStrategy from "passport-local";


export const signupStrategy = (passport, User) => {
    
    passport.use('local-signup', new LocalStrategy.Strategy(
 
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
    
        },
        function(req, email, password, done) {
            const generateHash = function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
         
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
         
                } else {
                    const userPassword = generateHash(password);
                    const data =
                        {
                            username: req.body.username,
                            email: email,
                            password: userPassword,     
                        };
                
                    User.create(data).then(function(newUser, created) {  
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
         
                    });
         
                }
         
            });
        }
    ));
}




export const signinStrategy = (passport, User) => {
    passport.use('local-signin', new LocalStrategy.Strategy(
 
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
    
        },
        function(req, email, password, done) {
            const isValidPassword = function(userpass, password) {
                return bcrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
     
     
                const userinfo = user.get();
                return done(null, userinfo);
     
     
            }).catch(function(err) {
     
                console.log("Error:", err);
     
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
     
            });
     
     
        }
    ))
};


 
 
 
 

 
