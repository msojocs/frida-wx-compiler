import { hookCPP } from "./cpp/index.js";
import { hookNight } from "./night/index.js";
import BaseAddr from "./utils/addr.js";
import { hookWcc } from "./wcc/index.js";
import { hookWcsc } from "./wcsc/index.js";
import { hookWXML } from "./wxml/index.js";
import { hookWXSS } from "./wxss/index.js";

export const hook = (baseAddr: BaseAddr) => {
    // hookCPP(baseAddr)
    // hookWXML(baseAddr)
    // hookWcc(baseAddr)
    // hookWcsc(baseAddr)
    hookWXSS(baseAddr)
    // hookNight(baseAddr)
}