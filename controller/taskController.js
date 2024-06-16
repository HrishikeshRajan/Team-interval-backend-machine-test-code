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
    
    const { heading, description, dateTime, priority, imageUrl } = req.body;
    const q = "INSERT INTO task SET ?";
    connection.query(q, { heading, description, dateTime, priority, image:imageUrl  }, (err, result) => {
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
    const {heading, description, dateTime, imageUrl, priority,  id } = req.body;

    const q = `UPDATE task SET heading = ?, description = ?, dateTime = ?, image = ?, priority = ? WHERE id = ?`;

    connection.query(q, [heading, description, dateTime, imageUrl, priority, id], (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
})


/**
 * Fetch single task by taskId
 * @param {string} taskId
 * @returns return single task
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
 * Fetch all tasks
 * @param {string} taskId
 * @returns list of tasks
 *  */
export const getAll = asyncHandler((req,res,next) => {
    const q = `SELECT * FROM task ORDER BY dateTime ASC`;

    connection.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
})

/**
 * Fetch sort by priority
 * @param {string} taskId
 * @returns sorted tasks
 */
export const sortByPriority = asyncHandler((req,res,next) => {

    const { sort } = req.query;

    let orderByClause = '';
    switch (sort) {
        case 'low':
            orderByClause = `
                ORDER BY 
                    CASE priority
                        WHEN 'low' THEN 1
                        WHEN 'medium' THEN 2
                        WHEN 'high' THEN 3
                    END
            `;
            break;
        case 'medium':
            orderByClause = `
                ORDER BY 
                    CASE priority
                        WHEN 'medium' THEN 1
                        WHEN 'low' THEN 2
                        WHEN 'high' THEN 3
                    END
            `;
            break;
        case 'high':
            orderByClause = `
                ORDER BY 
                    CASE priority
                        WHEN 'high' THEN 1
                        WHEN 'medium' THEN 2
                        WHEN 'low' THEN 3
                    END
            `;
        break;
            case 'all':
                orderByClause = `ORDER BY dateTime ASC`
                break;
        default:
            orderByClause = `ORDER BY dateTime ASC`;
    }
const q = `SELECT * FROM task ${orderByClause}`
    connection.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
})


