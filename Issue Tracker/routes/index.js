const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/',homeController.home);

router.post('/create-project', homeController.createProject);

router.get('/project-details/:id', homeController.projectDetails);

router.post('/project/:id/create-issue', homeController.createIssue);

router.post('/project/:id/filter-issue', homeController.filterIssue);

router.post('/project/:id/search-issue', homeController.searchIssue)



module.exports = router;