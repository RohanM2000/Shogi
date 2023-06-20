import React from "react";
import { useState, useRef } from "react";

function SilverGen({startLeft, startTop, color, moveFunc}) {
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
      <g transform="translate(-460.595 -446.831)">
        <g transform="matrix(.44527 0 0 .44527 273.948 277.407)">
          <path
            fill="#fff"
            fillOpacity="1"
            stroke="none"
            d="M436.133 390.965L419.971 491.98l92.492.379-15.973-102.152-30.557-8.586z"
          ></path>
          <g>
            <path
              fill="#cfcfcf"
              d="M419.429 491.447c0-4.365 15.217-102.173 15.969-102.637.502-.31 7.69-2.308 15.972-4.438l15.059-3.873 15.058 3.873c8.282 2.13 15.47 4.127 15.973 4.438.751.464 15.969 98.272 15.969 102.637 0 1.106-8.326 1.344-47 1.344-38.675 0-47-.238-47-1.344zm90.417-3.406c-.217-.963-3.553-23.09-7.413-49.173-3.86-26.083-7.127-47.507-7.26-47.61-.135-.101-6.657-1.887-14.494-3.967l-14.25-3.781-14.25 3.781c-7.838 2.08-14.359 3.865-14.492 3.965-.132.101-3.394 21.3-7.248 47.11-3.854 25.808-7.242 47.937-7.528 49.175l-.52 2.25h43.925c41.318 0 43.902-.104 43.53-1.75zm-60.245-5.454c-.655-1.263-2.747-4.224-4.648-6.58l-3.457-4.283-2.586 4.096c-1.658 2.627-3.191 3.98-4.272 3.772-2.84-.546-2.552-3.796.744-8.385 2.542-3.54 2.94-4.746 2.093-6.329-2.657-4.965.661-11.385 4.753-9.195 1.08.579 2.239 1.765 2.573 2.635.505 1.316 1.285 1.04 4.617-1.64 5.552-4.46 5.161-9.207-1.019-12.403-4.524-2.34-3.867-4.484 1.375-4.484 4.58 0 7.655 2.14 7.655 5.328 0 2.196 1.172 2.11 4.247-.308 4.48-3.524 7.711-4.277 10.502-2.449 2.135 1.399 3.097 1.452 6.929.379 4.039-1.131 4.696-1.058 7.135.795 3.223 2.448 3.335 6.873.238 9.4-2.005 1.638-2.003 1.65.347 2.24 1.3.326 2.586 1.446 2.858 2.489.376 1.435 1.133 1.774 3.118 1.394 3.058-.584 7.626 2.024 7.626 4.355 0 1.249-.906 1.505-4.335 1.227l-4.334-.35.429 7c.681 11.128-2.875 16.808-6.988 11.162-1.067-1.464-2.606-2.662-3.422-2.662-.815 0-2.465-.563-3.666-1.25-1.987-1.137-1.686-1.296 3.316-1.75l5.5-.5-.023-5.69c-.012-3.128-.314-5.98-.67-6.337-.357-.356-3.2-.118-6.318.529l-5.67 1.177 2.123 2.26c4.527 4.818-1.87 10.295-10.942 9.37l-3.5-.358 4.573-2.34c2.998-1.533 4.952-3.341 5.672-5.249l1.1-2.91-4.906.65c-3.709.492-5.518.249-7.422-.999-4.026-2.638-2.975-3.533 4.087-3.478 7.876.06 19.409-2.06 19.364-3.559-.059-1.959-2.667-4.566-4.579-4.577-1.503-.01-1.225-.535 1.36-2.573 2.964-2.336 4.346-5.353 2.5-5.46-.412-.024-2.662-.413-5-.866-2.337-.452-4.25-.448-4.25.01 0 1.456-6.153 7.9-7.544 7.9-2.58 0-2.574-2.07.014-5.146 4.811-5.718.506-4.618-5.142 1.314-3.018 3.17-3.227 3.914-4.307 15.332-1.586 16.767-2.103 18.94-4.589 19.296-1.336.19-2.49-.517-3.26-2zm3.26-17.368l.7-7.928-4.028 4.5c-5.67 6.334-5.85 7.426-1.934 11.8 3.095 3.458 3.373 3.573 3.945 1.638.34-1.145.931-5.65 1.317-10.01zm-9.873-2.524c.372-.603-.051-1.824-.941-2.715-1.491-1.49-1.618-1.404-1.618 1.096 0 2.762 1.332 3.604 2.559 1.619zm23.94-2.505c1.1-.845 2.662-1.916 3.47-2.38.89-.512 1.377-2.06 1.234-3.932-.188-2.474.152-3.087 1.713-3.087 2.254 0 3.53 3.083 2.68 6.472-.599 2.386-4.944 4.557-8.996 4.496-2.09-.032-2.09-.04-.1-1.569zm-21.75-25.48c-2.566-1.494-2.18-3.92.626-3.92 5.741 0 8.625-1.19 8.625-3.561 0-2.057-.364-2.253-3.297-1.778-4.708.764-6.655-1.696-3.597-4.545 1.952-1.819 2.016-2.13.551-2.693-3.016-1.158-1.828-3.287 2.015-3.612 4.165-.352 5.943-2.81 2.033-2.81-1.353 0-2.993-.642-3.645-1.427-.822-.99-2.302-1.246-4.836-.835l-3.651.593 6.772-6.336c4.248-3.973 6.984-7.39 7.339-9.165.844-4.223 6.304-3.256 6.322 1.12.003.852 1.353 2.316 3 3.253 3.239 1.843 3.936 4.498 1.434 5.458-.926.355-2.653-.44-4.25-1.956l-2.69-2.555-5 4.04-5 4.04 4.5-.55c2.475-.303 5.909-.848 7.631-1.212 1.943-.41 3.4-.228 3.836.48.953 1.541-1.271 4.052-3.59 4.052-1.033 0-1.877.478-1.877 1.063 0 .584.787.982 1.75.884 5.083-.517 6.162 2.42 1.25 3.403-3.74.747-3.982 3.4-.351 3.833 2.459.294 5.375 3.125 4.313 4.187-.256.257-1.77.794-3.364 1.194-2.067.52-2.694.4-2.189-.418.39-.63.232-1.146-.35-1.146-.583 0-1.06.871-1.06 1.936 0 1.454.81 2.015 3.25 2.25 4.997.482 4.035 2.884-1.75 4.372-2.75.708-6.266 1.771-7.815 2.364-3.435 1.315-4.673 1.315-6.934-.002zm9.25-14.454c0-1.226-.403-1.32-2-.465-2.538 1.359-2.538 2 0 2 1.132 0 2-.667 2-1.535zm14.161 12.988c-1.487-3.264-1.477-10.006.028-18.172.94-5.106.926-6.868-.07-8.462-1.586-2.541-.614-3.61 1.873-2.057 1.495.934 2.793.872 6.08-.288 2.3-.81 5.113-1.474 6.254-1.474 1.414 0 1.749-.326 1.051-1.023-.697-.698-2.655-.647-6.153.16-4.087.944-5.445.924-6.677-.099-.85-.706-1.546-1.572-1.546-1.924 0-.55 4.617-1.943 12.593-3.8 1.318-.307 3.166.435 4.99 2.004l2.896 2.49-1.908 5.613c-1.05 3.087-2.395 5.991-2.99 6.454-.595.462-3.51.88-6.478.93-2.968.048-5.79.482-6.271.962-1.205 1.205-2.385 14.614-1.24 14.086a196.66 196.66 0 003.68-1.806l2.774-1.39-2.773-2.94-2.773-2.94 3.084.655c2.667.565 3.639.117 7.168-3.308 3.961-3.844 4.135-3.906 5.787-2.08 2.395 2.646 1.343 4.375-3.555 5.842l-4.225 1.266 3.87 2.554c4.687 3.093 6.37 5.08 6.37 7.516 0 3.5-2.992 3.19-7-.722-4.435-4.331-5.89-4.183-9.21.94-2.723 4.204-4.065 4.445-5.629 1.013zm13.725-24.177c1.134-2.18 1.047-2.219-4.356-2-4.368.177-5.514.567-5.52 1.879-.008 1.354.717 1.557 3.99 1.118 2.889-.387 4-.176 4 .762 0 1.535.335 1.223 1.886-1.759z"
            ></path>
            <path
              fill="#afafaf"
              d="M419.423 492.04c-.009-1.222 15.182-102.729 15.41-102.973.116-.123 7.272-2.096 15.903-4.383l15.693-4.16 15.692 4.16c8.631 2.287 15.787 4.26 15.902 4.383.229.244 15.42 101.75 15.411 102.974-.003.412-21.155.75-47.005.75s-47.003-.338-47.006-.75zm90.538-4.5c-.278-1.237-3.447-22.274-7.042-46.75-3.596-24.474-6.775-45.68-7.066-47.123-.492-2.443-1.465-2.872-14.226-6.268-7.534-2.005-14.373-3.645-15.198-3.645-.825 0-7.665 1.64-15.199 3.645-12.76 3.396-13.734 3.825-14.227 6.268-.29 1.443-3.467 22.424-7.06 46.624-3.593 24.2-6.789 45.237-7.103 46.75l-.57 2.75h88.197l-.506-2.25zm-59.532-3.694c0-.596-2.015-3.557-4.478-6.581l-4.478-5.498-2.655 4.012c-2.717 4.105-5.03 5.11-5.993 2.602-.666-1.734 1.683-6.447 4.47-8.969 1.87-1.693 1.928-2.076.602-3.97-2.023-2.888-1.838-5.992.525-8.79l1.993-2.361 2.903 3.149 2.902 3.149 3.604-3.691c4.723-4.837 4.639-7.46-.389-12.101-2.196-2.028-3.696-3.983-3.333-4.346s2.315-.66 4.338-.66c4.127 0 6.989 2.387 6.989 5.828 0 2.851.58 2.748 4.652-.828 2.39-2.1 4.458-3 6.882-3 1.906 0 3.466.45 3.466 1 0 1.276 4.107 1.29 7.434.024 3.159-1.2 7.03.105 8.51 2.87 1.35 2.526-.297 6.478-3.308 7.936l-2.136 1.034 2.227.068c1.224.037 2.922 1.128 3.771 2.425 1.134 1.73 2.203 2.231 4.021 1.884 2.93-.56 7.48 2.124 7.48 4.412 0 1.302-.816 1.515-4.309 1.121l-4.309-.486.06 8.818c.047 7.14-.277 9.153-1.704 10.582-1.684 1.686-1.874 1.643-4.29-.962-1.39-1.5-3.324-2.726-4.297-2.726-.972 0-2.642-.661-3.71-1.469-1.78-1.346-1.464-1.47 3.81-1.5l5.75-.031-.016-5.25c-.022-7.769-.666-8.364-7.417-6.853l-5.595 1.252 2.031 2.583c1.78 2.263 1.863 2.84.662 4.675-1.97 3.01-6.115 4.76-10.426 4.402l-3.74-.31 4.628-2.72c3.158-1.856 4.786-3.548 5.126-5.327.496-2.592.472-2.602-4.436-1.927-3.96.544-5.318.331-6.876-1.078-3.077-2.785-2.363-3.77 2.2-3.04 2.519.402 7.596-.004 12.96-1.035l8.82-1.697-1.676-2.838c-.953-1.612-2.555-2.849-3.711-2.864-1.773-.023-1.68-.246.723-1.736 2.717-1.684 4.48-4.833 3.343-5.97-.32-.32-2.62-.89-5.11-1.269-4.163-.632-4.63-.484-5.76 1.817-1.702 3.466-6.447 6.869-7.754 5.561-.69-.69-.207-1.96 1.502-3.947 2.744-3.19 3.437-6.06 1.143-4.729-.758.44-3.296 2.543-5.64 4.673l-4.261 3.874-.93 12.626c-1.191 16.195-1.758 18.54-4.574 18.946-1.219.176-2.216-.168-2.216-.764zm2.416-18.055l.667-8.5-4.521 5c-2.487 2.75-4.53 5.61-4.542 6.356-.011.746 1.412 3.164 3.162 5.374 3.867 4.883 4.252 4.279 5.234-8.23zm-10.055-2.5c1.075-2.8-1.32-5.994-2.754-3.674-.683 1.104.42 5.174 1.402 5.174.427 0 1.036-.675 1.352-1.5zm23.645-2.17c.003-.457 1.39-1.617 3.08-2.58 2.683-1.526 2.99-2.13 2.414-4.75-.484-2.202-.292-3 .72-3 3.706 0 5.073 5.549 2.03 8.233-1.995 1.76-8.254 3.35-8.244 2.096zm-21.256-26.41c-2.567-1.495-2.18-3.92.625-3.92 1.306 0 3.78-.282 5.5-.625 2.467-.494 3.125-1.135 3.125-3.046 0-2.223-.285-2.367-3.49-1.765-4.308.808-5.756-1.53-2.903-4.683 1.753-1.937 1.758-2.097.1-3.025-2.546-1.425-1.117-2.856 2.852-2.856 2.392 0 3.44-.458 3.44-1.5 0-.913-.93-1.5-2.377-1.5-1.308 0-2.916-.649-3.573-1.441-.996-1.2-.557-1.55 2.627-2.095 2.103-.36 5.23-1.131 6.948-1.714 5.788-1.965 9.01 1.43 3.376 3.556-3.93 1.483-3.93 3.484 0 2.907 4.12-.605 4.12 2.313 0 3.137-2.061.412-3 1.19-3 2.486 0 1.432.557 1.78 2.31 1.445 1.392-.266 2.869.23 3.713 1.247 1.22 1.47 1.155 1.868-.502 3.08-2.195 1.605-4.936 1.872-4.021.392.34-.55.141-1-.441-1-.583 0-1.06.9-1.06 2 0 1.539.667 2 2.894 2 1.59 0 3.135.63 3.43 1.402.709 1.845-.147 2.598-2.953 2.598-1.263 0-4.58.9-7.37 2-5.725 2.256-6.776 2.36-9.25.92zm9.25-14.42c0-.825-.395-1.5-.878-1.5s-1.438.675-2.122 1.5c-1.04 1.253-.896 1.5.877 1.5 1.22 0 2.123-.638 2.123-1.5zm15.074 14.089c-2.043-2.461-2.408-8.515-1.044-17.286 1.06-6.812 1.075-8.905.077-10.502-1.598-2.56-.585-3.58 1.97-1.985 1.609 1.005 2.845.95 6.49-.288 2.476-.84 5.252-1.528 6.168-1.528 1.135 0 1.339-.326.641-1.023-.697-.698-2.655-.647-6.153.16-4.087.944-5.445.924-6.677-.099-2.09-1.734-1.949-3.038.328-3.038 1.03 0 3.778-.672 6.105-1.493 7.795-2.75 12.88.799 10.983 7.667-1.187 4.298-4.546 8.826-6.548 8.826-1.254 0-1.255-.447-.004-3.44l1.437-3.438-5.422.189c-4.439.155-5.422.508-5.424 1.95 0 1.496.603 1.666 3.998 1.123 2.617-.419 4-.262 4 .453 0 1.594-3.9 3.422-6.082 2.851-1.474-.385-2.096.295-2.892 3.16-1.076 3.875-1.4 12.152-.476 12.152.302 0 1.926-.712 3.609-1.582l3.059-1.582-2.859-3.03-2.859-3.029 3.148.668c2.737.582 3.69.154 7.299-3.28l4.15-3.947 1.587 2.422c1.875 2.86 1.956 2.745-3.624 5.115l-4.378 1.86 3.586 2.115c4.186 2.47 7.2 6.611 6.374 8.762-.92 2.397-2.99 1.776-6.642-1.992-1.865-1.925-3.983-3.5-4.705-3.5-.723 0-2.547 1.783-4.054 3.962-3.059 4.422-3.494 4.643-5.166 2.627zm-21.738-31.492c3.906-4.046 6.664-7.77 6.664-9 0-1.353.638-2.097 1.8-2.097 2.284 0 4.2 1.89 4.2 4.145 0 .96 1.237 2.339 2.75 3.064 2.76 1.323 3.783 4.78 1.625 5.499-.618.206-2.485-.771-4.15-2.172l-3.025-2.546-4.268 3.566c-4.564 3.814-9.073 6.444-11.047 6.444-.667 0 1.785-3.107 5.45-6.903z"
            ></path>
            <path
              fill="#8f8f8f"
              d="M419.688 490.04c.28-1.512 3.8-24.873 7.822-51.914l7.312-49.165 15.804-4.13 15.803-4.129 15.803 4.13 15.803 4.129 7.312 49.165c4.022 27.04 7.542 50.402 7.822 51.915l.51 2.75h-94.5l.509-2.75zm90.71 0c-.243-5.828-14.979-98.637-15.736-99.103-.577-.356-7.165-2.212-14.64-4.126l-13.593-3.48-13.593 3.48c-7.476 1.914-14.07 3.774-14.655 4.135-.816.503-15.53 92.825-15.713 98.595-.03.981 9.406 1.25 43.96 1.25 24.2 0 43.987-.338 43.97-.75zM446.972 478.3c-4.611-6.104-5.012-6.395-6.699-4.869-.987.894-2.048 2.424-2.358 3.4-.693 2.184-3.476 3.372-4.799 2.05-1.302-1.303.768-6.23 3.823-9.1 2.27-2.133 2.296-2.325.747-5.573-3.102-6.505 2.544-11.7 6.37-5.861l1.674 2.555 3.849-3.758c5.616-5.484 5.185-9.615-1.433-13.716-3.45-2.138-2.691-3.636 1.84-3.636 4.183 0 7.442 2.928 7.442 6.687v2.687l2.75-2.565c5.14-4.794 9.908-6.13 12.166-3.41.976 1.176 1.94 1.194 6.034.114 6.287-1.659 9.415-.343 9.854 4.144.235 2.397-.313 3.597-2.385 5.227-1.479 1.164-3.594 2.116-4.7 2.116-1.843 0-1.79-.206.635-2.453 2.815-2.61 3.456-5.361 1.396-5.993-.688-.211-2.959-.622-5.046-.914-3.245-.452-3.918-.21-4.635 1.665-.93 2.433-3.687 5.08-6.222 5.974-2.786.983-2.914-.412-.32-3.495 2.69-3.197 3.402-6.433 1.119-5.084-.745.44-3.389 2.607-5.876 4.816l-4.521 4.017-.693 12.483c-.731 13.17-1.928 18.984-3.91 18.984-.66 0-3.405-2.922-6.102-6.492zm5.946-12.045l.63-8.963-4.145 4.474c-6.246 6.743-6.297 7.012-2.236 11.901 4.413 5.312 4.902 4.681 5.75-7.412zm-9.958-3.564c.774-2.439-1.012-4.82-2.5-3.332-1.077 1.077-.262 5.433 1.017 5.433.449 0 1.116-.946 1.483-2.1zm42.848 19.65c-.307-.8-2.205-1.979-4.219-2.622-6.037-1.927-5.99-2.927.139-2.927h5.7l-.016-5.25c-.02-7.234-.79-8.158-6.124-7.351-2.398.362-5.035 1.104-5.86 1.648-1.308.862-1.276 1.122.25 2.02 2.293 1.353 2.234 5.184-.113 7.309-1.027.93-4.28 1.927-7.25 2.224-5.81.581-5.645-.105.897-3.723 1.776-.982 3.14-2.697 3.454-4.345.518-2.707.495-2.72-3.926-2.056-3.271.49-5.089.245-6.88-.928-3.717-2.436-3.054-3.829 1.46-3.066 3.776.638 22.108-2.063 22.108-3.257 0-.312-.737-1.381-1.637-2.376-1.467-1.621-1.475-1.87-.078-2.405 2.083-.8 5.715 1.234 5.715 3.2 0 1.168.627 1.415 2.442.96 2.79-.7 7.188.99 7.986 3.069.708 1.847-1.746 2.713-5.538 1.955l-3.048-.61.686 6.402c.836 7.807-.71 13.58-3.637 13.58-1.075 0-2.205-.653-2.511-1.452zm-16.576-23.073c2.787-2.283 3.205-3.157 2.67-5.591-.682-3.108 1.033-3.978 3.326-1.685 3.302 3.302.199 7.895-6.3 9.324l-3 .659 3.304-2.707zm.068-25.128c-1.558-1.876-1.744-10.434-.437-20.077.603-4.446.505-6.638-.344-7.66-1.582-1.908.449-3.238 2.431-1.592 1.077.893 2.228.915 4.606.086 1.743-.608 4.453-1.105 6.02-1.105 1.569 0 2.852-.464 2.852-1.032 0-1.767-2.624-2.147-6.891-.998-2.93.79-4.673.798-6.105.032-2.902-1.553-2.467-2.708 1.246-3.313 1.787-.292 4.825-.943 6.75-1.448 2.562-.672 4.268-.536 6.37.508 2.667 1.326 2.834 1.746 2.36 5.953-.548 4.858-3.404 9.594-6.107 10.125-1.544.304-1.542.07.035-3.237 2.032-4.26 1.565-5.006-2.23-3.563-1.568.596-3.88.825-5.14.51-1.822-.458-2.288-.161-2.288 1.456 0 1.809.436 1.96 4 1.39 2.616-.418 4-.26 4 .454 0 1.565-3.702 3.329-6.234 2.969-1.578-.224-2.345.364-2.861 2.194-.968 3.428-1.076 12.776-.155 13.346.413.255 2.098-.611 3.746-1.925l2.995-2.388-2.246-1.574c-2.763-1.935-2.925-3.45-.295-2.762 1.956.511 7.356-2.557 9.861-5.602 1.189-1.445 1.452-1.407 2.796.405 1.346 1.813 1.283 2.163-.672 3.75-1.187.962-2.98 1.75-3.987 1.75-3.294 0-3.03 1.787.596 4.027 4.296 2.655 6.726 6.104 5.871 8.332-1.016 2.648-3.104 1.91-6.478-2.288-2.786-3.466-3.427-3.805-5.453-2.882-1.263.575-3.116 2.568-4.118 4.428-2.07 3.845-2.576 4.04-4.494 1.73zm-24.672-.548c-1.701-1.701-1.488-2.695.55-2.562.962.063 3.437-.21 5.5-.607 3.174-.611 3.75-1.117 3.75-3.293 0-2.251-.335-2.507-2.687-2.058-5.108.977-6.75-1.036-3.644-4.467 1.563-1.728 1.55-1.932-.195-3.208-1.709-1.25-1.514-1.423 2.33-2.072 4.564-.771 5.985-3.533 1.818-3.533-1.308 0-2.894-.622-3.525-1.383-.94-1.132-.303-1.51 3.508-2.08 2.56-.385 5.738-1.192 7.062-1.795 1.931-.88 2.734-.77 4.067.564 1.547 1.547 1.443 1.736-1.537 2.775-3.672 1.28-4.285 3.517-.947 3.458 3.188-.056 3.741 1.755.75 2.457-1.544.361-2.619 1.401-2.81 2.717-.236 1.63.116 2.02 1.5 1.66 2.35-.61 6.182 2.137 4.81 3.447-1.58 1.509-5.879 2.6-5.067 1.287.377-.61.208-1.107-.374-1.107-.583 0-1.06 1.047-1.06 2.327 0 2.016.4 2.268 3 1.886 2.526-.37 3-.106 3 1.673 0 1.558-.624 2.114-2.374 2.114-1.306 0-4.287.675-6.625 1.5-5.13 1.81-9.178 1.922-10.8.3zm9.8-13.955c0-2.13-.027-2.133-2.25-.26-1.238 1.041-2.438 2.01-2.667 2.154-.23.143.783.26 2.25.26 2.064 0 2.667-.486 2.667-2.154zm-6.75-16.501c4.523-4.459 6.75-7.427 6.75-8.999 0-1.29.48-2.345 1.065-2.345 2.275 0 4.935 2.16 4.935 4.01 0 1.142 1.231 2.575 3 3.49 1.65.853 3 2.215 3 3.025 0 2.217-4.035 1.79-6.693-.706l-2.32-2.18-2.744 2.578c-3.995 3.756-10.274 7.783-12.133 7.782-.966-.001 1.09-2.663 5.14-6.655z"
            ></path>
            <path
              fill="#707070"
              d="M419.817 490.04c.302-1.512 3.767-24.574 7.702-51.25 3.935-26.674 7.437-48.815 7.784-49.201.346-.386 7.491-2.53 15.878-4.765l15.248-4.062 15.248 4.062c8.386 2.235 15.53 4.379 15.877 4.765.347.386 3.85 22.527 7.784 49.202 3.935 26.675 7.4 49.737 7.702 51.25l.548 2.75H419.27l.547-2.75zm90.348-2.5c-.289-1.787-3.572-23.95-7.295-49.25-3.724-25.3-7.074-46.354-7.445-46.788-.37-.434-7.047-2.504-14.835-4.6l-14.161-3.81-14.161 3.81c-7.79 2.096-14.463 4.166-14.831 4.6-.544.64-15.078 95.97-15.024 98.539.009.412 19.874.75 44.146.75h44.131l-.525-3.25zm-61.067-6.5c-1.429-2.062-3.753-5.1-5.166-6.75-2.333-2.722-2.664-2.837-3.59-1.244-.56.966-2.09 2.991-3.397 4.5-1.85 2.135-2.647 2.48-3.591 1.55-1.561-1.536.214-6.149 3.586-9.316 2.27-2.133 2.296-2.325.747-5.573-3.102-6.505 2.544-11.7 6.37-5.861l1.674 2.555 3.849-3.758c5.647-5.514 5.191-9.606-1.533-13.782-2.241-1.391-2.575-1.984-1.5-2.664 4.341-2.75 10.882.725 10.882 5.78v2.688l2.75-2.565c5.449-5.082 9.77-6.101 12.604-2.97 1.56 1.723 1.52 2.053-.63 5.25-1.261 1.876-3.29 3.555-4.509 3.73-2.734.395-2.776-.291-.215-3.546 2-2.543 2.662-5.313 1.25-5.228-.413.025-3.04 2.163-5.839 4.75l-5.088 4.705-1.109 14.03c-.61 7.716-1.405 14.804-1.768 15.75-1.04 2.709-2.964 2.032-5.777-2.03zm3.679-10c.35-3.712.62-8.324.6-10.25l-.04-3.5-4.954 5.441c-2.725 2.992-4.954 5.724-4.954 6.07 0 .986 7.063 8.99 7.933 8.99.427 0 1.064-3.038 1.415-6.75zm-9.528-9.082c.191-1.302-.328-2.425-1.293-2.795-2.243-.861-2.88.09-2.11 3.152.763 3.044 2.936 2.816 3.403-.357zm42.49 19.957c-.645-1.032-2.762-2.174-4.706-2.539-5.764-1.081-5.277-2.585.837-2.585h5.559v-5.941c0-3.268-.482-6.24-1.071-6.603-1.347-.832-8.928.271-10.93 1.591-1.307.862-1.275 1.122.25 2.02 2.512 1.48 2.198 5.593-.564 7.403-2.37 1.553-11.685 3.296-11.685 2.186 0-.339 1.77-1.518 3.932-2.622 4.352-2.22 4.524-2.416 5.413-6.142l.621-2.607-4.423 1.012c-3.656.837-4.871.718-7.015-.687-3.48-2.28-2.286-3.755 2.43-3.001 3.196.511 19.71-1.945 20.87-3.104.183-.184-.19-1.311-.828-2.505-.64-1.194-.903-2.431-.586-2.748 1.034-1.034 5.586 1.661 5.586 3.306 0 1.235.643 1.46 2.815.982 2.03-.446 3.567-.027 5.51 1.5 3.574 2.813 2.457 4.34-2.584 3.534l-4.007-.64.679 6.004c1.19 10.525-2.517 17.929-6.104 12.186zm-15.889-23.241c1.933-1.52 2.605-2.859 2.385-4.75-.424-3.646 2.348-3.478 3.65.221.863 2.457.677 3.12-1.337 4.75-1.288 1.043-3.477 1.896-4.865 1.896h-2.524l2.691-2.117zm11.941-6.184c3.72-2.976 3.303-6.083-.871-6.492-1.645-.161-3.666-.547-4.491-.858-2.162-.813 1.489-2.189 6.05-2.279 4.239-.084 5.95 1.37 5.95 5.057 0 3.12-4.04 6.876-7.385 6.868-1.937-.005-1.874-.198.747-2.296zm-13.045-20.45c-1.378-3.267-1.421-4.922-.34-12.868.681-5.015.93-10.528.551-12.25-.702-3.2.188-4.015 2.196-2.007.832.832 1.961.832 4.349 0 1.774-.618 4.508-1.124 6.076-1.124 1.867 0 2.85-.518 2.85-1.5 0-1.758-2.066-1.887-7.235-.452-2.623.729-4.335.717-5.75-.04-2.912-1.559-2.481-2.714 1.236-3.314 1.787-.29 5.097-.839 7.355-1.222 5.398-.916 8.395.67 8.395 4.44 0 3.501-2.34 9.295-4.467 11.06-2.297 1.906-2.994.554-1.533-2.972 1.576-3.807.932-4.52-2.881-3.192-1.64.572-3.914.797-5.051.5-1.63-.427-2.068-.073-2.068 1.663 0 2.018.338 2.147 4 1.529 2.686-.454 4-.309 4 .443 0 1.35-2.304 2.323-5.82 2.457-3.083.119-3.934 2.382-4.08 10.85-.093 5.342.878 7.21 2.438 4.688.36-.584 1.85-1.52 3.309-2.08l2.653-1.02-2.75-2.206c-3.183-2.555-3.666-4.192-.78-2.648 1.996 1.068 3.557.174 9.282-5.315 1.849-1.773 1.951-1.773 3.246-.003 1.736 2.375.586 3.692-4.577 5.239l-4.101 1.229 4.493 2.85c5.036 3.193 6.656 5.418 5.94 8.158-.76 2.905-2.81 2.206-6.243-2.13-3.07-3.875-3.237-3.947-5.944-2.547-1.531.792-3.353 2.811-4.047 4.487-1.662 4.012-2.786 3.844-4.702-.702zm-24.187 1.408c-.895-1.079-.035-1.584 4.378-2.572 4.863-1.088 5.492-1.515 5.492-3.729 0-1.98-.469-2.461-2.25-2.317-6.48.525-7.675-1.437-3-4.924 2.61-1.947 2.638-2.054.559-2.084-3.893-.056-3.393-1.762.709-2.418 4.048-.648 5.832-3.613 2.173-3.613-.995 0-2.683-.66-3.75-1.468-1.862-1.408-1.83-1.47.774-1.5 1.493-.018 4.814-.745 7.38-1.616 4.236-1.438 4.81-1.44 6.232-.017 1.423 1.423 1.273 1.67-1.63 2.682-3.672 1.28-4.359 3.892-.947 3.607 3.166-.265 3.772 1.6.75 2.308-1.62.38-2.617 1.397-2.832 2.888-.269 1.862.028 2.188 1.552 1.704 2.202-.699 5.879 1.634 4.948 3.14-1.051 1.7-4.608 2.279-3.982.647.37-.964.036-1.206-1.075-.78-.886.34-1.611 1.668-1.611 2.95 0 1.922.482 2.298 2.75 2.143 4.2-.287 3.557 2.633-.75 3.407-1.925.346-4.767 1.141-6.316 1.767-3.788 1.531-8.191 1.437-9.554-.205zm9.87-13.812c0-2.13-.027-2.133-2.25-.26-1.238 1.041-2.438 2.01-2.667 2.154-.23.143.783.26 2.25.26 2.064 0 2.667-.486 2.667-2.154zm-6.75-16.1c4.965-4.781 6.75-7.193 6.75-9.123 0-1.442.48-2.622 1.065-2.622 2.27 0 4.935 2.16 4.935 4 0 1.061 1.012 2.463 2.25 3.114 2.285 1.204 3.707 2.778 3.734 4.136.032 1.534-4.053.68-5.984-1.25-2.415-2.415-3.348-2.491-5.07-.416-1.916 2.309-9.03 7.02-11.93 7.901-1.837.558-.709-.966 4.25-5.74z"
            ></path>
            <path
              fill="#4f4f4f"
              d="M420.057 489.54c.277-1.787 3.758-25.074 7.736-51.75l7.232-48.5 15.702-4.183 15.702-4.184 15.701 4.184 15.702 4.184 7.232 48.5c3.978 26.675 7.46 49.962 7.736 51.75l.503 3.25h-93.749l.503-3.25zm90.389.5c.068-2.989-14.449-97.939-15.08-98.632-.442-.486-7.133-2.586-14.87-4.668l-14.067-3.785-14.068 3.785c-7.737 2.082-14.43 4.182-14.876 4.668-.694.758-15.122 94.681-15.074 98.133.014.98 9.494 1.25 44.018 1.25 24.2 0 44.007-.338 44.017-.75zm-60.48-8c-1.717-3.12-8.386-10.8-8.828-10.166-4.656 6.68-5.978 7.939-7.238 6.893-1.677-1.392-1.018-3.43 2.633-8.131 2.7-3.479 2.765-3.8 1.343-6.651-3.038-6.089 2.548-11.184 6.18-5.639l1.675 2.555 3.849-3.758c5.67-5.537 5.197-9.599-1.614-13.835-2.74-1.703-2.815-1.9-1-2.61 5.215-2.038 10.463.858 10.463 5.775 0 2.233.142 2.196 4.576-1.189 4.936-3.768 8.418-4.41 10.473-1.934 1.808 2.178.137 6.479-3.256 8.383-3.586 2.013-4.512.787-1.907-2.524 2.096-2.666 2.806-5.46 1.364-5.373-.413.025-3.04 2.163-5.839 4.75l-5.088 4.705-1.271 14.5c-1.5 17.105-3.062 20.522-6.515 14.25zm2.81-10c.351-3.712.642-8.698.645-11.08l.007-4.331-4.99 5.83c-2.745 3.208-4.882 6.167-4.75 6.577.407 1.26 7.202 9.677 7.846 9.717.333.02.892-3 1.243-6.712zm-9.515-9.63c.183-.944-.225-2.388-.907-3.21-1.756-2.115-3.335-.176-2.515 3.089.714 2.847 2.879 2.924 3.422.12zm42.52 19.572c-.622-.994-3.093-2.457-5.491-3.25l-4.361-1.441 5.796-.302 5.796-.3-.296-6.2c-.274-5.724-.484-6.225-2.752-6.545-2.897-.409-10.044 1.559-10.044 2.764 0 .461.675 1.398 1.5 2.083 3.893 3.23.277 7.364-7.25 8.288-5.218.64-5.383-.17-.565-2.788 3.195-1.737 6.405-6.743 5.136-8.012-.212-.212-2.28.095-4.596.683-3.512.891-4.641.786-6.805-.631-3.385-2.219-2.478-2.946 3.344-2.68 4.16.19 18.961-2.253 20.01-3.302.213-.213-.115-1.326-.729-2.473-1-1.868-.842-2.085 1.513-2.085 1.828 0 2.796.638 3.177 2.096.44 1.685 1.093 1.988 3.324 1.542 1.915-.383 3.58.077 5.368 1.483 3.44 2.706 2.335 4.183-2.514 3.364l-3.882-.656.15 7.835c.082 4.31-.18 8.848-.583 10.086-.882 2.706-3.685 2.942-5.247.441zm-15.987-23.264c1.774-1.396 2.635-3.028 2.635-5 0-1.61.434-2.927.964-2.927 1.052 0 3.036 3.224 3.036 4.934 0 2.011-4.001 5.066-6.635 5.066h-2.635l2.635-2.073zm10.635-4.62c0-.454.928-1.406 2.063-2.115 1.294-.808 1.946-2.11 1.75-3.49-.25-1.753-1.078-2.266-4.063-2.513-2.063-.17-3.75-.712-3.75-1.204 0-1.494 6.972-2.319 9.576-1.132 2.946 1.342 3.325 6.046.674 8.373-2.114 1.856-6.25 3.234-6.25 2.082zm-11.192-20.557c-.8-1.425-1.129-4.819-.897-9.25.201-3.85.416-9.98.477-13.624.079-4.671.462-6.489 1.3-6.166.654.251 1.48 1.784 1.837 3.406.57 2.593 1.03 2.915 3.811 2.666 1.74-.155 3.389.168 3.664.718.282.565-1.298 1.13-3.636 1.302-3.725.272-4.196.606-4.75 3.375-1.586 7.932-.313 16.38 1.924 12.761.36-.584 1.803-1.498 3.204-2.03l2.549-.97-2.396-2.593c-2.184-2.365-2.218-2.54-.385-1.978 1.454.445 3.178-.453 6.235-3.247 3.44-3.144 4.434-3.61 5.351-2.504 1.796 2.164.435 3.908-4.114 5.27l-4.226 1.267 4.872 3.18c3.949 2.578 4.93 3.794 5.185 6.423.434 4.493-1.516 4.201-5.887-.88-3.56-4.138-3.583-4.147-6.204-2.43-1.446.948-3.21 3.035-3.92 4.638-1.551 3.505-2.329 3.634-3.994.666zm-24.808-.25c-1.032-1.243-.924-1.501.627-1.506 1.03-.003 3.56-.474 5.623-1.047 3.03-.842 3.75-1.511 3.75-3.494 0-2.195-.42-2.453-4-2.453-4.822 0-5.3-1.864-1.25-4.885 2.66-1.985 2.676-2.053.5-2.084-3.501-.049-2.647-1.734 1.25-2.465 3.642-.684 5.009-3.566 1.69-3.566-.994 0-2.682-.66-3.75-1.468-1.834-1.388-1.76-1.47 1.342-1.5 1.805-.018 4.931-.721 6.947-1.564 2.016-.842 4.251-1.306 4.968-1.031 2.046.785 1.53 3.563-.662 3.563-1.08 0-2.449.904-3.04 2.009-.968 1.808-.796 1.983 1.714 1.75 3.497-.325 4.693 1.614 1.29 2.092-2.616.367-3.958 1.717-3.984 4.007-.01.94.731 1.171 2.412.75 2.569-.645 6.071 1.776 5.023 3.472-.808 1.308-3.21 1.14-3.676-.257-.646-1.94-2.774.112-2.774 2.674 0 1.975.467 2.347 2.75 2.191 4.651-.318 3.412 2.643-1.454 3.474-2.312.395-5.095 1.195-6.184 1.778-2.865 1.533-7.667 1.3-9.112-.44zm9.838-12.063c.186-.154.186-.99 0-1.857-.278-1.296-.87-1.13-3.338.934l-3 2.51 3-.653c1.65-.359 3.152-.78 3.338-.934zm27.61-9.687c.375-1.238.923-3.01 1.217-3.938.472-1.489-.157-1.63-5.315-1.2l-5.85.487 3.364-1.55c1.851-.852 4.664-1.55 6.25-1.55 1.948 0 2.886-.506 2.886-1.56 0-1.328-1.022-1.46-6.85-.885-5.622.554-6.953.403-7.43-.839-.423-1.104.28-1.653 2.6-2.03 1.749-.284 5.102-.84 7.452-1.235 7.02-1.182 10.037 3.216 7.034 10.253-2.337 5.478-6.817 8.862-5.358 4.047zm-34.194-7.977c4.963-4.795 6.746-7.211 6.746-9.145 0-1.611.552-2.628 1.428-2.628 2.084 0 4.775 3.028 4.146 4.667-.303.79.221 1.678 1.192 2.023 2.208.782 5.234 3.363 5.234 4.465 0 1.82-4.13.711-6.194-1.663l-2.18-2.508-2.564 2.352c-4.188 3.843-9.393 7.38-12.058 8.193-1.831.559-.7-.973 4.25-5.756z"
            ></path>
            <path
              fill="#2f2f2f"
              d="M419.915 490.54c.289-1.237 3.677-23.624 7.53-49.75 3.853-26.124 7.208-48.41 7.456-49.521.376-1.686 3.032-2.708 15.99-6.152l15.538-4.13 15.538 4.13c12.957 3.444 15.613 4.466 15.99 6.152.247 1.112 3.603 23.397 7.455 49.522 3.853 26.125 7.242 48.512 7.53 49.75l.525 2.25H419.39l.525-2.25zm90.525-1c.016-1.614-14.23-98.152-14.542-98.55-.13-.164-6.814-2.07-14.853-4.235l-14.616-3.935-14.617 3.935c-8.04 2.165-14.722 4.07-14.851 4.236-.368.47-14.547 96.09-14.54 98.05.007 1.64 2.772 1.75 44.008 1.75 34.527 0 44.002-.27 44.011-1.25zm-60.898-8c-1.146-1.787-3.414-4.967-5.04-7.067l-2.956-3.817-2.691 4.067c-1.48 2.237-3.307 4.068-4.06 4.068-2.367 0-1.489-4.058 1.769-8.171 2.34-2.954 2.847-4.247 2-5.094-1.226-1.226-1.51-5.597-.528-8.153.935-2.439 4.298-1.885 5.575.918.626 1.375 1.423 2.5 1.77 2.5s2.448-1.913 4.67-4.25c3.405-3.585 3.945-4.717 3.45-7.234-.372-1.892-1.76-3.722-3.79-5-3.913-2.461-4.051-3.285-.695-4.127 3.35-.841 7.798 2.353 8.224 5.906l.311 2.598 4.584-3.499c4.928-3.761 8.776-4.198 10.647-1.21 1.357 2.17-.91 6.656-4.096 8.108-3.227 1.47-3.976.102-1.428-2.61 1.996-2.125 2.981-5.682 1.574-5.682-.328 0-2.641 1.8-5.14 4-2.5 2.2-4.867 4-5.26 4-.674 0-1.037 3.119-2.619 22.5-.9 11.032-2.592 12.988-6.27 7.25zm3.39-11c.377-4.537.53-9.484.34-10.994-.336-2.68-.447-2.617-4.843 2.77-2.475 3.033-4.437 6.183-4.36 7.001.143 1.519 6.324 9.236 7.52 9.39.363.046.968-3.629 1.344-8.166zm-9.654-7.067c.808-.974.679-1.91-.494-3.585-1.988-2.838-3.886-1.346-2.963 2.33.716 2.85 1.804 3.246 3.457 1.255zm42.439 18.408c-.656-1.05-2.56-2.21-4.23-2.577-4.856-1.067-5.07-2.912-.263-2.268 6.293.845 7.553-.607 6.67-7.678l-.727-5.82-5.512.569c-6.725.694-8.25 1.896-5.815 4.586 3.532 3.903-.22 8.052-7.31 8.083l-3.397.015 3.32-2.25c3.078-2.085 5.887-7.172 4.647-8.412-.296-.296-2.115-.017-4.043.62-2.958.976-4.023.874-6.817-.651l-3.311-1.807 5-.235c6.425-.3 18.92-2.289 20.492-3.26.923-.571.941-1.26.076-2.878-1.027-1.919-.881-2.127 1.49-2.127 1.788 0 2.796.64 3.152 2 .403 1.543 1.364 2 4.206 2 3.828 0 6.084 1.404 6.084 3.788 0 1.065-.93 1.23-4 .712l-4-.676v8.154c0 8.22-1.042 12.022-3.295 12.022-.673 0-1.761-.86-2.417-1.91zm-15.923-23.163c1.774-1.396 2.635-3.028 2.635-5 0-3.396 1.45-3.824 3.02-.89 1.492 2.788.313 5.886-2.671 7.02-4.42 1.68-5.863 1.135-2.984-1.13zm13.498-7.48c2.585-3.287 1.424-5.447-2.927-5.447-4.275 0-4.485-1.807-.301-2.592 3.862-.724 6.008.079 7.798 2.917 1.478 2.344-1.263 7.07-4.359 7.513l-2.358.338 2.147-2.73zm-13.934-17.579c-1.348-2.519-1.334-11.022.03-19.244.647-3.89.637-6.509-.027-7.75-.778-1.454-.659-1.874.532-1.874 1.413 0 1.943 1.427 1.792 4.826-.042.927 1.04 1.228 3.592 1 2.008-.18 3.877.124 4.152.674.282.565-1.296 1.13-3.63 1.301l-4.13.302-1.157 5.879c-.976 4.962-.72 11.018.468 11.018.184 0 1.959-.959 3.944-2.13l3.61-2.13-2.303-2.494c-2.143-2.322-2.163-2.452-.292-1.88 1.452.446 3.173-.447 6.206-3.22 2.915-2.664 4.514-3.516 5.24-2.79 1.964 1.964 1.042 3.274-3.681 5.232l-4.725 1.958 4.715 2.763c4.913 2.88 7.023 6.803 4.834 8.991-.872.872-2.088.069-4.977-3.286-3.78-4.389-3.853-4.42-6.37-2.772-1.4.917-3.152 3.038-3.893 4.713-1.594 3.601-2.392 3.787-3.93.913zm-24.93-.368c-1.043-1.258-.88-1.5 1.012-1.5 1.241 0 4.017-.528 6.17-1.173 3.104-.93 3.851-1.601 3.616-3.25-.225-1.574-1.145-2.155-3.797-2.399-5.216-.478-5.94-1.844-2.48-4.672 2.835-2.316 2.87-2.436.73-2.47-2.94-.047-2.94-2.032 0-2.052 2.72-.018 4.195-.939 4.998-3.121.452-1.228.137-1.515-1.26-1.15-1.026.268-2.892-.233-4.149-1.113-2.258-1.582-2.24-1.6 1.688-1.606 2.185-.003 5.293-.695 6.907-1.537 2.968-1.547 5.566-1.334 5.566.457 0 .537-1.205 1.564-2.677 2.281-3.989 1.945-4.349 4.189-.537 3.352 4.182-.919 5.117 1.162 1 2.224-2.281.588-3.384 1.517-3.606 3.038-.268 1.84.162 2.19 2.691 2.19 3.395 0 4.93 1.598 3.2 3.33-.873.872-1.347.843-1.943-.121-1.342-2.172-3.885-.385-3.36 2.36.377 1.975 1 2.416 3.102 2.2 4.471-.457 3.24 2.57-1.37 3.37-2.2.383-5.267 1.183-6.816 1.779-3.921 1.509-7.217 1.35-8.684-.417zm8.435-11.476c1.411-.536 2.566-1.66 2.566-2.5 0-2.12-1.023-1.906-4.5.945-3.15 2.582-2.384 3.198 1.934 1.555zm28.918-9.5c.361-.94.934-2.816 1.273-4.168.61-2.428.553-2.45-4.754-1.902-5.262.544-5.31.525-2.371-.905 1.65-.802 4.237-1.48 5.75-1.504 1.806-.03 2.75-.581 2.75-1.606 0-1.331-1.03-1.459-7-.87-4.519.445-7 .33-7-.325 0-1.197 8.818-4.244 12.283-4.244 2.7 0 5.717 2.801 5.717 5.308 0 3.096-3.236 9.747-5.272 10.837-1.728.925-1.934.832-1.376-.622zm-33.811-8.652c2.982-2.82 5.97-6.645 6.64-8.5.672-1.855 1.548-3.372 1.948-3.372 1.512 0 3.964 3.315 3.447 4.66-.325.847.363 1.746 1.734 2.268 1.25.475 2.866 1.58 3.593 2.456 1.115 1.343 1.056 1.694-.378 2.244-1.107.425-2.6-.249-4.287-1.935l-2.587-2.587-4.576 3.8c-9.167 7.615-13.333 8.342-5.534.966z"
            ></path>
            <path
              fill="#030303"
              d="M420.429 490.32c0-1.568 13.689-94.286 14.552-98.56.475-2.355 1.595-2.81 15.979-6.493l15.469-3.962 15.468 3.962c14.384 3.683 15.504 4.138 15.98 6.492.862 4.276 14.552 96.993 14.552 98.56 0 1.274-6.177 1.472-46 1.472-39.824 0-46-.198-46-1.472zm90-1.482c0-1.939-13.784-95.711-14.325-97.459-.156-.501-6.784-2.645-14.73-4.763l-14.445-3.853-14.5 3.675c-7.975 2.02-14.797 3.94-15.159 4.264-.362.324-3.86 22.189-7.772 48.589-3.912 26.4-7.286 48.787-7.498 49.75-.361 1.646 2.25 1.75 44.022 1.75 43.385 0 44.407-.045 44.407-1.953zm-59-4.87c0-.543-1.463-2.74-3.25-4.883-1.788-2.142-3.969-4.98-4.847-6.306l-1.596-2.41-2.786 4.21c-1.533 2.317-3.402 4.212-4.154 4.212-2.306 0-1.525-3.526 1.67-7.546 1.929-2.428 2.785-4.392 2.347-5.388-1.49-3.389-1.538-7.694-.098-8.89 1.842-1.528 4.453-.574 5.243 1.916.828 2.61 1.322 2.461 6.413-1.928 4.247-3.663 4.4-3.982 3.464-7.248-.602-2.104-2.198-4.185-4.154-5.416-3.786-2.385-3.976-3.078-1.052-3.842 3.245-.849 7.116 1.428 8.236 4.844 1.367 4.168 1.275 4.14 4.324 1.297 5.64-5.26 10.428-5.932 11.786-1.654.702 2.213-3.775 7.855-6.233 7.855-1.877 0-1.646-.817 1.187-4.183 5.243-6.231 1.631-6.62-5.278-.567l-4.851 4.25-1.228 13.5c-.675 7.425-1.546 14.588-1.935 15.918-.702 2.396-3.208 4.162-3.208 2.26zm1.499-12.427c.368-3.988.52-9.014.335-11.169l-.334-3.918-4.75 5.783c-2.613 3.181-4.75 6.108-4.75 6.505 0 1.106 7.162 10.049 8.048 10.049.43 0 1.082-3.263 1.45-7.25zm-9.65-7.882c1.163-1.861 1.072-2.392-.72-4.183-1.86-1.86-2.112-1.894-2.698-.366-.735 1.915.226 6.68 1.347 6.68.407 0 1.34-.958 2.072-2.13zm42.364 18.101c-.698-1.117-2.615-2.3-4.262-2.629-4.897-.98-4.89-2.746.007-1.963 6.599 1.055 8.175-1.463 6.417-10.252-.558-2.788-1.004-3.125-4.134-3.125-1.93 0-5.362.482-7.625 1.071-2.264.59-5.622 1.46-7.461 1.936-3.351.865-8.155-.412-8.155-2.168 0-.461 2.644-.84 5.877-.84 3.232 0 9.1-.727 13.038-1.616l7.161-1.618-1.561-2.382c-1.467-2.239-1.44-2.383.453-2.383 1.108 0 2.577.9 3.264 2 .808 1.294 2.332 2 4.317 2 3.513 0 7.07 2.187 6.103 3.753-.368.596-2.293.836-4.415.552l-3.761-.505.362 7.978c.484 10.666-2.243 15.607-5.625 10.191zm-17.06-7.133c2.546-1.477 3.839-3.048 4.266-5.184l.613-3.064 2.088 2.088c3.873 3.873-.131 8.353-7.417 8.3l-3.203-.022 3.653-2.119zm1.535-15.608c1.335-1.054 2.31-3.094 2.5-5.228l.312-3.5 1.95 2.88 1.95 2.879-2.756 2.37c-1.516 1.304-3.518 2.36-4.45 2.349-1.407-.019-1.324-.315.494-1.75zm13.4-8.133c2.544-3.443 1.867-5.095-2.088-5.095-3.279 0-4.777-1.488-2.413-2.395 4.447-1.707 9.413.786 9.413 4.723 0 2.093-3.49 5.672-5.53 5.672-1.232 0-1.111-.567.617-2.905zm-38.422-16.762c-1.212-1.212-.693-2.333 1.084-2.339.962-.003 3.437-.474 5.5-1.047 3.03-.842 3.75-1.511 3.75-3.494 0-2.19-.424-2.453-3.941-2.453-5.052 0-5.672-1.114-2.286-4.105 2.501-2.209 2.565-2.22.814-.145-1.429 1.694-1.55 2.246-.492 2.236 5.99-.058 8.627-4.604 2.768-4.771-4.94-.14-5.55-1.85-.926-2.59 3.222-.514 4.063-1.074 4.063-2.704 0-1.526-.465-1.908-1.803-1.484-.991.315-2.679-.09-3.75-.9-1.844-1.395-1.773-1.475 1.335-1.505 1.805-.018 4.782-.659 6.615-1.425 1.989-.83 3.887-1.05 4.71-.541 1.645 1.017.347 2.568-2.596 3.098-1.094.197-2.152 1.206-2.351 2.242-.312 1.617.076 1.796 2.738 1.264 1.815-.363 3.102-.205 3.102.38 0 .55-1.35 1.27-3 1.6-2.296.459-3 1.143-3 2.911 0 1.877.61 2.37 3.25 2.625 3.315.32 4.549 2.714 1.86 3.61-.89.297-1.12.028-.639-.75.524-.848.039-1.114-1.61-.88-1.763.25-2.361.967-2.361 2.834 0 2.094.472 2.5 2.912 2.5 1.602 0 3.102.562 3.333 1.25.232.687-.302 1.25-1.187 1.25s-4.169.9-7.299 2c-5.847 2.055-9.421 2.505-10.593 1.333zm24.369-1.268c-1.357-2.535-1.32-11.637.072-18.132.8-3.727.806-5.829.022-7.55-.709-1.554-.735-2.383-.077-2.383 1.073 0 1.932 1.687 2.366 4.645.216 1.472 1.073 1.754 4.673 1.54 3.26-.195 4.018.003 2.909.76-.825.563-2.931 1.031-4.68 1.04-3.052.014-3.225.238-4.342 5.617-.64 3.081-.873 7.146-.52 9.032l.644 3.43 2.584-2.032c1.42-1.118 3.198-2.032 3.948-2.032 1.914 0 1.704-1.01-.749-3.622-1.945-2.07-1.964-2.211-.228-1.758 1.246.326 3.312-.823 6.09-3.387 2.869-2.649 4.53-3.556 5.228-2.857 1.926 1.925 1.025 3.469-2.725 4.667-5.642 1.803-5.718 2.37-.747 5.513 4.453 2.815 6.412 6.154 4.974 8.48-.466.754-2.203-.313-5.037-3.095-4.287-4.207-4.35-4.23-6.929-2.54-1.431.937-3.104 2.806-3.718 4.152-1.344 2.95-2.378 3.091-3.758.512zm12.482-20.804c.407-.969.964-2.797 1.238-4.062.483-2.235.342-2.284-4.879-1.673-6.494.76-4.849-1.094 1.874-2.11 2.542-.385 4.25-1.177 4.25-1.97 0-2.105-1.148-2.298-6.752-1.138-3.604.746-5.576.764-6.282.058-.707-.707.899-1.614 5.114-2.89 5.505-1.667 6.418-1.707 8.782-.385 1.45.812 2.775 2.425 2.943 3.585.392 2.703-3.475 10.983-5.49 11.756-1.162.446-1.357.16-.798-1.17zm-32.676-9.675c3.387-3.527 6.159-7.127 6.159-8 0-.872.659-1.586 1.464-1.586 1.564 0 3.84 3.362 2.907 4.295-.306.306.835 1.277 2.536 2.157 1.7.88 3.093 2.263 3.093 3.073 0 2.232-2.375 1.769-4.943-.964l-2.29-2.438-6.444 4.938c-3.543 2.716-6.937 4.939-7.542 4.939-.604 0 1.673-2.886 5.06-6.414z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SilverGen;
