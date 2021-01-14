const Course = require('../models/Course');
const { mutipleMongoosetoObject } = require('../../util/mongoose');

class MeController {

    // [GET /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            // Destructuring cú pháp paramator là mảng 
            .then(function ([courses, deletedCount]) {
                res.render('me/stored-courses', {
                    name: req.user.firstName,
                    //deletedCount là phần tử [1]
                    deletedCount,
                    //Courses là phần tử [0]
                    courses: mutipleMongoosetoObject(courses),
                })
            })
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then(function(deletedCount){
        //         //  console.log(deletedCount);
        //     })
        //     .catch(next);

        // Course.find({})
        //     .then(function (courses) {
        //         return res.render('me/stored-courses', {
        //             courses: mutipleMongoosetoObject(courses)
        //         });
        //     })
        //     .catch(next);
    }
    // [GET /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(function (courses) {
                return res.render('me/trash-courses', {
                    name: req.user.firstName,
                    courses: mutipleMongoosetoObject(courses)
                });
            })
            .catch(next);
    }

}

module.exports = new MeController;

// const newController = require('./NewsController')