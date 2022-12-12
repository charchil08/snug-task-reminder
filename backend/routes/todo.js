const express = require("express");
const { getTodos, addTodo, removeTodo, getTodosByDate, updateTodo, removeAllTodos, getTodoById } = require("../controller/todo");

const router = express.Router()

router.route('/').get(getTodos).post(addTodo).delete(removeAllTodos);

router.route('/todo/:todoId').delete(removeTodo).put(updateTodo).get(getTodoById);



router.route('/filter').get(getTodosByDate);

module.exports = router