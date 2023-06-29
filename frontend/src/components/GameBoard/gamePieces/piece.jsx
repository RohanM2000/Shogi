import React from "react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
function Piece({startLeft, startTop, color, moveFunc, name, flip, viewHeight, promoted}) {
    const lang = useSelector(state=>state.languages.lang);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const prevPos = useRef({
        top: 0,
        left: 0
    });
    const isClicked = useRef(false);
    const validMoved = useRef(false);

    useEffect(()=>{
        setTop(0);
        setLeft(0);
    },[startLeft, startTop, viewHeight, name, color])

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
            if (promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/7/78/Shogi_tokin%28svg%29.svg";
            // piece = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Shougi_no_koma-fuhyou.svg";
            if (lang === "en") piece = "https://upload.wikimedia.org/wikipedia/commons/0/00/Shogi_pawn_western.svg";
            if (lang === "en" && promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/9/90/Shogi_promoted_pawn_western.svg";
            break;
        case "Lance":
            piece = "https://upload.wikimedia.org/wikipedia/commons/7/77/Shogi_kyosha%28svg%29.svg";
            if (promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/f/f1/Shogi_narikyo%28svg%29.svg";
            if (lang === "en") piece = "https://upload.wikimedia.org/wikipedia/commons/d/d8/Shogi_lance_western.svg";
            if (lang === "en" && promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/8/85/Shogi_promoted_lance_western.svg";
            break;
        case "SilverGeneral":
            piece = "https://upload.wikimedia.org/wikipedia/commons/1/18/Shogi_ginsho%28svg%29.svg";
            if (promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/a/ad/Shogi_narigin%28svg%29.svg";
            if (lang === "en") piece = "https://upload.wikimedia.org/wikipedia/commons/9/9e/Shogi_silver_western.svg";
            if (lang === "en" && promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/8/8b/Shogi_promoted_silver_western.svg";
            break;
        case "GoldGeneral":
            piece = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Shogi_kinsho%28svg%29.svg";
            if (lang === "en") piece = "https://upload.wikimedia.org/wikipedia/commons/4/4d/Shogi_gold_general_western.svg";
            break;
        case "HonorableHorse":
            piece = "https://upload.wikimedia.org/wikipedia/commons/7/71/Shogi_keima.svg";
            if (promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/6/65/Shogi_narikei%28svg%29.svg";
            if (lang === "en") piece = "https://upload.wikimedia.org/wikipedia/commons/5/52/Shogi_knight_western.svg";
            if (lang === "en" && promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/a/a7/Shogi_promoted_knight_western.svg";
            break;
        case "FlyingChariot":
            piece = "https://upload.wikimedia.org/wikipedia/commons/4/43/Shogi_hisha%28svg%29.svg";
            if (promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/b/b5/Shogi_ryuo%28svg%29.svg";
            if (lang === "en") piece = "https://upload.wikimedia.org/wikipedia/commons/6/65/Shogi_rook_western.svg";
            if (lang === "en" && promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Shogi_promoted_rook_western.svg";
            break;
        case "Bishop":
            piece = "https://upload.wikimedia.org/wikipedia/commons/4/4f/Shogi_kakugyo%28svg%29.svg";
            if (promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/7/74/Shogi_ryuma%28svg%29.svg";
            if (lang === "en") piece = "https://upload.wikimedia.org/wikipedia/commons/4/4d/Shogi_bishop_western.svg";
            if (lang === "en" && promoted) piece = "https://upload.wikimedia.org/wikipedia/commons/f/fa/Shogi_promoted_bishop_western.svg";
            break;
        case "JewelledGeneral":
            if (color === "black") {
                piece = "https://upload.wikimedia.org/wikipedia/commons/b/bd/Shogi_gyokusho%28svg%29.svg";
            } else {
                piece = "https://upload.wikimedia.org/wikipedia/commons/0/05/Shogi_osho%28svg%29.svg";
            }
            if (lang === "en") piece = "https://upload.wikimedia.org/wikipedia/commons/3/36/Shogi_king_western.svg";
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
