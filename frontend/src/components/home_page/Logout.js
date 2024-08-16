import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Footer from './Footer';

function Logout() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        handleLogout();
    }, []);

    const handleLogout = async () => {
        try {
            const sessionKey = localStorage.getItem('sessionKey');
            // odhlášení na serveru
            await axios.post('/api/logout', { sessionKey }, { withCredentials: true });
            
            // vyčištění lokálního úložiště
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('sessionKey');
            sessionStorage.clear();
            
            // přesměrování na hlavní stránku
            setTimeout(() => {
                navigate('/')
            },1500);
        } catch (error) {
            setError('Odhlášení se nezdařilo. Zkuste to prosím znovu.');
            console.error('Chyba při odhlašování:', error);
        }
    }

    return (
        <>
            <Nav />
            <div className="container items-center min-h-screen px-4 mt-8">
                <h1 className="text-3xl text-white font-bold mb-6 text-center">Odhlášení</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <p className="text-white text-center">Byli jste úspěšně odhlášeni.</p>
            </div>
            <Footer />
        </>
    )
}

export default Logout;