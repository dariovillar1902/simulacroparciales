import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';

export const Navbar = () => {

    return (
        <header className="d-flex justify-content-center py-3 navbar-dark bg-dark">
            <ul className="nav nav-pills">
                <li className="nav-item dropdown">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Tecnología del Hormigón
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/tdh/1P"
                                >
                                    1° Parcial
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/tdh/2P"
                                >
                                    2° Parcial
                                </NavLink>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </header>
    )
}