import { combineReducers } from "redux"
import { newTaskReducer } from "./newTaskReducer"
import { editTaskReducer, taskReducer } from "./taskReducer"
import { tasksReducer } from "./TasksReducer"

export const reducers = combineReducers({
    tasks: tasksReducer,
    task: taskReducer,
    taskOperation: editTaskReducer,
    newTask: newTaskReducer
})