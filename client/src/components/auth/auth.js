import react from 'react';
import axios from 'axios';
import './auth.css';

class Auth extends react.Component {
    constructor() {
        super();
        this.state={
            username:"",
            password:"",
            rusername:"",
            rfirstname:"",
            rlastname:"",
            rpassword:"",
            rcpassword:"",
            remail:"",
            message:""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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
        await axios.post(`http://127.0.0.1:5000/auth/login`, data).then((res)=>{
            if(res.data === "Cannot find user"){
                this.setState({message:"Cannot find user"});
            } else {
                this.setState({message:"Logging In..."});
                this.props.authenticate(res.data)
                // Send res.data as props to chat components
            }
        });
    }
    handleRegister = async(e)=>{
        e.preventDefault();
        if(this.state.rpassword !== this.state.rcpassword){
            this.setState({message:"The passwords do not match"});
        }
        const data = {
            username  : this.state.rusername,
            firstname : this.state.rfirstname,
            lastname  : this.state.rlastname,
            email     : this.state.remail,
            password  : this.state.rpassword
        }
        await axios.post(`http://127.0.0.1:5000/auth/register`, data).then((res)=>{
            if(res.data === "Success"){
                this.setState({message:"User successfully registered"});
            }
            this.setState({
                rusername   :   "",
                rfirstname  :   "",
                rlastname   :   "",
                remail      :   "",
                rpassword   :   "",
                rcpassword  :   ""
            });
        });
    }
    render(){
        return (<div className='authscreen'>
            <div className='loginscreen loginarea1'>
                <center>
                    <br/><label className='loginlabel'>Username</label>
                    <br/><input type="text" className='logininput' name="username" onChange={this.changeHandler} value={this.state.username}/>
                    <br/><label className='loginlabel'>Password</label>
                    <br/><input type="password" className='logininput' name="password" onChange={this.changeHandler} value={this.state.password}/>
                    <br/><button type="submit" onClick={this.handleLogin} className="loginbtn">Login</button><br/>
                </center>
            </div>
            <div className='registerscreen loginarea2'>
                <center>
                    <br/><label className='registerlabel'>Username</label>
                    <br/><input type="text" className='registerinput' name="rusername" onChange={this.changeHandler} value={this.state.rusername}/>
                    <br/><label className='registerlabel'>Firstname</label>
                    <br/><input type="text" className='registerinput' name="rfirstname" onChange={this.changeHandler} value={this.state.rfirstname}/>
                    <br/><label className='registerlabel'>Lastname</label>
                    <br/><input type="text" className='registerinput' name="rlastname" onChange={this.changeHandler} value={this.state.rlastname}/>
                    <br/><label className='registerlabel'>Email</label>
                    <br/><input type="email" className='registerinput' name="remail" onChange={this.changeHandler} value={this.state.remail}/>
                    <br/><label className='registerlabel'>Password</label>
                    <br/><input type="password" className='registerinput' name="rpassword" onChange={this.changeHandler} value={this.state.rpassword}/>
                    <br/><label className='registerlabel'>Confirm Password</label>
                    <br/><input type="password" className='registerinput' name="rcpassword" onChange={this.changeHandler} value={this.state.rcpassword}/>
                    <br/><button type="submit" onClick={this.handleRegister} className="loginbtn">Register</button><br/>
                </center>
            </div>
        </div>);
    }
}

export default Auth;