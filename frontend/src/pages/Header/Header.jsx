import React from 'react'
import "./Header.css"
import pencil_icon from "../../assets/pencil_icon.png"
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header'>
            <h2 className="heading">
                Task List
                <span>
                    <img src={pencil_icon} className="header_icon" alt="" />
                </span>
            </h2>
            <ul className="nav">
                <li className='nav_item'>

                    <NavLink className={({ isActive }) => isActive ? `nav_item_link is_active` : `nav_item_link`} to="/" >
                        Home
                    </NavLink>
                </li>
                <li className='nav_item'>
                    <NavLink className={({ isActive }) => isActive ? `nav_item_link is_active` : `nav_item_link`} to="/pending" >
                        Pending tasks
                    </NavLink>
                </li>
            </ul>
        </div >
    )
}

export default Header