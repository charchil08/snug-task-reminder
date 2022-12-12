const pool = require("../config/db");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const todo = require("../query/todo");
const ErrorHandler = require("../utils/ErrorHandler");

// 1 things left - Group by 
// queries -
/*
 * search - keyword
 * from - from_date
 * to - to_date
 * records - records_per_page
 * page - current_page
 * priorities - 'high','medium','low'
 * -----------------------------------
 * group - group by
 * order - order by
*/
exports.getTodos = catchAsyncErrors(async (req, res, next) => {
    const query = req.query;
    const keyword = (query.keyword && query.keyword.trim() != "") ? query.keyword : "";

    const date = await pool.query("select max(dueAt) as max_date from task")
    const last_date = date.rows[0].max_date
    const fromDate = (query.from) ? query.from : new Date(Date.now()).toISOString()
    // console.log("🚀   file: todo.js:26   exports.getTodos=catchAsyncErrors   fromDate", fromDate);
    const toDate = (query.to) ? query.to : last_date

    // const order = (query.order) ? query.order : 'ASC' //1:ASC, 0:DESC
    // const group = (query.group) ? query.group : ''

    const recordsPerPage = (query.records) ? query.records : 5
    const currentPage = (query.page) ? query.page : 1
    const skip = recordsPerPage * (currentPage - 1)

    let priorities = []
    let len = 0
    if (query.priorities) {
        priorities = query.priorities.split(',')
        len = priorities.length
    } else {
        priorities.push('high', 'medium', 'low')
        len = priorities.length
    }

    const arr = [fromDate, toDate, `%${keyword}%`, ...priorities, recordsPerPage, skip]
    let params = []
    for (let i = 0; i < priorities.length; i++) {
        params.push('$' + (i + 4))
    }
    let pages = []
    pages.push(`$${len + 4}`)
    pages.push(`$${len + 5}`)
    pages.push(`$${len + 6}`)

    const queryArrForTotalRecords = [fromDate, toDate, `%${keyword}%`, ...priorities]
    const queryForTotalRecords = "SELECT id FROM task where (dueAt between $1 and $2)  and (title || ' ' || description ilike $3) and (priority in (" + [...params] + "))"

    const { rowCount } = await pool.query(queryForTotalRecords, queryArrForTotalRecords)


    const queryText = "SELECT * FROM task where (dueAt between $1 and $2)  and (title || ' ' || description ilike $3) and (priority in (" + [...params] + ")) order by dueAt ASC, priority ASC limit " + pages[0] + " offset " + pages[1];

    const data = await pool.query(queryText, arr);

    return res.status(200).json({
        success: true,
        count: rowCount,
        data: data.rows
    })
})

exports.addTodo = catchAsyncErrors(async (req, res, next) => {
    const { title, description, dueAt, priority } = await req.body;
    const createdAt = new Date()
    console.log(title, description, dueAt, priority)

    if (!title || !description || !dueAt || !priority) {
        return next(new ErrorHandler(404, `Please fill all the fields!`))
    }
    const data = await pool.query(todo.addTodo_query, [title, description, dueAt, priority, createdAt])

    return res.status(201).json({
        success: true,
        message: `New task added`,
        data: data.rows[0]
    })
})

exports.removeTodo = catchAsyncErrors(async (req, res, next) => {

    const todoId = req.params.todoId;

    const data = await pool.query(todo.removeTodo_query, [todoId])

    if (data.rowCount === 0) {
        return next(new ErrorHandler(404, `Data not found`))
    }


    return res.status(200).json({
        success: true,
        data: data.rows[0].title
    })
})

exports.removeAllTodos = catchAsyncErrors(async (req, res, next) => {
    await pool.query(todo.removeAllTodos_query)
    return res.status(200).json({
        success: true,
        message: `All tasks deleted!`
    })
})

exports.updateTodo = catchAsyncErrors(async (req, res, next) => {
    const { todoId } = req.params;
    const { title, description, dueAt, priority } = req.body;
    const updatedAt = new Date()

    let data = await pool.query(todo.getTdoById_query, [todoId])

    if (data.rowCount === 0) {
        return next(new ErrorHandler(404, `Data not found`))
    }

    let task = await pool.query(todo.updateTodo_query, [title, description, dueAt, updatedAt, priority, todoId])
    return res.status(200).json({
        success: true,
        message: `task updated!`,
        data: task.rows[0]
    })
})

exports.getTodosByDate = catchAsyncErrors(async (req, res, next) => {
    const { filter, from_date, to_date } = req.query;
    let data = undefined;

    switch (filter) {
        case "dueAt":
            data = await pool.query(todo.todosBetweenDueDate_query, [from_date, to_date])
            break
        case "createdAt":
            data = await pool.query(todo.todosBetweenCreatedDate_query, [from_date, to_date])
            break
    }

    return res.status(200).json({
        success: true,
        data: data.rows
    })
})

exports.getTodoById = catchAsyncErrors(async (req, res, next) => {
    const { todoId } = await req.params
    const data = await pool.query(todo.getTdoById_query, [todoId])

    if (data.rowCount === 0) {
        return next(new ErrorHandler(404, `Data not found`))
    }

    return res.status(200).json({
        success: true,
        data: data.rows[0]
    })
})