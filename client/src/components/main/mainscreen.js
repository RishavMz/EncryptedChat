import Chat from '../chat/chat';
import Users from '../users/users';
import './mainscreen.css';

export function Mainscreen(){
    return(<div className='mainscreen'>
        <Users/>
        <Chat/>
    </div>);
}