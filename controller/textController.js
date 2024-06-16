import asyncHandler from 'express-async-handler'

/**
 * Test controller to check server is running or not.
 */
export const healthCheck = asyncHandler((req,res) => {
    res.status(200).json({success: true, message: 'Server is live'})
})