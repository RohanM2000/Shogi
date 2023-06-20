import React from "react";
import { useState, useRef } from "react";

function GoldGen({startLeft, startTop, color, moveFunc}) {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const prevPos = useRef({
        top: 0,
        left: 0
    });
    const isClicked = useRef(false);

    const handleMouseDown = (e) => {
        isClicked.current = true;
        prevPos.top = e.clientY;
        prevPos.left = e.clientX;
    };

    const handleMouseUp = (e) => {
        isClicked.current = false;
        const result = moveFunc([9 - (startTop + 25)/52 | 0, (startLeft + 25)/52 | 0], [9 - (startTop + top + 25)/52 | 0, (startLeft + left+ 25)/52 | 0]);
        if (result === false) {
            setTop(0);
            setLeft(0);
        }
        // moveFunc([9 - (startTop + 25)/52 | 0, (startLeft + 25)/52 | 0], [9 - (startTop + top + 25)/52 | 0, (startLeft + left+ 25)/52 | 0]);
    };

    const handleMouseLeave = (e) => {
        isClicked.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isClicked.current) return;
        setTop(e.clientY - prevPos.top);
        setLeft(e.clientX - prevPos.left);
    }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42.078"
      height="50"
      version="1.1"
      className={color === "black" ? "piece black" : "piece white"}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{top: (startTop + top) + "px", left: (startLeft + left) + "px", zIndex: (isClicked.current) ? 5 : 3}}
    >
      <g transform="translate(-700.607 -632.076)">
        <g transform="matrix(.44527 0 0 .44527 388.649 378.37)">
          <path
            fill="#fff"
            fillOpacity="1"
            stroke="none"
            d="M747.64 571.53l30.34 8.443 15.448 101.362-90.5-1.077 14.28-100.647z"
          ></path>
          <g transform="translate(42.143 -25)">
            <path
              fill="#cfcfcf"
              d="M658.714 705.733c0-4.365 15.218-102.173 15.97-102.637.502-.311 7.69-2.308 15.972-4.438l15.058-3.873 15.059 3.873c8.282 2.13 15.47 4.127 15.972 4.438.752.464 15.97 98.272 15.97 102.637 0 1.105-8.327 1.343-47 1.343-38.675 0-47-.238-47-1.343zm90.418-3.407c-.218-.962-3.554-23.09-7.413-49.173-3.86-26.082-7.127-47.506-7.261-47.608-.134-.103-6.656-1.888-14.494-3.968l-14.25-3.782-14.25 3.782c-7.837 2.08-14.358 3.864-14.49 3.965-.134.101-3.395 21.3-7.25 47.109-3.854 25.809-7.241 47.938-7.527 49.175l-.52 2.25h43.925c41.317 0 43.902-.103 43.53-1.75zm-28.244-6.713c-2.001-2.121-4.644-3.722-6.82-4.13-4.957-.93-2.307-2.372 4.396-2.391 5.06-.015 5.25-.115 5.237-2.766-.03-5.963-.936-7.25-5.103-7.25-4.38 0-4.484.154-2.343 3.423 1.392 2.123 1.388 2.505-.032 3.926-1.974 1.974-7.594 3.078-10.672 2.096-2.18-.695-2.058-.864 1.839-2.522 3.46-1.473 4.079-2.145 3.614-3.924-.44-1.678-1.079-2.017-2.927-1.554-7.537 1.892-11.114 1.804-13.243-.325-1.166-1.166-2.345-2.12-2.62-2.12-.275 0-.506 3.263-.515 7.25-.014 7.094-1.356 11.72-3.614 12.465-1.184.39-6.917-8.502-6.045-9.374.277-.276 1.48.02 2.674.66 1.194.639 2.295 1.013 2.446.83.15-.182.554-3.132.896-6.556l.622-6.225-3.482 1.66c-2.452 1.17-3.482 2.326-3.482 3.91 0 3.988-1.827 7.38-3.975 7.38-2.348 0-2.555-2.045-.657-6.496 1.157-2.715 1.083-3.093-.795-4.025-1.14-.566-2.225-2.093-2.41-3.394-.28-1.956-.02-2.235 1.5-1.612 1.01.415 2.658.99 3.66 1.277 2.507.718 9.677-1.774 9.677-3.363 0-.972-.724-.878-2.91.377-2.516 1.444-3.255 1.486-5.447.313-3.863-2.068-4.164-4.077-.611-4.077 2.476 0 2.968-.402 2.968-2.428 0-1.336-.728-3.157-1.619-4.048-2.065-2.065-1.192-2.944 2.103-2.117 1.833.46 2.749 1.506 3.172 3.62.327 1.635 1.213 2.973 1.97 2.973 2.066 0 1.678-4.797-.626-7.727-1.1-1.398-2-2.932-2-3.407 0-1.457 4.417-.962 6.892.771 2.467 1.728 2.509 2.902.542 15.034l-.676 4.17 4.718.708c7.057 1.058 25.497-.975 23.843-2.63-.457-.456-2.73-.348-5.051.241-4.447 1.13-11.706.359-10.778-1.143.3-.485 3.125-1.414 6.278-2.063 6.332-1.305 11.232-3.477 11.232-4.98 0-1.302-.16-1.275-5.941 1.003-2.759 1.088-5.67 1.726-6.469 1.42-.799-.307-2.84.468-4.536 1.722-2.76 2.04-3.243 2.12-4.606.758-1.402-1.402-1.112-4.87.41-4.882.353-.003 1.992-1.099 3.642-2.436l3-2.431-3.5-3.023-3.5-3.023 5.282-.04c2.905-.023 6.913-.723 8.905-1.555 3.258-1.361 3.865-1.355 6.03.064 3.557 2.33 2.312 3.845-3.949 4.798-4.948.754-5.63 1.147-6.082 3.5-.687 3.577-.243 3.787 3.86 1.83 4.389-2.092 7.368-2.127 10.232-.122 2.805 1.965 2.815 3.813.034 6.404-1.843 1.717-1.922 2.04-.5 2.04.928 0 1.688.508 1.688 1.13 0 .746 1.515.959 4.46.627 4.751-.536 8.54 1.15 8.54 3.8 0 1.077-1.354 1.442-5.35 1.442h-5.35l.477 7.427c.262 4.085.186 8.585-.17 10-.93 3.71-4.444 3.34-8.434-.89zm-26.924-45.651c-2.143-2.204-1.46-2.579 5.964-3.269 5.375-.5 7.797-1.218 9.5-2.818 2.871-2.697 3.024-5.799.286-5.799-1.56 0-2 .667-2 3.032 0 1.783-.623 3.27-1.513 3.612-1.946.747-4.737-1.55-4.052-3.335.29-.755-1.289.087-3.508 1.87-3.25 2.613-4.365 3.029-5.73 2.141-2.237-1.452-1.848-6.113.725-8.685 1.687-1.688 2.382-1.817 4.524-.841 2.481 1.13 5.554.716 5.554-.749 0-.408-1.912-1.546-4.25-2.53l-4.25-1.79 4.25-1.004c4.859-1.149 5.526-2.44 1.5-2.904-1.637-.189-2.75-.924-2.75-1.817 0-1.914 13.992-3.908 15.668-2.232 1.631 1.632.033 3.232-3.227 3.232-1.617 0-2.94.507-2.94 1.125 0 .704 1.068.912 2.853.555 3.412-.683 5.658 1 4 2.997-.604.728-2.142 1.323-3.417 1.323s-2.597.45-2.937 1c-.367.594.8 1 2.87 1 3.127 0 6.64 2.027 6.624 3.822-.003.373-.652 1.916-1.44 3.428-1.31 2.51-1.279 2.75.35 2.75 1.62 0 5.096 2.868 5.096 4.204 0 .3-3.712.811-8.25 1.136-4.537.324-10.5.87-13.25 1.21-3.466.43-5.383.227-6.25-.664zm3.846-10.5c1.16-1.398 1.086-1.567-.545-1.25-1.037.2-2.072.927-2.301 1.614-.594 1.784 1.26 1.546 2.846-.365zm-10.452-12.636c10.33-10.655 14.954-17.324 13.352-19.255-1.425-1.717-.49-3.495 1.84-3.495 2.644 0 6.314 2.995 5.939 4.846-.231 1.141 2.31 3.384 8.195 7.233 10.483 6.856 15.3 11.284 14.845 13.646-.713 3.702-4.75 1.786-14.7-6.975-5.465-4.812-10.237-8.75-10.604-8.75-.367 0-4.082 3.631-8.257 8.069-6.422 6.827-14.872 12.931-17.898 12.931-.39 0 2.889-3.712 7.288-8.25z"
            ></path>
            <path
              fill="#b0b0b0"
              d="M658.709 706.326c-.01-1.223 15.182-102.73 15.41-102.974.116-.123 7.272-2.095 15.903-4.383l15.692-4.159 15.693 4.16c8.631 2.287 15.787 4.26 15.902 4.382.229.245 15.42 101.751 15.41 102.974-.002.413-21.155.75-47.005.75s-47.002-.337-47.005-.75zm90.538-4.5c-.278-1.237-3.447-22.275-7.043-46.75-3.595-24.475-6.774-45.68-7.065-47.123-.492-2.444-1.465-2.873-14.226-6.268-7.535-2.005-14.374-3.646-15.199-3.646-.825 0-7.664 1.64-15.198 3.646-12.761 3.395-13.735 3.824-14.227 6.268-.29 1.443-3.468 22.423-7.06 46.623-3.593 24.2-6.79 45.238-7.103 46.75l-.57 2.75h88.196l-.505-2.25zm-27.476-5.67c-1.165-1.636-3.945-3.58-6.318-4.421-4.51-1.597-4.208-1.742 4.261-2.037 3.077-.107 3.54-.469 3.828-2.992.18-1.58.06-3.942-.269-5.25-.536-2.136-1.133-2.374-5.828-2.327-5.047.05-5.152.107-2.98 1.622 4.47 3.118 2.186 7.122-4.582 8.03-5.11.685-6.245-1.194-1.64-2.714 2.99-.987 3.444-1.512 2.886-3.33-.922-3.004-.571-2.927-7.31-1.601-6.397 1.258-8.058.766-10.06-2.977-.746-1.397.407-1.586 9.805-1.61 11.984-.03 18.955-1.068 17.429-2.594-.643-.643-2.528-.593-5.454.144-2.939.74-5.647.81-7.898.203l-3.427-.923 4.5-1.251c7.583-2.108 12.95-4.16 13.59-5.197 1.192-1.928-.528-2.044-5-.336-2.491.952-5.418 1.498-6.503 1.214-1.189-.31-2.654.237-3.685 1.376-1.891 2.09-5.892 2.526-6.983.76-.404-.653 1.366-3.058 4.191-5.695 4.22-3.937 4.616-4.62 2.89-4.976-2.279-.47-4.5-2.065-4.5-3.231 0-.434 2.813-1.054 6.25-1.379 13.275-1.253 13.25-1.254 13.25.9 0 1.615-.91 2.118-4.848 2.681-5.6.801-5.171.503-6.063 4.212-.595 2.474-.438 2.797 1.11 2.293 9.088-2.959 10.061-3.06 12.702-1.33 3.092 2.026 3.283 3.728.68 6.083-1.89 1.711-1.89 1.764.037 3.692 1.663 1.662 2.496 1.806 5.562.96 3.174-.877 7.32-.098 7.32 1.375 0 .21.3 1.164.666 2.119.6 1.564.068 1.681-5.4 1.185l-6.067-.55.9 3.14c1.302 4.538 1.111 15.043-.299 16.452-2.005 2.006-4.553 1.356-6.743-1.72zm-34.807 1.217c-.687-.255-1.25-.917-1.25-1.472 0-.555-.9-2.153-2-3.552-2.262-2.876-2.613-4.737-.75-3.975.688.28 1.977.804 2.865 1.162 1.343.541 1.732-.384 2.311-5.51.384-3.388.486-6.37.229-6.628-.258-.258-1.86.25-3.562 1.13-2.168 1.122-3.093 2.325-3.093 4.027 0 3.71-2.108 7.521-4.16 7.521-2.153 0-2.311-2.182-.472-6.496 1.157-2.715 1.083-3.093-.795-4.025-1.14-.566-2.215-2.017-2.389-3.224-.293-2.044-.101-2.122 2.776-1.119 3.654 1.274 9.352.41 11.508-1.746 2.708-2.708 1.637-3.384-1.98-1.25-3.298 1.946-3.667 1.973-6 .444-3.297-2.16-3.148-3.584.374-3.584 2.574 0 2.812-.276 2.369-2.75-.27-1.512-1.178-3.537-2.016-4.5-1.387-1.591-1.344-1.75.475-1.75 2.362 0 5.31 2.96 5.31 5.33 0 2.624 2.713 1.951 3.24-.804.3-1.57-.17-3.057-1.284-4.065-.966-.875-1.984-2.461-2.262-3.525-.7-2.675 3.611-2.63 6.306.064 2.243 2.244 2.493 4.873.95 10.007-.576 1.921-1.39 9.017-1.808 15.767-.762 12.303-1.885 15.638-4.892 14.523zm7-47.412c-2.128-2.187-1.41-2.884 3-2.908 6.155-.035 12.004-1.603 13.473-3.613 1.955-2.672 1.592-5.364-.723-5.364-1.56 0-2 .667-2 3.032 0 3.65-2.446 4.951-4.827 2.569-1.47-1.47-1.49-1.788-.173-2.621.825-.522 1-.956.388-.964-.612-.008-2.799 1.324-4.859 2.961-3.05 2.424-4.112 2.782-5.715 1.924-1.174-.628-1.736-1.662-1.391-2.56.317-.827.577-2.132.577-2.9 0-2.407 4.563-4.745 6.86-3.515 1.098.587 2.703.796 3.568.464 2.417-.928 1.882-3.39-.737-3.39-1.27 0-3.138-.606-4.152-1.347-1.68-1.228-1.474-1.407 2.31-2.012 4.137-.662 5.842-2.64 2.274-2.64-1.033 0-2.434-.67-3.113-1.489-1.653-1.992-.37-2.406 8.49-2.744 5.674-.217 7 .017 7 1.232 0 .962-1.167 1.613-3.25 1.814-1.787.172-3.25.79-3.25 1.375 0 .649 1.18.825 3.038.454 2.244-.449 3.197-.194 3.646.976.712 1.855-1.25 3.344-4.434 3.366-1.237.008-2.25.465-2.25 1.015 0 .55 1.155 1 2.566 1 5.615 0 7.894 3.405 5.4 8.066-.854 1.594-.705 1.934.844 1.934 1.034 0 2.686.891 3.671 1.98 2.226 2.46 1.669 2.684-8.48 3.41-4.126.296-9.526.817-12 1.159-3.066.422-4.9.21-5.75-.664zm4.533-10.73c.286-.86-.195-1.221-1.335-1-.98.19-1.984.95-2.23 1.69-.287.862.194 1.222 1.334 1 .98-.19 1.984-.95 2.23-1.69zm-10.687-12.804c10.757-11.075 14.657-16.739 12.946-18.8-1.465-1.766-.564-3.55 1.795-3.55 2.711 0 6.288 2.997 5.96 4.995-.215 1.32 2.162 3.443 8.703 7.775 10.333 6.842 15.039 11.384 14.162 13.67-1.053 2.743-3.44 1.707-10.81-4.69-3.96-3.438-8.873-7.706-10.917-9.485l-3.717-3.235-5.644 6.429c-6.715 7.648-12.007 11.994-17.236 14.155-3.604 1.49-3.315 1.048 4.758-7.264z"
            ></path>
            <path
              fill="#909090"
              d="M658.974 704.326c.28-1.512 3.8-24.874 7.822-51.914l7.312-49.165 15.803-4.13 15.803-4.13 15.803 4.13 15.803 4.13 7.313 49.165c4.022 27.04 7.542 50.402 7.822 51.914l.51 2.75h-94.5l.509-2.75zm90.7 0c-.346-6.517-14.964-98.632-15.726-99.099-.585-.358-7.2-2.21-14.7-4.117l-13.638-3.466-13.54 3.466c-7.448 1.907-14.019 3.761-14.603 4.121-.817.503-15.53 92.826-15.713 98.595-.031.982 9.406 1.25 43.96 1.25 24.2 0 43.982-.337 43.96-.75zm-28.565-8.8c-1.77-1.962-4.564-3.766-6.5-4.196-3.123-.693-2.914-.794 2.605-1.254 5.726-.477 6.015-.63 6.328-3.37.18-1.58.06-3.942-.269-5.25-.543-2.164-1.116-2.377-6.328-2.353l-5.73.027 2.75 1.705c1.512.937 2.75 2.523 2.75 3.524 0 2.43-6.39 5.109-9.893 4.147-2.591-.71-2.584-.725 1.142-2.208 3.824-1.522 4.42-2.614 2.816-5.149-.762-1.204-1.77-1.233-6.436-.189-6.133 1.372-8.75.63-10.715-3.042-1.059-1.98-.95-2.064 1.728-1.344 4.435 1.192 22.723.13 25.312-1.47 1.93-1.192.283-3.216-1.765-2.171-2.957 1.508-7.58 2.017-11.19 1.231l-3.5-.761 4-1.152c2.2-.633 5.86-1.61 8.134-2.17 4.017-.99 7.247-3.457 6.07-4.635-.32-.32-2.621.197-5.113 1.149-2.492.952-5.419 1.498-6.504 1.214-1.189-.31-2.654.237-3.685 1.376-2.155 2.381-6.402 2.539-6.402.238 0-.91 1.913-3.465 4.25-5.68 3.743-3.544 4.011-4.076 2.25-4.453-2.4-.514-4.5-2.103-4.5-3.403 0-.52.848-.676 1.885-.347 1.037.329 3.85.082 6.25-.55 2.401-.63 5.94-1.207 7.865-1.28 2.878-.11 3.5.222 3.5 1.866 0 1.495-.758 2.07-3 2.275-5.714.522-7.5 1.247-7.5 3.044 0 .98-.54 2.321-1.2 2.981-1.827 1.827 2.393 1.553 6.54-.425 3.837-1.83 8.239-.99 10.075 1.921.82 1.299.579 2.156-1.068 3.802-2.087 2.087-2.09 2.158-.225 4.024 1.505 1.505 2.73 1.766 5.914 1.257 3.092-.495 4.47-.231 5.99 1.145 3.35 3.03 2.387 3.804-3.914 3.146l-5.889-.616.865 3.723c1.189 5.12 1.126 12.956-.123 15.29-1.513 2.826-4.05 2.284-7.57-1.617zm-35.395.455c0-.603-.949-2.429-2.109-4.058-2.546-3.575-1.952-4.588 1.402-2.39l2.467 1.616.708-6.615c.39-3.638.485-6.838.213-7.11-.272-.272-1.887.225-3.588 1.104-2.365 1.223-3.093 2.274-3.093 4.463 0 3.873-3.377 8.059-5.119 6.345-1.013-.996-.93-1.934.43-4.783 2.055-4.311 2.063-4.477.224-4.477-1.272 0-3.535-2.826-3.535-4.415 0-.3 1.926-.282 4.28.04 5.046.692 11.72-1.66 11.72-4.13 0-1.462-.202-1.467-2.222-.051-2.646 1.853-6.904 2.03-8.578.356-1.95-1.95-1.385-2.895 1.55-2.587 2.515.263 2.721.031 2.408-2.713-.189-1.65-1.046-3.787-1.905-4.75-1.302-1.458-1.324-1.75-.13-1.75 2.618 0 5.877 3.064 5.877 5.526 0 1.657.438 2.243 1.402 1.874 2.402-.922 2.705-4.657.563-6.937-4.238-4.512-.7-7.66 3.847-3.424 2.544 2.37 2.646 4.271.668 12.461-.797 3.3-1.456 9.692-1.464 14.203-.017 9.023-1.36 13.297-4.176 13.297-1.012 0-1.84-.493-1.84-1.095zm8.48-46.564c-1.792-1.788-1.618-1.861 6.088-2.558 6.363-.576 8.278-1.142 9.682-2.861 2.108-2.58 2.27-5.508.348-6.246-1.93-.74-2.598.164-2.598 3.522 0 3.487-2.5 4.731-4.827 2.403-1.45-1.45-1.477-1.794-.202-2.582.81-.5 1.194-1.187.855-1.526-.339-.339-2.185.762-4.103 2.446-4.65 4.083-7.723 4.108-7.723.061 0-1.659.887-3.887 1.986-4.985 1.655-1.656 2.392-1.8 4.436-.868 2.893 1.318 5.578.54 5.578-1.615 0-.933-.902-1.532-2.309-1.532-1.27 0-3.138-.606-4.152-1.347-1.68-1.228-1.474-1.407 2.31-2.012 4.137-.662 5.842-2.64 2.274-2.64-1.033 0-2.407-.638-3.053-1.417-.932-1.123-.802-1.52.628-1.918 4.066-1.132 12.895-1.622 14.18-.785 2.068 1.345.398 3.12-2.937 3.12-1.884 0-2.94.514-2.94 1.43 0 1.119.663 1.24 3.052.554 2.393-.686 3.18-.541 3.645.671.7 1.822-1.286 3.308-4.448 3.33-1.237.007-2.25.464-2.25 1.014s1.155 1 2.566 1c6.15 0 8.54 4.894 4.409 9.026l-2.026 2.025 2.539-.637c2.669-.67 5.512.914 5.512 3.07 0 .841-2.81 1.449-8.75 1.893-4.812.36-10.364.913-12.338 1.229-2.694.432-4.048.117-5.432-1.265zm4.303-10.186c.286-.86-.195-1.221-1.335-1-.98.19-1.984.95-2.23 1.69-.287.862.194 1.222 1.334 1 .98-.19 1.984-.95 2.23-1.69zm-11.043-12.106c3.946-3.823 8.856-9.483 10.91-12.577 3.199-4.817 3.56-5.905 2.52-7.571-.988-1.582-.941-2.051.247-2.507 2.44-.936 7.083 1.897 7.083 4.322 0 1.636 2.265 3.67 9.135 8.2 5.025 3.312 10.293 7.399 11.709 9.08 2.532 3.01 2.633 6.004.201 6.004-.682 0-6.146-4.269-12.143-9.487l-10.902-9.488-7 7.534c-6.972 7.503-14.676 13.429-17.468 13.437-.807.002 1.761-3.124 5.708-6.947z"
            ></path>
            <path
              fill="#6f6f6f"
              d="M659.103 704.326c.301-1.512 3.767-24.575 7.702-51.25 3.934-26.675 7.437-48.815 7.783-49.202.347-.386 7.492-2.53 15.878-4.764l15.248-4.062 15.248 4.062c8.387 2.234 15.532 4.378 15.878 4.764.346.387 3.85 22.527 7.784 49.202 3.934 26.675 7.4 49.738 7.701 51.25l.548 2.75h-94.318l.548-2.75zm90.348-2.5c-.289-1.787-3.572-23.95-7.295-49.25-3.724-25.3-7.074-46.355-7.445-46.789-.371-.433-7.047-2.503-14.836-4.599l-14.16-3.81-14.162 3.81c-7.788 2.096-14.462 4.166-14.83 4.6-.544.64-15.078 95.969-15.024 98.538.009.413 19.874.75 44.146.75h44.13l-.524-3.25zm-26.993-5.383c-1.234-1.448-4.044-3.463-6.244-4.478l-4-1.845 5.75-.022 5.75-.022-.015-4.75c-.008-2.612-.346-5.25-.75-5.863-.777-1.176-10.094-.41-19.63 1.615-3.995.849-5.326.756-7.25-.504-3.35-2.195-3.199-4.769.205-3.475 1.675.637 5.904.612 12.25-.074 11.503-1.242 13.441-1.737 12.87-3.283-.236-.641-1.048-.984-1.805-.761-.756.222-4.249.616-7.761.875-8.003.59-7.516-1.047.798-2.682 5.894-1.16 11.269-4.242 9.86-5.656-.4-.402-2.786.056-5.302 1.017-2.516.96-5.485 1.51-6.597 1.219-1.228-.322-2.776.226-3.947 1.397-1.06 1.059-2.826 1.925-3.926 1.925-3.321 0-2.334-3.396 2-6.88 4.33-3.479 5.035-5.12 2.2-5.12-.99 0-2.353-.553-3.03-1.23-.974-.974.184-1.5 5.55-2.525 3.73-.712 8.013-1.56 9.519-1.882 2.025-.433 2.91-.14 3.395 1.127.864 2.25-1.197 3.476-5.88 3.495-3.28.014-3.915.42-5.088 3.265-1.698 4.117-.454 4.599 5.756 2.227 3.78-1.443 4.774-1.489 7.16-.326 3.773 1.838 4.02 3.34 1.038 6.321-1.77 1.77-2.083 2.528-1.043 2.528.817 0 1.752.695 2.078 1.543.467 1.217 1.526 1.403 5.008.88 3.46-.518 4.835-.282 6.353 1.092 3.014 2.728 1.363 3.763-4.778 2.996-5.099-.637-5.464-.55-4.777 1.15 1.338 3.31 1.754 13.777.66 16.59-1.347 3.459-3.496 3.498-6.377.116zm-38.186-3.458c-3.093-4.674-2.841-5.795.77-3.43l2.5 1.639.708-6.604c.389-3.632.47-6.842.179-7.133-.291-.29-1.86.16-3.487 1.002-2.268 1.172-3.104 2.443-3.584 5.443-.698 4.367-3.096 7.122-4.755 5.464-.7-.702-.514-2.25.59-4.892 1.058-2.533 1.248-3.989.55-4.221-1.49-.497-4.029-3.143-4.029-4.2 0-.486 2.17-.625 4.821-.311 5.373.636 11.18-1.57 11.18-4.248 0-1.367-.239-1.364-2.223.026-2.646 1.853-6.904 2.03-8.578.356-1.904-1.904-1.414-2.69 1.55-2.488 2.498.171 2.719-.087 2.408-2.812-.189-1.65-1.046-3.787-1.905-4.75-1.302-1.458-1.324-1.75-.13-1.75 2.657 0 5.877 3.064 5.877 5.592 0 2.169.25 2.345 2 1.408 2.558-1.369 2.558-4.442 0-7-4.445-4.444-1.206-6.802 3.63-2.642l2.741 2.358-1.685 7.67c-.927 4.22-1.686 11.191-1.686 15.494 0 8.38-1.408 14.12-3.465 14.12-.698 0-2.488-1.84-3.977-4.091zm21.573-4.793c-1.006-.647-.384-1.207 2.338-2.105 2.892-.955 3.6-1.641 3.214-3.116-.679-2.595.569-3.107 3.154-1.296 3.99 2.794 2.313 5.415-4.337 6.781-1.65.34-3.616.22-4.37-.264zm-11.437-38.902c-1.728-1.909-1.618-1.955 5.778-2.43 8.595-.552 11.823-2.468 11.326-6.723-.438-3.743-3.793-4.081-3.813-.384-.024 4.323-1.29 5.765-3.858 4.391-2.386-1.277-2.753-2.677-.877-3.347.688-.246.96-.761.605-1.145-.354-.385-2.214.679-4.132 2.363-4.42 3.88-7.723 4.093-7.723.496 0-5.028 1.657-6.551 6.774-6.228 3.775.238 4.724-.038 5.015-1.457.216-1.058-.245-1.75-1.168-1.75-.84 0-2.772-.562-4.294-1.25l-2.767-1.25 3.96-.5c2.645-.334 4.066-1.055 4.279-2.171.229-1.205-.207-1.535-1.56-1.18-1.033.27-2.431-.175-3.106-.99-1.026-1.235-.767-1.567 1.57-2.015 8.547-1.639 11.442-1.768 12.88-.576 1.825 1.516.252 2.893-3.333 2.917-1.282.01-2.25.633-2.25 1.453 0 1.084.86 1.297 3.5.869 2.767-.45 3.5-.236 3.5 1.017 0 1.02-1.247 1.82-3.5 2.242-2.097.394-3.5 1.24-3.5 2.113 0 .967.628 1.257 1.868.863 1.028-.326 3.053-.142 4.5.408 3.31 1.259 3.47 4.53.382 7.817l-2.25 2.396 2.763-.693c2.898-.727 5.737.766 5.737 3.017 0 .853-2.888 1.437-9.25 1.868-5.087.345-10.61.892-12.272 1.216-2.242.437-3.478.087-4.784-1.357zm4.306-10.249c0-.53-.9-.965-2-.965-1.345 0-2 .667-2 2.036 0 1.725.305 1.872 2 .964 1.1-.588 2-1.504 2-2.035zm-11.862-11.223c10.796-10.152 16.244-18.371 13.984-21.095-1.838-2.215 1.434-2.928 4.992-1.088 2.154 1.114 2.828 2.049 2.415 3.35-.447 1.41 1.213 2.964 7.615 7.124 11.068 7.191 14.856 10.651 14.856 13.571 0 1.334-.593 2.396-1.337 2.396-.736 0-6.243-4.274-12.24-9.498l-10.902-9.499-8.01 8.369c-6.845 7.15-14.351 12.651-17.22 12.62-.435-.005 2.196-2.818 5.847-6.25z"
            ></path>
            <path
              fill="#4f4f4f"
              d="M659.343 703.826c.276-1.787 3.757-25.075 7.735-51.75l7.233-48.5 15.702-4.183 15.701-4.184 15.702 4.184 15.702 4.183 7.232 48.5c3.978 26.675 7.459 49.963 7.736 51.75l.502 3.25H658.84l.503-3.25zm90.388.5c.068-2.989-14.448-97.939-15.08-98.632-.44-.486-7.133-2.586-14.87-4.668l-14.067-3.785-14.067 3.785c-7.737 2.082-14.431 4.182-14.876 4.668-.695.758-15.122 94.681-15.074 98.132.014.981 9.493 1.25 44.017 1.25 24.2 0 44.008-.337 44.017-.75zm-28.017-8.75c-1.897-1.957-4.81-3.955-6.475-4.44-2.629-.764-2.265-.891 2.775-.97l5.8-.09-.3-5.75-.3-5.75-5.5.355c-3.025.195-8.756.917-12.736 1.604-6.08 1.049-7.56 1.023-9.25-.162-3.52-2.465-2.557-4.158 1.736-3.057 5.345 1.372 23.75-1.139 23.75-3.24 0-.846-.653-1.323-1.5-1.095-.825.222-4.425.562-8 .754-7.247.39-6.377-.48 3.074-3.08 6.044-1.661 11.102-5.579 7.203-5.579-1.118 0-3.73.71-5.807 1.577-2.075.868-4.639 1.351-5.696 1.075-1.116-.292-2.73.304-3.848 1.423-2.385 2.385-5.926 2.547-5.926.271 0-.91 1.8-3.194 4-5.078 2.2-1.883 4-3.74 4-4.126 0-.387-1.462-1.312-3.25-2.056l-3.25-1.353 5.748-.83c3.162-.457 6.691-1.335 7.843-1.951 2.58-1.381 6.91-.427 6.91 1.522 0 1.336-2.027 1.962-9 2.78-1.384.163-2.383.86-2.237 1.56.145.697-.194 2.122-.753 3.166-1.449 2.708.324 3.416 3.91 1.561 3.07-1.587 7.717-2 10.497-.934 2.366.908 1.957 5.122-.63 6.507l-2.214 1.185 2.213.818c1.217.45 2.213 1.335 2.213 1.965 0 .793 1.403.935 4.563.461 4.782-.717 7.437.408 7.437 3.152 0 1.178-1.058 1.317-5.659.742-4.901-.612-5.578-.497-5.057.86 1.195 3.114 1.782 13.27.937 16.203-1.199 4.161-3.188 4.161-7.22 0zm-36.12-.75c-.655-1.237-1.886-3.32-2.735-4.628l-1.544-2.38 3.075 1.59 3.075 1.591.614-3.711c.337-2.042.618-5.362.624-7.378l.011-3.667-3.887 2.129c-2.138 1.17-3.685 2.656-3.438 3.3.599 1.56-2.305 8.404-3.565 8.404-1.94 0-2.152-1.963-.612-5.65 1.394-3.334 1.398-3.828.044-4.586-.834-.467-1.978-1.71-2.54-2.76-.958-1.79-.717-1.876 3.809-1.34 5.383.638 11.19-1.566 11.19-4.246 0-1.323-.404-1.293-2.977.227-2.27 1.341-3.615 1.533-5.668.807-3.651-1.29-4.014-3.042-.62-2.992 2.489.036 2.73-.259 2.417-2.96-.19-1.65-.817-3.573-1.392-4.274-1.521-1.853-.27-2.569 2.19-1.252 1.166.624 2.375 2.407 2.686 3.96.434 2.17 1.007 2.71 2.464 2.33 2.565-.67 2.502-5.303-.1-7.532-2.376-2.033-2.635-4.732-.455-4.732 1.893 0 6.468 4.423 6.419 6.205-.02.712-.688 3.995-1.485 7.295-.797 3.3-1.458 9.375-1.47 13.5-.035 12.572-2.982 18.7-6.13 12.75zm22.12-8.183c2.6-.951 3.478-1.844 3.416-3.472-.105-2.7 3.295-2.555 4.982.214 1.61 2.64-1.68 4.71-7.339 4.615l-4.559-.076 3.5-1.28zm-13.312-37.359c-1.72-1.901-1.604-1.95 5.742-2.421 4.189-.27 8.225-1.085 9.146-1.85 2.31-1.916 3.384-5.2 2.187-6.687-1.813-2.25-3.763-1.406-3.763 1.628 0 3.966-2.247 5.733-4.468 3.512-1.328-1.329-1.408-1.848-.385-2.48.713-.44 1.04-1.056.728-1.368-.312-.312-2.273.788-4.359 2.446-4.785 3.802-7.516 3.965-7.516.447 0-3.88 1.778-6.435 4.476-6.435 1.324 0 2.685.452 3.026 1.003.863 1.396 4.498-.655 4.498-2.538 0-.805-.814-1.465-1.809-1.465s-2.682-.66-3.75-1.468c-1.819-1.376-1.705-1.47 1.81-1.5 3.136-.026 3.75-.376 3.75-2.139 0-1.397-.473-1.925-1.404-1.568-.771.296-2.234-.092-3.25-.861-1.016-.77-1.397-1.418-.847-1.44.55-.021 3.858-.502 7.352-1.07 4.766-.773 6.712-.73 7.797.17 1.764 1.464.133 2.837-3.399 2.861-1.282.01-2.25.633-2.25 1.453 0 1.084.86 1.297 3.5.869 4.922-.799 4.922 2.204 0 3.127-5.05.948-4.567 3.374.75 3.759 3.59.26 4.302.672 4.583 2.655.201 1.423-.587 3.353-2 4.898l-2.333 2.55 2.412-.596c2.795-.692 6.088.77 6.088 2.702 0 .976-2.597 1.49-9.75 1.926-5.362.327-10.887.87-12.278 1.208-1.79.434-3.04.046-4.284-1.328zm3.112-8.408c1.763-1.763 1.467-2.8-.8-2.8-1.333 0-2 .667-2 2 0 2.267 1.037 2.563 2.8.8zm-9.53-14.05c7.524-7.379 13.73-15.505 13.73-17.98 0-.753-.54-1.91-1.2-2.57-.933-.933-.505-1.2 1.929-1.2 3.638 0 6.275 2.2 5.673 4.733-.309 1.3 1.13 2.649 5.445 5.102 9.869 5.611 17.153 11.846 17.153 14.68 0 1.367-.566 2.485-1.259 2.485-.692 0-6.195-4.3-12.229-9.558l-10.97-9.558-8.059 8.43c-6.702 7.01-14.31 12.686-17.005 12.686-.331 0 2.725-3.262 6.791-7.25z"
            ></path>
            <path
              fill="#2f2f2f"
              d="M659.2 704.826c.29-1.237 3.678-23.625 7.53-49.75 3.853-26.125 7.208-48.41 7.457-49.521.376-1.687 3.032-2.708 15.989-6.152l15.538-4.13 15.538 4.13c12.957 3.444 15.614 4.465 15.99 6.152.248 1.112 3.603 23.396 7.456 49.521s7.241 48.513 7.53 49.75l.524 2.25h-94.076l.525-2.25zm90.526-1c.015-1.614-14.23-98.153-14.543-98.55-.13-.165-6.813-2.07-14.852-4.235l-14.617-3.935-14.616 3.935c-8.04 2.164-14.723 4.07-14.852 4.235-.368.471-14.546 96.09-14.539 98.05.006 1.64 2.772 1.75 44.007 1.75 34.527 0 44.003-.269 44.012-1.25zm-27.575-7.871c-1.615-1.717-4.287-3.725-5.937-4.461-2.992-1.336-2.987-1.34 2.167-1.378 2.845-.022 5.332-.535 5.534-1.143.203-.607.126-3.194-.17-5.75-.53-4.576-.59-4.644-4.034-4.499-1.923.082-7.866.715-13.206 1.407-10.09 1.308-12.79.747-12.79-2.656 0-1.084.501-1.127 2.502-.215 1.892.862 5.316.827 14.016-.143 6.332-.706 11.726-1.628 11.986-2.049 1.054-1.705-2.236-3.044-4.948-2.013-1.478.562-4.795.991-7.372.954-5.386-.078-4.268-.834 5.004-3.387 5.756-1.584 9.285-3.97 8.28-5.596-.302-.489-2.867.025-5.7 1.141-2.832 1.117-6.1 1.792-7.263 1.5-1.358-.34-2.716.174-3.8 1.44-.927 1.083-2.59 1.97-3.696 1.97-2.818 0-2.595-3.387.35-5.317 5.024-3.292 7.187-6.684 4.263-6.684-.758 0-1.938-.675-2.623-1.5-1.06-1.276-.797-1.5 1.763-1.5 1.654 0 5.33-.75 8.17-1.667 4.788-1.546 5.28-1.548 6.805-.024 2.151 2.152 1.658 2.507-4.763 3.431-5.15.741-5.428.935-6.109 4.262-.392 1.917-.516 3.681-.277 3.92.24.24 2.021-.319 3.958-1.242 3.6-1.717 8.048-2.156 10.871-1.073 2.375.911 1.956 5.123-.647 6.516l-2.23 1.193 2.23.995c1.226.547 2.23 1.427 2.23 1.956 0 .574 1.836.685 4.562.276 4.697-.704 7.437.404 7.437 3.008 0 .985-1.357 1.165-5.535.734l-5.534-.572.784 4.394c1.156 6.47.685 15.025-.881 16.018-1.97 1.248-2.198 1.154-5.397-2.246zm-37.354-2.462c-2.313-3.92-2.117-5.52.417-3.417.852.707 1.784 1.05 2.073.761.6-.6 2.227-14.76 1.696-14.76-1.588 0-8.306 4.34-8.185 5.288.573 4.527-1.797 9.625-3.879 8.338-.781-.483-.694-1.824.304-4.652 1.347-3.817 1.301-4.073-1.16-6.534-3.099-3.1-2.741-3.7 1.482-2.49 4.38 1.257 12.17-1.332 12.17-4.045 0-2.32-.39-2.352-3.529-.295-2.69 1.762-6.922 1.264-7.758-.914-.37-.966.3-1.202 2.498-.879 2.942.432 2.99.372 2.28-2.938-.397-1.859-1.185-3.953-1.75-4.654-1.408-1.747-.675-2.156 2.028-1.134 1.385.524 2.497 1.992 2.851 3.764.449 2.242 1.014 2.791 2.48 2.408 2.565-.67 2.502-5.303-.1-7.532-2.431-2.08-2.735-5.227-.419-4.339.87.334 1.985.607 2.477.607.492 0 1.59 1.061 2.44 2.358 1.385 2.115 1.39 3.016.038 8.75-.83 3.516-1.54 9.992-1.578 14.392-.073 8.183-1.576 14.562-3.585 15.217-.62.202-2.1-1.283-3.29-3.3zm22.917-6.748c2.32-.886 3.61-2.086 3.827-3.561.38-2.58 2.887-2.516 4.544.115 1.641 2.607-.432 4.004-6.562 4.421l-5.309.362 3.5-1.337zm-13.057-37.569l-2.443-2.033 6.185-.033c7.522-.04 10.687-1.145 12.881-4.494 1.347-2.056 1.43-2.84.43-4.045-2.043-2.461-3.996-1.785-3.996 1.383 0 3.302-1.942 5.394-3.89 4.19-.823-.508-1.069-1.622-.65-2.943.916-2.883-.07-2.673-4.113.875-4.173 3.665-7.347 3.977-7.347.723 0-5.056 4.86-8.435 7.871-5.473 1.02 1.003 1.673.759 3.304-1.239l2.033-2.488-2.941-.602c-5.364-1.097-6.14-2.374-1.776-2.92 2.755-.346 4.093-1.042 4.323-2.25.259-1.36-.353-1.75-2.74-1.75-1.69 0-3.074-.384-3.074-.853 0-.99 12.924-3.313 14.166-2.545 1.675 1.035.764 2.254-2.166 2.897-1.669.367-3 1.31-3 2.125 0 1.134.793 1.317 3.5.81 2.737-.514 3.5-.33 3.5.843 0 .922-1.347 1.753-3.5 2.156-5.046.947-4.567 3.374.742 3.759 5.168.375 6.025 2.603 2.72 7.073l-2.232 3.02 2.473-.622c2.727-.684 6.489 1.409 5.476 3.047-.345.558-4.8 1.272-9.903 1.587-5.102.315-10.202.857-11.333 1.204-1.33.407-2.922-.089-4.5-1.402zm3.445-8.976c1.56-1.724 1.566-1.927.065-2.503-2.175-.835-3.453.067-3.453 2.438 0 2.45 1.21 2.473 3.388.065zm-9.24-13.874c6.967-7.262 12.852-15.267 12.852-17.48 0-.753-.54-1.91-1.2-2.57-.933-.933-.516-1.2 1.878-1.2 3.39 0 5.853 2.175 4.995 4.41-.374.976 1.589 2.707 6.138 5.413 10.606 6.307 17.19 11.96 17.19 14.762 0 1.329-.37 2.415-.823 2.415-1.068 0-6.034-3.876-15.695-12.25-4.283-3.712-8.144-6.75-8.579-6.75-.435 0-1.468.968-2.297 2.152-4.379 6.25-17.323 17.848-19.92 17.848-.559 0 1.899-3.037 5.46-6.75z"
            ></path>
            <path
              fill="#030303"
              d="M659.714 704.605c0-1.568 13.69-94.285 14.552-98.56.475-2.354 1.596-2.81 15.98-6.493l15.468-3.961 15.469 3.961c14.384 3.684 15.504 4.139 15.98 6.493.862 4.275 14.551 96.992 14.551 98.56 0 1.274-6.176 1.471-46 1.471-39.823 0-46-.197-46-1.47zm90-1.482c0-1.938-13.783-95.71-14.325-97.458-.155-.501-6.783-2.645-14.729-4.764l-14.446-3.852-14.5 3.675c-7.975 2.02-14.796 3.94-15.158 4.263-.363.324-3.86 22.19-7.772 48.59-3.912 26.4-7.286 48.787-7.498 49.75-.362 1.646 2.25 1.75 44.022 1.75 43.384 0 44.406-.045 44.406-1.954zm-27.47-7.45c-1.962-1.963-4.797-3.912-6.299-4.332-2.322-.65-1.908-.84 2.77-1.265l5.5-.5-.342-5.5c-.188-3.025-.512-5.674-.72-5.887-.21-.213-4.33.163-9.16.834-18.061 2.512-17.963 2.511-19.247.114-1.12-2.093-1.025-2.15 2.476-1.493 3.797.712 25.504-1.376 25.477-2.451-.008-.34-.41-1.24-.893-2.002-.704-1.112-1.52-1.161-4.134-.25-3.78 1.318-11.82 1.545-10.408.294.523-.463 3.524-1.392 6.67-2.065 6.504-1.391 10.92-4.3 9.195-6.058-.791-.806-2.37-.555-5.83.928-2.61 1.119-5.741 1.784-6.959 1.479-1.478-.371-2.831.127-4.074 1.5-1.024 1.132-2.44 2.057-3.148 2.057-3.081 0-2.268-2.474 2.243-6.822 4.35-4.192 4.627-4.71 2.676-4.988-1.198-.17-2.715-.958-3.373-1.75-1.007-1.213-.55-1.44 2.908-1.44 2.256 0 5.916-.725 8.133-1.613 3.228-1.291 4.328-1.367 5.52-.377 2.575 2.136 1.666 2.871-4.399 3.557-5.818.659-5.895.709-6.469 4.247-.32 1.97-.38 3.783-.134 4.028.246.246 2.384-.293 4.752-1.197 6.674-2.549 11.74-1.984 11.74 1.307 0 .956-.888 2.541-1.972 3.522-1.953 1.768-1.948 1.802.559 3.774 1.995 1.57 3.384 1.853 6.582 1.341 4.12-.659 6.83.478 6.83 2.866 0 .85-1.578 1.08-5.3.77l-5.302-.44.411 9.394c.335 7.647.12 9.635-1.15 10.69-1.326 1.1-2.1.758-5.13-2.272zm-37.352-2.678c-2.315-4.053-2.316-4.063-.165-2.911 1.187.635 2.384.929 2.66.653.61-.61 2.328-13.993 1.856-14.465-.184-.184-2.179.605-4.432 1.755-3.441 1.756-4.097 2.577-4.097 5.136 0 3.382-1.55 6.913-3.035 6.913-1.431 0-1.169-3.704.489-6.91 1.378-2.664 1.325-2.87-1-3.929-1.35-.615-2.454-1.779-2.454-2.587 0-1.204.552-1.277 3.052-.406 4.587 1.6 11.948-1.373 11.948-4.823v-2.49l-2.635 2.073c-3.112 2.448-5.644 2.645-7.365.572-1.053-1.268-.84-1.5 1.378-1.5 2.92 0 2.922-.004 1.704-5.25-.495-2.13-.495-3.75 0-3.75 1.382 0 4.159 4.802 3.445 5.956-.721 1.168.505 1.353 2.891.437 2.249-.862 1.958-4.966-.597-8.42-2.642-3.574-1.946-4.623 1.853-2.793 2.574 1.24 2.814 1.807 2.694 6.341-.24 9.058-2.435 29.94-3.388 32.23-1.31 3.146-2.14 2.829-4.802-1.832zm23.572-6.41c2.15-.934 3.25-2.106 3.25-3.46 0-2.45 2.227-2.685 4.095-.434 1.15 1.384 1.008 1.884-.988 3.5-1.36 1.101-3.842 1.87-5.968 1.846l-3.639-.039 3.25-1.412zm-13.858-37.395l-2.388-1.934 4.998.126c8.194.206 11.854-.945 13.873-4.363 2.091-3.54 1.548-5.943-1.343-5.943-1.436 0-2.036.66-2.047 2.25-.021 3.149-1.505 5.149-3.306 4.457-.964-.37-1.326-1.341-.985-2.645.732-2.8-.138-2.602-4.702 1.065-5.888 4.732-9.767 1.522-5.11-4.23 1.673-2.066 2.18-2.19 4.548-1.11 3.318 1.511 3.115 1.526 4.999-.358 1.96-1.96 2.018-3.429.136-3.429-.789 0-2.701-.533-4.25-1.184l-2.815-1.185 3.99-.565c2.722-.386 4.097-1.122 4.324-2.316.259-1.359-.353-1.75-2.74-1.75-1.69 0-3.074-.364-3.074-.81 0-.974 11.975-3.1 13.75-2.44 2.337.868 1.262 2.25-1.75 2.25-1.65 0-3 .189-3 .419 0 .23-.283 1.156-.63 2.06-.526 1.371-.01 1.59 3.145 1.33 2.36-.193 3.939.16 4.213.941.263.749-.424 1.25-1.71 1.25-2.616 0-6.018 1.716-6.018 3.036 0 .53 1.71.964 3.8.964 6.438 0 7.99 3.301 3.612 7.68l-2.588 2.587 2.637-.504c1.694-.324 3.424.153 4.838 1.333 2.2 1.837 2.2 1.838-2.365 1.871-4.17.03-14.102 1.468-18.044 2.612-.886.257-2.685-.402-3.998-1.465zm3.496-8.99c1.6-1.767 1.596-1.916-.068-2.554-1.865-.716-4.7 2.005-3.729 3.578.819 1.324 1.948 1.02 3.797-1.024zm-8.688-14.381c8.275-8.535 13.784-16.658 12.302-18.14-1.65-1.65-1.145-2.603 1.376-2.603 2.78 0 5.083 2.357 4.3 4.4-.372.967 2.236 3.196 8.138 6.954 9.87 6.286 15.184 10.846 15.184 13.031 0 4.073-2.668 2.432-17.288-10.635-3.538-3.162-6.799-5.75-7.245-5.75-.447 0-3.962 3.419-7.811 7.596-6.14 6.663-13.224 12.404-15.305 12.404-.379 0 2.478-3.265 6.349-7.257z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default GoldGen;
