import React from 'react';
import './chat.css';
import testimg from './dp.png';

export default function Chat() {
    const messages = [
        [0,'I feel so unsure'],
        [1,'As I take your hand'],
        [0,'And lead you'],
        [1,'To the dance floor'],
        [0,'As the music dies'],
        [1,'Something in your eyes'],
        [0,'calls to mind a silver screen'],
        [1,'And all it says goodbye'],
        [0,'Im never gonna dance again'],
        [1,'Yeah sure bro, never dance ever again lmao'],
    ]
    return (<div className='chat'>
        <div className='receiverarea'>
            <div className='receivername'>John Doe</div>
        </div>
        <div className='messagearea'>
            <div className='messagesender'>
                <div className='messagespace'>
                    {messages.map((element)=>{
                        return(<div className={`message ${element[0]===1?'messagesent':'messagereceived'}`}>{element[1]}</div>)
                    })}
                </div>
                <input className='messagetyper'/>
                <button className='messagesenderbtn'>SEND</button>
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
                <input className='editname' value="Yeltsa Kcir"/>
                <input className='editabout' value="Never gonna give you up, never gonna let you down"/>
            </div>
        </div>
    </div>);
}