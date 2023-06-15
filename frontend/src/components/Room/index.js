import consumer from "../../consumer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getMessages } from "../../store/messages";
import { fetchRoom } from "../../store/rooms";
import { createMessage } from "../../store/messages";
export default function Room() {
    const dispatch = useDispatch();
    const { roomId } = useParams();
    const room = useSelector(state => state.rooms[roomId]);
    const messages = useSelector(getMessages(roomId));
    const currentUser = useSelector(state => state.session.user);
    const [inputVal, setInputVal] = useState("");
    useEffect(()=>{
        dispatch(fetchRoom(roomId));

        const subscription = consumer.subscriptions.create(
          { channel: 'RoomsChannel', id: roomId },
          {
              received: message => {
                console.log('Received message: ', message);
              }
          }
        );
        return () => subscription?.unsubscribe();
    },[dispatch, roomId]);
    // ...
    // Effect to run when entering a room
    // useEffect(() => {
    //   // ...
  
    //   // Add the following lines to the end of the `useEffect` to create a
    //   // subscription:
  
    // }, [roomId, dispatch]);  // This line is already present in the file
    // ...
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createMessage({
            body: inputVal,
            author_id: currentUser.id,
            room_id: roomId
        }));
        setInputVal("");
    }

    return (
        <>
            {room ? <h1>{room.name}</h1> : <h1>loading room...</h1>}
            <br/>
            {messages.map((message)=><p key={message.id}>{message.body}</p>)}
            <br/>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputVal} onChange={(e)=>setInputVal(e.target.value)}/>
                <button>ADD MESSAGE</button>
            </form>
        </>
    )
}