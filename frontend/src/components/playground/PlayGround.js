import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import NavCode from './NavCode';



class PlayGround extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <>
                <NavCode />
                <CodeEditor />
            </>
        )
    }

}
export default PlayGround;