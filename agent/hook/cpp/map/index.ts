import BaseAddr from "../../../hook/utils/addr.js";
import { hookInsert } from "./insert.js";
import { hookString2Int } from "./string2int.js";
import { hookString2String } from "./string2string.js";
import { hookString2VectorString } from "./string2vector_string.js";

export const hookMap = (baseAddr: BaseAddr) => {
    // hookString2String(baseAddr)
    // hookString2Int(baseAddr)
    hookString2VectorString(baseAddr)
    // hookInsert(baseAddr)
}