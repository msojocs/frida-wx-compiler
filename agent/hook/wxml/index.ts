import BaseAddr from "../utils/addr.js";
import { hookCompiler } from "./compiler.js";
import { hookDomLib } from "./dom_lib/index.js";
import { hookExprLib } from "./expr_lib/index.js";

export const hookWXML = (baseAddr: BaseAddr) => {
    // hookCompiler(baseAddr)
    // hookDomLib(baseAddr)
    hookExprLib(baseAddr)
}