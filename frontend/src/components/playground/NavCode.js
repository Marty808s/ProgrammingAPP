import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


//TO:DO:
// - přidat progress bar - zelena, pokud je progress 1
function NavCode() {
    const navigate = useNavigate();
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        fetchLevels();
    }, []);

    const fetchLevels = async () => {
        const response = await fetch('/api/levelall');
        const data = await response.json();
        setLevels(data);
        console.log(data);
    };

    const handleLevelClick = (level_id) => {
        window.location.href = `/playground?level_id=${level_id}`;
    };

    return (
        <div className='flex mx-auto flex-col items-center justify-center bg-gray-600'>
            { localStorage.getItem('username') ?
            <div className='w-full text-left mb-4 px-4'> 
                <h1 className='text-white'>{localStorage.getItem('username')}</h1>
            </div>:
            <div className='w-full text-ceter mb-4 px-4'>
                <button className='text-white p-2 rounded-md' onClick={() => navigate('/login')}>Přihlaste se!</button>
            </div>}
            <div className='flex flex-col items-center gap-4 justify-center p-4 bg-gray-600'>
                {levels.map((level) => (
                    <button 
                    onClick={() => handleLevelClick(level.level_id)} 
                    key={level.level_id} 
                    className={
                        level.level_id.toString() === localStorage.getItem('currentLevel')
                            ? 'p-4 bg-blue-500 text-white rounded hover:bg-gray-600 transition-colors duration-200'
                            : 'p-4 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-200'
                    }
                    >
                        {level.level_id}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default NavCode;