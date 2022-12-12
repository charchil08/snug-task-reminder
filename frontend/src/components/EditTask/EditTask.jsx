import React, { Fragment, useEffect, useState } from 'react'
import "./EditTask.css"
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getTaskDetail, updateTask } from '../../features/actions/tasksAction'


const EditTask = () => {

    const priorities = ['low', 'medium', 'high']
    const { taskId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { task } = useSelector(state => state.task)

    const { loading, isUpdated, error } = useSelector(state => state.taskOperation)

    const [updateState, setUpdateState] = useState({
        title: "",
        description: "",
        priority: "",
        dueAt: ""
    })

    useEffect(() => {
        if (task) {
            setUpdateState({ ...task })
        }
        if (isUpdated !== undefined && error) {
            alert(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert("Successfully updated!")
            dispatch({
                type: "TASK_UPDATE_RESET"
            })
            navigate("/pending", { replace: true })
        }
    }, [task, error, isUpdated, dispatch, alert])

    useEffect(() => {
        dispatch(getTaskDetail(taskId))
    }, [dispatch])

    const handleChangeState = (e, name) => {
        e.preventDefault()
        setUpdateState({
            ...updateState,
            [name]: e.target.value
        })
    }

    const handleUpdateTask = async (e) => {
        e.preventDefault()
        dispatch(updateTask(taskId, updateState))
    }

    return (
        <div className="edit_task">
            <h2>Update your task with timeline</h2>
            <div className='task_input'>
                <div className="portion_1 portion">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="" id=""
                        className='title'
                        value={updateState.title}
                        onChange={e => handleChangeState(e, 'title')}
                    />
                </div>
                <div className="portion_2 portion">
                    <label htmlFor="description">Description</label>
                    <textarea name="" id=""
                        className='description'
                        value={updateState.description}
                        onChange={e => handleChangeState(e, 'description')}
                        cols="30" rows="10"></textarea>
                </div>
                <div className="portion_3 portion">
                    <label htmlFor="due_date">Due Date & Time</label>
                    <input type="datetime-local"
                        className='due_date'
                        value={updateState.dueAt}
                        onChange={e => handleChangeState(e, 'dueAt')}
                        name="" id="" />
                </div>
                <div className="portion-4 portion">
                    <label htmlFor="priority">Choose your priority</label>
                    <select name="" id=""
                        onChange={e => handleChangeState(e, 'priority')}
                        value={updateState.priority}
                        className='priority'>
                        {
                            priorities.map((priority, index) => (
                                <option value={priority} key={index}> {priority}</option>
                            ))
                        }
                    </select>
                </div>

                <button type='submit' className='submit' onClick={handleUpdateTask} > Update </button>
            </div>
        </div >

    )
}

export default EditTask;