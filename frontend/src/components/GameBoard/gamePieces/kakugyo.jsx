import React from "react";
import { useState, useRef } from "react";

function Bishop({startLeft, startTop, color, moveFunc}) {
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
        moveFunc([9 - (startTop + 25)/52 | 0, (startLeft + 25)/52 | 0], [9 - (startTop + top + 25)/52 | 0, (startLeft + left+ 25)/52 | 0]);
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
      width="42.324"
      height="50"
      version="1.1"
      className={color === "black" ? "piece black" : "piece white"}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{top: (startTop + top) + "px", left: (startLeft + left) + "px", zIndex: (isClicked.current) ? 5 : 3}}
    >
      <g transform="translate(-603.82 -698.648)">
        <g transform="matrix(.43155 0 0 .43155 343.244 425.572)">
          <path
            fill="#fff"
            fillOpacity="1"
            stroke="none"
            d="M605.893 747.72l15.714-103.75 30.714-9.822 31.608 9.286 15.714 103.392z"
          ></path>
          <g transform="translate(-27.143 -21.429)">
            <path
              fill="#cfcfcf"
              d="M631.47 767.826c.279-1.237 3.945-25.2 8.146-53.25 4.201-28.05 7.772-51.153 7.935-51.34.163-.188 7.552-2.294 16.418-4.682l16.122-4.34 16.023 4.333c8.812 2.383 16.176 4.49 16.363 4.681.187.192 3.762 23.298 7.945 51.348s7.833 52.013 8.11 53.25l.506 2.25h-98.076l.508-2.25zm93.526-1.5c-.01-1.846-14.857-100.444-15.172-100.76-.195-.194-6.973-2.071-15.062-4.171l-14.708-3.819-14.777 3.84c-8.127 2.111-14.893 3.952-15.034 4.09-.252.247-15.23 99.343-15.239 100.82-.002.413 20.246.75 44.996.75 24.75 0 44.998-.337 44.996-.75zm-28.032-4.59c-.805-.736-3.607-2.126-6.225-3.087-4.142-1.52-7.726-4.919-6.49-6.156.227-.226 2.968.061 6.092.639 3.124.577 6.175.744 6.78.37 1.637-1.012.59-12.428-1.267-13.81-.825-.614-1.917-1.832-2.427-2.708-.838-1.438-1.631-1.451-8.24-.134-7.19 1.434-7.351 1.42-9.718-.803-1.324-1.244-2.212-2.577-1.974-2.963.239-.385 4.874-.972 10.3-1.302 5.917-.36 11.836-1.358 14.786-2.492 5.256-2.02 8.16-1.76 11.397 1.027 3.117 2.682 2.431 3.76-2.396 3.76-6.57 0-7.822.678-6.163 3.342.74 1.187 1.606 6.47 1.925 11.739.463 7.65.274 10.019-.939 11.75-1.745 2.492-3.355 2.737-5.44.829zm-36.35-1.91c-1.086-1.705-1.227-3.46-.583-7.25.467-2.75.877-6.049.91-7.331l.059-2.332-3.368 2.082c-3.38 2.089-7.19 2.575-11.382 1.451-3.366-.902-2.769-1.716 2.681-3.652 5.666-2.012 15.069-9.043 15.069-11.266 0-1.336-.322-1.336-2.895-.005-3.664 1.894-10.68 3.05-11.404 1.88-.303-.49 1.894-2.17 4.882-3.735 6.377-3.34 11.417-8.67 11.417-12.074 0-2.251.203-2.343 3.021-1.36 2.83.986 4.979 3.444 4.979 5.695 0 .541-1.603 1.975-3.562 3.186l-3.562 2.201 2.062 2.195c2.902 3.089 2.58 4.992-1.396 8.27l-3.459 2.851 1.415 3.972c3.776 10.605-.11 22.72-4.884 15.222zm18.945-35.22c-1.068-.84-1.743-1.577-1.5-1.635.243-.058 3.816-.671 7.941-1.363s8.98-1.875 10.788-2.629c2.837-1.182 3.66-1.161 5.993.148 1.488.835 2.844 2.238 3.013 3.118.25 1.297-.978 1.708-6.493 2.173-3.74.315-9.276.831-12.301 1.146-4.102.427-5.994.184-7.441-.957zm9.194-14.868c-4.25-2.452-4.905-4.662-1.38-4.662 2.116 0 2.424-.54 2.853-5 .264-2.75.264-7.25 0-10l-.48-5h-3.873c-2.776 0-3.873.425-3.873 1.5 0 .825.81 1.5 1.8 1.5 2.106 0 4.2 1.845 4.2 3.7 0 .778-1.205 1.3-3 1.3-2.28 0-3 .456-3 1.898 0 1.504.673 1.867 3.25 1.75 2.663-.12 3.308.259 3.57 2.102.28 1.973-.12 2.25-3.25 2.25-3.467 0-3.57.11-3.57 3.8 0 3.558-1.364 6.2-3.2 6.2-.44 0-.8-2.073-.8-4.608 0-4.462-.083-4.588-2.596-3.957-1.427.358-3.187.16-3.91-.44-1.576-1.308-2.021-.66-2.901 4.22-.802 4.445-1.834 5.262-4.706 3.725-2.03-1.087-2.105-1.563-1.3-8.296.47-3.93.846-9.956.837-13.394-.017-6.534.679-7.371 3.79-4.556 1.76 1.592 1.833 1.592 1.222 0-.56-1.459.093-1.7 4.707-1.737 2.946-.024 7.382-.502 9.857-1.062 9.733-2.201 9.611-2.205 11.605.34 1.654 2.11 1.895 4.193 1.895 16.342 0 13.203-.103 13.932-2 14.085-1.1.088-3.686-.812-5.747-2zM677 695.904c0-1.345-.575-1.856-1.846-1.64-1.016.172-2.59-.305-3.5-1.06-1.484-1.231-1.654-1.02-1.654 2.05 0 3.32.102 3.409 3.5 3.012 2.666-.311 3.5-.874 3.5-2.362zm-.028-6.79c1.699-1.073.985-1.44-4.722-2.426-3.107-.537-4.439.866-2.583 2.722.973.973 5.595.786 7.305-.295zm-1.972-9.66c0-.484 1.995-1.94 4.433-3.232 5.163-2.74 6.282-4.693 3.53-6.165-2.82-1.51-2.417-2.98.815-2.98 3.536 0 7.222 2.554 7.222 5.005 0 2.894-6.345 7.166-11.506 7.748-2.472.279-4.494.11-4.494-.375zm-11-2.246c0-.622.381-1.132.847-1.132.465 0 2.525-1.63 4.577-3.623 2.838-2.756 3.594-4.167 3.16-5.896-.67-2.67.929-3.585 4.166-2.381 3.247 1.207 2.853 4.874-1 9.305-2.516 2.893-4.21 3.864-7.5 4.298-2.826.373-4.25.182-4.25-.57z"
            ></path>
            <path
              fill="#afafaf"
              d="M633.04 758.826c.955-6.187 4.562-30.15 8.016-53.25 3.454-23.1 6.338-42.095 6.408-42.212.07-.116 7.437-2.196 16.372-4.622l16.245-4.41 16.11 4.357c8.862 2.396 16.207 4.476 16.325 4.622.117.146 3.471 22.09 7.454 48.765 3.982 26.675 7.576 50.638 7.986 53.25l.745 4.75H631.304l1.736-11.25zm91.918 6.5c-.079-3.213-14.589-99.213-15.069-99.694-.26-.26-7.092-2.255-15.181-4.433L680 657.24l-14.708 3.96c-8.09 2.178-14.883 4.135-15.097 4.35-.397.396-15.182 98-15.19 100.277-.004.982 9.66 1.25 44.995 1.25 42.207 0 44.997-.108 44.957-1.75zm-27.926-3.71c-.667-.805-2.184-1.755-3.372-2.112-5.079-1.528-8.66-3.76-8.66-5.398 0-1.553.536-1.636 4.956-.762 7.151 1.414 8.044.795 8.044-5.575 0-4.321-.537-6.072-2.75-8.962-2.944-3.846-2.912-3.842-12.064-1.526-3.786.958-4.641.846-7-.915-3.435-2.565-2.719-3.766 2.314-3.88 7.474-.167 16.903-1.551 20.33-2.983 4.94-2.064 8.495-1.774 11.005.898 2.719 2.894 1.991 3.675-3.42 3.675-2.338 0-4.976.279-5.863.619-1.467.563-1.46.728.066 1.844 2.48 1.813 3.917 21.072 1.812 24.284-1.702 2.598-3.661 2.885-5.398.792zm-36.038-1.047c-.91-1.097-1.06-3.697-.549-9.558l.703-8.05-4.215 2.15c-3.287 1.677-5.175 2.006-8.574 1.497-2.398-.36-4.359-.97-4.359-1.358 0-.387 2.19-1.482 4.865-2.432 5.742-2.04 16.135-9.458 16.135-11.516 0-.981-.557-1.208-1.75-.712-5.095 2.117-10.853 3.43-12.604 2.874-1.624-.515-1.065-1.064 3.104-3.045 5.702-2.71 12.25-9.31 12.25-12.345 0-2.847 3.145-2.539 6.076.595l2.424 2.592-3.886 3.272-3.886 3.272 2.136 2.136c2.978 2.977 2.688 4.499-1.497 7.856-3.231 2.592-3.503 3.156-2.462 5.102 1.78 3.326 2.557 14.446 1.188 17.003-1.358 2.538-3.332 2.796-5.099.667zm19.256-35.622c-2.128-2.163-1.463-2.561 5.338-3.197 3.623-.338 7.996-1.317 9.717-2.176 3.418-1.705 7.834-1.24 9.712 1.023 1.937 2.334.347 3.185-7.244 3.875-4 .363-9.298.905-11.773 1.203-2.961.357-4.927.108-5.75-.728zm10.75-14.37c-.685-.826-1.81-1.5-2.5-1.5s-1.772-.624-2.404-1.385c-.917-1.105-.641-1.513 1.362-2.016a4.272 4.272 0 003.139-3.13c.876-3.489.045-16.245-1.129-17.32-1.593-1.46-8.42-.188-7.79 1.452.294.769 1.298 1.398 2.229 1.398 2.012 0 4.093 1.881 4.093 3.7 0 .778-1.205 1.3-3 1.3-2.343 0-3 .443-3 2.02 0 1.613.467 1.901 2.324 1.435 1.458-.366 2.795-.016 3.586.937 1.752 2.11.52 3.608-2.969 3.608-2.615 0-2.941.34-2.941 3.066 0 3.639-1.711 7.231-3.05 6.403-.523-.322-.95-2.409-.95-4.636 0-3.768-.166-4.008-2.386-3.45-1.51.378-2.84.05-3.622-.892-1.964-2.367-2.69-1.781-3.284 2.647-.305 2.276-1.2 4.783-1.988 5.571-1.246 1.246-1.665 1.204-3.186-.317-1.495-1.496-1.627-2.64-.901-7.822.468-3.338.854-9.107.859-12.82.006-4.559.396-6.75 1.201-6.75 1.719 0 4.307 4.053 4.307 6.742 0 2.368.56 2.414 7.265.594 2.586-.703 1.07-2.336-2.169-2.336-2.489 0-6.096-2.561-6.096-4.328 0-.37 2.559-.672 5.686-.672s8.555-.72 12.062-1.599c9.405-2.358 9.783-1.829 10.652 14.926.38 7.303.396 14.042.038 14.976-.806 2.1-3.77 2.208-5.438.197zm-13.5-14.517c0-.838-.93-1.498-2.135-1.516-1.175-.018-2.862-.635-3.75-1.372-1.434-1.19-1.615-.952-1.615 2.125 0 3.445.02 3.461 3.75 2.855 2.374-.386 3.75-1.154 3.75-2.092zm-2.5-16.334c0-.193 2.25-1.75 5-3.459 5.457-3.392 6.22-5.317 2.75-6.932-2.015-.938-2.067-1.121-.498-1.76 4.754-1.936 10.676 3.474 7.712 7.045-2.062 2.485-8.556 5.456-11.924 5.456-1.672 0-3.04-.157-3.04-.35zm-10.196-2.179c-.375-.375 1.203-2.128 3.507-3.894 3.375-2.588 4.187-3.83 4.18-6.394-.009-2.791.321-3.183 2.682-3.183 1.791 0 2.9.653 3.311 1.95.777 2.448-1.8 7.557-4.807 9.527-2.723 1.784-7.916 2.951-8.873 1.994z"
            ></path>
            <path
              fill="#8f8f8f"
              d="M631.966 768.826c-.082-2.95 15.41-104.327 16.056-105.067.967-1.108 28.846-8.648 31.978-8.648 3.104 0 30.984 7.529 32.026 8.648.708.761 15.978 100.713 15.975 104.567 0 1.643-2.954 1.75-48.001 1.75-37.715 0-48.007-.267-48.034-1.25zm93.064-3c.071-3.006-14.434-99.332-15.07-100.073-.389-.453-7.289-2.557-15.333-4.676L680 657.224l-14.581 3.84c-8.02 2.113-14.846 4.106-15.17 4.43-.62.62-15.14 95.458-15.21 99.332l-.039 2.25h45c35.317 0 45.006-.268 45.03-1.25zm-27.337-4.106c-.307-.8-1.844-1.737-3.416-2.083-4-.878-9.277-4.257-9.277-5.94 0-1.117.779-1.23 3.75-.54 2.063.48 4.988.882 6.5.896 2.714.023 2.75-.06 2.75-6.328 0-5.705-.308-6.674-3.024-9.516l-3.024-3.165-6.54 1.517c-6.686 1.55-8.76 1.211-11.297-1.846-1.55-1.868-.046-2.288 8.977-2.509 3.625-.088 9.025-.859 12-1.712 9.149-2.625 10.757-2.746 13.41-1.008 4.478 2.934 3.215 4.59-3.502 4.59-6.285 0-7.102.474-4.321 2.507 2.188 1.6 3.68 19.663 1.94 23.481-1.303 2.858-4.103 3.799-4.926 1.656zm-36.676-1.124c-.886-1.066-1.03-3.72-.519-9.5.39-4.41.464-8.02.163-8.02-.3 0-2.14.941-4.09 2.09-2.76 1.63-4.428 1.941-7.557 1.413-2.208-.373-4.014-1.017-4.014-1.43 0-.414 1.891-1.377 4.203-2.14 5.018-1.655 15.797-9.515 15.797-11.517 0-1.746.038-1.747-4.346.085-1.974.825-5.292 1.494-7.372 1.487l-3.782-.012 4.5-2.554c6.271-3.56 12-9.349 12-12.125 0-3.238 3.307-2.993 6.011.445l2.156 2.74-3.812 3.202-3.813 3.2 2.23 2.373c2.94 3.131 2.842 3.712-1.238 7.243l-3.466 3 1.466 5.468c1.713 6.388 1.841 9.916.49 13.467-1.09 2.869-3.156 3.316-5.007 1.085zm19.733-35.542c-3.11-1.914-1.89-2.676 5.247-3.274 3.848-.323 8.306-1.36 9.906-2.305 2.498-1.476 3.347-1.538 6.003-.437 1.702.704 3.094 1.677 3.094 2.16 0 .483.113 1.216.25 1.628.138.413-2.9 1.044-6.75 1.402-3.85.359-9.025.933-11.5 1.277-2.615.363-5.233.174-6.25-.451zm7.867-15.827c-3.145-2.147-3.525-2.718-2-3.008 3.862-.734 4.383-2.125 4.383-11.706 0-5.125-.423-9.58-.94-9.899-.516-.32-2.732-.294-4.924.057-2.828.452-3.83 1.038-3.453 2.021.292.762 1.328 1.384 2.302 1.384 2.164 0 4.426 2.526 3.542 3.957-.355.574-1.743 1.043-3.086 1.043-1.82 0-2.441.54-2.441 2.117 0 1.688.445 2 2.198 1.542 2.18-.57 4.802.776 4.802 2.464 0 .483-.863.877-1.918.877-3.413 0-5.082 1.163-5.082 3.542 0 3.408-1.839 7.676-2.998 6.96-.551-.34-1.002-2.393-1.002-4.56 0-3.695-.184-3.942-2.941-3.942-1.617 0-3.22-.45-3.559-1-1.248-2.02-2.25-.898-2.79 3.122-.685 5.114-2.097 6.76-4.487 5.234-1.221-.778-1.66-2.228-1.506-4.977.12-2.133.344-8.04.5-13.125.198-6.481.65-9.247 1.51-9.25 2.176-.007 4.124 4.338 4.843 10.802.546 4.915 1.02 6.182 2.147 5.75.796-.306 2.535-.556 3.865-.556 1.725 0 2.418-.555 2.418-1.936 0-1.454-.81-2.015-3.25-2.25-4.178-.403-4.395-3.095-.307-3.804 1.62-.28 2.857-.847 2.75-1.26a7.797 7.797 0 01-.193-1.61c0-.475-1.08-.656-2.402-.403-1.62.31-3.166-.305-4.75-1.889l-2.348-2.348 8-.554c4.4-.305 9.665-1.12 11.701-1.811 4.393-1.492 7.525-.296 8.232 3.144.883 4.303 1.675 25.277 1.018 26.989-.906 2.36-3.222 2.03-7.834-1.117zM676 679.144c0-.513.863-1.207 1.918-1.541 2.885-.916 7.082-4.49 7.082-6.032 0-.748-.907-1.647-2.015-2-2.351-.746-1.694-2.495.94-2.495 2.352 0 7.075 3.734 7.075 5.595 0 2.044-8.83 7.405-12.196 7.405-1.542 0-2.804-.42-2.804-.932zm-10.476-2.028c-.255-.414 1.365-2.223 3.601-4.02 3.392-2.725 3.996-3.744 3.644-6.143-.357-2.426-.078-2.877 1.782-2.877 1.212 0 2.793.71 3.513 1.577 1.09 1.315 1 2.148-.543 5.015-1.019 1.891-2.44 3.926-3.158 4.522-1.751 1.454-8.255 2.87-8.839 1.926z"
            ></path>
            <path
              fill="#6f6f6f"
              d="M632.028 768.326c.048-3.01 15.557-104.168 16.046-104.656.764-.764 29.764-8.594 31.83-8.594 2.634 0 31.33 7.81 32.133 8.744.582.679 15.99 101.98 15.97 105.006-.005.983-10.278 1.25-48.007 1.25-45.058 0-47.998-.107-47.972-1.75zm93.105-.716c.358-.358-14.058-101.301-14.602-102.246-.067-.117-6.923-2.04-15.234-4.273l-15.112-4.06-13.843 3.628c-7.613 1.996-14.51 3.996-15.327 4.445-1.113.61-3.383 13.517-9.048 51.43-4.159 27.838-7.353 50.823-7.098 51.078.608.609 89.656.606 90.264-.002zm-27.458-5.94c-.297-.772-1.826-1.687-3.398-2.033-3.608-.792-9.277-4.198-9.277-5.574 0-.684 2.23-.814 6.5-.376l6.5.666v-6.49c0-5.881-.288-6.792-3.073-9.705-2.971-3.11-3.228-3.183-7.752-2.212-2.574.551-5.353 1.258-6.177 1.569-.824.31-3.073-.4-4.998-1.58-3.17-1.944-3.312-2.214-1.5-2.864 1.1-.395 2.56-.508 3.243-.252 1.976.74 18.482-1.849 21.457-3.366 3.54-1.804 6.832-1.743 9.578.18 4.283 3 2.823 4.441-4.528 4.466-6.578.021-6.694.066-4.552 1.75 1.937 1.523 2.278 3.037 2.88 12.776.595 9.65.466 11.265-1.02 12.75-2.069 2.07-3.17 2.153-3.883.296zm-36.59-.992c-.893-1.075-1.035-3.745-.518-9.673.411-4.717.336-8.005-.177-7.756-6.446 3.134-8.497 3.684-11.758 3.155-4.682-.76-4.599-1.721.274-3.181 4.825-1.446 16.094-9.6 16.094-11.644 0-1.865-1.74-1.866-5-.002-1.375.786-4.3 1.425-6.5 1.42l-4-.01 4-2.062c5.676-2.927 12.5-9.782 12.5-12.557 0-2.671 1.65-2.925 4.778-.735 3.153 2.209 2.762 4.513-1.318 7.768l-3.54 2.825 2.54 1.998c1.397 1.099 2.54 2.438 2.54 2.976 0 .538-1.635 2.476-3.633 4.307-2.02 1.85-3.328 3.823-2.946 4.442 1.34 2.167 2.475 12.677 1.743 16.121-.807 3.791-3.114 4.976-5.08 2.608zm19.665-35.682c-3.168-1.845-1.843-2.644 5.218-3.15 4.153-.296 8.03-1.193 9.595-2.219 2.897-1.898 6.347-1.497 8.876 1.032 2.411 2.41 1.091 3.25-5.198 3.308-3.158.029-7.313.515-9.234 1.08-4.343 1.28-6.998 1.265-9.257-.05zm7.867-15.77c-3.145-2.146-3.525-2.717-2-3.007 3.862-.734 4.383-2.125 4.383-11.706 0-5.125-.423-9.58-.94-9.899-.516-.32-2.732-.294-4.924.057-2.828.452-3.83 1.038-3.453 2.021.292.762 1.328 1.384 2.302 1.384 2.164 0 4.426 2.526 3.542 3.957-.355.574-1.743 1.043-3.086 1.043-1.82 0-2.441.54-2.441 2.117 0 1.688.445 2 2.198 1.542 2.143-.56 4.802.769 4.802 2.4 0 .448-1.457.956-3.238 1.128-2.852.276-3.307.736-3.808 3.847-1.111 6.903-3.954 8.316-3.954 1.966 0-3.74-.187-4-2.878-4-1.582 0-3.427-.662-4.099-1.472-1.033-1.245-.58-1.575 2.93-2.136 3.47-.555 4.101-1.005 3.849-2.745-.228-1.57-1.04-2.09-3.302-2.114-4.266-.046-4.05-2.931.25-3.346 3.516-.339 3.513-.337 2.7-2.456-.34-.886-1.45-1.262-2.902-.984-1.563.298-3.14-.338-4.7-1.899l-2.348-2.347 9-.61c4.95-.336 10.242-1.198 11.76-1.915 2.47-1.169 3.005-1.075 5.097.89 2.129 2 2.394 3.32 2.974 14.76.86 16.955-.135 18.698-7.714 13.525zm-25.633-.669c-1.012-1.219-1.014-2.957-.013-8.811.686-4.011 1.086-9.628.888-12.482-.366-5.287-.197-5.716 1.741-4.422 2.561 1.71 3.65 5.896 3.55 13.644-.149 11.486-2.626 16.336-6.166 12.071zm13.752-29.078c-.413-.413.897-1.685 2.91-2.827 4.894-2.774 6.459-5.338 4.083-6.69-.974-.555-1.499-1.45-1.166-1.988 1.282-2.075 8.437 1.948 8.437 4.743 0 2.968-12.25 8.775-14.264 6.762zm-7.293-6.694c3.462-3.316 4.348-4.793 3.901-6.5-.453-1.733-.148-2.209 1.417-2.209 3.085 0 4.463 2.282 3.27 5.417-1.616 4.251-5.876 7.583-9.695 7.583h-3.371l4.478-4.29z"
            ></path>
            <path
              fill="#4f4f4f"
              d="M632 769.153c0-1.264 14.871-99.924 15.556-103.2.514-2.462 1.535-2.891 16.496-6.921L680 654.735l16.017 4.315c13.617 3.669 16.09 4.63 16.503 6.42.595 2.577 15.48 102.202 15.48 103.605 0 .655-16.62 1.001-48 1.001-28.677 0-48-.371-48-.923zm93.3-1.827c.393-.706-14.262-101.363-14.864-102.089-.154-.186-7.058-2.12-15.342-4.298l-15.06-3.958-15.127 3.99c-8.32 2.195-15.223 4.13-15.341 4.298-.572.817-15.219 101.407-14.86 102.057.226.413 20.609.75 45.294.75 24.685 0 45.07-.337 45.3-.75zm-27.307-5.758c-.634-.764-2.804-1.912-4.823-2.552-4.454-1.41-8.17-3.65-8.17-4.925 0-.552 2.682-.689 6.5-.332l6.5.607V747.9c0-5.766-.323-6.826-2.994-9.818l-2.994-3.353-5.082 1.173c-7.055 1.629-9.343 1.478-12.07-.793l-2.36-1.967 4.808-.033c6.894-.048 18.734-2.019 21.892-3.644 3.532-1.817 6.827-1.76 9.578.167 4.363 3.056 2.83 4.443-4.913 4.443h-7.135l2.526 1.987c2.29 1.801 2.593 2.916 3.236 11.896.39 5.45.422 10.815.07 11.921-.828 2.61-3.105 3.452-4.569 1.688zm-36.289-.6c-1.595-.926-1.72-1.985-1.113-9.467.4-4.926.304-8.425-.231-8.425-.503 0-1.912.7-3.131 1.553-1.496 1.048-3.926 1.454-7.473 1.25l-5.256-.303 6.5-3.207c7.972-3.934 14-8.807 14-11.316 0-1.83-.11-1.829-4.25.05-2.337 1.061-5.825 1.92-7.75 1.907l-3.5-.022 4-2.095c7.477-3.916 14.072-10.782 13.03-13.567-.645-1.726 1.574-1.566 4.248.307 2.662 1.865 2.892 4.983.472 6.391-.962.56-2.562 1.656-3.554 2.436-1.716 1.347-1.68 1.541.74 3.961 3.018 3.019 2.68 4.373-1.87 7.478-3.386 2.312-3.396 2.341-1.942 5.82 1.637 3.918 1.544 17.499-.124 17.995-.55.164-1.808-.171-2.796-.745zm19.046-35.917c-3.185-1.955-1.824-2.974 4-2.996 3.552-.014 7.417-.779 10.112-2.002 3.718-1.687 4.749-1.793 6.987-.72 1.445.692 2.786 2.088 2.981 3.1.298 1.549-.099 1.744-2.487 1.223-1.564-.341-5.093-.15-7.843.424-8.85 1.849-11.963 2.069-13.75.971zm8.283-15.77l-4.468-2.594 3.252-.843 3.252-.843-.284-10.212-.285-10.213-4.368.201c-5.007.23-5.396.447-4.59 2.546.345.901 1.349 1.333 2.437 1.049 1.175-.307 2.246.256 2.935 1.544.957 1.788.76 2.065-1.664 2.344-1.94.223-2.842.96-3.06 2.499-.258 1.806.245 2.236 2.922 2.5 4.629.455 5.024 2.817.471 2.817-3.13 0-3.583.309-3.583 2.435 0 3.247-1.699 7.565-2.975 7.565-.564 0-1.025-1.947-1.025-4.326 0-4.173-.1-4.312-2.807-3.915-1.7.25-3.294-.176-4.043-1.078-1.051-1.267-.63-1.593 2.807-2.173C677.41 698 678 697.539 678 695.42c0-2.044-.36-2.365-2.048-1.83-2.573.817-5.716-1.414-3.75-2.66.714-.454 2.344-.83 3.621-.84 1.68-.01 2.224-.5 1.962-1.765-.206-.997-1.166-1.678-2.231-1.584-2.763.244-6.554-1.429-6.554-2.891 0-.89 2.078-1.339 6.876-1.484 3.782-.114 8.754-.959 11.05-1.877 4.058-1.624 4.235-1.61 6.48.497 2.106 1.98 2.354 3.272 2.855 14.872.503 11.653-.098 16.39-2.046 16.117-.393-.055-2.725-1.267-5.182-2.694zm-26.007-.673c-.956-1.153-.959-2.929-.011-8.25.664-3.73 1.045-9.37.846-12.533-.367-5.845-.213-6.287 1.74-4.983 2.393 1.598 3.4 5.452 3.4 13.02 0 11.741-2.458 16.984-5.975 12.746zm13.986-29.282c.007-.412 1.603-1.78 3.547-3.04 4.4-2.85 5.25-4.882 2.816-6.726-1.75-1.326-1.67-1.422 1.22-1.452 3.619-.037 6.763 2.872 5.804 5.37-1.126 2.934-13.427 8.308-13.387 5.848zm-7.569-6.54c3.462-3.317 4.348-4.794 3.901-6.5-.458-1.753-.15-2.21 1.49-2.21 1.137 0 2.5.774 3.029 1.72 2.072 3.702-4.657 11.28-10.015 11.28h-2.883l4.478-4.29z"
            ></path>
            <path
              fill="#2f2f2f"
              d="M632.425 766.326c.33-2.062 3.952-25.97 8.048-53.126 4.096-27.158 7.578-49.494 7.737-49.636.16-.142 7.379-2.154 16.043-4.47l15.754-4.21 15.95 4.243c14.94 3.974 15.983 4.407 16.489 6.846.531 2.56 15.554 102.623 15.554 103.602 0 .276-21.64.501-48.088.501h-48.088l.601-3.75zm93.193-1c-.297-1.512-3.756-24.575-7.687-51.25-3.93-26.675-7.59-48.777-8.13-49.115-.542-.34-7.487-2.305-15.433-4.368l-14.448-3.751-14.524 3.847c-7.988 2.117-14.876 4.082-15.308 4.368-.432.286-4.017 22.344-7.967 49.02-3.95 26.674-7.43 49.737-7.731 51.25l-.549 2.75h92.318l-.54-2.75zm-27.555-3.673c-.672-.81-2.874-1.997-4.893-2.637-4.454-1.41-8.17-3.65-8.17-4.925 0-.552 2.682-.689 6.5-.332l6.5.607v-6.898c0-6.381-.227-7.112-3.025-9.753l-3.025-2.856-6.552 1.237c-5.302 1-7.014.989-8.975-.06-1.333-.714-2.423-1.604-2.423-1.979 0-.374 4.019-.966 8.93-1.315 4.913-.349 11.932-1.619 15.598-2.822 6.221-2.043 6.844-2.082 9.32-.585 1.458.883 2.798 2.31 2.975 3.173.27 1.31-.879 1.57-7 1.573l-7.323.005 2.667 2.245c2.48 2.087 2.715 2.987 3.331 12.767.606 9.619.497 10.673-1.274 12.276-1.695 1.533-2.09 1.568-3.16.279zm-36.484-1.14c-1.178-1.178-1.356-3.221-.875-10.037l.604-8.558-3.404 2.076c-3.28 2-11.924 2.969-11.887 1.332.01-.412 2.451-1.803 5.427-3.09 6.592-2.854 13.556-8.626 13.556-11.237 0-2.347.263-2.351-4.5.077-2.158 1.1-5.515 2-7.461 2l-3.539-.001 4-1.98c6.147-3.044 11.26-7.712 12.646-11.546 1.452-4.014 2.112-4.214 4.854-1.473 2.853 2.853 2.493 4.533-1.5 7-4.05 2.503-4.226 3.066-1.5 4.768 2.947 1.841 2.44 4.796-1.34 7.812-3.261 2.603-3.31 2.751-2.044 6.293 1.863 5.215 1.806 16.752-.087 17.478-.81.31-2.137-.1-2.95-.914zm19.421-35.9c-3.075-1.712-1.971-2.183 6.687-2.855 3.404-.264 7.125-1.137 8.27-1.939 2.331-1.633 6.403-1.219 8.099.824 1.56 1.882.42 3.247-2.282 2.732-1.25-.238-5.649.272-9.774 1.134-8.848 1.847-7.886 1.838-11 .104zm11.49-13.552c-.344-.558-2.283-1.752-4.308-2.653l-3.682-1.637 3-.605 3-.605.285-10.26c.32-11.48.028-11.975-6.355-10.777-2.615.49-3.469 1.114-3.229 2.36.187.97 1.327 1.743 2.672 1.811 1.29.065 2.735.74 3.21 1.5.65 1.041.131 1.459-2.11 1.695-2.398.253-2.973.784-2.973 2.75 0 2.02.494 2.436 2.893 2.436 1.65 0 3.14.645 3.469 1.5.442 1.154-.216 1.5-2.848 1.5-3.178 0-3.468.269-4.047 3.75-1.024 6.162-1.407 6.96-2.505 5.222-.512-.81-.938-2.856-.947-4.548-.014-2.8-.267-3.04-2.822-2.665-1.677.246-3.293-.174-4.014-1.043-1.014-1.221-.562-1.559 2.807-2.097 3.49-.558 4.014-.981 4.014-3.239 0-2.237-.33-2.513-2.386-1.998-1.482.372-2.835.057-3.573-.832-.983-1.185-.563-1.549 2.436-2.111 4.345-.815 4.63-3.877.374-4.038-3.672-.139-5.852-1.115-5.847-2.62.003-.895 2.035-1.339 6.75-1.474 3.71-.106 8.735-.9 11.165-1.765 4.26-1.516 4.503-1.494 6.73.6 1.831 1.719 2.278 3.126 2.148 6.764-.09 2.527-.03 8.49.136 13.251.165 4.762-.004 9.15-.375 9.75-.847 1.37-2.247 1.406-3.067.078zm-29.492-2.99c-.789-1.472-.666-4.15.461-10.093.844-4.449 1.278-9.96.964-12.245l-.57-4.157 2.574 2.806c2.332 2.543 2.573 3.583 2.573 11.101 0 12.214-2.923 18.344-6.002 12.589zm14.04-28.745c.022-.412 1.445-1.65 3.164-2.75 4.653-2.977 5.75-5.282 3.357-7.058-1.834-1.362-1.767-1.442 1.193-1.442 2.093 0 3.645.73 4.671 2.194 1.395 1.991 1.377 2.37-.193 4.107-3.207 3.546-12.31 7.241-12.191 4.95zm-7.454-6.434c3.671-3.384 4.425-4.642 3.94-6.575-.515-2.052-.276-2.344 1.688-2.065 1.658.235 2.376 1.09 2.607 3.105.446 3.88-5.38 9.72-9.697 9.72h-3.077l4.54-4.185z"
            ></path>
            <path
              fill="#030303"
              d="M632.553 766.326c.276-1.512 3.887-25.234 8.023-52.715 4.137-27.481 7.612-50.018 7.723-50.082.11-.064 7.316-2.008 16.013-4.32l15.812-4.206 15.688 4.207c8.628 2.313 15.808 4.287 15.955 4.387.147.099 3.623 22.635 7.724 50.08 4.102 27.445 7.683 51.137 7.959 52.65l.5 2.75h-95.9l.503-2.75zM726 767.55c0-2.985-15.252-102.104-15.784-102.577-.394-.35-7.353-2.341-15.466-4.424L680 656.76l-14.75 3.788c-8.112 2.083-15.05 4.067-15.419 4.408-.367.341-3.875 22.22-7.794 48.62-3.92 26.4-7.381 49.463-7.693 51.25l-.567 3.25h46.112c25.36 0 46.111-.237 46.111-.527zm-28.552-6.34c-1.071-1-4.046-2.586-6.61-3.524-7.283-2.666-6.895-4.271 1.01-4.183l6.652.074-.081-6.137c-.065-4.906-.566-6.752-2.5-9.195-2.736-3.457-3.946-3.653-12.127-1.964-5.42 1.12-5.973 1.06-7.877-.844l-2.049-2.05 9.453-.62c5.2-.342 11.417-1.348 13.817-2.237 7.253-2.687 8.253-2.721 11.22-.387 3.662 2.88 2.145 3.897-5.856 3.924l-6 .02 2.655 2.245c2.468 2.087 2.702 2.992 3.304 12.792.583 9.49.462 10.715-1.208 12.226-1.74 1.575-1.976 1.566-3.803-.14zm-36.103-1.187c-.731-.732-.932-4.026-.584-9.603l.53-8.49-3.395 2.07c-2.023 1.233-5.114 2.071-7.646 2.074-4.793.004-5.663-1.427-1.5-2.466 5.947-1.484 16.25-9.495 16.25-12.634 0-2.139 1.993-2.504 3.8-.697 2.076 2.076 1.318 4.609-2.175 7.273l-3.375 2.574 1.42 4.119c1.871 5.433 1.424 16.201-.69 16.604-.837.159-2.023-.212-2.635-.824zm-7.708-28.868c5.696-2.586 12.1-8.6 12.864-12.08.58-2.64.845-2.797 3.048-1.793 2.06.939 4.338 4.507 3.292 5.159-.187.117-2.816 2.046-5.841 4.287-5.836 4.322-10.642 6.363-14.9 6.328-2.27-.02-2.074-.261 1.537-1.901zm28.092-6.17c-2.807-1.634-1.017-2.908 4.08-2.903 2.58.003 6.808-.753 9.396-1.68 3.77-1.352 5.21-1.457 7.25-.527 3.69 1.681 3.121 3.2-1.205 3.22-2.062.01-6.9.684-10.75 1.5-3.85.815-7 1.469-7 1.452 0-.017-.797-.494-1.771-1.061zm7.912-15.751c-3.702-2.525-3.763-2.656-1.5-3.188 2.274-.535 2.37-.94 2.643-11.262l.284-10.707-3.284.014c-1.806.008-4.286.282-5.51.61-1.86.5-2.053.92-1.173 2.564.579 1.082 1.65 1.738 2.382 1.457.73-.28 2.116.36 3.078 1.423 1.694 1.871 1.649 1.932-1.406 1.932-2.816 0-3.155.312-3.155 2.907 0 2.416.338 2.818 2.005 2.382 1.103-.289 2.753.091 3.666.843 1.475 1.217 1.225 1.424-2.256 1.868-3.75.48-3.928.67-4.232 4.5-.456 5.762-1.823 6.384-2.603 1.183-.634-4.227-.837-4.46-3.769-4.325-1.704.078-3.296-.42-3.538-1.108-.257-.73.393-1.25 1.562-1.25 3.555 0 5.165-1.158 5.165-3.715 0-2.137-.348-2.414-2.386-1.903-1.482.372-2.835.057-3.573-.832-.983-1.184-.57-1.547 2.386-2.102 2.6-.488 3.573-1.185 3.573-2.559 0-1.42-.724-1.889-2.918-1.889-3.744 0-6.085-.908-6.072-2.357.006-.735 2.65-1.214 7.413-1.343 4.072-.11 9.048-.887 11.058-1.727 3.485-1.456 3.757-1.424 5.837.7 2.031 2.074 2.182 3.188 2.182 16.139 0 8.452-.392 14.002-1 14.144-.55.128-2.737-.952-4.86-2.4zm-26.58-1.042c-.706-1.32-.55-4.24.525-9.75.843-4.325 1.27-9.594.947-11.707-.437-2.862-.26-3.734.69-3.42 2.37.781 3.747 5.227 3.762 12.146.025 11.376-3.079 18.046-5.924 12.731zm14.56-28.92c-.275-.443 1.08-1.656 3.01-2.695 4.92-2.65 5.971-4.964 3.15-6.94l-2.226-1.56h2.288c3.314 0 6.157 1.793 6.157 3.88 0 2.298-2.56 4.621-7.254 6.582-4.26 1.78-4.461 1.809-5.126.733zm-7.654-6.278c3.424-3.324 4.091-4.548 3.583-6.575-.543-2.164-.325-2.448 1.662-2.166 1.658.235 2.376 1.09 2.607 3.105.423 3.68-5.38 9.72-9.34 9.72-2.718 0-2.716-.005 1.488-4.084z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Bishop;
