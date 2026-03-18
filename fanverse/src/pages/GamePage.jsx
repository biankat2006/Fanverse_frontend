import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, } from 'react-router-dom'
import "../cssfolder/mainPage.css"

import Navbar from "../components/NavBar";
import Button from "../components/Button";
import { logout, whoami } from "../api";
import Images from "../components/Images";

import banner from '../photos/banner.webp'
import pfp from '../photos/pfp.jpg'
import background from '../photos/background.jpg'

export default function GamePage() {
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

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

    return (
        <div style={{ backgroundColor: '#452458' }}>
            <div>
                <Navbar user={user} onLogout={onLogout} />
            </div>
            <div className="">
                <Images Class={"image img-fluid"} src={banner} altszov="Freddy logo" />
            </div>
            <div className="d-flex align-items-center" style={{ backgroundColor: '#652f80', padding: "20px" }}>
                <Images Class={"image rounded-circle mx-5"} src={pfp} altszov="Profile Picture" height={100} />
                <div className="row">
                    <p style={{ color: "white", fontWeight: "bold", marginBottom: 0, fontSize: 30 }}>The Return to Bloody Nights "Classic"</p>
                    <p style={{ color: "white", marginBottom: 0 }}>By Kazovsky</p>
                </div>
                <div className="d-flex align-items-center ms-auto gap-3">
                    <Button onClick={toggleLike} text="Download" szin="btn btn-dark px-5" />
                    <button style={{ backgroundColor: '#652f80', border: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill={liked ? "red" : "currentColor"} class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                    </button>
                </div>

            </div>
            <div className="d-flex justify-content-center row" style={{ backgroundColor: '#452458' }}>
                <div className="row">
                    <div className="mt-5 d-flex align-items-center  justify-content-center gap-5">
                        <Button onClick={toggleLike} text="Download" szin="btn btn-dark px-5" />
                        <Images Class={"image"} src={background} altszov="Profile Picture" height={200} />
                        <Images Class={"image"} src={background} altszov="Profile Picture" height={200} />
                        <Images Class={"image"} src={background} altszov="Profile Picture" height={200} />
                        <Button onClick={toggleLike} text="Download" szin="btn btn-dark px-5" />
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mt-5 d-flex gap-5">
                    <div className="rounded-4 text-white p-3" style={{ backgroundColor: '#652f80', width: 500, fontWeight: "bold", fontSize: 20 }}>
                        Get ready for a spine-tingling lore focused experience with our new #fnaf fan game, "Return to Bloody Nights." Inspired by FNaF Plus, the original 4 FNaF games, and the books by Scott Cawthon, this game takes its own unique twist on the timeline and crucial events of the Five Nights at Freddy's series. With a combination of old-style atmosphere and gameplay, along with new mechanics, our game brings the best elements of the official games to the table. It's a reborn version of our previous game, "Bloody Nights at Freddy's."
                    </div>
                    <div>
                        <div className="text-white">
                            <span>sdas</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}