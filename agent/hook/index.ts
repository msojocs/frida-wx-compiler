import { hookCPP } from "./cpp/index.js";
import BaseAddr from "./utils/addr.js";
import { hookWcc } from "./wcc/index.js";
import { hookWXML } from "./wxml/index.js";

export const hook = (baseAddr: BaseAddr) => {
    // hookCPP(baseAddr)
    hookWXML(baseAddr)
    // hookWcc(baseAddr)
}