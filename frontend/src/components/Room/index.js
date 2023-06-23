import consumer from "../../consumer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getMessages } from "../../store/messages";
import { fetchRoom, getRoom } from "../../store/rooms";
import { createMessage, receiveMessage } from "../../store/messages";
import { fetchUsers } from "../../store/users";
import "./Room.css";
export default function Room() {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const room = useSelector(getRoom(gameId));
    const messages = useSelector(getMessages(room));
    const currentUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const [inputVal, setInputVal] = useState("");
    const game = useSelector(state=> state.games[gameId]);


    function autoScroll () {
        const elem = document.querySelector('ul.message-list');
        elem.scrollTop = elem.scrollHeight;
    };

    useEffect(()=>{
        dispatch(fetchUsers()).then(()=>dispatch(fetchRoom(gameId)));
        const subscription = consumer.subscriptions.create(
          { channel: 'RoomsChannel', id: gameId },
          {
              received: message => {
                if (message.author_id !== currentUser.id){
                    dispatch(receiveMessage({
                        roomId: message.room_id,
                        authorId: message.author_id,
                        body: message.body,
                        id: message.id,
                        createdAt: message.created_at
                    }));
                    autoScroll();
                }
              }
          }
        );
        return () => subscription?.unsubscribe();
    },[dispatch, gameId]);
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createMessage({
            body: inputVal,
            author_id: currentUser.id,
            room_id: room.id
        })).then(autoScroll);
        setInputVal("");
    }
    let prevId = 0;
    return (
        <div className="chat-space">
            {room ? <h1>ROOM {room.id}</h1> : <h1>loading room...</h1>}
            <br/>
            <ul className="message-list">
                {messages.map((message)=>{
                        let rendering = (prevId === message.authorId);
                        prevId = message.authorId;
                        if (!rendering) {
                            return (<li key={message.id}>
                                    <strong>{users[message.authorId].username}: </strong>{message.body}
                                </li>)
                        } else {
                            return (<li key={message.id}>{message.body}</li>)
                        }
                })
                }
            </ul>
            {game && (game.white_id === currentUser.id || game.black_id === currentUser.id) &&
                <form onSubmit={handleSubmit} className="chat-form">
                <input type="text" value={inputVal} onChange={(e)=>setInputVal(e.target.value)} placeholder="Send a message..."/>
            </form>}
        </div>
    )
}