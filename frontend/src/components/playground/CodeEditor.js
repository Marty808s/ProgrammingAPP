import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useEffect } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';

function CodeEditor() {
    const [code, setCode] = useState("print('Hello, World!')");
    const [output, setOutput] = useState("");
    const [level, setLevel] = useState(null);
    const [levelId, setLevelId] = useState('0'); // zatím defaultně level 0

    // GET na level result podle level_id
    // zatím defaultně level 0 - úvodní úroveň, pak změnit podle level_id param přes URL
    // POKUD už vlastně zjistím level_id z URL, tak nemusím přes get dostat result a porovnat ho přes get code,
    //  ale můžu přes get code dostat result a porovnat ho přes level_id, který bude v post jsonu - pak to bude jednodušší a vrátím boolean T/F

    useEffect(() => {
        fetchLevel();
    }, [levelId]);

    const fetchLevel = async () => {
        try {
            const response = await fetch(`/api/level?level_id=${levelId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLevel(data);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // handleSubmit na submit buttonu pro odeslání kódu a získání outputu
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
                    id_user: 'WjDY8l5hcPIQkG11RWsxUhGhiKNAs6lO',
                    code: code,
                    level: level.level_id
                }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // GET výstup kódu
            const result = await response.json();
            setOutput(result.code_output || 'No output received');

            if (result.code_output === level.result) {
                console.log(`Super, máš to správně!: ${level.level_id}`);
            } else {
                console.log(`Špatně, zkus to znovu!: ${level.level_id}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setOutput('An error occurred while running the code.');
        }
    };

    return (
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
    )
}

export default CodeEditor;