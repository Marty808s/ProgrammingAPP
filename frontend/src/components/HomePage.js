import React, { Component } from 'react';
import PlayGround from './PlayGround';
import FirstScreen from './FirstScreen';
import '../../static/css/output.css';
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
                </Routes>
            </Router>
        )
    }

}
export default HomePage;