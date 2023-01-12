const express = require('express');
const Task = require('../models/taskModel');
const taskController = require('../controllers/apiTaskController');
const router = express.Router();

router.post('/apitasks',taskController.createTask);
router.get('/Alltasks',taskController.fetchTasksDb);
router.get('/gettask/:id',taskController.getTask);
router.delete('/delTask/:id',taskController.delTask);
router.put('/updateTask/:id',taskController.updateTask);
module.exports = router;