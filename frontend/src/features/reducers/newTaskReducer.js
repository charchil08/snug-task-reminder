import { ActionTypes } from "../constants/actions.types"

export const newTaskReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.NEW_TASK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ActionTypes.NEW_TASK_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                newTask: payload.data
            }
        case ActionTypes.NEW_TASK_FAIL:
            return {
                ...state,
                loading: false,
                success: payload.success,
                error: payload.error
            }
        case ActionTypes.NEW_TASK_RESET:
            return {
                ...state,
                success: false,
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