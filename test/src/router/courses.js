const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');
router.get('/create',coursesController.create);
router.post('/store',coursesController.store);
router.get('/:id/edit',coursesController.edit);
router.post('/handle-form-actions', coursesController.handleFormAActions);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.deleteRestore);
router.delete('/:id', coursesController.delete);
router.delete('/:id/force', coursesController.deleteForce);
router.get('/:slug', coursesController.show);

module.exports = router;