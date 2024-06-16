import asyncHandler from 'express-async-handler'
import connection from '../config/config.js'
/**
 * Test controller to check server is running or not.
 */
export const healthCheck = asyncHandler((req,res) => {
    res.status(200).json({success: true, message: 'Server is live'})
})



export const createDB = (req, res) => {
    let q = 'CREATE DATABASE task';
    connection.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("DB created");
    })
}



export const createTable = asyncHandler(async (req,res,next) => {
    const q = 'CREATE TABLE task(id int AUTO_INCREMENT, heading VARCHAR(255), description VARCHAR(255), dateTime VARCHAR(255), priority VARCHAR(255), image VARCHAR(255), PRIMARY KEY(id))'
    connection.query(q, (err, result) => {
        if (err) throw err;
        console.log(result)
        return res.status(201).json("TABLE CREATED");
    });

})
