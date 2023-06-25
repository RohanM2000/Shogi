import React from "react";
import { useState, useRef } from "react";
function Piece({startLeft, startTop, color, moveFunc, name, flip, viewHeight}) {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const prevPos = useRef({
        top: 0,
        left: 0
    });
    const isClicked = useRef(false);
    const validMoved = useRef(false);

    const handleMouseDown = (e) => {
        e.preventDefault();
        isClicked.current = true;
        prevPos.top = e.clientY;
        prevPos.left = e.clientX;
    };
    const containerHeight = 0.081 * viewHeight;
    const midBoost = 0.04 * viewHeight;
    const handleMouseUp = (e) => {
        isClicked.current = false;
        validMoved.current = true;
        const initx = 9 - (startTop + midBoost)/containerHeight | 0;
        const inity = (startLeft + midBoost)/containerHeight | 0;
        const tox = 9 - (startTop + top + midBoost)/containerHeight | 0;
        const toy = (startLeft + left + midBoost)/containerHeight | 0;
        // const result = moveFunc([9 - (startTop + 25)/52 | 0, (startLeft + 25)/52 | 0], [9 - (startTop + top + 25)/52 | 0, (startLeft + left+ 25)/52 | 0]);
        let result;
        // console.log([initx,inity],[tox,toy]);
        if (flip) {
            result = moveFunc([8 - initx, 8 - inity], [8 - tox, 8 - toy]);
        } else {
            result = moveFunc([initx, inity],[tox,toy]);
        }
        if (result === false) {
            setTop(0);
            setLeft(0);
            validMoved.current = false;
        }
    };

    const handleMouseLeave = (e) => {
        isClicked.current = false;
        if (!validMoved.current) {
          setTop(0);
          setLeft(0);
        }
    };

    const handleMouseMove = (e) => {
        if (!isClicked.current) return;
        setTop(e.clientY - prevPos.top);
        setLeft(e.clientX - prevPos.left);
    }
    let piece;
    switch(name) {
        case "Footsoldier":
            piece = "https://upload.wikimedia.org/wikipedia/commons/2/2f/Shogi_fuhyo%28svg%29.svg";
            break;
        case "Lance":
            piece = "https://upload.wikimedia.org/wikipedia/commons/7/77/Shogi_kyosha%28svg%29.svg";
            break;
        case "SilverGeneral":
            piece = "https://upload.wikimedia.org/wikipedia/commons/1/18/Shogi_ginsho%28svg%29.svg";
            break;
        case "GoldGeneral":
            piece = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Shogi_kinsho%28svg%29.svg";
            break;
        case "HonorableHorse":
            piece = "https://upload.wikimedia.org/wikipedia/commons/7/71/Shogi_keima.svg";
            break;
        case "FlyingChariot":
            piece = "https://upload.wikimedia.org/wikipedia/commons/4/43/Shogi_hisha%28svg%29.svg";
            break;
        case "Bishop":
            piece = "https://upload.wikimedia.org/wikipedia/commons/4/4f/Shogi_kakugyo%28svg%29.svg";
            break;
        case "JewelledGeneral":
            if (color === "black") {
                piece = "https://upload.wikimedia.org/wikipedia/commons/b/bd/Shogi_gyokusho%28svg%29.svg";
            } else {
                piece = "https://upload.wikimedia.org/wikipedia/commons/0/05/Shogi_osho%28svg%29.svg";
            }
            break;
        default:
            piece = null;
            break;
    }
    let colorClass;

    if (flip) {
        if (color === "black") {
            colorClass = "piece white";
        } else {
            colorClass = "piece black";
        }
    } else {
        if (color === "black") {
            colorClass = "piece black";
        } else {
            colorClass = "piece white";
        }
    }
    return (
      <img
      src={piece}
      className={colorClass}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{top: (startTop + top) + "px", left: (startLeft + left) + "px", zIndex: (isClicked.current) ? 5 : 3}}
      >
      </img>
    )
}

export default Piece;
