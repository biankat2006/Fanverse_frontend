import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, } from 'react-router-dom'
import "../cssfolder/mainPage.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";


import Navbar from "../components/NavBar";
import Button from "../components/Button";
import { logout, whoami, getOneGame, toggleLike as toggleLikeAPI, getLikes, isLiked } from "../api";
import Images from "../components/Images";

import { useParams } from "react-router-dom";




export default function GamePage() {
    const [user, setUser] = useState(null)
    const [game, setGame] = useState(null);

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const { game_id } = useParams();
    console.log("Game ID from URL:", game_id);

    const navigate = useNavigate()

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const [loadingLike, setLoadingLike] = useState(false);

    const handleToggleLike = async () => {
        if (loadingLike) return;
        setLoadingLike(true);

        const data = await toggleLikeAPI(game_id);

        if (!data.error) {
            setLiked(data.liked);
            setLikeCount(prev => data.liked ? prev + 1 : prev - 1);
        }

        setLoadingLike(false);
    };

    useEffect(() => {
        async function loadLikes() {
            const countData = await getLikes(game_id);
            if (!countData.error) {
                setLikeCount(countData.count);
            }

            if (user) {
                const likedData = await isLiked(game_id);
                if (!likedData.error) {
                    setLiked(likedData.liked);
                }
            }
        }

        loadLikes();
    }, [game_id, user]);

    useEffect(() => {
        async function loadGame() {
            const data = await getOneGame(game_id);
            console.log("DATA:", data);

            if (data.error) {
                console.error(data.error);
            } else {
                setGame(data);
            }
        }

        loadGame();
    }, [game_id]);

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

    async function onLogout() {
        const data = await logout()
        if (data.error) {
            return setErrorUser(data.error)
        }
        setUser(null)
        navigate('/')
    }

    if (!game) {
        return <div className="text-white">Betöltés...</div>;
    }

    console.log(game);

    return (
        <div style={{ backgroundColor: '#452458' }}>
            <div>
                <Navbar user={user} onLogout={onLogout} />
            </div>
            <div className="">
                {game.images.length > 0 && (
                    <Images
                        Class="image img-fluid"
                        src={`http://127.0.0.1:4000/bigpicture/${game.images[0]}`}  // bigpicture mappa és fájlnév
                        altszov="Big Picture"
                    />
                )}
            </div>
            <div className="d-flex align-items-center" style={{ backgroundColor: '#652f80', padding: "20px" }}>
                <Images Class={"image rounded-circle mx-5"} src={`http://127.0.0.1:4000/creator/${game.creator_pfp}`} altszov="Profile Picture" height={100} />
                <div className="row">
                    <p style={{ color: "white", fontWeight: "bold", marginBottom: 0, fontSize: 30 }}>{game.title}</p>
                    <p style={{ color: "white", marginBottom: 0 }}>By {game.creator}</p>
                </div>
                <div className="d-flex align-items-center ms-auto gap-3">
                    <Button
                        text="Download"
                        szin="btn btn-dark px-5"
                        onClick={async () => {
                            if (!game.file || game.file === 'none') {
                                alert('A játék fájl nem elérhető.');
                                return;
                            }

                            try {
                                const response = await fetch(`http://localhost:4000/file/${encodeURIComponent(game.file)}`, {
                                    method: 'GET',
                                });

                                if (!response.ok) {
                                    throw new Error('A fájl nem található a szerveren.');
                                }

                                const blob = await response.blob();
                                const url = window.URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = game.file;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                window.URL.revokeObjectURL(url);
                            } catch (error) {
                                alert(error.message);
                            }
                        }}
                    />
                    <button onClick={handleToggleLike} style={{ backgroundColor: '#652f80', border: 'none' }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="60"
                            fill={liked ? "red" : "white"}
                            className="bi bi-heart"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 2.748c-1.676-1.684-4.438-1.684-6.114 0-1.676 1.684-1.676 4.418 0 6.102L8 15l6.114-6.15c1.676-1.684 
                                    1.676-4.418 0-6.102-1.676-1.684-4.438-1.684-6.114 0z" />
                        </svg>
                    </button>
                </div>

            </div>
            <div className="d-flex justify-content-center row" style={{ backgroundColor: '#452458' }}>
                <div className="row">
                    <div className="mt-5 d-flex align-items-center  justify-content-center gap-5">

                        {[...new Set(game.images)]
                            .filter(img => img !== '17.webp' || game.images.indexOf(img) === 0) // az első '17.webp' megmarad, a többi eltűnik
                            .map((image, i) => (
                                <img
                                    key={i}
                                    className="image img-fluid"
                                    src={`http://127.0.0.1:4000/kepek/${image}`}
                                    alt={`Game ${i + 1}`}
                                    style={{ width: 300, height: 150, objectFit: "cover", cursor: "pointer" }}
                                    onClick={() => { setIndex(i); setOpen(true); }}
                                />
                            ))}

                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mt-5 d-flex gap-5">
                    <div className="rounded-4 text-white p-3" style={{ backgroundColor: '#652f80', width: 600, fontWeight: "bold", fontSize: 20 }}>
                        {game.description}
                    </div>
                    <div>
                        <div className="text-white">
                            <h1 style={{ fontWeight: 'bold' }}>Likes</h1>
                            <div className="column">
                                <h1>{likeCount}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Lightbox
                open={open}
                index={index}
                close={() => setOpen(false)}
                slides={game.images
                    .filter(img => img)
                    .map(img => ({
                        src: `http://127.0.0.1:4000/kepek/${img}`
                    }))
                }
                plugins={[Thumbnails, Zoom]}
                zoom={{
                    maxZoomPixelRatio: 3,
                    scrollToZoom: true
                }}
            />
        </div>

    )
}