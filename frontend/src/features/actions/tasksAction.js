import { ActionTypes } from "../constants/actions.types";

export const getAllTasks = ({ keyword = '', from = '', to = '', records = 4, page = 1, priorities = 'high,medium,low' }) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.ALL_TASKS_REQUEST })
        const urlWithProxy = '/api'
        const link = `${urlWithProxy}/?from=${from}&to=${to}&priorities=${priorities}&records=${records}&page=${page}&keyword=${keyword}`
        const response = await fetch(`${link}`)
        // const response = await fetch(`${urlWithProxy}/`)
        const { data, count } = await response.json()
        dispatch({
            type: ActionTypes.ALL_TASKS_SUCCESS,
            payload: { data, count }
        })
    }
    catch (error) {
        dispatch({
            type: ActionTypes.ALL_TASKS_FAIL,
            payload: error.message
        })
    }
}


export const getTaskDetail = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.TASK_DETAIL_REQUEST })

        const urlWithProxy = '/api'
        const res = await fetch(`${urlWithProxy}/todo/${taskId}`)
        let { data } = await res.json()
        let dt = new Date(data.dueat)
        let newDt = new Date(dt.getTime() + (330 * 60000))
        data.dueAt = newDt.toISOString().replace("Z", "")
        console.log(data)

        dispatch({
            type: ActionTypes.TASK_DETAIL_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({ type: ActionTypes.TASK_DETAIL_FAIL, payload: error.message })
    }
}

export const updateTask = (taskId, task) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.TASK_UPDATE_REQUEST })
        const urlWithProxy = '/api'
        const res = await fetch(`${urlWithProxy}/todo/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(task)
        })
        const data = await res.json()
        dispatch({
            type: ActionTypes.TASK_UPDATE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({ type: ActionTypes.TASK_DETAIL_FAIL, payload: error.message })
    }
}

// create new task
export const createTask = (task) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.NEW_TASK_REQUEST })
        const urlWithProxy = '/api'

        const res = await fetch(`${urlWithProxy}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await res.json()
        console.log(data)
        dispatch({
            type: ActionTypes.NEW_TASK_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ActionTypes.NEW_TASK_FAIL,
            payload: data
        })
    }
}

export const removeTask = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.DELETE_TASK_REQUEST })
        const urlWithProxy = '/api'

        const res = await fetch(`${urlWithProxy}/todo/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*'
            }
        })
        const data = await res.json()
        dispatch({
            type: ActionTypes.DELETE_TASK_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({ type: ActionTypes.DELETE_TASK_FAIL, payload: error.message })
    }
}



// Clear all errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: ActionTypes.CLEAR_ERRORS
    })
}