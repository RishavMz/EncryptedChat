import React from 'react';
import Chat from '../chat/chat';
import Users from '../users/users';
import './mainscreen.css';

class Mainscreen extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return(<div className='mainscreen'>
            <Users/>
            <Chat/>
        </div>);
    }
}
export default Mainscreen;