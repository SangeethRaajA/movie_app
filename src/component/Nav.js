import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Main from "./Main";
import Upcoming from "./UpComing";

const Nav = () => {
    return (
        <Router>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link to="/" class="nav-link">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/upcoming" class="nav-link">Upcoming Movies</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route exact path='/' element={<Main />} />
                <Route path='/upcoming' element={<Upcoming />} />
            </Routes>
            
        </Router>
    )
}

export default Nav;