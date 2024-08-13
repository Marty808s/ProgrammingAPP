import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../static/css/output.css';

function FirstScreen() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/playground');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="grid grid-cols-1 gap-4 justify-center text-center">
                <div>
                    <h1 className="text-4xl font-bold text-blue-400">Jdeme se naučit programovat v Pythonu!</h1>
                </div>
                <div className="flex justify-center">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
                        onClick={handleClick}
                    >
                        Jdeme na to!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FirstScreen;