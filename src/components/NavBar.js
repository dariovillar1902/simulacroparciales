import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'

export const Navbar = () => {
    return (
        <header className="d-flex justify-content-center py-3 navbar-dark bg-dark">
            <ul className="nav nav-pills">
                {/* 1° Año */}
                <Dropdown className='botonDropdown'>
                    <Dropdown.Toggle variant="secondary" id="dropdown-1">
                        1° Año
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                        {/* Add items if needed */}
                    </Dropdown.Menu>
                </Dropdown>

                {/* 2° Año */}
                <Dropdown className='botonDropdown'>
                    <Dropdown.Toggle variant="secondary" id="dropdown-2">
                        2° Año
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                        {/* Add items if needed */}
                    </Dropdown.Menu>
                </Dropdown>

                {/* 3° Año */}
                <Dropdown className='botonDropdown'>
                    <Dropdown.Toggle variant="secondary" id="dropdown-3">
                        3° Año
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                        <Dropdown.Header className="text-light">Tecnología del Hormigón</Dropdown.Header>
                        <Dropdown.Item>
                            <NavLink to="/tdh/1P" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                1° Parcial
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/tdh/2P" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                2° Parcial
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/tdh/Coloquio" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                Coloquio
                            </NavLink>
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        <Dropdown.Header className="text-light">Hidráulica General y Aplicada</Dropdown.Header>
                        <Dropdown.Item>
                            <NavLink to="/hidraulica/final" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                Final - Teoría
                            </NavLink>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* 4° Año */}
                <Dropdown className='botonDropdown'>
                    <Dropdown.Toggle variant="secondary" id="dropdown-4">
                        4° Año
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                        {/* Add items if needed */}
                    </Dropdown.Menu>
                </Dropdown>

                {/* 5° Año */}
                <Dropdown className='botonDropdown'>
                    <Dropdown.Toggle variant="secondary" id="dropdown-5">
                        5° Año
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                        <Dropdown.Header className="text-light">Puertos y Vías Navegables</Dropdown.Header>
                        <Dropdown.Item>
                            <NavLink to="/pyvn/1P" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                1° Parcial
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/pyvn/2P" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                2° Parcial
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/pyvn/final" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                Final
                            </NavLink>
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        <Dropdown.Header className="text-light">Construcciones Metálicas y de Madera</Dropdown.Header>
                        <Dropdown.Item>
                            <NavLink to="/metalicas/final" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                Final
                            </NavLink>
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        <Dropdown.Header className="text-light">Ferrocarriles</Dropdown.Header>
                        <Dropdown.Item>
                            <NavLink to="/ferrocarriles/final" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                Final
                            </NavLink>
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        <Dropdown.Header className="text-light">Análisis Estructural 2</Dropdown.Header>
                        <Dropdown.Item>
                            <NavLink to="/ae2/final" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                Final
                            </NavLink>
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        <Dropdown.Header className="text-light">Organización y Conducción de Obras</Dropdown.Header>
                        <Dropdown.Item>
                            <NavLink to="/organizacion-obras/final-teoria" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                Final - Teoría
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/organizacion-obras/final-practica" className={({ isActive }) => 'dropdown-item' + (isActive ? ' active' : '')}>
                                Final - Práctica
                            </NavLink>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ul>
        </header>
    )
}
