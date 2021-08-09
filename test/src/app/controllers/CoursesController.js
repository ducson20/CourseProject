const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CoursesController {
    //Son is member1 branch
    // [GET /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(function (course) {
                console.log(course)
                return res.render('courses/show', {
                    name: req.user.firstName,
                    course: mongooseToObject(course)
                    
                });
            })
            .catch(function (err) {
                next(err);
            })
    }
    // GET /courses/create
    create(req, res, next) {
        res.render('courses/create',{
            name: req.user.firstName,
        })
    }

    //  POST /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        console.log(`${req.body.videoId}`);
        const course = new Course(req.body);
        course.save()
            .then(function () {
                res.redirect('/me/stored/courses')
            })
            .catch(next)
    }

    //  GET /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(function (course) {
                return res.render('courses/edit',
                    {
                        course: mongooseToObject(course),
                    })
            })
            .catch(next)
    }

    // PUT /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(function () {
                return res.redirect('/me/stored/courses');
            })
            .catch(next);
    }

    // DELETE /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(function () {
                return res.redirect('back');
            })
            .catch(next)
    }
    // DELETE /courses/:id/force
    deleteForce(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(function () {
                return res.redirect('back');
            })
            .catch(next)
    }
    // PATCH /courses/:id/restore
    deleteRestore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(function () {
                return res.redirect('back');
            })
            .catch(next)
    }
    // PATCH /courses/handle-form-actions
    handleFormAActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: {$in: req.body.courseIds} })
                    .then(function () {
                        return res.redirect('back');
                    })
                    .catch(next)
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}

module.exports = new CoursesController;

// const newController = require('./NewsController')