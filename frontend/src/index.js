import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import '../static/css/output.css';

// uživatel dostane session key
fetch('api/init')
  .then(response => response.json())
  .then(data => {
    console.log('Session initialized:', data.session_key);
    localStorage.setItem('sessionKey', data.session_key);
    //const sessionKey = localStorage.getItem('sessionKey');
  })
  .catch(error => console.error('Error initializing session:', error));


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App/>);