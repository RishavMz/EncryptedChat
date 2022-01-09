import react from 'react';
import axios from 'axios';
import './login.css';

class Login extends react.Component {
    constructor() {
        super();
        this.state={
            username:"",
            password:""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleLogin = async(e)=>{
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        console.log('avk')
        await axios.post(`http://127.0.0.1:5000/auth/login`, data).then((res)=>{
            console.log(res);
        })
    }
    render(){
        return (<div className='loginscreen'>
            <center>
            <br/><label className='loginlabel'>Username</label>
            <br/><input type="text" className='logininput' name="username" onChange={this.changeHandler} value={this.state.username}/>
            <br/><label className='loginlabel'>Password</label>
            <br/><input type="password" className='logininput' name="password" onChange={this.changeHandler} value={this.state.password}/>
            <br/><button type="submit" onClick={this.handleLogin} className="loginbtn">Login</button><br/>
            </center>
        </div>);
    }
}

export default Login;