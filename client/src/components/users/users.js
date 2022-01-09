import React from 'react';
import './users.css'

class Users extends React.Component {
    constructor(){
        super()
        this.state={
            users : [
                [0,'Alex', 'Bro, help me! Send todays notes',1],
                [1,'Julia', 'Its final, PYTHON OR ME',1],
                [2,'Rajesh', 'Who took my burger??',0],
                [3,'Harry', 'Hi, I give you a burger if you do my homework',0],
                [4,'Meghan', 'Im calling the FBI on you',0],
                [5,'Alex', 'Bro, help me! Send todays notes',0],
                [6,'Julia', 'Its final, PYTHON OR ME',0],
                [7,'Rajesh', 'Who took my burger??',0],
                [8,'Harry', 'Hi, I give you a burger if you do my homework',0],
                [9,'Meghan', 'Im calling the FBI on you',0]
            ]
        }
    }
    render(){ 
        return (<div className='users'>
            <input className='searchuser'/>
            <button className='clearbtn'>X</button>
            <div className='userslist'>
            {this.state.users.map((element)=>{
                return(<div className='usercard' key={element[0]}>
                    <div className='username'>{element[1]}</div>
                    <div className='usermessage'>{element[2].substring(0,30)+(element[2].length>=30?'...':'')}</div>
                    <div className={element[3]===0?'messageunread':'messageread'}></div>
                </div>)
            })}
            </div>
        </div>);
    }
}

export default Users;