import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


//TO:DO:
// - přidat progress bar - zelena, pokud je progress 1
function NavCode() {
    const navigate = useNavigate();
    const [levels, setLevels] = useState([]);
    const [progress, setProgress] = useState([]);
    const id_user = localStorage.getItem('id_user');
    const currentLevel = localStorage.getItem('currentLevel');

    useEffect(() => {
        fetchLevels();
        if (id_user) {
            fetchProgress();
        }
    }, [id_user]);


    const fetchProgress = async () => {
        try {
            const response = await fetch(`/api/progress?id_user=${id_user}`);
            if (!response.ok) {
                throw new Error('Failed to fetch progress');
            }
            const data = await response.json();
            console.log('Progress:', data);
            setProgress(data);
        } catch (error) {
            console.error('Error fetching progress:', error);
        }
    };

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
            {id_user ? (
                <div className='w-full text-left mb-4 px-4'> 
                    <h1 className='text-white'>{localStorage.getItem('username')}</h1>
                </div>
            ) : (
                <div className='w-full text-center mb-4 px-4'>
                    <button className='text-white bg-blue-500 p-2 rounded-md hover:bg-blue-600' onClick={() => navigate('/login')}>Přihlaste se!</button>
                </div>
            )}
            <div className='flex flex-col items-center gap-4 justify-center p-4 bg-gray-600'>
                {levels.map((level) => {
                    const isCurrentLevel = level.level_id.toString() === currentLevel;
                    const progressForLevel = progress.find(p => p.level_id === level.level_id);
                    const isCompleted = progressForLevel && progressForLevel.progress === 1;

                    let buttonClass = 'p-4 text-white rounded transition-colors duration-200 ';
                    
                    if (isCurrentLevel && isCompleted) {
                        buttonClass += 'bg-green-700 hover:bg-green-800 border border-white';
                    } else if (isCurrentLevel) {
                        buttonClass += 'bg-blue-500 hover:bg-blue-600 border-white';
                    } else if (isCompleted) {
                        console.log("Jsem completed!");
                        buttonClass += 'bg-green-500 hover:bg-green-700';
                    } else {
                        buttonClass += 'bg-gray-500 hover:bg-gray-700';
                    }

                    return (
                        <button 
                            onClick={() => handleLevelClick(level.level_id)} 
                            key={level.level_id} 
                            className={buttonClass}
                        >
                            {level.level_id}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default NavCode;