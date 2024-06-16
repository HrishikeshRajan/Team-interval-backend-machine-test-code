import express from 'express'
import * as taskController from '../controller/taskController.js'
const router = express.Router();

router.route('/create').post(taskController.create)
router.route('/update/:taskId').put(taskController.update)
router.route('/remove/:taskId').delete(taskController.remove)
router.route('/list/all').get(taskController.getAll)
router.route('/:taskId').get(taskController.getOne)



export default router;