import BaseAddr from "../../../hook/utils/addr.js";
import { hookString2String } from "./string2string.js";

export const hookMap = (baseAddr: BaseAddr) => {
    hookString2String(baseAddr)
}