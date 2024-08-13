import React from 'react';
import '../../static/css/output.css';

function Assignment({ nazev, text }){
    return(
        <div className="container py-2 px-4">
                <h1 className="text-2xl font-bold text-white">{nazev}</h1>
                <p className="text-white">{text}</p>
        </div>
    )
}

export default Assignment;