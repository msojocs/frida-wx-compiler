
import BaseAddr from "../../utils/addr.js";
import { hookString } from "./string.js";
export const hookVector = (baseAddr: BaseAddr) => {
    hookString(baseAddr)
}