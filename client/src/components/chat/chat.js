import React from 'react';
import JSEncrypt from 'jsencrypt';
import './chat.css';
import testimg from './dp.png';

class Chat extends React.Component{
    constructor(){
        super()
        this.state={
            privatekey:"-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAg85SsuEQ1GOL2OAQXhlrxIaq5gN3SO8FYOLIWq0vGFzEXMYh\nFXvjgtGFMkGXzQYZXMwq5YpCgwGWPCFMtTk92qBOJSPFnkY7j9D4K3aYkhCtHfr3\nGZGNzvaHx/AGATSRVpBv4J7EaPOtXD/EoU2PeV69hvndlA6gGfvFOn6usZaGrLiA\n3VtacS8cPPxe8UTrHh60SsiIuJ5kYeObRFZ48ZMfpBhyW4EehoJQj3r0QFi2Vk0I\ncYkCvY0YHSyqhFG/gCpM/48MEUXLMxfcSun8Utwrr0v3pIGIqUCZ+a5DQjySWfKC\nAPtTPZj9IZifesjMBjw4QGxSWVsKDyz+uVCcGQIDAQABAoIBAFs269BTJTx2b490\n8J7OZOAqehaYC3LzxvsXtqPZ+h+YA2RY0Qh3JimgKddvwUfnkqG/wWf82K6k6H1Q\nZi98H6wvCCV3rgksfYe3jCc3+boLxGJdDagqLMMvpSPenakz4ejQKDyAY1hmWnDe\nyIsAi+vofqzsOkV+IZoZvJIQnYDTrZDHWXB/35EWDDZ3/IuRUCPjvs1moA1ydVtt\n8YbTjoveqDaSAOz/+BuIA+OtofidQIKiyIynTzcE+RDIgFCc9X6kyQn1TNBU3CaC\nmW+IULnR0w0/IjiguHNnODwzGyu9PlRMmRgT1DxG8U+oyMtQssPusP5bxUyhktVk\nJZAiLiECgYEA8Bqvzn73wcrnoWTc0qaF/6zJbxJfjp/6XnqCf3JEn9FZMj5HawT0\nBTAvFHInvT35JaRUl4z8rSIvP6AlPJpeUkXPWu3c62wppNoj0rFLe7Je4k+yi25y\nJlCunvtBLby/uBHQU81uXw39b8hSrwqDDULSzHTB9LOXzJGs5jxZ740CgYEAjIgv\nUKncFUY8Haaetmnkke/cSzscgi80WRfHcveTrMNyXEVks9m5VY4uqW1pZlHokrdw\nNdUBCmAWTpVtS3npdTkIaeidA0XsVpmfoVK260XnUaovOvhToZYKYR3+aRmnMnwu\nhdKSuIMJqsaSjg37c7XvkvCWX/5MEMfMgVxxBb0CgYBUpRPVeG1fpGiEPUqb+JjE\nyeU5gwCtBzj8lbPruhz3OpZ3X/1NfTGJorL2QkhALtjmrEgmJU3uu15sz8hQ1Rrr\nZjDznWeEl10XANAgNuClevx4TCBlh0o2t7rX0TvpI+FywtTutj1yxTvTbIu5qbsJ\nscUezwqReb7KH5EUmbIbAQKBgH2Z4iAIEKn7AhPGLaf/cMh2Rr/+bvZz1ieityIr\n4JLShE2vv9d2ysyKrW3EWiWXI3St+t5CKBHr20QVDYAdz+hzNu/hdSPNxPOJjkCT\nOuWArsQwhNIBzE1pWpF+SzoIMYVPtAzrLTM3+tXlcGsCWDEM9LixytS05atBx6f+\nxQ1JAoGBAJo8yatYINPV0n7mbItl6wvPhedWUSWbQKcmg5zvokqeznja/yNefkkA\nFpCKyesRvgcDoi03TndNd6uUjqOT37mXTCSnKT08K3vAOxtw4yQdZ5gL5mF0y1LG\nboBceJHMnA36x4KI5F29+ZZcQeRw8x5ut/aOKJfq0qRJTwUvcF1b\n-----END RSA PRIVATE KEY-----",
            publickey:"-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg85SsuEQ1GOL2OAQXhlr\nxIaq5gN3SO8FYOLIWq0vGFzEXMYhFXvjgtGFMkGXzQYZXMwq5YpCgwGWPCFMtTk9\n2qBOJSPFnkY7j9D4K3aYkhCtHfr3GZGNzvaHx/AGATSRVpBv4J7EaPOtXD/EoU2P\neV69hvndlA6gGfvFOn6usZaGrLiA3VtacS8cPPxe8UTrHh60SsiIuJ5kYeObRFZ4\n8ZMfpBhyW4EehoJQj3r0QFi2Vk0IcYkCvY0YHSyqhFG/gCpM/48MEUXLMxfcSun8\nUtwrr0v3pIGIqUCZ+a5DQjySWfKCAPtTPZj9IZifesjMBjw4QGxSWVsKDyz+uVCc\nGQIDAQAB\n-----END PUBLIC KEY-----",
            message: "This is a ball",
            messages : [
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
        }
    }
    render(){
        console.log(this.state.message);
        const encrypt = new JSEncrypt();
        encrypt.setPrivateKey(this.state.publickey);
        const decrypt = new JSEncrypt();
        decrypt.setPublicKey(this.state.privatekey);
        const data = encrypt.encrypt(this.state.message);
        console.log(data);
        const sata = decrypt.decrypt(data,);
        console.log(sata); 
        return (<div className='chat'>
            <div className='receiverarea'>
                <div className='receivername'>John Doe</div>
            </div>
            <div className='messagearea'>
                <div className='messagesender'>
                    <div className='messagespace'>
                        {this.state.messages.map((element)=>{
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
}

export default Chat;