import React from 'react';
import '../../../static/css/output.css';

function Assignment({ level_name, level_description, level_code=null }){
    return(
        <div className="container py-2 px-4">
                <h1 className="text-2xl font-bold text-white">{level_name}</h1>
                <p className="text-white">{level_description}</p>
                { level_code && <p className="text-white">{level_code}</p> }
        </div>
    )
}

export default Assignment;