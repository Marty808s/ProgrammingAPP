import React, { useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import '../../../static/css/output.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    // stav pro login a register
    const [loginData, setLoginData] = useState({
        name: "", 
        password: ""
    })

    const [registerData, setRegisterData] = useState({
        name: "", 
        email: "", 
        password1: "", 
        password2: ""
    })

    // funkce pro změnu hodnot v inputech - aktualizace stavu, která se zavolá při změně hodnoty v inputech
    const handleLoginInputChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
      };
    
      const handleRegisterInputChange = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value});
      };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {
                name: loginData.name,
                password: loginData.password
            });
            if (response.status === 200) {
                console.log('Login successful:', response.data)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', loginData.name);
                navigate('/');
            } else {
                console.log('Login failed:', response.data)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (registerData.password1 !== registerData.password2) {
            console.log('Passwords do not match')
        } else {
            try {
                const response = await axios.post('/api/register', {
                    name: registerData.name,
                    email: registerData.email,
                    password: registerData.password1
                });
                if (response.status === 201) {
                    console.log('Register successful:', response.data)
                } else {
                    console.log('Register failed:', response.data)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    
    
    return (
        <>
            <Nav />
            <div className="container items-center min-h-screen px-4 mt-8">
                {/* Login form */}
                <div className="bg-gray-700 shadow-md rounded mx:auto pt-5 p-4 px-8 w-full max-w-md">
                    <h1 className="text-3xl text-white font-bold mb-6 text-center">Přihlaste se</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                Uživatelské jméno
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="username" 
                                name="name"
                                type="text" 
                                placeholder="Uživatelské jméno" 
                                value={loginData.name}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                                Heslo
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" 
                                name="password"
                                type="password" 
                                placeholder="******************" 
                                value={loginData.password}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Přihlásit se
                            </button>
                            <a className="inline-block align-baseline px-4 font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Zapomněli jste heslo?
                            </a>
                        </div>
                    </form>
                </div>

                 {/* Register form */}
                 <div className="bg-gray-700 shadow-md rounded mx:auto mt-8 mb-32 pt-5 p-4 px-8 w-full max-w-md">
                    <h1 className="text-3xl text-white font-bold mb-6 text-center">Registrujte se</h1>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="username_reg">
                                Uživatelské jméno
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="username_reg" 
                                name="name"
                                type="text" 
                                placeholder="Uživatelské jméno" 
                                value={registerData.name}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="email_reg">
                                Email
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="email_reg" 
                                name="email"
                                type="email" 
                                placeholder="Email" 
                                value={registerData.email}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="password1_reg">
                                Heslo
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password1_reg" 
                                name="password1"
                                type="password" 
                                placeholder="******************" 
                                value={registerData.password1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="password2_reg">
                                Heslo pro kontrolu
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password2_reg" 
                                name="password2"
                                type="password" 
                                placeholder="******************" 
                                value={registerData.password2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Registrujte se
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;