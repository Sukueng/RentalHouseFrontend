import React from 'react'
import { NavDropdown, Nav, NavItem } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from "./assets/logo_house.png"

function Header() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("name");
        navigate("/")
    }
    return (
        <header >
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col-3">
                            <img src={logo} style={{ width: '100px', height: '100px' }} alt="" className='d-none d-md-block mx-3'></img>
                        </div>
                        <div className="col">
                            <h2 className='text-white mt-5'>Rental Houses</h2>
                        </div>
                    </div>

                </div>
                <div className="col  d-flex justify-content-end my-5 col-12 col-md-6  d-flex justify-content-start justify-content-md-end">
                    <div className="nav d-flex justify-conetnt-center">
                        <ul className="list-inline">             
                            <li className='list-inline-item pe-3'><Link className='text-decoration-none text-white' to={"/"}>Home</Link></li>
                            <li className='list-inline-item pe-3'><Link className='text-decoration-none text-white' to={"/post"}>Rental Homes</Link></li>
                            <li className='list-inline-item pe-5'><Link className='text-decoration-none text-white' to={"/login"}>Post new Homes</Link></li>
                            {localStorage.getItem("name") != null ?
                                <li className='list-inline-item '>
                                    <Nav>
                                        <NavDropdown title={localStorage.getItem("name")} style={{ color: 'white' }}>

                                            <Link to="#"><NavItem className='text-center' onClick={logout}>LogOut</NavItem></Link>
                                        </NavDropdown>
                                    </Nav></li> : ""}
                           
                        </ul>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header