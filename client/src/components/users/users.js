import React from 'react';
import './users.css'

export default function Users() {
    const users = [
        ['Alex', 'Bro, help me! Send todays notes',1],
        ['Julia', 'Its final, PYTHON OR ME',1],
        ['Rajesh', 'Who took my burger??',0],
        ['Harry', 'Hi, I give you a burger if you do my homework',0],
        ['Meghan', 'Im calling the FBI on you',0],
        ['Alex', 'Bro, help me! Send todays notes',1],
        ['Julia', 'Its final, PYTHON OR ME',1],
        ['Rajesh', 'Who took my burger??',0],
        ['Harry', 'Hi, I give you a burger if you do my homework',0],
        ['Meghan', 'Im calling the FBI on you',0]
    ];
    return (<div className='users'>
        <input className='searchuser'/>
        <button className='clearbtn'>X</button>
        <div className='userslist'>
        {users.map((element)=>{
            return(<div className='usercard'>
                <div className='username'>{element[0]}</div>
                <div className='usermessage'>{element[1].substring(0,30)+'...'}</div>
                <div className={element[2]===0?'messageunread':'messageread'}></div>
            </div>)
        })}
        </div>
    </div>);
}