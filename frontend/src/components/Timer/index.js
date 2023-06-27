import { useEffect, useState } from "react";
export default function Timer({game, color, active}) {
    const [timer, setTimer] = useState([0, 0, 0]);
    let whiteTime = 0;
    let blackTime = 0;
    let recentTime = 0;
    if (game) {
        let times = game.move_data.split(" ").map(time=>parseFloat(time));
        for (let i = 2; i < times.length; i++) {
            if (i % 2 === 0) {
                blackTime += times[i] - times[i - 1];
            } else {
                whiteTime += times[i] - times[i - 1];
            }
        }
        recentTime = times[times.length - 1];
    }

    function handleTime() {
        setTimer(state=>{
                const nowTime = Date.now()/1000;
                return [state[0], state[1], state[0] + nowTime - state[1]];
        });
    };

    useEffect(()=>{
        let temp;
        if (game) {
            setTimer(state=> {
                if (color === "white") {
                    return [whiteTime, recentTime, whiteTime];
                } else {
                    return [blackTime, recentTime, blackTime];
                }
            });
        }
        if (game && active) {
            temp = setInterval(handleTime, 500);
        }
        return ()=> clearInterval(temp);
    },[game, active]);
    //TODO: make different time sets
    const remainingTime = 600 - timer[2];
    const minutes = parseInt(remainingTime / 60);
    const seconds = parseInt(remainingTime % 60);
    return <h1>{`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`}</h1>;
};