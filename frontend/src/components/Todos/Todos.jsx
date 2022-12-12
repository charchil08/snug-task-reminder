import React, { useEffect } from 'react'
import { useState } from 'react'
import Todo from '../Todo/Todo'
import "./Todos.css"

import { useDispatch, useSelector } from "react-redux"
import { getAllTasks } from '../../features/actions/tasksAction'

const Todos = () => {
    const urlWithProxy = '/api'

    const [checkedPriority, setCheckedPriority] = useState(new Array(3).fill(true))
    const [priority, setPriority] = useState(["high", "medium", "low"])


    const handleOnChangeFilters = (e, name) => {
        switch (name) {
            case 'priorities':
                setFilters({
                    ...filters,
                    priorities: priority.filter((p, ind) => checkedPriority[ind] === true).join(",")
                })
                break
            case 'next_page':
                if (filters.page === pages.length) return
                setFilters((prevFilter) => ({
                    ...prevFilter,
                    page: prevFilter.page + 1
                }))
                if (filters.page + 1 > maxPageNumberLimit) {
                    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
                    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
                }
                break
            case 'prev_page':
                if (filters.page <= 1) return
                setFilters((prevFilter) => ({
                    ...prevFilter,
                    page: prevFilter.page - 1
                }))
                if ((filters.page - 1) % pageNumberLimit === 0) {
                    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
                    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
                }
                break
            case 'page':
            case 'records':
                setFilters({
                    ...filters,
                    [name]: Number(e.target.id)
                })
                break
            default:
                setFilters({
                    ...filters,
                    [name]: e.target.value
                })
        }
    }

    const handleOnChangePriority = (e, position) => {
        const updatedCheckedPriority = checkedPriority.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedPriority(updatedCheckedPriority)
    }


    const [filters, setFilters] = useState({
        keyword: "",
        from: "",
        to: "",
        records: 4,
        page: 1,
        priorities: "high,medium,low",
    })

    const dispatch = useDispatch()
    const { tasks, count, error } = useSelector((state) => state.tasks)


    useEffect(() => {
        dispatch(getAllTasks(filters))
    }, [dispatch, filters])

    useEffect(() => {
        handleOnChangeFilters('event', 'priorities')
    }, [checkedPriority])


    // pagination stuff
    const pages = []
    for (let i = 1; i <= Math.ceil(count / filters.records); i++) pages.push(i)
    const [pageNumberLimit, setPageNumberLimit] = useState(4)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4)



    const renderPageNumbers =
        pages.map(number => {
            if (number <= maxPageNumberLimit && number > minPageNumberLimit) {
                return (
                    <p key={number}
                        id={number}
                        onClick={e => handleOnChangeFilters(e, 'page')}
                        className={`page_number ${filters.page == number ? "active_page" : ""}`}>{number}</p>
                )
            }
            else {
                return null
            }
        })

    const pageIncrementDots = () => {
        if (pages.length > maxPageNumberLimit) {
            return (
                <p className='btn' onClick={(e) => handleOnChangeFilters(e, 'next_page')} >&hellip;</p>
            )
        }
    }

    return (
        <div className='pending' >
            <div className="pending_tasks">
                <div className="filters">
                    <div className="search_filter">
                        <input
                            type="search"
                            name=""
                            value={filters.keyword}
                            onChange={(e) => handleOnChangeFilters(e, 'keyword')}
                            className='filter_search_input'
                            placeholder='search by title or description' id="" />
                    </div>
                    <div className="search_filter search_filter__2">
                        <label htmlFor="priority">Select priority  </label>
                        {
                            priority.map((p, index) => (
                                <div className="">
                                    <input type="checkbox"
                                        key={index}
                                        name={p}
                                        className="filter_search_priority"
                                        id={`custom-checkbox-${index}`}
                                        value={p}
                                        checked={checkedPriority[index]}
                                        onChange={(e) => handleOnChangePriority(e, index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{p}</label>
                                </div>
                            ))}
                    </div>

                    <div className="search_filter search_filter__3">
                        <div className="filter_from_date">
                            <label htmlFor="due_date">From Due Date & Time</label>
                            <input type="datetime-local"
                                value={filters.from}
                                onChange={(e) => handleOnChangeFilters(e, 'from')}
                                className='due_date__from'
                                name="" id="" />
                        </div>
                        <div className="filter_to_date">
                            <label htmlFor="due_date">To Due Date & Time</label>
                            <input type="datetime-local"
                                onChange={(e) => handleOnChangeFilters(e, 'to')}
                                value={filters.to}
                                className='due_date__to'
                                name="" id="" />
                        </div>
                    </div>
                </div>
                <div className="pending_title">
                    <h2>Pending Tasks</h2>
                    <p className='total_pending_task'>Total - {count}</p>
                </div>
                {
                    tasks.map((task, index) => <Todo key={task.id} task={task} no={index + 1} />)
                }
            </div>
            <div className="pagination">
                <p className='prev_page btn' onClick={(e) => handleOnChangeFilters(e, 'prev_page')}>Prev</p>
                {renderPageNumbers}
                {pageIncrementDots()}
                <p className='next_page btn' onClick={(e) => handleOnChangeFilters(e, 'next_page')} >Next</p>
            </div>
        </div >
    )
}

export default Todos