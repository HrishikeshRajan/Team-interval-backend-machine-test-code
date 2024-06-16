import express from 'express'
import * as taskController from '../controller/taskController.js'
import uploadFile from '../utils/multer.utils.js';
const router = express.Router();

router.route('/create').post(taskController.create)
router.route('/update/:taskId').put(uploadFile.single('image'), taskController.update)
router.route('/remove').delete(taskController.remove)
router.route('/:taskId').get(taskController.getOne)


export default router;