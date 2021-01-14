const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../app/models/User');

//Load User Model
module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email})
            .then(user => {
                if(!user){
                    console.log('That email is not register')
                    return done(null, false, { mess: true,message: 'That email is not register'});
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return  done(null, user);
                    }else{
                        console.log('Password incorrecr')
                        return done(null, false, {mess: true,message: 'Password incorrect'});
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })

    }))
    passport.serializeUser((user, done) => done(null, user.id))
    //chuyển đổi chuỗi thành đối tượng. Người nhận sau đó có thể giải mã chuỗi này để laays lị đối tượng ban đầu
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) =>{
            done(err, user);
        } )
    })
}