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
import connection from '../config/config.js';

/**
 * Create new task
 * @param {string} heading
 * @param {string} description
 * @param {string} date
 * @param {string} time
 * @returns new task
 */
export const create = asyncHandler(async (req,res,next) => {
    
    const { heading, description, dateTime, priority, image } = req.body;
    const q = "INSERT INTO task SET ?";
    connection.query(q, { heading, description, dateTime, priority, image  }, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
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

     const q = `DELETE FROM task WHERE id=${req.params.taskId}`;

     connection.query(q, (err, result) => {
         if (err) return res.json(err);
         return res.status(200).json({ data: "task deleted" });
     });
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
    const q = `UPDATE task SET ? where id=${req.params.taskId}`;

    const { heading, description, date, priority, image='texturl' } = req.body;
    connection.query(q, { heading, description, date, priority, image }, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
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
    const q = `SELECT * FROM task where id=${req.params.taskId}`;

    connection.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result[0]);
    });
})

/**
 * Fetch task by taskId
 * @param {string} taskId
 * @returns deleted task id
 */
export const getAll = asyncHandler((req,res,next) => {
    const q = `SELECT * FROM task ORDER BY priority ASC`;

    connection.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
})


