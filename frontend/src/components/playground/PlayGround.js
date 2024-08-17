import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import Assignment from './Assignment';
import NavCode from './NavCode';



class PlayGround extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <>
                <NavCode />
                <Assignment nazev="Tohle je Playground!" text="Tohle zadání je fakt neskutečný a těžký!" />
                <CodeEditor />
            </>
        )
    }

}
export default PlayGround;