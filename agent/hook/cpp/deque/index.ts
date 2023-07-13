import BaseAddr from "../../../hook/utils/addr.js";
import { hookDequeStdString } from "./std_string.js";

export const hookDeque = (baseAddr: BaseAddr) => {
    hookDequeStdString(baseAddr)
}