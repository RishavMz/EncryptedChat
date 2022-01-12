import React from 'react';
import axios from 'axios';
import JSEncrypt from 'jsencrypt';
import './chat.css';
import testimg from './dp.png';

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.changehandler = this.changeHandler.bind(this);
        this.handleMessageSent = this.handleMessageSent.bind(this);
        this.checkNewMessages = this.checkNewMessages.bind(this);
        this.state={
            receiver: "",
            privatekey:this.props.data.privateKey,
            publickey:this.props.data.publicKey,
            myname: this.props.data.username,
            myabout:"",
            message: "",
            messages : []
        }
    }
    componentDidMount(){     
        this.checkNewMessages();       
        setInterval(()=>{
            this.checkNewMessages();
            //console.log(this.props.data.privateKey)
        }, 5000);
        setTimeout(() => {
            console.log(this.props)
            this.setState({receiver: this.props.data.username})
        }, 500);
    }
    componentDidUpdate(){
        console.log("Noe")
        setTimeout(() => {
            this.setState({receiver: this.props.userdata})
        }, 500);
    }
    async checkNewMessages(){
        try{
            await axios.post(`http://127.0.0.1:5000/message/messages`, {username: this.props.data.username}).then(async(res)=>{
                const temp = res.data;
                temp.forEach(async(e)=>{
                    //console.log(e.message);
                    e.message =  this.decryptmessage(e.message);
                    //console.log(e.message)
                })
                this.setState({messages: temp});
            })
        } catch(err){
            console.log(err);
        }
        
    }
    getPublicKey(user){
        this.setState({publickey: user.publickey});
    }
    encryptmessage(message, pkey){
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(pkey);
        const data = encrypt.encrypt(message);
        return data;
    }
    decryptmessage(message){
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(this.props.data.privateKey);
        const dcdata = decrypt.decrypt(message);
        return dcdata;
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleMessageSent = async(e)=>{
        e.preventDefault();
        await axios.post(`http://127.0.0.1:5000/message/publickey`,{username: this.state.myname})
        .then(async(res)=>{
            await axios.post(`http://127.0.0.1:5000/message/message`, {username: this.state.myname, receiver: this.state.receiver, message: this.encryptmessage(this.state.message, res.data)})
            .then((res) =>{
                //console.log(res);
            })
        })
        await axios.post(`http://127.0.0.1:5000/message/publickey`,{username: this.state.receiver})
        .then(async(res)=>{
            await axios.post(`http://127.0.0.1:5000/message/messageack`, {username: this.state.myname, receiver: this.state.receiver, message: this.encryptmessage(this.state.message, res.data)})
            .then((res) =>{
                //console.log(res);
            })
        })
        this.setState({message: ""})
    }
    render(){
        return (<div className='chat'>
            <div className='receiverarea'>
                <div className='receivername'>{this.state.receiver}</div>
            </div>
            <div className='messagearea'>
                <div className='messagesender'>
                    <div className='messagespace'>
                        {this.state.messages.map((element)=>{
                            return(<div key={element._id} className={`message ${(element.sender===this.props.data.username)?'messagesent':'messagereceived'}`}>{element.message}</div>)
                        })}
                    </div>
                    <input className='messagetyper' name="message" onChange={this.changeHandler} value={this.state.message}/>
                    <button className='messagesenderbtn' onClick={this.handleMessageSent}>SEND</button>
                </div>
            </div>
            <div className='userviewer'>
                <div className='viewuser viewreceiver'>
                    <img className='viewdp' src= {testimg} height={150} alt='receiver'/>
                    <div className='viewname'>{this.state.receiver}</div>
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