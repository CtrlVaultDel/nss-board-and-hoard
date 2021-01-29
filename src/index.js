import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { BoardAndHoard } from './components/BoardAndHoard';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <BoardAndHoard />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);