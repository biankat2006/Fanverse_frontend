import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/NavBar";
import Button from "../components/Button";
import { logout, whoami, editUsername, editProfilePicture } from "../api";
import Input from "../components/Input";
import Images from "../components/Images";
import pfpDefault from "../photos/pfp.jpg";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser() {
            const data = await whoami();
            if (data && !data.error) {
                setUser(data);
                setNewUsername(data.username || '');
            } else {
                // Ha 401 Unauthorized, dobjuk ki a loginra
                navigate("/login");
            }
        }
        loadUser();
    }, [navigate]);

    const handleUpdateUsername = async () => {
        if (!newUsername) return alert("Adj meg egy nevet!");

        const response = await editUsername(newUsername);

        if (response.error) {
            alert("Hiba: " + response.error);
        } else {
            alert("Név frissítve!");
            // Ne csak a lokális state frissüljön, hanem újrahívjuk a whoami-t
            const updatedUser = await whoami();
            if (!updatedUser.error) setUser(updatedUser);
        }
    };


    const onLogout = async () => {
        await logout(); // EZ már az API logout
        navigate("/login");
    };

    const handleUploadPfp = async () => {
        if (!selectedFile) return alert("Válassz ki egy képet!");

        const formData = new FormData();
        formData.append('pfp', selectedFile);

        const response = await editProfilePicture(user.user_id, formData);

        if (response.error) {
            alert("Hiba: " + response.error);
        } else {
            alert("Profilkép frissítve!");

            // A backendtől kapott elérési út (pfp kulcs)
            const newPath = response.pfp || response.newImageUrl || response.path;

            if (newPath) {
                setUser({ ...user, pfp: newPath });
            }

            // Memória felszabadítása az ideiglenes URL-nek
            URL.revokeObjectURL(selectedFile);
            setSelectedFile(null);
        }
    };

    console.log("USER:", user);
    console.log("PFP:", user?.pfp);
    return (
        <div style={{ backgroundColor: '#452458', minHeight: "100vh" }}>
            <Navbar user={user} onLogout={onLogout} />
            <h1 className="text-center text-white ">Ha szerkeszted a profilképet vagy a felhasználónevet újra be kell jelentkezned </h1>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div className="text-center" style={{ width: 450 }}>

                    <div style={{ position: "relative", display: "inline-block" }}>
                        <Images
                            Class={"image rounded-circle mx-auto d-block"}
                            src={
                                selectedFile
                                    ? URL.createObjectURL(selectedFile)
                                    : (user?.pfp && user.pfp !== "nincs"
                                        ? `https://nodejs301.dszcbaross.edu.hu/user_pfp/${user.pfp}`
                                        : pfpDefault)
                            }
                            altszov="Profile Picture"
                            height={200}
                            width={200}
                            style={{ objectFit: 'cover' }}
                        />
                        <input
                            type="file"
                            id="pfpInput"
                            style={{ display: 'none' }}
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            accept="image/*"
                        />
                        <label htmlFor="pfpInput" className="btn btn-danger rounded-circle" style={{
                            position: "absolute", bottom: 10, right: 10, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>✏️</label>
                    </div>

                    {selectedFile && (
                        <div className="mt-2">
                            <Button
                                text="Kép mentése"
                                szin="btn btn-sm btn-outline-light"
                                onClick={async () => {
                                    await handleUploadPfp(); // A név frissítése helyett a KÉP feltöltést hívjuk
                                    onLogout();              // Utána kiléptetünk
                                }}
                            />
                        </div>
                    )}

                    <div className="mt-4">
                        <Input
                            label='Username szerkesztése'
                            type='text'
                            value={newUsername}
                            setValue={setNewUsername}
                            placeholder={user?.username || 'John Doe'}
                        />
                        <Button text="Név mentése" szin="btn btn-danger px-4 mt-2" onClick={() => {
                            handleUpdateUsername();
                            onLogout();
                        }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}