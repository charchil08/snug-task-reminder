import React, { useState } from 'react'
import "./AddTask.css"
import task_svg from "../../assets/task_svg.svg"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, createTask } from '../../features/actions/tasksAction'
import { useEffect } from 'react'

const AddTask = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueAt: "",
        priority: "",
    })
    const { newTask, loading, error, success } = useSelector((state) => state.newTask)

    useEffect(() => {
        if (error) {
            alert(error)
            clearErrors()
        }
        if (success === true && newTask) {
            alert("Success")
            dispatch({
                type: 'NEW_TASK_RESET'
            })
            navigate("/pending")
        }
    }, [error, success, newTask, dispatch, alert])

    const handleChange = (event, name) => {
        const value = event.target.value
        setTask({ ...task, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(createTask(task))
    }

    return (
        <div className="add_task_container">
            <div className="add_task_heading">
                <h2>Add your task with timeline</h2>
            </div>
            <div className="add_task_data">
                <div className="add_task">
                    <div className='task_input'>
                        <div className="portion_1 portion">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="" id=""
                                className='title'
                                onChange={(e) => handleChange(e, "title")}
                                placeholder='Complete Assignment' />
                        </div>
                        <div className="portion_2 portion">
                            <label htmlFor="description">Description</label>
                            <textarea name="" id=""
                                className='description'
                                onChange={(e) => handleChange(e, "description")}
                                placeholder='Complete assignment of Database ...'
                                cols="30" rows="10"></textarea>
                        </div>
                        <div className="portion_3 portion">
                            <label htmlFor="due_date">Due Date & Time</label>
                            <input type="datetime-local"
                                className='due_date'
                                onChange={(e) => handleChange(e, "dueAt")}
                                name="" id="" />
                        </div>
                        <div className="portion-4 portion">
                            <label htmlFor="priority">Choose your priority</label>
                            <select name="" id="" className='priority'
                                onChange={(e) => handleChange(e, "priority")}
                            >
                                <option value="">Choose</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>

                        <button type='submit' className='submit' onClick={(e) => handleSubmit(e)} >Submit </button>
                    </div>
                </div>
                <div className="add_svg">
                    <img src={task_svg} alt="task svg" />
                </div>
            </div>
        </div>

    )
}

export default AddTask