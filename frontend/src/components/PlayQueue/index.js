import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import csrfFetch from "../../store/csrf";
import { useSelector } from "react-redux";
import consumer from "../../consumer";
export default function PlayQueue () {
    const [queueId, setQueueId] = useState(0);
    const history = useHistory();
    const user = useSelector(state=> state.session.user);
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
        const subscription = consumer.subscriptions.create({
            channel: "QueuesChannel", id: 1, user_id: user.id
        }, {
            received(result) {
                history.push(`/games/${result}`);
            }
        });
        fetchQueue();
        return ()=> {
            subscription?.unsubscribe();
        };
    }, [history]);

    return <h1>IN QUEUE...</h1>;
}