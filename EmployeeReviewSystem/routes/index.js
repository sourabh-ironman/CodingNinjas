const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

router.get('/sign-in', homeController.signIn);
router.get('/sign-up', homeController.signUp);
router.get('/sign-out', homeController.signOut);

router.post('/create-employee', homeController.createEmployee);

router.post('/create-session', homeController.createSession);

router.get('/delete-employee', homeController.deleteEmployee);

router.get('/make-admin',homeController.makeAdmin);

router.post('/admin-create-employee', homeController.adminCreateEmployee);

router.post('/user-details-edit', homeController.userDetailsEdit);

router.post('/create-performance-review', homeController.createPerformanceReview);

router.post('/edit-performance-review', homeController.editPerformanceReview);

router.post('/create-feedback-request', homeController.createFeedbackRequest);

router.post('/create-feedback', homeController.createFeedback);

module.exports = router;