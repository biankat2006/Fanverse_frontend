import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, } from 'react-router-dom'
import "../cssfolder/mainPage.css"

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

    return (
        <div style={{ backgroundColor: '#452458' }}>
            <div>
                <Navbar user={user} onLogout={onLogout} />
            </div>
            <div className="">
                <Images Class={"image img-fluid"} src={`http://127.0.0.1:4000/updates/${game.banner_pic}`} altszov="Freddy logo" />
            </div>
            <div className="d-flex align-items-center" style={{ backgroundColor: '#652f80', padding: "20px" }}>
                <Images Class={"image rounded-circle mx-5"} src={game.creator_pfp} altszov="Profile Picture" height={100} />
                <div className="row">
                    <p style={{ color: "white", fontWeight: "bold", marginBottom: 0, fontSize: 30 }}>{game.title}</p>
                    <p style={{ color: "white", marginBottom: 0 }}>By {game.creator_name}</p>
                </div>
                <div className="d-flex align-items-center ms-auto gap-3">
                    <Button text="Download" szin="btn btn-dark px-5" />
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
                        <i class="bi bi-arrow-left-circle text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 
                                0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                            </svg>
                        </i>
                        <Images Class={"image"} src={background} altszov="Profile Picture" height={200} />
                        <Images Class={"image"} src={background} altszov="Profile Picture" height={200} />
                        <Images Class={"image"} src={background} altszov="Profile Picture" height={200} />
                        <i class="bi bi-arrow-right-circle text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 
                                0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                            </svg>
                        </i>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                    </svg>
                                </i>
                                <i class="bi bi-hand-thumbs-down-fill">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                                        <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591" />
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
        </div>
    )
}