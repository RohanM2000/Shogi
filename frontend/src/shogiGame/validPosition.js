export default function validPosition (pos) {
    if (pos[0] >= 0 && pos[0] <= 8 && pos[1] >= 0 && pos[1] <=8) return true;
    return false;
};