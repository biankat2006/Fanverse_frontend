import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "../cssfolder/mainPage.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Navbar from "../components/NavBar";
import Button from "../components/Button";
import { logout, whoami, getOneGame, toggleLike as toggleLikeAPI, getLikes, isLiked } from "../api";
import Images from "../components/Images";

export default function GamePage() {
    const [user, setUser] = useState(null);
    const [game, setGame] = useState(null);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const { game_id } = useParams();
    const navigate = useNavigate();

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [loadingLike, setLoadingLike] = useState(false);

    // ... (like handling és useEffect-ek változatlanok maradnak)
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
            if (!countData.error) setLikeCount(countData.count);
            if (user) {
                const likedData = await isLiked(game_id);
                if (!likedData.error) setLiked(likedData.liked);
            }
        }
        loadLikes();
    }, [game_id, user]);
    useEffect(() => {
        async function loadGame() {
            const data = await getOneGame(game_id);
            if (data && !data.error) {
                // Itt történik a varázslat:
                const formattedData = {
                    ...data,
                    // Ha a data.images string, szétvágjuk a vesszőknél, ha üres, üres tömböt adunk
                    images: typeof data.images === 'string' ? data.images.split(',') : []
                };
                setGame(formattedData);
            }
        }
        loadGame();
    }, [game_id]);

    useEffect(() => {
        async function load() {
            const data = await whoami();
            if (!data.error) setUser(data);
        }
        load();
    }, []);

    async function onLogout() {
        const data = await logout();
        if (!data.error) {
            setUser(null);
            navigate('/');
        }
    }

    if (!game) return <div className="text-white text-center mt-5 p-5">Betöltés...</div>;

    return (
        <div style={{ backgroundColor: '#452458', minHeight: '100vh' }}>
            <Navbar user={user} onLogout={onLogout} />

            {/* Banner kép */}
            <div className="container-fluid p-0">
                {game.images.length > 0 && (
                    
                    <Images
                        Class="w-100 img-fluid"
                        src={`https://nodejs301.dszcbaross.edu.hu/bigpicture/${game.images[0]}`}
                        altszov="Banner" 
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                )}
            </div>

            {/* Header Szekció (Cím, PFP, Gombok) */}
            <div className="py-3 px-3 shadow-sm" style={{ backgroundColor: '#652f80' }}>
                <div className="container">
                    <div className="row align-items-center g-3">

                        {/* Cím és Profilkép egy sorban mobilon is */}
                        <div className="col-12 col-md d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                            <Images
                                Class="rounded-circle border border-2 border-white shadow-sm flex-shrink-0"
                                src={`https://nodejs301.dszcbaross.edu.hu/creator/${game.creator_pfp}`}
                                altszov="Creator"
                                width={60}
                                height={60}
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="text-center text-md-start">
                                <h1 style={{ color: "white", fontWeight: "bold", fontSize: 'calc(1.3rem + 0.8vw)' }} className="mb-0">{game.title}</h1>
                                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: '1rem', marginBottom: 0 }}>By {game.creator}</p>
                            </div>
                        </div>

                        {/* Akció gombok (Download & Like) */}
                        <div className="col-12 col-md-auto d-flex justify-content-center align-items-center gap-3">
                            <Button
                                text="Download"
                                szin="btn btn-dark px-5"
                                onClick={async () => {
                                    if (!game.file || game.file === 'none') {
                                        alert('A játék fájl nem elérhető.');
                                        return;
                                    }
                                    try {
                                        const response = await fetch(`https://nodejs301.dszcbaross.edu.hu/file/${encodeURIComponent(game.file)}`, {
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
                            <button onClick={handleToggleLike} className="p-0 bg-transparent border-0 transition-scale">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="42"
                                    height="42"
                                    fill={liked ? "#ff4d4d" : "white"}
                                    className="bi bi-heart-fill shadow"
                                    viewBox="0 0 16 16"
                                >
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Galéria */}
            {/* Galéria Szekció */}
            <div className="container mt-4">
                {/* MOBIL NÉZET: Lapozható Carousel (csak kis képernyőn látszik) */}
                <div className="d-block d-sm-none">
                    <div id="gameGalleryMobile" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {game.images
                                .filter((img, i) => img && i !== 0)
                                .map((image, i) => (
                                    <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                                        <img
                                            className="d-block w-100 rounded shadow"
                                            src={`https://nodejs301.dszcbaross.edu.hu/kepek/${image}`}
                                            alt={`Screenshot ${i + 1}`}
                                            style={{ height: '250px', objectFit: "cover" }}
                                            onClick={() => { setIndex(i + 1); setOpen(true); }}
                                        />
                                    </div>
                                ))}
                        </div>
                        {/* Navigációs nyilak */}
                        <button className="carousel-control-prev" type="button" data-bs-target="#gameGalleryMobile" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#gameGalleryMobile" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                {/* ASZTALI NÉZET: Rácsrendszer (közepes és nagy képernyőn látszik) */}
                <div className="d-none d-sm-flex row g-3 justify-content-center">
                    {game.images
                        .filter((img, i) => img && i !== 0)
                        .map((image, i) => (
                            <div key={i} className="col-sm-4 col-md-3">
                                <img
                                    className="img-fluid rounded shadow-sm w-100 image-zoom"
                                    src={`https://nodejs301.dszcbaross.edu.hu/kepek/${image}`}
                                    alt={`Screenshot ${i + 1}`}
                                    style={{ height: '160px', objectFit: "cover", cursor: "pointer" }}
                                    onClick={() => { setIndex(i + 1); setOpen(true); }}
                                />
                            </div>
                        ))}
                </div>
            </div>

            {/* Leírás és Likes */}
            <div className="container mt-5 pb-5">
                <div className="row g-4 justify-content-center">
                    <div className="col-12 col-lg-4 text-center">
                        <div className="p-4 rounded-4 text-white shadow h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#652f80' }}>
                            <h2 className="fw-bold mb-0">Likes</h2>
                            <p className="display-3 fw-bold mb-0">{likeCount}</p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-8">
                        <div className="p-4 rounded-4 text-white shadow" style={{ backgroundColor: '#652f80', minHeight: '200px' }}>
                            <h4 className="fw-bold mb-3 border-bottom pb-2">About the Game</h4>
                            <div style={{ whiteSpace: 'pre-line', fontSize: '1.05rem', lineHeight: '1.7' }}>{game.description}</div>
                        </div>
                    </div>

                </div>
            </div>

            <Lightbox
                open={open}
                index={index}
                close={() => setOpen(false)}
                slides={game.images.filter(img => img).map(img => ({ src: `https://nodejs301.dszcbaross.edu.hu/kepek/${img}` }))}
                plugins={[Thumbnails, Zoom]}
            />
        </div>
    );
}