import React from 'react';
import './chat.css';
import testimg from './dp.png';

export default function Chat() {
    return (<div className='chat'>
        <div className='receiverarea'>
            <div className='receivername'>John Doe</div>
        </div>
        <div className='messagearea'>
            <div className='messagesender'>
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
                <input className='editname' value="John Doe"/>
                <input className='editabout' value="Hey there, I am not using this app"/>
            </div>
        </div>
    </div>);
}