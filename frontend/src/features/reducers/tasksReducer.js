import { ActionTypes } from "../constants/actions.types"

const initalState = {
    tasks: []
}

export const tasksReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ALL_TASKS_REQUEST:
            return {
                loading: true,
                tasks: []
            }
        case ActionTypes.ALL_TASKS_SUCCESS:
            return {
                loading: false,
                tasks: payload.data,
                count: payload.count
            }
        case ActionTypes.ALL_TASKS_FAIL:
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
            return state;
    }
}