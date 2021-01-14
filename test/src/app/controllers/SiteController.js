const Course = require('../models/Course');
const User = require('../models/User');
const { mutipleMongoosetoObject, mongooseToObject } = require('../../util/mongoose');
const bcrypt = require('bcrypt');
const { request } = require('express');
class SiteController {

    //[GET] /
    index(req, res, next) {
        //User callback
        // Course.find({}, function(err, courses){
        //     if(!err){
        //         res.json(courses);
        //     }else{
        //        next(err);
        //     }
        //User promise
        Course.find({})
            .then(function (courses) {
                // courses = courses.map(function(course) {
                //     return course.toObject();
                // }), 
                return res.render('home', {
                    name: req.user.firstName,
                    courses: mutipleMongoosetoObject(courses),
                });
            })
            .catch(function (err) {
                next(err);
                res.redirect('/login');
            })
        // res.render('home');
    }
    // GET /register
    registerGet(req, res, next) {
        res.render('register');
    }
    // POST /register
    async registerPost(req, res, next) {
        const { email, firstName, password, confirmPassword } = req.body;
        const errors = [];
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        if (!email || !firstName || !password || !confirmPassword) {
            errors.push({ message: 'Please fill in all fields' });
            console.log('Please fill in all fields');
        }
        if (password != confirmPassword) {
            errors.push({ message: 'Password do not match' });
            console.log('Password do not match');
        }
        if (password.length < 6) {
            errors.push({ message: 'Passwod should be at least 6 characters' });
            console.log('Passwod should be at least 6 characters');
        }
        if (errors.length > 0) {
            res.render('register', {
                errors,
                firstName,
                email,
                password,
                confirmPassword,
            })

        } else {
            User.findOne({ email: email })
                .then(user => {
                    if (user) {
                        errors.push({ message: 'Email is already registered' });
                        console.log('Email is already registered')
                        res.render('register', {
                            errors,
                            email,
                            firstName,
                            password,
                            confirmPassword,
                        })
                    } else {
                        const user = new User({
                            firstName: req.body.firstName,
                            email: req.body.email,
                            password: hashPassword,
                        });
                        console.log(req.body);
                        user.save()
                            .then(function () {
                                req.flash('success', 'You are now registered and can login');
                                res.redirect('/login');
                            })
                            .catch(next)
                    }
                })
        }
    }
    // GET /login
    login(req, res) {
        res.render('login');
    }
    // DELETE /auth/logout
    logout(req, res) {
        req.logOut();
        res.redirect('/login');
    }


    // [GET /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;

// const newController = require('./NewsController')