import React from 'react';
import Modal from 'react-modal';

function CoderBox({ isOpen, onRequestClose, contentLabel, level }) {
    Modal.setAppElement('#main');
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#404040', // Tmavé pozadí
            borderRadius: '0.5rem',
            padding: '2rem',
            border: 'none',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            style={customStyles}
        >
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4 text-green-600">Gratulujeme!</h2>
                <p className="mb-6 text-white">
                    Úspěšně jste dokončili úkol: <strong>{level?.level_name || 'Unknown Level'}</strong>!
                </p>
                <p className="mb-6 text-white">Level: {level?.level_id}</p>
                <p className="mb-6 text-white">Zadání: {level?.level_description}</p>
                <button 
                    onClick={onRequestClose}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    Zavřít
                </button>
            </div>
        </Modal>
    )
}

export default CoderBox;