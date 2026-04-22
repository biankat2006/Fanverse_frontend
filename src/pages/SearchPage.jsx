import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/NavBar";
import GameCard from "../components/GameCard";
import Button from "../components/Button";
import { whoami } from "../api"; // a user lekéréshez
import { searchGames } from "../api"; // a te searchGames függvényed

export default function SearchPage() {
    const { title } = useParams(); // a keresett cím a route-ból
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [errorUser, setErrorUser] = useState('');
    const [games, setGames] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 15;
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    console.log(indexOfFirstGame, indexOfLastGame);
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    // User betöltése
    useEffect(() => {
        async function loadUser() {
            const data = await whoami();
            if (data.error) {
                return setErrorUser(data.error);
            }
            setUser(data);
        }
        loadUser();
    }, []);

    // Keresés futtatása
    useEffect(() => {
        async function loadGames() {
            if (!title) return;
            const data = await searchGames(title);
            if (data.error) {
                console.error("Search error:", data.error);
                setGames([]);
            } else {
                setGames(data);
            }
        }
        loadGames();
    }, [title]); // minden title változásnál új keresés

    async function onLogout() {
        const data = await logout();
        if (data.error) return setErrorUser(data.error);
        setUser(null);
        navigate('/');
    }

    return (
        <div style={{ backgroundColor: '#452458' }}>
            <Navbar user={user} onLogout={onLogout} />
            {console.log(currentGames)}
            <div className="container" style={{ minHeight: '90vh', backgroundColor: '#452458' }}>
                <div className="container rounded-5 p-5" style={{ backgroundColor: '#652f80', minHeight: '95%' }}>
                    
                    <h2 style={{ color: 'white', marginBottom: '20px' }}>Search results for "{title}"</h2>

                    <div className="rounded-5 p-5 row gy-3">
                        {currentGames.length > 0 ? (
                            currentGames.map((game) => (
                                
                                <div
                                    key={game.game_id}
                                    className="col-md-4"
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
    );
}