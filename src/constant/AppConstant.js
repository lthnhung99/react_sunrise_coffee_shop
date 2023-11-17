const LAYOUT = {
    NEW: { color: "white", backgroundColor: "#2979ff" },
    WAITING: { color: "white", backgroundColor: "#ffc107" },
    STOCK_OUT: { color: "white", backgroundColor: "#f44336" },
    DONE: { color: "white", backgroundColor: "#28a745" },
    COOKING: { color: "white", backgroundColor: "#f06292" }
}
export const URL_BASE = "http://localhost:9000/api";
export const URL_SOCKET = "http://localhost:9000/ws";
export const NEW = "NEW";
export const COOKING = "COOKING";
export const WAITING = "WAITING";
export const STOCK_OUT = "STOCK_OUT";
export default LAYOUT;