export default class Key {
    static isControl(key){
        return key === "Backspace"
                || key === "ArrowLeft"
                || key === "ArrowRight"
                || key === "ArrowUp"
                || key === "ArrowDown"
                || key === "Enter"
                || key === "Tab"
                || key === "Home"
                || key === "Insert"
                || key === "Delete"
                || key === "Control"
                || key === "Shift"
                || key === "End";
    }
}