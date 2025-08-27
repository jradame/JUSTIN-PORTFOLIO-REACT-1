/*
 * index.js - The entry point where React meets the real DOM
 * This is where the magic happens - takes my App component and injects it 
 * into the HTML div with id="root". Pretty much the bridge between 
 * regular HTML and React world
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Get reference to the root div in public/index.html and create a React root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the entire App component tree into that root div
root.render(
  <React.StrictMode> {/* Helps catch bugs and deprecated patterns during development */}
    <App />
  </React.StrictMode>
);

/*
 * Web Vitals reporting - tracks performance metrics like load times
 * Currently just using the default setup, but could hook this up to 
 * analytics later if I want to monitor how fast the site loads for users
 * Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals();

