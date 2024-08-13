import React, { Component } from 'react';
import HomePage from './HomePage';
import PlayGround from './PlayGround';
import '../../static/css/output.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="min-h-screen bg-white text-black dark:text-white items-center justify-center">
        <HomePage />
      </div>
    );
  }
}

export default App;