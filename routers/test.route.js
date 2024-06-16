import express from 'express'
import { createDB, createTable, healthCheck } from '../controller/textController.js'
const router = express.Router()

router.route('/health-check').get(healthCheck)
router.route('/createDatabase').post(createDB)
router.route('/createTable').post(createTable)






export default router