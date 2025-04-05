const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { client, freelancer } = require('../middleware/role');

router.post('/', authenticate, authorize(client), jobController.createJob);
router.get('/', authenticate, jobController.getJobs);
router.get('/:id', authenticate, jobController.getJobDetails);
router.post('/:id/apply', authenticate, authorize(freelancer), jobController.applyForJob);
router.post('/:id/accept/:freelancerId', authenticate, authorize(client), jobController.acceptApplication);
router.get('/:id/applications', authenticate, authorize(client), jobController.getJobApplications);

module.exports = router;