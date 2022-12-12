import React, { useEffect, useState } from 'react'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { HiOutlineBellAlert } from "react-icons/hi2"
import "./Todo.css"
import { useNavigate } from 'react-router-dom'
import { clearErrors, removeTask } from '../../features/actions/tasksAction'
import { useDispatch, useSelector } from 'react-redux'
import { ActionTypes } from '../../features/constants/actions.types'

const Todo = ({ task, no }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, isDeleted = false } = useSelector(state => state.taskOperation)

    const calculateTimeLeft = (dueat) => {
        const currentTime = Date.now()
        const dueTime = new Date(dueat)
        let differnce = dueTime - currentTime
        const hoursLeft = Math.floor(differnce / (1000 * 60 * 60))
        const minutesLeft = Math.floor((differnce % (1000 * 60 * 60)) / 60000)
        // console.log(`${task.title} : ${hoursLeft} : ${minutesLeft}`)
        return `${hoursLeft} hr:${minutesLeft} mn `
    }

    const [dateFormat, setDateFormat] = useState({
        currentDate: new Date(task.dueat).toLocaleString('en-US', {
            weekday: (window.innerWidth <= 525) ? 'narrow' : 'short',
            day: 'numeric',
            year: 'numeric',
            month: (window.innerWidth <= 525) ? 'numeric' : 'short',
            hour: 'numeric',
            minute: 'numeric',
        }),
        timeLeft: calculateTimeLeft(task.dueat)
    })

    useEffect(() => {
        if (isDeleted !== undefined && (error)) {
            alert(error)
            dispatch(clearErrors())
        }
        if (isDeleted === true) {
            alert("Deleted Successfully!")
            dispatch({ type: ActionTypes.DELETE_TASK_RESET })
            navigate("/")
        }
    }, [isDeleted, error, dispatch, alert])

    const handleDeleteTask = async (e, taskId) => {
        e.preventDefault();
        debugger
        dispatch(removeTask(taskId))
    }

    return (
        <div className='pending_single_task' >
            <div className="card_title">
                <div className="text">
                    <h3><span>{no}.</span>{task.title}</h3>
                </div>
                <div className="icons">
                    <div className="alert_icon"><HiOutlineBellAlert /></div>
                    <div className="edit_icon"><AiOutlineEdit onClick={() => navigate(`/update/task/${task.id}`)} /></div>
                    <div className="delete_icon"> <AiOutlineDelete onClick={(e) => handleDeleteTask(e, task.id)} /> </div>
                </div>
            </div>
            <div className="card_desc">{
                task.description.split("\n").map(desc => <p>{desc}</p>)
            }</div>
            <div className="card_due__at">
                <p className="due_at"><span className='badge badge_info' >Due at</span>{
                    // new Date(task.dueat).toUTCString()
                    dateFormat.currentDate
                }</p>
                <p className={`priority badge badge_${task.priority}`}>
                    {
                        task.priority
                    }
                </p>
            </div>
            <div className="card_time__left">
                {
                    dateFormat.timeLeft
                } left</div>
        </div >
    )
}

export default Todo