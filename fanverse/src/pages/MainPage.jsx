import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, } from 'react-router-dom'
import "../cssfolder/mainPage.css"

import Navbar from "../components/NavBar";
import GameCard from "../components/GameCard";
import Button from "../components/Button";
import { logout, whoami, getAllGames } from "../api";

export default function MainPage() {
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const [games, setGames] = useState([])
    const navigate = useNavigate()


    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 15;
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    useEffect(() => {
        async function load() {
            const data = await whoami()
            if (data.error) {
                return setErrorUser(data.error)
            }
            return setUser(data)
        }
        load()
    }, [])


    useEffect(() => {
        async function loadgames() {
            const data = await getAllGames();
            if (data.error) {
                console.error("Games fetch error:", data.error)
            } else {
                setGames(data)
            }
        }
        loadgames();
    }, [])


    async function onLogout() {
        const data = await logout()
        if (data.error) {
            return setErrorUser(data.error)
        }
        setUser(null)
        navigate('/')
    }

    return (
        <div style={{ backgroundColor: '#452458' }}>
            <div>
                <Navbar user={user} onLogout={onLogout} />
                {/* {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>} */}
            </div>

            <div className="container" style={{ height: 2050, backgroundColor: '#452458' }}>
                <div className="container rounded-5 p-5" style={{ backgroundColor: '#652f80', height: '95%' }}>
                    <div className="" style={{ backgroundColor: '#652f80' }}>
                        <Button text="all" szin="btn btn-danger px-4" />
                        <Button text="most liked" szin="btn btn-dark px-4" />
                    </div>

                    <div className="rounded-5 p-5 row gy-3">
                        {currentGames.length > 0 ? (
                            currentGames.map((game) => (
                                <GameCard
                                    key={game.id || game.title}
                                    title={game.title}
                                    creator={game.creator_name}
                                    banner_pic={game.banner_pic}
                                    creator_pfp={game.creator_pfp}
                                    onClick={() => navigate(`/game/${game.id}`)}
                                />
                            ))
                        ) : (
                            <p style={{ color: "white" }}>No games found.</p>
                        )}

                        <nav className="mt-4">
                            <ul className="pagination justify-content-center">
                                {[...Array(Math.ceil(games.length / gamesPerPage))].map((_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
