const pool = require("../config/db");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.setReminder = catchAsyncErrors(async (req, res, next) => {

    const { todoId } = req.params;

    const addQuery = `Insert into reminder (task_id, email) values($1,'charchilk4@gmail.com') returning task_id`

    const data = await pool.query(addQuery, [todoId])

    return res.status(201).json({
        success: true,
        data: data.rows[0].task_id
    })

})