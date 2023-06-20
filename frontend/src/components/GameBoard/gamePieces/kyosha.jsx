import React from "react";
import { useState, useRef } from "react";


function Lance({startLeft, startTop, color}) {
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
    console.log((startTop + 25)/52 | 0, (startLeft + 25)/52 | 0, (startTop + top + 25)/52 | 0, (startLeft + left+ 25)/52 | 0);
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
      width="42.172"
      height="50"
      version="1.1"
      className={color === "black" ? "piece black" : "piece white"}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{top: (startTop + top) + "px", left: (startLeft + left) + "px", zIndex: (isClicked.current) ? 5 : 3}}
    >
      <g transform="translate(-690.982 -731.341)">
        <g transform="matrix(.46742 0 0 .46742 368.005 416.128)">
          <path
            fill="#fff"
            fillOpacity="1"
            stroke="none"
            d="M707.864 684.162l-14.9 95.712 86.116.252-14.395-96.217-28.031-8.081z"
          ></path>
          <path
            fill="#cfcfcf"
            d="M690.982 781.091c.693-6.486 14.834-97.943 15.201-98.31.297-.297 7.117-2.31 15.156-4.475l14.617-3.936 14.662 3.948c8.064 2.171 14.962 4.302 15.33 4.735.366.434 3.714 21.488 7.44 46.788 3.724 25.3 7.007 47.238 7.295 48.75l.523 2.75H736.08c-24.819 0-45.113-.112-45.099-.25zm85.932-5c-.022-1.237-3.06-22.269-6.75-46.737l-6.708-44.487-13.75-3.673-13.75-3.672-13.719 3.666-13.718 3.667-6.724 44.493c-3.698 24.471-6.75 45.506-6.781 46.743l-.058 2.25h82l-.042-2.25zm-42.333-5.875c-.344-1.719-.625-4.194-.625-5.5 0-3.065-3.286-3.159-12.095-.345-8.306 2.654-12.997 1.665-14.073-2.966-.271-1.166 1.183-1.38 7.904-1.16l8.236.268-1.512-4.285c-.832-2.358-2.626-6.278-3.986-8.712-3.172-5.674-3.129-6.567.276-5.74 5.882 1.426 15.25.248 15.25-1.92 0-.96-1.061-1.182-3.856-.807-4.108.55-8.512-1.105-7.891-2.966.233-.7 2.524-1.024 6.06-.86 4.842.224 5.687.004 5.687-1.48 0-.96-.708-2.527-1.573-3.483-1.443-1.594-1.401-1.792.5-2.396 3.601-1.143 6.073.3 6.073 3.545 0 3.114.952 3.563 4.042 1.91 2.32-1.242 5.958.662 5.958 3.116 0 1.332-.869 1.53-5 1.132-4.273-.41-5-.227-5 1.264 0 1.566.763 1.674 7.453 1.047l7.452-.699 1.511 3.617c1.401 3.352 1.368 3.85-.449 6.83-1.078 1.769-1.961 4.197-1.963 5.398-.004 2.36 2.69 3.755 5.31 2.75 2.186-.839 7.359 4.294 5.85 5.803-.776.776-3.152.595-8.399-.64-4.024-.948-9.555-1.583-12.29-1.41-4.47.282-5.003.568-5.245 2.814-1.007 9.334-2.445 11.677-3.605 5.875zm-3.75-11.5c1.719-.344 3.125-1.049 3.125-1.567 0-.519-.9-.657-2-.308-2.68.85-6-.293-6-2.067 0-.919 1.055-1.433 2.94-1.433 1.618 0 3.22-.45 3.56-1 .358-.58-.616-1-2.319-1-3.53 0-6.126-2.423-3.625-3.383.884-.34 2.669-.617 3.967-.617 1.297 0 2.637-.45 2.977-1 .714-1.155-.495-1.226-5.842-.343l-3.842.635.75 4.604c.411 2.532.774 5.392.805 6.354.063 1.912.808 2.064 5.504 1.125zm18.646-3.625c.308-1.237.654-4.275.77-6.75.188-4.05-.03-4.533-2.172-4.837-3.28-.463-9.12.726-9.12 1.857 0 .512 1.35.66 2.998.33 3.186-.637 6.003.899 6.003 3.273 0 .986-1.42 1.377-5 1.377-2.811 0-5 .458-5 1.045 0 .654 1.315.799 3.51.387 3.725-.699 6.49.68 6.49 3.236 0 1.078-.829 1.267-3.418.782-1.88-.353-4.242-.162-5.25.424-1.453.845-.646 1.072 3.899 1.096 5.123.027 5.79-.209 6.29-2.22zm-7.521-30.762c0-.607-1.498-.775-3.75-.42-2.063.325-4.988.117-6.5-.464-1.733-.664-2.75-.693-2.75-.08 0 .537-.658.976-1.462.976-.882 0-1.891-1.684-2.546-4.25-1.958-7.666-3.144-9.906-4.885-9.231-3.31 1.284-10.107 2.193-10.107 1.352 0-.479.503-.87 1.119-.87s3.766-1.608 7-3.573c3.905-2.372 5.88-4.22 5.88-5.5 0-2.2 1.055-2.474 2.8-.728 1.827 1.826 1.438 4.52-.886 6.148-1.968 1.379-1.982 1.496-.245 2.047 1.013.321 3.865.188 6.337-.296 2.472-.484 3.82-.943 2.995-1.02-.825-.078-2.309-1.253-3.297-2.61-1.751-2.406-1.745-2.469.25-2.469 1.495 0 2.047-.648 2.047-2.405 0-2.213-.307-2.363-3.856-1.887-3.858.517-8.144-.927-8.144-2.743 0-.53 1.988-.965 4.418-.965 4.816 0 7.582-.746 7.582-2.044 0-.457-1.575-.575-3.5-.262-1.925.312-3.5.357-3.5.1 0-.258 1.808-2.37 4.018-4.693 3-3.152 4.521-4.064 6-3.595 2.95.936 2.31 6.494-.748 6.494-1.25 0-1.292.27-.239 1.538.966 1.164 2.337 1.38 5.632.885 2.872-.43 4.863-.231 5.846.585 2.559 2.123 1.67 2.877-3.76 3.19-5.086.293-5.25.395-5.298 3.302-.027 1.65-.395 4.013-.818 5.25-.704 2.062-.464 2.25 2.865 2.25 5.84 0 7.502 1.415 7.502 6.386 0 6.059-1.759 10.614-4.098 10.614-1.046 0-1.902-.455-1.902-1.012zm1.468-7.668c.363-1.938.427-3.758.141-4.044-.805-.805-15.61.793-15.61 1.684 0 .435.258 2.084.573 3.665.572 2.872.581 2.875 7.404 2.547l6.83-.328.662-3.524zm-13.218 1.018c-2.364-.954-1.24-1.962 3.556-3.192 5.067-1.298 8.194-.785 8.194 1.344 0 2.06-8.078 3.33-11.75 1.848zm18.057-9.23c-4.593-3.327-8.895-8.412-7.508-8.874.519-.173 3.093.829 5.72 2.226 2.629 1.397 5.317 2.54 5.975 2.54 1.978 0 4.603 3.583 3.923 5.356-.93 2.424-3.61 2.011-8.11-1.248z"
          ></path>
          <path
            fill="#b0b0b0"
            d="M691.517 778.591c.281-1.512 3.617-23.61 7.412-49.104 3.796-25.494 7.042-46.49 7.214-46.658.172-.167 6.94-2.095 15.04-4.285l14.726-3.98 14.727 3.925c8.1 2.16 14.926 4.125 15.17 4.369.244.244 3.51 21.04 7.257 46.213 3.748 25.174 7.077 47.233 7.399 49.02l.584 3.25h-90.04l.51-2.75zm83.881-15c-1.224-8.112-4.367-29.17-6.984-46.795l-4.758-32.045-14.1-3.684-14.1-3.684-13.5 3.73c-11.198 3.092-13.553 4.07-13.809 5.728-.17 1.1-3.344 22.138-7.054 46.75l-6.746 44.75h83.277l-2.226-14.75zm-41.005 3.898c-.792-6.996.18-6.766-12.75-3.024-6.994 2.024-9.556 1.864-12.181-.76-3.225-3.226-1.8-3.863 8.749-3.909 10.624-.046 15.745-.831 15.745-2.414 0-.506-1.653-1.06-3.673-1.23-4.903-.415-5.73-2.81-.97-2.81 1.939 0 3.803-.45 4.143-1 .366-.593-.782-1-2.819-1-1.89 0-3.986-.663-4.658-1.473-1.033-1.245-.585-1.574 2.9-2.132 2.266-.362 4.363-1.05 4.658-1.527.624-1.01-1.599-1.092-6.7-.248l-3.62.598.918 4.082c.504 2.245.783 5.233.619 6.64-.243 2.088-1.024 1.087-4.245-5.44-4.573-9.272-4.753-10.118-2.053-9.665 2.813.473 11.656.188 13.75-.443.962-.29 1.75-1.193 1.75-2.006 0-1.153-.785-1.33-3.58-.806-3.519.66-8.42-.94-8.42-2.75 0-.457 2.7-.83 6-.83 6.388 0 7.22-.853 4.957-5.081-.799-1.492-.7-2.082.422-2.512 2.468-.947 5.62 1.43 5.62 4.239 0 2.413.227 2.533 3.577 1.905 2.232-.419 4.11-.227 5 .511 2.525 2.096 1.532 2.937-3.47 2.937-3.379 0-5.067.454-5.456 1.468-.88 2.294.59 2.566 7.391 1.368 6.016-1.06 6.403-1.006 8.138 1.137 2.19 2.706 2.287 4.766.402 8.623-.78 1.597-1.568 4.03-1.75 5.404-.306 2.306.016 2.525 4.15 2.819 5.056.36 7.019 1.563 7.019 4.304 0 2.252-.862 2.293-8 .377-3.025-.812-8.255-1.481-11.623-1.488l-6.123-.012-.486 5.059c-.751 7.822-2.504 8.395-3.331 1.09zm15.254-10.546c.105-.083.33-3.065.5-6.626l.309-6.476-2.908-.332c-3.982-.454-9.592.695-9.592 1.965 0 .66 1.444.799 3.924.38 3.302-.558 4.096-.344 5 1.346 1.553 2.901 1.345 3.445-1.073 2.812-2.747-.718-7.851.284-7.851 1.542 0 .562 1.593.694 3.828.316 2.86-.483 4.162-.246 5.143.936 1.782 2.147.79 2.856-4.135 2.953-2.288.045-4.325.57-4.527 1.167-.246.73 1.522.935 5.413.626 3.178-.253 5.864-.527 5.969-.61zm-7.26-32.712c-.4-.649-2.082-.884-4.043-.565-1.846.3-4.669.168-6.272-.291-1.907-.547-3.309-.441-4.057.307-1.532 1.532-2.692-.408-3.512-5.871-.952-6.353-2.309-7.695-6.54-6.476-7.106 2.047-7.486.999-1.003-2.766 4.478-2.6 6.595-4.464 6.815-6 .36-2.501 1.213-2.796 2.98-1.028 1.849 1.848 1.429 4.527-.972 6.209-1.911 1.338-1.972 1.598-.508 2.16.916.352 4.518.142 8.005-.465 12.907-2.248 15.254-.996 14.361 7.657-.7 6.777-3.294 10.298-5.253 7.129zm1.138-7.406c.346-1.845.381-3.755.079-4.244-.49-.792-14.543.402-15.518 1.319-.204.191-.093 1.831.246 3.644l.616 3.297 6.974-.33 6.974-.332.629-3.354zm-13.32.854c-.687-.278-1.25-.992-1.25-1.588 0-.596.277-.807.614-.47.337.337 2.327-.072 4.422-.91 3.063-1.226 4.25-1.288 6.067-.315 2.177 1.165 2.191 1.257.387 2.577-1.814 1.326-7.697 1.732-10.24.706zm17.46-9.833c-4.148-3.168-7.462-7.194-6.54-7.946.182-.149 3.625 1.24 7.65 3.087 6.239 2.86 7.272 3.687 7 5.595-.487 3.416-2.966 3.191-8.11-.736zm-15.785-2.13l-2.424-2.623 2.25.691c1.992.613 2.25.343 2.25-2.356 0-3.012-.052-3.042-4.253-2.466-3.505.48-4.587.214-6.155-1.519l-1.902-2.102h6.155c5.01 0 6.155-.301 6.155-1.622 0-1.325.274-1.395 1.49-.385 1.004.832 2.986 1.013 6.063.551 3.011-.451 5.062-.278 6.01.508 2.6 2.159 1.513 2.948-4.063 2.948h-5.5v4.3c0 3.848-1.288 6.7-3.026 6.7-.344 0-1.717-1.18-3.05-2.624zm-4.107-12.89c-.342-.343 1.38-2.468 3.825-4.723 4.068-3.75 4.584-3.964 6.04-2.508 2.876 2.875.424 5.426-7.006 7.291-1.23.309-2.517.281-2.859-.06z"
          ></path>
          <path
            fill="#8f8f8f"
            d="M691.621 779.091c.213-1.237 3.533-23.37 7.377-49.182 3.844-25.813 7.101-47.045 7.238-47.182.138-.137 6.88-1.968 14.985-4.068l14.735-3.818 14.735 3.818c8.104 2.1 14.882 3.966 15.063 4.147.18.18 3.433 21.187 7.228 46.681 3.796 25.495 7.131 47.592 7.413 49.104l.51 2.75h-89.672l.388-2.25zm85.924-2.5c-.314-1.512-3.538-22.775-7.166-47.25-3.628-24.475-6.67-44.565-6.76-44.645-.09-.08-6.343-1.78-13.895-3.777l-13.732-3.632-14.018 3.69c-8.074 2.125-14.018 4.193-14.018 4.876 0 1.448-12.798 86.879-13.593 90.738l-.566 2.75h84.318l-.57-2.75zm-43.135-9.773l-.69-5.523-3.632.649c-1.998.357-5.432 1.26-7.632 2.009-5.685 1.932-10.859 1.754-12.845-.44-2.593-2.865-2.054-3.263 4.095-3.03 8.845.337 20.25-1.198 20.25-2.725 0-.757-1.464-1.425-3.521-1.606-3.936-.347-4.811-2.147-1.269-2.61 4.672-.61 5.284-1.566 1.368-2.133-5.403-.782-5.772-2.853-.654-3.672 2.242-.358 4.076-1.21 4.076-1.895 0-.935-1.14-1.03-4.611-.381-2.536.474-5.088.567-5.67.207-.671-.415-.813-.015-.388 1.094.37.962.966 4.256 1.326 7.32.481 4.095.349 5.38-.501 4.856-.636-.393-1.158-1.25-1.16-1.906-.001-.655-1.498-4.16-3.325-7.787l-3.322-6.596 7.836-.102c8.48-.11 9.815-.5 9.815-2.876 0-1.224-.72-1.417-3.396-.915-3.371.632-8.604-.934-8.604-2.575 0-.462 2.7-.84 6-.84 6.406 0 7.221-.849 4.928-5.134-.984-1.839-.8-1.977 2.25-1.685 2.816.27 3.371.753 3.648 3.166.306 2.674.538 2.807 3.825 2.19 2.16-.404 4.046-.203 4.925.526 2.587 2.148 1.491 2.937-4.076 2.937-4.834 0-5.5.243-5.5 2 0 2.329.692 2.397 8.487.831 5.553-1.115 5.906-1.064 7.667 1.11 2.211 2.732 2.345 5.35.427 8.344-.78 1.218-1.568 3.565-1.75 5.215-.32 2.898-.178 3.011 4.15 3.319 5.056.36 7.019 1.563 7.019 4.304 0 2.246-.033 2.247-7 .377-3.025-.812-8.538-1.481-12.25-1.488l-6.75-.012-.014 3.25c-.017 4.098-.974 7.75-2.03 7.75-.447 0-1.123-2.485-1.502-5.523zm15.294-9.947c.136-.106.36-3.08.5-6.61l.252-6.42-3.905-.32c-4.764-.39-8.595.48-8.595 1.95 0 .701 1.22.864 3.401.455 2.448-.46 3.853-.188 5.01.969 2.01 2.01 1.077 3.736-1.568 2.897-2.517-.8-6.843.248-6.843 1.656 0 .69 1.393.834 3.924.406 3.334-.563 4.092-.35 5.036 1.412 1.24 2.317 1.218 2.327-4.71 2.092-3.283-.13-4.25.193-4.25 1.416 0 1.337.897 1.484 5.75.937 3.162-.356 5.861-.734 5.998-.84zm-7.298-32.473c-.523-.518-3.319-1.08-6.213-1.25-7.396-.431-7.044-2.245.506-2.604 5.62-.268 6.302-.535 6.838-2.671 1.013-4.035.114-6.05-2.612-5.854-1.358.097-4.857.322-7.776.5l-5.307.322.307 5.401c.425 7.481-1.653 7.872-3.277.616-1.811-8.095-2.659-8.96-7.476-7.622-6.675 1.853-7.182 1.202-1.501-1.929 6.96-3.836 9.07-5.778 8.342-7.676-.49-1.274-.234-1.335 1.567-.371 2.917 1.56 2.743 4.855-.33 6.255-2.217 1.01-2.308 1.26-.852 2.324 1.267.927 2.989.9 7.732-.118 8.458-1.816 12-1.702 13.947.449 2.04 2.255 2.126 7.107.206 11.703-1.492 3.57-2.452 4.162-4.101 2.525zm-11.372-6.987c-1.08-.684-.482-1.292 2.493-2.535 3.107-1.298 4.428-1.4 6.411-.497 2.424 1.104 2.44 1.18.567 2.55-2.17 1.586-7.313 1.848-9.47.482zm17.422-9.12c-3.93-2.97-7.434-6.783-7.478-8.138-.012-.378 3.24.824 7.228 2.67 5.946 2.755 7.25 3.776 7.25 5.675 0 3.333-2.41 3.262-7-.207zm-15.845-1.779c-2.059-2.274-2.12-3.287-.155-2.532 1.136.435 1.5-.182 1.5-2.544 0-3.078-.053-3.11-3.995-2.48-2.592.415-4.523.2-5.5-.61-2.67-2.217-1.623-3.005 3.995-3.005 4.406 0 5.5-.322 5.5-1.622 0-1.332.27-1.399 1.505-.373.968.803 2.905 1.025 5.42.623 4.523-.723 7.075-.009 7.075 1.98 0 1.004-1.393 1.392-5 1.392h-5v4.3c0 3.865-1.289 6.7-3.045 6.7-.355 0-1.39-.823-2.3-1.829zm-4.112-14.1c-.635-1.03 6.273-7.07 8.085-7.07 2.067 0 2.887 2.922 1.259 4.489-1.746 1.68-8.712 3.603-9.344 2.58z"
          ></path>
          <path
            fill="#707070"
            d="M691.956 779.425c0-1.906 14.024-96.49 14.336-96.687 1.05-.662 28.06-7.397 29.664-7.397 1.725 0 28.828 6.804 29.734 7.465.13.094 3.38 21.29 7.224 47.103 3.844 25.813 7.163 47.945 7.377 49.182l.387 2.25h-44.36c-43.045 0-44.362-.057-44.362-1.916zm85.528-3.334c-.31-1.787-3.492-23.024-7.072-47.193-3.58-24.169-6.61-44.042-6.733-44.162-.123-.12-6.404-1.883-13.958-3.916l-13.734-3.698-14.016 3.75c-7.708 2.063-14.015 4.097-14.015 4.522 0 .856-12.628 85.533-13.526 90.697l-.565 3.25H778.046l-.562-3.25zm-42.985-9.25l-.687-5.5-4.178.632c-2.298.348-5.696 1.248-7.55 2-4.817 1.954-10.477 1.745-12.473-.46-2.53-2.796-2.009-3.493 2.095-2.8 5.318.897 22.25-1.451 22.25-3.087 0-.798-1.305-1.285-3.441-1.285-1.893 0-3.69-.403-3.994-.895-.675-1.091 1.742-2.105 5.017-2.105 1.33 0 2.418-.562 2.418-1.25 0-.772-1.397-1.25-3.656-1.25-5.188 0-5.498-2.292-.42-3.104 2.502-.4 4.076-1.189 4.076-2.043 0-.94-.73-1.212-2.25-.84-1.238.304-3.732.65-5.543.77-2.747.181-3.211.55-2.798 2.217 1.465 5.914 1.779 10.5.719 10.5-.62 0-1.128-.642-1.128-1.427s-1.557-4.414-3.459-8.063l-3.459-6.636 3.71.238c2.039.131 6.07.16 8.958.063 4.633-.154 5.25-.425 5.25-2.303 0-1.912-.394-2.065-3.896-1.505-3.07.492-4.393.194-6.25-1.404l-2.354-2.028 3.5.178c7.64.389 9 .024 9-2.413 0-1.265-.563-2.872-1.25-3.571-1.008-1.025-.572-1.21 2.25-.95 3.011.276 3.545.718 3.826 3.168.306 2.674.538 2.807 3.825 2.19 2.16-.404 4.046-.203 4.925.526 2.587 2.148 1.491 2.937-4.076 2.937-4.95 0-5.5.214-5.5 2.136 0 1.99.325 2.083 4.75 1.364 9.135-1.485 10.57-1.261 12.093 1.887 1.206 2.492 1.194 3.312-.09 6.004-.817 1.714-1.807 4.578-2.2 6.363l-.712 3.246h5.044c4.107 0 5.254.392 6.172 2.107 1.765 3.298-.084 4.092-5.617 2.413-2.717-.824-8.203-1.503-12.19-1.509-6.968-.01-7.25.082-7.25 2.364 0 3.644-1.16 8.625-2.01 8.625-.418 0-1.069-2.475-1.447-5.5zm15.015-9.846c1.235-3.273 2.004-11.427 1.174-12.449-1.458-1.794-11.906-1.213-12.537.698-.36 1.09.311 1.277 3.006.84 3.76-.61 5.452 0 5.969 2.152.239.997-.883 1.407-4.082 1.49-2.742.072-4.586.63-4.87 1.473-.359 1.066.413 1.211 3.587.675 3.463-.585 4.203-.385 5.155 1.392 1.055 1.972.861 2.075-3.925 2.075-3.969 0-5.035.342-5.035 1.615 0 1.383.83 1.513 5.75.904 3.162-.392 5.776-.78 5.808-.865zm-6.558-32.523c0-.572-2.799-1.169-6.25-1.333-8.09-.386-8.096-2.21-.007-2.595 5.62-.268 6.302-.535 6.838-2.671.973-3.877.122-6.04-2.345-5.96l-8.087.25-5.85.178.825 5.225c.488 3.084.447 5.604-.101 6.152-.975.975-1.69-.47-4.151-8.377-1.512-4.858-1.75-4.948-9.372-3.564l-4 .726 2.974-1.638c9.88-5.44 11.677-6.965 10.826-9.183-.687-1.791.203-1.695 2.128.23 2.27 2.27 1.935 4.306-.924 5.61-2.3 1.048-2.36 1.232-.75 2.36 1.389.972 3.414.904 9.906-.333 7.566-1.442 8.35-1.432 10.75.141 2.916 1.911 3.335 5.689 1.283 11.576-1.125 3.228-3.693 5.458-3.693 3.206zm-11.966-7.089c-1.167-.738-.861-1.163 1.5-2.084 3.764-1.468 7.307-1.517 8.704-.12 2.185 2.185-7.072 4.185-10.204 2.204zm19.45-7.889c-3.888-2.37-9.747-8.224-8.99-8.98.322-.322 2.03.15 3.795 1.047 1.766.898 4.921 2.403 7.012 3.345 2.842 1.28 3.726 2.225 3.5 3.745-.413 2.79-1.772 3.005-5.317.843zm-17.984-3.153c-1.628-1.798-1.644-2-.155-2 1.185 0 1.655-.883 1.655-3.111 0-3.012-.112-3.09-3.486-2.457-3.504.657-7.514-.66-7.514-2.467 0-.53 2.475-.965 5.5-.965 4.45 0 5.5-.315 5.5-1.655 0-1.53.14-1.528 1.86.029 1.514 1.37 2.39 1.481 4.71.6 3.454-1.314 7.43-.486 7.43 1.545 0 1.11-1.251 1.481-5 1.481h-5v4.3c0 3.865-1.289 6.7-3.045 6.7-.355 0-1.46-.9-2.455-2zm-1.125-17.374c4.194-3.923 6.342-4.526 7.293-2.048.904 2.355-1.619 4.247-6.668 5.001l-4.5.672 3.875-3.625z"
          ></path>
          <path
            fill="#4e4e4e"
            d="M691.956 779.869c0-2.276 14.085-95.857 14.538-96.59.22-.355 6.939-2.357 14.93-4.447l14.532-3.8 14.75 3.816c8.112 2.099 14.822 3.856 14.91 3.904.318.177 14.34 94.604 14.34 96.571 0 1.994-.535 2.018-44 2.018-38.081 0-44-.198-44-1.472zm85.573-4.278c-.332-2.062-3.502-23.286-7.045-47.164s-6.87-43.678-7.392-44c-.523-.322-6.955-2.115-14.294-3.984l-13.342-3.399-13.463 3.695c-7.405 2.032-13.58 3.812-13.723 3.955-.236.235-14.314 92.779-14.314 94.09 0 .307 18.94.557 42.088.557h42.088l-.603-3.75zm-42.99-9.33l-.673-5.08-4.192.708c-2.306.39-5.942 1.325-8.08 2.08-5.4 1.905-10.005 1.73-11.983-.457-2.583-2.854-1.995-3.48 2.58-2.75 5.722.916 21.765-1.379 21.765-3.112 0-.825-1.273-1.309-3.441-1.309-4.964 0-5.392-1.843-.606-2.608 2.555-.409 4.047-1.178 4.047-2.087 0-.985-.632-1.239-2-.805-2.264.719-6-.203-6-1.48 0-.464 1.8-1.148 4-1.52 2.383-.402 4-1.227 4-2.04 0-1.056-1.191-1.231-5.25-.773-2.888.327-5.413.731-5.613.9-.2.168.18 2.567.843 5.33 1.934 8.064.772 7.792-3.645-.851-3.941-7.716-4.025-8.066-1.928-8.066 1.206 0 2.682.49 3.28 1.087.783.783 1.275.783 1.759 0 .37-.598 2.895-1.087 5.613-1.087 4.274 0 4.94-.27 4.94-2 0-1.727-.666-2-4.877-2-3.332 0-5.312-.527-6.25-1.663-1.251-1.517-1.02-1.608 2.628-1.029 5.577.886 8.5-.05 8.5-2.724 0-1.201-.563-2.756-1.25-3.455-1.008-1.025-.572-1.21 2.25-.95 3.14.288 3.503.629 3.536 3.321.02 1.65.365 2.922.767 2.826 5.45-1.3 6.959-1.353 8.238-.292 2.623 2.177 1.548 2.966-4.041 2.966-4.953 0-5.5.213-5.5 2.14 0 1.975.362 2.09 4.75 1.493 2.612-.355 5.952-.913 7.422-1.24 2.268-.506 2.922-.112 4.328 2.608 1.573 3.041 1.551 3.452-.421 8.037-3.148 7.316-2.914 7.962 2.886 7.962 3.958 0 5.184.41 6.046 2.02 1.744 3.26.349 3.895-5.264 2.4-2.886-.768-8.452-1.401-12.368-1.408l-7.122-.012-.663 5c-.365 2.75-1.04 5-1.5 5-.46 0-1.14-2.286-1.51-5.08zm13.013-8.51c1.637-.44 2.326-1.808 3.14-6.236.728-3.956.726-6.066-.006-6.969-1.455-1.794-11.905-1.213-12.536.698-.36 1.092.316 1.276 3.053.832 3.288-.534 5.752.522 5.752 2.465 0 .44-2.025.8-4.5.8-3.493 0-4.5.365-4.5 1.631 0 1.305.699 1.517 3.493 1.064 2.513-.408 3.968-.094 5.187 1.12 1.59 1.582 1.376 1.704-3.493 1.987-3.721.217-5.187.712-5.187 1.75 0 1.51 5.376 1.991 9.597.858zm-4.596-33.41c0-.554-2.647-1-5.941-1-7.79 0-8.677-1.674-1.323-2.499 8.222-.921 8.264-.95 8.264-5.605v-4.168l-4.64.636c-2.552.35-6.407.636-8.567.636-3.269 0-3.842.294-3.418 1.75.98 3.356 1.025 8.754.078 9.23-.524.264-1.628-1.986-2.453-5-2.112-7.714-2.611-8.275-6.686-7.511-1.9.357-4.212.894-5.135 1.194-.924.3 1.358-1.326 5.07-3.614 3.713-2.288 6.75-4.81 6.75-5.604 0-1.936 1.634-1.842 2.394.137 1.01 2.63.72 3.295-2.07 4.757-2.54 1.331-2.578 1.454-.731 2.443 1.394.746 4.278.61 10.188-.478 7.625-1.405 8.437-1.391 10.847.187 2.42 1.586 2.556 2.067 1.931 6.781-.37 2.79-1.113 5.896-1.65 6.901-1.046 1.953-2.908 2.483-2.908.827zm-11.5-6.96c-1.859-.762-1.8-.898.815-1.93 3.978-1.569 8.685-1.42 8.685.274 0 2.281-5.595 3.256-9.5 1.656zm19-7.921c-3.344-2.088-10.347-9.119-9.084-9.119.444 0 3.926 1.445 7.738 3.21 5.484 2.542 6.869 3.62 6.638 5.173-.406 2.725-1.797 2.918-5.292.736zm-17.628-2.781c-1.07-1.297-1.097-1.756-.122-2.084.687-.231 1.25-1.783 1.25-3.448 0-2.917-.128-3.004-3.486-2.374-3.504.657-7.514-.66-7.514-2.467 0-.53 2.475-.965 5.5-.965 4.45 0 5.5-.315 5.5-1.655 0-1.495.19-1.483 1.974.132 1.693 1.532 2.396 1.612 4.927.564 3.37-1.395 7.099-.594 7.099 1.527 0 1.052-1.327 1.432-5 1.432h-5v3.566c0 3.711-1.459 7.434-2.913 7.434-.463 0-1.46-.748-2.215-1.662zm-1.304-17.838c3.715-3.503 5.821-4.297 6.876-2.59 1.584 2.563-3.434 6.09-8.665 6.09-1.555 0-1.213-.668 1.79-3.5z"
          ></path>
          <path
            fill="#2f2f2f"
            d="M691.956 780.327c0-1.527 14-95.33 14.4-96.489.191-.552 6.94-2.75 14.997-4.884l14.65-3.881 14.226 3.763c7.825 2.07 14.534 4.043 14.91 4.385.619.562 14.817 93.173 14.817 96.648 0 1.274-5.92 1.472-44 1.472-29.08 0-44-.344-44-1.014zm85.979-2.236c-.05-2.962-13.8-92.903-14.275-93.38-.805-.804-25.478-7.37-27.697-7.37-2.023 0-26.968 6.628-27.7 7.36-.376.376-14.307 91.669-14.307 93.756 0 .498 18.352.884 42 .884 32.944 0 41.995-.27 41.979-1.25zm-42.995-10.5c-.023-5.676-.995-6.59-6.11-5.747-2.406.397-5.892 1.346-7.746 2.109-5.718 2.354-10.373 1.668-12.23-1.802-.987-1.845-.791-1.916 3.495-1.274 6.045.907 21.607-1.396 21.607-3.197 0-.86-1.233-1.339-3.441-1.339-4.92 0-5.303-1.698-.563-2.5 2.58-.435 4.004-1.206 4.004-2.167 0-1.119-.71-1.336-2.84-.868-1.873.411-3.242.142-4.015-.79-.97-1.168-.474-1.527 2.84-2.057 2.648-.423 4.015-1.16 4.015-2.164 0-1.255-.922-1.405-5.25-.853-2.888.369-5.402.798-5.588.955-.185.157.192 2.832.838 5.944.646 3.112.968 5.865.716 6.117-.252.252-2.1-3-4.108-7.226-2.007-4.226-3.416-7.916-3.133-8.2.284-.284 1.572-.035 2.863.553 1.418.647 2.903.717 3.754.178.774-.49 3.32-.898 5.658-.907 3.578-.012 4.25-.331 4.25-2.015 0-1.727-.667-2-4.878-2-3.284 0-5.318-.531-6.227-1.626-1.222-1.473-.955-1.56 2.835-.92 5.516.932 8.27-.007 8.27-2.821 0-1.228-.54-2.773-1.2-3.433-.934-.933-.656-1.196 1.25-1.185 3.834.024 5.154 1.324 4.4 4.33-.73 2.909.335 3.375 3.653 1.6 2.397-1.283 5.493-.44 6.322 1.722.494 1.286.081 1.486-2.157 1.045-4.544-.896-8.268.244-8.268 2.532 0 1.814.464 1.953 4.75 1.425 2.612-.322 5.971-.879 7.464-1.237 2.387-.573 2.917-.224 4.405 2.896 1.55 3.25 1.56 3.75.11 5.964-.871 1.329-1.892 4.057-2.268 6.062l-.684 3.646h4.457c3.047 0 4.98.578 6.11 1.829 2.45 2.707 2.034 3.452-1.594 2.858-12.215-2-19.873-2.854-21.166-2.358-.919.353-1.763 2.538-2.172 5.624-.781 5.888-2.405 6.755-2.428 1.297zm15.812-15.43c1.475-7.933.78-8.82-6.919-8.82-4.453 0-5.877.35-5.877 1.443 0 .977 1.346 1.541 4.172 1.75 5.966.44 6.313 2.807.411 2.807-3.57 0-4.583.36-4.583 1.631 0 1.294.697 1.518 3.382 1.082 3.154-.512 5.618.579 5.618 2.487 0 .44-2.025.8-4.5.8-3.334 0-4.5.389-4.5 1.5 0 1.162 1.313 1.5 5.823 1.5h5.824l1.15-6.18zm-7.796-27.851c0-.533-2.363-.976-5.25-.984-8.449-.025-9.025-1.654-.875-2.472l7.125-.716V711.07l-4.64.636c-2.552.35-6.344.636-8.428.636H727.1l.568 5.5c.74 7.17-1.009 7.222-2.608.077-1.496-6.688-2.81-7.883-7.778-7.07l-3.826.626 5.385-3.227c2.963-1.775 5.605-4.065 5.873-5.088.38-1.454.787-1.61 1.864-.716 1.493 1.239 1.881 3.898.569 3.898-.445 0-1.651.616-2.68 1.369-1.813 1.325-1.806 1.403.231 2.493 1.601.857 3.872.76 9.514-.407 8.309-1.718 12.123-.985 13.244 2.546.901 2.84-1.305 11.71-3.082 12.392-.78.3-1.418.109-1.418-.424zm-11.434-6.867c-2.575-1.008-.898-1.958 4.85-2.746 3.7-.507 4.584-.336 4.584.883 0 .892-1.28 1.767-3.125 2.136-3.641.728-3.766.723-6.309-.273zm14.254-12.064c-2.926-2.729-4.87-4.949-4.32-4.933 2.597.073 14.033 6.576 14.323 8.145.666 3.606-4.458 1.96-10.003-3.212zm-12.777 1.043c-.601-1.123-.646-2.057-.11-2.25.506-.182 1.243-1.636 1.64-3.232l.72-2.901-4.342.582c-4.321.58-7.951-.477-7.951-2.315 0-.53 2.686-.965 5.968-.965 5.261 0 5.893-.207 5.33-1.75-.584-1.604-.462-1.596 1.47.098 1.798 1.578 2.605 1.684 5.516.723 3.845-1.269 6.716-.58 6.716 1.613 0 1.028-.977 1.416-3.25 1.291-6.487-.355-6.75-.215-6.75 3.59 0 3.8-1.467 7.435-3 7.435-.512 0-1.392-.864-1.957-1.92zm-1.343-17.58c1.925-1.926 4.082-3.5 4.793-3.5 1.58 0 2.57 2.278 1.644 3.777-.823 1.331-5.578 3.222-8.102 3.222-1.463 0-1.125-.71 1.665-3.5z"
          ></path>
          <path
            fill="#030303"
            d="M692.507 776.591a46410.1 46410.1 0 007.283-48.664l6.708-44.915 14.479-3.862 14.479-3.863 14.871 3.777c8.18 2.077 15.029 4.227 15.221 4.777.31.886 14.408 94.85 14.408 96.029 0 .259-19.806.471-44.012.471h-44.012l.575-3.75zm85.449 1.313c0-3.238-13.137-90.217-13.905-92.063-.656-1.575-3.726-2.739-14.464-5.48l-13.631-3.48-13.632 3.48c-10.783 2.753-13.798 3.898-14.431 5.48-.732 1.83-13.967 89.376-13.946 92.25.007.98 9.08 1.25 42.009 1.25 35.847 0 42-.21 42-1.437zm-43-12.063c0-4.242-.158-4.5-2.75-4.503-1.513-.002-5.982.955-9.932 2.125-7.827 2.32-11.643 2.008-13.3-1.088-.98-1.832-.76-1.909 3.909-1.356 2.722.322 8.576.022 13.01-.668 6.512-1.013 8.063-1.589 8.063-2.993 0-1.3-.61-1.623-2.411-1.279-1.326.254-3.178.032-4.115-.492-1.366-.765-.887-1.084 2.411-1.612 2.79-.446 4.115-1.162 4.115-2.225 0-1.202-.663-1.422-2.84-.944-1.947.428-3.245.138-4.123-.92-1.099-1.324-.919-1.545 1.259-1.545 3.646 0 5.704-.985 5.704-2.732 0-1.167-.723-1.373-3.125-.893-1.719.344-4.253.625-5.631.625-2.716 0-2.66-.75-.752 10 .464 2.617-.382 1.481-3.352-4.5-2.185-4.4-3.79-8.183-3.566-8.407.223-.224 1.392.033 2.597.57 1.349.602 4.294.648 7.668.119 6.337-.994 7.16-1.378 7.16-3.34 0-1.056-1.288-1.442-4.808-1.442-2.645 0-5.644-.61-6.664-1.356-1.628-1.19-1.07-1.343 4.56-1.25 5.817.096 6.402-.08 6.298-1.894-.063-1.1-.449-2.787-.857-3.75-.563-1.328-.264-1.75 1.242-1.75 2.685 0 4.27 2.131 3.571 4.802-.654 2.5 1.37 2.959 4.846 1.098 1.683-.901 2.443-.707 4.185 1.07l2.128 2.17-3.663-.665c-4.753-.863-7.837.158-7.837 2.593 0 2.179 3.636 2.55 10.148 1.036 4.277-.993 5.373-.493 6.729 3.073.784 2.063.58 3.465-.937 6.441-1.067 2.093-1.94 4.835-1.94 6.094 0 2.033.484 2.288 4.345 2.288 2.94 0 4.88.592 6 1.829 3.322 3.67 1.737 3.86-10.345 1.236-2.475-.538-6.622-.997-9.216-1.021l-4.715-.044-.664 5c-.825 6.224-2.405 6.552-2.405.5zm15.964-14.215c1.066-6.121 1.009-6.834-.648-8.07-1.138-.851-3.123-1.148-5.316-.797-1.925.308-4.288.565-5.25.571-1.028.006-1.75.77-1.75 1.847 0 1.501.758 1.821 4.148 1.75 2.489-.051 4.323.414 4.584 1.164.306.882-.917 1.25-4.149 1.25-3.832 0-4.583.31-4.583 1.895 0 1.64.458 1.791 3.423 1.123 2.137-.482 3.827-.368 4.5.305 1.727 1.728 1.25 2.768-1.173 2.56-4.527-.39-6.75.143-6.75 1.617 0 1.164 1.322 1.5 5.897 1.5h5.897l1.17-6.715zm-7.964-27.952c0-.458-2.216-.68-4.925-.491-2.71.187-5.747-.136-6.75-.72-1.85-1.076-1.432-1.145 9.675-1.592 2.164-.087 2.577-.673 3.074-4.365.315-2.345.226-4.48-.2-4.742-.425-.263-4.357-.18-8.737.186l-7.965.664.554 5.364c.671 6.505-1.207 7.432-2.257 1.113-.388-2.337-1.335-5.479-2.103-6.981-1.373-2.682-1.353-2.714 1.07-1.793 1.614.614 4.99.514 9.765-.288 9.037-1.517 11.623-1.167 12.953 1.75 1.223 2.686-.896 11.643-2.915 12.316-.682.227-1.239.038-1.239-.42zm-10.013-6.4l-2.487-.652 2.934-1.186c3.369-1.36 6.739-1.113 7.28.535.456 1.385-4.333 2.192-7.727 1.302zm-14.12-8.954c2.95-1.734 5.593-4.023 5.871-5.087.397-1.516.804-1.687 1.884-.79.758.628 1.378 1.532 1.378 2.008 0 1.406-7.269 5.576-11.027 6.327-3.237.647-3.108.48 1.893-2.458zm29.533-.812c-4.087-2.969-6.96-5.968-6.293-6.57.953-.858 13.407 6.118 13.707 7.68.511 2.651-2.95 2.133-7.414-1.11zm-15.113-1.078c-.96-1.538-.91-2.02.26-2.469.799-.306 1.453-1.755 1.453-3.219 0-2.56-.17-2.642-4.481-2.156-2.931.33-4.843.07-5.525-.752-.807-.972.208-1.413 4.495-1.948 3.046-.38 5.28-1.109 4.965-1.619-.315-.509-.096-.926.487-.926.582 0 1.059.45 1.059 1 0 1.305 3.601 1.284 6.066-.035 1.342-.719 2.545-.708 3.934.035 3.217 1.722 2.386 3.163-1.413 2.45-5.103-.957-7.4.08-6.826 3.08.47 2.456-1.406 8.47-2.642 8.47-.351 0-1.175-.86-1.832-1.91zm-1.745-17.392c3.262-3.918 6.458-4.818 6.458-1.82 0 2.422-1.66 3.712-5.958 4.633l-3.458.74 2.958-3.553z"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default Lance;