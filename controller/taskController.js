/**
 * controllers
 * 
 * 1) Add task
 * 2) Edit task
 * 3) Delete task
 * 4) Show single task
 * 
 */

import asyncHandler from 'express-async-handler'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


let arr = []
const id = Math.random() * 100;


/**
 * Create new task
 * @param {string} heading
 * @param {string} description
 * @param {string} date
 * @param {string} time
 * @returns new task
 */
export const create = asyncHandler((req,res,next) => {

     const image = req.files.image

     
     if(image){
      
        const parentDir = path.resolve(__dirname, '..');
        const targetDir = path.join(parentDir, 'assets');

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        const imagePath = path.join(targetDir, `image-${id}.jpg`);
      
        image.mv(imagePath, (err) => {
            if (err) {
                return next(err);
            }
        });
     }

    const task  ={id, ...req.body, image:req.file}

    

    arr.push(task)
    res.json(task)
    return
})

/**
 * Delete the task by id
 * @param {string} taskId
 * @returns deleted task id
 */
export const remove = asyncHandler((req,res,next) => {   
     
     if(!req.params.taskId){
        throw new Error('Please select a task')
     }

      arr = arr.filter((task) => task.id !== req.params.taskId)
    res.json({message:arr, status:success})
})

/**
 * Updates task fields
 * @param {string} heading
 * @param {string} description
 * @param {string} date
 * @param {string} time
 * @returns  updated task
 */
export const update = asyncHandler((req,res,next) => {

    if(!req.params.taskId){
        throw new Error('Please provide a taskId')
    }

    const taskIndex = arr.indexOf((task) => task.id === req.params.taskId)
    const task = arr[taskIndex]
    const newTask = {...task, ...req.body}
          if(req.file){
            newTask.image = req.file
          }

          arr[taskIndex] = newTask;

    res.json({message:newTask, success:200})
})


/**
 * Fetch task by taskId
 * @param {string} taskId
 * @returns deleted task id
 */
export const getOne = asyncHandler((req,res,next) => {
    if(!req.params.taskId){
        throw new Error('Please provide a taskId')
    }
    const task = arr.find((task) => task.id.toString() === req.params.taskId.toString())
    res.json({message:task, success:true})
})

