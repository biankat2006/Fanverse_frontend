import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, } from 'react-router-dom'
import "../cssfolder/mainPage.css"

import Navbar from "../components/NavBar";
import GameCard from "../components/GameCard";
import Button from "../components/Button";
import { logout, whoami } from "../api";
import Pages from "../components/Pages";

export default function MainPage() {
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const navigate = useNavigate()

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
                {/* {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>} */}
            </div>

            <div className="container" style={{ height: 2000, backgroundColor: '#452458' }}>
                <div className="container rounded-5 p-5" style={{ backgroundColor: '#652f80', height: '95%' }}>
                    <div className="" style={{ backgroundColor: '#652f80' }}>
                        <Button text="all" szin="btn btn-danger px-4" />
                        <Button text="most liked" szin="btn btn-dark px-4" />
                    </div>
                    <div className="rounded-5 p-5 row gy-3">
                        <GameCard title="The Return to the Bloody Nights (Classic)" creator="Kazovsky" />
                        <GameCard title="" creator="" />
                        <GameCard />
                        <GameCard />
                        <GameCard />
                        <GameCard />
                        <GameCard />
                    </div>
                    <div className="row">
                        <Pages number='1' color='danger'/>
                    </div>
                </div>
            </div>
        </div>
    )
}