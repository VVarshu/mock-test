// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' in React 18
import App from './App';
import { UserProvider } from './context/UserContext'; // Import the UserProvider correctly

const root = ReactDOM.createRoot(document.getElementById('root')); // Correctly obtain the root DOM element
root.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>
);
