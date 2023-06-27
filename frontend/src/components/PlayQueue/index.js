import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import csrfFetch from "../../store/csrf";
import { useSelector } from "react-redux";
import consumer from "../../consumer";
export default function PlayQueue () {
    const [queueId, setQueueId] = useState(0);
    const history = useHistory();
    const user = useSelector(state=> state.session.user);
    const { playId } = useParams();
    useEffect(()=>{
        async function fetchQueue() {
            const response = await csrfFetch('/api/queue_positions', {
                method: "POST",
                body: JSON.stringify({ standard_queue_id: playId })
            });
            if (response.ok) {
                const queueInfo = await response.json();
                if (queueInfo.position) {
                    setQueueId(queueInfo.position.id);
                } else {
                    history.push(`/games/${queueInfo.gameId}`);
                }
            }
        };
        const subscription = consumer.subscriptions.create({
            channel: "QueuesChannel", id: playId, user_id: user.id
        }, {
            received(result) {
                history.push(`/games/${result}`);
            }
        });
        fetchQueue();
        return ()=> {
            subscription?.unsubscribe();
        };
    }, [history, playId]);

    return <h1>IN QUEUE...</h1>;
}