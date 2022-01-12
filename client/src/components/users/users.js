import React from 'react';
import './users.css'

class Users extends React.Component {
    constructor(props){
        super(props)
        this.state={  
            users: this.props.userdata,
            currentuser: ""
          }
          this.getClicked=this.getClicked.bind(this);
    }
    componentDidMount(){
        var i=0;
        setTimeout(() => {
            this.setState({users: this.props.userdata})
        }, 500);
        setTimeout(()=>{
            this.props.current(this.state.currentuser);
        },500)
    }
    getClicked=(e)=>{
        console.log(e.target.textContent)
        this.setState({currentuser: e.target.textContent})
        this.props.current(this.state.currentuser);
    }
    render(){ 
        return (<div className='users'>
            <input className='searchuser'/>
            <button className='clearbtn'>X</button>
            <div className='userslist'>
            {this.state.users.map((element)=>{
                return(<div className='usercard' id={element._id} key={element._id} onClick={this.getClicked}>
                    <div className='username'>{element.username}</div>
                    {/*<div className='usermessage'>{element[2].substring(0,30)+(element[2].length>=30?'...':'')}</div>*/}
                    {/*<div className={element[3]===0?'messageunread':'messageread'}></div>*/}
                </div>)
            })}
            </div>
        </div>);
    }
}

export default Users;