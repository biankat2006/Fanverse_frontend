import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, } from 'react-router-dom'
import "../cssfolder/mainPage.css"

import Navbar from "../components/NavBar";
import GameCard from "../components/GameCard";
import Button from "../components/Button";
import { logout, whoami, getAllGames, getOneGame, getMostLikedGames } from "../api";

export default function MainPage() {
    const [user, setUser] = useState(null);
    const [errorUser, setErrorUser] = useState('');
    const [games, setGames] = useState([]);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const gamesPerPage = 15;

    // Adatbetöltő függvény - kezeli a sima és a lájkolt listát is
    async function loadgames(type = 'all') {
        setFilter(type);
        let data;

        if (type === 'mostLiked') {
            data = await getMostLikedGames();
        } else {
            data = await getAllGames();
        }

        if (data.error) {
            console.error("Games fetch error:", data.error);
        } else {
            setGames(data);
            setCurrentPage(1); // Szűréskor mindig az 1. oldalra ugrunk
        }
    }

    // Felhasználó ellenőrzése betöltéskor
    useEffect(() => {
        async function loadUser() {
            const data = await whoami();
            if (data.error) {
                return setErrorUser(data.error);
            }
            setUser(data);
        }
        loadUser();
        loadgames('all'); // Játékok betöltése alapértelmezetten
    }, []);

    // Lapozás kiszámítása
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    async function onLogout() {
        const data = await logout();
        if (data.error) {
            return setErrorUser(data.error);
        }
        setUser(null);
        navigate('/');
    }

    return (
        <div style={{ backgroundColor: '#452458', minHeight: '100vh' }}>
            <Navbar user={user} onLogout={onLogout} />

            <div className="container mobileFull" style={{ backgroundColor: '#452458' }}>
                <div className="container rounded-5 p-5 mobileContainer" style={{ backgroundColor: '#652f80' }}>

                    <div className="mobileButtons mb-4" style={{ backgroundColor: '#652f80' }}>
                        <Button
                            text="all"
                            /* Ha az 'all' aktív, akkor piros, különben fekete */
                            szin={`btn ${filter === 'all' ? 'btn-danger' : 'btn-dark'} px-4 me-2`}
                            onClick={() => loadgames('all')}
                        />
                        <Button
                            text="most liked"
                            /* Ha a 'mostLiked' aktív, akkor piros, különben fekete */
                            szin={`btn ${filter === 'mostLiked' ? 'btn-danger' : 'btn-dark'} px-4`}
                            onClick={() => loadgames('mostLiked')}
                        />
                    </div>

                    <div className="rounded-5 p-0 row gy-4 mobileGrid">
                        {currentGames.length > 0 ? (
                            currentGames.map((game) => (
                                <div
                                    key={game.game_id}
                                    className="col-12 col-md-4"
                                    onClick={() => navigate(`/game/${game.game_id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <GameCard
                                        title={game.title}
                                        creator={game.creator_name}
                                        banner_pic={game.banner_pic}
                                        creator_pfp={game.creator_pfp}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <p style={{ color: "white", fontSize: "1.2rem" }}>No games found.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {games.length > gamesPerPage && (
                        <nav className="mt-5">
                            <ul className="pagination justify-content-center">
                                {[...Array(Math.ceil(games.length / gamesPerPage))].map((_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => {
                                                setCurrentPage(index + 1);
                                                window.scrollTo(0, 0); // Lapozáskor felugrik az elejére
                                            }}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}