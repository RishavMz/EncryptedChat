import React from 'react';
import JSEncrypt from 'jsencrypt';
import './chat.css';
import testimg from './dp.png';

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.changehandler = this.changeHandler.bind(this);
        this.handleMessageSent = this.handleMessageSent.bind(this);
        this.state={
            privatekey:"",
            publickey:"",
            myname: "",
            myabout:"",
            message: "",
            messages : []
        }
    }
    componentDidMount(){
        this.setState({
            privatekey:this.props.data.privatekey,
            myname: this.props.data.username,
        })
    }
    getPublicKey(user){
        this.setState({publickey: user.publickey});
    }
    encryptmessage(message){
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(this.state.publickey);
        const data = encrypt.encrypt(message);
        return data;
    }
    decryptmessage(message){
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(this.state.privatekey);
        const data = decrypt.decrypt(message);
        return data;
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleMessageSent = (e)=>{
        e.preventDefault();
        const message = this.state.message;
        const messages = this.state.messages;
        if(message.length===10)  messages.pop(0);
        messages.push([1,(message)]);
        this.setState({message:"", messages: messages});
    }
    render(){
        return (<div className='chat'>
            <div className='receiverarea'>
                <div className='receivername'>John Doe</div>
            </div>
            <div className='messagearea'>
                <div className='messagesender'>
                    <div className='messagespace'>
                        {this.state.messages.map((element)=>{
                            return(<div key={element[1]} className={`message ${element[0]===1?'messagesent':'messagereceived'}`}>{element[1]}</div>)
                        })}
                    </div>
                    <input className='messagetyper' name="message" onChange={this.changeHandler} value={this.state.message}/>
                    <button className='messagesenderbtn' onClick={this.handleMessageSent}>SEND</button>
                </div>
            </div>
            <div className='userviewer'>
                <div className='viewuser viewreceiver'>
                    <img className='viewdp' src= {testimg} height={150} alt='receiver'/>
                    <div className='viewname'>John Doe</div>
                    <div className='viewabout'>Hi there, I am not using this app</div>
                </div>
                <div className='viewuser viewme'>
                <img className='viewdp' src= {testimg} height={150} alt='sender'/>
                <button className='changedp'>+</button>
                    <input className='editname'  name="myname"  onChange={this.changehandler}  value={this.state.myname} />
                    <input className='editabout' name="myabout"  onChange={this.changehandler}  value={this.state.myabout}/>
                </div>
            </div>
        </div>);
    }
}

export default Chat;