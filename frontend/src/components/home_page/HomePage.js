import React, { Component } from 'react';
import PlayGround from '../playground/PlayGround';
import FirstScreen from './FirstScreen';
import Login from './Login';
import Logout from './Logout';
import '../../../static/css/output.css'
import { 
    BrowserRouter as Router, 
    Route, 
    Routes,
    Link
} from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Router>
                <Routes>
                    <Route path="/" element={<FirstScreen/>} />
                    <Route path="/playground" element={<PlayGround />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Router>   
        )

    }

}
export default HomePage;