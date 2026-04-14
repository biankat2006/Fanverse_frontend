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
import { logout, whoami, getOneGame } from "../api";
import Images from "../components/Images";

import banner from '../photos/banner.webp'
import pfp from '../photos/pfp.jpg'
import background from '../photos/background.jpg'

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

    const toggleLike = () => {
        setLiked(!liked);
    };

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
                    <button onClick={toggleLike} style={{ backgroundColor: '#652f80', border: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill={liked ? "red" : "currentColor"} class="bi bi-heart" viewBox="0 0 16 16">
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
                            <h3>Likes</h3>
                            <div className="column">
                                <h1>0</h1>
                                <i class="bi bi-hand-thumbs-up-fill">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={liked ? "black" : "currentColor"} class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                    </svg>
                                </i>
                            </div>
                            <div className="row">
                                <h1>Comments</h1>
                                <h2>View all</h2>
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