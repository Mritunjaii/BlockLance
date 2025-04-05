const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract.controller');
const { authenticate } = require('../middleware/auth');

router.post('/create', authenticate, contractController.createContract);
router.post('/release', authenticate, contractController.releasePayment);
router.get('/status/:address', authenticate, contractController.getContractStatus);

module.exports = router;