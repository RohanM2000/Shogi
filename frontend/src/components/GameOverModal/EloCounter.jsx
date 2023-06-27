import { useEffect, useState } from "react";
export default function EloCounter({newElo, prevElo}) {
    const [showElo, setShowElo] = useState(0);
    const [showUpdate, setShowUpdate] = useState(true);

    useEffect(()=>{
        setShowElo(prevElo);
    },[newElo, prevElo]);

    useEffect(()=>{
        function handleElo() {
            setShowElo(state=>{
                if (state < newElo) {
                    return state + 1;
                }
                if (state > newElo) {
                    return state - 1;
                }
                return state;
            });
        };
        let timeout;
        if (showElo !== newElo) {
            timeout = setTimeout(handleElo, 100);
        } else {
            setShowUpdate(false);
        }

        return ()=> clearTimeout(timeout);
    },[showElo, newElo, prevElo]);

    return <h1 className="elo-counter">{showElo}{showUpdate && <strong>{(newElo - prevElo) > 0 ? "+" + (newElo - prevElo) : (newElo - prevElo)}</strong>}</h1>;
}