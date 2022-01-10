import React from 'react';
import Chat from '../chat/chat';
import Users from '../users/users';
import './mainscreen.css';

class Mainscreen extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(<div className='mainscreen'>
            <Users/>
            <Chat data = {this.props.data}/>
        </div>);
    }
}
export default Mainscreen;