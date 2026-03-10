import logo from "../photos/logo.png"
import pfp from "../photos/pfp.jpg"
import "../cssfolder/navbar.css"
import "bootstrap/dist/js/bootstrap"
import { Link, useNavigate } from "react-router-dom";


import { useState } from "react";

import Images from "./Images";
import Button from "./Button";

export default function Navbar({ user, onLogout }) {


    const navigate = useNavigate()
    const [search, setSearch] = useState("")


    const isLoggedIn = !!user

    //console.log(isLoggedIn);


    const isAdmin = user?.role === 'admin'
    return (

        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#452458' }}>
            <div className="container-fluid">

                {/* LOGO */}
                <Images Class="mt-2" src={logo} altszov="LOGO" height={70} />

                {/* HAMBURGER */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* COLLAPSE RÉSZ */}
                <div className="collapse navbar-collapse" id="navbarContent">

                    {/* BAL OLDAL */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="nav-link szin">Fanverse</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link  nav-link szin2">Central</span>
                        </li>
                    </ul>

                    {/* KÖZÉP SEARCH */}
                    <form className="d-flex mx-auto my-2 my-lg-0">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-outline-light">
                            Search
                        </button>
                    </form>

                    {/* JOBB OLDAL */}
                    <div className="d-flex flex-column flex-lg-row gap-2">

                        {isLoggedIn ? (
                            <>
                                <Button
                                    szin="btn btn-dark text-white"
                                    onClick={() => navigate('/Profile')}
                                    text="Profil"
                                />

                                <Button
                                    szin="btn btn-dark text-white"
                                    onClick={onLogout}
                                    text="Kijelentkezés"
                                />

                                {isAdmin && (
                                    <Button
                                        szin="btn btn-dark text-white"
                                        onClick={() => navigate('/admin')}
                                        text="Admin panel"
                                    />
                                )}
                            </>
                        ) : (
                            <Button
                                szin="btn btn-dark text-white"
                                onClick={() => navigate('/login')}
                                text="Bejelentkezés"
                            />
                        )}

                    </div>

                </div>
            </div>
        </nav>


    )
}