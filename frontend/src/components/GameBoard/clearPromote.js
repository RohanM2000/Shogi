export default function clearPromote() {
    const foregroundDiv = document.querySelector("div.foreground-promote");
    const backgroundDiv = document.querySelector("div.background-promote");
    if (backgroundDiv) backgroundDiv.remove();
    if (foregroundDiv) foregroundDiv.remove();
};