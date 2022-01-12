import React from 'react';
import axios from 'axios';
import Chat from '../chat/chat';
import Users from '../users/users';
import './mainscreen.css';

class Mainscreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: this.props.data,
            userdata: []
        }
    }
    componentDidMount=async()=>{
        await axios.get(`http://127.0.0.1:5000/user/`)
        .then((res)=>{
            this.setState({userdata: res.data})
            //console.log("Data", this.state.userdata)
        })
    }
    render(){
        return(<div className='mainscreen'>
            <Users userdata = {this.state.userdata}/>
            <Chat data = {this.props.data} userdata={this.state.userdata}/>
        </div>);
    }
}
export default Mainscreen;