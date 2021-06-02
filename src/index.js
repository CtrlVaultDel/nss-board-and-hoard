// React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

// Components
import { BoardAndHoard } from './components/BoardAndHoard';

// Styles
import "./index.css";

/* ===================================================== */

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <BoardAndHoard />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);