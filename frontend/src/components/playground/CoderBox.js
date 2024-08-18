import React from 'react';
import Modal from 'react-modal';

function CoderBox({ isOpen, onRequestClose, contentLabel, level }) {
    Modal.setAppElement('#main');
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Tmavší průhledné pozadí
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
        },
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            style={customStyles}
        >
            <h2 className="text-4xl font-bold mb-4 text-green-600">Gratulujeme!</h2>
            <p className="mb-6 text-gray-700">
                Úspěšně jste dokončili úkol: <strong>{level?.level_name || 'Unknown Level'}</strong>!
            </p>
            <p className="mb-6 text-gray-700">Level: {level?.level_id}</p>
            <p className="mb-6 text-gray-700">Zadání: {level?.level_description}</p>
            <button 
                onClick={onRequestClose}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
                Zavřít
            </button>
        </Modal>
    )
}

export default CoderBox;