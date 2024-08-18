import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import Assignment from './Assignment';

function CodeEditor() {
    const navigate = useNavigate(); // pro redirekt
    const location = useLocation(); // pro hledání paramů v URL
    const username = localStorage.getItem('username'); // jméno uživatele z localStorage
    const [code, setCode] = useState("print('Hello, World!')"); // kód pro odeslání
    const [output, setOutput] = useState(""); // výstup kódu
    const [levels, setLevels] = useState([]); // všechny úrovně
    const [currentLevel, setCurrentLevel] = useState(null); // aktuální level podle param v URL
    const [userInfo, setUserInfo] = useState(null); // info o uživateli

    // načtení úrovní a info o uživateli
    useEffect(() => {
        if (!username) {
            navigate('/login'); // nejsi přihlášen => zmiz
        } else {
            const searchParams = new URLSearchParams(location.search); // hledání paramů v URL
            const levelIdFromParams = searchParams.get('level_id'); // získání level_id z URL
            localStorage.setItem('currentLevel', levelIdFromParams); // uložím level_id do localStorage

            if (levelIdFromParams) {
                fetchLevels(levelIdFromParams); // načtení úrovní podle level_id z URL + aktuální
            } else {
                console.error('Nemám level_id v URL');
            }
            fetchUserInfo(); // načtení info o uživateli
        }
    }, [navigate, username, location.search]);

    // fetchnui všechny levels
    const fetchLevels = async (id) => {
        try {
            const response = await fetch(`/api/levelall`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLevels(data); //uložím všechny úrovně
            const selectedLevel = data.find(level => level.level_id.toString() === id); // vyberu aktuální level
            if (selectedLevel) {
                setCurrentLevel(selectedLevel); //nastavím aktuální úroveň
                console.log(selectedLevel);
                setCode(selectedLevel.initial_code || "print('Hello, World!')"); // default code
            } else {
                console.error('Nemám aktuální level');
            }
            console.log('Levels:', data);
        } catch (error) {
            console.error('Error levels:', error);
        }
    };

    // fetchnu info o uživateli
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`/api/userinfo?username=${username}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserInfo(data); //uložím info o uživateli
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // handleSubmit na submit buttonu pro odeslání kódu a získání outputu
    // - poslu kod na server - ziskám output - validace outputu s levelem
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted code:", code);
        setOutput("Running code...");
        
        try {
            const response = await fetch('/api/code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    id_user: userInfo.user_id,
                    code: code,
                    level: currentLevel.level_id
                }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // GET výstup kódu
            const result = await response.json();
            setOutput(result.code_output || 'No output received');

            // validace outputu s levelem
            if (result.code_output === currentLevel.result) {
                console.log(`Super, máš to správně!: ${currentLevel.level_id}`);
            } else {
                console.log(`Špatně, zkus to znovu!: ${currentLevel.level_id}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setOutput('An error occurred while running the code.');
        }
    };

    return (
    <>
        <Assignment 
        level_name={currentLevel?.level_name} 
        level_description={currentLevel?.level_description} 
        level_code={currentLevel?.level_code} />

    <div className="fixed bottom-0 left-0 right-0 items-center justify-center mx-auto py-2 px-4">
        <form id="pythonForm" className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <CodeMirror
                    value={code}
                    options={{
                        mode: 'python',
                        theme: 'material',
                        lineNumbers: true,
                    }}
                    onBeforeChange={(editor, data, value) => {
                        setCode(value);
                    }}
                />
            </div>
            <div>
                <textarea
                    id="outputArea"
                    className="w-full h-24 p-2 mt-1 bg-gray-700 text-white rounded"
                    value={output}
                    readOnly
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700">Run Code</button>
        </form>
    </div>
    </>
    )
}

export default CodeEditor;