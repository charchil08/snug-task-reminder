import { ActionTypes } from "../constants/actions.types"

const initalState = {
    task: {}
}

export const taskReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case ActionTypes.TASK_DETAIL_REQUEST:
            return {
                task: {},
                loading: true,
            }
        case ActionTypes.TASK_DETAIL_SUCCESS:
            return {
                loading: false,
                task: payload
            }
        case ActionTypes.TASK_DETAIL_FAIL:
            return {
                loading: false,
                error: payload
            }
        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

// contains edit and deleting task reducers
export const editTaskReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.TASK_UPDATE_REQUEST:
        case ActionTypes.DELETE_TASK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ActionTypes.TASK_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload
            }
        case ActionTypes.DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload
            }
        case ActionTypes.TASK_UPDATE_FAIL:
        case ActionTypes.DELETE_TASK_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
                // isUpdated: payload.success
            }
        case ActionTypes.TASK_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case ActionTypes.DELETE_TASK_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}