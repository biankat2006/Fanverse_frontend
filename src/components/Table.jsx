import { useState, useEffect } from "react";

import Button from "./Button"

export default function Table({ allUsers, allGames,onEditGame,onEditUser, onDeleteUser, onDeleteGame }) {
    const [tableButton, setTableButton] = useState(1)
    const [expandedGames, setExpandedGames] = useState({}); // key: game_id, value: true/false
    const maxLength = 50; // hány karaktert mutatunk alapból


    const toggleExpand = (gameId) => {
        setExpandedGames(prev => ({ ...prev, [gameId]: !prev[gameId] }));
    };

   console.log();
    return (
        <>
            {tableButton === 1 &&
                <div>
                    <Button szin='btn btn-sm btn-danger' text='Profilok' onClick={() => setTableButton(1)} />
                    <Button szin='btn btn-sm btn-dark px-4' text='Játékok' onClick={() => setTableButton(2)} />
                    <table className="table table-striped table-hover table-dark rounded-3 overflow-hidden">
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Profile Picture</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers?.map(user => (
    <tr className="text-center" key={user.user_id}>
        <td>{user.user_id}</td>
        {/* Itt volt a csere: Most az Email kerül az Email oszlop alá */}
        <td>{user.email}</td> 
        {/* Most a Username kerül a Username oszlop alá */}
        <td>{user.username}</td> 
        <td>{user.pfp}</td>
        <td>{user.role}</td>
        <td className="d-flex justify-content-evenly">
            <Button szin='btn btn-sm btn-warning' text='Szerkesztés' onClick={() => onEditUser(user)} />
            <Button szin='btn btn-sm btn-danger px-4' text='Törlés' onClick={() => onDeleteUser(user)} />
        </td>
    </tr>
))} 
                        </tbody>
                    </table>
                </div>
            }
            {tableButton === 2 &&
                <div>
                    <Button szin='btn btn-sm btn-dark' text='Profilok' onClick={() => setTableButton(1)} />
                    <Button szin='btn btn-sm btn-danger px-4' text='Játékok' onClick={() => setTableButton(2)} />

                    <table className="table table-striped table-hover table-dark rounded-3 overflow-hidden">
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Banner</th>
                                <th>Creator</th>
                                <th>Images</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allGames?.map(game => {
                                const isExpanded = expandedGames[game.game_id] || false;
                                return (
                                    <tr className="text-center" key={game.game_id}>
                                        <td>{game.game_id}</td>
                                        <td>{game.title}</td>
                                        <td>
                                            {isExpanded
                                                ? game.description
                                                : game.description.slice(0, maxLength) + (game.description.length > maxLength ? "..." : "")
                                            }
                                            {game.description.length > maxLength && (
                                                <button
                                                    className="btn btn-sm btn-link p-0 ms-2 text-warning"
                                                    onClick={() => toggleExpand(game.game_id)}
                                                >
                                                    {isExpanded ? "Kevesebb" : "Tovább"}
                                                </button>
                                            )}
                                        </td>
                                        <td>{game.banner_pic}</td>
                                        <td>{game.creator_name}</td>
                                        <td>
                                            {game.images
                                                ? game.images.split(',').map((img, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={img.trim()}
                                                        alt={`game-${idx}`}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '5px' }}
                                                    />
                                                ))
                                                : 'N/A'
                                            }
                                        </td>
                                        <td className="d-flex justify-content-evenly">
                                            <Button szin='btn btn-sm btn-warning' text='Szerkesztés' onClick={() => onEditGame(game)} />
                                            <Button szin='btn btn-sm btn-danger px-4' text='Törlés' onClick={() => onDeleteGame(game)} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
            
        </>
        
    )
}