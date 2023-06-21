import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import csrfFetch from "../../store/csrf";
export default function PlayQueue () {
    const [queueId, setQueueId] = useState(0);
    const history = useHistory();
    useEffect(()=>{
        async function fetchQueue() {
            const response = await csrfFetch('/api/queue_positions', {
                method: "POST",
                body: JSON.stringify({ standard_queue_id: 1 })
            });
            if (response.ok) {
                const queueInfo = await response.json();
                console.log(queueInfo);
                if (queueInfo.position) {
                    setQueueId(queueInfo.position.id);
                } else {
                    history.push(`/games/${queueInfo.gameId}`);
                }
            }
        };
        fetchQueue();
        return ()=> {
            csrfFetch(`/api/queue_positions/1`,{
                method: "DELETE",
                keepalive: true
            });
        };
    }, [history]);

    return <h1>IN QUEUE...</h1>;
}